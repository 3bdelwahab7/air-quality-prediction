"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { PredictionInput, WindDirection } from "@/types";
import { WIND_DIRECTIONS } from "@/lib/constants";
import { 
  Wind, 
  Cloud, 
  Sun, 
  Thermometer, 
  Gauge as GaugeIcon, 
  Droplets, 
  CloudRain, 
  Compass, 
  Activity,
  ArrowRight
} from "lucide-react";

interface PredictionFormProps {
  input: PredictionInput;
  onChange: (field: keyof PredictionInput, value: number | WindDirection) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  onReset: () => void;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  input,
  onChange,
  onSubmit,
  isLoading,
  onReset,
}) => {
  const handleNumberChange = (field: keyof PredictionInput) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(field, isNaN(val) ? 0 : val);
  };

  const handleWindChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange("wd", e.target.value as WindDirection);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Group 1: Atmospheric Pollutants */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-3 pb-5 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center border border-forest-100">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy">Atmospheric & Chemical Telemetry</h3>
            <p className="text-xs text-navy-muted">Surface particulate matter and chemical sensor concentrations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* PM10 */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-forest" />
                PM10 Particulates
              </span>
              <span className="text-[11px] font-normal text-navy-muted">µg/m³</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.PM10}
              onChange={handleNumberChange("PM10")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* SO2 */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-forest" />
                Sulfur Dioxide (SO2)
              </span>
              <span className="text-[11px] font-normal text-navy-muted">µg/m³</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.SO2}
              onChange={handleNumberChange("SO2")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* NO2 */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-forest" />
                Nitrogen Dioxide (NO2)
              </span>
              <span className="text-[11px] font-normal text-navy-muted">µg/m³</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.NO2}
              onChange={handleNumberChange("NO2")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* CO */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-forest" />
                Carbon Monoxide (CO)
              </span>
              <span className="text-[11px] font-normal text-navy-muted">µg/m³</span>
            </label>
            <input
              type="number"
              step="1"
              value={input.CO}
              onChange={handleNumberChange("CO")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* O3 */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-forest" />
                Ozone (O3)
              </span>
              <span className="text-[11px] font-normal text-navy-muted">µg/m³</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.O3}
              onChange={handleNumberChange("O3")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>
        </div>
      </div>

      {/* Group 2: Meteorological & Weather Conditions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-3 pb-5 mb-6 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-skyaccent flex items-center justify-center border border-sky-100">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy">Meteorological & Climate Conditions</h3>
            <p className="text-xs text-navy-muted">Ambient weather, barometric pressure, moisture, and wind dynamics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Temperature */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-skyaccent" />
                Ambient Temperature
              </span>
              <span className="text-[11px] font-normal text-navy-muted">°C</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.TEMP}
              onChange={handleNumberChange("TEMP")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* Pressure */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <GaugeIcon className="w-3.5 h-3.5 text-skyaccent" />
                Barometric Pressure
              </span>
              <span className="text-[11px] font-normal text-navy-muted">hPa</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.PRES}
              onChange={handleNumberChange("PRES")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* Dew Point */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-skyaccent" />
                Dew Point Temperature
              </span>
              <span className="text-[11px] font-normal text-navy-muted">°C</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.DEWP}
              onChange={handleNumberChange("DEWP")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* Rainfall */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-skyaccent" />
                Precipitation / Rain
              </span>
              <span className="text-[11px] font-normal text-navy-muted">mm</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.RAIN}
              onChange={handleNumberChange("RAIN")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* Wind Speed */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-skyaccent" />
                Wind Speed (WSPM)
              </span>
              <span className="text-[11px] font-normal text-navy-muted">m/s</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={input.WSPM}
              onChange={handleNumberChange("WSPM")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
              required
            />
          </div>

          {/* Wind Direction */}
          <div>
            <label className="flex items-center justify-between text-xs font-bold text-navy mb-1.5">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-skyaccent" />
                Compass Wind Direction
              </span>
              <span className="text-[11px] font-normal text-navy-muted">Cardinal</span>
            </label>
            <select
              value={input.wd}
              onChange={handleWindChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-navy focus:bg-white focus:border-skyaccent focus:ring-3 focus:ring-skyaccent/15 transition-all outline-hidden shadow-2xs"
            >
              {WIND_DIRECTIONS.map((dir) => (
                <option key={dir} value={dir}>
                  {dir} Direction
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Prominent Gradient Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:flex-1 py-4 px-8 rounded-2xl bg-gradient-to-r from-forest via-emerald-600 to-skyaccent text-white font-bold text-base sm:text-lg shadow-md hover:shadow-xl hover:from-forest-900 hover:to-skyaccent transition-all duration-300 transform active:scale-98 flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Wind className="w-6 h-6 animate-spin" />
              <span>Calculating Prediction...</span>
            </>
          ) : (
            <>
              <span>Predict Air Quality (PM2.5)</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-navy-light text-sm font-semibold transition-all active:scale-98 cursor-pointer shadow-2xs"
        >
          Reset Defaults
        </button>
      </div>
    </form>
  );
};
