"use client";

import React, { useState } from "react";
import { ChevronDown, TrendingUp } from "lucide-react";

interface SalesPoint {
  period: string;
  revenue: number;
  orders: number;
}

interface SalesOverviewProps {
  data?: SalesPoint[];
  totalRevenue?: number;
}

const timeframeData: Record<
  string,
  {
    pathArea: string;
    pathLine: string;
    points: Array<{ x: number; y: number; period: string; rev: string; orders: number }>;
    labels: string[];
    yMax: string;
  }
> = {
  "This Month": {
    pathArea:
      "M 0,140 C 30,140 40,80 70,80 C 100,80 110,120 140,115 C 170,110 180,75 210,75 C 240,75 250,125 280,125 C 310,125 320,95 350,95 C 380,95 390,135 415,135 C 440,135 460,40 480,45 C 495,50 500,75 500,75 L 500,160 L 0,160 Z",
    pathLine:
      "M 0,140 C 30,140 40,80 70,80 C 100,80 110,120 140,115 C 170,110 180,75 210,75 C 240,75 250,125 280,125 C 310,125 320,95 350,95 C 380,95 390,135 415,135 C 440,135 460,40 480,45 C 495,50 500,75 500,75",
    points: [
      { x: 70, y: 80, period: "Aug 6", rev: "£3,800", orders: 112 },
      { x: 140, y: 115, period: "Aug 11", rev: "£2,400", orders: 84 },
      { x: 210, y: 75, period: "Aug 16", rev: "£4,100", orders: 135 },
      { x: 280, y: 125, period: "Aug 18", rev: "£2,100", orders: 70 },
      { x: 350, y: 95, period: "Aug 21", rev: "£3,200", orders: 98 },
      { x: 480, y: 45, period: "Aug 24", rev: "£5,600", orders: 180 },
    ],
    labels: ["Aug 1", "Aug 6", "Aug 11", "Aug 16", "Aug 21", "Aug 24"],
    yMax: "£8K",
  },
  "Last 30 Days": {
    pathArea:
      "M 0,120 C 50,110 90,60 140,65 C 190,70 240,110 290,90 C 340,70 390,50 440,40 C 470,35 500,60 500,60 L 500,160 L 0,160 Z",
    pathLine:
      "M 0,120 C 50,110 90,60 140,65 C 190,70 240,110 290,90 C 340,70 390,50 440,40 C 470,35 500,60 500,60",
    points: [
      { x: 140, y: 65, period: "Week 1", rev: "£4,800", orders: 154 },
      { x: 290, y: 90, period: "Week 2", rev: "£3,600", orders: 118 },
      { x: 440, y: 40, period: "Week 3", rev: "£6,200", orders: 210 },
    ],
    labels: ["Day 1", "Day 7", "Day 14", "Day 21", "Day 28", "Day 30"],
    yMax: "£10K",
  },
  "This Year": {
    pathArea:
      "M 0,130 C 60,120 120,100 180,80 C 240,60 300,70 360,50 C 420,30 460,25 500,35 L 500,160 L 0,160 Z",
    pathLine:
      "M 0,130 C 60,120 120,100 180,80 C 240,60 300,70 360,50 C 420,30 460,25 500,35",
    points: [
      { x: 90, y: 110, period: "Q1", rev: "£18,400", orders: 620 },
      { x: 250, y: 65, period: "Q2", rev: "£26,900", orders: 890 },
      { x: 420, y: 30, period: "Q3", rev: "£34,200", orders: 1140 },
    ],
    labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
    yMax: "£40K",
  },
};

export default function SalesOverview({ data, totalRevenue }: SalesOverviewProps) {
  const [timeframe, setTimeframe] = useState<"This Month" | "Last 30 Days" | "This Year">("This Month");
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ period: string; rev: string; orders: number } | null>(null);

  const currentChart = timeframeData[timeframe] || timeframeData["This Month"];

  return (
    <div className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[16px] font-bold admin-text-primary">
            Sales Overview
          </h3>
          <p className="text-[11.5px] admin-text-secondary mt-0.5">
            Real-time revenue stream & velocity
          </p>
        </div>

        {/* Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 admin-input-bg rounded-lg text-xs font-medium admin-text-primary hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>{timeframe}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1.5 w-32 admin-card rounded-lg shadow-lg py-1 z-20 animate-in fade-in duration-100">
              {(["This Month", "Last 30 Days", "This Year"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTimeframe(opt);
                    setShowDropdown(false);
                    setHoveredPoint(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                    timeframe === opt
                      ? "text-[#7C3AED] dark:text-[#C4B5FD] font-semibold bg-[#FAF5FF] dark:bg-[#7C3AED]/20"
                      : "admin-text-primary hover:bg-gray-50 dark:hover:bg-[#334155]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hover Tooltip display */}
      <div className="h-6 flex items-center justify-end text-xs font-medium pr-2">
        {hoveredPoint ? (
          <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#C4B5FD] text-[11px] animate-in fade-in">
            <TrendingUp className="w-3 h-3" />
            <strong className="font-semibold">{hoveredPoint.period}:</strong> {hoveredPoint.rev} ({hoveredPoint.orders} orders)
          </span>
        ) : (
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            Hover over curve markers to view details
          </span>
        )}
      </div>

      {/* Chart Canvas with Y-Axis */}
      <div className="relative flex-1 flex items-stretch gap-3 min-h-[200px] pt-1">
        {/* Y-Axis Labels */}
        <div className="flex flex-col justify-between text-[11px] font-medium admin-text-secondary pb-6 select-none pl-1 pr-2">
          <span>{currentChart.yMax}</span>
          <span>{timeframe === "This Year" ? "£30K" : "£6K"}</span>
          <span>{timeframe === "This Year" ? "£20K" : "£4K"}</span>
          <span>{timeframe === "This Year" ? "£10K" : "£2K"}</span>
          <span>£0</span>
        </div>

        {/* SVG Curve Chart */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="relative flex-1 w-full h-[170px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 160"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1="0" x2="500" y2="0" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="160" x2="500" y2="160" stroke="currentColor" className="text-gray-200 dark:text-gray-700" strokeWidth="1" />

              {/* Area Under Curve */}
              <path
                d={currentChart.pathArea}
                fill="url(#chartGradient)"
                className="transition-all duration-700 ease-in-out"
              />

              {/* Smooth Purple Curve Line */}
              <path
                d={currentChart.pathLine}
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-700 ease-in-out"
              />

              {/* Interactive Data Dots */}
              {currentChart.points.map((pt, idx) => (
                <g key={idx} className="cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="4.5"
                    className="fill-[#8B5CF6] hover:fill-[#A78BFA] transition-all hover:r-6 drop-shadow-md"
                    onMouseEnter={() => setHoveredPoint(pt)}
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="2"
                    className="fill-white pointer-events-none"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* X-Axis Labels */}
          <div className="flex items-center justify-between text-[11px] font-medium admin-text-secondary pt-2">
            {currentChart.labels.map((lbl, idx) => (
              <span key={idx}>{lbl}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
