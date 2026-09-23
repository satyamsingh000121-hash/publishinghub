"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoCards from "@/components/PromoCards";
import BestsellerSection from "@/components/BestsellerSection";
import OfferBanner from "@/components/OfferBanner";
import AuthorSection from "@/components/AuthorSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import EventsNewsletterSection from "@/components/EventsNewsletterSection";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import { Check } from "lucide-react";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (title: string) => {
    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#050807] text-[#f2eee3] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d2a1d] border border-[#d4b56a] text-[#f2eee3] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar & Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Hero Section */}
      <Hero />

      {/* 6-Tile Promo Grid */}
      <PromoCards />

      {/* Bestseller Books Grid & Tabs */}
      <BestsellerSection
        onAddToCart={(title) => handleAddToCart(title)}
      />

      {/* Limited Time Full-Width Offer Banner */}
      <OfferBanner />

      {/* Author of the Month Spotlight */}
      <AuthorSection />

      {/* Our Newest Arrivals */}
      <NewArrivalsSection
        onAddToCart={(title) => handleAddToCart(title)}
      />

      {/* Bookshop Events & Newsletter Updates */}
      <EventsNewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
