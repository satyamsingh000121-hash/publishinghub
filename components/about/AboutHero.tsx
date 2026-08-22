"use client";

import React from "react";
import SmokyText from "@/components/SmokyText";

export default function AboutHero() {
  return (
    <section className="relative w-full py-16 sm:py-28 md:py-36 overflow-hidden border-b dark:border-[#b89245]/20 border-[#e9e1f5] dark:bg-none dark:bg-[#050807] bg-gradient-to-b from-[#f6f0fd] via-[#fbf8fe] to-[#ffffff]">
      {/* Background with Sunflower Engraving */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Deep Forest Gradient Base (Dark Mode Only) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c09] via-[#08150f] to-[#040806] dark:block hidden" />

        {/* Central Luminous Ambient Illumination (Dark Mode Only) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] md:w-[950px] h-[350px] sm:h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(212,181,106,0.18)_0%,rgba(24,82,56,0.25)_45%,transparent_70%)] blur-3xl pointer-events-none dark:block hidden" />

        {/* Soft Ambient Glow (Light Mode Only) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[300px] sm:h-[400px] bg-purple-400/15 blur-3xl pointer-events-none dark:hidden block" />

        {/* Botanical Sunflower Line Art Illustration Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] lg:w-[680px] lg:h-[680px] opacity-15 sm:opacity-25 pointer-events-none transform rotate-12 transition-transform duration-700">
          <svg viewBox="0 0 200 200" className="w-full h-full dark:text-[#d4b56a] text-[#9333ea]/40 fill-none stroke-current" strokeWidth="0.75">
            {/* Sunflower Center Disc */}
            <circle cx="100" cy="100" r="28" className="dark:fill-[#0d1f16] fill-white" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="12" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="4" fill="currentColor" />

            {/* Sunflower Radiating Petals */}
            {[...Array(24)].map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <path
                  key={i}
                  d="M100,72 C94,36 106,36 100,72"
                  transform={`rotate(${angle} 100 100)`}
                  fill="currentColor"
                  fillOpacity="0.12"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
              );
            })}
            
            {/* Stem and Leaves */}
            <path d="M100,128 Q95,170 85,200" className="dark:stroke-[#2c7650] stroke-[#9333ea]/40" strokeWidth="1.8" />
            <path d="M96,150 Q70,140 60,160 Q85,165 94,155" className="dark:fill-[#2c7650] fill-[#c084fc]" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
            <path d="M90,175 Q115,165 125,185 Q100,190 88,180" className="dark:fill-[#2c7650] fill-[#c084fc]" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Subtle Luxury Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(147, 51, 234, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Vignette (Dark Mode Only) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,8,7,0.8)_100%)] pointer-events-none dark:block hidden" />
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10 text-center flex flex-col items-center justify-center max-w-4xl mx-auto px-4">
        {/* Subtitle */}
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
          <span className="h-[1px] w-4 sm:w-10 bg-gradient-to-r from-transparent to-[#d4b56a]" />
          <span className="text-[10px] sm:text-[13px] tracking-[0.28em] sm:tracking-[0.32em] text-[#d4b56a] font-bold uppercase font-sans">
            ABOUT US
          </span>
          <span className="h-[1px] w-4 sm:w-10 bg-gradient-to-l from-transparent to-[#d4b56a]" />
        </div>

        {/* Big Serif Heading in 2 Lines */}
        <div className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-[#f2eee3] tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-8 max-w-3xl drop-shadow-xs flex flex-col items-center justify-center">
          <SmokyText
            text="A Monthly Book Review"
            color="var(--cream)"
            intensity={9}
            appearTrigger="default"
            position="bottomLeft"
            className="text-center"
            appearTransition={{ type: "tween", ease: "easeOut", duration: 1.6, delay: 0.05 }}
          />
          <div className="mt-1 sm:mt-2">
            <SmokyText
              text="Publication"
              color="var(--cream)"
              intensity={9}
              appearTrigger="default"
              position="bottomLeft"
              className="text-center"
              appearTransition={{ type: "tween", ease: "easeOut", duration: 1.6, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Gold Filigree Center Ornament */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[#d4b56a] opacity-90">
          <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-r from-transparent via-[#d4b56a] to-[#d4b56a]" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b56a]" />
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rotate-45 border border-[#d4b56a] dark:bg-[#050807] bg-white flex items-center justify-center">
              <span className="w-0.5 sm:w-1 h-0.5 sm:h-1 bg-[#d4b56a]" />
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-[#d4b56a]" />
          </div>
          <span className="h-[1px] w-8 sm:w-20 bg-gradient-to-l from-transparent via-[#d4b56a] to-[#d4b56a]" />
        </div>
      </div>
    </section>
  );
}
