# Tarea 3: Fundamentos de Estadística Descriptiva y Métricas en Pandas

**Programa:** AWS Xideral  
**Módulo:** Módulo 1 - Infraestructura, Cloud & Análisis de Datos  
**Autor:** Jonathan Daniel Reyes Gordillo  
**Fecha:** Septiembre 2026  
**Estado:** Completada  

---

## 1. Resumen Ejecutivo

El análisis exploratorio de datos (EDA) constituye la primera etapa fundamental en cualquier proyecto de ciencia de datos, machine learning e ingeniería analítica. Antes de construir modelos predictivos o diseñar pipelines de transformación, es indispensable comprender la topología, dispersión y comportamiento intrínseco de los conjuntos de datos.

En el ecosistema Python para ciencia de datos, la biblioteca **Pandas** proporciona el método `.describe()`, el cual genera un diagnóstico rápido y estandarizado de la distribución de variables numéricas. Esta investigación profundiza formalmente en los conceptos matemáticos y computacionales detrás de cada métrica generada: conteo de registros válidos (`count`), tendencia central (`mean`), variabilidad y dispersión (`std` y distribución normal), valores extremos (`min` y `max`), y medidas de orden posicional o cuartiles (`25%`, `50%` y `75%`).

---

## 2. Medidas de Frecuencia y Tendencia Central

### 2.1 Conteo de Observaciones (count)
* **Definición Técnica:** Representa el número total de registros presentes con valores válidos y no nulos (`non-null values`) dentro de una serie o columna analizada.
* **Importancia Analítica:** A diferencia de la longitud total de la estructura de datos (como la función nativa `len()` en Python), `count` omite automáticamente valores ausentes (`NaN`, `None` o `NaT`). Esto permite al ingeniero de datos diagnosticar instantáneamente el porcentaje de completitud de una variable y determinar si requiere imputación, limpieza o descarte previo al modelado.
* **Equivalente en Pandas:** `df['columna'].count()`

### 2.2 Media Aritmética (mean)
* **Definición Técnica:** Es la medida de tendencia central más común y representa el promedio numérico de los valores observados en una muestra o población.
* **Fundamento Matemático:** La media muestral ($\bar{x}$) se calcula sumando todos los valores observados y dividiendo el resultado entre el total de observaciones válidas:

  $$\bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i = \frac{x_1 + x_2 + \dots + x_n}{n}$$

  Donde $x_i$ representa cada observación individual y $n$ corresponde al número de observaciones no nulas.
* **Comportamiento y Sensibilidad:** La media actúa como el "centro de gravedad" de los datos. Sin embargo, su principal debilidad analítica radica en su alta sensibilidad a valores atípicos (*outliers*); un único valor extremadamente grande o pequeño sesga significativamente la media, alejándola del valor representativo del conjunto típico de datos.
* **Equivalente en Pandas:** `df['columna'].mean()`

---

## 3. Medidas de Dispersión y Distribuciones

### 3.1 Desviación Estándar (std)
* **Definición Técnica:** Cuantifica el grado de dispersión, propagación o separación de los datos respecto a su media aritmética. Se expresa en las mismas unidades físicas y dimensionales que la variable original.
* **Fundamento Matemático:** Pandas calcula por defecto la **desviación estándar muestral** utilizando la corrección de Bessel ($n - 1$ grados de libertad, `ddof=1`):

  $$s = \sqrt{\frac{1}{n - 1} \sum_{i=1}^{n} (x_i - \bar{x})^2}$$
* **Interpretación:**
  * Un valor de `std` bajo indica que la mayoría de los puntos de datos se encuentran estrechamente agrupados alrededor de la media.
  * Un valor de `std` alto señala que los datos presentan gran heterogeneidad y se distribuyen sobre un rango más amplio de valores.
* **Equivalente en Pandas:** `df['columna'].std()`

### 3.2 Distribución Normal y su Relación con la Desviación Estándar
* **Concepto:** La distribución normal (también conocida como distribución Gaussiana o campana de Gauss) es una función de densidad de probabilidad simétrica continua, donde la mayor concentración de ocurrencias se localiza alrededor de la media, decreciendo de forma simétrica hacia ambos extremos.
* **Propiedades Fundamentales:**
  1. **Simetría:** La media, la mediana y la moda coinciden exactamente en el centro de la campana ($\mu = \text{Mediana} = \text{Moda}$).
  2. **Regla Empírica (68-95-99.7):**
     * Aproximadamente el **68.27%** de las observaciones caen dentro del intervalo $[\mu - 1\sigma, \mu + 1\sigma]$.
     * Aproximadamente el **95.45%** de las observaciones se ubican dentro de $[\mu - 2\sigma, \mu + 2\sigma]$.
     * El **99.73%** de los datos se concentran dentro de $[\mu - 3\sigma, \mu + 3\sigma]$.
  3. **Estandarización (Puntaje Z):** Permite comparar observaciones convirtiendo los datos a una escala estándar con media 0 y varianza 1 mediante $z = \frac{x - \mu}{\sigma}$. Valores con $|z| > 3$ suelen clasificarse formalmente como anomalías.

---

## 4. Medidas de Posición, Cuartiles y Extremos

### 4.1 Valor Mínimo (min)
* **Definición:** El menor valor numérico registrado en la serie de datos tras ordenar las observaciones:
  $$x_{\min} = \min(\{x_1, x_2, \dots, x_n\})$$
* **Utilidad:** Establece la cota inferior del rango analizado. Es fundamental para detectar inconsistencias físicas o de captura (por ejemplo, edades o precios negativos).
* **Equivalente en Pandas:** `df['columna'].min()`

### 4.2 Percentiles y Cuartiles
Los percentiles dividen una distribución ordenada de datos en 100 partes porcentuales iguales. En el resumen de Pandas, se analizan los tres cuartiles principales ($Q_1, Q_2, Q_3$):

#### Percentil 25% (Primer Cuartil - Q1)
* **Concepto:** Es el valor numérico por debajo del cual se encuentra el **25%** de las observaciones ordenadas de menor a mayor.
* **Interpretación:** Delimita el primer cuarto de la muestra; el 75% de los datos restantes superan este umbral.
* **Equivalente en Pandas:** `df['columna'].quantile(0.25)`

#### Percentil 50% (Segundo Cuartil / Mediana - Q2)
* **Concepto:** Es el punto medio exacto de la distribución ordenada. El **50%** de las observaciones son menores o iguales a este valor, y el otro 50% son mayores.
* **Propiedad de Robustez:** A diferencia de la media, la mediana es una métrica no paramétrica **robusta** ante valores atípicos. En distribuciones sesgadas (como salarios o precios de vivienda), la mediana refleja con mayor fidelidad la tendencia central que la media aritmética.
* **Equivalente en Pandas:** `df['columna'].median()` o `df['columna'].quantile(0.50)`

#### Percentil 75% (Tercer Cuartil - Q3)
* **Concepto:** Es el valor por debajo del cual se sitúa el **75%** de las observaciones del conjunto ordenado.
* **Interpretación:** El 25% superior de los registros supera este valor.
* **Equivalente en Pandas:** `df['columna'].quantile(0.75)`

### 4.3 Rango Intercuartílico (IQR) y Diagrama de Caja (Boxplot)
La distancia entre el percentil 75% y el percentil 25% se conoce como **Rango Intercuartílico**:
$$IQR = Q_3 - Q_1$$
El IQR concentra el 50% central de las observaciones y es la base del método de John Tukey para identificar valores atípicos (outliers leves y severos):
* **Límite Inferior:** $Q_1 - 1.5 \times IQR$
* **Límite Superior:** $Q_3 + 1.5 \times IQR$

### 4.4 Valor Máximo (max)
* **Definición:** El mayor valor numérico registrado en la muestra:
  $$x_{\max} = \max(\{x_1, x_2, \dots, x_n\})$$
* **Utilidad:** Marca la cota superior observada. Permite calcular el rango completo de la variable ($R = x_{\max} - x_{\min}$) y validar límites operacionales o picos inusuales.
* **Equivalente en Pandas:** `df['columna'].max()`

---

## 5. Matriz Comparativa de Métricas en Pandas

| Métrica | Categoría | Definición Breve | Función Pandas | Sensibilidad a Outliers |
| :--- | :--- | :--- | :--- | :--- |
| **count** | Frecuencia | Total de valores válidos no nulos | `s.count()` | Baja |
| **mean** | Tendencia Central | Promedio ponderado de la muestra | `s.mean()` | Muy Alta |
| **std** | Dispersión | Variación estándar con $N-1$ grados | `s.std()` | Muy Alta |
| **min** | Extremo | Menor valor observado en el registro | `s.min()` | Crítica |
| **25% (Q1)** | Posición | Valor que supera al 25% inferior | `s.quantile(0.25)` | Muy Baja (Robusta) |
| **50% (Q2)** | Tendencia Central | Mediana exacta de la distribución | `s.median()` | Muy Baja (Robusta) |
| **75% (Q3)** | Posición | Valor que supera al 75% de los datos | `s.quantile(0.75)` | Muy Baja (Robusta) |
| **max** | Extremo | Mayor valor observado en el registro | `s.max()` | Crítica |

---

## 6. Conclusiones y Consideraciones Prácticas

1. **La Media y la Mediana deben evaluarse juntas:** Si $\text{mean} \approx \text{50\%}$, la distribución es aproximadamente simétrica. Si $\text{mean} > \text{50\%}$, existe asimetría positiva sesgada a la derecha por valores atípicos altos.
2. **La Desviación Estándar cobra sentido con la forma de los datos:** En distribuciones normales, la regla $68-95-99.7\%$ ofrece certidumbre probabilística; en distribuciones no normales o multimodales, los percentiles ($Q_1, Q_2, Q_3$) y el IQR ofrecen un diagnóstico mucho más confiable.
3. **Optimización en Pipelines de Datos:** Conocer estas métricas permite a los ingenieros de software implementar validaciones automáticas de calidad de datos (*Data Quality Checks*) para detectar desviaciones inesperadas en entornos de producción.