# NYC Urban Mobility: Data Dictionary & Feature Selection Rationale

## 1. Raw Fleet Schema Comparison

The NYC Taxi & Limousine Commission (TLC) collects trip records across distinct fleets with historically incompatible schemas:

| Attribute | Yellow Taxis (tpep) | Green Taxis (lpep) | FHV (For-Hire Vehicle) | High Volume FHV (fhvhv) |
| :--- | :--- | :--- | :--- | :--- |
| **Pickup Timestamp** | `tpep_pickup_datetime` | `lpep_pickup_datetime` | `pickup_datetime` | `pickup_datetime` |
| **Dropoff Timestamp** | `tpep_dropoff_datetime` | `lpep_dropoff_datetime` | `dropOff_datetime` | `dropoff_datetime` |
| **Pickup Zone ID** | `PULocationID` | `PULocationID` | `PUlocationID` | `PULocationID` |
| **Dropoff Zone ID** | `DOLocationID` | `DOLocationID` | `DOlocationID` | `DOLocationID` |
| **Trip Distance** | `trip_distance` | `trip_distance` | Not Available | `trip_miles` |
| **Trip Duration** | Derived | Derived | Derived | `trip_time` (seconds) |
| **Base Fare** | `fare_amount` | `fare_amount` | Not Available | `base_passenger_fare` |
| **Total Amount** | `total_amount` | `total_amount` | Not Available | Derived |
| **Hardware Flag** | `store_and_fwd_flag` | `store_and_fwd_flag` | Not Available | Not Available |
| **Vendor Metadata** | `VendorID` | `VendorID` | `dispatching_base_num` | `hvfhs_license_num` |

---

## 2. Canonical Schema Definition (Silver Layer)

The Lambda sanitization pipeline harmonizes all fleets into the following canonical schema:

| Column Name | Data Type | Description | Analytical Value |
| :--- | :--- | :--- | :--- |
| `pickup_datetime` | `TIMESTAMP` | Normalized pickup date and time | **Essential**: Temporal aggregations, peak hours, seasonality. |
| `dropoff_datetime` | `TIMESTAMP` | Normalized dropoff date and time | **Essential**: Duration calculations, end-of-trip analysis. |
| `pulocationid` | `INTEGER` | TLC Taxi Zone ID of passenger pickup | **Essential**: Geospatial join key for origin borough/zone. |
| `dolocationid` | `INTEGER` | TLC Taxi Zone ID of passenger dropoff | **Essential**: Geospatial join key for destination borough/zone. |
| `trip_duration_minutes` | `DOUBLE` | Computed duration: `(dropoff - pickup) / 60.0` | **Essential**: Core efficiency metric, traffic congestion analysis. |
| `trip_distance` | `DOUBLE` | Distance traveled in miles | **High**: Trip length and speed analysis. |
| `fare_amount` | `DOUBLE` | Metered fare or base ride cost | **High**: Transportation economics and fare patterns. |
| `total_amount` | `DOUBLE` | Gross ride cost charged to passenger | **High**: Total consumer expenditure. |
| `passenger_count` | `INTEGER` | Number of passengers in vehicle | **Medium**: Vehicle occupancy rates. |

---

## 3. Feature Selection & Noise Elimination Rationale

During data profiling, several variables present in raw data were identified as operational noise or regulatory baggage that contribute zero value to mobility analytics:

### Discarded Variables:
1. **`store_and_fwd_flag` ('Y' / 'N')**:
   - *Technical Description*: Indicates whether the taximeter stored the record in vehicle local memory before transmitting over wireless cellular network.
   - *Elimination Rationale*: Hardware communication metadata; irrelevant for urban mobility, travel patterns, or revenue analysis.
2. **`VendorID` (1 = Creative Mobile Technologies, 2 = VeriFone Inc.)**:
   - *Technical Description*: Identifies the commercial manufacturer of the physical in-cab meter.
   - *Elimination Rationale*: Equipment vendor categorization provides no business value for urban mobility planning.
3. **`RatecodeID` (1 = Standard, 2 = JFK, 3 = Newark, 4 = Nassau/Westchester, 5 = Negotiated, 6 = Group)**:
   - *Technical Description*: Historical municipal fare rule applied by the meter.
   - *Elimination Rationale*: Redundant with geospatial origin and destination zones (e.g., trips to JFK or EWR are already explicitly captured by `dolocationid`).
4. **Micro-Taxes (`extra`, `mta_tax`, `improvement_surcharge`, `congestion_surcharge`, `Airport_fee`)**:
   - *Technical Description*: Specific municipal sub-levies and legislative fees added to the meter.
   - *Elimination Rationale*: High cardinality breakdown creates schema bloat. For executive analytics, the total spend (`total_amount`) and core revenue (`fare_amount`) provide the necessary economic view.
5. **Sparse Columns (`ehail_fee`, `sr_flag`)**:
   - *Technical Description*: Electronic hail fee and shared ride indicator in FHV.
   - *Elimination Rationale*: Over 99% of values are null/empty across historical months.

---

## 4. Data Quality & Sanitization Rules

The Lambda function enforces strict data quality filters, resulting in a **98.3%+ valid record retention rate**:

1. **Temporal Consistency**:
   - `pickup_datetime` and `dropoff_datetime` must be valid timestamps (non-null).
   - `trip_duration_minutes > 0`: Eliminates aborted rides, system glitches, and GPS recording errors where dropoff is earlier than or equal to pickup.
   - `trip_duration_minutes < 1440`: Eliminates trips exceeding 24 hours, typically caused by drivers forgetting to turn off the taximeter or hardware hangs.
2. **Economic Coherence**:
   - `trip_distance >= 0`: Filters out inverted distance readings.
   - `total_amount >= 0` and `fare_amount >= 0`: Discards accounting chargebacks and negative credit card adjustments.
