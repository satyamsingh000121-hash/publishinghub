"use client";

import React from "react";
import SmokyText from "@/components/SmokyText";

export default function AboutHero() {
  return (
    <section className="relative w-full py-28 sm:py-36 md:py-44 overflow-hidden border-b border-[#b89245]/20 bg-[#050807]">
      {/* Pure Luxury Dark Forest Green Background with Sunflower Engraving */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Deep Forest Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c09] via-[#08150f] to-[#040806]" />

        {/* Central Luminous Golden & Emerald Ambient Illumination */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(212,181,106,0.18)_0%,rgba(24,82,56,0.25)_45%,transparent_75%)] blur-3xl pointer-events-none" />

        {/* Soft Warm Ambient Light Highlights Left & Right */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#d4b56a]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#1e6144]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Botanical Sunflower Line Art Illustration Watermark (Centered / Offset) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] lg:w-[680px] lg:h-[680px] opacity-25 sm:opacity-35 pointer-events-none transform rotate-12 transition-transform duration-700">
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#d4b56a] fill-none stroke-current" strokeWidth="0.75">
            {/* Sunflower Center Disc */}
            <circle cx="100" cy="100" r="28" fill="#0d1f16" stroke="#d4b56a" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="20" stroke="#d4b56a" strokeWidth="0.75" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="12" stroke="#d4b56a" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="4" fill="#d4b56a" />

            {/* Sunflower Radiating Petals */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <path
                  key={i}
                  d="M100,72 C94,36 106,36 100,72"
                  transform={`rotate(${angle} 100 100)`}
                  fill="#d4b56a"
                  fillOpacity="0.12"
                  stroke="#d4b56a"
                  strokeWidth="0.8"
                />
              );
            })}
            
            {/* Stem and Emerald Leaves */}
            <path d="M100,128 Q95,170 85,200" stroke="#2c7650" strokeWidth="1.8" />
            <path d="M96,150 Q70,140 60,160 Q85,165 94,155" fill="#2c7650" fillOpacity="0.25" stroke="#2c7650" strokeWidth="1" />
            <path d="M90,175 Q115,165 125,185 Q100,190 88,180" fill="#2c7650" fillOpacity="0.25" stroke="#2c7650" strokeWidth="1" />
          </svg>
        </div>

        {/* Subtle Luxury Golden Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(212, 181, 106, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,8,7,0.8)_100%)] pointer-events-none" />
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

        {/* Big Serif Heading in 2 Lines matching reference */}
        <div className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#f2eee3] tracking-tight leading-[1.08] mb-6 sm:mb-8 max-w-3xl drop-shadow-lg flex flex-col items-center justify-center">
          <SmokyText
            text="A Monthly Book Review"
            color="#f2eee3"
            intensity={9}
            appearTrigger="default"
            position="bottomLeft"
            className="text-center"
            appearTransition={{ type: "tween", ease: "easeOut", duration: 1.6, delay: 0.05 }}
          />
          <div className="mt-1 sm:mt-2">
            <SmokyText
              text="Publication"
              color="#f2eee3"
              intensity={9}
              appearTrigger="default"
              position="bottomLeft"
              className="text-center"
              appearTransition={{ type: "tween", ease: "easeOut", duration: 1.6, delay: 0.2 }}
            />
          </div>
        </div>

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
