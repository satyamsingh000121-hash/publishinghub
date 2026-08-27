"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";

interface EventData {
  title: string;
  date: string;
  image: string;
}

const EVENTS_MAP: Record<string, EventData> = {
  "books-with-berke": {
    title: "Books with Berke",
    date: "FEBRUARY 1",
    image: "/images/hero4.png",
  },
  "guide-presents-a-reading-corner": {
    title: "Guide presents a reading corner",
    date: "DECEMBER 1",
    image: "/images/shop2.jpg",
  },
  "introducing-new-works": {
    title: "Introducing New Works",
    date: "DECEMBER 1",
    image: "/images/shop5.jpg",
  },
};

export default function DynamicEventPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "books-with-berke";
  const slug = rawSlug.toLowerCase();

  const event = EVENTS_MAP[slug] || {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    date: "DECEMBER 1",
    image: "/images/hero4.png",
  };

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen dark:bg-[#050807] bg-white dark:text-[#f2eee3] text-[#18181b] font-sans selection:bg-[#d4b56a]/30 selection:text-[#f2eee3] transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        showAnnouncement={true}
      />

      {/* ========================================================================= */}
      {/* HERO SECTION                                                              */}
      {/* ========================================================================= */}
      <section className="relative w-full min-h-[420px] sm:min-h-[500px] md:min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Centered Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto space-y-2 pt-8 sm:pt-12">
          {/* Subtitle Date Tag */}
          <span className="text-[11px] sm:text-xs tracking-[0.2em] font-bold text-white uppercase block drop-shadow">
            {event.date}
          </span>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-md">
            {event.title}
          </h1>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN CONTENT CONTAINER                                                    */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Top Two Paragraphs */}
        <div className="space-y-6 text-xs sm:text-sm md:text-[14px] leading-relaxed dark:text-[#a8a9a2] text-[#555] font-normal">
          <p>
            Auteur is a monthly book review publication distributed to 400,000 avid
            readers through subscribing bookstores and public libraries. Founded in 1988
            and located in Nashville, Tennessee, BookPage serves as a broad-based
            selection guide to the best new books published every month.
          </p>
          <p>
            Auteur is a monthly book review publication distributed to 400,000 avid
            readers through subscribing bookstores and public libraries. Founded in 1988
            and located in Nashville, Tennessee, BookPage serves as a broad-based
            selection guide to the best new books published every month.
          </p>
        </div>

        {/* Static Countdown Timer */}
        <div className="py-4 sm:py-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-4 sm:gap-8 text-center items-center">
            
            {/* Days */}
            <div className="space-y-1.5">
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#c85a32] dark:text-[#d4b56a] tracking-tight block">
                00
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold dark:text-[#888b83] text-[#888] uppercase block">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="space-y-1.5 relative">
              <span className="absolute -left-2 sm:-left-4 top-1/3 -translate-y-1/2 text-2xl sm:text-4xl text-[#c85a32]/60 dark:text-[#d4b56a]/60 font-display">
                :
              </span>
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#c85a32] dark:text-[#d4b56a] tracking-tight block">
                00
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold dark:text-[#888b83] text-[#888] uppercase block">
                HOURS
              </span>
            </div>

            {/* Minutes */}
            <div className="space-y-1.5 relative">
              <span className="absolute -left-2 sm:-left-4 top-1/3 -translate-y-1/2 text-2xl sm:text-4xl text-[#c85a32]/60 dark:text-[#d4b56a]/60 font-display">
                :
              </span>
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#c85a32] dark:text-[#d4b56a] tracking-tight block">
                00
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold dark:text-[#888b83] text-[#888] uppercase block">
                MINS
              </span>
            </div>

            {/* Seconds */}
            <div className="space-y-1.5 relative">
              <span className="absolute -left-2 sm:-left-4 top-1/3 -translate-y-1/2 text-2xl sm:text-4xl text-[#c85a32]/60 dark:text-[#d4b56a]/60 font-display">
                :
              </span>
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#c85a32] dark:text-[#d4b56a] tracking-tight block">
                00
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-semibold dark:text-[#888b83] text-[#888] uppercase block">
                SECS
              </span>
            </div>

          </div>
        </div>

        {/* "More value from less work." Section */}
        <div className="space-y-5 pt-4">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-medium dark:text-[#f2eee3] text-[#18181b] tracking-tight">
            More value from less work.
          </h2>

          <div className="space-y-5 text-xs sm:text-sm md:text-[14px] leading-relaxed dark:text-[#a8a9a2] text-[#555] font-normal">
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
              nesciunt.
            </p>
          </div>
        </div>

      </section>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
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
