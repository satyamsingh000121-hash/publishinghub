"use client";

import React from "react";
import { LayoutGrid, Menu, SlidersHorizontal, ChevronDown } from "lucide-react";

interface ShopFilterBarProps {
  currentRangeText?: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onOpenMobileFilters?: () => void;
  activeFilterCount?: number;
}

export default function ShopFilterBar({
  currentRangeText = "Showing 1–12 of 22 results",
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  activeFilterCount = 0,
}: ShopFilterBarProps) {
  return (
    <div className="pt-2 pb-6 border-b border-[#e5e7eb] dark:border-[#27272a]/80 mb-8 transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Result Counter & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <p className="text-[13px] sm:text-sm text-[#44403c] dark:text-[#a1a1aa] font-normal">
            {currentRangeText}
          </p>

          {/* Mobile Filter Button (Visible on mobile/tablet) */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#1e3527] dark:hover:bg-[#284936] text-white text-xs font-semibold rounded-[2px] transition-colors shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#9333ea] dark:bg-[#b89245] dark:text-white text-[10px] flex items-center justify-center font-bold ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Sort Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          
          {/* Sort Dropdown matching "Sort: Featured" in reference screenshot */}
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white dark:bg-[#0c1310] text-[#1c1917] dark:text-[#dedacf] text-xs sm:text-[13px] font-normal border border-[#d6d3d1] dark:border-[#27272a] rounded-[2px] py-2 pl-3 pr-8 hover:border-[#9333ea] dark:hover:border-[#b89245]/60 focus:border-[#9333ea] dark:focus:border-[#b89245] focus:outline-none cursor-pointer transition-colors shadow-2xs"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Sort: Price: low to high</option>
              <option value="price-high">Sort: Price: high to low</option>
              <option value="newest">Sort: Newest</option>
              <option value="title-az">Sort: Title: A to Z</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#78716c] dark:text-[#a1a1aa] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid / List View Toggle Switcher */}
          <div className="flex items-center gap-1.5">
            {/* Grid Button */}
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-[2px] transition-all duration-150 flex items-center justify-center border cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#9333ea] dark:bg-[#1e3527] border-[#9333ea] dark:border-[#1e3527] text-white shadow-xs"
                  : "bg-white dark:bg-[#0c1310] text-[#78716c] dark:text-[#a1a1aa] border-[#d6d3d1] dark:border-[#27272a] hover:text-[#18181b] dark:hover:text-[#ffffff] hover:border-[#9333ea] dark:hover:border-[#a8a29e]"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>

            {/* List Button */}
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-[2px] transition-all duration-150 flex items-center justify-center border cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#9333ea] dark:bg-[#1e3527] border-[#9333ea] dark:border-[#1e3527] text-white shadow-xs"
                  : "bg-white dark:bg-[#0c1310] text-[#78716c] dark:text-[#a1a1aa] border-[#d6d3d1] dark:border-[#27272a] hover:text-[#18181b] dark:hover:text-[#ffffff] hover:border-[#9333ea] dark:hover:border-[#a8a29e]"
              }`}
              title="List View"
              aria-label="List View"
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
