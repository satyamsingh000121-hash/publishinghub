"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PromoCards() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#050807] border-b border-[#f2eee3]/10">
      <div className="container-custom">
        {/* 12-Column Grid with generous height & spacious layout:
            Row 1: Card 1 (6 cols), Card 2 (3 cols), Card 3 (3 cols)
            Row 2: Card 4 (3 cols), Card 5 (6 cols), Card 6 (3 cols)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">

          {/* Card 1: Find Books For All Ages (WIDE - 6 Columns, Height 360px) */}
          <div className="lg:col-span-6 dark:bg-[#0b120f] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] overflow-hidden group shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs">
            {/* Left Floral "A" Monogram Image */}
            <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 relative flex-shrink-0 flex items-center justify-center">
              <img
                src="/images/A_images.png"
                alt="Find Books For All Ages"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Text Content */}
            <div className="flex-1 flex flex-col justify-between h-full space-y-3 sm:space-y-4 text-center sm:text-left">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#f2eee3] leading-[1.12] group-hover:text-[#d4b56a] transition-colors">
                  Find Books <br className="hidden sm:inline" />
                  <span className="italic font-normal text-[#d9d5ca]">For All Ages</span>
                </h3>
                <p className="text-[#9a9b94] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed font-light">
                  Explore a world of stories with our diverse book collection for all ages. From enchanting picture books for kids to engaging novels for teens and adults, we have something for every reader. Find the perfect book to inspire, educate, and entertain in our carefully curated selection.
                </p>
              </div>

              <div className="pt-2 sm:pt-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#d4b56a] group-hover:text-white transition-colors"
                >
                  CLICK HERE <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Summer Sale Spotlight (SQUARE - 3 Columns, Height 360px) */}
          <div className="lg:col-span-3 dark:bg-[#05140d] bg-[#f4ecfa] border dark:border-[#b89245]/40 border-[#d8b4fe] dark:hover:border-[#d4b56a] hover:border-[#9333ea] transition-all duration-300 p-4 sm:p-4 flex flex-col items-center justify-between text-center min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] overflow-hidden relative group shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs">
            {/* Emerald radial glow (Dark Mode Only) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(27,92,60,0.4),transparent_75%)] pointer-events-none dark:block hidden" />
            <div className="absolute inset-1.5 border dark:border-[#b89245]/20 border-purple-300/30 pointer-events-none" />

            {/* Top: SUMMER SALE */}
            <div className="relative z-10 pt-2">
              <span className="font-display text-2xl sm:text-3xl font-medium tracking-[0.18em] text-[#f2eee3] block uppercase leading-tight">
                SUMMER
              </span>
              <span className="font-display text-2xl sm:text-3xl font-medium tracking-[0.2em] text-[#f2eee3] block uppercase leading-tight">
                SALE
              </span>
            </div>

            {/* Center: 40% Image */}
            <div className="relative z-10 w-full max-w-[260px] sm:max-w-[320px] h-40 sm:h-56 flex items-center justify-center my-0 overflow-hidden">
              <img
                src="/images/40%25_images.png"
                alt="Up to 40% Off"
                className="w-full h-full object-contain filter drop-shadow-md scale-[1.3] sm:scale-[1.6] transition-transform duration-300 group-hover:scale-[1.65]"
              />
            </div>

            {/* Bottom: PURCHASE >> */}
            <div className="relative z-10 pb-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-xs font-bold tracking-[0.18em] uppercase text-[#f2eee3] group-hover:text-[#d4b56a] transition-colors"
              >
                PURCHASE &gt;&gt;
              </Link>
            </div>
          </div>

          {/* Card 3: Cook book of the month (SQUARE - 3 Columns, Height 360px) */}
          <div className="lg:col-span-3 dark:bg-[#0b120f] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] overflow-hidden group shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#f2eee3] leading-tight group-hover:text-[#d4b56a] transition-colors">
                  Cook book <br />
                  <span className="italic font-normal text-[#d4b56a]">of the month</span>
                </h3>
              </div>

              {/* Open cookbook photo mockup */}
              <div className="w-full flex justify-end">
                <div className="w-48 h-36 sm:w-72 sm:h-48 relative transform rotate-6 sm:rotate-8 group-hover:rotate-3 group-hover:scale-105 transition-all duration-300 flex items-center justify-center -mr-2 sm:-mr-6 overflow-hidden">
                  <img
                    src="/images/3_book.png"
                    alt="Cook book of the month"
                    className="w-full h-full object-contain filter dark:drop-shadow-2xl drop-shadow-[0_8px_16px_rgba(147,51,234,0.12)] scale-[1.2] sm:scale-[1.35]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 sm:pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-[#d4b56a] group-hover:text-white transition-colors"
              >
               PURCHASE <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 4: Feature book of the month (SQUARE - 3 Columns, Height 360px) */}
          <div className="lg:col-span-3 dark:bg-[#0b120f] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] overflow-hidden group relative shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs">
            {/* Top: Title & VIEW BOOK button */}
            <div className="space-y-3 sm:space-y-4 z-10">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#f2eee3] leading-tight group-hover:text-[#d4b56a] transition-colors">
                Feature book <br />
                <span className="italic font-normal text-[#d4b56a]">of the month</span>
              </h3>

              <div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-[#d4b56a] group-hover:text-white transition-colors"
                >
                  PURCHASE <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Bottom: Shelf positioned to the right (overflow contained) */}
            <div className="relative w-[calc(100%+3rem)] sm:w-[calc(100%+5rem)] -mx-6 sm:-mx-10 -mb-6 sm:-mb-10 mt-auto h-36 sm:h-52 flex items-end justify-end z-0 overflow-hidden">
              <img
                src="/images/books_4.png"
                alt="Feature book of the month"
                className="w-full h-full object-cover object-right-bottom scale-100 sm:scale-105 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 5: Henry & the good dog (WIDE - 6 Columns, Height 360px) */}
          <div className="lg:col-span-6 dark:bg-[#0b120f] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-6 sm:pl-10 lg:pl-12 sm:pr-3 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] overflow-hidden group shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs">
            {/* Left Title & Link */}
            <div className="flex-1 flex flex-col justify-between py-2 sm:py-10 lg:py-12 h-full space-y-4 sm:space-y-5 text-center sm:text-left">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#f2eee3] leading-[1.12] group-hover:text-[#d4b56a] transition-colors">
                  Henry <br className="hidden sm:inline" />
                  <span className="italic font-normal text-[#d4b56a]">&amp; the good dog</span>
                </h3>
                <p className="text-[#9a9b94] text-xs sm:text-sm mt-2 sm:mt-3 font-light leading-relaxed max-w-sm">
                  A heartwarming illustrated story of friendship, wonder, and loyalty. Explore the adventures in vivid full-color hardcover prints.
                </p>
              </div>

              <div className="pt-2 sm:pt-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#d4b56a] group-hover:text-white transition-colors"
                >
                  PURCHASE <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right: 3 Standing Illustrated Books Image */}
            <div className="w-full sm:w-[50%] lg:w-[52%] h-[240px] sm:h-[350px] lg:h-[370px] relative flex-shrink-0 flex items-center justify-center sm:justify-end overflow-visible">
              {/* Soft ambient lighting behind books (Dark Mode Only) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,181,106,0.10),transparent_65%)] pointer-events-none blur-lg dark:block hidden" />
              {/* Soft ground floor shadow (Dark Mode Only) */}
              <div className="absolute bottom-5 right-2 w-[85%] h-7 bg-black/70 blur-lg rounded-full pointer-events-none dark:block hidden" />

              <img
                src="/images/Gemini_Generated_Image_rj0p3rj0p3rj0p3r-Photoroom.png"
                alt="Henry & the good dog"
                className="relative z-10 w-full h-full object-contain object-center sm:object-right filter dark:drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] drop-shadow-[0_8px_16px_rgba(147,51,234,0.12)] scale-100 sm:scale-105 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 6: Best seller Books (SQUARE - 3 Columns, Height 360px) */}
          <div className="lg:col-span-3 dark:bg-[#0b120f] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#b89245]/50 hover:border-[#9333ea] transition-all duration-300 p-6 sm:p-10 flex flex-col justify-between min-h-[300px] sm:min-h-[350px] lg:min-h-[370px] overflow-hidden group relative shadow-xs hover:shadow-lg hover:shadow-purple-500/10 rounded-xs">
            {/* Top: Title */}
            <div className="relative z-10">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-[#f2eee3] leading-tight group-hover:text-[#d4b56a] transition-colors">
                Best seller <br />
                <span className="italic font-normal text-[#d4b56a]">Books</span>
              </h3>
            </div>

            {/* Center: Open Book Image - Full & Uncut */}
            <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4 z-0 pointer-events-none">
              <img
                src="/images/last_book.png"
                alt="Best seller Books"
                className="w-full h-full object-contain filter dark:drop-shadow-2xl drop-shadow-[0_8px_16px_rgba(147,51,234,0.12)] scale-[1.15] sm:scale-[1.35] transition-transform duration-300 group-hover:scale-[1.40]"
              />
            </div>

            {/* Bottom: Link */}
            <div className="relative z-10 pt-3 sm:pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.16em] uppercase text-[#d4b56a] group-hover:text-white transition-colors"
              >
                PURCHASE <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
