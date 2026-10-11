"use client";

import React from "react";
import { Leaf, Wind, Database, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="system-info" className="bg-white border-t border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-100">
          {/* Brand Col */}
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-forest-100 flex items-center justify-center text-forest">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-navy">AirQuality PM2.5 System</span>
            </div>
            <p className="text-xs text-navy-muted leading-relaxed max-w-sm">
              An open, full-stack atmospheric monitoring application bridging environmental chemistry data and statistical machine learning for particulate forecasting.
            </p>
          </div>

          {/* Model Specification */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
              Model & Telemetry Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-navy-light">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Algorithm: Random Forest Regressor (50 estimators)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Validation Metric: R² = 92.48%, MAE = 12.68 µg/m³</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                <span>Features: 11 Meteorological & Gas Telemetry Sensors</span>
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
              Full-Stack Technology
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "FastAPI", "Scikit-Learn", "Pydantic", "Joblib", "Uvicorn"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-slate-50 border border-slate-200/60 rounded-md text-[11px] font-medium text-navy-light"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-muted">
          <p>© {new Date().getFullYear()} Air Quality Prediction System. Environmental Telemetry Dashboard.</p>
          <p className="flex items-center space-x-1">
            <span>Powered by</span>
            <span className="font-semibold text-forest">Environmental Analytics</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
