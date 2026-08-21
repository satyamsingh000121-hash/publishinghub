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
  return (
    <div className="py-12 sm:py-16 flex items-center justify-center gap-3 select-none">
      {/* Page 1 Button */}
      <button
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-200 ${
          currentPage === 1
            ? "dark:bg-[#185238] bg-[#9333ea] text-white dark:border-[#2c7650] border-[#9333ea] shadow-md"
            : "dark:text-[#888b83] text-[#71717a] dark:hover:text-[#f2eee3] hover:text-[#18181b] dark:hover:bg-[#0e1913] hover:bg-[#f5f3ff]"
        }`}
        aria-label="Page 1"
      >
        1
      </button>

      {/* Page 2 Button */}
      <button
        onClick={() => onPageChange(2)}
        className={`w-8 h-8 rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-200 ${
          currentPage === 2
            ? "dark:bg-[#185238] bg-[#9333ea] text-white dark:border-[#2c7650] border-[#9333ea] shadow-md"
            : "dark:text-[#888b83] text-[#71717a] dark:hover:text-[#f2eee3] hover:text-[#18181b] dark:hover:bg-[#0e1913] hover:bg-[#f5f3ff]"
        }`}
        aria-label="Page 2"
      >
        2
      </button>

      {/* Next Button matching reference */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase font-bold dark:text-[#888b83] text-[#71717a] dark:hover:text-[#d4b56a] hover:text-[#9333ea] disabled:opacity-40 disabled:pointer-events-none transition-colors ml-2"
      >
        <ArrowRight className="w-3.5 h-3.5" />
        <span>NEXT</span>
      </button>
    </div>
  );
}
