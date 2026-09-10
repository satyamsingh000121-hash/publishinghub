"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsHeader from "@/components/events/EventsHeader";
import EventsSearchFilter from "@/components/events/EventsSearchFilter";
import EventCard, { EventItem } from "@/components/events/EventCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "event-1",
    day: "12",
    month: "APR",
    date: "12 APR",
    tag: "BOOK READING",
    title: "An Evening with the Author",
    slug: "an-evening-with-the-author",
    location: "The Publishing Hub, London",
    time: "6:00 PM - 8:00 PM",
    image: "/images/hero4.png",
    fallbackImage: "/images/shop1.jpg",
    category: "BOOK READING",
    description:
      "Join us for an intimate evening with bestselling author Sarah Collins as she discusses her latest novel and the inspiration behind it.",
  },
  {
    id: "event-2",
    day: "18",
    month: "APR",
    date: "18 APR",
    tag: "WRITING WORKSHOP",
    title: "Creative Writing Workshop",
    slug: "creative-writing-workshop",
    location: "Online / Zoom",
    time: "3:00 PM - 5:00 PM",
    image: "/images/shop2.jpg",
    fallbackImage: "/images/shop_hero_banner.jpg",
    category: "WRITING WORKSHOP",
    description:
      "Unleash your creativity and learn the art of storytelling with our expert writing coaches. Suitable for all skill levels.",
  },
  {
    id: "event-3",
    day: "25",
    month: "APR",
    date: "25 APR",
    tag: "KIDS EVENT",
    title: "Storytime for Little Readers",
    slug: "storytime-for-little-readers",
    location: "The Publishing Hub, London",
    time: "10:00 AM - 11:30 AM",
    image: "/images/shop3.jpg",
    fallbackImage: "/images/shop5.jpg",
    category: "KIDS EVENT",
    description:
      "Bring your little ones for a magical storytime session with fun activities, crafts and book giveaways.",
  },
  {
    id: "event-4",
    day: "03",
    month: "MAY",
    date: "03 MAY",
    tag: "PANEL DISCUSSION",
    title: "The Future of Fiction",
    slug: "the-future-of-fiction",
    location: "The Publishing Hub, London",
    time: "6:30 PM - 8:30 PM",
    image: "/images/hero_sectin1.png",
    fallbackImage: "/images/shop4.jpg",
    category: "PANEL DISCUSSION",
    description:
      "A panel of celebrated authors and industry experts discuss the evolving landscape of modern fiction.",
  },
  {
    id: "event-5",
    day: "10",
    month: "MAY",
    date: "10 MAY",
    tag: "BOOK LAUNCH",
    title: "New Release Launch",
    slug: "new-release-launch",
    location: "The Publishing Hub, London",
    time: "5:00 PM - 7:00 PM",
    image: "/images/shop5.jpg",
    fallbackImage: "/images/shop8.jpg",
    category: "BOOK LAUNCH",
    description:
      "Be the first to experience our latest release and meet the author at this exclusive event.",
  },
  {
    id: "event-6",
    day: "17",
    month: "MAY",
    date: "17 MAY",
    tag: "WORKSHOP",
    title: "Bookbinding Workshop",
    slug: "bookbinding-workshop",
    location: "The Publishing Hub, London",
    time: "11:00 AM - 2:00 PM",
    image: "/images/shop6.jpg",
    fallbackImage: "/images/shop9.jpg",
    category: "WORKSHOP",
    description:
      "Learn the traditional craft of bookbinding and create your own handmade notebook with expert guidance.",
  },
];

const ITEMS_PER_PAGE = 3;

export default function EventsPage() {
  const [events] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter events based on search query, category, location, and calendar date
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          ev.title.toLowerCase().includes(q) ||
          ev.location.toLowerCase().includes(q) ||
          (ev.tag && ev.tag.toLowerCase().includes(q)) ||
          (ev.description && ev.description.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (selectedCategory !== "All Categories") {
        if (ev.tag !== selectedCategory && ev.category !== selectedCategory) {
          return false;
        }
      }

      // Location filter
      if (selectedLocation !== "All Locations") {
        if (
          !ev.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase().split("/")[0].trim())
        ) {
          return false;
        }
      }

      // Calendar Date filter
      if (selectedDate) {
        const evDateNormalized = (ev.date || "").toUpperCase().trim();
        const selDateNormalized = selectedDate.toUpperCase().trim();
        if (
          !evDateNormalized.includes(selDateNormalized) &&
          !selDateNormalized.includes(evDateNormalized)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [events, searchQuery, selectedCategory, selectedLocation, selectedDate]);

  // Total pages
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / ITEMS_PER_PAGE));

  // Current page items (Exactly 3 cards)
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050807] text-[#18181b] dark:text-[#f2eee3] flex flex-col font-sans selection:bg-[#9333ea] selection:text-white dark:selection:bg-[#b89245] dark:selection:text-[#050807] transition-colors duration-300">
      {/* Top Navbar (Kept unchanged) */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="EVENT"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Book Introduction Header / Breadcrumbs (Kept unchanged) */}
      <EventsHeader title="Book Introduction" />

      {/* Main Events Section */}
      <section className="py-10 sm:py-14 lg:py-16 bg-[#faf7fd]/60 dark:bg-[#050807] flex-1 transition-colors duration-300">
        <div className="container-custom space-y-10 sm:space-y-12">
          
          {/* 1. Filter Bar with Search, Dropdowns, and Calendar on Upcoming */}
          <EventsSearchFilter
            searchQuery={searchQuery}
            onSearchChange={(q) => {
              setSearchQuery(q);
              setCurrentPage(1);
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            selectedLocation={selectedLocation}
            onLocationChange={(loc) => {
              setSelectedLocation(loc);
              setCurrentPage(1);
            }}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setCurrentPage(1);
            }}
            onFindEvents={() => {
              setCurrentPage(1);
            }}
          />

          {/* 2. Upcoming Events Section Header with Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[#9333ea] dark:bg-[#d4b56a]" />
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#18181b] dark:text-[#f2eee3] tracking-tight">
                  Upcoming Events
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#71717a] dark:text-[#8e9c93]">
                Don&apos;t miss out on our latest events and activities.
              </p>
            </div>

            {/* Slider / Page Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous events"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed border-[#e9e1f5] dark:border-[#1b3424] text-[#a1a1aa] dark:text-[#8e9c93]"
                    : "border-[#e9e1f5] dark:border-[#1b3424] bg-white dark:bg-transparent text-[#71717a] dark:text-[#8e9c93] hover:border-[#9333ea] dark:hover:border-[#d4b56a] hover:text-[#9333ea] dark:hover:text-[#f2eee3] hover:bg-[#f6f0fc] dark:hover:bg-[#0c1810] shadow-2xs cursor-pointer"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                aria-label="Next events"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                  currentPage >= totalPages
                    ? "opacity-40 cursor-not-allowed border-[#e9e1f5] dark:border-[#1b3424] text-[#a1a1aa] dark:text-[#8e9c93]"
                    : "border-[#e9e1f5] dark:border-[#1b3424] bg-white dark:bg-transparent text-[#71717a] dark:text-[#8e9c93] hover:border-[#9333ea] dark:hover:border-[#d4b56a] hover:text-[#9333ea] dark:hover:text-[#f2eee3] hover:bg-[#f6f0fc] dark:hover:bg-[#0c1810] shadow-2xs cursor-pointer"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. 3-Column Grid with Exactly 3 Cards per view */}
          {paginatedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {paginatedEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-[#070e0a] border border-[#e9e1f5] dark:border-[#16291d] rounded-2xl space-y-3 shadow-xs">
              <p className="font-display text-2xl text-[#18181b] dark:text-[#dedacf]">
                No events found matching your criteria
              </p>
              <p className="text-xs text-[#71717a] dark:text-[#8e9c93]">
                Try adjusting your search query, calendar date or filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                  setSelectedLocation("All Locations");
                  setSelectedDate(null);
                  setCurrentPage(1);
                }}
                className="mt-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#9333ea] dark:text-[#d4b56a] border border-[#9333ea]/40 dark:border-[#d4b56a]/40 rounded-full hover:bg-[#faf5ff] dark:hover:bg-[#122418] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* 4. Bottom Pagination */}
          <div className="flex items-center justify-center gap-3 pt-6 sm:pt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-full text-xs transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#9333ea] text-white dark:bg-[#d4b56a] dark:text-[#050807] font-bold shadow-lg shadow-[#9333ea]/20 dark:shadow-[#d4b56a]/20 scale-105"
                    : "border border-[#e9e1f5] dark:border-[#1b3424] bg-white dark:bg-transparent text-[#71717a] dark:text-[#8e9c93] hover:border-[#9333ea] dark:hover:border-[#d4b56a] hover:text-[#9333ea] dark:hover:text-[#f2eee3] shadow-2xs"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {totalPages > 1 && (
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => (p < totalPages ? p + 1 : 1))
                }
                aria-label="Next page"
                className="w-9 h-9 rounded-full border border-[#e9e1f5] dark:border-[#1b3424] bg-white dark:bg-transparent text-[#71717a] dark:text-[#8e9c93] hover:border-[#9333ea] dark:hover:border-[#d4b56a] hover:text-[#9333ea] dark:hover:text-[#f2eee3] text-xs flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Site Footer (Kept unchanged) */}
      <Footer />

      {/* Cart Drawer & Search Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
