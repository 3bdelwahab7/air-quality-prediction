import os
from pathlib import Path
from datetime import datetime, timezone
import pandas as pd
import joblib
from fastapi import HTTPException
from app.schemas.prediction import PredictionRequest, PredictionResponse

class ModelService:
    def __init__(self):
        self.model = None
        self.model_columns = None
        self._load_model()

    def _load_model(self):
        base_dir = Path(__file__).resolve().parent.parent.parent
        model_path = base_dir / "models" / "rf_model.pkl"
        columns_path = base_dir / "models" / "model_columns (1).pkl"

        if not model_path.exists():
            raise FileNotFoundError(f"Trained model not found at: {model_path}")
        if not columns_path.exists():
            raise FileNotFoundError(f"Model columns not found at: {columns_path}")

        try:
            self.model = joblib.load(str(model_path))
            self.model_columns = joblib.load(str(columns_path))
            print("[OK] Model and features successfully loaded into memory.")
        except Exception as e:
            raise RuntimeError(f"Error deserializing model assets: {str(e)}")

    def is_loaded(self) -> bool:
        return self.model is not None and self.model_columns is not None

    def predict(self, req: PredictionRequest) -> PredictionResponse:
        if not self.is_loaded():
            raise HTTPException(status_code=503, detail="Machine learning model is not initialized.")

        try:
            # 1. Structure raw input into single-row DataFrame
            input_dict = {
                'PM10': [req.PM10],
                'SO2': [req.SO2],
                'NO2': [req.NO2],
                'CO': [req.CO],
                'O3': [req.O3],
                'TEMP': [req.TEMP],
                'PRES': [req.PRES],
                'DEWP': [req.DEWP],
                'RAIN': [req.RAIN],
                'WSPM': [req.WSPM],
                'wd': [req.wd]
            }
            df = pd.DataFrame(input_dict)

            # 2. Match exact preprocessing pipeline: one-hot encode wind direction
            df = pd.get_dummies(df, columns=['wd'])

            # 3. Exact column realignment matching model_columns
            df = df.reindex(columns=self.model_columns, fill_value=0)

            # 4. Predict
            raw_pred = self.model.predict(df)[0]
            prediction = float(round(raw_pred, 2))

            # 5. Determine EPA category, styling color, gauge position, and advisory
            category, color, bg_color, gauge_pct, advisory = self._classify_pm25(prediction)

            return PredictionResponse(
                pm25=prediction,
                unit="µg/m³",
                category=category,
                color=color,
                bg_color=bg_color,
                gauge_percentage=gauge_pct,
                advisory=advisory,
                timestamp=datetime.now(timezone.utc).isoformat()
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Prediction calculation failure: {str(e)}")

    @staticmethod
    def _classify_pm25(pm25: float):
        """
        Standard US EPA PM2.5 Breakpoints:
        0.0 - 12.0: Good (Green)
        12.1 - 35.4: Moderate (Yellow/Amber)
        35.5 - 55.4: Unhealthy for Sensitive Groups (Orange)
        55.5 - 150.4: Unhealthy (Red)
        150.5 - 250.4: Very Unhealthy (Purple)
        250.5+: Hazardous (Maroon / Dark Red)
        """
        if pm25 <= 12.0:
            category = "Good"
            color = "#16A34A"       # Green
            bg_color = "#DCFCE7"
            advisory = "Air quality is considered satisfactory, and air pollution poses little or no risk. Ideal for outdoor recreation."
            pct = min(max((pm25 / 12.0) * 16.6, 2.0), 16.6)
        elif pm25 <= 35.4:
            category = "Moderate"
            color = "#CA8A04"       # Yellow/Amber
            bg_color = "#FEF9C3"
            advisory = "Air quality is acceptable. However, unusually sensitive individuals may experience mild respiratory symptoms."
            pct = 16.6 + min(max(((pm25 - 12.1) / (35.4 - 12.1)) * 16.6, 0.0), 16.6)
        elif pm25 <= 55.4:
            category = "Unhealthy for Sensitive Groups"
            color = "#EA580C"       # Orange
            bg_color = "#FFEDD5"
            advisory = "People with respiratory or heart disease, the elderly, and children should limit prolonged outdoor exertion."
            pct = 33.2 + min(max(((pm25 - 35.5) / (55.4 - 35.5)) * 16.6, 0.0), 16.6)
        elif pm25 <= 150.4:
            category = "Unhealthy"
            color = "#DC2626"       # Red
            bg_color = "#FEE2E2"
            advisory = "Everyone may begin to experience adverse health effects; members of sensitive groups may experience more serious effects."
            pct = 49.8 + min(max(((pm25 - 55.5) / (150.4 - 55.5)) * 16.6, 0.0), 16.6)
        elif pm25 <= 250.4:
            category = "Very Unhealthy"
            color = "#9333EA"       # Purple
            bg_color = "#F3E8FF"
            advisory = "Health alert: The risk of health effects is increased for everyone. Avoid outdoor exertion and keep windows closed."
            pct = 66.4 + min(max(((pm25 - 150.5) / (250.4 - 150.5)) * 16.6, 0.0), 16.6)
        else:
            category = "Hazardous"
            color = "#881337"       # Maroon / Dark Red
            bg_color = "#FFE4E6"
            advisory = "Health warning of emergency conditions: The entire population is likely to be affected. Remain indoors with air filtration."
            pct = min(83.0 + min(max(((pm25 - 250.5) / 250.0) * 17.0, 0.0), 17.0), 100.0)

        return category, color, bg_color, round(pct, 1), advisory

# Global singleton service
model_service = ModelService()
