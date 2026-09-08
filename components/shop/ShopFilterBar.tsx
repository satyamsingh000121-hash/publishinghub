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
    <div className="pb-5 mb-6 transition-colors duration-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Result Counter & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-[13px] text-[#6b7280] dark:text-[#888b83] font-normal">
            {currentRangeText}
          </p>

          {/* Mobile Filter Button (Visible on mobile/tablet) */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-[#09110d] border border-[#b89245] dark:border-[#d4b56a] text-[#b89245] dark:text-[#d4b56a] text-xs font-semibold rounded-[2px] transition-colors shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#b89245] dark:bg-[#d4b56a] text-white dark:text-[#050807] text-[10px] flex items-center justify-center font-bold ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Sort Dropdown & View Mode Switcher */}
        <div className="flex items-center gap-3 ml-auto">
          
          {/* Sort Dropdown */}
          <div className="relative inline-block">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white dark:bg-[#09110d] text-[#18181b] dark:text-[#d9d5ca] text-xs font-normal border border-[#e5e7eb] dark:border-[#f2eee3]/15 rounded-[2px] py-1.5 pl-3 pr-8 hover:border-[#b89245] dark:hover:border-[#d4b56a]/60 focus:border-[#b89245] dark:focus:border-[#d4b56a] focus:outline-none cursor-pointer transition-colors shadow-2xs"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Sort by: Price: low to high</option>
              <option value="price-high">Sort by: Price: high to low</option>
              <option value="newest">Sort by: Newest</option>
              <option value="title-az">Sort by: Title: A to Z</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#9ca3af] dark:text-[#888b83] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid / List View Toggle Switcher */}
          <div className="flex items-center gap-1">
            {/* Grid Button */}
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-1.5 rounded-[2px] transition-all duration-150 flex items-center justify-center border cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-[#09110d] border-[#b89245] dark:border-[#d4b56a] text-[#b89245] dark:text-[#d4b56a] shadow-2xs"
                  : "bg-white dark:bg-[#09110d] text-[#9ca3af] dark:text-[#71717a] border-[#e5e7eb] dark:border-[#f2eee3]/15 hover:text-[#18181b] dark:hover:text-[#f2eee3] hover:border-[#d1d5db]"
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>

            {/* List Button */}
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-1.5 rounded-[2px] transition-all duration-150 flex items-center justify-center border cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-[#09110d] border-[#b89245] dark:border-[#d4b56a] text-[#b89245] dark:text-[#d4b56a] shadow-2xs"
                  : "bg-white dark:bg-[#09110d] text-[#9ca3af] dark:text-[#71717a] border-[#e5e7eb] dark:border-[#f2eee3]/15 hover:text-[#18181b] dark:hover:text-[#f2eee3] hover:border-[#d1d5db]"
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
