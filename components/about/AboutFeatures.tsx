"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function AboutFeatures() {
  const features = [
    {
      badge: "TRENDING",
      title: "Book review",
      description:
        '"Visions to Victory" is an inspiring journey from dreams to triumph. The author beautifully captures the essence of perseverance, resilience, and strategic thinking, making it a compelling read for aspiring achievers.',
      linkText: "VIEW MORE",
      linkHref: "#",
      // Custom Gold Quill on Notepad SVG Icon
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-[#d4b56a]" fill="none" stroke="currentColor">
          <rect x="8" y="10" width="22" height="28" rx="2" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="18" x2="23" y2="18" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="24" x2="21" y2="24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="30" x2="19" y2="30" strokeWidth="1.5" strokeLinecap="round" />
          {/* Quill Pen */}
          <path
            d="M38 8 C36 12 30 22 25 32 L22 36 L25 33 C29 27 35 15 38 8 Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(212, 181, 106, 0.15)"
          />
          <path d="M22 36 L20 40 L24 38 Z" fill="currentColor" />
        </svg>
      ),
    },
    {
      badge: "FEATURED",
      title: "Top picks",
      description:
        "Discover the most inspiring stories of triumph and resilience, showcasing visionary leaders and their paths to success. Unlock the secrets to turning dreams into victorious realities.",
      linkText: "VIEW MORE",
      linkHref: "#",
      // Custom Gold Lightbulb / Inspiration SVG Icon
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-[#d4b56a]" fill="none" stroke="currentColor">
          {/* Rays */}
          <line x1="24" y1="4" x2="24" y2="8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10" y1="12" x2="13" y2="15" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="38" y1="12" x2="35" y2="15" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="24" x2="8" y2="24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="44" y1="24" x2="40" y2="24" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bulb Outline */}
          <path
            d="M16 20 C16 14.5 19.5 11 24 11 C28.5 11 32 14.5 32 20 C32 24 29 27 28 30 L20 30 C19 27 16 24 16 20 Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(212, 181, 106, 0.15)"
          />
          {/* Bulb Filament / Base */}
          <line x1="20" y1="34" x2="28" y2="34" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="22" y1="38" x2="26" y2="38" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 23 L24 18 L26 23" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      badge: "BOOKS",
      title: "This month",
      description:
        'Explore "Visions to Victory," a compelling journey of triumph, resilience, and transformation. Delve into inspiring stories that illuminate the path from challenges to success. Discover your own victory within!',
      linkText: "VIEW MORE",
      linkHref: "#",
      // Custom Gold Open Book SVG Icon
      icon: (
        <svg viewBox="0 0 48 48" className="w-10 h-10 text-[#d4b56a]" fill="none" stroke="currentColor">
          <path
            d="M24 38 C20 35 12 35 8 36 L8 14 C12 13 20 13 24 16 C28 13 36 13 40 14 L40 36 C36 35 28 35 24 38 Z"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="rgba(212, 181, 106, 0.15)"
          />
          <line x1="24" y1="16" x2="24" y2="38" strokeWidth="1.5" strokeLinecap="round" />
          {/* Page lines */}
          <line x1="12" y1="20" x2="20" y2="20" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="25" x2="19" y2="25" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="12" y1="30" x2="18" y2="30" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="28" y1="20" x2="36" y2="20" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="29" y1="25" x2="36" y2="25" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="30" y1="30" x2="36" y2="30" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-14 sm:py-24 dark:bg-[#050807] bg-[#faf7fd] border-b dark:border-[#f2eee3]/10 border-[#e9e1f5]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x dark:divide-[#f2eee3]/10 divide-[#e9e1f5] border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#070d0a]/60 bg-white backdrop-blur-sm rounded-xs shadow-xs overflow-hidden">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between group dark:hover:bg-[#0c1611]/80 hover:bg-[#faf5ff] transition-colors duration-300 relative"
            >
              <div className="space-y-4 sm:space-y-6">
                {/* Top Badge & Custom SVG Icon Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.22em] font-extrabold uppercase px-2.5 sm:px-3 py-1 dark:bg-[#123d2b] bg-[#f4ecfa] text-[#9333ea] dark:text-[#d4b56a] border dark:border-[#d4b56a]/30 border-[#e9d5ff] rounded-xs shadow-xs">
                    {item.badge}
                  </span>
                  
                  {/* Subtle Icon Glow Frame */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm dark:bg-[#0e1c14] bg-[#faf5ff] border dark:border-[#d4b56a]/20 border-[#e9d5ff] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium dark:text-[#f2eee3] text-[#18181b] group-hover:text-[#9333ea] dark:group-hover:text-[#d4b56a] transition-colors mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#71717a] dark:text-[#9a9b94] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom View More Link */}
              <div className="pt-6 sm:pt-10">
                <a
                  href={item.linkHref}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#9333ea] dark:text-[#d4b56a] group-hover:text-[#7e22ce] dark:group-hover:text-white transition-colors"
                >
                  {item.linkText} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
