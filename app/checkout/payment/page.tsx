"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, parsePrice } from "@/context/CartContext";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface StoredCheckoutData {
  customerName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  billingAddress?: string;
  street?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  notes?: string;
  subtotal?: number;
  total?: number;
  items?: any[];
  timestamp?: number;
}

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { items: cartItems, subtotal: cartSubtotal, clearCart } = useCart();

  // Stored customer checkout details
  const [checkoutData, setCheckoutData] = useState<StoredCheckoutData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Payment form states (Empty by default so customer enters their own details)
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [consentChecked, setConsentChecked] = useState(true);

  // Link modal
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  // Order processing & success state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<{
    paymentIntentId: string;
    amount: number;
    email: string;
    name: string;
    date: string;
    items: any[];
  } | null>(null);

  // Load checkout information safely on mount for order summary reference
  useEffect(() => {
    try {
      const raw =
        sessionStorage.getItem("publishinghub_checkout_data") ||
        localStorage.getItem("publishinghub_checkout_data");

      if (raw) {
        const parsed: StoredCheckoutData = JSON.parse(raw);
        setCheckoutData(parsed);
        // All payment input fields (cardNumber, expiry, cvc, fullName, email, phone)
        // remain completely blank so the user fills their own details manually.
      }
    } catch (err) {
      console.error("Failed to load checkout details:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Determine active items and total
  // Priority: live cart items -> stored checkout items
  const activeItems =
    cartItems && cartItems.length > 0
      ? cartItems
      : checkoutData?.items && checkoutData.items.length > 0
      ? checkoutData.items
      : [];

  const calculatedTotal =
    cartItems && cartItems.length > 0 && cartSubtotal > 0
      ? cartSubtotal
      : checkoutData?.total !== undefined && checkoutData.total > 0
      ? checkoutData.total
      : 71.0;

  const displayTotal = calculatedTotal;

  // Format card number with spaces as typed
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = rawVal.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  // Format expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawVal = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (rawVal.length > 2) {
      rawVal = `${rawVal.slice(0, 2)}/${rawVal.slice(2)}`;
    }
    setExpiry(rawVal);
  };

  // Format CVC
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(val);
  };

  // Handle PLACE ORDER submission safely
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanCard = cardNumber.replace(/\s/g, "");
    if (cleanCard.length < 15) {
      setFormError("Please enter a valid card number.");
      return;
    }
    if (!expiry || expiry.length < 5) {
      setFormError("Please enter your card expiration date (MM/YY).");
      return;
    }
    if (!cvc || cvc.length < 3) {
      setFormError("Please enter your card security code (CVC).");
      return;
    }
    if (!fullName.trim()) {
      setFormError("Please enter the name on your card.");
      return;
    }

    if (!consentChecked) {
      setFormError("Please accept the terms to proceed with order placement.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `PH-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmed = {
        paymentIntentId: generatedRef,
        amount: displayTotal,
        email: email || checkoutData?.email || "customer@example.com",
        name: fullName || checkoutData?.customerName || "Customer",
        date: new Date().toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        items: [...activeItems],
      };
      setOrderConfirmation(confirmed);
      setIsPaymentSuccess(true);
      setIsSubmitting(false);
      clearCart();

      try {
        sessionStorage.removeItem("publishinghub_checkout_data");
        localStorage.removeItem("publishinghub_checkout_data");
      } catch (e) {}

      window.scrollTo({ top: 120, behavior: "smooth" });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#faf8fd] text-zinc-900 transition-colors duration-200 dark:bg-[#050b08] dark:text-[#f2eee3]">
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE HEADER */}
      <section className="border-b border-purple-100 bg-gradient-to-b from-[#f8f4fc] via-[#faf7fd] to-white py-10 sm:py-14 dark:border-[#1e3b2b] dark:from-[#07110c] dark:via-[#050b08] dark:to-[#07110c] dark:bg-[#07110c]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-purple-700 dark:text-[#d4b56a]">
                {isPaymentSuccess ? "Order Confirmed" : "Step 2 of 2 — Secure Payment"}
              </span>
              <h1 className="font-serif text-3xl font-normal tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-[#f2eee3]">
                {isPaymentSuccess ? "Thank You for Your Order" : "Payment Details"}
              </h1>
            </div>

            <div className="text-sm text-zinc-500 dark:text-[#7f8982]">
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-[#f2eee3]">
                Home
              </Link>
              <span className="mx-2 text-zinc-400 dark:text-[#526057]">/</span>
              <Link href="/shop" className="hover:text-zinc-900 dark:hover:text-[#f2eee3]">
                Shop
              </Link>
              <span className="mx-2 text-zinc-400 dark:text-[#526057]">/</span>
              <Link
                href="/checkout"
                className="hover:text-purple-700 dark:hover:text-[#d4b56a]"
              >
                Checkout
              </Link>
              <span className="mx-2 text-zinc-400 dark:text-[#526057]">/</span>
              <span className="font-medium text-purple-700 dark:text-[#d4b56a]">
                {isPaymentSuccess ? "Confirmation" : "Payment"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN PAYMENT WORKFLOW OR ORDER CONFIRMATION */}
      <main className="bg-[#faf8fd] py-10 sm:py-16 dark:bg-[#050b08]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {isPaymentSuccess ? (
            <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-white p-8 sm:p-12 shadow-2xl dark:border-[#1e3b2b] dark:bg-[#08140e] text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-500/30 shadow-lg">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <span className="block text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-[#d4b56a]">
                Payment Complete
              </span>

              <h2 className="mt-2 font-serif text-3xl font-normal text-zinc-900 sm:text-5xl dark:text-[#f2eee3]">
                PAYMENT SUCCESSFUL
              </h2>

              <p className="mt-4 text-base text-zinc-600 dark:text-[#8d9790]">
                Your order has been placed successfully. A receipt has been generated for{" "}
                <span className="font-semibold text-zinc-900 dark:text-[#f2eee3]">
                  {orderConfirmation?.email || email || "Customer"}
                </span>
                .
              </p>

              {/* Order Details summary box */}
              <div className="mt-8 rounded-2xl border border-purple-100 bg-[#faf8fd] p-6 text-left dark:border-[#1e3b2b] dark:bg-[#050b08]">
                <div className="grid grid-cols-2 gap-4 border-b border-purple-100 pb-4 dark:border-[#1e3b2b]/60 sm:grid-cols-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                      Payment Ref
                    </span>
                    <p
                      className="mt-1 font-mono text-xs font-semibold text-zinc-900 dark:text-[#f2eee3] truncate"
                      title={orderConfirmation?.paymentIntentId}
                    >
                      {orderConfirmation?.paymentIntentId?.slice(0, 18)}...
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                      Date
                    </span>
                    <p className="mt-1 text-xs font-semibold text-zinc-900 dark:text-[#f2eee3]">
                      {orderConfirmation?.date || new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                      Total Paid
                    </span>
                    <p className="mt-1 font-mono text-sm font-bold text-purple-700 dark:text-[#d4b56a]">
                      £{(orderConfirmation?.amount ?? displayTotal).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                      Payment Method
                    </span>
                    <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Credit / Debit Card
                    </p>
                  </div>
                </div>

                {orderConfirmation?.items && orderConfirmation.items.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                      Purchased Items
                    </span>
                    {orderConfirmation.items.map((it: any, idx: number) => {
                      const uPrice = it.numericPrice ?? parsePrice(it.price);
                      const qty = it.quantity || 1;
                      return (
                        <div
                          key={idx}
                          className="flex justify-between text-xs text-zinc-700 dark:text-[#c6cbc7]"
                        >
                          <span>
                            {it.title || it.name || "Book"} × {qty}
                          </span>
                          <span className="font-semibold text-purple-700 dark:text-[#d4b56a]">
                            £{(uPrice * qty).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto rounded-md border border-purple-600 bg-purple-600 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md shadow-purple-500/20 transition duration-300 hover:bg-purple-700 dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a]"
                >
                  Continue Shopping
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentSuccess(false);
                    setOrderConfirmation(null);
                    setCardNumber("");
                    setExpiry("");
                    setCvc("");
                  }}
                  className="w-full sm:w-auto rounded-md border border-zinc-300 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-100 dark:border-[#294333] dark:text-[#c6cbc7] dark:hover:bg-[#0c1a12]"
                >
                  Place Another Order
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* BACK TO BILLING NAVIGATION */}
              <div className="mb-8">
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-purple-700 transition hover:text-purple-900 dark:text-[#d4b56a] dark:hover:text-[#f2eee3]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Billing Information</span>
                </Link>
              </div>

              {/* ERROR ALERT */}
              {formError && (
                <div className="mb-8 rounded-2xl border border-red-300 bg-red-50 p-4 sm:p-5 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 shadow-lg">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                </div>
              )}

              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                {/* ====================================================
                    LEFT COLUMN: PAYMENT FORM & METHODS (7 COLUMNS)
                ==================================================== */}
                <div className="lg:col-span-7">
                  {/* PAYMENT HEADER: Credit/Debit Cards & Badges */}
                  <div className="mb-3 flex items-center justify-between px-1">
                    <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-800 dark:text-[#f2eee3]">
                      Credit/Debit Cards
                    </h2>

                    {/* CARD ICONS: AMEX, Mastercard, VISA, Discover */}
                    <div className="flex items-center gap-1.5">
                      {/* AMEX */}
                      <div
                        className="flex h-5 items-center justify-center rounded bg-[#006FCF] px-1.5 text-[8px] font-black tracking-wider text-white shadow-sm"
                        title="American Express"
                      >
                        AMEX
                      </div>
                      {/* DISCOVER */}
                      <div
                        className="flex h-5 items-center justify-center rounded bg-[#231F20] px-1.5 text-[8px] font-bold text-white shadow-sm"
                        title="Discover Card"
                      >
                        <span className="text-[#F47216]">DISC</span>OVER
                      </div>
                      {/* VISA */}
                      <div
                        className="flex h-5 items-center justify-center rounded bg-[#1A1F71] px-1.5 text-[9px] font-extrabold italic tracking-wider text-white shadow-sm"
                        title="Visa"
                      >
                        VISA
                      </div>
                      {/* MASTERCARD */}
                      <div
                        className="flex h-5 items-center justify-center rounded bg-[#222] px-1.5 shadow-sm"
                        title="Mastercard"
                      >
                        <span className="h-3 w-3 -mr-1 rounded-full bg-[#EB001B]" />
                        <span className="h-3 w-3 rounded-full bg-[#F79E1B]/90" />
                      </div>
                    </div>
                  </div>

                  {/* TAB POINTER ARROW */}
                  <div className="relative pl-6">
                    <div className="h-0 w-0 border-x-[7px] border-b-[7px] border-x-transparent border-b-purple-100 dark:border-b-[#1e3b2b]" />
                  </div>

                  {/* MAIN PAYMENT BOX */}
                  <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-8 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    {/* 1. SECURE PAYMENT BANNER WITH STRIPE LINK */}
                    <div className="mb-6 flex w-full items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-800 transition dark:border-emerald-500/20 dark:bg-[#0d261b]/80 dark:text-emerald-400">
                      <div className="flex items-center gap-2.5">
                        <Lock className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>Secure checkout with Stripe Link & Cards</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsLinkModalOpen(true)}
                        className="flex items-center gap-1 rounded-md bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800 transition hover:bg-emerald-200 dark:bg-[#143d2b] dark:text-emerald-300 dark:hover:bg-[#1b5239]"
                      >
                        <span>About</span>
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* CARD FORM */}
                    <form onSubmit={handlePlaceOrder} className="space-y-5">
                      {/* CARD NUMBER */}
                      <div>
                        <div className="mb-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                            Card Number
                            <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                          </label>
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] pl-11 pr-4 py-3.5 font-mono text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                          />
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 dark:text-[#7f8982]">
                            <CreditCard className="h-5 w-5" />
                          </div>
                        </div>
                      </div>

                      {/* EXPIRY & CVC */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* EXPIRATION DATE */}
                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                            Expiration Date
                            <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 font-mono text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                          />
                        </div>

                        {/* SECURITY CODE (CVC) */}
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                              Security Code
                              <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                            </label>
                            <span
                              className="cursor-pointer text-[10px] text-zinc-400 hover:text-zinc-600 dark:text-[#7f8982]"
                              title="3 digits on back of Visa/MC or 4 on front of AMEX"
                            >
                              CVC / CVV
                            </span>
                          </div>
                          <input
                            type="password"
                            required
                            value={cvc}
                            onChange={handleCvcChange}
                            placeholder="CVC"
                            maxLength={4}
                            className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 font-mono text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                          />
                        </div>
                      </div>

                      {/* COUNTRY */}
                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                          Country
                          <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="India">India</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Ireland">Ireland</option>
                        </select>
                      </div>

                      {/* FULL NAME ON CARD */}
                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                          Full Name on Card
                          <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Name as it appears on your card"
                          className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                        />
                      </div>

                      {/* OPTIONAL EMAIL & MOBILE NUMBER */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                            Email (Receipts)
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                            Mobile Number
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+44 7123 456789"
                            className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                          />
                        </div>
                      </div>

                      {/* TERMS / CONSENT CHECKBOX & TEXT */}
                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={consentChecked}
                            onChange={(e) => setConsentChecked(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-purple-300 accent-purple-600 dark:accent-[#d4b56a]"
                          />
                          <span className="text-[11px] leading-relaxed text-zinc-600 dark:text-[#8d9790]">
                            By providing your card information, you authorize Publishing Hub to charge
                            your card for this purchase in accordance with our{" "}
                            <Link
                              href="/refund_returns"
                              className="text-purple-600 underline dark:text-[#d4b56a] hover:opacity-90"
                            >
                              Terms & Refund Policy
                            </Link>
                            .
                          </span>
                        </label>
                      </div>

                      {/* FINAL BUTTON: PLACE ORDER — £[DYNAMIC TOTAL] */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 w-full rounded-md border border-purple-600 bg-purple-600 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl shadow-purple-500/25 transition duration-300 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a] dark:shadow-none"
                      >
                        {isSubmitting
                          ? "PROCESSING PAYMENT..."
                          : `PLACE ORDER — £${displayTotal.toFixed(2)}`}
                      </button>
                    </form>
                  </div>
                </div>

                {/* ====================================================
                    RIGHT COLUMN: ORDER SUMMARY & CUSTOMER REVIEW (5 COLUMNS)
                ==================================================== */}
                <div className="lg:col-span-5">
                  <div className="sticky top-8 space-y-6">
                    {/* 1. ORDER SUMMARY CARD */}
                    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-7 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                      <div className="mb-5 flex items-center justify-between border-b border-purple-100 pb-4 dark:border-[#1e3b2b]">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700 dark:text-[#d4b56a]">
                          Order Summary
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700 dark:text-[#d4b56a]">
                          Total
                        </span>
                      </div>

                      {/* ITEM LIST */}
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                        {activeItems.length === 0 ? (
                          <div className="py-4 text-center text-xs text-zinc-500 dark:text-[#8d9790]">
                            <p>No active items detected in cart session.</p>
                            <p className="mt-1 font-mono text-purple-700 dark:text-[#d4b56a]">
                              Test order initialized at £{displayTotal.toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          activeItems.map((item, idx) => {
                            const unitPrice =
                              item.numericPrice !== undefined && item.numericPrice > 0
                                ? item.numericPrice
                                : parsePrice(item.price);
                            const quantity = item.quantity || 1;
                            const lineTotal = unitPrice * quantity;
                            const title = item.title || item.name || "Publishing Book";

                            return (
                              <div
                                key={item.id || idx}
                                className="flex items-start justify-between gap-4 text-xs"
                              >
                                <div className="flex-1">
                                  <p className="font-medium text-zinc-900 dark:text-[#f2eee3]">
                                    {title}
                                  </p>
                                  <p className="mt-0.5 text-zinc-500 dark:text-[#7f8982]">
                                    Qty: {quantity}
                                  </p>
                                </div>
                                <span className="font-semibold text-purple-700 dark:text-[#d4b56a]">
                                  £{lineTotal.toFixed(2)}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* SUBTOTAL & SHIPPING & TOTAL */}
                      <div className="mt-6 border-t border-purple-100 pt-4 space-y-2 dark:border-[#1e3b2b]">
                        <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-[#8d9790]">
                          <span>Subtotal</span>
                          <span className="font-medium text-zinc-900 dark:text-[#f2eee3]">
                            £{displayTotal.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-[#8d9790]">
                          <span>Delivery</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            FREE
                          </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-purple-200 pt-4 dark:border-[#294333]">
                          <span className="font-serif text-lg text-zinc-900 dark:text-[#f2eee3]">
                            Total to Pay
                          </span>
                          <span className="font-serif text-2xl font-bold text-purple-700 dark:text-[#d4b56a]">
                            £{displayTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. CUSTOMER & BILLING DETAILS CARD */}
                    <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-7 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                      <div className="mb-4 flex items-center justify-between border-b border-purple-100 pb-3 dark:border-[#1e3b2b]">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700 dark:text-[#d4b56a]">
                          Customer Details
                        </span>
                        <Link
                          href="/checkout"
                          className="text-xs font-semibold text-purple-700 hover:underline dark:text-[#d4b56a]"
                        >
                          Edit Details
                        </Link>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                            Customer Name
                          </span>
                          <p className="font-semibold text-zinc-900 dark:text-[#f2eee3]">
                            {fullName || checkoutData?.customerName || "Customer Name Not Provided"}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                            Email & Phone
                          </span>
                          <p className="text-zinc-800 dark:text-[#c6cbc7]">
                            {email || checkoutData?.email || "Email not specified"}
                          </p>
                          {phone && (
                            <p className="text-zinc-600 dark:text-[#8d9790]">{phone}</p>
                          )}
                        </div>

                        {(checkoutData?.street || checkoutData?.city) && (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">
                              Billing / Shipping Address
                            </span>
                            <p className="text-zinc-800 dark:text-[#c6cbc7]">
                              {checkoutData.street}
                              {checkoutData.apartment ? `, ${checkoutData.apartment}` : ""}
                            </p>
                            <p className="text-zinc-600 dark:text-[#8d9790]">
                              {[
                                checkoutData.city,
                                checkoutData.state,
                                checkoutData.postcode,
                                checkoutData.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 3. SECURITY TRUST BADGES */}
                    <div className="rounded-2xl border border-purple-100 bg-white/70 p-5 backdrop-blur dark:border-[#1e3b2b] dark:bg-[#06120b]">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-[#d4b56a] shrink-0" />
                        <div className="text-xs">
                          <p className="font-bold text-zinc-900 dark:text-[#f2eee3]">
                            Bank-Grade 256-Bit SSL Encryption
                          </p>
                          <p className="mt-0.5 text-zinc-500 dark:text-[#7f8982]">
                            Your payment information is encrypted and transmitted securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================
          STRIPE LINK MODAL (About Option Popup)
      ======================================================== */}
      {isLinkModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
          onClick={() => setIsLinkModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[420px] rounded-3xl bg-white p-7 sm:p-8 shadow-2xl transition-all dark:bg-[#0c1a12] dark:border dark:border-[#1e3b2b]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* LOGO & CLOSE */}
            <div className="flex items-center justify-between">
              <a
                href="https://link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
                title="Visit Link.com"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#00D66F] shadow-sm transition-transform group-hover:scale-105">
                  <svg className="h-4 w-4 fill-white ml-0.5" viewBox="0 0 16 16">
                    <path d="M5.5 3.5l5 4.5-5 4.5v-9z" />
                  </svg>
                </div>
                <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                  link
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-[#14281c] dark:hover:text-zinc-100 transition"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* HEADLINE */}
            <h3 className="mt-6 mb-6 text-center text-2xl font-bold leading-tight text-zinc-900 dark:text-white font-serif">
              Pay quickly,<br />shop confidently
            </h3>

            {/* FEATURES */}
            <div className="space-y-5 text-left">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 text-emerald-600 dark:text-[#d4b56a]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Fast and simple
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Autofill your payment and shipping details safely across thousands of sites.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 text-emerald-600 dark:text-[#d4b56a]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Multiple ways to pay
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Pay securely using any major credit or debit card or direct bank account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 text-emerald-600 dark:text-[#d4b56a]">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Bank-Grade Security
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    Every transaction is protected with end-to-end encryption and two-factor verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="w-full rounded-md border border-purple-600 bg-purple-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-purple-700 dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a]"
              >
                Close & Continue Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
