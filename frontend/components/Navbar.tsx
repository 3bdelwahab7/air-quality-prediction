"use client";

import React, { useEffect, useState } from "react";
import { Leaf, Wind, Activity } from "lucide-react";
import { getHealthStatus } from "@/lib/api";

export const Navbar: React.FC = () => {
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);

  useEffect(() => {
    getHealthStatus().then((res) => {
      setIsBackendHealthy(res.status === "healthy" && res.model_loaded);
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-forest-100 flex items-center justify-center border border-forest-200 shadow-xs">
              <Leaf className="w-5 h-5 text-forest" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-lg text-navy tracking-tight">AirQuality</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-forest text-white">
                  PM2.5 Lab
                </span>
              </div>
              <p className="text-xs text-navy-muted hidden sm:block">Environmental Prediction System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-navy-light">
            <a href="#prediction-section" className="hover:text-forest transition-colors">
              Predictor
            </a>
            <a href="#aqi-guide" className="hover:text-forest transition-colors">
              AQI Standards
            </a>
            <a href="#system-info" className="hover:text-forest transition-colors">
              Model Specs
            </a>
          </nav>

          {/* Live Status Indicator */}
          <div className="flex items-center space-x-2.5 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isBackendHealthy === null
                  ? "bg-amber-400 animate-pulse"
                  : isBackendHealthy
                  ? "bg-fresh animate-pulse"
                  : "bg-rose-500"
              }`}
            />
            <span className="font-medium text-navy">
              {isBackendHealthy === null
                ? "Connecting API..."
                : isBackendHealthy
                ? "FastAPI ML Online"
                : "API Offline"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
