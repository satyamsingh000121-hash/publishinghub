"use client";

import React from "react";
import RotatingLogo from "@/components/RotatingLogo";

export default function AboutIntro() {
  return (
    <section className="py-14 sm:py-24 dark:bg-[#060a08] bg-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#185238]/10 rounded-full blur-3xl pointer-events-none dark:block hidden" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#b89245]/5 rounded-full blur-3xl pointer-events-none dark:block hidden" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-16 max-w-5xl mx-auto">
          
          {/* Left: 3D Rotating Logo Emblem */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <RotatingLogo size={380} className="w-52 h-52 sm:w-72 sm:h-72 md:w-84 md:h-84 lg:w-[380px] lg:h-[380px]" />
          </div>

          {/* Right: Editorial Quote Statement */}
          <div className="flex-1 text-center lg:text-left max-w-3xl px-2">
            <blockquote className="font-display italic text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-normal dark:text-[#f2eee3] text-[#18181b] leading-[1.28] tracking-tight mb-6 sm:mb-8">
              &ldquo;The publishing hub is a monthly book review publication distributed to 400,000 avid readers through subscribing bookstores and public libraries&rdquo;
            </blockquote>

            {/* Decorative Gold/Purple Filigree Divider */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[#d4b56a] opacity-95 pt-2 sm:pt-6">
              <span className="h-[1.5px] w-12 sm:w-32 md:w-48 lg:w-72 bg-gradient-to-r from-transparent via-[#d4b56a] to-[#d4b56a]" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b56a]" />
                <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rotate-45 border border-[#d4b56a] dark:bg-[#060a08] bg-white flex items-center justify-center">
                  <span className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#d4b56a]" />
                </span>
                <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b56a]" />
              </div>
              <span className="h-[1.5px] w-12 sm:w-32 md:w-48 lg:w-72 bg-gradient-to-l from-transparent via-[#d4b56a] to-[#d4b56a]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
