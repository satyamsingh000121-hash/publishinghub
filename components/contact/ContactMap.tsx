"use client";

import React from "react";
import { WorldMap } from "@/components/ui/map";
import { Globe, MapPin, Sparkles } from "lucide-react";

export default function ContactMap() {
  return (
    <div className="w-full bg-transparent">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>Global Reach & Distribution</span>
        </div>
        <h3 className="font-display text-2xl sm:text-4xl font-bold dark:text-[#f2eee3] text-[#18181b] tracking-tight">
          Worldwide Publishing Network
        </h3>
        <p className="text-sm sm:text-base dark:text-[#9a9d95] text-[#71717a] mt-2">
          From our headquarters in Southampton, UK to readers, authors, and distribution hubs across the globe.
        </p>
      </div>

      {/* Full-width Transparent World Map */}
      <div className="w-full relative px-2 sm:px-0">
        <WorldMap
          lineColor="#f59e0b"
          labelClassName="text-[11px] sm:text-xs font-semibold text-amber-600 dark:text-amber-400 bg-white/95 dark:bg-[#09110d]/95 border border-amber-500/30 backdrop-blur-md shadow-md"
          dots={[
            {
              start: {
                lat: 50.9097,
                lng: -1.4044,
                label: "Southampton (HQ)",
              },
              end: {
                lat: 40.7128,
                lng: -74.006,
                label: "New York",
              },
            },
            {
              start: {
                lat: 50.9097,
                lng: -1.4044,
                label: "Southampton (HQ)",
              },
              end: {
                lat: 28.6139,
                lng: 77.209,
                label: "New Delhi",
              },
            },
            {
              start: {
                lat: 50.9097,
                lng: -1.4044,
                label: "Southampton (HQ)",
              },
              end: {
                lat: 35.6762,
                lng: 139.6503,
                label: "Tokyo",
              },
            },
            {
              start: {
                lat: 50.9097,
                lng: -1.4044,
                label: "Southampton (HQ)",
              },
              end: {
                lat: -33.8688,
                lng: 151.2093,
                label: "Sydney",
              },
            },
            {
              start: {
                lat: 50.9097,
                lng: -1.4044,
                label: "Southampton (HQ)",
              },
              end: {
                lat: -23.5505,
                lng: -46.6333,
                label: "São Paulo",
              },
            },
            {
              start: {
                lat: 50.9097,
                lng: -1.4044,
                label: "Southampton (HQ)",
              },
              end: {
                lat: -1.2921,
                lng: 36.8219,
                label: "Nairobi",
              },
            },
          ]}
        />
      </div>

      {/* Bottom Info Badges */}
      <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs dark:text-[#9a9d95] text-[#71717a] px-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" />
          <span>Headquarters: 12 Shirley Rd, Southampton, SO15 3EU, UK</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Worldwide Dispatch
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Global Express Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
