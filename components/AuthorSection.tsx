"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function AuthorSection() {
  return (
    <section className="py-14 sm:py-20 bg-[#070c09] border-b border-[#f2eee3]/10 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8 sm:gap-10 lg:gap-14">
          
          {/* Left Column: Awards & Info */}
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center text-center">
            <div>
              <span className="text-[10px] sm:text-xs tracking-[0.28em] text-[#d4b56a] font-bold uppercase block mb-2 sm:mb-3 text-center">
                IN AUGUST
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#f2eee3] leading-[1.08] sm:leading-[1.05] text-center">
                Best Author <br />
                <span className="italic font-normal text-[#d9d5ca]">of the Month</span>
              </h2>
            </div>

            {/* 3 Laurel Wreath Badges */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 pt-2 sm:pt-3 pb-1 sm:pb-2 max-w-full">
              <div className="w-20 sm:w-28 h-14 sm:h-20 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/sir1.png"
                  alt="Award 1"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="w-20 sm:w-28 h-14 sm:h-20 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/sir2.png"
                  alt="Award 2"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="w-20 sm:w-28 h-14 sm:h-20 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/sir3.png"
                  alt="Award 3"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-center w-full">
              <a
                href="#author"
                className="min-h-[44px] sm:min-h-[46px] px-7 sm:px-8 bg-[#2c7650] hover:bg-[#37865d] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 dark:shadow-black/40 shadow-[0_6px_18px_rgba(147,51,234,0.25)] rounded-sm"
              >
                VIEW AUTHOR <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Center Column: Author Portrait with Diagonal Striped Line Pattern Backdrop */}
          <div className="flex justify-center relative my-2 sm:my-0">
            {/* Diagonal Striped Line Pattern Backdrop */}
            <div
              className="absolute -top-4 -bottom-4 -right-4 sm:-right-10 w-36 sm:w-64 opacity-20 pointer-events-none rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(147, 51, 234, 0.35) 0px, rgba(147, 51, 234, 0.35) 1.5px, transparent 1.5px, transparent 10px)",
              }}
            />
            <div
              className="absolute -top-3 -bottom-3 -left-4 sm:-left-8 w-32 sm:w-48 opacity-15 pointer-events-none rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, rgba(147, 51, 234, 0.25) 0px, rgba(147, 51, 234, 0.25) 1.5px, transparent 1.5px, transparent 10px)",
              }}
            />

            <div className="relative w-56 sm:w-72 md:w-80 aspect-[4/5] rounded-sm overflow-hidden border dark:border-[#f2eee3]/15 border-[#e9e1f5] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] shadow-[0_12px_32px_rgba(147,51,234,0.14)] bg-gradient-to-b dark:from-[#182a20] dark:to-[#0b1410] from-white to-[#faf5ff] flex items-end justify-center z-10">
              <img
                src="/images/Gemini_Generated_Image_f41einf41einf41e.png"
                alt="#1 Best Seller"
                className="w-full h-full object-cover"
              />

              {/* Accent border inside frame */}
              <div className="absolute inset-2 border dark:border-[#d4b56a]/20 border-[#9333ea]/25 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Quote & Social Links */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            <blockquote className="font-display italic text-xl sm:text-2xl lg:text-3xl text-[#f2eee3] leading-snug font-normal max-w-md">
              &ldquo;My books are written from human soul of love, are crafted with a aim to help by publisher.&rdquo;
            </blockquote>

            <div className="pt-1 sm:pt-2">
              <span className="text-[11px] sm:text-[12px] tracking-[0.2em] font-bold text-[#d4b56a] uppercase block">
                SANTOSH KUMAR
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#9a9b94] tracking-wider uppercase block mt-0.5">
                Bestselling Author & Speaker
              </span>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-3 pt-1 sm:pt-2">
              {[
                { name: "Facebook", symbol: "f", href: "#" },
                { name: "Twitter", symbol: "𝕏", href: "#" },
                { name: "Instagram", symbol: "ig", href: "#" },
                { name: "LinkedIn", symbol: "in", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 rounded-full border dark:border-[#f2eee3]/20 border-[#e9e1f5] dark:hover:border-[#d4b56a] hover:border-[#9333ea] dark:hover:bg-[#d4b56a] hover:bg-[#9333ea] dark:text-[#d9d5ca] text-[#71717a] hover:text-white dark:hover:text-[#050807] flex items-center justify-center text-xs font-semibold transition-all duration-200 shadow-sm"
                  aria-label={social.name}
                >
                  {social.symbol}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
