import gc
import json
import logging
import os
import time
import urllib.parse
import boto3
import awswrangler as wr
import pandas as pd
import pyarrow as pa

logger = logging.getLogger()
logger.setLevel(logging.INFO)

BUCKET = os.environ.get("S3_BUCKET_NAME", "xideralaws-curso-jonathan")
RAW_PREFIX = os.environ.get("S3_RAW_PREFIX", "proyecto-final/raw_data/")
CLEAN_PREFIX = os.environ.get("S3_CLEAN_PREFIX", "proyecto-final/clean_data/")
MAX_FILE_SIZE_MB = float(os.environ.get("MAX_FILE_SIZE_MB", "100.0"))

s3_client = boto3.client('s3')

def standardize_taxi_columns(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = [col.lower().strip() for col in df.columns]
    
    rename_map = {}
    for col in df.columns:
        if 'pickup_datetime' in col or ('pickup' in col and 'date' in col):
            rename_map[col] = 'pickup_datetime'
        elif 'dropoff_datetime' in col or ('dropoff' in col and 'date' in col):
            rename_map[col] = 'dropoff_datetime'
        elif 'pulocationid' in col or col == 'pulocation':
            rename_map[col] = 'pulocationid'
        elif 'dolocationid' in col or col == 'dolocation':
            rename_map[col] = 'dolocationid'
        elif 'fare_amount' in col and 'total' not in col:
            rename_map[col] = 'fare_amount'
        elif 'total_amount' in col:
            rename_map[col] = 'total_amount'
        elif 'trip_distance' in col:
            rename_map[col] = 'trip_distance'
        elif 'passenger_count' in col:
            rename_map[col] = 'passenger_count'
            
    df = df.rename(columns=rename_map)
    return df

def clean_taxi_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    df = standardize_taxi_columns(df)
    
    if 'pickup_datetime' in df.columns:
        df['pickup_datetime'] = pd.to_datetime(df['pickup_datetime'], errors='coerce')
    if 'dropoff_datetime' in df.columns:
        df['dropoff_datetime'] = pd.to_datetime(df['dropoff_datetime'], errors='coerce')
        
    df = df.dropna(subset=['pickup_datetime', 'dropoff_datetime'])
    
    duration = (df['dropoff_datetime'] - df['pickup_datetime']).dt.total_seconds() / 60.0
    df['trip_duration_minutes'] = duration.round(2)
    df = df[(df['trip_duration_minutes'] > 0) & (df['trip_duration_minutes'] < 1440)]
    
    if 'trip_distance' in df.columns:
        df['trip_distance'] = pd.to_numeric(df['trip_distance'], errors='coerce').fillna(0.0)
        df = df[df['trip_distance'] >= 0]
        
    for col in ['total_amount', 'fare_amount']:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0.0)
            df = df[df[col] >= 0]
            
    return df

def read_source_file(s3_path: str) -> pd.DataFrame:
    ext = s3_path.lower().split('.')[-1]
    if ext == 'parquet':
        return wr.s3.read_parquet(path=s3_path)
    elif ext == 'csv':
        return wr.s3.read_csv(path=s3_path)
    elif ext == 'json':
        return wr.s3.read_json(path=s3_path)
    else:
        return wr.s3.read_parquet(path=s3_path)

def lambda_handler(event, context):
    records_to_process = []
    is_s3_trigger = False
    
    if 'Records' in event and len(event['Records']) > 0:
        is_s3_trigger = True
        for record in event['Records']:
            s3_info = record.get('s3', {})
            bucket_name = s3_info.get('bucket', {}).get('name')
            raw_key = s3_info.get('object', {}).get('key')
            if raw_key:
                decoded_key = urllib.parse.unquote_plus(raw_key)
                if decoded_key.startswith(RAW_PREFIX) and '/fhvhv/' not in decoded_key:
                    records_to_process.append((bucket_name, decoded_key))
    else:
        paginator = s3_client.get_paginator('list_objects_v2')
        
        existentes_clean = set()
        for page in paginator.paginate(Bucket=BUCKET, Prefix=CLEAN_PREFIX):
            for obj in page.get('Contents', []):
                existentes_clean.add(obj['Key'].replace(CLEAN_PREFIX, ""))
                
        for page in paginator.paginate(Bucket=BUCKET, Prefix=RAW_PREFIX):
            for obj in page.get('Contents', []):
                key = obj['Key']
                if not (key.endswith('.parquet') or key.endswith('.csv') or key.endswith('.json')):
                    continue
                if '/fhvhv/' in key:
                    continue
                rel_path = key.replace(RAW_PREFIX, "")
                if rel_path not in existentes_clean:
                    records_to_process.append((BUCKET, key))
                    
    if not records_to_process:
        return {
            "statusCode": 200,
            "body": json.dumps({
                "status": "COMPLETED_ALL",
                "message": "Todos los archivos de FHV, Green Taxis y Yellow Taxis estan limpios y sincronizados en clean_data."
            })
        }
        
    reporte = []
    for bucket_name, source_key in records_to_process:
        if not is_s3_trigger and context and hasattr(context, 'get_remaining_time_in_millis'):
            if context.get_remaining_time_in_millis() < 30000:
                logger.info("Buffer de tiempo alcanzado. Finalizando ejecucion.")
                break
                
        start_time = time.time()
        try:
            head = s3_client.head_object(Bucket=bucket_name, Key=source_key)
            file_size_mb = round(head['ContentLength'] / (1024 * 1024), 2)
            
            source_s3_path = f"s3://{bucket_name}/{source_key}"
            target_key = source_key.replace(RAW_PREFIX, CLEAN_PREFIX)
            target_s3_path = f"s3://{bucket_name}/{target_key}"
            
            if file_size_mb > MAX_FILE_SIZE_MB:
                reporte.append({
                    "source_file": source_key,
                    "status": "DELEGATED_TO_SPARK",
                    "file_size_mb": file_size_mb
                })
                continue
                
            df_raw = read_source_file(source_s3_path)
            total_records = len(df_raw)
            
            df_clean = clean_taxi_dataframe(df_raw)
            clean_records = len(df_clean)
            discarded = total_records - clean_records
            quality_pct = round((clean_records / total_records) * 100, 2) if total_records > 0 else 0
            
            wr.s3.to_parquet(
                df=df_clean,
                path=target_s3_path,
                compression="snappy",
                index=False
            )
            
            elapsed_time = round(time.time() - start_time, 2)
            
            reporte.append({
                "source_file": source_key,
                "target_file": target_key,
                "status": "SUCCESS",
                "clean_records": clean_records,
                "quality_pct": quality_pct,
                "execution_time_sec": elapsed_time
            })
            
            del df_raw, df_clean
            pa.default_memory_pool().release_unused()
            gc.collect()
            
        except Exception as file_err:
            logger.error(f"Error en archivo {source_key}: {str(file_err)}")
            reporte.append({
                "source_file": source_key,
                "status": "FAILED_SKIPPED",
                "error": str(file_err)
            })

    total_pendientes = max(0, len(records_to_process) - len(reporte))

    return {
        "statusCode": 200,
        "body": json.dumps({
            "status": "SUCCESS" if total_pendientes == 0 else "PARTIAL_SUCCESS",
            "total_procesados_este_ciclo": len(reporte),
            "pendientes_restantes": total_pendientes,
            "message": "Limpieza automatica completada al 100%" if total_pendientes == 0 else "Lote procesado exitosamente.",
            "resumen": reporte
        })
    }
