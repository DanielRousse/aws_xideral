# NYC Urban Mobility Analytics Platform
> **Cloud-Native Data Lakehouse on AWS: S3, Lambda, Apache Spark, and Streamlit**

[![CI/CD Status](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions%20(Self--Hosted)-brightgreen)](https://github.com/DanielRousse/streamlit-curso)
[![Python Version](https://img.shields.io/badge/Python-3.11%20%7C%203.12-blue)](https://www.python.org/)
[![Apache Spark](https://img.shields.io/badge/Apache%20Spark-4.1.2-orange)](https://spark.apache.org/)
[![AWS Architecture](https://img.shields.io/badge/AWS-S3%20%7C%20Lambda%20%7C%20EC2-232F3E?logo=amazon-aws)](https://aws.amazon.com/)

---

## Project Overview
This project presents an enterprise-grade **Cloud Data Lakehouse** designed to ingest, clean, analyze, and visualize massive urban transportation datasets from the **New York City Taxi & Limousine Commission (NYC TLC)**.

The platform processes **over 766 million records** and **$23.35 Billion USD** in gross fares spanning multi-year historical data (2024, 2025, 2026) across four core transportation fleets:
1. **Yellow Taxis**: High-density metered street hails concentrated in Manhattan and international airports.
2. **Green Taxis**: Outer-borough Boro taxi services providing street-hails outside core commercial Manhattan.
3. **FHV**: Traditional For-Hire Vehicles and livery car services operating via community base dispatchers.
4. **FHVhV (Uber / Lyft)**: High-Volume For-Hire Vehicles representing ~80% of total NYC passenger mobility.

---

## Architecture & Medallion Design Pattern

```text
[ NYC TLC Raw Data ]
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│  BRONZE LAYER (S3: raw_data/)                              │
│  - Multi-year partitions (2024 - 2026)                      │
│  - 117 raw datasets, ~17 GB compressed                     │
└──────────────┬───────────────────────────────┬──────────────┘
               │ (< 100 MB files)              │ (> 100 MB: fhvhv)
               ▼                               │
┌────────────────────────────────┐             │
│  AWS LAMBDA DATA CLEANER       │             │
│  - 3072 MB RAM, Python 3.12    │             │
│  - S3 Event-Driven Triggers    │             │
│  - Schema & Codec Normalization│             │
│  - Quality Filter (>98% score) │             │
└──────────────┬─────────────────┘             │
               │                               │
               ▼                               │
┌────────────────────────────────┐             │
│  SILVER LAYER (S3: clean_data/)│             │
│  - 87 files, 156.5M rows       │             │
│  - Standardized Snappy Parquet │             │
└──────────────┬─────────────────┘             │
               │                               ▼
               └───────────────► ┌───────────────────────────┐
                                 │  APACHE SPARK 4.1.2 (EC2) │
                                 │  - Heavy Dataset Sanitizer│
                                 │  - Broadcast Geo Joins    │
                                 │  - 766M Rows Processed    │
                                 └─────────────┬─────────────┘
                                               │
                                               ▼
                                 ┌───────────────────────────┐
                                 │  GOLD LAYER (S3:analytics)│
                                 │  - 5 Dimensional Parquet  │
                                 │  - Sub-second UI queries  │
                                 └─────────────┬─────────────┘
                                               │
                                               ▼
                                 ┌───────────────────────────┐
                                 │  STREAMLIT DASHBOARD      │
                                 │  - Dockerized on EC2:8501 │
                                 │  - Interactive Mobility UI│
                                 │  - Automated CI/CD Runner │
                                 └───────────────────────────┘
```

---

## Repository Structure

```text
streamlit-curso/
├── .github/
│   └── workflows/
│       └── docker-image.yml     # Automated CI/CD pipeline on self-hosted EC2 runner
├── docs/
│   ├── ArquitecturaProj.drawio.svg # Official cloud architecture diagram
│   ├── architecture.md          # Comprehensive cloud architecture & Medallion pattern
│   ├── data_quality.md          # Data quality audit & Raw vs Clean metrics
│   └── data_dictionary.md       # Data dictionary & feature selection rationale
├── pipeline/
│   ├── lambda/
│   │   ├── lambda_ingestion.py  # Lambda 1: Serverless Ingestion & Extractor (TLC to Bronze)
│   │   ├── lambda_cleaner.py    # Lambda 2: Serverless Cleaner & Normalizer (Bronze to Silver)
│   │   └── README.md            # Lambda technical specs & ZSTD to Snappy fix
│   └── spark/
│       ├── pyspark_analytics.py # PySpark distributed ETL, broadcast joins & Gold generator
│       ├── taxi_zone_lookup.csv # Municipal catalog (265 zones) for broadcast hash joins
│       └── README.md            # Spark cluster specs, broadcast join, and Gold schema
├── app.py                       # Streamlit Mobility Analytics Dashboard
├── docker-compose.yml           # Docker orchestration on EC2
├── Dockerfile                   # Production Python 3.11 container with AWS CLI v2
├── requirements.txt             # Application Python dependencies
└── README.md                    # Root project documentation
```

### Direct Access to Pipeline Code

| Stage | Component | File | Technology | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Ingesta (Bronze)** | Lambda 1 | [`pipeline/lambda/lambda_ingestion.py`](pipeline/lambda/lambda_ingestion.py) | Python 3.12 / Boto3 | Extracción serverless desde el [portal oficial NYC TLC](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) hacia `raw_data/`. |
| **Limpieza (Silver)** | Lambda 2 | [`pipeline/lambda/lambda_cleaner.py`](pipeline/lambda/lambda_cleaner.py) | Python 3.12 / AWS Wrangler | Saneamiento, filtrado de calidad y conversión a Snappy Parquet. |
| **Big Data (Gold)** | Apache Spark | [`pipeline/spark/pyspark_analytics.py`](pipeline/spark/pyspark_analytics.py) | PySpark 4.1.2 / EC2 | Saneamiento `fhvhv`, broadcast join geoespacial y agregaciones Gold. |
| **Presentación** | Streamlit Web | [`app.py`](app.py) | Streamlit / Plotly / Docker | Dashboard interactivo con telemetría S3 en tiempo real. |

---

## Dashboard Modules (Fase 4: Presentation Layer)

The interactive analytics platform is built with **Streamlit** and **Plotly**, containerized with Docker and served on port `8501`:

1. **Executive KPI Header**: Instantaneous metrics on total trip volume (766.4M), gross revenue ($23.35B), average trip duration, distance, and municipal zone coverage.
2. **Temporal Trends & Market Share**: Multi-service monthly time-series line charts and market distribution donut charts.
3. **Geospatial Borough Distribution**: Borough-level trip volume stacked bars, duration comparisons, and market concentration matrices.
4. **Rush-Hour Heatmap (2D Grid)**: 7-day × 24-hour heatmap exposing commuter rush hour dynamics and weekend nightlife demand spikes.
5. **High-Density Corridors**: Top 50 origin-destination transit corridors ranked by passenger density with dynamic search filtering.
6. **Technical Compatibility Matrix**: Formal audit documenting metric comparability across fleet categories.
7. **Data Explorer & CSV Export**: Interactive table viewer with on-demand CSV reporting exports.

---

## Key Engineering Accomplishments

1. **Serverless Scalability**: AWS Lambda automatically handles micro-batches and streams incoming taxi trips, completing schema alignment and quality sanitization in seconds without managing servers.
2. **Snappy Codec Standardization**: Diagnosed and resolved the `Support for codec 'zstd' not built` constraint in AWS Lambda layers by normalizing raw storage to Snappy compression.
3. **Big Data Workload Routing**: Segregated heavy datasets (`fhvhv` totaling ~14.1 GB compressed and ~150 GB uncompressed) to Apache Spark to prevent serverless memory crashes and timeout bottlenecks.
4. **Zero-Shuffle Geospatial Joins**: Utilized Spark Broadcast Joins with the official NYC taxi zone catalog (`taxi_zone_lookup.csv`) to enrich trips with zero network shuffle penalty across 766M records.
5. **Data Lakehouse Architecture**: Deployed the Gold Layer directly to S3 as indexed Parquet, eliminating the operational overhead, connection pool limits, and idle costs of a traditional relational database (RDS).
6. **Continuous Delivery**: Fully automated zero-downtime container deployments to Amazon EC2 via GitHub Actions self-hosted runner.

---

## Authors & Academic Credentials
- **Course**: AWS Big Data & Cloud Architecture (*Curso AWS*)
- **Author**: Jonathan Daniel Reyes Gordillo
- **Repository**: [DanielRousse/streamlit-curso](https://github.com/DanielRousse/streamlit-curso)