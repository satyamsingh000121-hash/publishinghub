"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDetailView from "@/components/BookDetailView";
import SearchModal from "@/components/SearchModal";

export default function SingleBookPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050807] text-[#18181b] dark:text-[#f2eee3] flex flex-col justify-between selection:bg-[#b89245] selection:text-white transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar
        activeTab="SHOP"
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Single Book Product View */}
      <div className="flex-1">
        <BookDetailView />
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
