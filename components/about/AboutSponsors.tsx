"use client";

import React from "react";

export default function AboutSponsors() {
  const sponsors = [
    {
      name: "BOOKS",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor">
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
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor">
          <path d="M12 42 C20 38 28 38 32 40 C36 38 44 38 52 42 L52 20 C44 17 36 17 32 19 C28 17 20 17 12 20 Z" strokeWidth="1.8" />
          <line x1="32" y1="19" x2="32" y2="40" strokeWidth="1.8" />
          {/* Feather Quill */}
          <path d="M38 12 C44 14 48 22 42 30 L34 38" strokeWidth="1.5" />
        </svg>
      ),
      label: "BOOKCRAFT",
    },
    {
      name: "Word Basement.",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor">
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
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor">
          {/* Stylized P / Pelicon Logo */}
          <path d="M22 46 L22 18 C22 18 36 14 42 22 C48 30 40 38 26 36" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="33" cy="25" r="2.5" fill="currentColor" />
        </svg>
      ),
      label: "pelicon",
    },
    {
      name: "CLASSIC BOOKS",
      icon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor">
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
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" stroke="currentColor">
          <circle cx="32" cy="32" r="18" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M32 18 L24 40 L32 36 L40 40 Z" strokeWidth="1.8" />
          <line x1="32" y1="22" x2="32" y2="34" strokeWidth="1.5" />
        </svg>
      ),
      label: "WRITER'S GUILD",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#050807] border-b border-[#f2eee3]/10">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-[#f2eee3] tracking-tight mb-3">
            Sponsors & affiliates
          </h2>
          <p className="text-xs sm:text-sm text-[#888b83] font-sans">
            Lorem ipsum dolor sit amet conse ctetur adipiscing elit.
          </p>
        </div>

        {/* 6 Logos Row with subtle divider lines */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 lg:divide-x divide-[#f2eee3]/10 border-y border-[#f2eee3]/10 py-4">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="py-8 px-4 flex flex-col items-center justify-center text-center text-[#888b83] hover:text-[#d4b56a] group transition-all duration-300 cursor-pointer"
            >
              <div className="group-hover:scale-110 transition-transform duration-300 mb-3 opacity-75 group-hover:opacity-100">
                {sponsor.icon}
              </div>
              <span className="font-display text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold text-[#888b83] group-hover:text-[#f2eee3] transition-colors">
                {sponsor.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
