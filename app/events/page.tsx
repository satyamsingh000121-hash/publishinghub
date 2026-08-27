"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsHeader from "@/components/events/EventsHeader";
import EventsSearchFilter from "@/components/events/EventsSearchFilter";
import EventCard, { EventItem } from "@/components/events/EventCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "event-1",
    date: "FEBRUARY 1",
    title: "Books with Berke",
    slug: "books-with-berke",
    location: "3222 S 169th St Seattle, WA United States",
    time: "8:00 am - 11:00 am",
    image: "/images/hero4.png",
    fallbackImage: "/images/shop1.jpg",
    category: "LITERARY TALK",
    description:
      "Join celebrated author and literary critic Berke for an intimate morning discussion on modern literature, storytelling craft, and the creative journey behind contemporary bestsellers.",
  },
  {
    id: "event-2",
    date: "DECEMBER 1",
    title: "Guide presents a reading corner",
    slug: "guide-presents-a-reading-corner",
    location: "3222 S 169th St Seattle, WA United States",
    time: "8:00 am - 11:00 am",
    image: "/images/shop2.jpg",
    fallbackImage: "/images/shop3.jpg",
    category: "COMMUNITY READING",
    description:
      "An open community gathering and guided reading session in our tranquil corner. Discover curated literary collections, insightful book reviews, and thoughtful reader discussions.",
  },
  {
    id: "event-3",
    date: "DECEMBER 1",
    title: "Introducing New Works",
    slug: "introducing-new-works",
    location: "3222 S 169th St Seattle, WA United States",
    time: "8:00 am - 11:00 am",
    image: "/images/shop5.jpg",
    fallbackImage: "/images/shop8.jpg",
    category: "BOOK LAUNCH",
    description:
      "Exclusive premier showcase and author presentations of groundbreaking new publications, special collector art editions, and insightful behind-the-scenes publishing previews.",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<number | null>(21);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter events based on search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.date.toLowerCase().includes(q) ||
        ev.description?.toLowerCase().includes(q)
    );
  }, [events, searchQuery]);

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen dark:bg-[#050807] bg-white dark:text-[#f2eee3] text-[#18181b] flex flex-col font-sans selection:bg-[#b89245] selection:text-[#050807] transition-colors duration-300">
      {/* Top Navbar with activeTab="EVENT" */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="EVENT"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Page Title & Breadcrumbs Banner */}
      <EventsHeader title="Book Introduction" />

      {/* Main Events Container */}
      <section className="py-12 sm:py-16 dark:bg-[#050807] bg-white flex-1 transition-colors duration-300">
        <div className="container-custom space-y-12 sm:space-y-16">
          
          {/* Top Search Bar & Mini Calendar Filter Bar */}
          <EventsSearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFindEvents={() => {}}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* Latest Events Section */}
          <div className="space-y-8">
            {/* Section Heading */}
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#d4b56a] text-[#9333ea] tracking-tight">
                Latest Events
              </h2>
              <span className="h-[1px] flex-1 dark:bg-[#f2eee3]/10 bg-[#e9e1f5]" />
            </div>

            {/* 2-Column Grid of Event Cards */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                {filteredEvents.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 dark:bg-[#070e0a] bg-[#faf7fd] border dark:border-[#f2eee3]/10 border-[#e9e1f5] rounded-xs space-y-3">
                <p className="font-display text-2xl dark:text-[#dedacf] text-[#18181b]">
                  No events found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs dark:text-[#888b83] text-[#71717a]">
                  Try searching with different keywords or clear the search filter.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider dark:text-[#d4b56a] text-[#9333ea] border dark:border-[#d4b56a]/40 border-[#9333ea]/40 hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Site Footer */}
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
