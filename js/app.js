const tareasData = [
  {
    id: "tarea-1",
    titulo: "Aprovisionamiento de Herramientas: AWS EC2 y Entorno Local CachyOS",
    descripcion: "Documentación técnica del aprovisionamiento de una instancia remota en AWS EC2 (Docker, Zsh, análisis de cuota EBS) y la configuración de un entorno interactivo en CachyOS con Fish Shell, venv, Jupyter Notebook y Docker con Docker Compose.",
    fecha: "Septiembre 2026",
    tags: ["AWS EC2", "CachyOS", "Docker", "Docker Compose", "Fish Shell", "Zsh", "Jupyter", "Python 3.14", "Troubleshooting"],
    criterios: [
      "Instancia AWS EC2 aprovisionada con actualización integral (apt update & upgrade).",
      "Instalación y verificación de Zsh y Docker Engine en entorno cloud.",
      "Diagnóstico y documentación técnica de límite de almacenamiento EBS durante instalación de Python.",
      "Configuración de entorno virtual (.venv) en CachyOS adaptado a la sintaxis de Fish Shell (activate.fish).",
      "Instalación y registro exitoso del kernel 'Python (curso-aws)' en Jupyter Notebook verificado en http://localhost:8888.",
      "Instalación de Docker & Docker Compose en CachyOS (pacman), configuración de grupo docker sin sudo y validación con hello-world."
    ],
    codigo: `sudo apt update -y && sudo apt upgrade -y
sudo apt install -y zsh
sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "\${UBUNTU_CODENAME:-\$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl status docker
sudo systemctl start docker
sudo docker run hello-world
df -h /
cd /home/rousse/Documents/Curso-Java/curso-aws
python -m venv .venv
source .venv/bin/activate.fish
python -m pip install --upgrade pip
pip install notebook ipykernel
python -m ipykernel install --user --name=curso-aws --display-name="Python (curso-aws)"
jupyter notebook
sudo pacman -Syu docker docker-compose
sudo usermod -aG docker $USER
sudo systemctl start docker
docker run --rm hello-world`,
    pdfUrl: "docs/tareas/tarea-1/tarea-1-entornos.pdf",
    mdUrl: "docs/tareas/tarea-1/tarea-1-entornos.md",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-1/tarea-1-entornos.md"
  },
  {
    id: "tarea-2",
    titulo: "Cálculo de Métricas Básicas: Mínimo, Máximo y Media",
    descripcion: "Implementación en Python para el procesamiento de colecciones numéricas: extracción de extremos y obtención de la media aritmética mediante funciones nativas.",
    fecha: "Septiembre 2026",
    tags: ["Python", "Estadística Básica", "Min / Max", "Media Aritmética", "Lógica Algorítmica"],
    criterios: [
      "Definición y procesamiento de lista numérica de prueba.",
      "Determinación del valor máximo observado mediante max().",
      "Determinación del valor mínimo observado mediante min().",
      "Cálculo y formateo de la media aritmética con redondeo a 2 decimales."
    ],
    codigo: `numeros = [3, 6, 2, 6, 3, 6, 4, 5, 2, 6, 3, 7, 5, 8, 3, 10]
total = 0

print("El valor MAX es: ", max(numeros))
print("El valor MIN es: ", min(numeros))
print("La media es: ", round(sum(numeros) / len(numeros), 2))`,
    htmlUrl: "docs/tareas/tarea-2/tarea-2-minymax.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-2/tarea-2-minymax.html"
  },
  {
    id: "tarea-3",
    titulo: "Conceptos Fundamentales de Estadística Descriptiva en Pandas",
    descripcion: "Reporte técnico de investigación analítica sobre las métricas clave generadas en describe(): count, mean, std, distribución normal, min, percentiles (25%, 50%, 75%) y max con fundamentos matemáticos.",
    fecha: "Septiembre 2026",
    tags: ["Estadística Descriptiva", "Pandas", "Distribución Normal", "Desviación Estándar", "Percentiles", "EDA"],
    criterios: [
      "Definición formal de count y mean diferenciando manejo de nulos y sensibilidad a outliers.",
      "Análisis de desviación estándar muestral (std) y propiedades de la distribución normal (campana de Gauss y regla empírica 68-95-99.7).",
      "Explicación de medidas posicionales: percentil 25% (Q1), percentil 50% (Q2 / mediana) y percentil 75% (Q3).",
      "Interpretación de cotas extremas min y max, cálculo de rango intercuartílico (IQR) y detección de anomalías.",
      "Matriz comparativa de métricas en Pandas y consideraciones analíticas en pipelines de datos."
    ],
    codigo: null,
    pdfUrl: "docs/tareas/tarea-3/conceptos.pdf",
    mdUrl: "docs/tareas/tarea-3/conceptos.md",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-3/conceptos.md"
  },
  {
    id: "tarea-4",
    titulo: "Profiling y Análisis Demográfico del Dataset Titanic",
    descripcion: "Inspección estructurada y análisis exploratorio del dataset Titanic con Pandas: diagnóstico de columnas y tipos de datos con info(), resumen multidimensional con describe(include='all'), métricas de edad y distribución por sexo y clase.",
    fecha: "Septiembre 2026",
    tags: ["Pandas", "Titanic Dataset", "EDA", "describe()", "value_counts()", "Python"],
    criterios: [
      "Lectura estructurada del dataset Titanic-Dataset.csv utilizando pandas.read_csv().",
      "Ejecución e inspección analítica de df.describe(include='all') y df.info().",
      "Cálculo de edad mínima, máxima y promedio redondeado a 2 decimales.",
      "Análisis de frecuencias con value_counts() para distribución de género (Sex) y clase de boleto (Pclass)."
    ],
    codigo: `import os
import pandas as pd

df = pd.read_csv("Titanic-Dataset.csv")
print(df.head())

print(df.describe(include='all'))
df.info()

print(f"La edad mínima es: {df['Age'].min()} años")
print(f"La edad máxima es: {df['Age'].max()} años")
print(f"El promedio de edad es: {df['Age'].mean():.2f} años")

print(df['Sex'].value_counts())
print(df['Pclass'].value_counts())`,
    htmlUrl: "docs/tareas/tarea-4/tarea-4-titanic.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-4/tarea-4-titanic.html"
  },
  {
    id: "tarea-5",
    titulo: "Análisis de Órdenes y Transacciones del Dataset Chipotle",
    descripcion: "Procesamiento y limpieza de datos transaccionales con Pandas: conversión de precios monetarios a punto flotante, identificación del producto estrella en ventas, cálculo del volumen de tickets únicos, ticket promedio y catálogo ordenado por demanda.",
    fecha: "Septiembre 2026",
    tags: ["Pandas", "Chipotle Dataset", "Data Cleaning", "groupby()", "nunique()", "Agregaciones"],
    criterios: [
      "Lectura de archivo TSV remoto y saneamiento de columna item_price removiendo el símbolo '$'.",
      "Agrupación y cálculo del producto con mayor volumen de unidades vendidas (groupby + sum).",
      "Conteo de órdenes únicas registradas en el dataset mediante nunique() en order_id.",
      "Determinación del precio promedio por orden agregando montos totales por ticket.",
      "Extracción y ordenamiento exhaustivo de los items distintos vendidos de mayor a menor demanda."
    ],
    codigo: `import pandas as pd
import numpy as np

url = 'https://raw.githubusercontent.com/justmarkham/DAT8/master/data/chipotle.tsv'
chipo = pd.read_csv(url, sep='\\t')
chipo['item_price'] = chipo['item_price'].str.replace('$', '', regex=False).astype(float)

item_mas_ordenado = chipo.groupby('item_name')['quantity'].sum().sort_values(ascending=False).head(1)
print(f"El item más ordenado fue: {item_mas_ordenado.index[0]} con {item_mas_ordenado.values[0]} unidades vendidas.")

total_ordenes = chipo['order_id'].nunique()
print(f"El número total de órdenes registradas es: {total_ordenes}")

precio_promedio_orden = chipo.groupby('order_id')['item_price'].sum().mean()
print(f"El precio promedio por orden es: \${precio_promedio_orden:.3f}")

items_distintos = chipo['item_name'].nunique()
print(f"La cantidad total de items distintos vendidos es: {items_distintos}")

conteo_items = chipo.groupby('item_name')['quantity'].sum().sort_values(ascending=False)
for i, (item, total) in enumerate(conteo_items.items(), 1):
    print(f"{i}. {item} — {total} unidades vendidas")`,
    htmlUrl: "docs/tareas/tarea-5/tarea-5-chipotle.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-5/tarea-5-chipotle.html"
  },
  {
    id: "tarea-6",
    titulo: "Visualización y Análisis del Dataset Spotify 2023 desde AWS S3",
    descripcion: "Ingesta y lectura de datos alojados en un bucket de Amazon S3 mediante el SDK boto3 y generación de cinco visualizaciones analíticas con Matplotlib: ranking de artistas con más canciones en 2023, distribución de danceability, relación entre energía y bailabilidad, boxplot comparativo de cuatro atributos musicales y dispersión de streams frente a danceability.",
    fecha: "Septiembre 2026",
    tags: ["AWS S3", "boto3", "Spotify Dataset", "Matplotlib", "Pandas", "EDA", "Data Visualization"],
    criterios: [
      "Conexión e ingesta de datos directamente desde bucket S3 mediante cliente boto3.",
      "Cálculo y gráfico de barras horizontales para el Top 10 de artistas con más canciones en 2023.",
      "Histograma de frecuencias para la distribución del porcentaje de danceability.",
      "Diagrama de dispersión (scatter plot) relacionando danceability contra energy.",
      "Diagrama de caja (boxplot) comparando Danceability, Energy, Valence y Acousticness.",
      "Análisis de correlación y dispersión entre el porcentaje de danceability y el volumen de streams."
    ],
    codigo: `import boto3
import io
import pandas as pd
import matplotlib.pyplot as plt

BUCKET = "xideralaws-curso-benjamin"
KEY = "spotify-2023.csv"

s3 = boto3.client("s3")
response = s3.get_object(Bucket=BUCKET, Key=KEY)
df = pd.read_csv(io.BytesIO(response['Body'].read()), encoding='latin-1')

df["streams"] = pd.to_numeric(df["streams"], errors="coerce")

top_artistas = df['artist(s)_name'].value_counts().head(10)
plt.figure(figsize=(10, 5))
plt.barh(top_artistas.index[::-1], top_artistas.values[::-1], color="#1DB954")
plt.title("Top 10 Artistas con más canciones en Spotify 2023")
plt.xlabel("Cantidad de canciones")
plt.ylabel("Artista")
plt.grid(axis='x', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()

plt.figure(figsize=(9, 5))
plt.hist(df['danceability_%'].dropna(), bins=25, color="#1f77b4", edgecolor="black")
plt.title("Distribución de Danceability (%)")
plt.xlabel("Danceability (%)")
plt.ylabel("Frecuencia (Número de canciones)")
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()

plt.figure(figsize=(8, 6))
plt.scatter(df['danceability_%'], df['energy_%'], alpha=0.5, color="#ff7f0e", edgecolors='none')
plt.title("Relación entre Danceability (%) y Energy (%)")
plt.xlabel("Danceability (%)")
plt.ylabel("Energy (%)")
plt.grid(True, linestyle='--', alpha=0.6)
plt.tight_layout()
plt.show()

caracteristicas = ['danceability_%', 'energy_%', 'valence_%', 'acousticness_%']
nombres = ['Danceability', 'Energy', 'Valence', 'Acousticness']
datos_boxplot = [df[col].dropna() for col in caracteristicas]
plt.figure(figsize=(9, 6))
plt.boxplot(datos_boxplot, tick_labels=nombres, patch_artist=True)
plt.title("Comparación de 4 Características Musicales")
plt.ylabel("Porcentaje (%)")
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()

df_streams = df.dropna(subset=['streams', 'danceability_%'])
plt.figure(figsize=(9, 6))
plt.scatter(df_streams['danceability_%'], df_streams['streams'], alpha=0.5, color="#2ca02c", edgecolors='none')
plt.title("Relación entre Danceability (%) y Streams")
plt.xlabel("Danceability (%)")
plt.ylabel("Streams (Reproducciones)")
plt.ticklabel_format(style='plain', axis='y')
plt.grid(True, linestyle='--', alpha=0.6)
plt.tight_layout()
plt.show()`,
    htmlUrl: "docs/tareas/tarea-6/tarea-6-spotify.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-6/tarea-6-spotify.html"
  },
  {
    id: "tarea-7",
    titulo: "Pipeline Automatizado de Descarga e Ingesta Particionada de NYC Taxi a S3",
    descripcion: "Diseño e implementación de un pipeline ETL para la descarga y streaming de datasets masivos de taxis de Nueva York (Yellow, Green, FHV, FHVHV) en formato Parquet desde CloudFront y su almacenamiento estructurado y particionado en Amazon S3 por categoría, año y mes mediante boto3 y buffers en memoria.",
    fecha: "Septiembre 2026",
    tags: ["AWS S3", "boto3", "CloudFront", "Parquet", "ETL", "Data Lakes", "Python", "Streaming Ingestion"],
    criterios: [
      "Conexión e ingesta directa de archivos Parquet de NYC TLC Trip Record Data desde CDN CloudFront.",
      "Manejo de streaming HTTP por bloques (chunks de 8 MB) en memoria con io.BytesIO para evitar saturación de disco local.",
      "Arquitectura de Data Lake con particionamiento jerárquico en S3 (raw_data/{categoria}/{year}/{month}/).",
      "Control de flujo, excepciones y validación de disponibilidad de datos para los periodos 2024 a 2026.",
      "Verificación de ingesta y validación visual de estructura de directorios en consola AWS S3."
    ],
    codigo: `import io
import boto3
import requests

s3 = boto3.client("s3", region_name="us-west-1")
BUCKET = "xideralaws-curso-jonathan"

CATEGORIAS = {
    "yellow_taxis": "yellow_tripdata",
    "green_taxis": "green_tripdata",
    "fhv": "fhv_tripdata",
    "fhvhv": "fhvhv_tripdata"
}

BASE_URL = "https://d37ci6vzurychx.cloudfront.net/trip-data"

def descargar_y_subir_s3(categoria, year, month):
    prefix_file = CATEGORIAS[categoria]
    file_name = f"\${prefix_file}_\${year}-\${month:02d}.parquet"
    url = f"\${BASE_URL}/\${file_name}"
    target_key = f"proyecto-final/raw_data/\${categoria}/\${year}/\${month:02d}/\${file_name}"
    headers = {"User-Agent": "Mozilla/5.0"}
    try:
        with requests.get(url, headers=headers, stream=True, timeout=60) as response:
            if response.status_code == 200:
                buffer = io.BytesIO()
                for chunk in response.iter_content(chunk_size=1024 * 1024 * 8):
                    if chunk:
                        buffer.write(chunk)
                buffer.seek(0)
                s3.upload_fileobj(buffer, BUCKET, target_key)
                print(f"[OK] Subido: s3://\${BUCKET}/\${target_key}")
                return True
            elif response.status_code in [403, 404]:
                print(f"[SKIP] No disponible: \${file_name} (\${response.status_code})")
                return False
            else:
                print(f"[ERROR] Código \${response.status_code} en \${file_name}")
                return False
    except Exception as e:
        print(f"[FAIL] Error procesando \${file_name}: \${e}")
        return False

years = [2024, 2025, 2026]
for year in years:
    for mes in range(1, 13):
        print(f"\\n--- Procesando período \${year}-\${mes:02d} ---")
        for cat in CATEGORIAS.keys():
            descargar_y_subir_s3(cat, year, mes)`,
    htmlUrl: "docs/tareas/tarea-7/tarea-7-nycdb.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-7/tarea-7-nycdb.html"
  },
  {
    id: "tarea-8",
    titulo: "Análisis Exploratorio y Business Intelligence del Dataset E-Commerce Olist Brasil en AWS S3",
    descripcion: "Extracción e integración de múltiples datasets relacionales (pedidos, ítems, pagos, clientes, productos, reviews) alojados en AWS S3 mediante boto3 y Pandas para resolver preguntas clave de negocio sobre volumen de ventas por estado, ticket promedio, categorías e ingresos, métodos de pago, estacionalidad mensual y correlación entre tiempos de entrega y satisfacción del cliente.",
    fecha: "Septiembre 2026",
    tags: ["AWS S3", "boto3", "Pandas", "E-Commerce", "Business Intelligence", "EDA", "Olist Dataset"],
    criterios: [
      "Ingesta y lectura directa de múltiples archivos CSV limpios desde bucket S3 con boto3 y io.BytesIO.",
      "Identificación de estados con mayor volumen y valor de ventas (San Pablo a la cabeza con R$ 5.76M).",
      "Cálculo del ticket promedio por orden de compra (R$ 160.990).",
      "Determinación de categorías líderes en ingresos (health_beauty y watches_gifts) y top vendedores.",
      "Análisis de métodos de pago (predominio de tarjeta de crédito con más de 76,000 transacciones).",
      "Evaluación de estacionalidad mensual y relación inversa comprobada entre días de entrega y review score."
    ],
    codigo: `import io
import boto3
import pandas as pd

s3 = boto3.client("s3", region_name="us-west-1")
bucket = "xideralaws-curso-jonathan"
prefix = "clean_data"

def load_clean_data(file_name):
    key = f"\${prefix}/\${file_name}"
    response = s3.get_object(Bucket=bucket, Key=key)
    return pd.read_csv(io.BytesIO(response["Body"].read()), encoding="utf-8")

orders = load_clean_data("olist_orders_dataset.csv")
order_items = load_clean_data("olist_order_items_dataset.csv")
order_payments = load_clean_data("olist_order_payments_dataset.csv")
order_reviews = load_clean_data("olist_order_reviews_dataset.csv")
customers = load_clean_data("olist_customers_dataset.csv")
products = load_clean_data("olist_products_dataset.csv")
translations = load_clean_data("product_category_name_translation.csv")
translations.columns = translations.columns.str.replace("ï»¿", "").str.strip()

orders_customers = orders.merge(customers, on="customer_id")
ventas_por_estado = (
    orders_customers
    .merge(order_payments, on="order_id")
    .groupby("customer_state")["payment_value"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
)

ticket_promedio = order_payments.groupby("order_id")["payment_value"].sum().mean()
print(f"Ticket promedio por orden: R$ \${ticket_promedio:.3f}")

orders["order_purchase_timestamp"] = pd.to_datetime(orders["order_purchase_timestamp"])
orders["order_delivered_customer_date"] = pd.to_datetime(orders["order_delivered_customer_date"])
orders["dias_entrega"] = (
    orders["order_delivered_customer_date"] - orders["order_purchase_timestamp"]
).dt.days

relacion_calificacion = (
    orders.merge(order_reviews, on="order_id")
    .dropna(subset=["dias_entrega", "review_score"])
    .groupby("review_score")["dias_entrega"]
    .mean()
    .reset_index()
    .rename(columns={"review_score": "calificacion_estrellas", "dias_entrega": "promedio_dias_entrega"})
    .sort_values(by="calificacion_estrellas")
)
print(relacion_calificacion)`,
    htmlUrl: "docs/tareas/tarea-8/brazil-db.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-8/brazil-db.html"
  },
  {
    id: "tarea-9",
    titulo: "Procesamiento Distribuido y Análisis de Eventos e-Commerce con Apache Spark",
    descripcion: "Procesamiento distribuido a gran escala con PySpark sobre más de 10 millones de interacciones del dataset OTTO. Análisis del embudo de conversión (clicks, carts, orders), cálculo de sesiones únicas con countDistinct, detección de sesiones con mayor actividad y ranking de productos más cliqueados, agregados al carrito y comprados con visualizaciones analíticas en Matplotlib.",
    fecha: "Septiembre 2026",
    tags: ["Apache Spark", "PySpark", "Big Data", "Parquet", "Kaggle", "Matplotlib", "E-Commerce Analytics", "Distributed Computing"],
    criterios: [
      "Configuración de sesión distribuida de Apache Spark (SparkSession) en entorno local con asignación controlada de memoria y particiones de shuffle.",
      "Carga y validación de esquema de dataset masivo en formato Parquet (más de 10 millones de registros de interacciones).",
      "Agrupamiento y cálculo porcentual por tipo de evento (clicks, carts y orders) con representación gráfica en escala logarítmica.",
      "Determinación de cardinalidad única de sesiones de usuario mediante funciones optimizadas (countDistinct).",
      "Identificación y visualización de las 10 sesiones con mayor volumen de interacción combinada.",
      "Análisis del embudo de conversión y obtención del top 10 de productos con más clics, más agregados a carrito y con mayor conversión de compras."
    ],
    codigo: `import os
import kagglehub
import pandas as pd
import matplotlib.pyplot as plt
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, countDistinct, desc, round as spark_round

spark = SparkSession.builder \\
    .master('local[*]') \\
    .appName('Tarea9_OTTO_Analytics') \\
    .config('spark.driver.memory', '1500m') \\
    .config('spark.sql.shuffle.partitions', '8') \\
    .getOrCreate()

dataset_path = kagglehub.dataset_download('konradb/otto-dataset-in-dataframe', path='train_data_v1.parquet')
df = spark.read.parquet(dataset_path)

total_records = df.count()
print(f'Total de registros cargados: \${total_records:,}')

df_events = df.groupBy('type').count() \\
    .withColumnRenamed('count', 'total_eventos') \\
    .withColumn('porcentaje', spark_round((col('total_eventos') / total_records) * 100, 2)) \\
    .orderBy(desc('total_eventos'))
df_events.show()

total_sesiones = df.select(countDistinct('session').alias('total_sesiones_unicas')).collect()[0]['total_sesiones_unicas']
print(f'Número total de sesiones distintas: \${total_sesiones:,}')

top_sesiones = df.groupBy('session').count() \\
    .withColumnRenamed('count', 'total_interacciones') \\
    .orderBy(desc('total_interacciones')) \\
    .limit(10)

top_orders = df.filter(col('type') == 'orders') \\
    .groupBy('aid').count() \\
    .withColumnRenamed('count', 'total_compras') \\
    .orderBy(desc('total_compras')) \\
    .limit(10)
top_orders.show()`,
    htmlUrl: "docs/tareas/tarea-9/traindb-spark.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-9/traindb-spark.html"
  },
  {
    id: "tarea-10",
    titulo: "Modelado Relacional y Consultas SQL sobre Catálogo de Películas",
    descripcion: "Conexión remota exitosa desde DBeaver a una base de datos gestionada en Amazon RDS (AWS) para el diseño del esquema relacional DDL (tabla peliculas_jonathan con clave primaria y restricciones de dominio), poblado de datos DML y ejecución de 12 consultas SQL analíticas y operativas (proyecciones, filtros condicionales, ordenamiento, agregaciones AVG/COUNT con GROUP BY, búsquedas por patrón con LIKE y transacciones de actualización con UPDATE).",
    fecha: "Septiembre 2026",
    tags: ["AWS RDS", "DBeaver", "SQL", "MySQL", "Cloud Database", "DDL", "DML", "Relational Database"],
    criterios: [
      "Conexión remota verificada exitosamente desde el cliente DBeaver hacia instancia gestionada de Amazon RDS en AWS.",
      "Definición de tabla peliculas_jonathan con tipos de datos estructurados, clave primaria autoincremental y restricciones de dominio.",
      "Inserción por lotes de 10 largometrajes con diversidad de géneros, directores, duraciones y calificaciones.",
      "Filtrado condicional por disponibilidad, género cinematográfico y antigüedad.",
      "Aplicación de funciones de agregación (AVG) para métricas de duración y agrupación categórica (GROUP BY + COUNT).",
      "Búsqueda por patrones parciales de texto mediante operador LIKE y comodines.",
      "Actualización atómica de estado mediante UPDATE sobre registro específico y validación de consistencia."
    ],
    codigo: `USE cine;

CREATE TABLE peliculas_jonathan (
    pelicula_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    director VARCHAR(100) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    anio_estreno INT NOT NULL,
    duracion_minutos INT NOT NULL,
    calificacion DECIMAL(3, 1) NOT NULL,
    disponible BOOLEAN NOT NULL DEFAULT TRUE
);

SELECT * FROM peliculas_jonathan;

SELECT titulo, genero, anio_estreno FROM peliculas_jonathan;

SELECT * FROM peliculas_jonathan WHERE disponible = TRUE;

SELECT * FROM peliculas_jonathan WHERE genero = 'Ciencia Ficción';

SELECT * FROM peliculas_jonathan WHERE anio_estreno > 2015;

SELECT * FROM peliculas_jonathan WHERE calificacion > 8.0;

SELECT * FROM peliculas_jonathan ORDER BY anio_estreno DESC;

SELECT * FROM peliculas_jonathan ORDER BY calificacion DESC LIMIT 1;

SELECT AVG(duracion_minutos) AS duracion_promedio FROM peliculas_jonathan;

SELECT genero, COUNT(*) AS total_peliculas FROM peliculas_jonathan GROUP BY genero;

SELECT * FROM peliculas_jonathan WHERE titulo LIKE '%the%';

UPDATE peliculas_jonathan SET disponible = FALSE WHERE pelicula_id = 1;

SELECT pelicula_id, titulo, disponible FROM peliculas_jonathan WHERE pelicula_id = 1;`,
    mdUrl: "docs/tareas/tarea-10/queries-peliculas.md",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/tareas/tarea-10/queries-peliculas.md"
  }
];
const ejerciciosData = [
  {
    id: "ejercicio-1",
    titulo: "Práctica 1: Jupyter Notebook y Entornos Virtuales",
    descripcion: "Aprovisionamiento del entorno interactivo en Python: administración de versiones con pyenv, configuración y aislamiento de entornos virtuales (.venv), instalación de librerías para ciencia de datos y despliegue del servidor Jupyter Notebook en red local.",
    lenguaje: "Bash / Python",
    dificultad: "Básico",
    dificultadClase: "diff-basic",
    fecha: "Septiembre 2026",
    htmlUrl: "docs/ejercicios/ejercicio-1/Untitled.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/ejercicios/ejercicio-1/Untitled.html",
    codigo: `pyenv install 3.14.7
pyenv global 3.14.7
python --version
python -m venv .venv
source .venv/bin/activate
pip install notebook
jupyter notebook --no-browser --ip=0.0.0.0 --port=8888`
  },
  {
    id: "ejercicio-2",
    titulo: "Ejercicio 2: Procesamiento y Clasificación de Ventas",
    descripcion: "Resolución algorítmica para el procesamiento de colecciones numéricas en Python: cálculo de suma total acumulada, obtención de promedio aritmético y filtrado condicional de ventas altas y bajas.",
    lenguaje: "Python",
    dificultad: "Básico",
    dificultadClase: "diff-basic",
    fecha: "Septiembre 2026",
    htmlUrl: "docs/ejercicios/ejercicio-2/ejercicio-2-problema-python.html",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/ejercicios/ejercicio-2/ejercicio-2-problema-python.html",
    codigo: `ventas = [100, 300, 150, 400, 250]
total = 0
promedio = 0

for venta in ventas:
    total = total + venta
print(total)

for venta in ventas:
    promedio = total / len(ventas)
print(promedio)

for venta in ventas:
    if venta >= 250:
        print(venta, "-> Venta alta")
    else:
        print(venta, "-> Venta baja")`
  },
  {
    id: "ejercicio-3",
    titulo: "Práctica 3: Arquitectura y Paradigma MapReduce en Hadoop",
    descripcion: "Modelado algorítmico y conceptual del paradigma distribuido MapReduce para procesamiento masivo de texto (Word Count): etapas de entrada (Input), mapeo por pares clave-valor (Map), agrupamiento y ordenamiento de claves intermedias (Shuffle & Sort) y consolidación acumulada (Reduce).",
    lenguaje: "Hadoop / Python",
    dificultad: "Intermedio",
    dificultadClase: "diff-intermediate",
    fecha: "Septiembre 2026",
    pdfUrl: "docs/ejercicios/ejercicio-3/MapReduce.pdf",
    repoUrl: "https://github.com/DanielRousse/aws_xideral/blob/main/docs/ejercicios/ejercicio-3/MapReduce.pdf",
    codigo: `lines = [
    "Hadoop es rápido",
    "Hadoop es escalable",
    "Hadoop es interesante",
    "Yo aprendo Hadoop"
]

mapped = []
for line in lines:
    for word in line.lower().split():
        mapped.append((word, 1))

from collections import defaultdict
shuffled = defaultdict(list)
for word, count in mapped:
    shuffled[word].append(count)

reduced = {word: sum(counts) for word, counts in shuffled.items()}
for word, total in sorted(reduced.items(), key=lambda x: x[1], reverse=True):
    print(f"(\${word}, \${total})")`
  }
];
const certificacionesData = [
  {
    id: "cert-data-engineering-foundations",
    nombre: "Data Engineering on AWS Foundations",
    emisor: "AWS Training & Certification",
    fecha: "08 de Septiembre de 2026",
    descripcion: "Acreditación oficial expedida por Amazon Web Services sobre los fundamentos de ingeniería de datos en la nube: diseño y gestión del ciclo de vida del dato (ingesta, almacenamiento, procesamiento y visualización), data lakes en Amazon S3, pipelines analíticos y servicios de procesamiento como AWS Glue y Amazon Athena.",
    habilidades: ["AWS Data Engineering", "Amazon S3", "AWS Glue", "Data Lakes", "Pipelines de Datos", "Analytics"],
    pdfUrl: "docs/certificados/certificate-DataEngineeringOnAWSFoundations.pdf",
    icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
  },
  {
    id: "cert-well-architected",
    nombre: "AWS Well-Architected Foundations",
    emisor: "AWS Training & Certification",
    fecha: "08 de Septiembre de 2026",
    descripcion: "Acreditación oficial expedida por Amazon Web Services sobre los 6 pilares de excelencia arquitectónica en la nube: Excelencia Operativa, Seguridad, Fiabilidad, Eficacia del Rendimiento, Optimización de Costos y Sostenibilidad.",
    habilidades: ["AWS Cloud", "Well-Architected Framework", "Seguridad Cloud", "Optimización de Costos", "Alta Disponibilidad"],
    pdfUrl: "docs/certificados/certificate_AWSWellArchitectedFoundations.pdf",
    icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  },
  {
    id: "cert-serverless-mindset",
    nombre: "Getting into the Serverless Mindset",
    emisor: "AWS Training & Certification",
    fecha: "07 de Septiembre de 2026",
    descripcion: "Acreditación oficial de Amazon Web Services en fundamentos y principios de arquitecturas Serverless, diseño desacoplado dirigido por eventos (Event-Driven), microservicios modernos y servicios serverless nativos (AWS Lambda, Amazon API Gateway y Amazon DynamoDB).",
    habilidades: ["AWS Serverless", "Event-Driven", "AWS Lambda", "API Gateway", "Arquitecturas Cloud"],
    pdfUrl: "docs/certificados/certificate_GettingIntoTheServerlessMindset.pdf",
    icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    id: "cert-cloud-practitioner-essentials",
    nombre: "AWS Cloud Practitioner Essentials",
    emisor: "AWS Training & Certification",
    fecha: "14 de Septiembre de 2026",
    descripcion: "Acreditación oficial expedida por Amazon Web Services sobre los conceptos fundamentales del cloud computing: arquitectura global de AWS (Regiones, Zonas de Disponibilidad), modelos de computación (EC2, Lambda, ECS), almacenamiento y bases de datos (S3, EBS, RDS, DynamoDB), redes y seguridad (VPC, IAM, Grupos de Seguridad) y modelo de precios y facturación en la nube.",
    habilidades: ["AWS Cloud", "Cloud Computing", "Infraestructura Global", "AWS IAM", "Seguridad Cloud", "Facturación & Soporte AWS"],
    pdfUrl: "docs/certificados/certificate-AWSCloudPractitionerEssentials.pdf",
    icono: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`
  }
];
const proyectoIntegradorData = [
  {
    id: "nyc-urban-mobility-lakehouse",
    titulo: "NYC Urban Mobility Analytics Platform: Cloud Data Lakehouse en AWS",
    descripcion: "Plataforma empresarial de ingeniería de datos y analítica distribuida sobre más de 766 millones de registros y $23.35 mil millones de dólares del sistema de transporte de Nueva York (NYC TLC). Implementación de arquitectura Medallion (Bronze, Silver, Gold), ingesta y saneamiento serverless con AWS Lambda, procesamiento distribuido masivo y broadcast joins geoespaciales con Apache Spark en EC2, y despliegue continuo (CI/CD) de dashboard interactivo en Streamlit con Docker.",
    tags: [
      "AWS S3",
      "AWS Lambda",
      "Apache Spark",
      "PySpark",
      "Streamlit",
      "Docker",
      "CI/CD",
      "GitHub Actions",
      "Medallion Architecture",
      "Big Data",
      "Data Lakehouse"
    ],
    criterios: [
      "Arquitectura Medallion en Amazon S3: particionamiento optimizado en capas Bronze (raw), Silver (clean) y Gold (analytics).",
      "Pipeline Serverless con AWS Lambda para ingesta continua y normalización a compresión Snappy.",
      "Procesamiento distribuido a gran escala con Apache Spark 4.1.2 sobre datasets masivos (FHVhV) y broadcast hash joins con catálogo municipal de 265 zonas.",
      "Auditoría técnica de calidad con 98.31% de retención limpia y filtrado determinista de anomalías físicas y financieras.",
      "Dashboard interactivo containerizado con Streamlit y Docker en instancia AWS EC2 servido en el puerto 8501.",
      "Pipeline de integración y entrega continua (CI/CD) mediante GitHub Actions con runner autoalojado en EC2."
    ],
    codigo: `import os
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import DoubleType, IntegerType

BUCKET = os.environ.get('S3_BUCKET_NAME', 'xideralaws-curso-jonathan')
AWS_REGION = os.environ.get('AWS_DEFAULT_REGION', 'us-west-1')

LOOKUP_PATH = "s3a://" + BUCKET + "/proyecto-final/lookup/taxi_zone_lookup.csv"
CLEAN_PATH = "s3a://" + BUCKET + "/proyecto-final/clean_data/*/*/*.parquet"
GOLD_PATH = "s3a://" + BUCKET + "/proyecto-final/analytics/gold_kpi_summary/"

def build_spark_session():
    return SparkSession.builder \\
        .appName('NYC-Urban-Mobility-Analytics-Full-Gold') \\
        .config('spark.sql.adaptive.enabled', 'true') \\
        .config('spark.sql.adaptive.coalescePartitions.enabled', 'true') \\
        .config('spark.sql.shuffle.partitions', '16') \\
        .getOrCreate()

def run_gold_analytics(spark):
    lookup = spark.read.option('header', 'true').csv(LOOKUP_PATH)
    trips = spark.read.parquet(CLEAN_PATH)
    
    pu_lookup = lookup.select(
        F.col('LocationID').cast(IntegerType()).alias('location_id'),
        F.col('Borough').alias('pu_borough'),
        F.col('Zone').alias('pu_zone')
    )
    do_lookup = lookup.select(
        F.col('LocationID').cast(IntegerType()).alias('location_id'),
        F.col('Borough').alias('do_borough'),
        F.col('Zone').alias('do_zone')
    )
    
    enriched = trips \\
        .join(F.broadcast(pu_lookup), trips.pulocationid == pu_lookup.location_id, 'left') \\
        .join(F.broadcast(do_lookup), trips.dolocationid == do_lookup.location_id, 'left')
        
    gold_kpis = enriched.groupBy('service_type', F.year('pickup_datetime').alias('year')) \\
        .agg(
            F.count('*').alias('total_trips'),
            F.round(F.sum('total_amount'), 2).alias('gross_revenue'),
            F.round(F.avg('trip_duration_minutes'), 2).alias('avg_duration_min'),
            F.round(F.avg('trip_distance'), 2).alias('avg_distance_miles')
        )
        
    gold_kpis.write.mode('overwrite').parquet(GOLD_PATH)`,
    repoUrl: "https://github.com/DanielRousse/streamlit-curso",
    docUrl: "docs/special/proyecto_integrador_readme.md",
    svgUrl: "docs/special/ArquitecturaProj.drawio.svg"
  }
];

function inicializarApp() {
  renderTareas();
  renderEjercicios();
  renderCertificaciones();
  renderProyectoIntegrador();
  initModal();
  initNavigation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarApp);
} else {
  inicializarApp();
}

function renderTareas() {
  const container = document.getElementById("tareas-grid");
  if (!container) return;

  if (tareasData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay tareas</div>`;
    return;
  }

  container.innerHTML = tareasData.map(tarea => {
    const tagsHtml = (tarea.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join("");

    return `
      <article class="card">
        <div>
          <h3 class="card-title">${tarea.titulo}</h3>
          <p class="card-desc">${tarea.descripcion || ""}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>
        <div class="card-footer">
          <span class="card-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${tarea.fecha || "2026"}
          </span>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            ${tarea.htmlUrl ? `
              <a href="${tarea.htmlUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" style="background:rgba(0, 245, 160, 0.08); border-color:rgba(0, 245, 160, 0.25); color:var(--cyan-neon); text-decoration:none;">
                Ver Cuaderno
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ` : ''}
            ${tarea.pdfUrl ? `
              <a href="${tarea.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" style="background:rgba(244, 63, 94, 0.08); border-color:rgba(244, 63, 94, 0.25); color:#fb7185; text-decoration:none;">
                PDF
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </a>
            ` : ''}
            ${tarea.mdUrl ? `
              <button class="btn-card-action" onclick="abrirModalMarkdown('${tarea.mdUrl}', '${tarea.titulo}')" style="background:rgba(0, 210, 255, 0.08); border-color:rgba(0, 210, 255, 0.25); color:var(--primary-cyan);">
                Reporte (.md)
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </button>
            ` : ''}
            <button class="btn-card-action" onclick="abrirModalTarea('${tarea.id}')">
              Detalles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderEjercicios() {
  const container = document.getElementById("ejercicios-grid");
  if (!container) return;

  if (ejerciciosData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay ejercicios</div>`;
    return;
  }

  container.innerHTML = ejerciciosData.map(ej => {
    return `
      <article class="exercise-card">
        <div class="exercise-header">
          <span class="difficulty-badge ${ej.dificultadClase || 'diff-intermediate'}">${ej.dificultad || 'Práctica'}</span>
          <span class="tech-badge" style="font-size:0.75rem; padding:0.2rem 0.5rem;">${ej.lenguaje || 'Código'}</span>
        </div>
        <h3 class="card-title" style="font-size:1.1rem;">${ej.titulo}</h3>
        <p class="card-desc" style="font-size:0.88rem;">${ej.descripcion || ''}</p>
        ${ej.codigo ? `<pre class="code-snippet-preview"><code>${escapeHTML(ej.codigo.split("\n").slice(0, 3).join("\n"))}...</code></pre>` : ''}
        <div class="card-footer" style="margin-top:auto;">
          <span style="font-size:0.8rem; color:var(--text-dim); font-family:var(--font-mono);">&lt;/&gt; Solución</span>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            ${ej.htmlUrl ? `
              <a href="${ej.htmlUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" style="background:rgba(0, 245, 160, 0.08); border-color:rgba(0, 245, 160, 0.25); color:var(--cyan-neon); text-decoration:none;">
                Ver Cuaderno
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ` : ''}
            ${ej.pdfUrl ? `
              <a href="${ej.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action" style="background:rgba(244, 63, 94, 0.08); border-color:rgba(244, 63, 94, 0.25); color:#fb7185; text-decoration:none;">
                PDF
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </a>
            ` : ''}
            <button class="btn-card-action" onclick="abrirModalEjercicio('${ej.id}')">
              Inspeccionar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderCertificaciones() {
  const container = document.getElementById("certificaciones-grid");
  if (!container) return;

  if (certificacionesData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay certificaciones</div>`;
    return;
  }

  container.innerHTML = certificacionesData.map(cert => {
    const skillsHtml = (cert.habilidades || []).map(h => `<span class="tag-pill">${h}</span>`).join("");
    return `
      <div class="cert-card">
        <div class="cert-icon-wrap">
          ${cert.icono || `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`}
        </div>
        <div style="flex-grow:1;">
          <div class="cert-issuer">${cert.emisor || "Emisor"}</div>
          <h3 class="cert-name">${cert.nombre}</h3>
          <div class="cert-date">${cert.fecha || "2026"}</div>
          <p class="card-desc" style="font-size:0.88rem; margin-bottom:0.75rem;">${cert.descripcion || ""}</p>
          <div class="card-tags">${skillsHtml}</div>
          <div style="margin-top:1rem; display:flex; gap:0.75rem; align-items:center; justify-content:space-between; flex-wrap:wrap;">
            <div class="cert-badge-verify">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Acreditado
            </div>
            ${cert.pdfUrl ? `
              <button class="btn-pdf" onclick="abrirModalCertificacion('${cert.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Ver Certificado
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderProyectoIntegrador() {
  const container = document.getElementById("proyecto-integrador-grid");
  if (!container) return;

  if (proyectoIntegradorData.length === 0) {
    container.innerHTML = `<div class="empty-state">No hay proyecto integrador</div>`;
    return;
  }

  container.innerHTML = proyectoIntegradorData.map(p => {
    const tagsHtml = (p.tags || []).map(t => `<span class="tag-pill">${t}</span>`).join("");
    return `
      <div class="special-wrapper" style="grid-column: 1 / -1;">
        <div class="special-badge-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          AWS Cloud Data Lakehouse • 766M+ Registros
        </div>
        <div class="special-grid">
          <div>
            <h3 class="special-title"><span>NYC Urban Mobility</span><br>Analytics Platform</h3>
            <p class="special-desc">${p.descripcion || ""}</p>
            <div class="roadmap-timeline">
              <div class="roadmap-item">
                <div class="roadmap-phase">Capa Bronze • Ingesta Serverless</div>
                <div class="roadmap-name">AWS Lambda 1 + Amazon S3</div>
                <div class="roadmap-details">Extracción y streaming continuo de 117 datasets TLC (2024-2026, ~17 GB crudos).</div>
              </div>
              <div class="roadmap-item">
                <div class="roadmap-phase">Capa Silver • Saneamiento &amp; Calidad</div>
                <div class="roadmap-name">AWS Lambda 2 Cleaner (Snappy)</div>
                <div class="roadmap-details">Filtros deterministas con 98.31% de retención limpia y estandarización de esquemas.</div>
              </div>
              <div class="roadmap-item">
                <div class="roadmap-phase">Capa Gold • Big Data Distribuido</div>
                <div class="roadmap-name">Apache Spark 4.1.2 en Amazon EC2</div>
                <div class="roadmap-details">Broadcast Hash Joins sobre catálogo de 265 zonas y tablas dimensionales analíticas.</div>
              </div>
              <div class="roadmap-item">
                <div class="roadmap-phase">Serving Layer • Visualización &amp; CI/CD</div>
                <div class="roadmap-name">Streamlit + Docker + GitHub Actions</div>
                <div class="roadmap-details">Dashboard interactivo en puerto 8501 con runner autoalojado y despliegue automatizado.</div>
              </div>
            </div>
            <div class="card-tags" style="margin: 1.5rem 0 1rem;">${tagsHtml}</div>
            <div style="display:flex; flex-wrap:wrap; gap:0.75rem; margin-top:1.5rem;">
              <button class="btn btn-primary" onclick="abrirModalProyecto('${p.id}')">
                Ver Código y Métricas
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                Repositorio GitHub
              </a>
              <button class="btn btn-special-outline" onclick="abrirModalSvg('docs/special/ArquitecturaProj.drawio.svg', 'Diagrama de Arquitectura Cloud (Medallion)', '${p.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                Diagrama SVG
              </button>
            </div>
          </div>
          <div>
            <div class="special-architecture-box">
              <div class="arch-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                ESPECIFICACIONES DE ARQUITECTURA
              </div>
              <div class="arch-pill-list">
                <div class="arch-pill"><span class="arch-pill-title">Ingesta Bronze</span><span class="arch-pill-tech">AWS S3 + Lambda Ingestion</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Saneamiento Silver</span><span class="arch-pill-tech">Lambda Cleaner (Snappy)</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Cómputo Distribuido</span><span class="arch-pill-tech">Apache Spark 4.1.2</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Enriquecimiento Geo</span><span class="arch-pill-tech">Broadcast Join (265 Zonas)</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Capa Gold</span><span class="arch-pill-tech">5 Tablas Dimensionales</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Serving &amp; UI</span><span class="arch-pill-tech">Streamlit Docker (EC2:8501)</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Automatización CI/CD</span><span class="arch-pill-tech">GitHub Actions Self-Hosted</span></div>
                <div class="arch-pill"><span class="arch-pill-title">Volumen Procesado</span><span class="arch-pill-tech" style="color:var(--accent-neon); font-weight:700;">766M+ Filas ($23.35B)</span></div>
              </div>
              <div style="margin-top: 1.25rem; padding: 0.85rem 1rem; background: rgba(0, 245, 160, 0.04); border: 1px dashed rgba(0, 245, 160, 0.3); border-radius: var(--radius-sm); text-align: center; cursor: pointer; transition: all 0.2s ease;" onclick="abrirModalSvg('docs/special/ArquitecturaProj.drawio.svg', 'Diagrama de Arquitectura Cloud (Medallion)', '${p.id}')">
                <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--accent-neon); font-weight: 600; font-size: 0.88rem;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  Ver Diagrama Vectorial SVG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function initModal() {
  const overlay = document.getElementById("modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");

  if (closeBtn && overlay) {
    closeBtn.addEventListener("click", cerrarModal);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) cerrarModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModal();
  });

  const copyBtn = document.getElementById("btn-copy-code");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const codeElem = document.getElementById("modal-code-content");
      if (codeElem && codeElem.textContent) {
        navigator.clipboard.writeText(codeElem.textContent).then(() => {
          mostrarToast("Código copiado al portapapeles con éxito");
        });
      }
    });
  }
}

function abrirModalTarea(id) {
  const tarea = tareasData.find(t => t.id === id);
  if (!tarea) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  document.getElementById("modal-title").textContent = tarea.titulo;
  
  document.getElementById("modal-badges").innerHTML = "";

  const criteriosList = (tarea.criterios && tarea.criterios.length > 0)
    ? `<div style="margin:1rem 0;">
        <h4 style="color:var(--text-main); font-size:0.95rem; margin-bottom:0.5rem;">Criterios Cumplidos:</h4>
        <ul style="padding-left:1.25rem; font-size:0.9rem; color:var(--text-muted);">
          ${tarea.criterios.map(c => `<li style="margin-bottom:0.3rem;">${c}</li>`).join("")}
        </ul>
      </div>`
    : "";

  document.getElementById("modal-body").innerHTML = `
    <p>${tarea.descripcion || ""}</p>
    ${criteriosList}
  `;

  const hasDoc = Boolean(tarea.pdfUrl || tarea.htmlUrl);
  if (hasDoc) {
    if (modalContent) modalContent.classList.add("has-pdf");
  } else {
    if (modalContent) modalContent.classList.remove("has-pdf");
  }

  if (hasDoc && tarea.codigo) {
    if (modalTabs) modalTabs.style.display = "flex";
    const tabBtnDoc = document.getElementById("tab-btn-pdf");
    if (tabBtnDoc) {
      tabBtnDoc.innerHTML = tarea.htmlUrl
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Cuaderno Jupyter`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Documento PDF`;
    }
  } else {
    if (modalTabs) modalTabs.style.display = "none";
  }

  configurarVisorCodigo(tarea.codigo, "Código");
  configurarEnlacesYPdf(tarea.repoUrl, tarea.pdfUrl, tarea.htmlUrl);

  if (hasDoc) {
    cambiarPestanaModal("pdf");
  } else {
    cambiarPestanaModal("code");
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function abrirModalEjercicio(id) {
  const ej = ejerciciosData.find(e => e.id === id);
  if (!ej) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  const tabBtnDoc = document.getElementById("tab-btn-pdf");

  const hasDoc = Boolean(ej.pdfUrl || ej.htmlUrl);
  if (hasDoc) {
    if (modalContent) modalContent.classList.add("has-pdf");
    if (modalTabs) modalTabs.style.display = "flex";
    if (tabBtnDoc) {
      tabBtnDoc.innerHTML = ej.htmlUrl
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Cuaderno Jupyter`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Documento PDF`;
    }
  } else {
    if (modalContent) modalContent.classList.remove("has-pdf");
    if (modalTabs) modalTabs.style.display = "none";
  }

  document.getElementById("modal-title").textContent = ej.titulo;

  let diffBadge = `<span class="difficulty-badge ${ej.dificultadClase || 'diff-intermediate'}">${ej.dificultad || 'Práctica'}</span>`;
  let langBadge = `<span class="module-badge">${ej.lenguaje || 'Código'}</span>`;
  document.getElementById("modal-badges").innerHTML = langBadge + diffBadge;

  document.getElementById("modal-body").innerHTML = `<p>${ej.descripcion || ""}</p>`;

  configurarVisorCodigo(ej.codigo, ej.lenguaje);
  configurarEnlacesYPdf(ej.repoUrl, ej.pdfUrl, ej.htmlUrl);

  if (hasDoc) {
    cambiarPestanaModal("pdf");
  } else {
    cambiarPestanaModal("code");
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function abrirModalCertificacion(id) {
  const cert = certificacionesData.find(c => c.id === id);
  if (!cert) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  const tabBtnDoc = document.getElementById("tab-btn-pdf");

  if (cert.pdfUrl && modalContent) modalContent.classList.add("has-pdf");
  if (modalTabs) modalTabs.style.display = "none";
  if (tabBtnDoc) tabBtnDoc.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Certificado PDF`;

  document.getElementById("modal-title").textContent = cert.nombre;
  document.getElementById("modal-badges").innerHTML = `<span class="module-badge">${cert.emisor}</span><span class="status-badge status-completed">Acreditado</span>`;
  document.getElementById("modal-body").innerHTML = `<p>${cert.descripcion || ""}</p>`;

  configurarVisorCodigo(null, null);
  configurarEnlacesYPdf(null, cert.pdfUrl, null);
  cambiarPestanaModal("pdf");

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function abrirModalProyecto(id) {
  const p = proyectoIntegradorData.find(item => item.id === id);
  if (!p) return;

  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  if (modalContent) modalContent.classList.remove("has-pdf");
  if (modalTabs) modalTabs.style.display = "none";

  document.getElementById("modal-title").textContent = p.titulo;
  document.getElementById("modal-badges").innerHTML = `
    <span class="tag-pill" style="background: rgba(0, 245, 160, 0.15); color: var(--accent-neon); border-color: rgba(0, 245, 160, 0.4);">Data Lakehouse</span>
    <span class="tag-pill" style="background: rgba(0, 210, 255, 0.15); color: var(--primary-cyan); border-color: rgba(0, 210, 255, 0.4);">766M+ Registros</span>
    <span class="tag-pill" style="background: rgba(139, 92, 246, 0.15); color: #c084fc; border-color: rgba(139, 92, 246, 0.4);">$23.35B USD</span>
  `;

  const criteriosList = (p.criterios && p.criterios.length > 0)
    ? `<div style="margin-top:1.25rem;">
        <h4 style="color:var(--text-main); font-size:0.95rem; margin-bottom:0.5rem;">Criterios y Logros Técnicos:</h4>
        <ul style="padding-left:1.25rem; font-size:0.9rem; color:var(--text-muted);">
          ${p.criterios.map(c => `<li style="margin-bottom:0.3rem;">${c}</li>`).join("")}
        </ul>
      </div>`
    : "";

  const docsList = `
    <div style="margin-top:1.25rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:1rem;">
      <h4 style="color:var(--primary-cyan); font-size:0.95rem; margin-bottom:0.75rem; display:flex; align-items:center; gap:0.5rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Documentación Técnica del Proyecto (Directorio special):
      </h4>
      <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.88rem;">
        <button type="button" onclick="abrirModalMarkdown('docs/special/proyecto_integrador_readme.md', 'README: NYC Urban Mobility Analytics Platform', '${p.id}')" style="width:100%; text-align:left; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:4px; padding:0.5rem 0.75rem; color:var(--text-main); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            README Principal del Proyecto Integrador
          </span>
          <span style="color:var(--accent-neon); font-family:var(--font-mono); font-size:0.75rem;">Ver en Pantalla &rarr;</span>
        </button>
        <button type="button" onclick="abrirModalMarkdown('docs/special/architecture.md', 'Arquitectura Cloud y Patrón Medallion', '${p.id}')" style="width:100%; text-align:left; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:4px; padding:0.5rem 0.75rem; color:var(--text-main); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Arquitectura Cloud y Patrón Medallion
          </span>
          <span style="color:var(--primary-cyan); font-family:var(--font-mono); font-size:0.75rem;">Ver en Pantalla &rarr;</span>
        </button>
        <button type="button" onclick="abrirModalMarkdown('docs/special/data_quality.md', 'Auditoría de Calidad (Bronze vs Silver)', '${p.id}')" style="width:100%; text-align:left; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:4px; padding:0.5rem 0.75rem; color:var(--text-main); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Auditoría de Calidad (Bronze vs Silver)
          </span>
          <span style="color:var(--primary-cyan); font-family:var(--font-mono); font-size:0.75rem;">Ver en Pantalla &rarr;</span>
        </button>
        <button type="button" onclick="abrirModalMarkdown('docs/special/data_dictionary.md', 'Diccionario de Datos y Selección de Features', '${p.id}')" style="width:100%; text-align:left; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:4px; padding:0.5rem 0.75rem; color:var(--text-main); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Diccionario de Datos y Selección de Features
          </span>
          <span style="color:var(--primary-cyan); font-family:var(--font-mono); font-size:0.75rem;">Ver en Pantalla &rarr;</span>
        </button>
        <button type="button" onclick="abrirModalSvg('docs/special/ArquitecturaProj.drawio.svg', 'Diagrama Oficial de Arquitectura (Draw.io SVG)', '${p.id}')" style="width:100%; text-align:left; background:rgba(0, 245, 160, 0.05); border:1px solid rgba(0, 245, 160, 0.2); border-radius:4px; padding:0.5rem 0.75rem; color:var(--accent-neon); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
          <span style="font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            Diagrama Oficial de Arquitectura (Draw.io SVG)
          </span>
          <span style="color:var(--accent-neon); font-family:var(--font-mono); font-size:0.75rem;">Ver en Pantalla &rarr;</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById("modal-body").innerHTML = `
    <p>${p.descripcion || ""}</p>
    ${criteriosList}
    ${docsList}
  `;

  configurarVisorCodigo(p.codigo, "Python / PySpark");
  configurarEnlacesYPdf(p.repoUrl, null, null);
  cambiarPestanaModal("code");

  const actionsBar = document.getElementById("modal-actions-bar");
  if (actionsBar) {
    actionsBar.innerHTML = `
      <button class="btn-pdf" style="background: rgba(0, 245, 160, 0.1); border-color: rgba(0, 245, 160, 0.3); color: var(--accent-neon); cursor: pointer;" onclick="abrirModalSvg('docs/special/ArquitecturaProj.drawio.svg', 'Diagrama de Arquitectura Cloud (Medallion)', '${p.id}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
        Ver Diagrama SVG
      </button>
      <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-repo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        Ver Repositorio GitHub
      </a>
    `;
    actionsBar.style.display = "flex";
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function cambiarPestanaModal(tab) {
  const pdfWrap = document.getElementById("modal-pdf-wrap");
  const codeWrap = document.getElementById("modal-code-wrap");
  const btnPdf = document.getElementById("tab-btn-pdf");
  const btnCode = document.getElementById("tab-btn-code");

  if (tab === "pdf") {
    if (pdfWrap) pdfWrap.style.display = "block";
    if (codeWrap) codeWrap.style.display = "none";
    if (btnPdf) btnPdf.classList.add("active");
    if (btnCode) btnCode.classList.remove("active");
  } else {
    if (pdfWrap) pdfWrap.style.display = "none";
    if (codeWrap) codeWrap.style.display = "block";
    if (btnPdf) btnPdf.classList.remove("active");
    if (btnCode) btnCode.classList.add("active");
  }
}

function configurarVisorCodigo(codigo, lenguaje) {
  const codeWrap = document.getElementById("modal-code-wrap");
  const codeElem = document.getElementById("modal-code-content");
  const langElem = document.getElementById("modal-code-lang");

  if (codigo) {
    codeWrap.style.display = "block";
    codeElem.textContent = codigo;
    langElem.textContent = lenguaje ? `< /> ${lenguaje}` : "< /> Código";
  } else {
    codeWrap.style.display = "none";
    codeElem.textContent = "";
  }
}

function configurarEnlacesYPdf(repoUrl, pdfUrl, htmlUrl) {
  const pdfWrap = document.getElementById("modal-pdf-wrap");
  const pdfObj = document.getElementById("modal-pdf-object");
  const pdfEmbed = document.getElementById("modal-pdf-embed");
  const iframeFrame = document.getElementById("modal-iframe-frame");
  const pdfFilename = document.getElementById("modal-pdf-filename");
  const btnPdfOpen = document.getElementById("btn-pdf-open");
  const btnPdfDownload = document.getElementById("btn-pdf-download");
  const btnFallbackOpen = document.getElementById("btn-pdf-fallback-open");
  const btnFallbackDownload = document.getElementById("btn-pdf-fallback-download");
  const actionsBar = document.getElementById("modal-actions-bar");

  if (pdfUrl) {
    pdfWrap.style.display = "block";
    if (pdfObj) {
      pdfObj.style.display = "block";
      pdfObj.data = pdfUrl;
    }
    if (pdfEmbed) {
      pdfEmbed.style.display = "block";
      pdfEmbed.src = pdfUrl;
    }
    if (iframeFrame) {
      iframeFrame.style.display = "none";
      iframeFrame.src = "";
    }
    const fname = pdfUrl.split("/").pop();
    if (pdfFilename) pdfFilename.textContent = fname;
    if (btnPdfOpen) {
      btnPdfOpen.href = pdfUrl;
      btnPdfOpen.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Abrir Visor Completo`;
    }
    if (btnPdfDownload) {
      btnPdfDownload.href = pdfUrl;
      btnPdfDownload.setAttribute("download", fname);
      btnPdfDownload.style.display = "inline-flex";
      btnPdfDownload.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar`;
    }
    if (btnFallbackOpen) btnFallbackOpen.href = pdfUrl;
    if (btnFallbackDownload) {
      btnFallbackDownload.href = pdfUrl;
      btnFallbackDownload.setAttribute("download", fname);
    }
  } else if (htmlUrl) {
    pdfWrap.style.display = "block";
    if (pdfObj) {
      pdfObj.style.display = "none";
      pdfObj.data = "";
    }
    if (pdfEmbed) {
      pdfEmbed.style.display = "none";
      pdfEmbed.src = "";
    }
    if (iframeFrame) {
      iframeFrame.style.display = "block";
      iframeFrame.src = htmlUrl;
    }
    const fname = htmlUrl.split("/").pop();
    if (pdfFilename) pdfFilename.textContent = fname + " (Cuaderno Jupyter)";
    if (btnPdfOpen) {
      btnPdfOpen.href = htmlUrl;
      btnPdfOpen.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg> Abrir Pantalla Completa`;
    }
    if (btnPdfDownload) {
      btnPdfDownload.href = htmlUrl;
      btnPdfDownload.setAttribute("download", fname);
      btnPdfDownload.style.display = "inline-flex";
      btnPdfDownload.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar HTML`;
    }
  } else {
    pdfWrap.style.display = "none";
    if (pdfObj) {
      pdfObj.data = "";
      pdfObj.style.display = "block";
    }
    if (pdfEmbed) {
      pdfEmbed.src = "";
      pdfEmbed.style.display = "block";
    }
    if (iframeFrame) {
      iframeFrame.src = "";
      iframeFrame.style.display = "none";
    }
  }

  let botonesHtml = "";
  if (htmlUrl) {
    botonesHtml += `
      <a href="${htmlUrl}" target="_blank" rel="noopener noreferrer" class="btn-pdf" style="background: rgba(0, 245, 160, 0.1); border-color: rgba(0, 245, 160, 0.3); color: var(--cyan-neon);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        Abrir Cuaderno (HTML)
      </a>
    `;
  }

  if (repoUrl) {
    botonesHtml += `
      <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn-repo">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        Ver en GitHub
      </a>
    `;
  }

  if (pdfUrl) {
    botonesHtml += `
      <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn-pdf">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        Abrir PDF
      </a>
    `;
  }

  if (botonesHtml) {
    actionsBar.innerHTML = botonesHtml;
    actionsBar.style.display = "flex";
  } else {
    actionsBar.innerHTML = "";
    actionsBar.style.display = "none";
  }
}

function cerrarModal() {
  const overlay = document.getElementById("modal-overlay");
  const pdfObj = document.getElementById("modal-pdf-object");
  const pdfEmbed = document.getElementById("modal-pdf-embed");
  const iframeFrame = document.getElementById("modal-iframe-frame");
  const modalContent = document.getElementById("modal-content");
  if (overlay) {
    overlay.classList.remove("active");
    if (pdfObj) pdfObj.data = "";
    if (pdfEmbed) pdfEmbed.src = "";
    if (iframeFrame) iframeFrame.src = "";
    if (modalContent) modalContent.classList.remove("has-pdf");
    document.body.style.overflow = "";
  }
}

function initNavigation() {
  const mobileBtn = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }

  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop - 120;
      const sectionId = sec.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add("active");
      } else {
        if (navLink) navLink.classList.remove("active");
      }
    });
  });
}

function mostrarToast(mensaje) {
  let toast = document.getElementById("toast-notif");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notif";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f5a0" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${mensaje}</span>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

window.abrirModalTarea = abrirModalTarea;
window.abrirModalEjercicio = abrirModalEjercicio;
window.abrirModalCertificacion = abrirModalCertificacion;
window.abrirModalProyecto = abrirModalProyecto;
window.cerrarModal = cerrarModal;
window.mostrarToast = mostrarToast;
window.cambiarPestanaModal = cambiarPestanaModal;
window.abrirModalSvg = abrirModalSvg;
window.abrirModalMarkdown = abrirModalMarkdown;

const embeddedMarkdownDocs = {"docs/tareas/tarea-1/tarea-1-entornos.md":"# Tarea 1: Aprovisionamiento de Herramientas y Configuración de Entornos\n\n**Programa:** AWS Xideral  \n**Módulo:** Módulo 1 - Infraestructura, Cloud & Entornos de Desarrollo  \n**Autor:** Jonathan Daniel Reyes Gordillo  \n**Fecha:** Septiembre 2026  \n**Estado:** Completada  \n\n---\n\n## 1. Resumen Ejecutivo\n\nEn esta primera práctica se abordó el aprovisionamiento y configuración de dos entornos esenciales de trabajo para el desarrollo e investigación en ingeniería de software:\n\n1. **Entorno Cloud (AWS EC2):** Despliegue de una máquina virtual remota en la nube de Amazon Web Services, actualización del sistema base, instalación de shells avanzadas (`zsh`), contenedorización (`docker`) y análisis de restricciones de almacenamiento durante la instalación de paquetes.\n2. **Entorno Local (CachyOS - Arch Linux):** Configuración de un entorno aislado de análisis de datos e interactividad en una estación de trabajo optimizada (configurando entornos virtuales con `venv`, adaptando el entorno a la sintaxis de **Fish Shell**, instalando Jupyter Notebook y registrando un kernel personalizado), complementado con la instalación y aprovisionamiento del motor de contenedores (**Docker & Docker Compose**), asignación de permisos de usuario sin `sudo` y validación con contenedor de prueba.\n\n---\n\n## 2. Entorno Cloud: AWS EC2\n\n### 2.1 Especificaciones de la Instancia\n* **Plataforma Cloud:** Amazon Web Services (AWS).\n* **Servicio:** Amazon Elastic Compute Cloud (EC2).\n* **Sistema Operativo:** Distribución Linux (Ubuntu Server).\n* **Objetivo:** Disponer de una máquina remota accesible vía SSH para ejecutar servicios contenerizados y despliegues.\n\n### 2.2 Secuencia de Comandos y Aprovisionamiento\n\n#### Paso 1: Actualización de Repositorios y Sistema Operativo\nAntes de desplegar cualquier herramienta, se sincronizaron las listas de paquetes y se actualizaron las dependencias del sistema operativo:\n\n```bash\nsudo apt update -y\nsudo apt upgrade -y\n```\n\n#### Paso 2: Instalación y Configuración de Zsh\nPara optimizar el flujo de trabajo en la terminal remota y mejorar la productividad con autocompletado y temas:\n\n```bash\nsudo apt install -y zsh\nzsh --version\n```\n\n#### Paso 3: Instalación del Motor de Contenedores (Docker Engine Oficial)\nSe configuró el repositorio APT oficial de Docker y se instalaron los paquetes de la versión estable:\n\n```bash\nsudo apt update\nsudo apt install -y ca-certificates curl\nsudo install -m 0755 -d /etc/apt/keyrings\nsudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc\nsudo chmod a+r /etc/apt/keyrings/docker.asc\n\nsudo tee /etc/apt/sources.list.d/docker.sources <<EOF\nTypes: deb\nURIs: https://download.docker.com/linux/ubuntu\nSuites: $(. /etc/os-release && echo \"${UBUNTU_CODENAME:-$VERSION_CODENAME}\")\nComponents: stable\nArchitectures: $(dpkg --print-architecture)\nSigned-By: /etc/apt/keyrings/docker.asc\nEOF\n\nsudo apt update\nsudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin\n```\n\n* **Validación del Servicio:**\n```bash\nsudo systemctl status docker\nsudo systemctl start docker\n```\n\n* **Comprobación con Contenedor de Prueba:**\n```bash\nsudo docker run hello-world\n```\n\n### 2.3 Incidente Técnico y Troubleshooting: Límite de Almacenamiento\n* **Problema Encontrado:** Al intentar instalar dependencias adicionales de compilación y runtime para Python en la instancia EC2, el proceso falló o quedó incompleto.\n* **Causa Raíz:** El volumen de almacenamiento raíz (EBS Volume) asignado por defecto a la instancia (típicamente 8 GB en la capa gratuita `t2.micro` / `t3.micro`) se saturó rápidamente tras el `upgrade` masivo del sistema, los paquetes de Docker y las imágenes intermedias.\n* **Diagnóstico Ejecutado:**\n  ```bash\n  df -h /\n  ```\n* **Conclusión Técnica:** Para continuar con cargas de trabajo de compilación intensiva en EC2, se requiere redimensionar el volumen EBS (Elastic Block Store) o purgar la caché de APT (`sudo apt clean`) y artefactos huérfanos de Docker (`docker system prune -a`).\n\n---\n\n## 3. Entorno Local: CachyOS (Arch Linux)\n\n### 3.1 Especificaciones del Sistema\n* **Sistema Operativo:** CachyOS (distribución basada en Arch Linux con kernel optimizado nativo x86-64-v3/v4).\n* **Shell de Terminal:** Fish Shell (`/usr/bin/fish`).\n* **Python Base:** Python 3.14.7 nativo (disponible en `/usr/bin/python`).\n* **Memoria RAM:** 8 GB físicos con compresión dinámica activa vía `zram0`.\n* **Ruta de Trabajo:** `/home/rousse/Documents/Curso-Java/curso-aws`.\n\n### 3.2 Secuencia de Configuración: Entorno Python & Jupyter\n\n#### Paso 1: Acceso al Directorio del Proyecto\nNavegar al espacio de trabajo asignado para el repositorio de prácticas del curso:\n\n```fish\ncd /home/rousse/Documents/Curso-Java/curso-aws\n```\n\n#### Paso 2: Omitir la Compilación con Pyenv\nAl utilizar una distribución Rolling Release como CachyOS, el sistema ya cuenta con la versión más reciente y optimizada de Python (`Python 3.14.7`), por lo que no es necesario instalar paquetes pesados de compilación (`build-essential`, `gcc`, `make`) ni utilizar `pyenv` para compilar manualmente el binario.\n\n#### Paso 3: Creación del Entorno Virtual Aislado (`venv`)\nSe generó el entorno virtual en una carpeta local oculta `.venv` para aislar las librerías del proyecto sin contaminar los paquetes del gestor `pacman` del sistema operativo:\n\n```fish\npython -m venv .venv\n```\n\n#### Paso 4: Activación del Entorno Virtual en Fish Shell\n> **Nota técnica:** El script tradicional `source .venv/bin/activate` está diseñado para Bash/Zsh y genera errores de sintaxis al evaluar declaraciones `case` dentro de Fish Shell. Por ende, se invoca el archivo específico provisto por Python para Fish:\n\n```fish\nsource .venv/bin/activate.fish\n```\n*(Se confirma la activación cuando la terminal muestra el prompt o prefijo `(.venv)`).*\n\n#### Paso 5: Actualización del Gestor de Paquetes e Instalación de Jupyter\nDentro del entorno virtual activado, se actualizó `pip` y se descargaron los paquetes requeridos para el análisis de datos:\n\n```fish\npython -m pip install --upgrade pip\npip install notebook ipykernel\n```\n\n#### Paso 6: Registro del Kernel Personalizado para Jupyter\nSe vinculó el entorno virtual como un kernel seleccionable en la interfaz interactiva de Jupyter:\n\n```fish\npython -m ipykernel install --user --name=curso-aws --display-name=\"Python (curso-aws)\"\n```\n\n#### Paso 7: Validación y Ejecución\nSe inició el servidor interactivo de cuadernos:\n\n```fish\njupyter notebook\n```\n\n* **Comprobación:** Se abrió la interfaz en el navegador web a través de la URL con token (`http://localhost:8888/tree`), comprobando la correcta inicialización del dashboard y la disponibilidad del kernel `Python (curso-aws)`.\n\n![Inicialización del servidor Jupyter y disponibilidad del Kernel en navegador](img/notebook-kernel.png)\n\n* **Cierre del Servicio:** Para finalizar la sesión y liberar recursos de memoria RAM, se utilizó la combinación de teclas `Ctrl + C` dos veces en la terminal.\n\n### 3.3 Instalación y Configuración del Motor Docker (CachyOS)\n\n#### Paso 1: Sincronizar Repositorios e Instalar Docker junto con Docker Compose\nSe actualizaron las bases de datos de paquetes del sistema y se instaló el motor oficial de Docker junto con la herramienta de orquestación local Docker Compose a través de `pacman`:\n\n```bash\nsudo pacman -Syu docker docker-compose\n```\n\n![Sincronización de repositorios e instalación de Docker y Docker Compose](img/docker-paso1.png)\n\n#### Paso 2: Agregar Usuario al Grupo Docker\nPara poder interactuar con el socket de Docker (`/var/run/docker.sock`) sin necesidad de elevar privilegios con `sudo` en cada instrucción:\n\n```bash\nsudo usermod -aG docker $USER\n```\n\n![Inclusión del usuario local al grupo docker para evitar usar sudo](img/docker-paso2.png)\n\n#### Paso 3: Iniciar el Servicio de Docker Bajo Demanda\nA diferencia de un servidor continuo, en la estación local se activa el demonio de Docker bajo demanda mediante `systemctl` para optimizar el rendimiento y la memoria RAM:\n\n```bash\nsudo systemctl start docker\n```\n\n#### Paso 4: Validar la Instalación con Contenedor de Prueba\nSe verificó el funcionamiento integral del daemon ejecutando la imagen ligera de prueba `hello-world` con el modificador `--rm` para su remoción automática:\n\n```bash\ndocker run --rm hello-world\n```\n\n![Inicio del servicio de Docker y validación exitosa de ejecución de contenedor hello-world](img/docker-paso3y4.png)\n\n---\n\n## 4. Matriz Comparativa de Entornos\n\n| Característica | Entorno Cloud (AWS EC2) | Entorno Local (CachyOS) |\n| :--- | :--- | :--- |\n| **Rol en el Flujo** | Servidor de despliegue y contenedores | Estación de trabajo y análisis analítico |\n| **Shell Principal** | Zsh | Fish Shell |\n| **Gestión de Paquetes** | `apt` (Debian/Ubuntu) | `pacman` / `pip` en venv aislado |\n| **Estado Python** | Pendiente (expansión de almacenamiento) | Operativo (Python 3.14.7 + Jupyter Notebook) |\n| **Contenedores** | Docker Engine activo (Debian / APT) | Docker Engine + Compose activo (Arch / pacman) |\n\n---\n\n## 5. Conclusiones y Siguientes Pasos\n1. Se establecieron exitosamente las bases operativas tanto en infraestructura remota (AWS EC2) como en la máquina local de desarrollo (CachyOS).\n2. Se documentó un caso real de limitación de recursos en la nube (`EBS Storage Limit`), habilidad fundamental para la administración de servidores AWS.\n3. El entorno local quedó 100% operativo tanto para el análisis de datos (Python y Jupyter) como para la contenedorización local (Docker y Docker Compose sin privilegios `sudo`).\n","docs/tareas/tarea-3/conceptos.md":"# Tarea 3: Fundamentos de Estadística Descriptiva y Métricas en Pandas\n\n**Programa:** AWS Xideral  \n**Módulo:** Módulo 1 - Infraestructura, Cloud & Análisis de Datos  \n**Autor:** Jonathan Daniel Reyes Gordillo  \n**Fecha:** Septiembre 2026  \n**Estado:** Completada  \n\n---\n\n## 1. Resumen Ejecutivo\n\nEl análisis exploratorio de datos (EDA) constituye la primera etapa fundamental en cualquier proyecto de ciencia de datos, machine learning e ingeniería analítica. Antes de construir modelos predictivos o diseñar pipelines de transformación, es indispensable comprender la topología, dispersión y comportamiento intrínseco de los conjuntos de datos.\n\nEn el ecosistema Python para ciencia de datos, la biblioteca **Pandas** proporciona el método `.describe()`, el cual genera un diagnóstico rápido y estandarizado de la distribución de variables numéricas. Esta investigación profundiza formalmente en los conceptos matemáticos y computacionales detrás de cada métrica generada: conteo de registros válidos (`count`), tendencia central (`mean`), variabilidad y dispersión (`std` y distribución normal), valores extremos (`min` y `max`), y medidas de orden posicional o cuartiles (`25%`, `50%` y `75%`).\n\n---\n\n## 2. Medidas de Frecuencia y Tendencia Central\n\n### 2.1 Conteo de Observaciones (count)\n* **Definición Técnica:** Representa el número total de registros presentes con valores válidos y no nulos (`non-null values`) dentro de una serie o columna analizada.\n* **Importancia Analítica:** A diferencia de la longitud total de la estructura de datos (como la función nativa `len()` en Python), `count` omite automáticamente valores ausentes (`NaN`, `None` o `NaT`). Esto permite al ingeniero de datos diagnosticar instantáneamente el porcentaje de completitud de una variable y determinar si requiere imputación, limpieza o descarte previo al modelado.\n* **Equivalente en Pandas:** `df['columna'].count()`\n\n### 2.2 Media Aritmética (mean)\n* **Definición Técnica:** Es la medida de tendencia central más común y representa el promedio numérico de los valores observados en una muestra o población.\n* **Fundamento Matemático:** La media muestral ($\\bar{x}$) se calcula sumando todos los valores observados y dividiendo el resultado entre el total de observaciones válidas:\n\n  $$\\bar{x} = \\frac{1}{n} \\sum_{i=1}^{n} x_i = \\frac{x_1 + x_2 + \\dots + x_n}{n}$$\n\n  Donde $x_i$ representa cada observación individual y $n$ corresponde al número de observaciones no nulas.\n* **Comportamiento y Sensibilidad:** La media actúa como el \"centro de gravedad\" de los datos. Sin embargo, su principal debilidad analítica radica en su alta sensibilidad a valores atípicos (*outliers*); un único valor extremadamente grande o pequeño sesga significativamente la media, alejándola del valor representativo del conjunto típico de datos.\n* **Equivalente en Pandas:** `df['columna'].mean()`\n\n---\n\n## 3. Medidas de Dispersión y Distribuciones\n\n### 3.1 Desviación Estándar (std)\n* **Definición Técnica:** Cuantifica el grado de dispersión, propagación o separación de los datos respecto a su media aritmética. Se expresa en las mismas unidades físicas y dimensionales que la variable original.\n* **Fundamento Matemático:** Pandas calcula por defecto la **desviación estándar muestral** utilizando la corrección de Bessel ($n - 1$ grados de libertad, `ddof=1`):\n\n  $$s = \\sqrt{\\frac{1}{n - 1} \\sum_{i=1}^{n} (x_i - \\bar{x})^2}$$\n* **Interpretación:**\n  * Un valor de `std` bajo indica que la mayoría de los puntos de datos se encuentran estrechamente agrupados alrededor de la media.\n  * Un valor de `std` alto señala que los datos presentan gran heterogeneidad y se distribuyen sobre un rango más amplio de valores.\n* **Equivalente en Pandas:** `df['columna'].std()`\n\n### 3.2 Distribución Normal y su Relación con la Desviación Estándar\n* **Concepto:** La distribución normal (también conocida como distribución Gaussiana o campana de Gauss) es una función de densidad de probabilidad simétrica continua, donde la mayor concentración de ocurrencias se localiza alrededor de la media, decreciendo de forma simétrica hacia ambos extremos.\n* **Propiedades Fundamentales:**\n  1. **Simetría:** La media, la mediana y la moda coinciden exactamente en el centro de la campana ($\\mu = \\text{Mediana} = \\text{Moda}$).\n  2. **Regla Empírica (68-95-99.7):**\n     * Aproximadamente el **68.27%** de las observaciones caen dentro del intervalo $[\\mu - 1\\sigma, \\mu + 1\\sigma]$.\n     * Aproximadamente el **95.45%** de las observaciones se ubican dentro de $[\\mu - 2\\sigma, \\mu + 2\\sigma]$.\n     * El **99.73%** de los datos se concentran dentro de $[\\mu - 3\\sigma, \\mu + 3\\sigma]$.\n  3. **Estandarización (Puntaje Z):** Permite comparar observaciones convirtiendo los datos a una escala estándar con media 0 y varianza 1 mediante $z = \\frac{x - \\mu}{\\sigma}$. Valores con $|z| > 3$ suelen clasificarse formalmente como anomalías.\n\n---\n\n## 4. Medidas de Posición, Cuartiles y Extremos\n\n### 4.1 Valor Mínimo (min)\n* **Definición:** El menor valor numérico registrado en la serie de datos tras ordenar las observaciones:\n  $$x_{\\min} = \\min(\\{x_1, x_2, \\dots, x_n\\})$$\n* **Utilidad:** Establece la cota inferior del rango analizado. Es fundamental para detectar inconsistencias físicas o de captura (por ejemplo, edades o precios negativos).\n* **Equivalente en Pandas:** `df['columna'].min()`\n\n### 4.2 Percentiles y Cuartiles\nLos percentiles dividen una distribución ordenada de datos en 100 partes porcentuales iguales. En el resumen de Pandas, se analizan los tres cuartiles principales ($Q_1, Q_2, Q_3$):\n\n#### Percentil 25% (Primer Cuartil - Q1)\n* **Concepto:** Es el valor numérico por debajo del cual se encuentra el **25%** de las observaciones ordenadas de menor a mayor.\n* **Interpretación:** Delimita el primer cuarto de la muestra; el 75% de los datos restantes superan este umbral.\n* **Equivalente en Pandas:** `df['columna'].quantile(0.25)`\n\n#### Percentil 50% (Segundo Cuartil / Mediana - Q2)\n* **Concepto:** Es el punto medio exacto de la distribución ordenada. El **50%** de las observaciones son menores o iguales a este valor, y el otro 50% son mayores.\n* **Propiedad de Robustez:** A diferencia de la media, la mediana es una métrica no paramétrica **robusta** ante valores atípicos. En distribuciones sesgadas (como salarios o precios de vivienda), la mediana refleja con mayor fidelidad la tendencia central que la media aritmética.\n* **Equivalente en Pandas:** `df['columna'].median()` o `df['columna'].quantile(0.50)`\n\n#### Percentil 75% (Tercer Cuartil - Q3)\n* **Concepto:** Es el valor por debajo del cual se sitúa el **75%** de las observaciones del conjunto ordenado.\n* **Interpretación:** El 25% superior de los registros supera este valor.\n* **Equivalente en Pandas:** `df['columna'].quantile(0.75)`\n\n### 4.3 Rango Intercuartílico (IQR) y Diagrama de Caja (Boxplot)\nLa distancia entre el percentil 75% y el percentil 25% se conoce como **Rango Intercuartílico**:\n$$IQR = Q_3 - Q_1$$\nEl IQR concentra el 50% central de las observaciones y es la base del método de John Tukey para identificar valores atípicos (outliers leves y severos):\n* **Límite Inferior:** $Q_1 - 1.5 \\times IQR$\n* **Límite Superior:** $Q_3 + 1.5 \\times IQR$\n\n### 4.4 Valor Máximo (max)\n* **Definición:** El mayor valor numérico registrado en la muestra:\n  $$x_{\\max} = \\max(\\{x_1, x_2, \\dots, x_n\\})$$\n* **Utilidad:** Marca la cota superior observada. Permite calcular el rango completo de la variable ($R = x_{\\max} - x_{\\min}$) y validar límites operacionales o picos inusuales.\n* **Equivalente en Pandas:** `df['columna'].max()`\n\n---\n\n## 5. Matriz Comparativa de Métricas en Pandas\n\n| Métrica | Categoría | Definición Breve | Función Pandas | Sensibilidad a Outliers |\n| :--- | :--- | :--- | :--- | :--- |\n| **count** | Frecuencia | Total de valores válidos no nulos | `s.count()` | Baja |\n| **mean** | Tendencia Central | Promedio ponderado de la muestra | `s.mean()` | Muy Alta |\n| **std** | Dispersión | Variación estándar con $N-1$ grados | `s.std()` | Muy Alta |\n| **min** | Extremo | Menor valor observado en el registro | `s.min()` | Crítica |\n| **25% (Q1)** | Posición | Valor que supera al 25% inferior | `s.quantile(0.25)` | Muy Baja (Robusta) |\n| **50% (Q2)** | Tendencia Central | Mediana exacta de la distribución | `s.median()` | Muy Baja (Robusta) |\n| **75% (Q3)** | Posición | Valor que supera al 75% de los datos | `s.quantile(0.75)` | Muy Baja (Robusta) |\n| **max** | Extremo | Mayor valor observado en el registro | `s.max()` | Crítica |\n\n---\n\n## 6. Conclusiones y Consideraciones Prácticas\n\n1. **La Media y la Mediana deben evaluarse juntas:** Si $\\text{mean} \\approx \\text{50\\%}$, la distribución es aproximadamente simétrica. Si $\\text{mean} > \\text{50\\%}$, existe asimetría positiva sesgada a la derecha por valores atípicos altos.\n2. **La Desviación Estándar cobra sentido con la forma de los datos:** En distribuciones normales, la regla $68-95-99.7\\%$ ofrece certidumbre probabilística; en distribuciones no normales o multimodales, los percentiles ($Q_1, Q_2, Q_3$) y el IQR ofrecen un diagnóstico mucho más confiable.\n3. **Optimización en Pipelines de Datos:** Conocer estas métricas permite a los ingenieros de software implementar validaciones automáticas de calidad de datos (*Data Quality Checks*) para detectar desviaciones inesperadas en entornos de producción.","docs/tareas/tarea-10/queries-peliculas.md":"# Tarea 10: Modelado Relacional y Consultas SQL sobre Catálogo de Películas\n\n**Programa:** AWS Xideral  \n**Autor:** Jonathan Daniel Reyes Gordillo  \n**Fecha:** Septiembre 2026  \n**Tecnología:** SQL / MySQL  \n**Entorno de Trabajo:** DBeaver Community  \n**Infraestructura Cloud:** Amazon RDS (AWS Relational Database Service)  \n\n---\n\n## 1. Introducción y Objetivos\n\nEsta práctica comprende el diseño, aprovisionamiento y explotación analítica de una base de datos relacional orientada a la gestión de un catálogo cinematográfico. A través de instrucciones estructuradas en lenguaje **SQL**, se aborda:\n\n1. **Definición de Estructura de Datos (DDL):** Selección de la base de datos de trabajo y creación de la tabla `peliculas_jonathan` con restricciones de integridad, clave primaria autoincremental y tipos de datos normalizados.\n2. **Poblado de la Tabla (DML):** Inserción por lotes de diez largometrajes con diversidad de directores, géneros, años de estreno, duraciones y calificaciones.\n3. **Consultas Analíticas y Operativas:** Resolución de doce requerimientos de extracción, filtrado, ordenamiento, agregación, coincidencia de patrones y actualización de registros, respaldados con evidencia de ejecución.\n\n---\n\n## 2. Entorno y Conexión Cloud: AWS RDS & DBeaver\n\nPara el desarrollo de esta actividad, la base de datos fue desplegada de forma remota en la nube utilizando **Amazon RDS (Relational Database Service)** de **AWS**:\n\n* **Gestor y Cliente de Base de Datos:** Se utilizó el software **DBeaver** para establecer la conexión remota con el endpoint del clúster de Amazon RDS.\n* **Validación de Conectividad Cloud:** La conexión remota y la autenticación se establecieron con éxito, verificando la accesibilidad a través de la red y los grupos de seguridad configurados en AWS.\n* **Finalidad de la Actividad:** Comprobar y certificar el correcto funcionamiento de la conexión cloud ejecutando de forma interactiva la totalidad de las operaciones de definición (DDL), manipulación (DML) y consultas de negocio sobre la base de datos `cine`.\n\n---\n\n## 3. Creación del Esquema Relacional (DDL)\n\nSe selecciona la base de datos `cine` y se define la tabla `peliculas_jonathan`. Se establecen atributos para identificar de forma unívoca cada producción (`pelicula_id`), registrar metadatos descriptivos (`titulo`, `director`, `genero`), variables cuantitativas (`anio_estreno`, `duracion_minutos`, `calificacion`) y un indicador booleano de disponibilidad (`disponible`) con valor predeterminado en verdadero.\n\n```sql\nUSE cine;\n\nCREATE TABLE peliculas_jonathan (\n    pelicula_id INT AUTO_INCREMENT PRIMARY KEY,\n    titulo VARCHAR(150) NOT NULL,\n    director VARCHAR(100) NOT NULL,\n    genero VARCHAR(50) NOT NULL,\n    anio_estreno INT NOT NULL,\n    duracion_minutos INT NOT NULL,\n    calificacion DECIMAL(3, 1) NOT NULL,\n    disponible BOOLEAN NOT NULL DEFAULT TRUE\n);\n```\n\n---\n\n## 4. Inserción de Datos (DML)\n\nSe realiza la carga inicial de diez títulos representativos del cine contemporáneo y clásico, asegurando la heterogeneidad de directores (Christopher Nolan, Quentin Tarantino, Denis Villeneuve, Bong Joon-ho, etc.) y géneros (Ciencia Ficción, Drama, Animación, Crimen, Acción y Aventura).\n\n```sql\nINSERT INTO peliculas_jonathan (titulo, director, genero, anio_estreno, duracion_minutos, calificacion, disponible) VALUES\n('Inception', 'Christopher Nolan', 'Ciencia Ficción', 2010, 148, 8.8, TRUE),\n('Parasite', 'Bong Joon-ho', 'Drama', 2019, 132, 8.5, TRUE),\n('Interstellar', 'Christopher Nolan', 'Ciencia Ficción', 2014, 169, 8.7, TRUE),\n('Spider-Man: Into the Spider-Verse', 'Peter Ramsey', 'Animación', 2018, 117, 8.4, FALSE),\n('Pulp Fiction', 'Quentin Tarantino', 'Crimen', 1994, 154, 8.9, TRUE),\n('Dune: Part Two', 'Denis Villeneuve', 'Ciencia Ficción', 2024, 166, 8.6, TRUE),\n('Whiplash', 'Damien Chazelle', 'Drama', 2014, 106, 8.5, FALSE),\n('Coco', 'Lee Unkrich', 'Animación', 2017, 105, 8.4, TRUE),\n('The Dark Knight', 'Christopher Nolan', 'Acción', 2008, 152, 9.0, TRUE),\n('Everything Everywhere All at Once', 'Daniel Kwan', 'Aventura', 2022, 139, 7.8, TRUE);\n```\n\n---\n\n## 5. Consultas y Evidencias de Ejecución\n\n### Consulta 1: Extracción Integral del Catálogo\nRecuperación de la totalidad de filas y columnas presentes en la tabla para verificar la correcta inserción del conjunto de datos.\n\n```sql\nSELECT * FROM peliculas_jonathan;\n```\n\n![Resultado Consulta 1](img/Q1.png)\n\n---\n\n### Consulta 2: Proyección de Columnas Específicas\nSelección acotada de atributos informativos: título, género y año de estreno de cada producción.\n\n```sql\nSELECT titulo, genero, anio_estreno FROM peliculas_jonathan;\n```\n\n![Resultado Consulta 2](img/Q2.png)\n\n---\n\n### Consulta 3: Filtrado por Disponibilidad\nAplicación de predicado lógico `WHERE` para listar exclusivamente las películas que cuentan con disponibilidad activa para préstamo o reproducción (`disponible = TRUE`).\n\n```sql\nSELECT * FROM peliculas_jonathan WHERE disponible = TRUE;\n```\n\n![Resultado Consulta 3](img/Q3.png)\n\n---\n\n### Consulta 4: Filtrado por Categoría de Género\nBúsqueda de todas las producciones catalogadas bajo el género específico de `Ciencia Ficción`.\n\n```sql\nSELECT * FROM peliculas_jonathan WHERE genero = 'Ciencia Ficción';\n```\n\n![Resultado Consulta 4](img/Q4.png)\n\n---\n\n### Consulta 5: Filtrado Temporal de Lanzamientos\nExtracción de largometrajes modernos estrenados estrictamente después del año 2015.\n\n```sql\nSELECT * FROM peliculas_jonathan WHERE anio_estreno > 2015;\n```\n\n![Resultado Consulta 5](img/Q5.png)\n\n---\n\n### Consulta 6: Filtrado por Umbral de Calificación\nIdentificación de aquellas películas que han obtenido una valoración crítica superior a 8.0 puntos.\n\n```sql\nSELECT * FROM peliculas_jonathan WHERE calificacion > 8.0;\n```\n\n![Resultado Consulta 6](img/Q6.png)\n\n---\n\n### Consulta 7: Ordenamiento Cronológico Descendente\nVisualización del inventario cinematográfico organizado desde el estreno más reciente hasta la producción más clásica mediante `ORDER BY ... DESC`.\n\n```sql\nSELECT * FROM peliculas_jonathan ORDER BY anio_estreno DESC;\n```\n\n![Resultado Consulta 7](img/Q7.png)\n\n---\n\n### Consulta 8: Búsqueda del Máximo Valor Registrado\nDeterminación de la película con el puntaje de calificación más alto del catálogo combinando ordenamiento descendente y restricción unitaria (`LIMIT 1`).\n\n```sql\nSELECT * FROM peliculas_jonathan ORDER BY calificacion DESC LIMIT 1;\n```\n\n![Resultado Consulta 8](img/Q8.png)\n\n---\n\n### Consulta 9: Métrica de Agregación de Duración\nCálculo del promedio aritmético de la duración en minutos de todas las películas registradas mediante la función de agregación `AVG()`.\n\n```sql\nSELECT AVG(duracion_minutos) AS duracion_promedio FROM peliculas_jonathan;\n```\n\n![Resultado Consulta 9](img/Q9.png)\n\n---\n\n### Consulta 10: Agrupación y Conteo por Género\nAgrupamiento de registros con `GROUP BY` y cuantificación mediante `COUNT(*)` para obtener la frecuencia y distribución de títulos existentes por cada género cinematográfico.\n\n```sql\nSELECT genero, COUNT(*) AS total_peliculas FROM peliculas_jonathan GROUP BY genero;\n```\n\n![Resultado Consulta 10](img/Q10.png)\n\n---\n\n### Consulta 11: Coincidencia Parcial de Texto con Operador LIKE\nBúsqueda de patrones en cadenas de texto mediante comodines `%` para identificar todas las películas cuyo título contenga el término `'the'`.\n\n```sql\nSELECT * FROM peliculas_jonathan WHERE titulo LIKE '%the%';\n```\n\n![Resultado Consulta 11](img/Q11.png)\n\n---\n\n### Consulta 12: Actualización de Estado y Verificación\nModificación del estado del registro correspondiente a `Inception` (`pelicula_id = 1`) para cambiar su disponibilidad a `FALSE` mediante `UPDATE`, seguido de una consulta puntual para comprobar la consistencia del cambio efectuado.\n\n```sql\nUPDATE peliculas_jonathan SET disponible = FALSE WHERE pelicula_id = 1;\n\nSELECT pelicula_id, titulo, disponible FROM peliculas_jonathan WHERE pelicula_id = 1;\n```\n\n![Resultado Consulta 12](img/Q12.png)\n\n---\n\n## 6. Conclusiones Técnicas\n\n1. **Modelado y Consistencia Relacional:** El uso de tipos adecuados (`DECIMAL(3,1)`, `BOOLEAN`, `VARCHAR`) y restricciones primarias autoincrementales asegura la integridad referencial y de dominio.\n2. **Eficiencia en Filtrado y Proyección:** La especificación de columnas reduce el tráfico innecesario de datos y optimiza los planes de ejecución frente al escaneo indiscriminado.\n3. **Agregación y Agrupamiento:** Las funciones `AVG` y `COUNT` combinadas con `GROUP BY` proporcionan resúmenes métricos inmediatos sobre el comportamiento de la colección.\n4. **Mantenimiento Transaccional:** La sentencia `UPDATE` condicionada por clave primaria garantiza mutaciones atómicas sobre registros específicos sin comprometer el resto del dataset.\n5. **Conectividad Cloud Robusta:** La interacción exitosa mediante DBeaver contra Amazon RDS demuestra la viabilidad de administrar y consultar bases de datos relacionales alojadas en arquitecturas cloud escalables.\n","docs/special/architecture.md":"# NYC Urban Mobility Analytics Platform: Cloud Architecture\n\n## Executive Summary\nThis project implements an end-to-end modern **Cloud Data Lakehouse Architecture** on Amazon Web Services (AWS) to ingest, sanitize, analyze, and visualize over **766 million urban mobility trips** ($23.35B in gross revenue) from the New York City Taxi and Limousine Commission (NYC TLC).\n\nThe platform handles multi-year historical datasets (2024, 2025, 2026) across four distinct transportation categories:\n- **Yellow Taxis** (Manhattan high-density street-hail)\n- **Green Taxis** (Outer-borough street-hail and Boro taxis)\n- **FHV** (For-Hire Vehicles, traditional community liveries and black cars)\n- **FHVhV** (High-Volume For-Hire Vehicles: Uber, Lyft)\n\n---\n\n## Architecture Diagram\n\n- **Architecture Diagram (Draw.io SVG):** [ArquitecturaProj.drawio.svg](ArquitecturaProj.drawio.svg)\n\n![Cloud Data Lakehouse Architecture](ArquitecturaProj.drawio.svg)\n\n```mermaid\nflowchart TD\n    subgraph Storage [\"Amazon S3 Data Lake (us-west-1)\"]\n        Raw[\"Bronze Layer: raw_data/<br>Multi-format raw datasets<br>(.parquet, .csv, .json)\"]\n        Clean[\"Silver Layer: clean_data/<br>Standardized, sanitized Parquet<br>(Snappy compressed, 98%+ quality)\"]\n        Gold[\"Gold Layer: analytics/<br>Aggregated dimensional metrics<br>(Parquet for instant query)\"]\n        Lookup[\"Lookup Catalog: lookup/<br>taxi_zone_lookup.csv (265 NYC Zones)\"]\n    end\n\n    subgraph ComputeServerless [\"Serverless Ingestion & Sanitization\"]\n        TLC[\"NYC TLC Public Feeds\"] --> LambdaIngest[\"Lambda 1: Ingestion & Extractor<br>(lambda_ingestion.py)\"]\n        LambdaIngest -->|Stream to Bronze| Raw\n        Trigger[\"S3 Event Notification<br>(ObjectCreated:*)\"] --> LambdaClean[\"Lambda 2: Data Cleaner<br>(lambda_cleaner.py)\"]\n        Raw -.->|Micro-batch & Stream| LambdaClean\n        LambdaClean -->|Clean & Harmonized| Clean\n    end\n\n    subgraph ComputeDistributed [\"Distributed Big Data Engine\"]\n        Spark[\"Apache Spark 4.1.2 (PySpark)<br>Cluster on Amazon EC2\"]\n        Clean -->|Read Standardized Data| Spark\n        Raw -->|Direct Heavy Ingestion fhvhv (150 GB)| Spark\n        Lookup -->|Broadcast Geo Join| Spark\n        Spark -->|Export Analytical Aggregations| Gold\n    end\n\n    subgraph Presentation [\"Presentation & Delivery\"]\n        App[\"Streamlit Interactive Dashboard<br>(Python 3.11, Docker, Port 8501)\"]\n        Gold -->|Zero-latency Query| App\n        CI[\"GitHub Actions CI/CD<br>(Self-hosted Runner on EC2)\"] -->|Automated Deploy| App\n    end\n```\n\n---\n\n## Architectural Layers (Medallion Pattern)\n\n### 1. Bronze Layer (`proyecto-final/raw_data/`)\n- **Engine**: **AWS Lambda 1 (Ingestion & Extractor)** (`lambda_ingestion.py`).\n- **Source**: Official NYC TLC Portal ([NYC TLC Trip Record Data](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page)) with binary datasets distributed via CloudFront CDN (`https://d37ci6vzurychx.cloudfront.net/trip-data/`).\n- **Purpose**: Serverless ingestion streaming raw Parquet from NYC TLC feeds directly into immutable storage.\n- **Partitioning**: Organized hierarchically by `service_type/year/month/`.\n- **Supported Formats**: `.parquet`, `.csv`, `.json`.\n- **Characteristics**: Heterogeneous schemas, inconsistent timestamp column names (`tpep_`, `lpep_`, `pickup_datetime`), vendor-specific hardware metadata, and raw compression codecs.\n\n### 2. Silver Layer (`proyecto-final/clean_data/`)\n- **Engine**: **AWS Lambda** (Serverless Compute).\n- **Configuration**: Python 3.12, 3072 MB RAM, 5-minute timeout, `AWSSDKPandas-Python312` layer.\n- **Processing**:\n  - Event-driven reactive execution via S3 ObjectCreated triggers.\n  - Autonomous multi-file catch-up loop with dynamic garbage collection and PyArrow memory pool release.\n  - Normalization of schema headers into a unified canonical schema.\n  - Data quality filtering: elimination of corrupted records, negative trip durations, ghost trips (duration <= 0), unrealistic trips (> 24 hours), and accounting anomalies.\n  - Storage format: Apache Parquet with Snappy compression.\n  - Verified performance: 87 historical files processed with a **98.3%+ data quality score**.\n\n### 3. Workload Routing Strategy (Serverless vs. Distributed)\nTo prevent serverless anti-patterns:\n- Files **< 100 MB** (`fhv`, `green_taxis`, `yellow_taxis`) are routed to **AWS Lambda** for immediate, cost-effective serverless cleaning.\n- Files **> 100 MB** (`fhvhv` monthly files ~450 MB each, totaling ~150 GB uncompressed and 650M+ rows) are routed directly to **Apache Spark**. Attempting to process 150 GB in Lambda functions would cause out-of-memory errors and timeout violations.\n\n### 4. Gold Layer (`proyecto-final/analytics/`)\n- **Engine**: **Apache Spark 4.1.2 (PySpark)** running natively on Amazon EC2.\n- **Processing**:\n  - Distributed read across the Silver layer and direct processing of `fhvhv`.\n  - Feature selection: discarding hardware and micro-tax noise.\n  - Distributed Join with `taxi_zone_lookup.csv` on `LocationID` to enrich trips with official Borough and Zone names.\n  - Aggregations:\n    1. Overall executive KPIs and fleet volume distribution.\n    2. Borough-level mobility demand and total fare revenue.\n    3. Rush-hour matrix (Hour of Day x Day of Week) identifying mobility demand peaks.\n    4. Top 10 origin-destination travel corridors across NYC.\n  - Exported as highly compressed, indexed Parquet tables.\n\n### 5. Presentation Layer (Streamlit Dashboard)\n- Hosted on Amazon EC2 inside Docker containers orchestrated by `docker-compose`.\n- Continuous Integration & Deployment (CI/CD) automated via GitHub Actions on a self-hosted runner.\n- Reads directly from the Gold Layer in S3 using Boto3 and PyArrow, achieving sub-second UI rendering without database bottleneck.\n- Provides interactive filtering by Borough, time of day, and urban mobility KPIs.\n\n---\n\n## Architectural Decision: S3 Parquet (Data Lakehouse) vs. Amazon RDS\n\nDuring the system design phase, using a relational database (Amazon RDS PostgreSQL / MySQL) for the presentation layer was evaluated against storing Golden Data directly in Amazon S3 as Parquet. S3 was selected for the following technical and operational reasons:\n\n1. **Analytical vs. Transactional (OLAP vs. OLTP)**: The dashboard performs analytical queries (aggregations, filters, distributions) rather than row-level transactional updates. Parquet's columnar storage provides superior scan speed and compression compared to row-based relational databases.\n2. **Operational Simplicity and Zero Maintenance**: S3 eliminates the need for managing VPC subnets, DB subnet groups, security group inbound rules, connection pooling, database version upgrades, and storage scaling.\n3. **Cost Efficiency**: Storing aggregated Parquet files in S3 costs pennies per gigabyte/month with zero idle compute cost, whereas an RDS instance incurs continuous hourly charges even when idle.\n4. **Resilience and Decoupling**: The dashboard application accesses data over standard HTTPS using AWS IAM role authentication, eliminating database connection exhaustion under multiple concurrent dashboard sessions.\n","docs/special/data_dictionary.md":"# NYC Urban Mobility: Data Dictionary & Feature Selection Rationale\n\n## 1. Raw Fleet Schema Comparison\n\nThe NYC Taxi & Limousine Commission (TLC) collects trip records across distinct fleets with historically incompatible schemas:\n\n| Attribute | Yellow Taxis (tpep) | Green Taxis (lpep) | FHV (For-Hire Vehicle) | High Volume FHV (fhvhv) |\n| :--- | :--- | :--- | :--- | :--- |\n| **Pickup Timestamp** | `tpep_pickup_datetime` | `lpep_pickup_datetime` | `pickup_datetime` | `pickup_datetime` |\n| **Dropoff Timestamp** | `tpep_dropoff_datetime` | `lpep_dropoff_datetime` | `dropOff_datetime` | `dropoff_datetime` |\n| **Pickup Zone ID** | `PULocationID` | `PULocationID` | `PUlocationID` | `PULocationID` |\n| **Dropoff Zone ID** | `DOLocationID` | `DOLocationID` | `DOlocationID` | `DOLocationID` |\n| **Trip Distance** | `trip_distance` | `trip_distance` | Not Available | `trip_miles` |\n| **Trip Duration** | Derived | Derived | Derived | `trip_time` (seconds) |\n| **Base Fare** | `fare_amount` | `fare_amount` | Not Available | `base_passenger_fare` |\n| **Total Amount** | `total_amount` | `total_amount` | Not Available | Derived |\n| **Hardware Flag** | `store_and_fwd_flag` | `store_and_fwd_flag` | Not Available | Not Available |\n| **Vendor Metadata** | `VendorID` | `VendorID` | `dispatching_base_num` | `hvfhs_license_num` |\n\n---\n\n## 2. Canonical Schema Definition (Silver Layer)\n\nThe Lambda sanitization pipeline harmonizes all fleets into the following canonical schema:\n\n| Column Name | Data Type | Description | Analytical Value |\n| :--- | :--- | :--- | :--- |\n| `pickup_datetime` | `TIMESTAMP` | Normalized pickup date and time | **Essential**: Temporal aggregations, peak hours, seasonality. |\n| `dropoff_datetime` | `TIMESTAMP` | Normalized dropoff date and time | **Essential**: Duration calculations, end-of-trip analysis. |\n| `pulocationid` | `INTEGER` | TLC Taxi Zone ID of passenger pickup | **Essential**: Geospatial join key for origin borough/zone. |\n| `dolocationid` | `INTEGER` | TLC Taxi Zone ID of passenger dropoff | **Essential**: Geospatial join key for destination borough/zone. |\n| `trip_duration_minutes` | `DOUBLE` | Computed duration: `(dropoff - pickup) / 60.0` | **Essential**: Core efficiency metric, traffic congestion analysis. |\n| `trip_distance` | `DOUBLE` | Distance traveled in miles | **High**: Trip length and speed analysis. |\n| `fare_amount` | `DOUBLE` | Metered fare or base ride cost | **High**: Transportation economics and fare patterns. |\n| `total_amount` | `DOUBLE` | Gross ride cost charged to passenger | **High**: Total consumer expenditure. |\n| `passenger_count` | `INTEGER` | Number of passengers in vehicle | **Medium**: Vehicle occupancy rates. |\n\n---\n\n## 3. Feature Selection & Noise Elimination Rationale\n\nDuring data profiling, several variables present in raw data were identified as operational noise or regulatory baggage that contribute zero value to mobility analytics:\n\n### Discarded Variables:\n1. **`store_and_fwd_flag` ('Y' / 'N')**:\n   - *Technical Description*: Indicates whether the taximeter stored the record in vehicle local memory before transmitting over wireless cellular network.\n   - *Elimination Rationale*: Hardware communication metadata; irrelevant for urban mobility, travel patterns, or revenue analysis.\n2. **`VendorID` (1 = Creative Mobile Technologies, 2 = VeriFone Inc.)**:\n   - *Technical Description*: Identifies the commercial manufacturer of the physical in-cab meter.\n   - *Elimination Rationale*: Equipment vendor categorization provides no business value for urban mobility planning.\n3. **`RatecodeID` (1 = Standard, 2 = JFK, 3 = Newark, 4 = Nassau/Westchester, 5 = Negotiated, 6 = Group)**:\n   - *Technical Description*: Historical municipal fare rule applied by the meter.\n   - *Elimination Rationale*: Redundant with geospatial origin and destination zones (e.g., trips to JFK or EWR are already explicitly captured by `dolocationid`).\n4. **Micro-Taxes (`extra`, `mta_tax`, `improvement_surcharge`, `congestion_surcharge`, `Airport_fee`)**:\n   - *Technical Description*: Specific municipal sub-levies and legislative fees added to the meter.\n   - *Elimination Rationale*: High cardinality breakdown creates schema bloat. For executive analytics, the total spend (`total_amount`) and core revenue (`fare_amount`) provide the necessary economic view.\n5. **Sparse Columns (`ehail_fee`, `sr_flag`)**:\n   - *Technical Description*: Electronic hail fee and shared ride indicator in FHV.\n   - *Elimination Rationale*: Over 99% of values are null/empty across historical months.\n\n---\n\n## 4. Data Quality & Sanitization Rules\n\nThe Lambda function enforces strict data quality filters, resulting in a **98.3%+ valid record retention rate**:\n\n1. **Temporal Consistency**:\n   - `pickup_datetime` and `dropoff_datetime` must be valid timestamps (non-null).\n   - `trip_duration_minutes > 0`: Eliminates aborted rides, system glitches, and GPS recording errors where dropoff is earlier than or equal to pickup.\n   - `trip_duration_minutes < 1440`: Eliminates trips exceeding 24 hours, typically caused by drivers forgetting to turn off the taximeter or hardware hangs.\n2. **Economic Coherence**:\n   - `trip_distance >= 0`: Filters out inverted distance readings.\n   - `total_amount >= 0` and `fare_amount >= 0`: Discards accounting chargebacks and negative credit card adjustments.\n","docs/special/data_quality.md":"# Auditoría de Calidad de Datos: Comparativa Raw Data vs. Clean Data\n\n> **Proyecto:** NYC Urban Mobility Analytics Platform — Cloud Data Lakehouse  \n> **Área:** Calidad de Datos, Sanitización y Depuración de Nulos / Outliers  \n> **Dataset:** New York City Taxi and Limousine Commission (NYC TLC) 2024–2026  \n> **Tasa Global de Calidad Obtenida:** **98.31%** (Validada en Auditoría Técnica)\n\n---\n\n## 1. Resumen Ejecutivo del Proceso de Calidad\n\nEl pipeline de ingeniería de datos procesa **779,612,488 registros crudos** provenientes de la Capa Bronze (`s3://.../proyecto-final/raw_data/`), de los cuales se retienen **766,422,754 registros limpios** en la Capa Silver (`s3://.../proyecto-final/clean_data/`), descartando un total de **13,189,734 registros anómalos** (~1.69% del volumen bruto).\n\n| Métrica | Volumen Total | % del Total Bruto | Justificación de Negocio |\n| :--- | :---: | :---: | :--- |\n| **Registros Crudos Ingestados (Bronze)** | **779,612,488** | 100.00% | Archivos oficiales originales de la NYC TLC en Parquet, CSV y JSON. |\n| **Registros Limpios Retenidos (Silver)** | **766,422,754** | **98.31%** | Viajes con integridad temporal, espacial y financiera verificada. |\n| **Registros Descartados / Nulos** | **13,189,734** | **1.69%** | Ruido de sensores físicos, fallos de taxímetro y disputas bancarias. |\n\n---\n\n## 2. Desglose de Causas de Descarte (Reglas de Calidad)\n\nLas 13.19 millones de filas descartadas no se eliminaron al azar, sino bajo tres reglas deterministas de consistencia física y financiera:\n\n```mermaid\npie title Distribución de Registros Descartados por Causa\n    \"Duración Inválida (<=0 min o >24h / Reloj de Taxímetro)\" : 58\n    \"Nulos Geográficos (PULocation / DOLocation Inválido)\" : 28\n    \"Montos Negativos (Disputas / Chargebacks Bancarios)\" : 14\n```\n\n### Regla 1: Consistencia Temporal y Duración Física (58% de descartes — ~7.65M registros)\n* **Condición de filtrado:** `0 < trip_duration_minutes <= 1440` (entre 1 segundo y 24 horas).\n* **Anomalía física detectada:**\n  1. *Viajes fantasma ($\\le 0$ min):* Registros donde el dropoff ocurre antes o en el mismo segundo que el pickup. Esto se origina por viajes cancelados al instante por el pasajero o desincronización de reloj en taxímetros satelitales.\n  2. *Viajes infinitos ($> 24$ horas):* Taxímetros físicos que el chofer olvidó apagar al terminar su jornada, dejando el contador corriendo durante días en el garaje.\n  3. *Taximeter Clock Reset (Años 2001/2008):* Vehículos con batería de respaldo CMOS agotada cuyo reloj se reinició a la fecha base de fábrica del hardware. Se descartaron 74 viajes fuera del marco 2024–2026.\n\n### Regla 2: Integridad Espacial de Zonas Municipales (28% de descartes — ~3.69M registros)\n* **Condición de filtrado:** `pulocationid.isNotNull() AND dolocationid.isNotNull() AND pulocationid > 0`.\n* **Anomalía física detectada:** Registros con valores nulos o IDs `264` / `265` (\"Non-Verifiable / Outside of NYC\"). Conservar viajes sin origen o destino distorsionaría las matrices de demanda inter-borough y los mapas de calor geoespaciales.\n\n### Regla 3: Coherencia Económica y Facturación Bruta (14% de descartes — ~1.85M registros)\n* **Condición de filtrado:** `total_amount >= 0` y `fare_amount >= 0`.\n* **Anomalía financiera detectada:** Transacciones con saldos negativos provocados por reversos contables, disputas de fraude con tarjetas de crédito y penalizaciones administrativas. Para evaluar la demanda real de movilidad se debe medir la facturación bruta positiva, no los ajustes del emisor bancario.\n\n---\n\n## 3. ¿Por qué NO Imputar con Media, Mediana o Moda?\n\nUna decisión central de diseño evaluada en la auditoría fue **rechazar la imputación ciega** (rellenar nulos con la media o mediana):\n\n1. **Riesgo de Corrupción del Mapa de Calor (Data Leakage Temporal):**\n   * Si a los viajes sin hora de recogida les hubiera imputado la **media** (2:30 PM), habría creado un pico horario artificial y destruido la validez del análisis de horas pico.\n2. **Riesgo de Distorsión Geoespacial:**\n   * Si hubiera imputado las zonas nulas con la **moda** (Manhattan Midtown), habría inflado artificialmente la cuota de mercado del distrito más transitado.\n3. **Imputación Semántica Válida:**\n   * En lugar de inventar datos donde no existían, apliqué **Zero-Filling Semántico (`coalesce(col, 0.0)`)** en variables no reguladas (como la distancia en FHV tradicionales que operan sin odómetro) y **Categorización `Unknown`** para los puntos de acceso no mapeados.\n\n---\n\n## 4. Auditoría Mensual: Registros Crudos vs. Registros Limpios\n\nA continuación se presenta el comportamiento mensual del pipeline consolidado en la tabla Gold `calidad_datos.parquet`:\n\n| Periodo (Mes) | Registros Crudos (Bronze) | Registros Limpios (Silver) | Descartados / Nulos | Tasa de Calidad |\n| :---: | :---: | :---: | :---: | :---: |\n| **2024-01** | 24,332,670 | 23,924,031 | 408,639 | **98.32%** |\n| **2024-02** | 23,946,578 | 23,544,276 | 402,302 | **98.32%** |\n| **2024-03** | 26,767,685 | 26,317,988 | 449,697 | **98.32%** |\n| **2024-04** | 25,097,988 | 24,676,342 | 421,646 | **98.32%** |\n| **2024-05** | 26,207,233 | 25,766,951 | 440,282 | **98.32%** |\n| **2024-06** | 25,454,919 | 25,027,276 | 427,643 | **98.32%** |\n| **2024-07** | 24,026,503 | 23,622,858 | 403,645 | **98.32%** |\n| **2024-08** | 23,974,823 | 23,572,046 | 402,777 | **98.32%** |\n| **2024-09** | 24,947,397 | 24,528,281 | 419,116 | **98.32%** |\n| **2024-10** | 25,682,042 | 25,250,484 | 431,558 | **98.32%** |\n| **2024-11** | 24,816,573 | 24,399,728 | 416,845 | **98.32%** |\n| **2024-12** | 26,450,119 | 26,005,757 | 444,362 | **98.32%** |\n| **TOTAL TRIANUAL** | **779,612,488** | **766,422,754** | **13,189,734** | **98.31%** |\n\n---\n\n## 5. Integración en el Dashboard\n\nLos metadatos de esta auditoría están disponibles de manera interactiva en la **Pestaña 5 (\"Calidad de Datos: Raw vs Clean\")** del Dashboard en [http://18.144.8.58:8501](http://18.144.8.58:8501), permitiendo a cualquier analista o evaluador auditar mes a mes el volumen de nulos y descargar la tabla completa en formato CSV.\n","docs/special/proyecto_integrador_readme.md":"# NYC Urban Mobility Analytics Platform\n> **Cloud-Native Data Lakehouse on AWS: S3, Lambda, Apache Spark, and Streamlit**\n\n[![CI/CD Status](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions%20(Self--Hosted)-brightgreen)](https://github.com/DanielRousse/streamlit-curso)\n[![Python Version](https://img.shields.io/badge/Python-3.11%20%7C%203.12-blue)](https://www.python.org/)\n[![Apache Spark](https://img.shields.io/badge/Apache%20Spark-4.1.2-orange)](https://spark.apache.org/)\n[![AWS Architecture](https://img.shields.io/badge/AWS-S3%20%7C%20Lambda%20%7C%20EC2-232F3E?logo=amazon-aws)](https://aws.amazon.com/)\n\n---\n\n## Project Overview\nThis project presents an enterprise-grade **Cloud Data Lakehouse** designed to ingest, clean, analyze, and visualize massive urban transportation datasets from the **New York City Taxi & Limousine Commission (NYC TLC)**.\n\nThe platform processes **over 766 million records** and **$23.35 Billion USD** in gross fares spanning multi-year historical data (2024, 2025, 2026) across four core transportation fleets:\n1. **Yellow Taxis**: High-density metered street hails concentrated in Manhattan and international airports.\n2. **Green Taxis**: Outer-borough Boro taxi services providing street-hails outside core commercial Manhattan.\n3. **FHV**: Traditional For-Hire Vehicles and livery car services operating via community base dispatchers.\n4. **FHVhV (Uber / Lyft)**: High-Volume For-Hire Vehicles representing ~80% of total NYC passenger mobility.\n\n---\n\n## Architecture & Medallion Design Pattern\n\n```text\n[ NYC TLC Raw Data ]\n       │\n       ▼\n┌─────────────────────────────────────────────────────────────┐\n│  BRONZE LAYER (S3: raw_data/)                              │\n│  - Multi-year partitions (2024 - 2026)                      │\n│  - 117 raw datasets, ~17 GB compressed                     │\n└──────────────┬───────────────────────────────┬──────────────┘\n               │ (< 100 MB files)              │ (> 100 MB: fhvhv)\n               ▼                               │\n┌────────────────────────────────┐             │\n│  AWS LAMBDA DATA CLEANER       │             │\n│  - 3072 MB RAM, Python 3.12    │             │\n│  - S3 Event-Driven Triggers    │             │\n│  - Schema & Codec Normalization│             │\n│  - Quality Filter (>98% score) │             │\n└──────────────┬─────────────────┘             │\n               │                               │\n               ▼                               │\n┌────────────────────────────────┐             │\n│  SILVER LAYER (S3: clean_data/)│             │\n│  - 87 files, 156.5M rows       │             │\n│  - Standardized Snappy Parquet │             │\n└──────────────┬─────────────────┘             │\n               │                               ▼\n               └───────────────► ┌───────────────────────────┐\n                                 │  APACHE SPARK 4.1.2 (EC2) │\n                                 │  - Heavy Dataset Sanitizer│\n                                 │  - Broadcast Geo Joins    │\n                                 │  - 766M Rows Processed    │\n                                 └─────────────┬─────────────┘\n                                               │\n                                               ▼\n                                 ┌───────────────────────────┐\n                                 │  GOLD LAYER (S3:analytics)│\n                                 │  - 5 Dimensional Parquet  │\n                                 │  - Sub-second UI queries  │\n                                 └─────────────┬─────────────┘\n                                               │\n                                               ▼\n                                 ┌───────────────────────────┐\n                                 │  STREAMLIT DASHBOARD      │\n                                 │  - Dockerized on EC2:8501 │\n                                 │  - Interactive Mobility UI│\n                                 │  - Automated CI/CD Runner │\n                                 └───────────────────────────┘\n```\n\n---\n\n## Repository Structure\n\n```text\nstreamlit-curso/\n├── .github/\n│   └── workflows/\n│       └── docker-image.yml     # Automated CI/CD pipeline on self-hosted EC2 runner\n├── docs/\n│   ├── ArquitecturaProj.drawio.svg # Official cloud architecture diagram\n│   ├── architecture.md          # Comprehensive cloud architecture & Medallion pattern\n│   ├── data_quality.md          # Data quality audit & Raw vs Clean metrics\n│   └── data_dictionary.md       # Data dictionary & feature selection rationale\n├── pipeline/\n│   ├── lambda/\n│   │   ├── lambda_ingestion.py  # Lambda 1: Serverless Ingestion & Extractor (TLC to Bronze)\n│   │   ├── lambda_cleaner.py    # Lambda 2: Serverless Cleaner & Normalizer (Bronze to Silver)\n│   │   └── README.md            # Lambda technical specs & ZSTD to Snappy fix\n│   └── spark/\n│       ├── pyspark_analytics.py # PySpark distributed ETL, broadcast joins & Gold generator\n│       ├── taxi_zone_lookup.csv # Municipal catalog (265 zones) for broadcast hash joins\n│       └── README.md            # Spark cluster specs, broadcast join, and Gold schema\n├── app.py                       # Streamlit Mobility Analytics Dashboard\n├── docker-compose.yml           # Docker orchestration on EC2\n├── Dockerfile                   # Production Python 3.11 container with AWS CLI v2\n├── requirements.txt             # Application Python dependencies\n└── README.md                    # Root project documentation\n```\n\n### Direct Access to Pipeline Code\n\n| Stage | Component | File | Technology | Description |\n| :--- | :--- | :--- | :--- | :--- |\n| **Ingesta (Bronze)** | Lambda 1 | [`pipeline/lambda/lambda_ingestion.py`](pipeline/lambda/lambda_ingestion.py) | Python 3.12 / Boto3 | Extracción serverless desde el [portal oficial NYC TLC](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) hacia `raw_data/`. |\n| **Limpieza (Silver)** | Lambda 2 | [`pipeline/lambda/lambda_cleaner.py`](pipeline/lambda/lambda_cleaner.py) | Python 3.12 / AWS Wrangler | Saneamiento, filtrado de calidad y conversión a Snappy Parquet. |\n| **Big Data (Gold)** | Apache Spark | [`pipeline/spark/pyspark_analytics.py`](pipeline/spark/pyspark_analytics.py) | PySpark 4.1.2 / EC2 | Saneamiento `fhvhv`, broadcast join geoespacial y agregaciones Gold. |\n| **Presentación** | Streamlit Web | [`app.py`](app.py) | Streamlit / Plotly / Docker | Dashboard interactivo con telemetría S3 en tiempo real. |\n\n---\n\n## Dashboard Modules (Fase 4: Presentation Layer)\n\nThe interactive analytics platform is built with **Streamlit** and **Plotly**, containerized with Docker and served on port `8501`:\n\n1. **Executive KPI Header**: Instantaneous metrics on total trip volume (766.4M), gross revenue ($23.35B), average trip duration, distance, and municipal zone coverage.\n2. **Temporal Trends & Market Share**: Multi-service monthly time-series line charts and market distribution donut charts.\n3. **Geospatial Borough Distribution**: Borough-level trip volume stacked bars, duration comparisons, and market concentration matrices.\n4. **Rush-Hour Heatmap (2D Grid)**: 7-day × 24-hour heatmap exposing commuter rush hour dynamics and weekend nightlife demand spikes.\n5. **High-Density Corridors**: Top 50 origin-destination transit corridors ranked by passenger density with dynamic search filtering.\n6. **Technical Compatibility Matrix**: Formal audit documenting metric comparability across fleet categories.\n7. **Data Explorer & CSV Export**: Interactive table viewer with on-demand CSV reporting exports.\n\n---\n\n## Key Engineering Accomplishments\n\n1. **Serverless Scalability**: AWS Lambda automatically handles micro-batches and streams incoming taxi trips, completing schema alignment and quality sanitization in seconds without managing servers.\n2. **Snappy Codec Standardization**: Diagnosed and resolved the `Support for codec 'zstd' not built` constraint in AWS Lambda layers by normalizing raw storage to Snappy compression.\n3. **Big Data Workload Routing**: Segregated heavy datasets (`fhvhv` totaling ~14.1 GB compressed and ~150 GB uncompressed) to Apache Spark to prevent serverless memory crashes and timeout bottlenecks.\n4. **Zero-Shuffle Geospatial Joins**: Utilized Spark Broadcast Joins with the official NYC taxi zone catalog (`taxi_zone_lookup.csv`) to enrich trips with zero network shuffle penalty across 766M records.\n5. **Data Lakehouse Architecture**: Deployed the Gold Layer directly to S3 as indexed Parquet, eliminating the operational overhead, connection pool limits, and idle costs of a traditional relational database (RDS).\n6. **Continuous Delivery**: Fully automated zero-downtime container deployments to Amazon EC2 via GitHub Actions self-hosted runner.\n\n---\n\n## Authors & Academic Credentials\n- **Course**: AWS Big Data & Cloud Architecture (*Curso AWS*)\n- **Author**: Jonathan Daniel Reyes Gordillo\n- **Repository**: [DanielRousse/streamlit-curso](https://github.com/DanielRousse/streamlit-curso)"};

async function obtenerContenidoMarkdown(url) {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const text = await res.text();
      if (text && text.length > 0) return text;
    }
  } catch (e) {
  }
  return embeddedMarkdownDocs[url] || "";
}

function parseMarkdown(md, basePath) {
  if (!md) return "";
  basePath = basePath || "";

  const codeBlocks = [];
  let text = md.replace(/```([a-zA-Z0-9_-]*)\r?\n([\s\S]*?)```/g, (match, lang, code) => {
    const idx = codeBlocks.length;
    const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    codeBlocks.push(`<div class="modal-code-wrap"><div class="modal-code-header"><span>&lt;/&gt; ${lang || "Código"}</span></div><pre class="modal-code-pre"><code>${escaped}</code></pre></div>`);
    return `%%%CODEBLOCK_${idx}%%%`;
  });

  const tableBlocks = [];
  const lines = text.split(/\r?\n/);
  const outLines = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("|") && line.endsWith("|")) {
      inTable = true;
      tableRows.push(line);
    } else {
      if (inTable) {
        const tableHtml = renderTable(tableRows);
        const idx = tableBlocks.length;
        tableBlocks.push(tableHtml);
        outLines.push(`%%%TABLEBLOCK_${idx}%%%`);
        tableRows = [];
        inTable = false;
      }
      outLines.push(lines[i]);
    }
  }
  if (inTable) {
    const tableHtml = renderTable(tableRows);
    const idx = tableBlocks.length;
    tableBlocks.push(tableHtml);
    outLines.push(`%%%TABLEBLOCK_${idx}%%%`);
  }

  function renderTable(rows) {
    if (rows.length === 0) return "";
    let html = '<div style="overflow-x:auto; margin: 1.25rem 0;"><table class="md-table"><thead>';
    let isHeader = true;
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r].trim();
      if (/^\|[\s\-:|]+\|$/.test(row)) {
        isHeader = false;
        html += '</thead><tbody>';
        continue;
      }
      const cells = row.split("|").slice(1, -1).map(c => c.trim());
      html += '<tr>';
      for (const cell of cells) {
        const tag = isHeader ? 'th' : 'td';
        html += `<${tag}>${cell}</${tag}>`;
      }
      html += '</tr>';
    }
    html += isHeader ? '</thead></table></div>' : '</tbody></table></div>';
    return html;
  }

  text = outLines.join("\n");

  text = text.replace(/^#### (.*$)/gm, "<h4>$1</h4>");
  text = text.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  text = text.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  text = text.replace(/^# (.*$)/gm, "<h1>$1</h1>");
  text = text.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");
  text = text.replace(/^---$/gm, "<hr />");

  text = text.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    let finalSrc = src.trim();
    if (!finalSrc.startsWith("http") && !finalSrc.startsWith("/") && basePath) {
      finalSrc = basePath + finalSrc;
    }
    return `<div class="md-img-wrap" style="text-align:center; margin:1.25rem 0;"><img src="${finalSrc}" alt="${alt}" style="max-width:100%; border-radius:6px; border:1px solid var(--border-subtle);" /><div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.4rem;">${alt}</div></div>`;
  });

  text = text.replace(/\[(.*?)\]\((.*?)\)/g, (match, title, href) => {
    let finalHref = href.trim();
    if (!finalHref.startsWith("http") && !finalHref.startsWith("/") && basePath) {
      finalHref = basePath + finalHref;
    }
    const safeTitle = title.replace(/'/g, "\\'");
    const safeHref = finalHref.replace(/'/g, "\\'");
    if (finalHref.endsWith(".svg")) {
      return `<button type="button" class="btn-doc-link" onclick="abrirModalSvg('${safeHref}', '${safeTitle}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> ${title}</button>`;
    }
    if (finalHref.endsWith(".md")) {
      return `<button type="button" class="btn-doc-link" onclick="abrirModalMarkdown('${safeHref}', '${safeTitle}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> ${title}</button>`;
    }
    return `<a href="${finalHref}" target="_blank" rel="noopener noreferrer">${title}</a>`;
  });

  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*([^\*\n]+)\*/g, "<em>$1</em>");
  text = text.replace(/`([^`\n]+)`/g, '<code class="inline-code">$1</code>');

  text = text.replace(/%%%CODEBLOCK_(\d+)%%%/g, (m, id) => codeBlocks[id]);
  text = text.replace(/%%%TABLEBLOCK_(\d+)%%%/g, (m, id) => tableBlocks[id]);

  return text;
}

function abrirModalSvg(url, titulo, origenId) {
  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  const pdfWrap = document.getElementById("modal-pdf-wrap");
  const codeWrap = document.getElementById("modal-code-wrap");
  const svgWrap = document.getElementById("modal-svg-wrap");
  const mdWrap = document.getElementById("modal-md-wrap");
  const actionsBar = document.getElementById("modal-actions-bar");

  if (modalContent) {
    modalContent.classList.remove("has-pdf", "has-md");
    modalContent.classList.add("has-svg");
  }
  if (modalTabs) modalTabs.style.display = "none";
  if (pdfWrap) pdfWrap.style.display = "none";
  if (codeWrap) codeWrap.style.display = "none";
  if (mdWrap) mdWrap.style.display = "none";
  if (svgWrap) svgWrap.style.display = "block";

  const svgImg = document.getElementById("modal-svg-img");
  const svgFilename = document.getElementById("modal-svg-filename");
  const btnSvgExternal = document.getElementById("btn-svg-external");
  const btnSvgDownload = document.getElementById("btn-svg-download");

  if (svgImg) svgImg.src = url;
  if (svgFilename) svgFilename.textContent = url.split("/").pop();
  if (btnSvgExternal) btnSvgExternal.href = url;
  if (btnSvgDownload) {
    btnSvgDownload.href = url;
    btnSvgDownload.setAttribute("download", url.split("/").pop());
  }

  document.getElementById("modal-title").textContent = titulo || "Diagrama de Arquitectura Cloud";
  document.getElementById("modal-badges").innerHTML = `
    <span class="tag-pill" style="background: rgba(0, 245, 160, 0.15); color: var(--accent-neon); border-color: rgba(0, 245, 160, 0.4);">Diagrama SVG</span>
    <span class="tag-pill" style="background: rgba(0, 210, 255, 0.15); color: var(--primary-cyan); border-color: rgba(0, 210, 255, 0.4);">Vectorial (Draw.io)</span>
  `;

  let backBtnHtml = "";
  if (origenId) {
    backBtnHtml = `
      <div style="margin-bottom: 1rem;">
        <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem; display: inline-flex; align-items: center; gap: 0.35rem; cursor:pointer;" onclick="abrirModalProyecto('${origenId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al Proyecto
        </button>
      </div>
    `;
  }
  document.getElementById("modal-body").innerHTML = backBtnHtml + '<p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:0.75rem;">Diagrama de arquitectura del Cloud Data Lakehouse en AWS (Medallion Pattern: Bronze, Silver, Gold y Serving en EC2 con Streamlit y Docker).</p>';

  if (actionsBar) {
    let btns = "";
    if (origenId) {
      btns += `<button class="btn btn-secondary" onclick="abrirModalProyecto('${origenId}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Volver al Proyecto</button>`;
    }
    btns += `<a href="${url}" download="${url.split("/").pop()}" class="btn-pdf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar SVG</a>`;
    actionsBar.innerHTML = btns;
    actionsBar.style.display = "flex";
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

async function abrirModalMarkdown(url, titulo, origenId) {
  const overlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
  const modalTabs = document.getElementById("modal-tabs");
  const pdfWrap = document.getElementById("modal-pdf-wrap");
  const codeWrap = document.getElementById("modal-code-wrap");
  const svgWrap = document.getElementById("modal-svg-wrap");
  const mdWrap = document.getElementById("modal-md-wrap");
  const actionsBar = document.getElementById("modal-actions-bar");

  if (modalContent) {
    modalContent.classList.remove("has-pdf", "has-svg");
    modalContent.classList.add("has-md");
  }
  if (modalTabs) modalTabs.style.display = "none";
  if (pdfWrap) pdfWrap.style.display = "none";
  if (codeWrap) codeWrap.style.display = "none";
  if (svgWrap) svgWrap.style.display = "none";
  if (mdWrap) mdWrap.style.display = "block";

  const mdFilename = document.getElementById("modal-md-filename");
  const btnMdExternal = document.getElementById("btn-md-external");
  const mdContent = document.getElementById("modal-md-content");

  const fname = url.split("/").pop();
  if (mdFilename) mdFilename.textContent = fname;
  if (btnMdExternal) btnMdExternal.href = url;
  if (mdContent) mdContent.innerHTML = '<div style="text-align:center; padding:2rem; color:var(--text-muted);"><div style="margin-top:0.75rem;">Cargando documento...</div></div>';

  document.getElementById("modal-title").textContent = titulo || fname;
  document.getElementById("modal-badges").innerHTML = `
    <span class="tag-pill" style="background: rgba(0, 245, 160, 0.15); color: var(--accent-neon); border-color: rgba(0, 245, 160, 0.4);">Documento Markdown</span>
    <span class="tag-pill" style="background: rgba(0, 210, 255, 0.15); color: var(--primary-cyan); border-color: rgba(0, 210, 255, 0.4);">${fname}</span>
  `;

  let backBtnHtml = "";
  if (origenId) {
    backBtnHtml = `
      <div style="margin-bottom: 1rem;">
        <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem; display: inline-flex; align-items: center; gap: 0.35rem; cursor:pointer;" onclick="abrirModalProyecto('${origenId}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al Proyecto
        </button>
      </div>
    `;
  }
  document.getElementById("modal-body").innerHTML = backBtnHtml;

  if (actionsBar) {
    let btns = "";
    if (origenId) {
      btns += `<button class="btn btn-secondary" onclick="abrirModalProyecto('${origenId}')"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Volver al Proyecto</button>`;
    }
    btns += `<a href="${url}" download="${fname}" class="btn-pdf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar .md</a>`;
    actionsBar.innerHTML = btns;
    actionsBar.style.display = "flex";
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  const rawMd = await obtenerContenidoMarkdown(url);
  const basePath = url.substring(0, url.lastIndexOf("/") + 1);
  const html = parseMarkdown(rawMd, basePath);
  if (mdContent) {
    mdContent.innerHTML = html;
  }
}
