"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ShopPaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export default function ShopPagination({
  currentPage = 1,
  totalPages = 2,
  onPageChange,
}: ShopPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="py-12 sm:py-16 flex items-center justify-center gap-3 select-none">
      {/* Page Number Buttons */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer ${
            currentPage === page
              ? "bg-[#9333ea] dark:bg-[#1e3527] text-white shadow-sm"
              : "text-[#78716c] dark:text-[#a1a1aa] hover:text-[#9333ea] dark:hover:text-white hover:bg-[#f5f3ff] dark:hover:bg-[#141b17]"
          }`}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase font-bold text-[#78716c] dark:text-[#a1a1aa] hover:text-[#9333ea] dark:hover:text-[#d4b56a] transition-colors ml-2 cursor-pointer"
        >
          <span>NEXT</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
