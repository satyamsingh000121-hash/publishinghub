"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function AuthorSection() {
  return (
    <section className="py-20 bg-[#070c09] border-b border-[#f2eee3]/10 overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 lg:gap-14">
          
          {/* Left Column: Awards & Info */}
          <div className="space-y-6 flex flex-col items-center text-center">
            <div>
              <span className="text-[11px] sm:text-xs tracking-[0.28em] text-[#d4b56a] font-bold uppercase block mb-3 text-center">
                IN AUGUST
              </span>
              <h2 className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-[#f2eee3] leading-[1.05] text-center">
                Best Author <br />
                <span className="italic font-normal text-[#d9d5ca]">of the Month</span>
              </h2>
            </div>

            {/* 3 Laurel Wreath Badges from Images */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 pt-3 pb-2">
              <div className="w-24 sm:w-28 h-16 sm:h-20 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/sir1.png"
                  alt="Award 1"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="w-24 sm:w-28 h-16 sm:h-20 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/sir2.png"
                  alt="Award 2"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div className="w-24 sm:w-28 h-16 sm:h-20 flex items-center justify-center group hover:scale-105 transition-transform duration-300">
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
                className="min-h-[46px] px-8 bg-[#2c7650] hover:bg-[#37865d] text-white text-[11px] font-bold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-black/40"
              >
                VIEW AUTHOR <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Center Column: Author Portrait with Diagonal Striped Line Pattern Backdrop */}
          <div className="flex justify-center relative">
            {/* Diagonal Striped Line Pattern Backdrop (Right Side & Behind) */}
            <div
              className="absolute -top-6 -bottom-6 -right-6 sm:-right-10 w-48 sm:w-64 opacity-20 pointer-events-none rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(212, 181, 106, 0.45) 0px, rgba(212, 181, 106, 0.45) 1.5px, transparent 1.5px, transparent 10px)",
              }}
            />
            {/* Diagonal Striped Line Pattern Backdrop (Left Side) */}
            <div
              className="absolute -top-4 -bottom-4 -left-6 sm:-left-8 w-40 sm:w-48 opacity-15 pointer-events-none rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, rgba(242, 238, 227, 0.35) 0px, rgba(242, 238, 227, 0.35) 1.5px, transparent 1.5px, transparent 10px)",
              }}
            />

            <div className="relative w-64 sm:w-72 md:w-80 aspect-[4/5] rounded-sm overflow-hidden border border-[#f2eee3]/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-gradient-to-b from-[#182a20] to-[#0b1410] flex items-end justify-center z-10">
              <img
                src="/images/Gemini_Generated_Image_f41einf41einf41e.png"
                alt="#1 Best Seller"
                className="w-full h-full object-cover"
              />

              {/* Gold border accent inside frame */}
              <div className="absolute inset-2 border border-[#d4b56a]/20 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Quote & Social Links */}
          <div className="space-y-6">
            <blockquote className="font-display italic text-2xl sm:text-3xl text-[#f2eee3] leading-snug font-normal">
              &ldquo;My books are written from human soul of love, are crafted with a aim to help by publisher.&rdquo;
            </blockquote>

            <div className="pt-2">
              <span className="text-[12px] tracking-[0.2em] font-bold text-[#d4b56a] uppercase block">
                SANTOSH KUMAR
              </span>
              <span className="text-[10px] text-[#9a9b94] tracking-wider uppercase block mt-0.5">
                Bestselling Author & Speaker
              </span>
            </div>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: "Facebook", symbol: "f", href: "#" },
                { name: "Twitter", symbol: "𝕏", href: "#" },
                { name: "Instagram", symbol: "ig", href: "#" },
                { name: "LinkedIn", symbol: "in", href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-8 h-8 rounded-full border border-[#f2eee3]/20 hover:border-[#d4b56a] hover:bg-[#d4b56a] text-[#d9d5ca] hover:text-[#050807] flex items-center justify-center text-xs font-semibold transition-all duration-200"
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
