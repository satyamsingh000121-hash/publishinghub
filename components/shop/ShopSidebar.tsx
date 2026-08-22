"use client";

import React, { useState } from "react";
import { Search, Minus, Plus, Check } from "lucide-react";

export interface FilterState {
  maxPrice: number;
  categories: string[];
  authors: string[];
  availability: string[];
  authorQuery: string;
}

interface ShopSidebarProps {
  filters: FilterState;
  tempFilters: FilterState;
  setTempFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  categoryCounts: Record<string, number>;
  authorCounts: Record<string, number>;
  availabilityCounts: Record<string, number>;
  onCloseMobile?: () => void;
}

export default function ShopSidebar({
  tempFilters,
  setTempFilters,
  onApplyFilters,
  onClearFilters,
  categoryCounts,
  authorCounts,
  availabilityCounts,
  onCloseMobile,
}: ShopSidebarProps) {
  // Collapsible section states
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isAuthorOpen, setIsAuthorOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);

  // Categories list matching reference
  const categoriesList = [
    { id: "Biography", label: "Biography", count: categoryCounts["Biography"] ?? 8 },
    { id: "Drama", label: "Drama", count: categoryCounts["Drama"] ?? 2 },
    { id: "For Kid", label: "For Kid", count: categoryCounts["For Kid"] ?? 10 },
    { id: "Romance", label: "Romance", count: categoryCounts["Romance"] ?? 3 },
  ];

  // Authors list matching reference
  const baseAuthorsList = [
    { id: "Savanna Walker", label: "Savanna Walker", count: authorCounts["Savanna Walker"] ?? 4 },
    { id: "Hof Nurgin", label: "Hof Nurgin", count: authorCounts["Hof Nurgin"] ?? 4 },
    { id: "Mesho Buvahr", label: "Mesho Buvahr", count: authorCounts["Mesho Buvahr"] ?? 5 },
    { id: "Oscar Oullière", label: "Oscar Oullière", count: authorCounts["Oscar Oullière"] ?? 2 },
    { id: "Bruce Sang", label: "Bruce Sang", count: authorCounts["Bruce Sang"] ?? 2 },
  ];

  // Filtered authors based on search input
  const filteredAuthors = baseAuthorsList.filter((author) =>
    author.label.toLowerCase().includes(tempFilters.authorQuery.toLowerCase())
  );

  // Availability options matching reference
  const availabilityList = [
    { id: "in-stock", label: "In Stock", count: availabilityCounts["in-stock"] ?? 20 },
    { id: "on-sale", label: "On Sale", count: availabilityCounts["on-sale"] ?? 6 },
    { id: "hot", label: "Hot", count: availabilityCounts["hot"] ?? 4 },
  ];

  const handleCategoryToggle = (cat: string) => {
    setTempFilters((prev) => {
      const exists = prev.categories.includes(cat);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat],
      };
    });
  };

  const handleAuthorToggle = (author: string) => {
    setTempFilters((prev) => {
      const exists = prev.authors.includes(author);
      return {
        ...prev,
        authors: exists
          ? prev.authors.filter((a) => a !== author)
          : [...prev.authors, author],
      };
    });
  };

  const handleAvailabilityToggle = (avail: string) => {
    setTempFilters((prev) => {
      const exists = prev.availability.includes(avail);
      return {
        ...prev,
        availability: exists
          ? prev.availability.filter((a) => a !== avail)
          : [...prev.availability, avail],
      };
    });
  };

  return (
    <aside className="w-full font-sans select-none">
      <div className="space-y-7">
        
        {/* ================= 1. PRICE SLIDER ================= */}
        <div className="pb-6 border-b border-[#e5e7eb] dark:border-[#27272a]/70">
          <button
            type="button"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
            className="w-full flex items-center justify-between py-1 group text-left"
          >
            <h3 className="font-display text-[19px] font-normal tracking-wide text-[#1c1917] dark:text-[#f2eee3]">
              Price
            </h3>
            <span className="text-[#a8a29e] dark:text-[#71717a] group-hover:text-[#18181b] dark:group-hover:text-[#f2eee3] transition-colors">
              {isPriceOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>

          {isPriceOpen && (
            <div className="mt-4 pt-1 space-y-3">
              {/* Range Slider Track */}
              <div className="relative flex items-center py-2">
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="1"
                  value={tempFilters.maxPrice}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer focus:outline-none accent-[#9333ea] dark:accent-[#b89245]"
                />
              </div>

              {/* Price Labels (£0, selected, £40) */}
              <div className="flex items-center justify-between text-xs text-[#78716c] dark:text-[#a1a1aa] font-medium pt-0.5">
                <span>£0</span>
                <span className="text-[#9333ea] dark:text-[#d4b56a] font-semibold text-xs">
                  £{tempFilters.maxPrice}
                </span>
                <span>£40</span>
              </div>
            </div>
          )}
        </div>

        {/* ================= 2. CATEGORY ================= */}
        <div className="pb-6 border-b border-[#e5e7eb] dark:border-[#27272a]/70">
          <button
            type="button"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full flex items-center justify-between py-1 group text-left"
          >
            <h3 className="font-display text-[19px] font-normal tracking-wide text-[#1c1917] dark:text-[#f2eee3]">
              Category
            </h3>
            <span className="text-[#a8a29e] dark:text-[#71717a] group-hover:text-[#18181b] dark:group-hover:text-[#f2eee3] transition-colors">
              {isCategoryOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>

          {isCategoryOpen && (
            <div className="mt-3.5 space-y-2.5">
              {categoriesList.map((cat) => {
                const isChecked = tempFilters.categories.includes(cat.id);
                return (
                  <label
                    key={cat.id}
                    className="flex items-center justify-between text-[13px] text-[#44403c] dark:text-[#d4d4d8] hover:text-[#1c1917] dark:hover:text-[#f4f4f5] cursor-pointer group py-0.5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        onClick={() => handleCategoryToggle(cat.id)}
                        className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#9333ea] border-[#9333ea] dark:bg-[#b89245] dark:border-[#b89245] text-white dark:text-[#050807]"
                            : "bg-white dark:bg-[#0d1410] border-[#d6d3d1] dark:border-[#3f3f46] group-hover:border-[#9333ea] dark:group-hover:border-[#b89245]/60"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3] text-white dark:text-[#050807]" />}
                      </div>
                      <span
                        onClick={() => handleCategoryToggle(cat.id)}
                        className={isChecked ? "font-medium text-[#1c1917] dark:text-[#ffffff]" : ""}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#a8a29e] dark:text-[#71717a] font-normal">
                      {cat.count}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= 3. AUTHOR ================= */}
        <div className="pb-6 border-b border-[#e5e7eb] dark:border-[#27272a]/70">
          <button
            type="button"
            onClick={() => setIsAuthorOpen(!isAuthorOpen)}
            className="w-full flex items-center justify-between py-1 group text-left"
          >
            <h3 className="font-display text-[19px] font-normal tracking-wide text-[#1c1917] dark:text-[#f2eee3]">
              Author
            </h3>
            <span className="text-[#a8a29e] dark:text-[#71717a] group-hover:text-[#18181b] dark:group-hover:text-[#f2eee3] transition-colors">
              {isAuthorOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>

          {isAuthorOpen && (
            <div className="mt-3.5 space-y-3">
              {/* Search Author Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search author..."
                  value={tempFilters.authorQuery}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      authorQuery: e.target.value,
                    }))
                  }
                  className="w-full text-xs py-2 pl-3 pr-8 border border-[#e5e7eb] dark:border-[#27272a] bg-[#fafaf9] dark:bg-[#0c1310] text-[#1c1917] dark:text-[#f4f4f5] placeholder-[#a8a29e] dark:placeholder-[#71717a] rounded-[2px] focus:outline-none focus:border-[#9333ea] dark:focus:border-[#c5a966] transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-[#a8a29e] dark:text-[#71717a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Author Checkboxes */}
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {filteredAuthors.length > 0 ? (
                  filteredAuthors.map((author) => {
                    const isChecked = tempFilters.authors.includes(author.id);
                    return (
                      <label
                        key={author.id}
                        className="flex items-center justify-between text-[13px] text-[#44403c] dark:text-[#d4d4d8] hover:text-[#1c1917] dark:hover:text-[#f4f4f5] cursor-pointer group py-0.5 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            onClick={() => handleAuthorToggle(author.id)}
                            className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                              isChecked
                                ? "bg-[#9333ea] border-[#9333ea] dark:bg-[#b89245] dark:border-[#b89245] text-white dark:text-[#050807]"
                                : "bg-white dark:bg-[#0d1410] border-[#d6d3d1] dark:border-[#3f3f46] group-hover:border-[#9333ea] dark:group-hover:border-[#b89245]/60"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3] text-white dark:text-[#050807]" />}
                          </div>
                          <span
                            onClick={() => handleAuthorToggle(author.id)}
                            className={isChecked ? "font-medium text-[#1c1917] dark:text-[#ffffff]" : ""}
                          >
                            {author.label}
                          </span>
                        </div>
                        <span className="text-[12px] text-[#a8a29e] dark:text-[#71717a] font-normal">
                          {author.count}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <p className="text-xs text-[#a8a29e] dark:text-[#71717a] italic py-1">
                    No authors found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ================= 4. AVAILABILITY ================= */}
        <div className="pb-6 border-b border-[#e5e7eb] dark:border-[#27272a]/70">
          <button
            type="button"
            onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
            className="w-full flex items-center justify-between py-1 group text-left"
          >
            <h3 className="font-display text-[19px] font-normal tracking-wide text-[#1c1917] dark:text-[#f2eee3]">
              Availability
            </h3>
            <span className="text-[#a8a29e] dark:text-[#71717a] group-hover:text-[#18181b] dark:group-hover:text-[#f2eee3] transition-colors">
              {isAvailabilityOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          </button>

          {isAvailabilityOpen && (
            <div className="mt-3.5 space-y-2.5">
              {availabilityList.map((avail) => {
                const isChecked = tempFilters.availability.includes(avail.id);
                return (
                  <label
                    key={avail.id}
                    className="flex items-center justify-between text-[13px] text-[#44403c] dark:text-[#d4d4d8] hover:text-[#1c1917] dark:hover:text-[#f4f4f5] cursor-pointer group py-0.5 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        onClick={() => handleAvailabilityToggle(avail.id)}
                        className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#9333ea] border-[#9333ea] dark:bg-[#b89245] dark:border-[#b89245] text-white dark:text-[#050807]"
                            : "bg-white dark:bg-[#0d1410] border-[#d6d3d1] dark:border-[#3f3f46] group-hover:border-[#9333ea] dark:group-hover:border-[#b89245]/60"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3] text-white dark:text-[#050807]" />}
                      </div>
                      <span
                        onClick={() => handleAvailabilityToggle(avail.id)}
                        className={isChecked ? "font-medium text-[#1c1917] dark:text-[#ffffff]" : ""}
                      >
                        {avail.label}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#a8a29e] dark:text-[#71717a] font-normal">
                      {avail.count}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= 5. ACTION BUTTONS ================= */}
        <div className="space-y-3 pt-1">
          {/* Apply Filters Theme Adaptive Button (Purple in light theme, forest green in dark theme) */}
          <button
            type="button"
            onClick={() => {
              onApplyFilters();
              onCloseMobile?.();
            }}
            className="w-full py-3.5 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#1e3527] dark:hover:bg-[#284936] text-white font-sans text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 shadow-md rounded-[2px] active:scale-[0.99] cursor-pointer"
          >
            APPLY FILTERS
          </button>

          {/* Clear All Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                onClearFilters();
                onCloseMobile?.();
              }}
              className="text-xs text-[#71717a] dark:text-[#a1a1aa] hover:text-[#9333ea] dark:hover:text-[#f4f4f5] underline underline-offset-4 transition-colors font-medium cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}
