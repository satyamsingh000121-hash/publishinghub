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
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { Check } from "lucide-react";

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (title: string, price: string = "£18.00") => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === title);
      if (existing) {
        return prev.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: Math.random().toString(), title, price, quantity: 1 }];
    });

    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
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

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
