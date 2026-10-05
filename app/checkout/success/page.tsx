"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

interface SessionDetails {
  id: string;
  paymentIntentId: string;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  customerEmail: string;
  customerName: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<SessionDetails | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No valid payment session identifier was found.");
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Unable to verify payment session.");
        }

        if (isMounted) {
          setSession(data);

          // Clear cart only after confirmed payment
          if (data.paymentStatus === "paid" || data.status === "complete") {
            clearCart();
            try {
              sessionStorage.removeItem("publishinghub_checkout_data");
              localStorage.removeItem("publishinghub_checkout_data");
            } catch (e) {}
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || "Failed to confirm payment details.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, [sessionId, clearCart]);

  if (isLoading) {
    return (
      <div className="min-h-[550px] flex flex-col items-center justify-center py-20 px-5 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent mb-4" />
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d4af37]">
          Verifying Stripe Payment...
        </p>
        <p className="text-xs text-zinc-500 dark:text-[#8ea394] mt-1">
          Please wait while we confirm your order with Stripe.
        </p>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="mx-auto max-w-xl py-20 px-5 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl text-zinc-900 dark:text-[#f2eee3]">
          Payment Verification Required
        </h1>
        <p className="text-sm text-zinc-600 dark:text-[#8ea394]">
          {error || "We could not find an authorized payment session."}
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/checkout"
            className="rounded-xl border border-purple-600 dark:border-[#d4af37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-[#dfb76c] transition hover:bg-purple-600 hover:text-white dark:hover:bg-[#d4af37] dark:hover:text-[#050f08]"
          >
            Return to Checkout
          </Link>
          <Link
            href="/shop"
            className="rounded-xl border border-zinc-300 dark:border-[#1a3826] px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-[#8ea394] transition hover:border-zinc-500"
          >
            Visit Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-12 sm:py-20 px-5">
      <div className="rounded-3xl border border-emerald-500/30 dark:border-[#1e4a30] bg-white dark:bg-[#071910] p-8 sm:p-12 shadow-2xl text-center space-y-6">
        {/* SUCCESS ICON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-50 dark:bg-[#0d2e1c] text-emerald-600 dark:text-[#dfb76c] shadow-[0_0_35px_rgba(212,175,55,0.25)]">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-[#dfb76c]" />
        </div>

        {/* HEADINGS */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-[#d4af37]">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-zinc-900 dark:text-[#f5f2eb] font-normal">
            Payment Successful
          </h1>
          <p className="text-base text-zinc-700 dark:text-[#e0dad0] font-medium">
            Thank you for your order.
          </p>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-[#8ea394] max-w-md mx-auto">
            Your payment has been successfully processed by Stripe. A receipt has been sent to your email.
          </p>
        </div>

        {/* ORDER DETAILS BOX */}
        <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 dark:border-[#163824] bg-zinc-50 dark:bg-[#05110a] p-5 text-left space-y-3">
          <div className="flex justify-between items-center text-sm border-b border-zinc-200 dark:border-[#163824] pb-2.5">
            <span className="text-zinc-500 dark:text-[#8ea394]">Amount Paid:</span>
            <span className="font-serif font-bold text-lg text-purple-700 dark:text-[#dfb76c]">
              £{session.amountTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs border-b border-zinc-200/60 dark:border-[#163824]/60 pb-2">
            <span className="text-zinc-500 dark:text-[#8ea394]">Payment Reference:</span>
            <span
              className="font-mono text-zinc-900 dark:text-[#f5f2eb] truncate max-w-[210px]"
              title={session.paymentIntentId || session.id}
            >
              {session.paymentIntentId || session.id}
            </span>
          </div>

          {session.customerEmail && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 dark:text-[#8ea394]">Customer Email:</span>
              <span className="text-zinc-900 dark:text-[#f5f2eb] truncate max-w-[210px]">
                {session.customerEmail}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-zinc-500 dark:text-[#8ea394]">Payment Method:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Stripe Hosted Checkout
            </span>
          </div>
        </div>

        {/* BUTTON: CONTINUE SHOPPING */}
        <div className="pt-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 dark:from-[#d4af37] dark:via-[#e5c158] dark:to-[#c5a059] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white dark:text-[#050f08] shadow-lg transition duration-200 hover:brightness-110"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* SECURITY FOOTER */}
        <p className="text-[11px] text-zinc-400 dark:text-[#71887a] flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          <span>Payment secured and confirmed via Stripe</span>
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#faf8fd] text-zinc-900 dark:bg-[#030a06] dark:text-[#f5f2eb] transition-colors duration-200">
      <Navbar />
      <main>
        <React.Suspense
          fallback={
            <div className="min-h-[500px] flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-600 dark:border-[#d4af37] border-t-transparent" />
            </div>
          }
        >
          <SuccessContent />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
