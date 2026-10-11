import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict_router, health_router

app = FastAPI(
    title="Air Quality (PM2.5) Prediction API",
    description="High-performance machine learning backend for atmospheric PM2.5 particulate matter prediction.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
allowed_origins_env = os.getenv("CORS_ORIGINS", "")
allowed_origins = [origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()]

# Default local & cloud origins
default_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000"
]

all_origins = list(set(default_origins + allowed_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if not allowed_origins else all_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach routes
app.include_router(predict_router)
app.include_router(health_router)

@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "Air Quality (PM2.5) Prediction API",
        "status": "online",
        "documentation": "/docs",
        "health": "/api/health",
        "predict": "/api/predict"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)
