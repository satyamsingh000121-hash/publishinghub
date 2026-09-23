"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDetailView from "@/components/BookDetailView";
import SearchModal from "@/components/SearchModal";
import { getBookBySlug } from "@/lib/books";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const slugParam = searchParams.get("slug") || searchParams.get("id") || "a-poem-for-every-night";
  const bookData = getBookBySlug(slugParam);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-[#03100b] text-[#18181b] dark:text-[#f2eee3] flex flex-col justify-between selection:bg-[#b89245] selection:text-white transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar
        activeTab="SHOP"
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Single Book Product View */}
      <div className="flex-1">
        <BookDetailView
          key={bookData.slug || slugParam}
          book={bookData}
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

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050807] text-[#f2eee3] flex items-center justify-center">Loading book details...</div>}>
      <ProductDetailContent />
    </Suspense>
  );
}
