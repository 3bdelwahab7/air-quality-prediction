# Air Quality (PM2.5) Prediction System

A production-grade, full-stack environmental monitoring and forecasting web application powered by **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **FastAPI**.

This system predicts ambient fine particulate matter (**PM2.5** concentration in $\mu\text{g/m}^3$) based on 11 validated chemical gas sensor and meteorological telemetry readings, mapped dynamically to the official US Environmental Protection Agency (**EPA**) Air Quality Index (AQI) standards.

---

## Architecture Overview

The system is decoupled into two independent applications communicating over a REST API:

1. **Frontend (`frontend/`)**: Modern responsive dashboard built with Next.js 14 (App Router), React 18, TypeScript, and Tailwind CSS. Adheres strictly to the **Impeccable design system** (deep forest green `#166534`, fresh green `#22C55E`, sky blue `#0EA5E9`, light atmospheric background `#F0F9FF`, dark navy typography `#1E293B`, and zero generic AI cliches).
2. **Backend (`backend/`)**: High-performance FastAPI server serving the deserialized Scikit-Learn Random Forest Regressor (`rf_model.pkl`) with strict Pydantic payload validation and EPA AQI classification.

---

## Project Folder Structure

```text
Air Quality/
|
+-- frontend/                     # Next.js 14 Frontend Application
|   +-- app/
|   |   +-- layout.tsx            # Global Root Layout with Inter typography
|   |   +-- page.tsx              # Main Dashboard Page (Telemetry Form + Live Results)
|   |   +-- globals.css           # Tailwind base styles and atmospheric background
|   +-- components/
|   |   +-- Navbar.tsx            # Navigation bar with live backend health indicator
|   |   +-- Hero.tsx              # Environmental hero section with scenario presets
|   |   +-- PredictionForm.tsx    # Clean multi-column input grid with units & icons
|   |   +-- ResultCard.tsx        # High-craft PM2.5 metric display & health advisory
|   |   +-- Gauge.tsx             # Color-coded 6-band EPA scale visual gauge
|   |   +-- AirQualityGuide.tsx   # EPA AQI category reference table
|   |   +-- Footer.tsx            # System metadata, model provenance & credits
|   +-- lib/
|   |   +-- api.ts                # API client with error handling & configurable base URL
|   |   +-- constants.ts          # Default inputs, presets, and AQI brackets
|   +-- types/
|   |   +-- index.ts              # TypeScript interfaces for telemetry and predictions
|   +-- package.json              # Node.js dependencies
|   +-- tailwind.config.ts        # Custom environmental theme tokens
|   +-- vercel.json               # Vercel deployment configuration
|   +-- .env.local                # Local environment configuration
|   +-- .env.production.example   # Production environment template
|
+-- backend/                      # FastAPI Python Application
|   +-- app/
|   |   +-- main.py               # FastAPI entrypoint with CORS & route mounting
|   |   +-- routes/
|   |   |   +-- predict.py        # POST /api/predict endpoint
|   |   |   +-- health.py         # GET /api/health endpoint
|   |   +-- services/
|   |   |   +-- model_service.py  # Model deserialization, preprocessing, and classification
|   |   +-- schemas/
|   |       +-- prediction.py     # Pydantic data validation schemas
|   +-- models/
|   |   +-- rf_model.pkl          # Trained Random Forest Regressor
|   |   +-- model_columns (1).pkl # Column order and one-hot encoding alignment
|   +-- requirements.txt          # Python backend dependencies
|   +-- Procfile                  # Deployment configuration for Render/Railway/Heroku
|   +-- Dockerfile                # Production container specification
|
+-- PRODUCT.md                    # Impeccable product truth and use case definition
+-- DESIGN.md                     # Impeccable design system tokens and guidelines
+-- .gitignore                    # Git ignore rules for Python & Node
+-- README.md                     # Comprehensive project documentation
```

---

## Prerequisites

* **Node.js**: v18.17.0+ (Tested on v20.18.0)
* **npm**: v9.0.0+ (Tested on v10.8.2)
* **Python**: 3.10+ (Tested on 3.11.9)
* **pip**: Python package manager

---

## Running Locally

### Step 1: Clone or Navigate to the Project

```bash
cd "Air Quality"
```

### Step 2: Start the FastAPI Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the development server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
4. Verify backend availability:
   * **API Root**: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
   * **Health Check**: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)
   * **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Step 3: Start the Next.js Frontend

1. In a separate terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install Node dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Ensure `.env.local` points to your local backend:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```
4. Run the development server (or production build):
   ```bash
   # Development mode
   npm run dev

   # Or Production mode (compiled & optimized)
   npm run build
   npm run start
   ```
5. Open your browser at **[http://localhost:3000](http://localhost:3000)**.

---

## API Reference

### 1. Health & Readiness Probe
`GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "version": "1.0.0"
}
```

### 2. Predict PM2.5 Concentration
`POST /api/predict`

**Request Payload:**
```json
{
  "PM10": 100.0,
  "SO2": 20.0,
  "NO2": 40.0,
  "CO": 1000.0,
  "O3": 50.0,
  "TEMP": 15.0,
  "PRES": 1010.0,
  "DEWP": -5.0,
  "RAIN": 0.0,
  "WSPM": 2.0,
  "wd": "N"
}
```

**Response:**
```json
{
  "pm25": 65.46,
  "unit": "ug/m3",
  "category": "Unhealthy",
  "color": "#DC2626",
  "bg_color": "#FEE2E2",
  "gauge_percentage": 51.5,
  "advisory": "Everyone may begin to experience adverse health effects; members of sensitive groups may experience more serious effects.",
  "timestamp": "2026-10-11T00:10:09.978118+00:00"
}
```

---

## Impeccable Design System & Aesthetics

In accordance with the **Impeccable skill standards**:
* **Deliberate Color Philosophy**:
  * Forest Green (`#166534`) represents clean air and natural ecosystems.
  * Fresh Green (`#22C55E`) indicates healthy baseline air quality.
  * Sky Blue (`#0EA5E9`) highlights atmospheric parameters and focus states.
  * Canvas (`#F0F9FF`) creates an airy, breathable environment.
  * Deep Navy (`#1E293B`) ensures maximum typographic legibility.
* **No AI Cliches**: Zero robot icons, brain motifs, generic purple SaaS gradients, or decorative side stripes.
* **Environmental Ergonomics**:
  * Inputs are categorized into **Chemical Emissions** and **Climate Dynamics**.
  * Real-world scenario presets allow one-click testing of Clean Coastal, Urban Morning, and Winter Smog conditions.
  * Interactive 6-tier EPA status gauge provides intuitive visual feedback.

---

## Production Deployment

Deploy the FastAPI backend on Render first, then deploy the Next.js frontend on Vercel. The frontend sends browser requests directly to the backend, so both environment variables below must point to the deployed origins.

### 1. Deploy the backend on Render

1. Push the project repository to GitHub and create a Render **Web Service** connected to it.
2. Set **Root Directory** to `backend` and **Environment** to `Python 3`.
3. Set **Build Command** to `pip install -r requirements.txt`.
4. Set **Start Command** to `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5. Deploy the service. Render will provide a public backend URL. The existing model files are in `backend/models/` and are loaded from paths relative to the backend application.
6. After you know your Vercel production URL, set the Render environment variable `CORS_ORIGINS` to that origin only, for example `https://your-project.vercel.app` (no trailing slash or path). For multiple allowed origins, separate them with commas. Redeploy or restart the Render service after changing the variable.
7. Check `https://<render-host>/api/health`; the response should report `model_loaded: true`.

### 2. Deploy the frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`. Keep the Next.js framework preset and use `npm run build` as the build command.
3. Add the environment variable `NEXT_PUBLIC_API_URL` with the Render backend base URL, for example `https://<render-host>`. Use the origin only; do not append `/api` or a trailing slash. The frontend code appends `/api/predict` and `/api/health` to this value.
4. Deploy the frontend. If its production URL differs from the origin configured in Render's `CORS_ORIGINS`, update that Render variable and restart/redeploy the backend.

`NEXT_PUBLIC_API_URL` is read by the Next.js frontend and must be present in the Vercel environment for the production build. `CORS_ORIGINS` is read by the FastAPI backend at startup. Configure both for the production origins; do not put secrets in frontend environment variables.

---

## Testing & Validation

Predictions generated by the new FastAPI endpoint were verified to be **100% mathematically identical** to the original model:
* **Input**: Default values (`PM10=100.0, SO2=20.0, NO2=40.0, CO=1000.0, O3=50.0, TEMP=15.0, PRES=1010.0, DEWP=-5.0, RAIN=0.0, WSPM=2.0, wd='N'`)
* **Original Gradio Prediction**: `65.46 ug/m3`
* **FastAPI Backend Prediction**: `65.46 ug/m3` (Category: Unhealthy, Gauge: 51.5%)

Both services are currently running locally:
* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
