# PRODUCT.md — Air Quality (PM2.5) Prediction System

## 1. Product Truth & Purpose
The **Air Quality (PM2.5) Prediction System** is a professional environmental analysis and forecasting web platform. It enables environmental scientists, urban planners, public health officials, and citizens to forecast atmospheric particulate matter (PM2.5 concentration in $\mu g/m^3$) using meteorological telemetry and trace gas sensor data.

## 2. Core Users & Use Cases
- **Environmental Scientists & Analysts**: Input atmospheric observations (PM10, SO2, NO2, CO, O3) alongside weather parameters (temperature, pressure, dew point, rainfall, wind velocity, and direction) to assess local air quality hazards.
- **Urban Planners & Health Authorities**: Obtain instantaneous EPA-standard health category classification (Good, Moderate, Unhealthy for Sensitive Groups, Unhealthy, Very Unhealthy, Hazardous) with actionable public health advisories.
- **Researchers**: Test atmospheric scenarios and validate environmental correlations with high-fidelity regression modeling.

## 3. Functional Requirements
- **Inputs**: 11 validated environmental and meteorological variables.
- **Prediction Core**: Pre-trained Random Forest Regressor model operating over engineered feature pipelines.
- **Output**:
  - Continuous scalar: PM2.5 ($\mu g/m^3$).
  - Categorical health index: EPA Air Quality Index (AQI) mapped bracket.
  - Interactive visual scale gauge (0 to 300+ $\mu g/m^3$).
  - Health & safety advisory recommendation.
- **Performance**: Sub-100ms inference API latency, zero UI blocking, graceful error recovery.
