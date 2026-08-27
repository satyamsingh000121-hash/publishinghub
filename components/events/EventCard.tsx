"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Clock, ChevronsRight, Maximize2 } from "lucide-react";

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
  slug?: string;
}

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const cardHref = event.slug ? `/event/${event.slug}` : "#";

  const Content = (
    <div className="flex flex-col dark:bg-[#070e0a] bg-white border dark:border-[#f2eee3]/10 border-[#e5e7eb] rounded-xs overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] group cursor-pointer h-full">
      {/* Event Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden dark:bg-[#0c1611] bg-[#f4f4f5]">
        <img
          src={imageError && event.fallbackImage ? event.fallbackImage : event.image}
          alt={event.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Dark/Light Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t dark:from-[#070e0a]/60 from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Center Hover "VIEW MORE >>" Button (Matching Screenshot) */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <span className="px-6 py-2.5 bg-white text-[#18181b] text-xs font-bold uppercase tracking-[0.18em] shadow-xl flex items-center gap-2 transform group-hover:scale-100 scale-95 transition-transform duration-300 border border-white">
            VIEW MORE <ChevronsRight className="w-4 h-4 text-[#18181b]" />
          </span>
        </div>

        {/* Bottom-right Expand/Scan Icon */}
        <div className="absolute bottom-3 right-3 text-white/70 opacity-60 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-4 h-4 drop-shadow" />
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          {/* Orange/Copper Date Tag matching reference image */}
          <span className="text-xs sm:text-[12.5px] tracking-[0.2em] font-bold uppercase text-[#c85a32] dark:text-[#d4b56a] font-sans block">
            {event.date}
          </span>

          {/* Event Title in Serif Display Font */}
          <h3 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#f2eee3] text-[#18181b] dark:group-hover:text-[#d4b56a] group-hover:text-[#c85a32] transition-colors leading-tight tracking-tight">
            {event.title}
          </h3>
        </div>

        {/* Location & Time Metadata Row matching 2-column layout */}
        <div className="pt-3.5 border-t dark:border-[#f2eee3]/10 border-[#e5e7eb] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] dark:text-[#888b83] text-[#52525b]">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#71717a] dark:text-[#888b83] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2 italic font-serif leading-relaxed">
              {event.location}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-start sm:justify-end gap-2">
            <Clock className="w-4 h-4 text-[#71717a] dark:text-[#888b83] flex-shrink-0 mt-0.5" />
            <span className="italic font-serif leading-relaxed">
              {event.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (event.slug) {
    return (
      <Link href={cardHref} className="block h-full">
        {Content}
      </Link>
    );
  }

  return Content;
}
