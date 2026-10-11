import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#166534",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        fresh: {
          DEFAULT: "#22C55E",
          hover: "#16a34a",
          light: "#dcfce7",
        },
        skyaccent: {
          DEFAULT: "#0EA5E9",
          hover: "#0284c7",
          light: "#e0f2fe",
        },
        canvas: "#F0F9FF",
        navy: {
          DEFAULT: "#1E293B",
          light: "#475569",
          muted: "#64748B",
        },
        aqi: {
          good: "#16A34A",
          moderate: "#CA8A04",
          sensitive: "#EA580C",
          unhealthy: "#DC2626",
          veryUnhealthy: "#9333EA",
          hazardous: "#881337",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
