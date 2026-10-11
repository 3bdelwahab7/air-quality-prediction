"use client";

import React from "react";
import { PredictionResult, PredictionInput } from "@/types";
import { Gauge } from "./Gauge";
import { AlertCircle, CheckCircle, ShieldAlert, Clock, Activity, Wind, Thermometer } from "lucide-react";

interface ResultCardProps {
  result: PredictionResult | null;
  isLoading: boolean;
  inputSnapshot?: PredictionInput | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, isLoading, inputSnapshot }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center animate-pulse">
        <div className="w-16 h-16 rounded-2xl bg-forest-100 mx-auto mb-6 flex items-center justify-center">
          <Wind className="w-8 h-8 text-forest animate-spin" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">Analyzing Atmospheric Parameters...</h3>
        <p className="text-sm text-navy-muted max-w-md mx-auto">
          Executing multi-feature random forest regression and applying EPA particulate matter classification.
        </p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-8 sm:p-12 border-2 border-dashed border-slate-300 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto mb-5 flex items-center justify-center text-slate-400">
          <Activity className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">Awaiting Telemetry Data</h3>
        <p className="text-sm text-navy-muted max-w-md mx-auto">
          Fill in the environmental parameters on the left or select a preset scenario above, then click <strong>&quot;Predict Air Quality&quot;</strong> to view the detailed forecast.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden transition-all duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-navy-muted uppercase tracking-wider block">
            Target Particulate Matter Forecast
          </span>
          <h2 className="text-2xl font-extrabold text-navy mt-1">PM2.5 Concentration</h2>
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold border"
          style={{
            backgroundColor: result.bg_color,
            color: result.color,
            borderColor: `${result.color}30`,
          }}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: result.color }} />
          <span>{result.category}</span>
        </div>
      </div>

      {/* Main Display Metric */}
      <div className="py-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <div className="flex items-baseline justify-center sm:justify-start space-x-3">
            <span
              className="text-6xl sm:text-7xl font-black tracking-tight"
              style={{ color: result.color }}
            >
              {result.pm25}
            </span>
            <span className="text-xl font-semibold text-navy-muted">
              {result.unit}
            </span>
          </div>
          <p className="text-xs text-navy-muted mt-2">
            Fine particles 2.5 micrometers or smaller in aerodynamic diameter.
          </p>
        </div>

        {inputSnapshot && (
          <div className="flex flex-wrap sm:flex-col gap-2 text-xs text-navy-muted bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="flex items-center gap-1.5 font-medium text-navy">
              <Thermometer className="w-3.5 h-3.5 text-forest" />
              {inputSnapshot.TEMP}°C | {inputSnapshot.PRES} hPa
            </span>
            <span className="flex items-center gap-1.5 font-medium text-navy">
              <Wind className="w-3.5 h-3.5 text-skyaccent" />
              {inputSnapshot.WSPM} m/s ({inputSnapshot.wd}) | PM10: {inputSnapshot.PM10}
            </span>
          </div>
        )}
      </div>

      {/* Visual Gauge */}
      <div className="pt-2 pb-4">
        <div className="flex justify-between items-center text-xs font-semibold text-navy mb-1">
          <span>EPA Air Quality Scale Position</span>
          <span style={{ color: result.color }}>{result.category} Bracket</span>
        </div>
        <Gauge
          percentage={result.gauge_percentage}
          color={result.color}
          category={result.category}
          value={result.pm25}
        />
      </div>

      {/* Public Health Advisory Card */}
      <div 
        className="p-5 rounded-2xl border text-sm leading-relaxed"
        style={{
          backgroundColor: `${result.bg_color}60`,
          borderColor: `${result.color}40`,
        }}
      >
        <div className="flex items-start space-x-3">
          <div className="mt-0.5" style={{ color: result.color }}>
            {result.category === "Good" ? (
              <CheckCircle className="w-5 h-5" />
            ) : result.category === "Moderate" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <ShieldAlert className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4 className="font-bold text-navy mb-1">Health Impact & Recommendations</h4>
            <p className="text-navy-light">{result.advisory}</p>
          </div>
        </div>
      </div>

      {/* Timestamp footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-navy-muted">
        <span className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Inference generated at: {new Date(result.timestamp).toLocaleTimeString()}</span>
        </span>
        <span className="font-medium text-forest">Random Forest Model</span>
      </div>
    </div>
  );
};
