import { PredictionInput, WindDirection } from "@/types";

export const WIND_DIRECTIONS: WindDirection[] = [
  'N', 'NNE', 'NE', 'ENE', 
  'E', 'ESE', 'SE', 'SSE', 
  'S', 'SSW', 'SW', 'WSW', 
  'W', 'WNW', 'NW', 'NNW'
];

export const DEFAULT_INPUTS: PredictionInput = {
  PM10: 100.0,
  SO2: 20.0,
  NO2: 40.0,
  CO: 1000.0,
  O3: 50.0,
  TEMP: 15.0,
  PRES: 1010.0,
  DEWP: -5.0,
  RAIN: 0.0,
  WSPM: 2.0,
  wd: 'N',
};

export const PRESET_SCENARIOS: { label: string; description: string; values: PredictionInput }[] = [
  {
    label: "Clean Coastal Air",
    description: "Low emissions, high ventilation, ocean breeze",
    values: {
      PM10: 25.0,
      SO2: 5.0,
      NO2: 12.0,
      CO: 350.0,
      O3: 28.0,
      TEMP: 18.0,
      PRES: 1015.0,
      DEWP: 10.0,
      RAIN: 1.5,
      WSPM: 5.2,
      wd: 'E',
    }
  },
  {
    label: "Typical Urban Morning",
    description: "Moderate traffic emissions and stable weather",
    values: {
      PM10: 100.0,
      SO2: 20.0,
      NO2: 40.0,
      CO: 1000.0,
      O3: 50.0,
      TEMP: 15.0,
      PRES: 1010.0,
      DEWP: -5.0,
      RAIN: 0.0,
      WSPM: 2.0,
      wd: 'N',
    }
  },
  {
    label: "Winter Smog & Inversion",
    description: "Stagnant winds, high heating emissions, trapped particulates",
    values: {
      PM10: 260.0,
      SO2: 75.0,
      NO2: 110.0,
      CO: 3200.0,
      O3: 15.0,
      TEMP: -2.0,
      PRES: 1024.0,
      DEWP: -4.0,
      RAIN: 0.0,
      WSPM: 0.8,
      wd: 'S',
    }
  }
];

export const AQI_BRACKETS = [
  { range: "0.0 – 12.0", category: "Good", color: "#16A34A", bg: "#DCFCE7", desc: "Air quality is satisfactory with little to no risk." },
  { range: "12.1 – 35.4", category: "Moderate", color: "#CA8A04", bg: "#FEF9C3", desc: "Acceptable quality; sensitive individuals may be affected." },
  { range: "35.5 – 55.4", category: "Sensitive", color: "#EA580C", bg: "#FFEDD5", desc: "Unhealthy for sensitive groups like children and seniors." },
  { range: "55.5 – 150.4", category: "Unhealthy", color: "#DC2626", bg: "#FEE2E2", desc: "Everyone may begin to experience health effects." },
  { range: "150.5 – 250.4", category: "Very Unhealthy", color: "#9333EA", bg: "#F3E8FF", desc: "Emergency health warning: serious impacts likely." },
  { range: "250.5+", category: "Hazardous", color: "#881337", bg: "#FFE4E6", desc: "Emergency conditions; entire population is in danger." },
];
