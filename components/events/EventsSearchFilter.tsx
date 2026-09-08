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
      className="w-full bg-[#08120b] border border-[#16291d] rounded-2xl p-2 sm:p-2.5 shadow-lg relative z-30"
    >
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-3">
        {/* 1. Search Query Input */}
        <div className="flex-1 flex items-center px-4 py-2.5 bg-[#060c08] lg:bg-transparent rounded-xl border lg:border-none border-[#16291d] gap-3">
          <Search className="w-4 h-4 text-[#8e9c93] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for events..."
            className="w-full bg-transparent text-sm text-[#f2eee3] placeholder-[#64746b] focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="text-[#8e9c93] hover:text-[#f2eee3]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Divider for desktop */}
        <div className="hidden lg:block w-[1px] h-7 bg-[#16291d]" />

        {/* 2. Category Select Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full lg:w-auto appearance-none bg-[#060c08] border border-[#16291d] rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm text-[#c8d4cc] font-medium focus:outline-none focus:border-[#d4b56a] cursor-pointer"
          >
            <option value="All Categories">All Categories</option>
            <option value="BOOK READING">Book Reading</option>
            <option value="WRITING WORKSHOP">Writing Workshop</option>
            <option value="KIDS EVENT">Kids Event</option>
            <option value="PANEL DISCUSSION">Panel Discussion</option>
            <option value="BOOK LAUNCH">Book Launch</option>
            <option value="WORKSHOP">Workshop</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8e9c93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 3. Location Select Dropdown */}
        <div className="relative flex-1 sm:flex-initial">
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full lg:w-auto appearance-none bg-[#060c08] border border-[#16291d] rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm text-[#c8d4cc] font-medium focus:outline-none focus:border-[#d4b56a] cursor-pointer"
          >
            <option value="All Locations">All Locations</option>
            <option value="The Publishing Hub, London">The Publishing Hub, London</option>
            <option value="Online / Zoom">Online / Zoom</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#8e9c93] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 4. Upcoming with Interactive Calendar Dropdown */}
        <div className="relative flex-1 sm:flex-initial" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`w-full lg:w-auto flex items-center justify-between gap-2.5 bg-[#060c08] border ${
              isCalendarOpen || selectedDate ? "border-[#d4b56a]" : "border-[#16291d]"
            } rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left`}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-[#d4b56a]" />
              <span className={selectedDate ? "text-[#d4b56a] font-semibold" : "text-[#c8d4cc]"}>
                {selectedDate || "Upcoming"}
              </span>
            </div>
            {isCalendarOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#d4b56a]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#8e9c93]" />
            )}
          </button>

          {/* Floating Calendar Popover */}
          {isCalendarOpen && (
            <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 sm:w-80 bg-[#070e0a] border border-[#1c3826] rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Month / Year header with navigation */}
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#16291d]">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg text-[#8e9c93] hover:text-[#f2eee3] hover:bg-[#102317] transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide uppercase">
                  <span className="text-[#d4b56a]">{months[currentMonthIndex]}</span>
                  <span className="text-[#f2eee3]">{currentYear}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg text-[#8e9c93] hover:text-[#f2eee3] hover:bg-[#102317] transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2 text-[10.5px] font-bold text-[#64746b] uppercase">
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
                          ? "bg-[#d4b56a] text-[#050807] font-bold shadow-md shadow-[#d4b56a]/30 scale-105"
                          : item.isCurrentMonth
                          ? "text-[#e5ded0] hover:bg-[#122319] hover:text-[#d4b56a]"
                          : "text-[#36443c] cursor-not-allowed opacity-30"
                      }`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>

              {/* Footer Buttons in Calendar */}
              <div className="mt-3 pt-2.5 border-t border-[#16291d] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    onSelectDate(null);
                    setIsCalendarOpen(false);
                  }}
                  className="text-[#8e9c93] hover:text-[#d4b56a] transition-colors font-medium"
                >
                  Show All / Upcoming
                </button>

                {selectedDate && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDate(null);
                    }}
                    className="text-[11px] text-[#e06c52] hover:underline"
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
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-[#b89245]/60 hover:border-[#d4b56a] bg-[#0c1810] hover:bg-[#122418] text-xs sm:text-sm font-medium text-[#f2eee3] hover:text-[#d4b56a] transition-all flex-shrink-0"
        >
          <span>Find Events</span>
          <ArrowRight className="w-4 h-4 text-[#d4b56a]" />
        </button>
      </div>
    </form>
  );
}
