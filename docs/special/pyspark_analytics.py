import os
import sys
import time
import boto3

os.environ['PYSPARK_PYTHON'] = sys.executable
os.environ['PYSPARK_DRIVER_PYTHON'] = sys.executable

from pyspark.sql import SparkSession, DataFrame
from pyspark.sql import functions as F
from pyspark.sql.types import DoubleType, IntegerType

BUCKET = os.environ.get('S3_BUCKET_NAME', 'xideralaws-curso-jonathan')
AWS_REGION = os.environ.get('AWS_DEFAULT_REGION', 'us-west-1')

RAW_S3_PATH = f's3a://{BUCKET}/proyecto-final/raw_data/'
CLEAN_S3_PATH = f's3a://{BUCKET}/proyecto-final/clean_data/'
LOOKUP_S3_PATH = f's3a://{BUCKET}/proyecto-final/lookup/taxi_zone_lookup.csv'
ANALYTICS_S3_PATH = f's3a://{BUCKET}/proyecto-final/analytics/'

def build_spark_session() -> SparkSession:
    spark = SparkSession.builder \
        .appName('NYC-Urban-Mobility-Analytics-Full-Gold') \
        .master('local[2]') \
        .config('spark.driver.memory', '2500m') \
        .config('spark.jars.packages', 'org.apache.hadoop:hadoop-aws:3.4.2,software.amazon.awssdk:bundle:2.29.52') \
        .config('spark.hadoop.fs.s3a.aws.credentials.provider', 'software.amazon.awssdk.auth.credentials.ProfileCredentialsProvider') \
        .config('spark.hadoop.fs.s3a.endpoint.region', AWS_REGION) \
        .config('spark.sql.adaptive.enabled', 'true') \
        .config('spark.sql.adaptive.coalescePartitions.enabled', 'true') \
        .config('spark.sql.shuffle.partitions', '16') \
        .getOrCreate()
    spark.sparkContext.setLogLevel('WARN')
    return spark

def clean_fhvhv_files(spark: SparkSession, s3_client):
    res = s3_client.list_objects_v2(Bucket=BUCKET, Prefix='proyecto-final/raw_data/fhvhv/')
    raw_keys = [o['Key'] for o in res.get('Contents', []) if o['Key'].endswith('.parquet')]
    raw_keys.sort()
    total_files = len(raw_keys)
    print(f'Total de archivos crudos FHVhV detectados en S3: {total_files}')
    
    for idx, key in enumerate(raw_keys, 1):
        parts = key.split('/')
        year = parts[-3]
        month = parts[-2]
        clean_prefix = f'proyecto-final/clean_data/fhvhv/{year}/{month}/'
        
        check = s3_client.list_objects_v2(Bucket=BUCKET, Prefix=f'{clean_prefix}_SUCCESS')
        if check.get('Contents'):
            print(f'[{idx}/{total_files}] FHVhV {year}-{month} ya procesado previamente. Omitiendo.')
            continue
            
        t_file = time.time()
        print(f'[{idx}/{total_files}] Limpiando y estandarizando FHVhV {year}-{month}...')
        raw_path = f's3a://{BUCKET}/{key}'
        out_path = f's3a://{BUCKET}/{clean_prefix}'
        
        df = spark.read.parquet(raw_path).select(
            F.to_timestamp('pickup_datetime').alias('pickup_datetime'),
            F.to_timestamp('dropoff_datetime').alias('dropoff_datetime'),
            F.col('PULocationID').cast(IntegerType()).alias('pulocationid'),
            F.col('DOLocationID').cast(IntegerType()).alias('dolocationid'),
            F.round(F.col('trip_time').cast(DoubleType()) / 60.0, 2).alias('trip_duration_minutes'),
            F.coalesce(F.col('trip_miles').cast(DoubleType()), F.lit(0.0)).alias('trip_distance'),
            F.round(
                F.coalesce(F.col('base_passenger_fare').cast(DoubleType()), F.lit(0.0)) +
                F.coalesce(F.col('tolls').cast(DoubleType()), F.lit(0.0)) +
                F.coalesce(F.col('bcf').cast(DoubleType()), F.lit(0.0)) +
                F.coalesce(F.col('sales_tax').cast(DoubleType()), F.lit(0.0)) +
                F.coalesce(F.col('congestion_surcharge').cast(DoubleType()), F.lit(0.0)) +
                F.coalesce(F.col('airport_fee').cast(DoubleType()), F.lit(0.0)) +
                F.coalesce(F.col('tips').cast(DoubleType()), F.lit(0.0)),
                2
            ).alias('total_amount'),
            F.lit('FHV - High Volume (Uber/Lyft)').alias('service_type')
        ).filter(
            (F.col('trip_duration_minutes') > 0) & (F.col('trip_duration_minutes') <= 1440) &
            F.col('pulocationid').isNotNull() & F.col('dolocationid').isNotNull()
        )
        
        df.coalesce(1).write.mode('overwrite').parquet(out_path)
        print(f'[{idx}/{total_files}] FHVhV {year}-{month} guardado en clean_data en {time.time() - t_file:.2f} s')

def load_lookup(spark: SparkSession) -> DataFrame:
    df = spark.read.option('header', 'true').option('inferSchema', 'true').csv(LOOKUP_S3_PATH)
    return df.select(
        F.col('LocationID').cast(IntegerType()).alias('location_id'),
        F.col('Borough').alias('borough'),
        F.col('Zone').alias('zone')
    )

def load_all_clean_data(spark: SparkSession) -> DataFrame:
    y_raw = spark.read.option('recursiveFileLookup', 'true').parquet(f'{CLEAN_S3_PATH}yellow_taxis/')
    g_raw = spark.read.option('recursiveFileLookup', 'true').parquet(f'{CLEAN_S3_PATH}green_taxis/')
    f_raw = spark.read.option('recursiveFileLookup', 'true').parquet(f'{CLEAN_S3_PATH}fhv/')
    h_raw = spark.read.option('recursiveFileLookup', 'true').parquet(f'{CLEAN_S3_PATH}fhvhv/')
    
    y = y_raw.select(
        F.to_timestamp('pickup_datetime').alias('pickup_datetime'),
        F.to_timestamp('dropoff_datetime').alias('dropoff_datetime'),
        F.col('pulocationid').cast(IntegerType()),
        F.col('dolocationid').cast(IntegerType()),
        F.col('trip_duration_minutes').cast(DoubleType()),
        F.coalesce(F.col('trip_distance').cast(DoubleType()), F.lit(0.0)).alias('trip_distance'),
        F.coalesce(F.col('total_amount').cast(DoubleType()), F.lit(0.0)).alias('total_amount'),
        F.lit('Yellow Taxi').alias('service_type')
    )
    
    g = g_raw.select(
        F.to_timestamp('pickup_datetime').alias('pickup_datetime'),
        F.to_timestamp('dropoff_datetime').alias('dropoff_datetime'),
        F.col('pulocationid').cast(IntegerType()),
        F.col('dolocationid').cast(IntegerType()),
        F.col('trip_duration_minutes').cast(DoubleType()),
        F.coalesce(F.col('trip_distance').cast(DoubleType()), F.lit(0.0)).alias('trip_distance'),
        F.coalesce(F.col('total_amount').cast(DoubleType()), F.lit(0.0)).alias('total_amount'),
        F.lit('Green Taxi').alias('service_type')
    )
    
    f = f_raw.select(
        F.to_timestamp('pickup_datetime').alias('pickup_datetime'),
        F.to_timestamp('dropoff_datetime').alias('dropoff_datetime'),
        F.col('pulocationid').cast(IntegerType()),
        F.col('dolocationid').cast(IntegerType()),
        F.col('trip_duration_minutes').cast(DoubleType()),
        F.lit(0.0).alias('trip_distance'),
        F.lit(0.0).alias('total_amount'),
        F.lit('FHV').alias('service_type')
    )
    
    h = h_raw.select(
        F.to_timestamp('pickup_datetime').alias('pickup_datetime'),
        F.to_timestamp('dropoff_datetime').alias('dropoff_datetime'),
        F.col('pulocationid').cast(IntegerType()),
        F.col('dolocationid').cast(IntegerType()),
        F.col('trip_duration_minutes').cast(DoubleType()),
        F.coalesce(F.col('trip_distance').cast(DoubleType()), F.lit(0.0)).alias('trip_distance'),
        F.coalesce(F.col('total_amount').cast(DoubleType()), F.lit(0.0)).alias('total_amount'),
        F.lit('FHV - High Volume (Uber/Lyft)').alias('service_type')
    )
    
    return y.unionByName(g).unionByName(f).unionByName(h)

def run_gold_analytics(spark: SparkSession):
    t_start = time.time()
    print('Iniciando generacion de la Capa Gold (Analytics) con las 4 categorias unificadas...')
    
    lookup = load_lookup(spark)
    trips = load_all_clean_data(spark)
    
    pu_lookup = lookup.select(
        F.col('location_id'),
        F.col('borough').alias('pu_borough'),
        F.col('zone').alias('pu_zone')
    )
    do_lookup = lookup.select(
        F.col('location_id'),
        F.col('borough').alias('do_borough'),
        F.col('zone').alias('do_zone')
    )
    
    enriched = trips \
        .join(F.broadcast(pu_lookup), trips.pulocationid == pu_lookup.location_id, 'left') \
        .drop('location_id') \
        .join(F.broadcast(do_lookup), trips.dolocationid == do_lookup.location_id, 'left') \
        .drop('location_id') \
        .fillna({'pu_borough': 'Unknown', 'pu_zone': 'Unknown', 'do_borough': 'Unknown', 'do_zone': 'Unknown'})
        
    enriched = enriched \
        .withColumn('hour_of_day', F.hour('pickup_datetime')) \
        .withColumn('day_of_week', F.date_format('pickup_datetime', 'EEEE')) \
        .withColumn('day_of_week_num', F.dayofweek('pickup_datetime')) \
        .withColumn('year_month', F.date_format('pickup_datetime', 'yyyy-MM'))
        
    kpis = enriched.groupBy('service_type', 'year_month').agg(
        F.count('*').alias('total_trips'),
        F.round(F.sum('total_amount'), 2).alias('total_revenue'),
        F.round(F.avg('trip_duration_minutes'), 2).alias('avg_duration_min'),
        F.round(F.avg('trip_distance'), 2).alias('avg_distance_miles')
    ).orderBy('service_type', 'year_month')
    kpis.coalesce(1).write.mode('overwrite').parquet(f'{ANALYTICS_S3_PATH}kpis_generales.parquet')
    print('1/5 kpis_generales.parquet exportado')
    
    borough = enriched.filter(F.col('pu_borough') != 'Unknown').groupBy('pu_borough', 'service_type').agg(
        F.count('*').alias('total_trips'),
        F.round(F.sum('total_amount'), 2).alias('total_revenue'),
        F.round(F.avg('trip_duration_minutes'), 2).alias('avg_duration_min')
    ).orderBy('pu_borough', 'service_type')
    borough.coalesce(1).write.mode('overwrite').parquet(f'{ANALYTICS_S3_PATH}viajes_por_borough.parquet')
    print('2/5 viajes_por_borough.parquet exportado')
    
    rush = enriched.groupBy('day_of_week_num', 'day_of_week', 'hour_of_day').agg(
        F.count('*').alias('total_trips'),
        F.round(F.avg('trip_duration_minutes'), 2).alias('avg_duration_min')
    ).orderBy('day_of_week_num', 'hour_of_day')
    rush.coalesce(1).write.mode('overwrite').parquet(f'{ANALYTICS_S3_PATH}matriz_horas_pico.parquet')
    print('3/5 matriz_horas_pico.parquet exportado')
    
    corridors = enriched.filter((F.col('pu_zone') != 'Unknown') & (F.col('do_zone') != 'Unknown')) \
        .groupBy('pu_borough', 'pu_zone', 'do_borough', 'do_zone') \
        .agg(
            F.count('*').alias('total_trips'),
            F.round(F.avg('trip_duration_minutes'), 2).alias('avg_duration_min'),
            F.round(F.avg('trip_distance'), 2).alias('avg_distance_miles')
        ) \
        .orderBy(F.col('total_trips').desc()) \
        .limit(50)
    corridors.coalesce(1).write.mode('overwrite').parquet(f'{ANALYTICS_S3_PATH}top_corredores.parquet')
    print('4/5 top_corredores.parquet exportado')
    
    global_kpis = enriched.agg(
        F.count('*').alias('total_records'),
        F.round(F.sum('total_amount'), 2).alias('total_revenue'),
        F.round(F.avg('trip_duration_minutes'), 2).alias('avg_duration_min'),
        F.round(F.avg('trip_distance'), 2).alias('avg_distance_miles'),
        F.min('pickup_datetime').alias('min_date'),
        F.max('pickup_datetime').alias('max_date'),
        F.countDistinct('pulocationid').alias('unique_pickup_zones')
    )
    global_kpis.coalesce(1).write.mode('overwrite').parquet(f'{ANALYTICS_S3_PATH}metricas_globales.parquet')
    print('5/5 metricas_globales.parquet exportado')
    
    print(f'Pipeline Gold completado exitosamente en {time.time() - t_start:.2f} segundos')

def main():
    start_total = time.time()
    s3_client = boto3.client('s3', region_name=AWS_REGION)
    spark = build_spark_session()
    
    print('=== FASE 3: PIPELINE DISTRIBUIDO CON APACHE SPARK ===')
    clean_fhvhv_files(spark, s3_client)
    run_gold_analytics(spark)
    
    print(f'Pipeline integral completado en {time.time() - start_total:.2f} segundos')
    spark.stop()

if __name__ == '__main__':
    main()
