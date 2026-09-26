"use client";

import React, { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Stripe, Appearance } from "@stripe/stripe-js";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

interface StripePaymentSectionProps {
  clientSecret: string | null;
  stripePromise: Promise<Stripe | null> | null;
  total: number;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  isKeysConfigured: boolean;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  onSuccess: (paymentIntentId: string) => void;
  onValidateBilling: () => boolean;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  linkOpen: boolean;
  setLinkOpen: (val: boolean) => void;
  setIsLinkModalOpen: (val: boolean) => void;
  cartIsEmpty: boolean;
}

function StripeFormInner({
  total,
  isProcessing,
  setIsProcessing,
  errorMessage,
  setErrorMessage,
  onSuccess,
  onValidateBilling,
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  linkOpen,
  setLinkOpen,
  setIsLinkModalOpen,
  cartIsEmpty,
}: {
  total: number;
  isProcessing: boolean;
  setIsProcessing: (val: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
  onSuccess: (paymentIntentId: string) => void;
  onValidateBilling: () => boolean;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  linkOpen: boolean;
  setLinkOpen: (val: boolean) => void;
  setIsLinkModalOpen: (val: boolean) => void;
  cartIsEmpty: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [elementReady, setElementReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartIsEmpty || total <= 0) {
      setErrorMessage("Your cart is empty. Please add books to proceed.");
      return;
    }

    // 1. Validate required billing fields first
    const isBillingValid = onValidateBilling();
    if (!isBillingValid) {
      return;
    }

    if (!stripe || !elements) {
      setErrorMessage("Payment processor is initializing. Please wait a moment.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      // 2. Submit elements to trigger client-side validation
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || "Please check your payment details.");
        setIsProcessing(false);
        return;
      }

      // 3. Confirm PaymentIntent using Stripe TEST mode
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout?status=success`,
          payment_method_data: {
            billing_details: {
              name: customerName || undefined,
              email: customerEmail || undefined,
              phone: customerPhone || undefined,
              address: shippingAddress,
            },
          },
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(
          error.message || "Your payment could not be processed. Please try again."
        );
        setIsProcessing(false);
      } else if (
        paymentIntent &&
        (paymentIntent.status === "succeeded" || paymentIntent.status === "processing")
      ) {
        onSuccess(paymentIntent.id);
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "An unexpected error occurred during payment. Please try again."
      );
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* SECURE FAST CHECKOUT WITH LINK BANNER */}
      <div className="mb-6 flex w-full items-center justify-between rounded-lg border border-emerald-200/80 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700 transition dark:border-transparent dark:bg-[#0d261b]/80 dark:text-emerald-400">
        <button
          type="button"
          onClick={() => setLinkOpen(!linkOpen)}
          className="flex flex-1 items-center gap-2 text-left hover:opacity-90"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4zm-3 5a1 112 0v2a1 1 0 11-2 0v-2z"
              clipRule="evenodd"
            />
          </svg>
          <span>Secure checkout with Stripe Link & Cards</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            title="What is Link?"
            className="flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-200 dark:bg-[#143d2b] dark:text-emerald-300 dark:hover:bg-[#1b5239] transition"
          >
            <span>About</span>
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* LUXURY CARD PREVIEW BADGE */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#1b103c] via-[#221546] to-[#0f0920] p-5 sm:p-6 shadow-2xl text-white dark:border-[#d4b56a]/30 dark:from-[#0b2417] dark:via-[#0f3020] dark:to-[#040e08] dark:shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/25 blur-3xl dark:bg-[#d4b56a]/20" />
        <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl dark:bg-emerald-500/20" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* GOLD EMV CHIP */}
            <div className="relative h-6 w-8 sm:h-7 sm:w-9 rounded-md bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-[2px] shadow-sm">
              <div className="h-full w-full rounded-[3px] border border-amber-900/40 bg-gradient-to-tr from-amber-300 to-amber-100 opacity-95" />
              <div className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 bg-amber-800/40" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] -translate-x-1/2 bg-amber-800/40" />
            </div>

            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/90 drop-shadow-sm dark:text-[#f2eee3]">
              Publishing Hub
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 shadow-sm">
              Stripe Test
            </span>
          </div>
        </div>

        {/* MIDDLE ROW: TEST CARD BADGE */}
        <div className="relative z-10 mt-6 min-h-[28px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm sm:text-base font-bold tracking-[0.25em] text-white/90">
              •••• •••• •••• 4242
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#d4b56a]/90 font-semibold">
            TEST CARD
          </span>
        </div>

        {/* BOTTOM ROW: CARD HOLDER & AMOUNT */}           
        <div className="relative z-10 mt-5 flex items-end justify-between">
          <div>
            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-purple-200/80 dark:text-[#d4b56a]/80">
              Card Holder
            </p>
            <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white drop-shadow-sm truncate max-w-[180px]">
              {customerName || "CUSTOMER NAME"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-purple-200/80 dark:text-[#d4b56a]/80">
              Order Total
            </p>
            <p className="mt-1 font-mono text-xs sm:text-sm font-semibold tracking-wider text-white drop-shadow-sm">
              £{total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* STRIPE PAYMENT ELEMENT */}
      <div className="min-h-[160px]">
        {!elementReady && (
          <div className="flex items-center justify-center py-8 text-xs text-zinc-400 dark:text-[#7f8982]">
            <div className="mr-2.5 h-4 w-4 animate-spin rounded-full border-2 border-purple-600 dark:border-[#d4b56a] border-t-transparent" />
            Loading secure payment fields...
          </div>
        )}
        <PaymentElement
          onReady={() => setElementReady(true)}
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* TEST CARD HELPER */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-purple-100 bg-[#faf8fd] p-2.5 text-[11px] text-zinc-600 dark:border-[#1e3b2b] dark:bg-[#06110a] dark:text-[#8d9790]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">Stripe TEST Card:</span>
        </div>
        <span className="font-mono font-semibold text-purple-700 dark:text-[#d4b56a]">
          4242 4242 4242 4242
        </span>
      </div>

      {/* ERROR MESSAGE DISPLAY */}
      {errorMessage && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          <div className="flex items-start gap-2">
            <svg
              className="h-4 w-4 shrink-0 mt-0.5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="font-medium">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* PLACE ORDER BUTTON */}
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elementReady || cartIsEmpty}
        className="mt-6 w-full rounded-md border border-purple-600 bg-purple-600 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/25 transition duration-300 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a] dark:shadow-none"
      >
        {isProcessing ? "PROCESSING PAYMENT..." : `Place Order — £${total.toFixed(2)}`}
      </button>

      {/* PRIVACY DISCLAIMER */}
      <p className="mt-4 text-center text-[11px] leading-5 text-zinc-500 dark:text-[#69746d]">
        Your personal data will be used to process your order, support your experience throughout
        this website, and for other purposes described in our{" "}
        <Link
          href="/refund_returns"
          className="underline text-purple-600 hover:text-purple-700 dark:text-[#d4b56a] dark:hover:text-[#f2eee3]"
        >
          privacy & refund policy
        </Link>
        .
      </p>
    </form>
  );
}

export default function StripePaymentSection(props: StripePaymentSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Stripe Elements Appearance matching Publishing Hub dark luxury green theme
  const appearance: Appearance = {
    theme: isDark ? "night" : "stripe",
    variables: {
      colorPrimary: isDark ? "#d4b56a" : "#7e22ce",
      colorBackground: isDark ? "#050b08" : "#ffffff",
      colorText: isDark ? "#f2eee3" : "#18181b",
      colorDanger: "#ef4444",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      spacingUnit: "4.5px",
      borderRadius: "8px",
      colorTextPlaceholder: isDark ? "#59645d" : "#a1a1aa",
      colorIcon: isDark ? "#d4b56a" : "#7e22ce",
    },
    rules: {
      ".Input": {
        backgroundColor: isDark ? "#050b08" : "#faf8fd",
        borderColor: isDark ? "#294333" : "#e9d5ff",
        color: isDark ? "#f2eee3" : "#18181b",
        boxShadow: "none",
        fontSize: "14px",
        padding: "12px 14px",
      },
      ".Input:focus": {
        borderColor: isDark ? "#d4b56a" : "#7e22ce",
        boxShadow: isDark ? "0 0 0 1px #d4b56a" : "0 0 0 1px #7e22ce",
      },
      ".Label": {
        color: isDark ? "#c6cbc7" : "#52525b",
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.03em",
        marginBottom: "6px",
      },
      ".Tab": {
        backgroundColor: isDark ? "#08140e" : "#faf8fd",
        borderColor: isDark ? "#1e3b2b" : "#e9d5ff",
        color: isDark ? "#c6cbc7" : "#52525b",
      },
      ".Tab:hover": {
        borderColor: isDark ? "#294333" : "#d8b4fe",
        color: isDark ? "#f2eee3" : "#18181b",
      },
      ".Tab--selected": {
        borderColor: isDark ? "#d4b56a" : "#7e22ce",
        color: isDark ? "#d4b56a" : "#7e22ce",
        backgroundColor: isDark ? "#0d261b" : "#f3e8ff",
      },
      ".Block": {
        backgroundColor: isDark ? "#050b08" : "#ffffff",
        borderColor: isDark ? "#1e3b2b" : "#e9d5ff",
      },
    },
  };

  // If user hasn't configured Stripe keys yet:
  if (!props.isKeysConfigured) {
    return (
      <div>
        <div className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs text-amber-200">
          <div className="flex items-start gap-2.5">
            <svg
              className="h-4 w-4 shrink-0 text-amber-400 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-amber-300">Stripe TEST Configuration Required</p>
              <p className="mt-1 leading-relaxed text-amber-200/90">
                Please set your Stripe TEST keys in <code className="rounded bg-black/40 px-1.5 py-0.5 font-mono text-[11px] text-amber-300">.env.local</code>:
              </p>
              <div className="mt-2 rounded bg-black/50 p-2 font-mono text-[10px] text-amber-100">
                <p>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...</p>
                <p>STRIPE_SECRET_KEY=sk_test_...</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled
          className="w-full rounded-md border border-purple-600/50 bg-purple-600/50 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white opacity-60 cursor-not-allowed dark:border-[#d4b56a]/50 dark:bg-[#d4b56a]/50 dark:text-[#050b08]"
        >
          Place Order — £{props.total.toFixed(2)}
        </button>
      </div>
    );
  }

  // If there's an initialization error:
  if (props.errorMessage && !props.clientSecret) {
    return (
      <div className="py-6 text-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          <p className="font-semibold">Unable to initialize payment session</p>
          <p className="mt-1 leading-relaxed">{props.errorMessage}</p>
        </div>
      </div>
    );
  }

  // If clientSecret is still loading:
  if (!props.clientSecret || !props.stripePromise) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-600 dark:border-[#d4b56a] border-t-transparent" />
        <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-[#7f8982]">
          Initializing secure Stripe checkout...
        </p>
      </div>
    );
  }

  return (
    <Elements
      stripe={props.stripePromise}
      options={{
        clientSecret: props.clientSecret,
        appearance,
      }}
    >
      <StripeFormInner
        total={props.total}
        isProcessing={props.isProcessing}
        setIsProcessing={props.setIsProcessing}
        errorMessage={props.errorMessage}
        setErrorMessage={props.setErrorMessage}
        onSuccess={props.onSuccess}
        onValidateBilling={props.onValidateBilling}
        customerName={props.customerName}
        customerEmail={props.customerEmail}
        customerPhone={props.customerPhone}
        shippingAddress={props.shippingAddress}
        linkOpen={props.linkOpen}
        setLinkOpen={props.setLinkOpen}
        setIsLinkModalOpen={props.setIsLinkModalOpen}
        cartIsEmpty={props.cartIsEmpty}
      />
    </Elements>
  );
}
