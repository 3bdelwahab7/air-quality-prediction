import { PredictionInput, PredictionResult, HealthStatus } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function predictAirQuality(input: PredictionInput): Promise<PredictionResult> {
  const url = `${API_BASE_URL}/api/predict`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            errorMessage = errorData.detail.map((d: { msg?: string }) => d.msg || "Invalid input").join(", ");
          } else {
            errorMessage = errorData.detail;
          }
        }
      } catch {
        // Fallback to default message
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message.includes("fetch")) {
      throw new Error(
        `Unable to reach backend service at ${API_BASE_URL}. Ensure the FastAPI server is running.`
      );
    }
    throw err instanceof Error ? err : new Error("An unexpected error occurred during prediction.");
  }
}

export async function getHealthStatus(): Promise<HealthStatus> {
  const url = `${API_BASE_URL}/api/health`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Backend degraded");
    return await response.json();
  } catch {
    return {
      status: "offline",
      model_loaded: false,
      version: "unknown",
    };
  }
}
