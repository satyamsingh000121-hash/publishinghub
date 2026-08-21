"use client";

import React from "react";

export default function AboutIntro() {
  return (
    <section className="py-20 sm:py-28 bg-[#060a08] border-b border-[#f2eee3]/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#185238]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#b89245]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-5xl mx-auto">
          
          {/* Left: Vintage Gold Circular Feather Quill Seal / Medallion */}
          <div className="flex-shrink-0 relative group">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#0c1611] to-[#040705] p-3 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(212,181,106,0.2)] border border-[#d4b56a]/40 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              
              {/* Circular Decorative SVG with Curved Text & Central Feather */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  {/* Circular Path for Text Around */}
                  <path
                    id="circleTextPath"
                    d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                  />
                  {/* Feather Gold Gradient */}
                  <linearGradient id="goldFeather" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7e4a8" />
                    <stop offset="50%" stopColor="#d4b56a" />
                    <stop offset="100%" stopColor="#8c6a28" />
                  </linearGradient>
                  {/* Subtle Glow Filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Outer Delicate Gold Rings */}
                <circle cx="100" cy="100" r="92" fill="none" stroke="#d4b56a" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="86" fill="none" stroke="#d4b56a" strokeWidth="1.5" strokeOpacity="0.8" />
                <circle cx="100" cy="100" r="58" fill="none" stroke="#d4b56a" strokeWidth="1" strokeOpacity="0.5" />

                {/* Rotating / Static Curved Gold Text */}
                <text className="text-[9.5px] font-display uppercase tracking-[0.24em] fill-[#e6c880] font-semibold">
                  <textPath href="#circleTextPath" startOffset="50%" textAnchor="middle">
                    • A MONTHLY • BOOK REVIEW •
                  </textPath>
                </text>

                {/* Center Feather Quill Icon */}
                <g transform="translate(100, 100) rotate(-35) translate(-100, -100)" filter="url(#glow)">
                  {/* Quill Shaft */}
                  <path
                    d="M 85,160 Q 100,105 110,40"
                    fill="none"
                    stroke="url(#goldFeather)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Quill Vane Left */}
                  <path
                    d="M 110,40 C 100,60 88,85 86,110 C 85,125 90,140 92,150 C 94,135 100,110 106,85 Z"
                    fill="url(#goldFeather)"
                    opacity="0.85"
                  />
                  {/* Quill Vane Right */}
                  <path
                    d="M 110,40 C 118,65 120,95 116,120 C 114,135 108,145 102,152 C 105,138 108,115 108,85 Z"
                    fill="url(#goldFeather)"
                    opacity="0.95"
                  />
                  {/* Feather Barbs Lines */}
                  <line x1="108" y1="55" x2="98" y2="62" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="106" y1="70" x2="94" y2="78" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="104" y1="85" x2="91" y2="95" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="102" y1="100" x2="89" y2="112" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="109" y1="60" x2="117" y2="68" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="107" y1="75" x2="116" y2="85" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="105" y1="90" x2="115" y2="102" stroke="#4a3b18" strokeWidth="0.75" />
                  <line x1="103" y1="105" x2="112" y2="118" stroke="#4a3b18" strokeWidth="0.75" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right: Editorial Quote Statement */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <blockquote className="font-display italic text-2xl sm:text-3xl lg:text-[34px] font-normal text-[#f2eee3] leading-[1.35] tracking-wide mb-6">
              &ldquo;The publishing hub is a monthly book review publication distributed to 400,000 avid readers through subscribing bookstores and public libraries&rdquo;
            </blockquote>

            {/* Decorative Gold Filigree Divider */}
            <div className="flex items-center justify-center lg:justify-start gap-3 text-[#d4b56a] opacity-90">
              <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#d4b56a] to-[#d4b56a]" />
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rotate-45 bg-[#d4b56a]" />
                <span className="w-2 h-2 rotate-45 border border-[#d4b56a] bg-[#060a08] flex items-center justify-center">
                  <span className="w-0.5 h-0.5 bg-[#d4b56a]" />
                </span>
                <span className="w-1 h-1 rotate-45 bg-[#d4b56a]" />
              </div>
              <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#d4b56a] to-[#d4b56a]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
