"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

export default function AboutVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-[#040605] border-b border-[#f2eee3]/10 relative overflow-hidden">
      <div className="container-custom">
        <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          
          {/* Left Vertical Side Label */}
          <div className="hidden sm:flex flex-col items-center justify-center py-4 select-none">
            <span
              className="text-[11px] lg:text-[12px] tracking-[0.32em] text-[#888b83] font-bold uppercase whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              WATCH A REVIEW
            </span>
          </div>

          {/* Center Main Video Player Container */}
          <div className="flex-1 relative rounded-sm overflow-hidden border border-[#f2eee3]/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#09100c] group">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              
              {/* Direct YouTube Video Player */}
              <iframe
                className="w-full h-full absolute inset-0"
                src={`https://www.youtube-nocookie.com/embed/VDOcrXhYNbs?rel=0&modestbranding=1${
                  isPlaying ? "&autoplay=1" : ""
                }`}
                title="Book Review Interview - How to make a Deal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              {/* Bottom Terracotta/Burgundy Title Ribbon */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#b2483b] py-2.5 sm:py-3.5 px-6 text-center border-t border-white/20 shadow-lg z-10 pointer-events-none">
                <h3 className="font-display italic text-xl sm:text-2xl md:text-3xl text-white font-normal tracking-wide drop-shadow-md">
                  How to make a Deal
                </h3>
              </div>
            </div>
          </div>

          {/* Right Vertical Side Label */}
          <div className="hidden sm:flex flex-col items-center justify-center py-4 select-none">
            <span
              className="text-[11px] lg:text-[12px] tracking-[0.32em] text-[#888b83] font-bold uppercase whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              BY JOHN LITTLE
            </span>
          </div>

        </div>

        {/* Mobile vertical labels shown horizontally underneath for smaller screens */}
        <div className="sm:hidden flex items-center justify-between text-[10px] tracking-[0.24em] text-[#888b83] font-bold uppercase pt-4 px-2">
          <span>WATCH A REVIEW</span>
          <span>BY JOHN LITTLE</span>
        </div>
      </div>
    </section>
  );
}
