"use client";

import React, { useState, use } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDetailView from "@/components/BookDetailView";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import { getBookBySlug } from "@/lib/books";
import { Check } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default function DynamicProductPage(props: ProductPageProps) {
  // Support both Promise params (Next 15) and standard useParams
  const routeParams = useParams();
  let rawSlug = "";

  if (routeParams?.slug) {
    rawSlug = Array.isArray(routeParams.slug) ? routeParams.slug[0] : routeParams.slug;
  } else if (props?.params) {
    // If params is a promise
    if (typeof (props.params as Promise<{ slug: string }>).then === "function") {
      try {
        const unwrapped = use(props.params as Promise<{ slug: string }>);
        rawSlug = unwrapped.slug;
      } catch {
        rawSlug = "a-poem-for-every-night";
      }
    } else {
      rawSlug = (props.params as { slug: string }).slug || "";
    }
  }

  const slug = rawSlug || "a-poem-for-every-night";
  const bookData = getBookBySlug(slug);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "cart-initial",
      title: bookData.title,
      price: bookData.price || "£20.00",
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (
    title: string = bookData.title,
    price: string = bookData.price || "£20.00",
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === title);
      if (existing) {
        return prev.map((item) =>
          item.title === title ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          title,
          price,
          quantity,
        },
      ];
    });

    setToastMessage(`"${title}" added to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
          key={bookData.slug || slug}
          book={bookData}
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
