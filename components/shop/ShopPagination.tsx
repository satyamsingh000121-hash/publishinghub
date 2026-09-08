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
          className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer ${
            currentPage === page
              ? "bg-[#d4b56a] text-[#050807] shadow-sm font-bold"
              : "text-[#6b7280] dark:text-[#888b83] hover:text-[#18181b] dark:hover:text-[#f2eee3] hover:bg-[#f3f4f6] dark:hover:bg-[#0e1612]"
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
          className="inline-flex items-center gap-1 text-[11px] tracking-[0.14em] uppercase font-semibold text-[#6b7280] dark:text-[#888b83] hover:text-[#b89245] dark:hover:text-[#d4b56a] transition-colors ml-2 cursor-pointer"
        >
          <span>NEXT</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
        </button>
      )}
    </div>
  );
}
