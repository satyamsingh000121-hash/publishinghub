"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight, Bookmark } from "lucide-react";

export interface EventItem {
  id: string;
  day?: string;
  month?: string;
  date?: string;
  tag?: string;
  title: string;
  location: string;
  time: string;
  image: string;
  fallbackImage?: string;
  category?: string;
  description?: string;
  slug?: string;
}

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Extract day and month if not provided separately
  let displayDay = event.day;
  let displayMonth = event.month;
  if (!displayDay || !displayMonth) {
    const parts = (event.date || "").split(" ");
    if (parts.length >= 2) {
      if (isNaN(Number(parts[0]))) {
        displayMonth = parts[0].slice(0, 3).toUpperCase();
        displayDay = parts[1];
      } else {
        displayDay = parts[0];
        displayMonth = parts[1].slice(0, 3).toUpperCase();
      }
    } else {
      displayDay = "12";
      displayMonth = "APR";
    }
  }

  const cardHref = event.slug ? `/event/${event.slug}` : "#";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#09110c] border border-[#e9e1f5] dark:border-[#16291d] hover:border-[#9333ea]/40 dark:hover:border-[#d4b56a]/40 p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_16px_36px_rgba(147,51,234,0.1)] dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Top Section: Inset Image with Date Badge */}
      <div>
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#f4f2ed] dark:bg-[#060c08] border border-[#e9e1f5]/60 dark:border-transparent mb-5">
          <img
            src={imageError && event.fallbackImage ? event.fallbackImage : event.image}
            alt={event.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 dark:from-[#09110c]/80 dark:to-black/20 pointer-events-none" />

          {/* Date Badge (Top-Left) */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 dark:bg-[#08120b]/90 backdrop-blur-md border border-[#e9e1f5] dark:border-[#1b3324] rounded-xl px-3.5 py-1.5 flex flex-col items-center justify-center shadow-md dark:shadow-lg min-w-[50px]">
            <span className="text-xl sm:text-2xl font-bold text-[#18181b] dark:text-[#f2eee3] leading-tight font-sans">
              {displayDay}
            </span>
            <span className="text-[10px] font-bold text-[#9333ea] dark:text-[#8e9c93] tracking-wider uppercase font-sans">
              {displayMonth}
            </span>
          </div>
        </div>

        {/* Category Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-[10.5px] font-bold tracking-wider uppercase rounded-full border border-[#e9e1f5] dark:border-[#1f3827] text-[#9333ea] dark:text-[#c9a762] bg-[#faf5ff] dark:bg-[#0c1b12]">
            {event.tag || event.category || "EVENT"}
          </span>
        </div>

        {/* Event Title */}
        <Link href={cardHref}>
          <h3 className="font-display text-xl sm:text-[22px] font-semibold text-[#18181b] dark:text-[#f2eee3] group-hover:text-[#9333ea] dark:group-hover:text-[#d4b56a] transition-colors line-clamp-1 mb-2.5">
            {event.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#64748b] dark:text-[#8e9c93] leading-relaxed line-clamp-3 mb-5 font-sans">
          {event.description}
        </p>
      </div>

      {/* Bottom Details & Actions */}
      <div>
        {/* Meta Info: Location & Time */}
        <div className="flex flex-col gap-2 py-3 border-t border-[#e9e1f5] dark:border-[#16291d] text-xs text-[#71717a] dark:text-[#8e9c93]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#9333ea] dark:text-[#8e9c93] flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#9333ea] dark:text-[#8e9c93] flex-shrink-0" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Action Row: Learn More & Bookmark */}
        <div className="pt-3 border-t border-[#e9e1f5] dark:border-[#16291d] flex items-center justify-between">
          <Link
            href={cardHref}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#e9e1f5] dark:border-[#1f3827] hover:border-[#9333ea] dark:hover:border-[#d4b56a] bg-[#faf7fd] hover:bg-[#f6f0fc] dark:bg-[#070e0a] dark:hover:bg-[#0e1f15] text-xs font-semibold text-[#18181b] hover:text-[#9333ea] dark:text-[#dedacf] dark:hover:text-[#d4b56a] shadow-2xs transition-all"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked
                ? "text-[#9333ea] dark:text-[#d4b56a] bg-[#f3e8ff] dark:bg-[#1a2d21]"
                : "text-[#71717a] dark:text-[#8e9c93] hover:text-[#9333ea] dark:hover:text-[#d4b56a] hover:bg-[#faf5ff] dark:hover:bg-[#122319]"
            }`}
            title={isBookmarked ? "Bookmarked" : "Save event"}
            aria-label="Bookmark event"
          >
            <Bookmark
              className="w-4 h-4"
              fill={isBookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
