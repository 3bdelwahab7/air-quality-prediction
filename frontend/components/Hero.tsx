"use client";

import React from "react";
import { Wind, Cloud, ShieldCheck, Sparkles, SlidersHorizontal } from "lucide-react";
import { PRESET_SCENARIOS } from "@/lib/constants";
import { PredictionInput } from "@/types";

interface HeroProps {
  onSelectPreset: (preset: PredictionInput) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPreset }) => {
  return (
    <section className="pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm relative overflow-hidden">
          {/* Subtle Decorative Atmosphere Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl -z-0 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-50/50 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-50 border border-forest-200 text-forest text-xs font-semibold uppercase tracking-wider mb-6">
              <Wind className="w-3.5 h-3.5" />
              <span>Atmospheric Science & Environmental Health</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight sm:leading-tight mb-5">
              Precision Air Quality & <span className="text-forest">PM2.5</span> Forecasting
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-navy-light leading-relaxed mb-8">
              Predict fine particulate matter concentrations ($\mu g/m^3$) using ground-level chemical telemetry and weather conditions. Designed for environmental monitoring, urban analysis, and public health risk assessments.
            </p>

            {/* Preset Scenarios Buttons */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-navy-muted uppercase tracking-wider mb-3">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Load Environmental Preset Scenarios:</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {PRESET_SCENARIOS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => onSelectPreset(preset.values)}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-50 hover:bg-forest-50 border border-slate-200 hover:border-forest-200 text-navy hover:text-forest text-sm font-medium transition-all shadow-2xs hover:shadow-xs active:scale-98"
                  >
                    <span>{preset.label}</span>
                    <span className="text-xs text-navy-muted hidden sm:inline">
                      ({preset.description.split(",")[0]})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <span className="text-xs font-medium text-navy-muted block">Model Accuracy (R²)</span>
              <span className="text-lg font-bold text-forest mt-0.5 block">92.48%</span>
            </div>
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <span className="text-xs font-medium text-navy-muted block">Mean Absolute Error</span>
              <span className="text-lg font-bold text-navy mt-0.5 block">12.68 µg/m³</span>
            </div>
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <span className="text-xs font-medium text-navy-muted block">Input Telemetry</span>
              <span className="text-lg font-bold text-skyaccent mt-0.5 block">11 Features</span>
            </div>
            <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
              <span className="text-xs font-medium text-navy-muted block">Standard Benchmark</span>
              <span className="text-lg font-bold text-forest mt-0.5 block">US EPA AQI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
