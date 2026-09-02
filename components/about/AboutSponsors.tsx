"use client";

import React from "react";

export default function AboutSponsors() {
  const sponsors = [
    {
      name: "BOOKS",
      icon: (
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor">
          <rect x="14" y="16" width="36" height="7" rx="1.5" strokeWidth="1.8" />
          <rect x="10" y="27" width="44" height="7" rx="1.5" strokeWidth="1.8" />
          <rect x="12" y="38" width="40" height="7" rx="1.5" strokeWidth="1.8" />
          <line x1="20" y1="16" x2="20" y2="23" strokeWidth="1.5" />
          <line x1="16" y1="27" x2="16" y2="34" strokeWidth="1.5" />
          <line x1="18" y1="38" x2="18" y2="45" strokeWidth="1.5" />
        </svg>
      ),
      label: "BOOKS",
    },
    {
      name: "BOOKCRAFT",
      icon: (
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor">
          <path d="M12 42 C20 38 28 38 32 40 C36 38 44 38 52 42 L52 20 C44 17 36 17 32 19 C28 17 20 17 12 20 Z" strokeWidth="1.8" />
          <line x1="32" y1="19" x2="32" y2="40" strokeWidth="1.8" />
          <path d="M38 12 C44 14 48 22 42 30 L34 38" strokeWidth="1.5" />
        </svg>
      ),
      label: "BOOKCRAFT",
    },
    {
      name: "Word Basement.",
      icon: (
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor">
          <rect x="14" y="18" width="36" height="28" rx="2" strokeWidth="1.8" />
          <line x1="20" y1="26" x2="34" y2="26" strokeWidth="1.8" />
          <line x1="20" y1="32" x2="30" y2="32" strokeWidth="1.8" />
          <line x1="20" y1="38" x2="26" y2="38" strokeWidth="1.8" />
        </svg>
      ),
      label: "Word Basement.",
    },
    {
      name: "pelicon",
      icon: (
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor">
          <path d="M22 46 L22 18 C22 18 36 14 42 22 C48 30 40 38 26 36" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="33" cy="25" r="2.5" fill="currentColor" />
        </svg>
      ),
      label: "pelicon",
    },
    {
      name: "CLASSIC BOOKS",
      icon: (
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor">
          <rect x="12" y="18" width="40" height="8" rx="1.5" strokeWidth="1.8" />
          <rect x="12" y="30" width="40" height="8" rx="1.5" strokeWidth="1.8" />
          <rect x="16" y="42" width="32" height="6" rx="1.5" strokeWidth="1.8" />
        </svg>
      ),
      label: "BOOKS",
    },
    {
      name: "WRITER'S GUILD",
      icon: (
        <svg viewBox="0 0 64 64" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor">
          <circle cx="32" cy="32" r="18" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M32 18 L24 40 L32 36 L40 40 Z" strokeWidth="1.8" />
          <line x1="32" y1="22" x2="32" y2="34" strokeWidth="1.5" />
        </svg>
      ),
      label: "WRITER'S GUILD",
    },
  ];

  // Repeat for continuous seamless looping
  const marqueeList = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-14 sm:py-24 dark:bg-[#050807] bg-white border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-medium dark:text-[#f2eee3] text-[#18181b] tracking-tight mb-2 sm:mb-3">
            Sponsors &amp; affiliates
          </h2>
          <p className="text-xs sm:text-sm dark:text-[#888b83] text-[#71717a] font-sans">
            Lorem ipsum dolor sit amet conse ctetur adipisicing elit,
          </p>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Marquee Container */}
      <div className="relative w-full border-y dark:border-[#f2eee3]/10 border-[#e9e1f5] py-10 sm:py-14 overflow-hidden dark:bg-[#060b08]/70 bg-[#faf7fd]">
        
        {/* Left & Right Fading Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-28 sm:w-48 bg-gradient-to-r dark:from-[#050807] dark:via-[#050807]/80 from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-28 sm:w-48 bg-gradient-to-l dark:from-[#050807] dark:via-[#050807]/80 from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track with CSS Animation */}
        <div className="marquee-track flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform">
          {marqueeList.map((item, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-44 h-40 sm:w-56 sm:h-48 md:w-60 md:h-52 flex flex-col items-center justify-center p-6 sm:p-8 dark:bg-[#0c140f] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] rounded-xs group dark:hover:border-[#d4b56a]/50 hover:border-[#9333ea] transition-all duration-300 dark:hover:bg-[#101b14] hover:bg-[#faf5ff] dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_8px_24px_rgba(147,51,234,0.12)] cursor-pointer"
            >
              {/* Scaled Icon */}
              <div className="text-[#888b83] dark:text-[#888b83] group-hover:text-[#9333ea] dark:group-hover:text-[#d4b56a] group-hover:scale-110 transition-all duration-300 mb-3 sm:mb-4 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Brand Label */}
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.24em] uppercase dark:text-[#f2eee3] text-[#18181b] group-hover:text-[#9333ea] dark:group-hover:text-[#d4b56a] transition-colors text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marqueeRightToLeft 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marqueeRightToLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
