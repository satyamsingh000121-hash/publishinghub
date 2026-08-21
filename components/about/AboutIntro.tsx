"use client";

import React from "react";
import RotatingLogo from "@/components/RotatingLogo";

export default function AboutIntro() {
  return (
    <section className="py-20 sm:py-28 bg-[#060a08] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#185238]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#b89245]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-5xl mx-auto">
          
          {/* Left: 3D Rotating Logo Emblem (Enlarged) */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <RotatingLogo size={380} className="w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 lg:w-[380px] lg:h-[380px]" />
          </div>

          {/* Right: Editorial Quote Statement (Enlarged) */}
          <div className="flex-1 text-center lg:text-left max-w-3xl px-2">
            <blockquote className="font-display italic text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[46px] font-normal text-[#f2eee3] leading-[1.26] tracking-tight mb-8">
              &ldquo;The publishing hub is a monthly book review publication distributed to 400,000 avid readers through subscribing bookstores and public libraries&rdquo;
            </blockquote>

            {/* Decorative Gold Filigree Divider (Extended Length & Spacing) */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#d4b56a] opacity-95 pt-4 sm:pt-6">
              <span className="h-[1.5px] w-32 sm:w-48 md:w-60 lg:w-72 bg-gradient-to-r from-transparent via-[#d4b56a] to-[#d4b56a]" />
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b56a]" />
                <span className="w-3 h-3 rotate-45 border border-[#d4b56a] bg-[#060a08] flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#d4b56a]" />
                </span>
                <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b56a]" />
              </div>
              <span className="h-[1.5px] w-32 sm:w-48 md:w-60 lg:w-72 bg-gradient-to-l from-transparent via-[#d4b56a] to-[#d4b56a]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
