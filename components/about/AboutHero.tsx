"use client";

import React from "react";

export default function AboutHero() {
  return (
    <section className="relative w-full py-28 sm:py-36 md:py-44 overflow-hidden border-b border-[#b89245]/20 bg-[#050807]">
      {/* Background with Book Flatlay Pattern and Moody Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000 opacity-25 filter blur-[0.5px]"
          style={{
            backgroundImage: `url('/images/hero_sectin1.png'), url('/images/A_images.png')`,
            backgroundPosition: "center 40%",
          }}
        />
        {/* Editorial Vignette & Dark Forest Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050807]/90 via-[#07130e]/75 to-[#050807] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(24,82,56,0.18)_0%,rgba(5,8,7,0.95)_75%)] pointer-events-none" />
        
        {/* Subtle grid texture overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 181, 106, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
        {/* Gold Subtitle */}
        <div className="inline-flex items-center gap-3 mb-4 sm:mb-5">
          <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#d4b56a]" />
          <span className="text-[11px] sm:text-[13px] tracking-[0.32em] text-[#d4b56a] font-bold uppercase font-sans">
            ABOUT US
          </span>
          <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#d4b56a]" />
        </div>

        {/* Big Serif Heading matching reference */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#f2eee3] tracking-tight leading-[1.08] mb-6 sm:mb-8 max-w-3xl drop-shadow-lg">
          A Monthly Book Review
          <span className="block mt-1 sm:mt-2 text-[#f2eee3]/95">
            Publication
          </span>
        </h1>

        {/* Decorative Gold Filigree Ornament Divider */}
        <div className="flex items-center justify-center gap-3 text-[#d4b56a] opacity-90 my-2">
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#d4b56a] to-[#d4b56a]" />
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rotate-45 bg-[#d4b56a]" />
            <span className="w-2.5 h-2.5 rotate-45 border border-[#d4b56a] bg-[#050807] flex items-center justify-center">
              <span className="w-1 h-1 bg-[#d4b56a]" />
            </span>
            <span className="w-1 h-1 rotate-45 bg-[#d4b56a]" />
          </div>
          <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#d4b56a] to-[#d4b56a]" />
        </div>
      </div>
    </section>
  );
}
