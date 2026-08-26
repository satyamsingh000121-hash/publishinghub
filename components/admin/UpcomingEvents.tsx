import React from "react";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";

interface EventItem {
  id: string;
  month: string;
  day: string;
  title: string;
  location: string;
  time: string;
}

const defaultEvents: EventItem[] = [
  {
    id: "1",
    month: "AUG",
    day: "28",
    title: "Book Launch: Creative Life",
    location: "London, UK",
    time: "10:00 AM",
  },
  {
    id: "2",
    month: "SEP",
    day: "05",
    title: "Author Meet & Greet",
    location: "Online Event",
    time: "02:00 PM",
  },
  {
    id: "3",
    month: "SEP",
    day: "12",
    title: "Reading Corner Session",
    location: "New York, USA",
    time: "11:00 AM",
  },
];

export default function UpcomingEvents() {
  return (
    <div className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[16px] font-bold admin-text-primary">
          Upcoming Events
        </h3>
        <Link
          href="/events"
          className="text-xs font-semibold text-[#8B5CF6] dark:text-[#A78BFA] hover:text-[#7C3AED] transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Events List */}
      <div className="space-y-3.5 my-auto">
        {defaultEvents.map((evt) => (
          <div
            key={evt.id}
            className="flex items-center gap-3.5"
          >
            {/* Date Block */}
            <div className="w-11 h-12 rounded-xl admin-date-badge flex flex-col items-center justify-center flex-shrink-0 text-center">
              <span className="text-[9.5px] uppercase font-bold text-[#8B5CF6] dark:text-[#C4B5FD] leading-none">
                {evt.month}
              </span>
              <span className="text-[14px] font-extrabold admin-text-primary leading-tight mt-0.5">
                {evt.day}
              </span>
            </div>

            {/* Event Info */}
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold admin-text-primary truncate leading-tight">
                {evt.title}
              </h4>
              <div className="flex items-center gap-3.5 text-[11px] admin-text-secondary mt-1">
                <span className="inline-flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-[#94A3B8]" />
                  {evt.location}
                </span>
                <span className="inline-flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3 text-[#94A3B8]" />
                  {evt.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
