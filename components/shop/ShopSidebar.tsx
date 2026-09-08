"use client";

import React from "react";
import { Search, Check } from "lucide-react";

export interface FilterState {
  minPrice?: number;
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
  availableCategories?: string[];
  availableAuthors?: string[];
  maxPriceLimit?: number;
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
  availableCategories,
  availableAuthors,
  maxPriceLimit,
  onCloseMobile,
}: ShopSidebarProps) {
  const ceiling = maxPriceLimit && maxPriceLimit > 0 ? maxPriceLimit : 100;
  const currentMax = tempFilters.maxPrice ?? ceiling;

  const defaultCategories = [
    { id: "Poetry", label: "Poetry", count: categoryCounts["Poetry"] ?? 1 },
    { id: "Fiction", label: "Fiction", count: categoryCounts["Fiction"] ?? 8 },
    { id: "Romance", label: "Romance", count: categoryCounts["Romance"] ?? 2 },
    { id: "For Kid", label: "For Kid", count: categoryCounts["For Kid"] ?? 5 },
    { id: "Biography", label: "Biography", count: categoryCounts["Biography"] ?? 1 },
    { id: "Children's", label: "Children's", count: categoryCounts["Children's"] ?? 2 },
    { id: "Business", label: "Business", count: categoryCounts["Business"] ?? 1 },
    { id: "Drama", label: "Drama", count: categoryCounts["Drama"] ?? 1 },
    { id: "Non-fiction", label: "Non-fiction", count: categoryCounts["Non-fiction"] ?? 1 },
  ];

  const defaultAuthors = [
    { id: "CHAIAM-HOF NURGIN", label: "CHAIAM-HOF NURGIN", count: 2 },
    { id: "Dina Mayeri", label: "Dina Mayeri", count: 1 },
    { id: "BHUZUN NANHAM, HOF NURGIN", label: "BHUZUN NANHAM, HOF NURGIN", count: 1 },
    { id: "Sophie Collins", label: "Sophie Collins", count: 1 },
    { id: "Sero Guin, Shia Ung", label: "Sero Guin, Shia Ung", count: 1 },
    { id: "Hana Kim, Savanna Walker", label: "Hana Kim, Savanna Walker", count: 1 },
  ];

  const categoriesList =
    availableCategories && availableCategories.length > 0
      ? [
          ...defaultCategories.filter((dc) => !availableCategories.includes(dc.id)),
          ...availableCategories.map((c) => ({
            id: c,
            label: c,
            count: categoryCounts[c] ?? 1,
          })),
        ]
      : defaultCategories;

  const authorsList =
    availableAuthors && availableAuthors.length > 0
      ? [
          ...defaultAuthors.filter((da) => !availableAuthors.some((a) => a.toLowerCase() === da.id.toLowerCase())),
          ...availableAuthors.map((a) => ({
            id: a,
            label: a,
            count: authorCounts[a] ?? 1,
          })),
        ]
      : defaultAuthors;

  const filteredAuthors = authorsList.filter((author) =>
    author.label.toLowerCase().includes(tempFilters.authorQuery.toLowerCase())
  );

  const availabilityList = [
    { id: "in-stock", label: "In Stock", count: availabilityCounts["in-stock"] || 11 },
    { id: "on-sale", label: "On Sale", count: availabilityCounts["on-sale"] || 9 },
    { id: "hot", label: "Hot", count: availabilityCounts["hot"] || 2 },
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
    <aside className="w-full font-sans select-none dark:text-[#d9d5ca] text-[#374151] space-y-7">
      {/* ================= 1. FILTER BY PRICE ================= */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wide dark:text-[#f2eee3] text-[#18181b]">
          Filter by Price
        </h3>

        {/* Custom Range Slider with Gold Accent */}
        <div className="py-1">
          <input
            type="range"
            min="0"
            max={ceiling}
            step="1"
            value={currentMax}
            onChange={(e) =>
              setTempFilters((prev) => ({
                ...prev,
                maxPrice: Number(e.target.value),
              }))
            }
            className="w-full h-1.5 bg-[#e5e7eb] dark:bg-[#1a2620] rounded-lg appearance-none cursor-pointer focus:outline-none accent-[#b89245] dark:accent-[#d4b56a]"
            style={{
              accentColor: "#d4b56a",
            }}
          />
        </div>

        {/* Min/Max Text Indicators */}
        <div className="flex items-center justify-between text-[11px] dark:text-[#888b83] text-[#6b7280]">
          <span>£0</span>
          <span>£{ceiling}</span>
        </div>

        {/* Side-by-side Range Input Boxes: Clean in both Day and Night modes */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex-1 bg-white dark:bg-[#09110d] border border-[#e5e7eb] dark:border-[#f2eee3]/15 rounded-[2px] py-1.5 px-3 text-xs dark:text-[#f2eee3] text-[#18181b] font-medium shadow-2xs">
            £0
          </div>
          <div className="flex-1 bg-white dark:bg-[#09110d] border border-[#e5e7eb] dark:border-[#f2eee3]/15 rounded-[2px] py-1.5 px-3 text-xs dark:text-[#f2eee3] text-[#18181b] font-medium text-right shadow-2xs">
            £{currentMax}
          </div>
        </div>
      </div>

      {/* ================= 2. CATEGORY ================= */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold tracking-wide dark:text-[#f2eee3] text-[#18181b]">
          Category
        </h3>

        <div className="space-y-2">
          {categoriesList.map((cat) => {
            const isChecked = tempFilters.categories.includes(cat.id);
            return (
              <label
                key={cat.id}
                onClick={() => handleCategoryToggle(cat.id)}
                className="flex items-center justify-between text-xs dark:text-[#a1a1aa] text-[#4b5563] dark:hover:text-[#f2eee3] hover:text-[#18181b] cursor-pointer group py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#d4b56a] border-[#d4b56a] text-[#050807]"
                        : "bg-white dark:bg-[#09110d] border-[#d1d5db] dark:border-[#f2eee3]/20 group-hover:border-[#b89245] dark:group-hover:border-[#d4b56a]"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3] text-[#050807]" />}
                  </div>
                  <span className={isChecked ? "dark:text-[#f2eee3] text-[#18181b] font-medium" : ""}>
                    {cat.label}
                  </span>
                </div>
                <span className="text-[11px] dark:text-[#71717a] text-[#9ca3af] font-normal">
                  {cat.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ================= 3. AUTHOR ================= */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold tracking-wide dark:text-[#f2eee3] text-[#18181b]">
          Author
        </h3>

        {/* Search Author with Magnifier Icon inside */}
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
            className="w-full text-xs py-2 pl-3 pr-8 border border-[#e5e7eb] dark:border-[#f2eee3]/15 bg-white dark:bg-[#09110d] text-[#18181b] dark:text-[#f2eee3] placeholder-[#9ca3af] dark:placeholder-[#71717a] rounded-[2px] focus:outline-none focus:border-[#b89245] dark:focus:border-[#d4b56a] transition-colors shadow-2xs"
          />
          <Search className="w-3.5 h-3.5 text-[#9ca3af] dark:text-[#71717a] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Author Checkboxes */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {filteredAuthors.map((author) => {
            const isChecked = tempFilters.authors.includes(author.id);
            return (
              <label
                key={author.id}
                onClick={() => handleAuthorToggle(author.id)}
                className="flex items-center justify-between text-xs dark:text-[#a1a1aa] text-[#4b5563] dark:hover:text-[#f2eee3] hover:text-[#18181b] cursor-pointer group py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#d4b56a] border-[#d4b56a] text-[#050807]"
                        : "bg-white dark:bg-[#09110d] border-[#d1d5db] dark:border-[#f2eee3]/20 group-hover:border-[#b89245] dark:group-hover:border-[#d4b56a]"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3] text-[#050807]" />}
                  </div>
                  <span className={isChecked ? "dark:text-[#f2eee3] text-[#18181b] font-medium" : ""}>
                    {author.label}
                  </span>
                </div>
                <span className="text-[11px] dark:text-[#71717a] text-[#9ca3af] font-normal">
                  {author.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ================= 4. AVAILABILITY ================= */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold tracking-wide dark:text-[#f2eee3] text-[#18181b]">
          Availability
        </h3>

        <div className="space-y-2">
          {availabilityList.map((avail) => {
            const isChecked = tempFilters.availability.includes(avail.id);
            return (
              <label
                key={avail.id}
                onClick={() => handleAvailabilityToggle(avail.id)}
                className="flex items-center justify-between text-xs dark:text-[#a1a1aa] text-[#4b5563] dark:hover:text-[#f2eee3] hover:text-[#18181b] cursor-pointer group py-0.5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-[2px] border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#d4b56a] border-[#d4b56a] text-[#050807]"
                        : "bg-white dark:bg-[#09110d] border-[#d1d5db] dark:border-[#f2eee3]/20 group-hover:border-[#b89245] dark:group-hover:border-[#d4b56a]"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3] text-[#050807]" />}
                  </div>
                  <span className={isChecked ? "dark:text-[#f2eee3] text-[#18181b] font-medium" : ""}>
                    {avail.label}
                  </span>
                </div>
                <span className="text-[11px] dark:text-[#71717a] text-[#9ca3af] font-normal">
                  {avail.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ================= 5. ACTION BUTTONS ================= */}
      <div className="space-y-2.5 pt-2">
        {/* APPLY FILTERS: Dark button with Gold Border in Dark Mode, Sleek Dark/Gold in Light Mode */}
        <button
          type="button"
          onClick={() => {
            onApplyFilters();
            onCloseMobile?.();
          }}
          className="w-full py-3 bg-[#18181b] hover:bg-[#b89245] text-white dark:bg-[#080d0a] dark:hover:bg-[#d4b56a] dark:hover:text-[#050807] border border-[#18181b] hover:border-[#b89245] dark:border-[#d4b56a] dark:text-[#d4b56a] font-sans text-xs font-bold tracking-[0.18em] uppercase transition-all duration-200 rounded-[2px] active:scale-[0.99] cursor-pointer shadow-sm"
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
            className="text-xs text-[#71717a] hover:text-[#b89245] dark:text-[#d4b56a]/80 dark:hover:text-[#d4b56a] underline underline-offset-4 transition-colors font-normal cursor-pointer"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* ================= 6. BOTTOM SIDEBAR ILLUSTRATION ("Read More Books") ================= */}
      <div className="pt-6 relative select-none">
        <div className="relative rounded-lg overflow-hidden border border-[#e5e7eb] dark:border-[#f2eee3]/10 bg-white dark:bg-[#080d0a] p-3 flex flex-col items-center shadow-xs">
          {/* Books and botanical illustration */}
          <div className="relative w-full aspect-square rounded overflow-hidden">
            <img
              src="/api/shop-sidebar-image"
              alt="Read More Books"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/shop_sidebar_books.jpg";
              }}
              className="w-full h-full object-cover opacity-85 hover:opacity-95 transition-opacity duration-300"
            />
            {/* Script Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-2">
              <p
                className="font-serif italic text-xl sm:text-2xl text-[#d4b56a] text-center leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Read<br />More<br />Books
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
