"use client";

import React, { useState, FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PredictionForm } from "@/components/PredictionForm";
import { ResultCard } from "@/components/ResultCard";
import { AirQualityGuide } from "@/components/AirQualityGuide";
import { Footer } from "@/components/Footer";
import { DEFAULT_INPUTS } from "@/lib/constants";
import { PredictionInput, PredictionResult, WindDirection } from "@/types";
import { predictAirQuality } from "@/lib/api";
import { AlertTriangle, X } from "lucide-react";

export default function Home() {
  const [inputs, setInputs] = useState<PredictionInput>(DEFAULT_INPUTS);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [inputSnapshot, setInputSnapshot] = useState<PredictionInput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (field: keyof PredictionInput, value: number | WindDirection) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPreset = (preset: PredictionInput) => {
    setInputs(preset);
    setError(null);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    setInputSnapshot(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const prediction = await predictAirQuality(inputs);
      setResult(prediction);
      setInputSnapshot({ ...inputs });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to obtain prediction from API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section with Quick Scenario Presets */}
        <Hero onSelectPreset={handleSelectPreset} />

        {/* Prediction Interface */}
        <section id="prediction-section" className="py-6 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Error Notification Banner */}
            {error && (
              <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start justify-between shadow-xs animate-shake">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold">Prediction Request Failed</h4>
                    <p className="text-xs text-rose-700 mt-0.5">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-rose-500 hover:text-rose-800 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Split Grid Layout: Inputs Form & Sticky Results Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Input Form (7 cols) */}
              <div className="lg:col-span-7">
                <PredictionForm
                  input={inputs}
                  onChange={handleFieldChange}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  onReset={handleReset}
                />
              </div>

              {/* Right Column: Live Results Display (5 cols - sticky) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <ResultCard
                  result={result}
                  isLoading={isLoading}
                  inputSnapshot={inputSnapshot}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Environmental Air Quality Index Reference Guide */}
        <AirQualityGuide />
      </main>

      <Footer />
    </>
  );
}
