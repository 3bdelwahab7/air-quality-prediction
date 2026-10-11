export type WindDirection = 
  | 'N' | 'NNE' | 'NE' | 'ENE' 
  | 'E' | 'ESE' | 'SE' | 'SSE' 
  | 'S' | 'SSW' | 'SW' | 'WSW' 
  | 'W' | 'WNW' | 'NW' | 'NNW';

export interface PredictionInput {
  PM10: number;
  SO2: number;
  NO2: number;
  CO: number;
  O3: number;
  TEMP: number;
  PRES: number;
  DEWP: number;
  RAIN: number;
  WSPM: number;
  wd: WindDirection;
}

export interface PredictionResult {
  pm25: number;
  unit: string;
  category: string;
  color: string;
  bg_color: string;
  gauge_percentage: number;
  advisory: string;
  timestamp: string;
}

export interface HealthStatus {
  status: string;
  model_loaded: boolean;
  version: string;
}
