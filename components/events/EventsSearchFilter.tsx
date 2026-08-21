"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, Calendar as CalendarIcon } from "lucide-react";

interface EventsSearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onFindEvents: () => void;
  selectedDate: number | null;
  onSelectDate: (day: number | null) => void;
  hasUpcomingEvents?: boolean;
}

export default function EventsSearchFilter({
  searchQuery,
  onSearchChange,
  onFindEvents,
  selectedDate = 21,
  onSelectDate,
  hasUpcomingEvents = false,
}: EventsSearchFilterProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(7); // August (0-indexed: 7 = August)
  const [currentYear, setCurrentYear] = useState(2026);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonthIndex((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonthIndex((m) => m + 1);
    }
  };

  // Calendar dates matching reference (August 2026)
  const calendarDays = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 31, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true },

    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true },

    { day: 10, isCurrentMonth: true },
    { day: 11, isCurrentMonth: true },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true },
    { day: 15, isCurrentMonth: true },
    { day: 16, isCurrentMonth: true },

    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true },
    { day: 21, isCurrentMonth: true, isDefaultActive: true },
    { day: 22, isCurrentMonth: true },
    { day: 23, isCurrentMonth: true },

    { day: 24, isCurrentMonth: true },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },

    { day: 31, isCurrentMonth: true },
    { day: 1, isCurrentMonth: false },
    { day: 2, isCurrentMonth: false },
    { day: 3, isCurrentMonth: false },
    { day: 4, isCurrentMonth: false },
    { day: 5, isCurrentMonth: false },
    { day: 6, isCurrentMonth: false },
  ];

  return (
    <div className="space-y-6 select-none">
      {/* 1. Search Bar Row with Find Events Button matching reference */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFindEvents();
        }}
        className="flex flex-col sm:flex-row items-stretch border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs overflow-hidden dark:bg-[#070e0a] bg-white shadow-xs"
      >
        <div className="flex-1 flex items-center px-4 sm:px-5 py-3.5 gap-3">
          <Search className="w-4 h-4 dark:text-[#888b83] text-[#71717a] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for events"
            className="w-full bg-transparent dark:text-[#f2eee3] text-[#18181b] placeholder-italic dark:placeholder-[#666a64] placeholder-[#a1a1aa] text-sm focus:outline-none italic font-serif"
          />
        </div>

        <button
          type="submit"
          className="px-8 sm:px-10 py-3.5 dark:bg-[#185238] bg-[#9333ea] hover:bg-[#7e22ce] dark:hover:bg-[#236b4a] text-white text-xs font-semibold tracking-[0.08em] uppercase transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-sm"
        >
          Find Events
        </button>
      </form>

      {/* 2. Navigation Controls & Calendar Dropdown Row */}
      <div className="relative">
        <div className="flex items-center gap-3 pl-1">
          {/* Prev/Next Arrow Buttons */}
          <div className="flex items-center gap-1 text-[#888b83]">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 rounded-xs dark:hover:text-[#f2eee3] hover:text-[#18181b] dark:hover:bg-[#0e1913] hover:bg-[#faf5ff] border dark:border-transparent border-[#e9e1f5] transition-colors"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 rounded-xs dark:hover:text-[#f2eee3] hover:text-[#18181b] dark:hover:bg-[#0e1913] hover:bg-[#faf5ff] border dark:border-transparent border-[#e9e1f5] transition-colors"
              aria-label="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* TODAY Button */}
          <button
            type="button"
            onClick={() => {
              setCurrentMonthIndex(7);
              setCurrentYear(2026);
              onSelectDate(21);
            }}
            className="px-4 py-1.5 text-[11px] font-semibold tracking-wider uppercase border dark:border-[#f2eee3]/20 border-[#e9e1f5] dark:text-[#dedacf] text-[#18181b] dark:hover:border-[#d4b56a] hover:border-[#9333ea] rounded-xs transition-colors"
          >
            TODAY
          </button>

          {/* Upcoming Dropdown Toggle matching reference */}
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold dark:text-[#f2eee3] text-[#18181b] dark:hover:text-[#d4b56a] hover:text-[#9333ea] transition-colors ml-1 px-2 py-1"
          >
            <span>Upcoming</span>
            {isCalendarOpen ? (
              <ChevronUp className="w-3.5 h-3.5 dark:text-[#d4b56a] text-[#9333ea]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#888b83]" />
            )}
          </button>
        </div>

        {/* 3. Interactive Mini Calendar Dropdown matching reference */}
        {isCalendarOpen && (
          <div className="absolute top-12 left-0 z-30 w-72 sm:w-80 dark:bg-[#070e0a] bg-white border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs shadow-2xl p-4 sm:p-5 animate-fadeIn">
            {/* Month/Year Title with Prev/Next Controls */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b dark:border-[#f2eee3]/10 border-[#e9e1f5]">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 text-[#888b83] dark:hover:text-[#f2eee3] hover:text-[#18181b] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="font-sans text-xs sm:text-sm font-semibold dark:text-[#f2eee3] text-[#18181b] tracking-wider uppercase">
                <span className="dark:text-[#d4b56a] text-[#9333ea] font-bold">{months[currentMonthIndex]}</span> {currentYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 text-[#888b83] dark:hover:text-[#f2eee3] hover:text-[#18181b] transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10px] font-bold dark:text-[#888b83] text-[#71717a] uppercase">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>

            {/* Dates Grid matching reference (Active 21 highlighted in Green/Purple) */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-sans">
              {calendarDays.map((item, idx) => {
                const isSelected = item.isCurrentMonth && selectedDate === item.day;

                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => {
                      if (item.isCurrentMonth) {
                        onSelectDate(item.day);
                        setIsCalendarOpen(false);
                      }
                    }}
                    className={`h-7 w-7 sm:h-8 sm:w-8 rounded-xs mx-auto flex items-center justify-center font-medium transition-all ${
                      isSelected
                        ? "dark:bg-[#185238] bg-[#9333ea] text-white font-bold shadow-md ring-1 dark:ring-[#2c7650] ring-[#9333ea]"
                        : item.isCurrentMonth
                        ? "dark:text-[#dedacf] text-[#18181b] dark:hover:bg-[#122319] hover:bg-[#f3e8ff] dark:hover:text-[#d4b56a] hover:text-[#9333ea]"
                        : "dark:text-[#454d48] text-[#d4d4d8] cursor-default pointer-events-none"
                    }`}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Notification / Status Banner matching reference image */}
      <div className="p-3.5 sm:p-4 rounded-xs border dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#070e0a]/70 bg-[#faf7fd] text-center">
        <p className="text-xs sm:text-sm dark:text-[#888b83] text-[#71717a] font-serif italic">
          There are no upcoming events.
        </p>
      </div>
    </div>
  );
}
