"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  X,
  Minus,
  Plus,
  Tag,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Sparkles,
  PlusCircle,
} from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug?: string;
  author?: string;
};

type RecommendedBook = {
  id: number;
  name: string;
  author: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  slug: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Bulle und Pelle",
      author: "By Sero Glan, Shia Ung",
      price: 28,
      image: "/images/Newest5.webp",
      quantity: 2,
      slug: "bulle-und-pelle",
    },
    {
      id: 2,
      name: "The Carrot Hunt",
      author: "By Noreen Harris",
      price: 19,
      image: "/images/shop5.jpg",
      quantity: 2,
      slug: "the-carrot-plan",
    },
    {
      id: 3,
      name: "All this has nothing to do with Me",
      author: "By Bhuzun Nahlam",
      price: 20,
      image: "/images/shop2.jpg",
      quantity: 1,
      slug: "all-this-has-nothing-to-do-with-me",
    },
    {
      id: 4,
      name: "Dear Brain",
      author: "By Mesho Buvahr",
      price: 18,
      image: "/images/shop4.jpg",
      quantity: 1,
      slug: "dear-brain",
    },
  ]);

  const recommendedBooks: RecommendedBook[] = [
    {
      id: 101,
      name: "A Poem for Every Night",
      author: "By Hof Nurgin & Chai Iam",
      price: 22,
      oldPrice: 26,
      image: "/images/Newest2.webp",
      category: "Poetry",
      slug: "a-poem-for-every-night",
    },
    {
      id: 102,
      name: "A Teaspoon of Earth and Sea",
      author: "By Dina Nayeri",
      price: 20,
      oldPrice: 24,
      image: "/images/shop1.jpg",
      category: "Fiction",
      slug: "a-teaspoon-of-earth-and-sea",
    },
    {
      id: 103,
      name: "The Journey of Visions to Victory",
      author: "By Santosh Kumar Mishra",
      price: 35,
      oldPrice: 42,
      image: "/images/book_section1.png",
      category: "Bestseller",
      slug: "the-journey-of-visions-to-victory",
    },
    {
      id: 104,
      name: "Creative Life",
      author: "By Hana Kim, Savanna Walker",
      price: 18,
      oldPrice: 22,
      image: "/images/shop3.jpg",
      category: "Self Growth",
      slug: "creative-life",
    },
  ];

  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const increaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    setCartItems((items) => items.filter((item) => item.id !== id));
    if (itemToRemove) {
      showToast(`"${itemToRemove.name}" removed from cart`);
    }
  };

  const addRecommendedToCart = (book: RecommendedBook) => {
    const existing = cartItems.find((item) => item.name === book.name);
    if (existing) {
      increaseQuantity(existing.id);
      showToast(`Updated quantity of "${book.name}" in cart!`);
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        name: book.name,
        author: book.author,
        price: book.price,
        image: book.image,
        quantity: 1,
        slug: book.slug,
      };
      setCartItems((prev) => [newItem, ...prev]);
      showToast(`"${book.name}" added to your cart!`);
    }
  };

  const handleApplyCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = coupon.trim().toUpperCase();
    if (!trimmed) {
      setCouponMessage({ text: "Please enter a valid coupon code", type: "error" });
      return;
    }

    if (trimmed === "SUMMER30" || trimmed === "DISCOUNT30") {
      setAppliedDiscount(0.3);
      setCouponMessage({ text: "Coupon applied! 30% discount deducted.", type: "success" });
      showToast("Coupon applied: 30% OFF!");
    } else if (trimmed === "SAVE10" || trimmed === "WELCOME10") {
      setAppliedDiscount(0.1);
      setCouponMessage({ text: "Coupon applied! 10% discount deducted.", type: "success" });
      showToast("Coupon applied: 10% OFF!");
    } else {
      setAppliedDiscount(0.15);
      setCouponMessage({ text: `Coupon "${trimmed}" applied! 15% discount deducted.`, type: "success" });
      showToast(`Coupon "${trimmed}" applied!`);
    }
  };

  const handleUpdateCart = () => {
    showToast("Cart updated successfully!");
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = subtotal * appliedDiscount;
  const grandTotal = Math.max(0, subtotal - discountAmount);
  const totalCartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#faf8fd] dark:bg-[#020b08] text-zinc-900 dark:text-[#f2eee3] flex flex-col justify-between selection:bg-purple-200 selection:text-purple-900 dark:selection:bg-[#d4b56a] dark:selection:text-[#020b08] transition-colors duration-200">
      <div>
        {/* =====================================================
            TOP NAVBAR
        ====================================================== */}
        <Navbar cartCount={totalCartCount} activeTab="SHOP" />

        {/* =====================================================
            PREMIUM EDITORIAL HEADER BANNER
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-purple-100 dark:border-[#1f4a38]/60 bg-gradient-to-b from-[#f8f4fc] via-[#faf7fd] to-white dark:from-[#03110c] dark:via-[#020b08] dark:to-[#010705] py-10 sm:py-14">
          {/* Subtle Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-[700px] h-[250px] bg-[radial-gradient(ellipse_at_center,_rgba(147,51,234,0.07)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(212,181,106,0.12)_0%,_transparent_70%)] blur-3xl" />
            <div className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.06)_0%,_transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(44,118,80,0.22)_0%,_transparent_70%)] blur-2xl" />
          </div>

          <div className="max-w-[1180px] mx-auto px-5 lg:px-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-normal tracking-tight text-zinc-900 dark:text-[#f4eee3] leading-none">
                Shopping Cart
              </h1>
            </div>

            {/* Breadcrumb & Step Progression */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <nav className="flex items-center gap-2 text-xs sm:text-sm">
                <Link href="/" className="text-zinc-500 hover:text-purple-600 dark:text-[#8e968f] dark:hover:text-[#e7b941] transition">
                  Home
                </Link>
                <span className="text-zinc-300 dark:text-[#8e968f]/50">/</span>
                <Link href="/shop" className="text-zinc-500 hover:text-purple-600 dark:text-[#8e968f] dark:hover:text-[#e7b941] transition">
                  Shop
                </Link>
                <span className="text-zinc-300 dark:text-[#8e968f]/50">/</span>
                <span className="text-purple-700 dark:text-[#e7b941] font-semibold">Cart</span>
              </nav>
            </div>
          </div>
        </section>

        {/* =====================================================
            CART MAIN CONTENT
        ====================================================== */}
        <main className="max-w-[1180px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-white text-zinc-900 border border-purple-200 shadow-2xl dark:bg-[#0d2a1d] dark:text-[#f2eee3] dark:border-[#d4b56a]/60 px-5 py-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-[#d4b56a]" />
              <span className="text-sm font-medium">{toastMessage}</span>
            </div>
          )}

          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="border border-purple-100 dark:border-[#1f4a38] rounded-2xl p-10 sm:p-16 bg-white dark:bg-[#03110d] text-center space-y-6 shadow-xl shadow-purple-500/5">
              <div className="w-20 h-20 mx-auto rounded-full bg-purple-50 dark:bg-[#062016] border border-purple-200 dark:border-[#d4b56a]/40 flex items-center justify-center text-purple-600 dark:text-[#e7b941]">
                <ShoppingBag size={34} />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-[#f4eee3]">Your bag is currently empty</h2>
                <p className="text-sm text-zinc-500 dark:text-[#8a9890] max-w-md mx-auto">
                  Browse our hand-picked collection of timeless literature, bestsellers, and newly released author works.
                </p>
              </div>
              <div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white dark:bg-gradient-to-r dark:from-[#dcae48] dark:to-[#f1c661] dark:text-[#07100c] rounded-md text-xs font-black tracking-wider uppercase transition shadow-lg shadow-purple-500/20"
                >
                  <ShoppingBag size={16} />
                  Explore The Bookshop
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* CART TABLE CONTAINER */}
              <section className="border border-purple-100 dark:border-[#1f4d3a] rounded-2xl p-2 sm:p-3 bg-white dark:bg-[#03110d] shadow-xl shadow-purple-500/5">
                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-[2.5fr_0.7fr_1fr_0.8fr_50px] items-center px-6 py-3.5 text-purple-700 dark:text-[#e7b941] text-[11px] font-bold tracking-[0.2em] uppercase border-b border-purple-100 dark:border-[#133c2c]/80">
                  <div>PRODUCT</div>
                  <div>PRICE</div>
                  <div>QUANTITY</div>
                  <div>TOTAL</div>
                  <div className="text-right">REMOVE</div>
                </div>

                {/* Items List */}
                <div className="space-y-2.5 mt-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="group border border-purple-100/80 dark:border-[#143d2e] rounded-xl bg-[#faf8fd] hover:bg-white dark:bg-[#020e0b] hover:border-purple-300 dark:hover:border-[#276e52] transition-all duration-300 p-4 sm:p-4 shadow-xs"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[2.5fr_0.7fr_1fr_0.8fr_50px] items-center gap-4">
                        {/* Product info with image */}
                        <div className="flex items-center gap-4 sm:gap-5">
                          <div className="w-[72px] h-[90px] sm:w-[82px] sm:h-[94px] shrink-0 rounded-md overflow-hidden border border-purple-200 dark:border-[#d39d20]/80 bg-white dark:bg-[#0c1f18] shadow-sm flex items-center justify-center relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/shop1.jpg";
                              }}
                            />
                          </div>

                          <div className="min-w-0">
                            <h3 className="font-serif text-[16px] sm:text-[18px] leading-snug text-zinc-900 dark:text-[#f4eee3] hover:text-purple-600 dark:hover:text-[#e7b941] transition font-medium">
                              <Link href={item.slug ? `/product/${item.slug}` : "/shop"}>
                                {item.name}
                              </Link>
                            </h3>
                            {item.author && (
                              <p className="text-xs text-zinc-500 dark:text-[#8c9c92] mt-0.5">{item.author}</p>
                            )}
                            <p className="text-xs text-purple-700 dark:text-[#d4b56a] font-semibold mt-1 md:hidden">
                              £{item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden md:block font-serif text-[16px] text-zinc-800 dark:text-[#e0dcd2]">
                          £{item.price.toFixed(2)}
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center justify-between md:justify-start">
                          <span className="text-xs text-zinc-500 dark:text-[#8c9c92] md:hidden">Quantity:</span>
                          <div className="flex items-center h-[38px] w-[124px] border border-purple-200 dark:border-[#1f4d3a] bg-white dark:bg-[#051811] rounded-xl overflow-hidden shadow-xs">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-[38px] h-full flex items-center justify-center text-zinc-700 hover:text-purple-700 hover:bg-purple-50 dark:text-[#f2eee3] dark:hover:text-[#e7b941] dark:hover:bg-[#0c2b20] transition active:scale-90"
                              title="Decrease"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="flex-1 text-center text-[15px] font-medium text-zinc-900 dark:text-white select-none">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="w-[38px] h-full flex items-center justify-center text-zinc-700 hover:text-purple-700 hover:bg-purple-50 dark:text-[#f2eee3] dark:hover:text-[#e7b941] dark:hover:bg-[#0c2b20] transition active:scale-90"
                              title="Increase"
                              aria-label="Increase quantity"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="flex items-center justify-between md:justify-start">
                          <span className="text-xs text-zinc-500 dark:text-[#8c9c92] md:hidden">Subtotal:</span>
                          <div className="text-purple-700 dark:text-[#e7b941] font-semibold text-[17px]">
                            £{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        {/* Remove Action */}
                        <div className="flex justify-end md:justify-end">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="w-[32px] h-[32px] rounded-full border border-purple-200 dark:border-[#d49e24]/60 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 dark:text-[#e7b941] dark:hover:bg-[#d49e24] dark:hover:text-[#07100c] transition-all duration-200"
                            title="Remove book from cart"
                            aria-label={`Remove ${item.name}`}
                          >
                            <X size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Bar & Table Subtotal */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-3 sm:px-4 py-4 mt-3 border-t border-purple-100 dark:border-[#143d2e]">
                  {/* Coupon Form */}
                  <form
                    onSubmit={handleApplyCoupon}
                    className="flex items-center w-full sm:w-[370px] h-[48px] border border-purple-200 dark:border-[#1f4d3a] rounded-xl bg-purple-50/50 dark:bg-[#041a12] overflow-hidden focus-within:border-purple-500 dark:focus-within:border-[#d4a429] transition-colors"
                  >
                    <Tag size={16} className="ml-3.5 text-purple-600 dark:text-[#9ab0a3] shrink-0" />
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Coupon code (e.g. SUMMER30)"
                      className="flex-1 min-w-0 bg-transparent outline-none px-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-[#6a7c72]"
                    />
                    <button
                      type="submit"
                      className="h-[38px] mr-1.5 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white dark:bg-transparent dark:border dark:border-[#d4a429] dark:text-[#e7b941] dark:hover:bg-[#d4a429] dark:hover:text-[#06100c] text-[11px] font-bold tracking-wider transition shrink-0"
                    >
                      APPLY
                    </button>
                  </form>

                  {/* Quick Subtotal Display */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 font-serif text-[16px] px-2 sm:px-0">
                    <span className="text-zinc-500 dark:text-[#8c9c92]">Subtotal</span>
                    <span className="text-purple-700 dark:text-[#e7b941] font-semibold text-[22px]">
                      £{subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon Feedback */}
                {couponMessage && (
                  <div className={`mx-3 sm:mx-4 mb-3 px-3 py-2 rounded-md text-xs flex items-center gap-2 ${
                    couponMessage.type === "success" 
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-[#0b3323] dark:text-[#7ce0b0] dark:border-[#1b6b49]" 
                      : "bg-red-50 text-red-700 border border-red-200 dark:bg-[#331111] dark:text-[#fca5a5] dark:border-[#7f1d1d]"
                  }`}>
                    {couponMessage.type === "success" ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    <span>{couponMessage.text}</span>
                  </div>
                )}
              </section>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
                <Link
                  href="/shop"
                  className="h-[46px] px-6 border border-purple-200 bg-white hover:bg-purple-50 text-purple-700 dark:bg-transparent dark:border-[#d4a429] dark:text-[#e7b941] dark:hover:bg-[#d4a429] dark:hover:text-[#06100c] rounded-lg text-[11px] font-bold tracking-[0.12em] flex items-center justify-center gap-3 transition group shadow-xs"
                >
                  <ShoppingBag size={16} className="group-hover:scale-110 transition-transform text-purple-600 dark:text-[#e7b941]" />
                  CONTINUE SHOPPING
                </Link>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={handleUpdateCart}
                    className="h-[46px] px-7 border border-purple-200 bg-white hover:bg-purple-50 text-purple-700 dark:bg-transparent dark:border-[#d4a429] dark:text-[#e7b941] dark:hover:bg-[#d4a429] dark:hover:text-[#06100c] rounded-lg text-[11px] font-bold tracking-[0.12em] transition shadow-xs"
                  >
                    UPDATE CART
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      alert(`Proceeding to secure checkout! Grand Total: £${grandTotal.toFixed(2)}`);
                    }}
                    className="h-[46px] px-7 bg-purple-600 hover:bg-purple-700 text-white dark:bg-gradient-to-r dark:from-[#dcae48] dark:to-[#f1c661] dark:text-[#07100c] rounded-lg text-[11px] font-black tracking-[0.12em] flex items-center justify-center gap-3 transition shadow-lg shadow-purple-500/20"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* =====================================================
                  PAYMENT & CART TOTALS GRID (Clean Luxury Two-Column)
              ====================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
                {/* LEFT: PAYMENT SECURITY & TRUST FEATURES */}
                <div className="lg:col-span-7 border border-purple-100 dark:border-[#1f4d3a] rounded-2xl bg-white dark:bg-[#03120d] p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-purple-500/5">
                  <div>
                    <div className="flex items-center gap-2 text-purple-700 dark:text-[#e7b941] text-xs font-bold tracking-[0.16em] uppercase mb-3">
                      <ShieldCheck size={18} />
                      <span>GUARANTEED SAFE & SECURE CHECKOUT</span>
                    </div>

                    <h3 className="font-serif text-2xl text-zinc-900 dark:text-[#f4eee3] mb-4">
                      Buy with Complete Peace of Mind
                    </h3>

                    <p className="text-xs text-zinc-500 dark:text-[#8c9c92] leading-relaxed mb-6">
                      Every transaction is protected by bank-level 256-bit SSL encryption. We accept all major cards and digital wallets with zero transaction fees.
                    </p>

                    {/* Supported Payment Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 pb-6 border-b border-purple-100 dark:border-[#143d2e]">
                      {/* VISA */}
                      <div className="h-9 px-4 bg-purple-50/80 border border-purple-200 dark:bg-[#0a2319] dark:border-[#1f4d3a] rounded-md flex items-center justify-center text-xs font-black tracking-widest text-[#2f8ef2] italic shadow-xs">
                        VISA
                      </div>

                      {/* MASTERCARD */}
                      <div className="h-9 px-4 bg-purple-50/80 border border-purple-200 dark:bg-[#0a2319] dark:border-[#1f4d3a] rounded-md flex items-center justify-center gap-1 shadow-xs">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#eb001b] inline-block" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] -ml-2 inline-block opacity-90" />
                        <span className="text-[10px] font-bold text-zinc-800 dark:text-white ml-1">Mastercard</span>
                      </div>

                      {/* AMEX */}
                      <div className="h-9 px-4 bg-[#006fcf] rounded-md flex items-center justify-center text-[10px] font-black text-white tracking-wider shadow-xs">
                        AMEX
                      </div>

                      {/* MAESTRO */}
                      <div className="h-9 px-4 bg-purple-50/80 border border-purple-200 dark:bg-[#0a2319] dark:border-[#1f4d3a] rounded-md flex items-center justify-center text-[10px] font-bold text-[#449bf7] shadow-xs">
                        Maestro
                      </div>

                      {/* APPLE PAY */}
                      <div className="h-9 px-4 bg-purple-50/80 border border-purple-200 dark:bg-[#0a2319] dark:border-[#1f4d3a] rounded-md flex items-center justify-center text-[10px] font-bold text-zinc-900 dark:text-white shadow-xs">
                        Apple Pay
                      </div>
                    </div>

                    {/* Trust Pillar Badges */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100/70 border border-purple-200 text-purple-700 dark:bg-[#08281b] dark:border-[#1f4d3a] dark:text-[#e7b941] flex items-center justify-center shrink-0">
                          <Truck size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-[#f4eee3]">Free UK Shipping</p>
                          <p className="text-[11px] text-zinc-500 dark:text-[#7a8a81]">On orders above £30</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100/70 border border-purple-200 text-purple-700 dark:bg-[#08281b] dark:border-[#1f4d3a] dark:text-[#e7b941] flex items-center justify-center shrink-0">
                          <RotateCcw size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-[#f4eee3]">30-Day Returns</p>
                          <p className="text-[11px] text-zinc-500 dark:text-[#7a8a81]">Hassle-free guarantee</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100/70 border border-purple-200 text-purple-700 dark:bg-[#08281b] dark:border-[#1f4d3a] dark:text-[#e7b941] flex items-center justify-center shrink-0">
                          <Lock size={16} />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-[#f4eee3]">256-Bit SSL</p>
                          <p className="text-[11px] text-zinc-500 dark:text-[#7a8a81]">Encrypted & secure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: CART TOTALS SUMMARY */}
                <div className="lg:col-span-5 border border-purple-200 dark:border-[#d4b56a]/40 rounded-2xl bg-gradient-to-b from-[#faf7fd] to-white dark:from-[#061e15] dark:to-[#03120d] p-6 sm:p-7 shadow-xl shadow-purple-500/5 flex flex-col justify-between relative overflow-hidden">
                  {/* Subtle Corner Glow */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[radial-gradient(circle,_rgba(147,51,234,0.08)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle,_rgba(212,181,106,0.15)_0%,_transparent_70%)] pointer-events-none" />

                  <div>
                    <h2 className="font-serif text-[26px] sm:text-[30px] text-zinc-900 dark:text-[#f4eee3] mb-4 pb-3 border-b border-purple-100 dark:border-[#1f4d3a]">
                      Order Summary
                    </h2>

                    <div className="space-y-3 font-serif">
                      <div className="flex items-center justify-between text-[15px]">
                        <span className="text-zinc-500 dark:text-[#8c9c92]">Subtotal</span>
                        <span className="text-zinc-900 dark:text-[#f4eee3] font-sans font-medium">£{subtotal.toFixed(2)}</span>
                      </div>

                      {appliedDiscount > 0 && (
                        <div className="flex items-center justify-between text-[15px] text-emerald-600 dark:text-[#7ce0b0]">
                          <span>Discount ({Math.round(appliedDiscount * 100)}%)</span>
                          <span className="font-sans font-medium">-£{discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[15px]">
                        <span className="text-zinc-500 dark:text-[#8c9c92]">Delivery</span>
                        <span className="text-emerald-600 dark:text-[#7ce0b0] font-sans text-xs uppercase tracking-wider font-semibold">
                          Free Express UK Delivery
                        </span>
                      </div>

                      <div className="border-t border-purple-100 dark:border-[#d4b56a]/30 my-3" />

                      <div className="flex items-center justify-between text-[18px]">
                        <span className="text-zinc-900 dark:text-[#f4eee3] font-serif font-medium">Estimated Total</span>
                        <span className="text-purple-700 dark:text-[#e7b941] text-[24px] sm:text-[26px] font-sans font-bold">
                          £{grandTotal.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-[#7a8a81] font-sans">
                        Taxes and shipping calculated at checkout
                      </p>
                    </div>
                  </div>

                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={() => {
                        alert(`Proceeding to checkout with ${totalCartCount} item(s)! Total: £${grandTotal.toFixed(2)}`);
                      }}
                      className="w-full h-[48px] bg-purple-600 hover:bg-purple-700 text-white dark:bg-gradient-to-r dark:from-[#dcae48] dark:to-[#f1c661] dark:text-[#07100c] rounded-xl text-xs font-black tracking-[0.14em] flex items-center justify-center gap-3 transition shadow-xl shadow-purple-500/20"
                    >
                      PROCEED TO CHECKOUT
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  RECOMMENDED BOOKS SECTION
              ====================================================== */}
              <section className="mt-16 sm:mt-20 pt-10 border-t border-purple-100 dark:border-[#1f4d3a]/70">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-[#d4b56a] tracking-[0.18em] uppercase mb-1.5">
                      <Sparkles size={14} />
                      <span>FREQUENTLY ADDED TOGETHER</span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-zinc-900 dark:text-[#f4eee3] tracking-tight">
                      You May Also Like
                    </h2>
                  </div>

                  <Link
                    href="/shop"
                    className="text-xs font-bold tracking-wider text-purple-600 dark:text-[#d4b56a] hover:underline inline-flex items-center gap-1"
                  >
                    View All Bestsellers <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Grid of 4 Curated Books */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedBooks.map((book) => (
                    <div
                      key={book.id}
                      className="group border border-purple-100 dark:border-[#143d2e] rounded-xl bg-white dark:bg-[#03120d] p-4 flex flex-col justify-between hover:border-purple-300 dark:hover:border-[#d4b56a]/60 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg hover:-translate-y-1"
                    >
                      <div>
                        {/* Book Image with Badge */}
                        <div className="relative w-full h-[220px] rounded-lg overflow-hidden bg-[#faf7fd] dark:bg-[#061811] mb-4 border border-purple-100 dark:border-[#1f4d3a] flex items-center justify-center">
                          <img
                            src={book.image}
                            alt={book.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/shop1.jpg";
                            }}
                          />
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm bg-white/95 text-purple-700 border border-purple-200 dark:bg-[#082a1e]/90 dark:border-[#d4b56a]/40 dark:text-[#e7b941] text-[9px] font-bold tracking-wider uppercase shadow-xs">
                            {book.category}
                          </span>
                        </div>

                        {/* Title & Author */}
                        <h4 className="font-serif text-base text-zinc-900 group-hover:text-purple-600 dark:text-[#f4eee3] dark:group-hover:text-[#e7b941] transition line-clamp-1 font-medium">
                          <Link href={`/product/${book.slug}`}>
                            {book.name}
                          </Link>
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-[#8c9c92] mt-1 line-clamp-1">
                          {book.author}
                        </p>
                      </div>

                      {/* Price & Add to Cart button */}
                      <div className="mt-4 pt-3 border-t border-purple-100 dark:border-[#143d2e] flex items-center justify-between">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-purple-700 dark:text-[#e7b941] font-bold text-base">
                            £{book.price.toFixed(2)}
                          </span>
                          {book.oldPrice && (
                            <span className="text-xs text-zinc-400 dark:text-[#6e7d74] line-through">
                              £{book.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => addRecommendedToCart(book)}
                          className="px-3 py-1.5 rounded-md border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white dark:border-[#d4b56a] dark:text-[#e7b941] dark:hover:bg-[#d4b56a] dark:hover:text-[#07100c] text-[10px] font-bold tracking-wider transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                        >
                          <PlusCircle size={13} />
                          ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <Footer />
    </div>
  );
}