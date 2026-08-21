"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutVideoSection from "@/components/about/AboutVideoSection";
import AboutSponsors from "@/components/about/AboutSponsors";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { Check } from "lucide-react";

export default function AboutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState<any>(null);
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
    <main className="min-h-screen bg-[#050807] text-[#f2eee3] flex flex-col font-sans selection:bg-[#b89245] selection:text-[#050807]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d2a1d] border border-[#d4b56a] text-[#f2eee3] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar & Navbar with activeTab="ABOUT US" */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="ABOUT US"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 1. Hero Banner: A Monthly Book Review Publication */}
      <AboutHero />

      {/* 2. Intro Section: Gold Feather Medallion & Editorial Statement */}
      <AboutIntro />

      {/* 3. 3-Column Features Grid: Trending, Featured, Books */}
      <AboutFeatures />

      {/* 4. Testimonials Section: Read Reviews by My Readers */}
      <AboutTestimonials />

      {/* 5. Video Review Spotlight: How to make a Deal with side labels & player */}
      <AboutVideoSection />

      {/* 6. Sponsors & Affiliates Row: 6 Brand Badges */}
      <AboutSponsors />

      {/* 7. Site Footer */}
      <Footer />

      {/* Interactive Cart & Modals */}
      <QuickViewModal
        book={quickViewBook}
        onClose={() => setQuickViewBook(null)}
        onAddToCart={(title) => handleAddToCart(title)}
      />

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
