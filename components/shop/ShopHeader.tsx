"use client";

import React from "react";
import Link from "next/link";

interface ShopHeaderProps {
  totalResults?: number;
}

export default function ShopHeader({ totalResults = 22 }: ShopHeaderProps) {
  return (
    <div className="border-b dark:border-[#f2eee3]/10 border-[#e5e7eb] dark:bg-[#050807] bg-[#fbfaf8] py-8 sm:py-12 transition-colors duration-200">
      <div className="container-custom flex items-center justify-between gap-4">
        {/* Left Side: Page Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal dark:text-[#f2eee3] text-[#18181b] tracking-tight leading-none">
          Shop
        </h1>

        {/* Right Side: Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm dark:text-[#888b83] text-[#71717a]">
          <Link
            href="/"
            className="dark:hover:text-[#f2eee3] hover:text-[#18181b] transition-colors"
          >
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="dark:text-[#d4b56a] text-[#b89245] font-medium">Shop</span>
        </nav>
      </div>
    </div>
  );
}
