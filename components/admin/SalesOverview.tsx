"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SalesOverview() {
  const [timeframe, setTimeframe] = useState("This Month");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between transition-colors">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-bold admin-text-primary">
          Sales Overview
        </h3>

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
              {["This Month", "Last 30 Days", "This Year"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setTimeframe(opt);
                    setShowDropdown(false);
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

      {/* Chart Canvas with Y-Axis */}
      <div className="relative flex-1 flex items-stretch gap-3 min-h-[220px] pt-2">
        {/* Y-Axis Labels with comfortable left margin */}
        <div className="flex flex-col justify-between text-[11px] font-medium admin-text-secondary pb-6 select-none pl-1 pr-2">
          <span>£8K</span>
          <span>£6K</span>
          <span>£4K</span>
          <span>£2K</span>
          <span>£0</span>
        </div>

        {/* SVG Curve Chart */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="relative flex-1 w-full h-[180px]">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 160"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.28" />
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
                d="M 0,140 C 30,140 40,80 70,80 C 100,80 110,120 140,115 C 170,110 180,75 210,75 C 240,75 250,125 280,125 C 310,125 320,95 350,95 C 380,95 390,135 415,135 C 440,135 460,40 480,45 C 495,50 500,75 500,75 L 500,160 L 0,160 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth Purple Curve Line */}
              <path
                d="M 0,140 C 30,140 40,80 70,80 C 100,80 110,120 140,115 C 170,110 180,75 210,75 C 240,75 250,125 280,125 C 310,125 320,95 350,95 C 380,95 390,135 415,135 C 440,135 460,40 480,45 C 495,50 500,75 500,75"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* X-Axis Labels */}
          <div className="flex items-center justify-between text-[11px] font-medium admin-text-secondary pt-2">
            <span>Aug 1</span>
            <span>Aug 6</span>
            <span>Aug 11</span>
            <span>Aug 16</span>
            <span>Aug 21</span>
            <span>Aug 24</span>
          </div>
        </div>
      </div>
    </div>
  );
}
