"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import ContactForm from "@/components/contact/ContactForm";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { Check } from "lucide-react";

export default function ContactPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
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

      {/* Top Navbar with activeTab="CONTACT US" */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="CONTACT US"
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Page Title & Breadcrumbs Banner */}
      <ContactHeader />

      {/* Main Content Section */}
      <section className="py-16 sm:py-24 dark:bg-[#050807] bg-white flex-1 transition-colors duration-300">
        <div className="container-custom space-y-16 sm:space-y-24">
          {/* 1. Keep In Touch With Us & 3-Column Info */}
          <ContactInfo />

          {/* 2. Interactive Google Map */}
          <ContactMap />

          {/* 3. Send A Message Form */}
          <ContactForm onSuccessToast={handleShowToast} />
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
