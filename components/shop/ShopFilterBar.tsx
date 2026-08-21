"use client";

import React from "react";
import { LayoutGrid, List, ChevronDown } from "lucide-react";

interface ShopFilterBarProps {
  currentRangeText?: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export default function ShopFilterBar({
  currentRangeText = "Showing 1–16 of 27 results",
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}: ShopFilterBarProps) {
  return (
    <div className="py-6 sm:py-8 border-b border-[#f2eee3]/10 bg-[#050807]">
      <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left: Result Counter */}
        <p className="text-xs sm:text-sm text-[#888b83] font-normal">
          {currentRangeText}
        </p>

        {/* Right: Filter Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-4 sm:gap-6 w-full md:w-auto justify-between md:justify-end">
          
          {/* Sort Filter Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm text-[#888b83] hidden sm:inline">
              Filter:
            </span>

            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-[#09110d] text-[#dedacf] text-xs sm:text-sm border border-[#f2eee3]/15 rounded-sm py-2 pl-3.5 pr-8 hover:border-[#d4b56a]/50 focus:border-[#d4b56a] focus:outline-none cursor-pointer transition-colors"
              >
                <option value="default" className="bg-[#09110d] text-[#f2eee3]">
                  Sort defaulting
                </option>
                <option value="price-low" className="bg-[#09110d] text-[#f2eee3]">
                  Sort by price: low to high
                </option>
                <option value="price-high" className="bg-[#09110d] text-[#f2eee3]">
                  Sort by price: high to low
                </option>
                <option value="newest" className="bg-[#09110d] text-[#f2eee3]">
                  Sort by latest
                </option>
                <option value="title-az" className="bg-[#09110d] text-[#f2eee3]">
                  Sort by title: A to Z
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#888b83] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Grid / List View Toggle Icons matching reference */}
          <div className="flex items-center gap-1.5 border-l border-[#f2eee3]/10 pl-4 sm:pl-6">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-sm transition-all duration-200 ${
                viewMode === "grid"
                  ? "text-[#d4b56a] bg-[#122319] border border-[#d4b56a]/30"
                  : "text-[#888b83] hover:text-[#f2eee3] hover:bg-[#0c1611]"
              }`}
              title="Grid View (4 Columns)"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-sm transition-all duration-200 ${
                viewMode === "list"
                  ? "text-[#d4b56a] bg-[#122319] border border-[#d4b56a]/30"
                  : "text-[#888b83] hover:text-[#f2eee3] hover:bg-[#0c1611]"
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
