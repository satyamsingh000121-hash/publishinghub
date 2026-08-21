"use client";

import React from "react";
import Link from "next/link";

interface ShopHeaderProps {
  totalResults?: number;
}

export default function ShopHeader({ totalResults = 27 }: ShopHeaderProps) {
  return (
    <div className="border-b border-[#f2eee3]/10 bg-[#050807] py-8 sm:py-12">
      <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Page Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#f2eee3] tracking-tight">
          Shop
        </h1>

        {/* Breadcrumb Navigation matching reference */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-[#888b83]">
          <Link
            href="/"
            className="hover:text-[#f2eee3] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#888b83]/60">/</span>
          <span className="text-[#d4b56a] font-medium">Shop</span>
        </nav>
      </div>
    </div>
  );
}
