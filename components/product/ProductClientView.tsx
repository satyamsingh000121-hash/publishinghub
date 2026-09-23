"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDetailView from "@/components/BookDetailView";
import SearchModal from "@/components/SearchModal";
import { BookDetailData } from "@/lib/books";
import { Check } from "lucide-react";

interface ProductClientViewProps {
  book: BookDetailData;
}

export default function ProductClientView({ book }: ProductClientViewProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (
    title: string = book.title,
  ) => {
    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#03100b] text-[#18181b] dark:text-[#f2eee3] flex flex-col justify-between selection:bg-[#b89245] selection:text-white transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e3527] text-white border border-[#2c7650] px-4 py-3 rounded-[2px] shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        activeTab="SHOP"
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Single Book Product View */}
      <div className="flex-1">
        <BookDetailView
          key={book.id || book.slug}
          book={book}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
