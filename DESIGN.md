# DESIGN.md — Environmental Monitoring Design System

## 1. Visual Identity & Brand Philosophy
- **Domain Metaphor**: High-precision atmospheric observatory & ecological data lab. Crisp, clean, breathable, trustworthy.
- **Banned Clichés**:
  - ABSOLUTELY NO generic AI/robot icons, sparkles, brain graphics, or circuit patterns.
  - NO purple-to-blue generic SaaS gradients.
  - NO nested decorative card borders or generic glassmorphism blur traps.
  - NO cluttered typography or illegible micro-labels.
- **Allowed Iconography**: Botanical & meteorological iconography only: clean leaves, wind currents, barometer indicators, droplets, thermometers, chemical particle molecules.

## 2. Color Palette & Functional Tokens
- **Primary Brand**: `#166534` (Deep Forest Green — stability, ecological health)
- **Secondary Accent**: `#22C55E` (Fresh Leaf Green — clean air benchmark)
- **Atmospheric Accent**: `#0EA5E9` (Sky Blue — tropospheric clarity, focus rings)
- **Canvas / Background**: `#F0F9FF` (Atmospheric Clean Light Blue-Gray)
- **Surface / Cards**: `#FFFFFF` (Pure Crisp White, subtle border `rgba(226, 232, 240, 0.8)`)
- **Primary Text**: `#1E293B` (Dark Slate Navy — high contrast, authoritative)
- **Secondary Text**: `#475569` (Muted Slate — descriptive context)

### Air Quality Classification Tokens (EPA Standard Alignment)
- **Good (0 - 12.0 µg/m³)**: `#16A34A` (Green) | Background: `#DCFCE7`
- **Moderate (12.1 - 35.4 µg/m³)**: `#CA8A04` (Amber/Yellow) | Background: `#FEF9C3`
- **Unhealthy for Sensitive Groups (35.5 - 55.4 µg/m³)**: `#EA580C` (Orange) | Background: `#FFEDD5`
- **Unhealthy (55.5 - 150.4 µg/m³)**: `#DC2626` (Crimson Red) | Background: `#FEE2E2`
- **Very Unhealthy (150.5 - 250.4 µg/m³)**: `#9333EA` (Purple) | Background: `#F3E8FF`
- **Hazardous (250.5+ µg/m³)**: `#881337` (Maroon/Dark Burgundy) | Background: `#FFE4E6`

## 3. Typography Hierarchy
- Headings: `Plus Jakarta Sans` or `Poppins` / `Inter`, bold weights (600-700), deliberate optical sizing.
- Body & Inputs: `Inter`, weights 400, 500, tabular figures for numeric data (`font-variant-numeric: tabular-nums`).
- Metric Display: Bold display numerals (48px - 64px) with dedicated units badge.

## 4. Layout Architecture
- **Max Width**: `1360px` container for true wide-screen dashboard layout.
- **Grid Layout**: 2-column or 3-column structured form layout grouping logical scientific clusters:
  1. Cluster A: Particulate & Gaseous Emissions (PM10, SO2, NO2, CO, O3)
  2. Cluster B: Atmospheric & Meteorological Telemetry (TEMP, PRES, DEWP, RAIN, WSPM, Wind Direction)
- **Results Section**: Dedicated dynamic report card displaying gauge visualization, EPA classification badge, and health advisory card.
