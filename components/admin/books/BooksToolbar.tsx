"use client";

import React from "react";
import { Search, Filter, RotateCcw } from "lucide-react";

interface BooksToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedAuthor: string;
  onAuthorChange: (val: string) => void;
  selectedStatus: string;
  onStatusChange: (val: string) => void;
  categories: string[];
  authors: string[];
  onReset: () => void;
  totalFiltered: number;
}

export default function BooksToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedAuthor,
  onAuthorChange,
  selectedStatus,
  onStatusChange,
  categories,
  authors,
  onReset,
  totalFiltered,
}: BooksToolbarProps) {
  const isFiltered = Boolean(
    searchQuery || selectedCategory || selectedAuthor || selectedStatus
  );

  return (
    <div className="admin-card rounded-2xl p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-3 sm:space-y-0 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Search input */}
        <div className="relative flex-1 min-w-0 max-w-md">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by book title, author..."
            className="w-full pl-9 pr-4 py-2 admin-input-bg rounded-xl text-xs sm:text-[13px] placeholder-[#94A3B8] focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
        </div>

        {/* Right: Dropdowns and Filter Action */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by Category"
            className="px-3 py-2 admin-input-bg rounded-xl text-xs font-medium cursor-pointer focus:outline-none focus:border-[#8B5CF6] transition-colors max-w-[140px] truncate"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Author Filter */}
          <select
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            aria-label="Filter by Author"
            className="px-3 py-2 admin-input-bg rounded-xl text-xs font-medium cursor-pointer focus:outline-none focus:border-[#8B5CF6] transition-colors max-w-[140px] truncate"
          >
            <option value="">All Authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter by Status"
            className="px-3 py-2 admin-input-bg rounded-xl text-xs font-medium cursor-pointer focus:outline-none focus:border-[#8B5CF6] transition-colors"
          >
            <option value="">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="featured">Featured</option>
          </select>

          {/* Reset Button (visible when filters are active) */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8B5CF6] dark:text-[#C4B5FD] admin-pill-bg rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
