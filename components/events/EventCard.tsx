"use client";

import React, { useState } from "react";
import { MapPin, Clock, ArrowRight, Calendar } from "lucide-react";

export interface EventItem {
  id: string;
  date: string;
  title: string;
  location: string;
  time: string;
  image: string;
  fallbackImage?: string;
  category?: string;
  description?: string;
}

interface EventCardProps {
  event: EventItem;
  onSelectEvent?: (event: EventItem) => void;
}

export default function EventCard({ event, onSelectEvent }: EventCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelectEvent?.(event)}
      className="flex flex-col dark:bg-[#070e0a] bg-white border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:hover:border-[#d4b56a]/50 hover:border-[#9333ea] rounded-xs overflow-hidden transition-all duration-300 hover:-translate-y-1 dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] shadow-[0_10px_25px_rgba(147,51,234,0.06)] group cursor-pointer"
    >
      {/* Event Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden dark:bg-[#0c1611] bg-[#faf5ff]">
        <img
          src={imageError && event.fallbackImage ? event.fallbackImage : event.image}
          alt={event.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Dark/Light Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t dark:from-[#070e0a] from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Quick hover badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.14em] uppercase font-bold px-3 py-1 bg-[#2c7650] dark:bg-[#2c7650] text-white shadow-md rounded-[2px]">
            RSVP <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* Gold Date Tag matching reference image */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] sm:text-xs tracking-[0.22em] font-bold uppercase dark:text-[#d4b56a] text-[#9333ea] font-sans">
              {event.date}
            </span>
          </div>

          {/* Event Title in Serif Display Font */}
          <h3 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#f2eee3] text-[#18181b] dark:group-hover:text-[#d4b56a] group-hover:text-[#9333ea] transition-colors leading-snug tracking-tight">
            {event.title}
          </h3>
        </div>

        {/* Location & Time Metadata Row matching reference layout */}
        <div className="pt-2 border-t dark:border-[#f2eee3]/10 border-[#e9e1f5] space-y-2 text-xs sm:text-[13px] dark:text-[#888b83] text-[#71717a]">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#888b83] dark:text-[#888b83] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1 italic font-serif">
              {event.location}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#888b83] dark:text-[#888b83] flex-shrink-0" />
            <span className="italic font-serif">
              {event.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
