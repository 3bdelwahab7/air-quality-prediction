from pydantic import BaseModel, Field
from typing import Literal

WindDirection = Literal[
    'N', 'NNE', 'NE', 'ENE', 
    'E', 'ESE', 'SE', 'SSE', 
    'S', 'SSW', 'SW', 'WSW', 
    'W', 'WNW', 'NW', 'NNW'
]

class PredictionRequest(BaseModel):
    PM10: float = Field(..., description="PM10 particulate concentration (µg/m³)", ge=0, le=2000, example=100.0)
    SO2: float = Field(..., description="Sulfur Dioxide concentration (µg/m³)", ge=0, le=1000, example=20.0)
    NO2: float = Field(..., description="Nitrogen Dioxide concentration (µg/m³)", ge=0, le=1000, example=40.0)
    CO: float = Field(..., description="Carbon Monoxide concentration (µg/m³)", ge=0, le=50000, example=1000.0)
    O3: float = Field(..., description="Ozone concentration (µg/m³)", ge=0, le=1000, example=50.0)
    TEMP: float = Field(..., description="Ambient temperature (°C)", ge=-50, le=60, example=15.0)
    PRES: float = Field(..., description="Atmospheric barometric pressure (hPa)", ge=800, le=1200, example=1010.0)
    DEWP: float = Field(..., description="Dew point temperature (°C)", ge=-50, le=50, example=-5.0)
    RAIN: float = Field(..., description="Precipitation / rainfall (mm)", ge=0, le=500, example=0.0)
    WSPM: float = Field(..., description="Wind speed (m/s)", ge=0, le=100, example=2.0)
    wd: WindDirection = Field(..., description="Wind compass direction", example="N")

class PredictionResponse(BaseModel):
    pm25: float
    unit: str = "µg/m³"
    category: str
    color: str
    bg_color: str
    gauge_percentage: float
    advisory: str
    timestamp: str

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    version: str
