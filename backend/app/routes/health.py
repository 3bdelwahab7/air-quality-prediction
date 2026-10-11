from fastapi import APIRouter
from app.schemas.prediction import HealthResponse
from app.services.model_service import model_service

router = APIRouter(prefix="/api", tags=["System Health"])

@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check and ML model readiness",
    description="Returns the operational status of the API and verifies model deserialization."
)
async def check_health() -> HealthResponse:
    is_ready = model_service.is_loaded()
    return HealthResponse(
        status="healthy" if is_ready else "degraded",
        model_loaded=is_ready,
        version="1.0.0"
    )
