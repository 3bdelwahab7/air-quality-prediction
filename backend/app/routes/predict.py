from fastapi import APIRouter, status
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.model_service import model_service

router = APIRouter(prefix="/api", tags=["Predictions"])

@router.post(
    "/predict",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    summary="Predict PM2.5 Air Pollution Concentration",
    description="Accepts 11 atmospheric and weather measurements and predicts PM2.5 level using the Random Forest model."
)
async def predict_air_quality(payload: PredictionRequest) -> PredictionResponse:
    return model_service.predict(payload)
