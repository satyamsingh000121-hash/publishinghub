"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Search,
  Plus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  featured?: boolean;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) {
          setEvents(json.data);
        }
      })
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin"
              className="text-xs font-semibold text-[#8B5CF6] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="font-display text-[28px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
            Events Management
          </h1>
          <p className="text-[13px] admin-text-secondary mt-0.5">
            Manage author meets, book signings, and reading sessions.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>
      </div>

      {/* Events Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="admin-card rounded-2xl p-6 h-48 animate-pulse bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="admin-card rounded-2xl p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-semibold admin-text-primary">No events found</h3>
          <p className="text-xs admin-text-secondary mt-1">Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#8B5CF6]/10 text-[#8B5CF6] dark:text-[#C4B5FD]">
                    <Sparkles className="w-3 h-3" />
                    {evt.date}
                  </span>
                  <span className="text-[11px] admin-text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#94A3B8]" />
                    {evt.time}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold admin-text-primary leading-tight group-hover:text-[#8B5CF6] transition-colors">
                  {evt.title}
                </h3>

                {evt.description && (
                  <p className="text-[12px] admin-text-secondary mt-2 line-clamp-2">
                    {evt.description}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 admin-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                  {evt.location}
                </span>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  Scheduled
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
