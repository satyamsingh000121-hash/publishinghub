"use client";

import React from "react";
import Link from "next/link";

export default function ContactHeader() {
  return (
    <div className="border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-none dark:bg-[#050807] bg-gradient-to-b from-[#f6f0fd] to-[#ffffff] py-8 sm:py-12 transition-colors duration-300">
      <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Page Title */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal dark:text-[#f2eee3] text-[#18181b] tracking-tight">
          Contact Us
        </h1>

        {/* Breadcrumb Navigation matching reference */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm dark:text-[#888b83] text-[#71717a]">
          <Link
            href="/"
            className="dark:hover:text-[#f2eee3] hover:text-[#18181b] transition-colors"
          >
            Home
          </Link>
          <span className="opacity-50">/</span>
          <span className="dark:text-[#d4b56a] text-[#9333ea] font-medium">Contact Us</span>
        </nav>
      </div>
    </div>
  );
}
