"use client";

import React from "react";

interface GaugeProps {
  percentage: number;
  color: string;
  category: string;
  value: number;
}

export const Gauge: React.FC<GaugeProps> = ({ percentage, color, category, value }) => {
  // Clamped percentage between 0 and 100
  const clamped = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="w-full my-6">
      {/* Visual Bar with Multi-Segment AQI Background */}
      <div className="relative">
        <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
          {/* Segment 1: Good (0-16.6%) */}
          <div className="h-full bg-emerald-500/30 border-r border-white/60" style={{ width: "16.6%" }} title="Good (0 - 12.0)" />
          {/* Segment 2: Moderate (16.6-33.2%) */}
          <div className="h-full bg-amber-500/30 border-r border-white/60" style={{ width: "16.6%" }} title="Moderate (12.1 - 35.4)" />
          {/* Segment 3: Sensitive (33.2-49.8%) */}
          <div className="h-full bg-orange-500/30 border-r border-white/60" style={{ width: "16.6%" }} title="Unhealthy for Sensitive (35.5 - 55.4)" />
          {/* Segment 4: Unhealthy (49.8-66.4%) */}
          <div className="h-full bg-rose-500/30 border-r border-white/60" style={{ width: "16.6%" }} title="Unhealthy (55.5 - 150.4)" />
          {/* Segment 5: Very Unhealthy (66.4-83%) */}
          <div className="h-full bg-purple-500/30 border-r border-white/60" style={{ width: "16.6%" }} title="Very Unhealthy (150.5 - 250.4)" />
          {/* Segment 6: Hazardous (83-100%) */}
          <div className="h-full bg-rose-950/30" style={{ width: "17%" }} title="Hazardous (250.5+)" />
        </div>

        {/* Dynamic Needle / Marker Indicator */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
          style={{ left: `${clamped}%` }}
        >
          <div 
            className="w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center animate-pulse"
            style={{ backgroundColor: color }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Axis Scale Labels */}
      <div className="flex justify-between items-center text-[11px] text-navy-muted font-medium mt-2 px-1">
        <span className="text-emerald-700 font-semibold">0 Good</span>
        <span className="text-amber-700 font-semibold hidden sm:inline">12.1 Mod</span>
        <span className="text-orange-700 font-semibold">35.5 Sens</span>
        <span className="text-rose-700 font-semibold">55.5 Unhealthy</span>
        <span className="text-purple-700 font-semibold hidden sm:inline">150.5 V.Unhealthy</span>
        <span className="text-rose-950 font-semibold">250+ Haz</span>
      </div>
    </div>
  );
};
