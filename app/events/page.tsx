"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventsHeader from "@/components/events/EventsHeader";
import EventsSearchFilter from "@/components/events/EventsSearchFilter";
import EventCard, { EventItem } from "@/components/events/EventCard";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { Check, X, MapPin, Clock, Calendar, Sparkles } from "lucide-react";

const INITIAL_EVENTS: EventItem[] = [
  {
    id: "event-1",
    date: "FEBRUARY 1",
    title: "Books with Berke",
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
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;

    setRsvpSubmitted(true);
    setToastMessage(`Seat reserved for "${selectedEvent?.title}"! Confirmation sent to ${rsvpEmail}.`);
    
    setTimeout(() => {
      setSelectedEvent(null);
      setRsvpName("");
      setRsvpEmail("");
      setRsvpSubmitted(false);
    }, 2000);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen dark:bg-[#050807] bg-white dark:text-[#f2eee3] text-[#18181b] flex flex-col font-sans selection:bg-[#b89245] selection:text-[#050807] transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 dark:bg-[#0d2a1d] bg-[#f3e8ff] border dark:border-[#d4b56a] border-[#9333ea] dark:text-[#f2eee3] text-[#581c87] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 dark:text-[#d4b56a] text-[#9333ea]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar with activeTab="EVENTS" */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="EVENTS"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Page Title & Breadcrumbs Banner matching reference */}
      <EventsHeader title="Book Introduction" />

      {/* Main Events Container */}
      <section className="py-12 sm:py-16 dark:bg-[#050807] bg-white flex-1 transition-colors duration-300">
        <div className="container-custom space-y-12 sm:space-y-16">
          
          {/* Top Search Bar & Mini Calendar Filter Bar matching reference image */}
          <EventsSearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFindEvents={() => {}}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          {/* Latest Events Section */}
          <div className="space-y-8">
            {/* Section Heading matching reference design */}
            <div className="flex items-center gap-3">
              <h2 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#d4b56a] text-[#9333ea] tracking-tight">
                Latest Events
              </h2>
              <span className="h-[1px] flex-1 dark:bg-[#f2eee3]/10 bg-[#e9e1f5]" />
            </div>

            {/* 2-Column Grid of Event Cards matching reference */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                {filteredEvents.map((ev) => (
                  <EventCard
                    key={ev.id}
                    event={ev}
                    onSelectEvent={(item) => setSelectedEvent(item)}
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

      {/* Interactive RSVP / Event Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-lg dark:bg-[#070e0a] bg-white border dark:border-[#d4b56a]/50 border-[#e9e1f5] rounded-lg p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] pb-4">
              <div>
                <span className="text-[10px] tracking-[0.22em] dark:text-[#d4b56a] text-[#9333ea] font-bold uppercase block">
                  EVENT DETAILS &amp; RSVP
                </span>
                <h3 className="font-display text-2xl dark:text-[#f2eee3] text-[#18181b] font-medium mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="dark:text-[#888b83] text-[#71717a] hover:text-[#18181b] dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Event Info Details */}
            <div className="space-y-3 text-xs sm:text-[13px] dark:text-[#dedacf] text-[#3f3f46]">
              <p className="dark:text-[#9a9d95] text-[#71717a] leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="p-3.5 dark:bg-[#0c1611] bg-[#faf5ff] border dark:border-[#f2eee3]/10 border-[#e9d5ff] rounded-xs space-y-2 font-serif italic text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#d4b56a]" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4b56a]" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#d4b56a]" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            {/* RSVP Form */}
            {rsvpSubmitted ? (
              <div className="p-4 bg-[#122319] border border-[#2c7650] rounded-xs text-center space-y-1">
                <Check className="w-6 h-6 text-[#d4b56a] mx-auto" />
                <p className="text-xs font-semibold text-white">Your RSVP is confirmed!</p>
                <p className="text-[11px] text-[#9a9d95]">We look forward to seeing you there.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider dark:text-[#888b83] text-[#71717a] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2 text-xs dark:bg-[#0d1611] bg-white border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs dark:text-[#f2eee3] text-[#18181b] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider dark:text-[#888b83] text-[#71717a] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2 text-xs dark:bg-[#0d1611] bg-white border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs dark:text-[#f2eee3] text-[#18181b] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="px-4 py-2 border dark:border-[#f2eee3]/20 border-[#e9e1f5] hover:border-[#9333ea] dark:hover:border-[#888b83] text-xs font-semibold dark:text-[#dedacf] text-[#71717a] rounded-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#185238] hover:bg-[#236b4a] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-lg flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d4b56a]" />
                    Reserve Seat
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

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
