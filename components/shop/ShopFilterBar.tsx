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
    <div className="py-4 sm:py-5 border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#050807] bg-[#faf7fd] transition-colors duration-300">
      <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Result Counter */}
        <p className="text-xs sm:text-sm dark:text-[#888b83] text-[#71717a] font-normal">
          {currentRangeText}
        </p>

        {/* Right: Filter Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* Sort Filter Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm dark:text-[#888b83] text-[#71717a] hidden sm:inline">
              Filter:
            </span>

            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none dark:bg-[#09110d] bg-white dark:text-[#dedacf] text-[#18181b] text-xs sm:text-sm border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-sm py-2 pl-3.5 pr-8 dark:hover:border-[#d4b56a]/50 hover:border-[#9333ea]/60 dark:focus:border-[#d4b56a] focus:border-[#9333ea] focus:outline-none cursor-pointer transition-colors shadow-xs"
              >
                <option value="default" className="dark:bg-[#09110d] bg-white dark:text-[#f2eee3] text-[#18181b]">
                  Sort defaulting
                </option>
                <option value="price-low" className="dark:bg-[#09110d] bg-white dark:text-[#f2eee3] text-[#18181b]">
                  Sort by price: low to high
                </option>
                <option value="price-high" className="dark:bg-[#09110d] bg-white dark:text-[#f2eee3] text-[#18181b]">
                  Sort by price: high to low
                </option>
                <option value="newest" className="dark:bg-[#09110d] bg-white dark:text-[#f2eee3] text-[#18181b]">
                  Sort by latest
                </option>
                <option value="title-az" className="dark:bg-[#09110d] bg-white dark:text-[#f2eee3] text-[#18181b]">
                  Sort by title: A to Z
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 dark:text-[#888b83] text-[#71717a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Grid / List View Toggle Icons matching reference */}
          <div className="flex items-center gap-1.5 border-l dark:border-[#f2eee3]/10 border-[#e9e1f5] pl-4 sm:pl-6">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-sm transition-all duration-200 ${
                viewMode === "grid"
                  ? "dark:text-[#d4b56a] dark:bg-[#122319] dark:border-[#d4b56a]/30 text-[#9333ea] bg-[#f3e8ff] border border-[#d8b4fe]"
                  : "dark:text-[#888b83] text-[#71717a] dark:hover:text-[#f2eee3] hover:text-[#18181b] dark:hover:bg-[#0c1611] hover:bg-[#f5f3ff]"
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
                  ? "dark:text-[#d4b56a] dark:bg-[#122319] dark:border-[#d4b56a]/30 text-[#9333ea] bg-[#f3e8ff] border border-[#d8b4fe]"
                  : "dark:text-[#888b83] text-[#71717a] dark:hover:text-[#f2eee3] hover:text-[#18181b] dark:hover:bg-[#0c1611] hover:bg-[#f5f3ff]"
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
