"use client";

import React, { useState } from "react";
import { Play, X } from "lucide-react";

export default function AboutVideoSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
          <div className="flex-1 relative rounded-sm overflow-hidden border border-[#f2eee3]/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
            <div className="relative aspect-[16/9] w-full bg-[#09100c] overflow-hidden">
              {/* Video Thumbnail Image */}
              <img
                src="/images/about_interview_video.jpg"
                alt="Book Review Interview - How to make a Deal"
                onError={(e) => {
                  e.currentTarget.src = "/images/Gemini_Generated_Image_rj0p3rj0p3rj0p3r-Photoroom.png";
                }}
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Ambient Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />

              {/* Circular White Play Button with Glow */}
              <button
                onClick={() => setIsVideoOpen(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/95 text-[#050807] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)] group-hover:scale-110 group-hover:bg-white transition-all duration-300 z-20 cursor-pointer"
                aria-label="Play Video Review"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-[#050807] text-[#050807] translate-x-0.5" />
              </button>

              {/* Bottom Terracotta/Burgundy Title Ribbon */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#701e14] via-[#8c2619] to-[#701e14] py-3 sm:py-4 px-6 text-center border-t border-[#d4b56a]/30 shadow-lg z-10">
                <h3 className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[#f2eee3] font-normal tracking-wide drop-shadow-md">
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

      {/* Video Modal Player */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#09100c] border border-[#d4b56a]/40 rounded-sm overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f2eee3]/10 bg-[#050807]">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#d4b56a] font-bold uppercase block">
                  BOOK REVIEW SPOTLIGHT
                </span>
                <h4 className="font-display text-xl text-[#f2eee3] font-medium">
                  How to make a Deal — Interview by John Little
                </h4>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-[#121c16] hover:bg-[#1f3126] text-[#d9d5ca] hover:text-[#d4b56a] flex items-center justify-center transition-colors"
                aria-label="Close Video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Iframe / Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Book Review Video Interview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
