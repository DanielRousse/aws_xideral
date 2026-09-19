import os
import io
import json
import urllib.request
import urllib.error
import boto3

BUCKET_NAME = os.environ.get("S3_BUCKET_NAME", "xideralaws-curso-jonathan")
RAW_PREFIX = os.environ.get("S3_RAW_PREFIX", "proyecto-final/raw_data/")
SOURCE_PORTAL_URL = "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"
BASE_URL = os.environ.get("TLC_BASE_URL", "https://d37ci6vzurychx.cloudfront.net/trip-data")

SERVICE_MAP = {
    "yellow_taxis": "yellow_tripdata",
    "green_taxis": "green_tripdata",
    "fhv": "fhv_tripdata",
    "fhvhv": "fhvhv_tripdata"
}

s3_client = boto3.client("s3")

def download_and_ingest(service_type: str, year: int, month: int) -> dict:
    file_prefix = SERVICE_MAP.get(service_type)
    if not file_prefix:
        return {"status": "ERROR", "message": f"Servicio invalido: {service_type}"}
        
    file_name = f"{file_prefix}_{year}-{month:02d}.parquet"
    source_url = f"{BASE_URL}/{file_name}"
    target_key = f"{RAW_PREFIX}{service_type}/{year}/{month:02d}/{file_name}"
    
    try:
        check = s3_client.list_objects_v2(Bucket=BUCKET_NAME, Prefix=target_key)
        if check.get("Contents"):
            return {
                "status": "SKIPPED",
                "service": service_type,
                "year": year,
                "month": month,
                "file": file_name,
                "message": "Archivo ya existente en Bronze Layer"
            }
            
        req = urllib.request.Request(
            source_url,
            headers={"User-Agent": "Mozilla/5.0 (AWS-Lambda-Ingestion-Pipeline/1.0)"}
        )
        
        with urllib.request.urlopen(req, timeout=120) as response:
            if response.status == 200:
                content_length = response.headers.get("Content-Length")
                file_size_mb = round(int(content_length) / (1024 * 1024), 2) if content_length else 0.0
                
                buffer = io.BytesIO(response.read())
                buffer.seek(0)
                
                s3_client.upload_fileobj(
                    Fileobj=buffer,
                    Bucket=BUCKET_NAME,
                    Key=target_key,
                    ExtraArgs={"Metadata": {"source_url": source_url, "portal_url": SOURCE_PORTAL_URL}}
                )
                
                return {
                    "status": "SUCCESS",
                    "service": service_type,
                    "year": year,
                    "month": month,
                    "file": file_name,
                    "size_mb": file_size_mb,
                    "source_portal": SOURCE_PORTAL_URL,
                    "target_s3": f"s3://{BUCKET_NAME}/{target_key}"
                }
    except urllib.error.HTTPError as e:
        return {
            "status": "NOT_FOUND" if e.code in (403, 404) else "ERROR",
            "service": service_type,
            "year": year,
            "month": month,
            "file": file_name,
            "http_code": e.code
        }
    except Exception as e:
        return {
            "status": "ERROR",
            "service": service_type,
            "year": year,
            "month": month,
            "file": file_name,
            "error": str(e)
        }

def lambda_handler(event, context):
    results = []
    
    if "service_type" in event and "year" in event and "month" in event:
        res = download_and_ingest(
            service_type=event["service_type"],
            year=int(event["year"]),
            month=int(event["month"])
        )
        results.append(res)
    else:
        years = event.get("years", [2024, 2025, 2026])
        months = event.get("months", list(range(1, 13)))
        services = event.get("services", list(SERVICE_MAP.keys()))
        
        for yr in years:
            for mo in months:
                if context and hasattr(context, "get_remaining_time_in_millis"):
                    if context.get_remaining_time_in_millis() < 30000:
                        break
                        
                for srv in services:
                    if srv == "fhvhv" and event.get("skip_heavy", False):
                        continue
                    res = download_and_ingest(srv, yr, mo)
                    if res["status"] in ("SUCCESS", "ERROR"):
                        results.append(res)
                        
    return {
        "statusCode": 200,
        "body": json.dumps({
            "status": "COMPLETED",
            "total_processed": len(results),
            "results": results
        })
    }
