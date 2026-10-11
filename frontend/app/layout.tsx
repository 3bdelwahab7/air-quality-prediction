import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Air Quality (PM2.5) Prediction System | Environmental Monitoring Dashboard",
  description: "Real-time atmospheric particulate matter (PM2.5) prediction system powered by machine learning and environmental sensor telemetry.",
  keywords: ["air quality", "PM2.5 prediction", "environmental monitoring", "AQI", "atmospheric chemistry", "machine learning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="font-sans bg-canvas text-navy antialiased min-h-screen flex flex-col selection:bg-forest-100 selection:text-forest">
        {children}
      </body>
    </html>
  );
}
