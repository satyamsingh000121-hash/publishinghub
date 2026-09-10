"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  ArrowRight,
  X,
} from "lucide-react";

interface EventsSearchFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
  selectedLocation?: string;
  onLocationChange?: (loc: string) => void;
  selectedDate?: string | null;
  onSelectDate?: (dateStr: string | null) => void;
  onFindEvents?: () => void;
}

export default function EventsSearchFilter({
  searchQuery,
  onSearchChange,
  selectedCategory = "All Categories",
  onCategoryChange = () => {},
  selectedLocation = "All Locations",
  onLocationChange = () => {},
  selectedDate = null,
  onSelectDate = () => {},
  onFindEvents = () => {},
}: EventsSearchFilterProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(3); // April (0-indexed: 3 = April)
  const [currentYear, setCurrentYear] = useState(2026);
  const calendarRef = useRef<HTMLDivElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

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

  // Generate calendar days for currentMonthIndex and currentYear
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Monday as 0
  };

  const daysInCurrentMonth = getDaysInMonth(currentMonthIndex, currentYear);
  const firstDayIndex = getFirstDayOfMonth(currentMonthIndex, currentYear);
  const daysInPrevMonth = getDaysInMonth(
    currentMonthIndex === 0 ? 11 : currentMonthIndex - 1,
    currentMonthIndex === 0 ? currentYear - 1 : currentYear
  );

  const calendarDays = [];
  // Prev month padding
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      dateString: null,
    });
  }
  // Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const monthShort = months[currentMonthIndex].slice(0, 3).toUpperCase();
    const dayPadded = i < 10 ? `0${i}` : `${i}`;
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      dateString: `${dayPadded} ${monthShort}`,
    });
  }
  // Next month padding
  const remaining = (7 - (calendarDays.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      dateString: null,
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onFindEvents();
      }}
      className="w-full bg-white dark:bg-[#08120b] border border-[#e9e1f5] dark:border-[#16291d] rounded-2xl p-2 sm:p-2.5 shadow-[0_4px_24px_rgba(147,51,234,0.06)] dark:shadow-lg relative z-30 transition-colors duration-300"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3">
        {/* 1. Search Query Input */}
        <div className="flex-1 flex items-center px-4 py-2.5 bg-[#faf7fd] lg:bg-transparent dark:bg-[#060c08] lg:dark:bg-transparent rounded-xl border lg:border-none border-[#e9e1f5] dark:border-[#16291d] gap-3 transition-colors">
          <Search className="w-4 h-4 text-[#9333ea] dark:text-[#8e9c93] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for events..."
            className="w-full bg-transparent text-sm text-[#18181b] dark:text-[#f2eee3] placeholder-[#9ca3af] dark:placeholder-[#64746b] focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="text-[#71717a] dark:text-[#8e9c93] hover:text-[#18181b] dark:hover:text-[#f2eee3] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Divider for desktop */}
        <div className="hidden lg:block w-[1px] h-7 bg-[#e9e1f5] dark:bg-[#16291d]" />

        {/* 2. Category Select Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full lg:w-auto appearance-none bg-[#faf7fd] hover:bg-[#f6f0fc] dark:bg-[#060c08] dark:hover:bg-[#0a140e] border border-[#e9e1f5] dark:border-[#16291d] rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm text-[#1e1b24] dark:text-[#c8d4cc] font-medium focus:outline-none focus:border-[#9333ea] dark:focus:border-[#d4b56a] cursor-pointer shadow-2xs transition-colors"
          >
            <option value="All Categories" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">All Categories</option>
            <option value="BOOK READING" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Book Reading</option>
            <option value="WRITING WORKSHOP" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Writing Workshop</option>
            <option value="KIDS EVENT" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Kids Event</option>
            <option value="PANEL DISCUSSION" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Panel Discussion</option>
            <option value="BOOK LAUNCH" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Book Launch</option>
            <option value="WORKSHOP" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Workshop</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#71717a] dark:text-[#8e9c93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Location Select Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full lg:w-auto appearance-none bg-[#faf7fd] hover:bg-[#f6f0fc] dark:bg-[#060c08] dark:hover:bg-[#0a140e] border border-[#e9e1f5] dark:border-[#16291d] rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm text-[#1e1b24] dark:text-[#c8d4cc] font-medium focus:outline-none focus:border-[#9333ea] dark:focus:border-[#d4b56a] cursor-pointer shadow-2xs transition-colors"
          >
            <option value="All Locations" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">All Locations</option>
            <option value="The Publishing Hub, London" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">The Publishing Hub, London</option>
            <option value="Online / Zoom" className="bg-white dark:bg-[#08120b] text-[#1e1b24] dark:text-[#c8d4cc]">Online / Zoom</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#71717a] dark:text-[#8e9c93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. Upcoming with Interactive Calendar Dropdown */}
        <div className="relative flex-1 sm:flex-initial" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full lg:w-auto flex items-center justify-between gap-2.5 bg-[#faf7fd] hover:bg-[#f6f0fc] dark:bg-[#060c08] dark:hover:bg-[#0a140e] border ${
              isCalendarOpen || selectedDate
                ? "border-[#9333ea] dark:border-[#d4b56a] bg-[#faf5ff] dark:bg-[#0c1810]"
                : "border-[#e9e1f5] dark:border-[#16291d]"
            } rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left shadow-2xs`}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-[#9333ea] dark:text-[#d4b56a]" />
              <span className={selectedDate ? "text-[#9333ea] dark:text-[#d4b56a] font-semibold" : "text-[#1e1b24] dark:text-[#c8d4cc]"}>
                {selectedDate || "Upcoming"}
              </span>
            </div>
            {isCalendarOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#9333ea] dark:text-[#d4b56a]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#71717a] dark:text-[#8e9c93]" />
            )}
          </button>

          {/* Floating Calendar Popover */}
          {isCalendarOpen && (
            <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-[#070e0a] border border-[#e9e1f5] dark:border-[#1c3826] rounded-2xl shadow-[0_12px_36px_rgba(147,51,234,0.15)] dark:shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Month / Year header with navigation */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#e9e1f5] dark:border-[#16291d]">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-[#71717a] dark:text-[#8e9c93] hover:text-[#9333ea] dark:hover:text-[#f2eee3] hover:bg-[#f6f0fc] dark:hover:bg-[#102317] transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide uppercase">
                  <span className="text-[#9333ea] dark:text-[#d4b56a]">{months[currentMonthIndex]}</span>
                  <span className="text-[#18181b] dark:text-[#f2eee3]">{currentYear}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-[#71717a] dark:text-[#8e9c93] hover:text-[#9333ea] dark:hover:text-[#f2eee3] hover:bg-[#f6f0fc] dark:hover:bg-[#102317] transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10.5px] font-bold text-[#9ca3af] dark:text-[#64746b] uppercase">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {calendarDays.map((item, idx) => {
                  const isSelected =
                    item.isCurrentMonth && item.dateString === selectedDate;

                  return (
                    <button
                      type="button"
                      key={idx}
                      disabled={!item.isCurrentMonth}
                      onClick={() => {
                        if (item.isCurrentMonth && item.dateString) {
                          if (selectedDate === item.dateString) {
                            onSelectDate(null); // toggle off
                          } else {
                            onSelectDate(item.dateString);
                          }
                          setIsCalendarOpen(false);
                        }
                      }}
                      className={`h-8 w-8 rounded-lg mx-auto flex items-center justify-center font-medium transition-all ${
                        isSelected
                          ? "bg-[#9333ea] dark:bg-[#d4b56a] text-white dark:text-[#050807] font-bold shadow-md shadow-[#9333ea]/30 dark:shadow-[#d4b56a]/30 scale-105"
                          : item.isCurrentMonth
                          ? "text-[#1e1b24] dark:text-[#e5ded0] hover:bg-[#f6f0fc] dark:hover:bg-[#122319] hover:text-[#9333ea] dark:hover:text-[#d4b56a]"
                          : "text-[#d1d5db] dark:text-[#36443c] cursor-not-allowed opacity-30"
                      }`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>

              {/* Footer Buttons in Calendar */}
              <div className="mt-3 pt-2.5 border-t border-[#e9e1f5] dark:border-[#16291d] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onSelectDate(null);
                    setIsCalendarOpen(false);
                  }}
                  className="text-[#71717a] dark:text-[#8e9c93] hover:text-[#9333ea] dark:hover:text-[#d4b56a] transition-colors font-medium"
                >
                  Show All / Upcoming
                </button>

                {selectedDate && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDate(null);
                    }}
                    className="text-[11px] text-[#ef4444] hover:underline"
                  >
                    Clear Date
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. Find Events Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-transparent dark:border-[#b89245]/60 hover:border-transparent dark:hover:border-[#d4b56a] bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#0c1810] dark:hover:bg-[#122418] text-xs sm:text-sm font-medium text-white dark:text-[#f2eee3] dark:hover:text-[#d4b56a] shadow-md shadow-[#9333ea]/20 dark:shadow-none transition-all flex-shrink-0 cursor-pointer"
        >
          <span>Find Events</span>
          <ArrowRight className="w-4 h-4 text-white dark:text-[#d4b56a]" />
        </button>
      </div>
    </form>
  );
}
