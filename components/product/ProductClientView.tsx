"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDetailView from "@/components/BookDetailView";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { BookDetailData } from "@/lib/books";
import { Check } from "lucide-react";

interface ProductClientViewProps {
  book: BookDetailData;
}

export default function ProductClientView({ book }: ProductClientViewProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("publishinghub_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage whenever it changes
  const updateCart = (newItems: CartItem[]) => {
    setCartItems(newItems);
    try {
      localStorage.setItem("publishinghub_cart", JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const handleAddToCart = (
    title: string = book.title,
    price: string = book.price || "£20.00",
    quantity: number = 1,
    productId?: string,
    image?: string
  ) => {
    const targetId = productId || book.id || `cart-${Date.now()}`;
    const targetImage = image || book.image || "/images/shop1.jpg";

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === targetId || item.title === title);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [
          ...prev,
          {
            id: targetId,
            title,
            price,
            quantity,
            image: targetImage,
          },
        ];
      }
      try {
        localStorage.setItem("publishinghub_cart", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050807] text-[#18181b] dark:text-[#f2eee3] flex flex-col justify-between selection:bg-[#b89245] selection:text-white transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e3527] text-white border border-[#2c7650] px-4 py-3 rounded-[2px] shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        activeTab="SHOP"
        onOpenCart={() => setIsCartOpen(true)}
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

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </main>
  );
}
