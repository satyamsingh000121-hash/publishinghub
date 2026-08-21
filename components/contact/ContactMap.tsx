"use client";

import React from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function ContactMap() {
  return (
    <div className="relative w-full rounded-xs overflow-hidden border dark:border-[#f2eee3]/15 border-[#e9e1f5] shadow-xl dark:bg-[#070e0a] bg-white group">
      {/* Interactive Google Map Embed */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full min-h-[380px] sm:min-h-[460px]">
        <iframe
          src="https://maps.google.com/maps?q=12+Shirley+Road,+Southampton,+SO15+3EU,+UK&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 dark:grayscale dark:invert-[0.92] dark:contrast-[1.15] dark:hue-rotate-[180deg] opacity-90 hover:opacity-100 transition-opacity duration-300"
          loading="lazy"
          title="The Publishing Hub Location"
          allowFullScreen
        />

        {/* Ambient Top & Bottom Gradients */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b dark:from-[#050807]/40 from-white/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t dark:from-[#050807]/40 from-white/30 to-transparent pointer-events-none" />

        {/* Location Info Card Overlay matching reference layout on Top-Left */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 max-w-[280px] sm:max-w-xs dark:bg-[#09110d]/95 bg-white/95 backdrop-blur-md border dark:border-[#d4b56a]/30 border-[#e9e1f5] rounded-xs p-4 shadow-2xl space-y-2.5 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-display text-sm font-semibold dark:text-[#f2eee3] text-[#18181b] leading-tight">
                12 Shirley Rd
              </h4>
              <p className="text-[11px] dark:text-[#9a9d95] text-[#71717a] mt-0.5 leading-snug">
                12 Shirley Rd, Southampton, SO15 3EU, UK
              </p>
            </div>

            {/* Directions Icon Button */}
            <a
              href="https://maps.google.com/?q=12+Shirley+Road,+Southampton,+SO15+3EU,+UK"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-1.5 rounded dark:bg-[#122319] bg-[#f3e8ff] dark:text-[#d4b56a] text-[#9333ea] hover:scale-105 transition-transform"
              title="Get Directions"
            >
              <Navigation className="w-4 h-4" />
              <span className="text-[8px] font-bold uppercase mt-0.5">Directions</span>
            </a>
          </div>

          <div className="pt-2 border-t dark:border-[#f2eee3]/10 border-[#e9e1f5] flex items-center justify-between text-[10px] font-medium">
            <a
              href="https://maps.google.com/?q=12+Shirley+Road,+Southampton,+SO15+3EU,+UK"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-[#d4b56a] text-[#9333ea] hover:underline inline-flex items-center gap-1"
            >
              View larger map <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
