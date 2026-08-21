"use client";

import React from "react";

export default function AboutTestimonials() {
  const testimonials = [
    {
      name: "Vladimir Nabokov",
      role: "/ Reporter",
      quote:
        "“Auteur is a monthly book review publication distributed to 400,000 avid readers through subscribing bookstores & public libraries.”",
      image: "/images/vladimir_avatar.jpg",
      fallbackImage: "/images/sir1.png",
      initials: "VN",
    },
    {
      name: "Savanna Walker",
      role: "/ Reporter",
      quote:
        "“It was a dark night, with only occasional scattered lights, glittering like stars on the plain. It flashed upon me suddenly; they were going to shoot me!”",
      image: "/images/savanna_avatar.jpg",
      fallbackImage: "/images/sir2.png",
      initials: "SW",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-[#060c09] via-[#040806] to-[#050807] border-b border-[#f2eee3]/10 relative overflow-hidden">
      {/* Central Watermark Feather Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <svg viewBox="0 0 200 200" className="w-[500px] h-[500px] text-[#d4b56a]" fill="currentColor">
          <path d="M100 20 C90 40 70 80 65 120 C63 150 75 180 100 195 C125 180 137 150 135 120 C130 80 110 40 100 20 Z" />
        </svg>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] sm:text-xs tracking-[0.28em] text-[#d4b56a] font-bold uppercase block mb-3 font-sans">
            TESTIMONIALS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-[#f2eee3] tracking-tight leading-tight mb-4">
            Read Reviews by My Readers
          </h2>

          {/* Decorative Gold Filigree Divider */}
          <div className="flex items-center justify-center gap-3 text-[#d4b56a] opacity-90 my-2">
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-[#d4b56a] to-[#d4b56a]" />
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rotate-45 bg-[#d4b56a]" />
              <span className="w-2 h-2 rotate-45 border border-[#d4b56a] bg-[#050807] flex items-center justify-center">
                <span className="w-0.5 h-0.5 bg-[#d4b56a]" />
              </span>
              <span className="w-1 h-1 rotate-45 bg-[#d4b56a]" />
            </div>
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-[#d4b56a] to-[#d4b56a]" />
          </div>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group bg-[#070e0a]/40 border border-[#f2eee3]/5 p-8 sm:p-10 rounded-sm hover:border-[#d4b56a]/30 transition-all duration-300 shadow-xl"
            >
              {/* Circular Avatar Frame */}
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#d4b56a]/50 p-1 bg-[#0d1712] shadow-[0_0_20px_rgba(212,181,106,0.15)] group-hover:border-[#d4b56a] transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      // Fallback if local image not found
                      e.currentTarget.src = item.fallbackImage;
                    }}
                    className="w-full h-full object-cover rounded-full filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Italic Quote Text */}
              <blockquote className="font-display italic text-lg sm:text-xl text-[#dedacf] leading-relaxed max-w-md mb-6 font-normal">
                {item.quote}
              </blockquote>

              {/* Author Name and Role */}
              <div className="mt-auto">
                <h4 className="font-display text-lg sm:text-xl font-semibold text-[#f2eee3] tracking-wide">
                  {item.name}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#2c7650] font-medium tracking-wider uppercase mt-1">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
