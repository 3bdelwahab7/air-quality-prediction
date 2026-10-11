"use client";

import React from "react";
import { AQI_BRACKETS } from "@/lib/constants";
import { ShieldCheck, Info } from "lucide-react";

export const AirQualityGuide: React.FC = () => {
  return (
    <section id="aqi-guide" className="py-12 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Info className="w-3.5 h-3.5" />
            <span>Health Reference Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
            Air Quality Index (AQI) Classification
          </h2>
          <p className="text-sm text-navy-muted mt-2">
            Standard US Environmental Protection Agency (EPA) particulate matter (PM2.5) brackets and health recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AQI_BRACKETS.map((item) => (
            <div
              key={item.category}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold"
                  style={{ backgroundColor: item.bg, color: item.color }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.category}</span>
                </div>
                <span className="text-xs font-bold text-navy">{item.range} µg/m³</span>
              </div>

              {/* Description */}
              <p className="text-xs text-navy-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
