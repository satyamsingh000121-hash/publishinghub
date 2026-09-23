"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactMap from "@/components/contact/ContactMap";
import ContactForm from "@/components/contact/ContactForm";
import SearchModal from "@/components/SearchModal";
import { Check } from "lucide-react";

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

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
        activeTab="CONTACT US"
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 1. Contact Header Banner / Breadcrumbs */}
      <ContactHeader />

      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#050807] transition-colors duration-300">
        <div className="container-custom space-y-12 sm:space-y-16">
          {/* 1. Contact Info Cards (3 Columns) */}
          <ContactInfo />

          {/* 2. Interactive Google Map */}
          <ContactMap />

          {/* 3. Send A Message Form */}
          <ContactForm onSuccessToast={handleShowToast} />
        </div>
      </section>

      {/* Site Footer */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
