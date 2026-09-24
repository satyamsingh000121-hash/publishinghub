"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart, parsePrice } from "@/context/CartContext";
import { getStripePromise } from "@/lib/stripe-client";
import StripePaymentSection from "@/components/checkout/StripePaymentSection";

export default function CheckoutPage() {
    const { items: cartItems, subtotal, clearCart } = useCart();
    const total = subtotal;

    // =========================
    // LOGIN & COUPON STATES
    // =========================
    const [showLogin, setShowLogin] = useState(false);
    const [showCoupon, setShowCoupon] = useState(false);

    // =========================
    // FORM STATES
    // =========================
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [country, setCountry] = useState("United Kingdom");
    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postcode, setPostcode] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");

    // =========================
    // COUPON
    // =========================
    const [coupon, setCoupon] = useState("");
    const [couponMessage, setCouponMessage] = useState("");

    // =========================
    // STRIPE & PAYMENT STATES
    // =========================
    const [linkOpen, setLinkOpen] = useState(true);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [billingError, setBillingError] = useState<string | null>(null);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState<{
        paymentIntentId: string;
        amount: number;
        email: string;
        name: string;
        date: string;
        items: any[];
    } | null>(null);

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const isKeysConfigured = Boolean(
        publishableKey && !publishableKey.includes("REPLACE_WITH_MY_TEST_PUBLISHABLE_KEY")
    );

    const [stripePromise, setStripePromise] = useState<Promise<any> | null>(null);

    useEffect(() => {
        if (isKeysConfigured) {
            setStripePromise(getStripePromise());
        } else {
            setStripePromise(null);
        }
    }, [isKeysConfigured]);

    // Fetch Stripe clientSecret whenever cart items or total change
    useEffect(() => {
        if (!isKeysConfigured || cartItems.length === 0 || total <= 0) {
            setClientSecret(null);
            return;
        }

        let isMounted = true;
        const createIntent = async () => {
            try {
                const res = await fetch("/api/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        items: cartItems,
                        billingDetails: {
                            email,
                            firstName,
                            lastName,
                            company,
                            country,
                            street,
                            apartment,
                            city,
                            state,
                            postcode,
                            phone,
                            notes,
                        },
                    }),
                });

                const data = await res.json();
                if (isMounted) {
                    if (res.ok && data.clientSecret) {
                        setClientSecret(data.clientSecret);
                        setPaymentError(null);
                    } else {
                        setPaymentError(data.error || "Could not initialize Stripe payment session.");
                    }
                }
            } catch (err: any) {
                if (isMounted) {
                    setPaymentError("Network error initializing payment session.");
                }
            }
        };

        createIntent();

        return () => {
            isMounted = false;
        };
    }, [isKeysConfigured, cartItems, total]);

    // Handle return from 3D secure redirect if status=success
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const redirectStatus = params.get("redirect_status");
            const paymentIntent = params.get("payment_intent");
            if (redirectStatus === "succeeded" || params.get("status") === "success") {
                setIsPaymentSuccess(true);
                if (paymentIntent) {
                    setOrderConfirmation({
                        paymentIntentId: paymentIntent,
                        amount: total,
                        email: email || "Customer",
                        name: `${firstName} ${lastName}`.trim() || "Customer",
                        date: new Date().toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                        items: [...cartItems],
                    });
                }
                clearCart();
            }
        }
    }, [clearCart]);

    const getCountryCode = (c: string): string => {
        const map: Record<string, string> = {
            "United Kingdom": "GB",
            "United States": "US",
            India: "IN",
            Canada: "CA",
            Australia: "AU",
        };
        return map[c] || "GB";
    };

    const handleValidateBilling = (): boolean => {
        if (!email.trim() || !email.includes("@")) {
            setBillingError("Please enter a valid email address.");
            window.scrollTo({ top: 200, behavior: "smooth" });
            return false;
        }
        if (!firstName.trim()) {
            setBillingError("Please enter your first name.");
            window.scrollTo({ top: 200, behavior: "smooth" });
            return false;
        }
        if (!lastName.trim()) {
            setBillingError("Please enter your last name.");
            window.scrollTo({ top: 200, behavior: "smooth" });
            return false;
        }
        if (!street.trim()) {
            setBillingError("Please enter your street address.");
            window.scrollTo({ top: 350, behavior: "smooth" });
            return false;
        }
        if (!city.trim()) {
            setBillingError("Please enter your town / city.");
            window.scrollTo({ top: 400, behavior: "smooth" });
            return false;
        }
        if (!state.trim()) {
            setBillingError("Please enter your state.");
            window.scrollTo({ top: 450, behavior: "smooth" });
            return false;
        }
        if (!postcode.trim()) {
            setBillingError("Please enter your postcode / ZIP.");
            window.scrollTo({ top: 450, behavior: "smooth" });
            return false;
        }
        if (!phone.trim()) {
            setBillingError("Please enter your phone number.");
            window.scrollTo({ top: 500, behavior: "smooth" });
            return false;
        }
        setBillingError(null);
        return true;
    };

    const handlePaymentSuccess = (paymentIntentId: string) => {
        setOrderConfirmation({
            paymentIntentId,
            amount: total,
            email,
            name: `${firstName} ${lastName}`.trim(),
            date: new Date().toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            items: [...cartItems],
        });
        setIsPaymentSuccess(true);
        clearCart();
        window.scrollTo({ top: 150, behavior: "smooth" });
    };

    // =========================
    // APPLY COUPON
    // =========================
    const handleCoupon = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!coupon.trim()) {
            setCouponMessage("Please enter a coupon code.");
            return;
        }

        setCouponMessage("Coupon code entered successfully.");
    };

    return (
        <div className="min-h-screen bg-[#faf8fd] text-zinc-900 transition-colors duration-200 dark:bg-[#050b08] dark:text-[#f2eee3]">
            {/* =========================
          NAVBAR
      ========================= */}
            <Navbar />

            {/* =========================
          PAGE HEADER
      ========================= */}
            <section className="border-b border-purple-100 bg-gradient-to-b from-[#f8f4fc] via-[#faf7fd] to-white py-12 sm:py-16 dark:border-[#1e3b2b] dark:from-[#07110c] dark:via-[#050b08] dark:to-[#07110c] dark:bg-[#07110c]">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <h1 className="font-serif text-4xl font-normal tracking-tight text-zinc-900 sm:text-5xl dark:text-[#f2eee3]">
                            Checkout
                        </h1>

                        <div className="text-sm text-zinc-500 dark:text-[#7f8982]">
                            <span>Home</span>
                            <span className="mx-2 text-zinc-400 dark:text-[#526057]">/</span>
                            <span>Shop</span>
                            <span className="mx-2 text-zinc-400 dark:text-[#526057]">/</span>
                            <span className="font-medium text-purple-700 dark:text-[#d4b56a]">Checkout</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
          MAIN CHECKOUT
      ========================= */}
            <main className="bg-[#faf8fd] dark:bg-[#050b08]">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">

                    {/* =========================
              TOP NOTICES (COUPON & LOGIN)
          ========================= */}
                    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-purple-100 pb-6 sm:flex-row sm:items-center dark:border-[#1e3b2b]/60">
                        <p className="text-sm text-zinc-600 dark:text-[#8d9790]">
                            Have a coupon?{" "}
                            <button
                                type="button"
                                onClick={() => setShowCoupon(!showCoupon)}
                                className="font-medium text-purple-700 transition hover:text-purple-900 dark:text-[#d4b56a] dark:hover:text-[#f2eee3]"
                            >
                                {showCoupon
                                    ? "Close coupon"
                                    : "Click here to enter your code"}
                            </button>
                        </p>

                        <div>
                            <button
                                type="button"
                                onClick={() => setShowLogin(!showLogin)}
                                className="text-sm font-medium text-purple-700 transition hover:text-purple-900 dark:text-[#d4b56a] dark:hover:text-[#f2eee3]"
                            >
                                {showLogin ? "Close login" : "Click here to login"}
                            </button>
                        </div>
                    </div>

                    {/* =========================
              LOGIN FORM
          ========================= */}
                    {showLogin && (
                        <div className="mb-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-8 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

                            <div className="mb-7">
                                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-purple-700 dark:text-[#d4b56a]">
                                    Returning Customer
                                </span>

                                <h2 className="font-serif text-2xl text-zinc-900 sm:text-3xl dark:text-[#f2eee3]">
                                    Login to your account
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-[#8d9790]">
                                    If you have shopped with us before, please enter your
                                    details below. If you are a new customer, please proceed
                                    to the Billing section.
                                </p>
                            </div>

                            <div className="grid gap-5">

                                {/* USERNAME */}
                                <div>
                                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                        Username or Email
                                        <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Username or email"
                                        className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                        Password
                                        <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                    />
                                </div>

                                <div className="flex flex-wrap items-center gap-5">

                                    <button
                                        type="button"
                                        className="rounded-md border border-purple-600 bg-purple-600 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md shadow-purple-500/20 transition duration-300 hover:bg-purple-700 dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a]"
                                    >
                                        Login
                                    </button>

                                    <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-600 dark:text-[#8d9790]">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-purple-600 dark:accent-[#d4b56a]"
                                        />
                                        Remember me
                                    </label>

                                </div>

                                <button
                                    type="button"
                                    className="w-fit text-xs text-zinc-500 transition hover:text-purple-700 dark:text-[#8d9790] dark:hover:text-[#d4b56a]"
                                >
                                    Lost your password?
                                </button>

                            </div>
                        </div>
                    )}

                    {/* =========================
              COUPON FORM
          ========================= */}
                    {showCoupon && (
                        <div className="mb-8 rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-8 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

                            <div className="mb-5">
                                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-purple-700 dark:text-[#d4b56a]">
                                    Special Offer
                                </span>

                                <h3 className="mt-2 font-serif text-2xl text-zinc-900 dark:text-[#f2eee3]">
                                    Enter your coupon code
                                </h3>
                            </div>

                            <form
                                onSubmit={handleCoupon}
                                className="flex flex-col gap-4 sm:flex-row"
                            >
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Enter coupon code"
                                    className="flex-1 rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                />

                                <button
                                    type="submit"
                                    className="rounded-md border border-purple-600 bg-purple-600 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-md shadow-purple-500/20 transition duration-300 hover:bg-purple-700 dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a]"
                                >
                                    Apply Coupon
                                </button>
                            </form>

                            {couponMessage && (
                                <p className="mt-4 text-xs text-purple-700 dark:text-[#d4b56a]">
                                    {couponMessage}
                                </p>
                            )}
                        </div>
                    )}

                    {/* =========================
              ORDER CONFIRMATION (SUCCESS) OR BILLING + ORDER
          ========================= */}
                    {isPaymentSuccess ? (
                        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-500/30 bg-white p-8 sm:p-12 shadow-2xl dark:border-[#1e3b2b] dark:bg-[#08140e] text-center">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-500/30">
                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <span className="block text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-[#d4b56a]">
                                Stripe TEST Payment Complete
                            </span>

                            <h2 className="mt-2 font-serif text-3xl font-normal text-zinc-900 sm:text-5xl dark:text-[#f2eee3]">
                                PAYMENT SUCCESSFUL
                            </h2>

                            <p className="mt-4 text-base text-zinc-600 dark:text-[#8d9790]">
                                Your order has been placed successfully. A receipt has been generated for{" "}
                                <span className="font-semibold text-zinc-900 dark:text-[#f2eee3]">{orderConfirmation?.email || email}</span>.
                            </p>

                            {/* Order Details summary box */}
                            <div className="mt-8 rounded-2xl border border-purple-100 bg-[#faf8fd] p-6 text-left dark:border-[#1e3b2b] dark:bg-[#050b08]">
                                <div className="grid grid-cols-2 gap-4 border-b border-purple-100 pb-4 dark:border-[#1e3b2b]/60 sm:grid-cols-4">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">Payment Ref</span>
                                        <p className="mt-1 font-mono text-xs font-semibold text-zinc-900 dark:text-[#f2eee3] truncate" title={orderConfirmation?.paymentIntentId}>
                                            {orderConfirmation?.paymentIntentId?.slice(0, 16)}...
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">Date</span>
                                        <p className="mt-1 text-xs font-semibold text-zinc-900 dark:text-[#f2eee3]">
                                            {orderConfirmation?.date || new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">Total Paid</span>
                                        <p className="mt-1 font-mono text-sm font-bold text-purple-700 dark:text-[#d4b56a]">
                                            £{(orderConfirmation?.amount ?? total).toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">Payment Method</span>
                                        <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                            Stripe Card (TEST)
                                        </p>
                                    </div>
                                </div>

                                {orderConfirmation?.items && orderConfirmation.items.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-[#7f8982]">Purchased Items</span>
                                        {orderConfirmation.items.map((it: any, idx: number) => {
                                            const uPrice = it.numericPrice ?? parsePrice(it.price);
                                            return (
                                                <div key={idx} className="flex justify-between text-xs text-zinc-700 dark:text-[#c6cbc7]">
                                                    <span>{it.title || "Book"} × {it.quantity}</span>
                                                    <span className="font-semibold text-purple-700 dark:text-[#d4b56a]">
                                                        £{(uPrice * it.quantity).toFixed(2)}
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
                                    }}
                                    className="w-full sm:w-auto rounded-md border border-zinc-300 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-zinc-700 transition hover:bg-zinc-100 dark:border-[#294333] dark:text-[#c6cbc7] dark:hover:bg-[#0c1a12]"
                                >
                                    Place Another Order
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">

                                {/* =========================
                      BILLING DETAILS
                  ========================= */}
                                <section className="lg:col-span-7">

                                    <div className="mb-8">
                                        <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-purple-700 dark:text-[#d4b56a]">
                                            Checkout
                                        </span>

                                        <h2 className="font-serif text-4xl font-normal text-zinc-900 sm:text-5xl dark:text-[#f2eee3]">
                                            Billing Details
                                        </h2>

                                        <div className="mt-4 h-0.5 w-20 bg-purple-600 dark:bg-[#d4b56a]" />
                                    </div>

                                    {billingError && (
                                        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
                                            <div className="flex items-center gap-2">
                                                <svg className="h-4 w-4 shrink-0 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                <span>{billingError}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-8 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

                                        {/* EMAIL */}
                                        <div className="mb-6">
                                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                Email Address
                                                <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                            </label>

                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            />
                                        </div>

                                        {/* FIRST + LAST NAME */}
                                        <div className="grid gap-6 sm:grid-cols-2">

                                            <div>
                                                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                    First Name
                                                    <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    required
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    placeholder="First name"
                                                    className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                    Last Name
                                                    <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    required
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    placeholder="Last name"
                                                    className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                />
                                            </div>

                                        </div>

                                        {/* COMPANY */}
                                        <div className="mt-6">
                                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                Company Name
                                                <span className="ml-1 text-zinc-400 dark:text-[#59645d]">
                                                    (Optional)
                                                </span>
                                            </label>

                                            <input
                                                type="text"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                                placeholder="Company name"
                                                className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            />
                                        </div>

                                        {/* COUNTRY */}
                                        <div className="mt-6">
                                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                Country / Region
                                                <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                            </label>

                                            <select
                                                required
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            >
                                                <option value="United Kingdom">
                                                    United Kingdom
                                                </option>

                                                <option value="United States">
                                                    United States
                                                </option>

                                                <option value="India">
                                                    India
                                                </option>

                                                <option value="Canada">
                                                    Canada
                                                </option>

                                                <option value="Australia">
                                                    Australia
                                                </option>
                                            </select>
                                        </div>

                                        {/* STREET */}
                                        <div className="mt-6">
                                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                Street Address
                                                <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                required
                                                value={street}
                                                onChange={(e) => setStreet(e.target.value)}
                                                placeholder="House number and street name"
                                                className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            />

                                            <input
                                                type="text"
                                                value={apartment}
                                                onChange={(e) => setApartment(e.target.value)}
                                                placeholder="Apartment, suite, unit, etc. (optional)"
                                                className="mt-3 w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            />
                                        </div>

                                        {/* CITY */}
                                        <div className="mt-6">
                                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                Town / City
                                                <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                            </label>

                                            <input
                                                type="text"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="Town / City"
                                                className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            />
                                        </div>

                                        {/* STATE + POSTCODE */}
                                        <div className="mt-6 grid gap-6 sm:grid-cols-2">

                                            <div>
                                                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                    State
                                                    <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    required
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    placeholder="State"
                                                    className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                    Postcode / ZIP
                                                    <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                                </label>

                                                <input
                                                    type="text"
                                                    required
                                                    value={postcode}
                                                    onChange={(e) => setPostcode(e.target.value)}
                                                    placeholder="Postcode / ZIP"
                                                    className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                />
                                            </div>

                                        </div>

                                        {/* PHONE */}
                                        <div className="mt-6">
                                            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                Phone
                                                <span className="ml-1 text-purple-600 dark:text-[#d4b56a]">*</span>
                                            </label>

                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Phone number"
                                                className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                            />
                                        </div>

                                        {/* ADDITIONAL INFORMATION */}
                                        <div className="mt-10 border-t border-purple-100 pt-8 dark:border-[#1e3b2b]">

                                            <h3 className="font-serif text-3xl text-zinc-900 sm:text-4xl dark:text-[#f2eee3]">
                                                Additional Information
                                            </h3>

                                            <div className="mt-7">
                                                <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700 dark:text-[#c6cbc7]">
                                                    Order Notes
                                                    <span className="ml-1 text-zinc-400 dark:text-[#59645d]">
                                                        (Optional)
                                                    </span>
                                                </label>

                                                <textarea
                                                    rows={6}
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                                    className="w-full resize-none rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                />
                                            </div>

                                        </div>

                                    </div>
                                </section>

                                {/* =========================
                      YOUR ORDER
                  ========================= */}
                                <aside className="lg:col-span-5">

                                    <div className="sticky top-8">

                                        <div className="mb-8">
                                            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-purple-700 dark:text-[#d4b56a]">
                                                Order Summary
                                            </span>

                                            <h2 className="font-serif text-4xl font-normal text-zinc-900 sm:text-5xl dark:text-[#f2eee3]">
                                                Your Order
                                            </h2>

                                            <div className="mt-4 h-0.5 w-20 bg-purple-600 dark:bg-[#d4b56a]" />
                                        </div>

                                        {/* =========================
                          ORDER SUMMARY CARD
                      ========================= */}
                                        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-8 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                                            <div className="mb-5 flex items-center justify-between border-b border-purple-100 pb-4 dark:border-[#1e3b2b]">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-700 dark:text-[#d4b56a]">
                                                    Product
                                                </span>

                                                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-700 dark:text-[#d4b56a]">
                                                    Total
                                                </span>
                                            </div>

                                            <div className="space-y-5">
                                                {cartItems.length === 0 ? (
                                                    <div className="text-center py-6 text-zinc-500 dark:text-[#8d9790]">
                                                        <p className="text-sm">Your shopping cart is currently empty.</p>
                                                        <Link
                                                            href="/shop"
                                                            className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-[#d4b56a] hover:underline"
                                                        >
                                                            Return to Shop →
                                                        </Link>
                                                    </div>
                                                ) : (
                                                    cartItems.map((item) => {
                                                        const unitPrice =
                                                            item.numericPrice !== undefined && item.numericPrice > 0
                                                                ? item.numericPrice
                                                                : parsePrice(item.price);
                                                        const lineTotal = unitPrice * item.quantity;
                                                        const itemTitle = item.title || (item as any).name || "Untitled";

                                                        return (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-start justify-between gap-5"
                                                            >
                                                                <div>
                                                                    <p className="text-sm font-medium text-zinc-900 dark:text-[#f2eee3]">
                                                                        {itemTitle}
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-zinc-500 dark:text-[#7e8981]">
                                                                        × {item.quantity}
                                                                    </p>
                                                                </div>

                                                                <span className="whitespace-nowrap text-sm font-semibold text-purple-700 dark:text-[#d4b56a]">
                                                                    £{lineTotal.toFixed(2)}
                                                                </span>
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>

                                            {/* SUBTOTAL */}
                                            <div className="mt-7 border-t border-purple-100 pt-5 dark:border-[#1e3b2b]">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-zinc-600 dark:text-[#8d9790]">
                                                        Subtotal
                                                    </span>

                                                    <span className="text-sm font-semibold text-zinc-900 dark:text-[#f2eee3]">
                                                        £{subtotal.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* TOTAL */}
                                            <div className="mt-4 flex items-center justify-between border-t border-purple-200 pt-5 dark:border-[#294333]">
                                                <span className="font-serif text-xl text-zinc-900 dark:text-[#f2eee3]">
                                                    Total
                                                </span>

                                                <span className="font-serif text-2xl font-bold text-purple-700 dark:text-[#d4b56a]">
                                                    £{total.toFixed(2)}
                                                </span>
                                            </div>

                                        </div>

                                        {/* =========================
                          PAYMENT / CARD DETAILS CARD
                      ========================= */}
                                        <div className="mt-8">

                                            {/* CREDIT / DEBIT CARDS TAB HEADER */}
                                            <div className="flex items-center justify-between px-2 pb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold tracking-wide text-zinc-800 dark:text-[#f2eee3]">
                                                        Credit/Debit Cards
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    {/* AMEX */}
                                                    <div className="flex h-5 items-center justify-center rounded bg-[#006FCF] px-1.5 text-[8px] font-black tracking-wider text-white shadow-sm">
                                                        AMEX
                                                    </div>
                                                    {/* DISCOVER */}
                                                    <div className="flex h-5 items-center justify-center rounded bg-[#231F20] px-1.5 text-[8px] font-bold text-white shadow-sm">
                                                        <span className="text-[#F47216]">DISC</span>OVER
                                                    </div>
                                                    {/* VISA */}
                                                    <div className="flex h-5 items-center justify-center rounded bg-[#1A1F71] px-1.5 text-[9px] font-extrabold italic tracking-wider text-white shadow-sm">
                                                        VISA
                                                    </div>
                                                    {/* MASTERCARD */}
                                                    <div className="flex h-5 items-center justify-center rounded bg-[#222] px-1.5 shadow-sm">
                                                        <span className="h-3 w-3 -mr-1 rounded-full bg-[#EB001B]" />
                                                        <span className="h-3 w-3 rounded-full bg-[#F79E1B]/90" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* TAB POINTER ARROW */}
                                            <div className="relative pl-6">
                                                <div className="h-0 w-0 border-x-[7px] border-b-[7px] border-x-transparent border-b-purple-100 dark:border-b-[#1e3b2b]" />
                                            </div>

                                            {/* MAIN PAYMENT BOX WITH STRIPE */}
                                            <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-7 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                                                <StripePaymentSection
                                                    clientSecret={clientSecret}
                                                    stripePromise={stripePromise}
                                                    total={total}
                                                    isProcessing={isProcessing}
                                                    setIsProcessing={setIsProcessing}
                                                    isKeysConfigured={isKeysConfigured}
                                                    errorMessage={paymentError}
                                                    setErrorMessage={setPaymentError}
                                                    onSuccess={handlePaymentSuccess}
                                                    onValidateBilling={handleValidateBilling}
                                                    customerName={`${firstName} ${lastName}`.trim()}
                                                    customerEmail={email.trim()}
                                                    customerPhone={phone.trim()}
                                                    shippingAddress={{
                                                        line1: street.trim(),
                                                        line2: apartment.trim() || undefined,
                                                        city: city.trim(),
                                                        state: state.trim(),
                                                        postal_code: postcode.trim(),
                                                        country: getCountryCode(country),
                                                    }}
                                                    linkOpen={linkOpen}
                                                    setLinkOpen={setLinkOpen}
                                                    setIsLinkModalOpen={setIsLinkModalOpen}
                                                    cartIsEmpty={cartItems.length === 0}
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </aside>

                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ========================================================
                LINK INFO MODAL (Stripe Link Details Popup)
            ======================================================== */}
            {isLinkModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
                    onClick={() => setIsLinkModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-[400px] rounded-3xl bg-white p-7 sm:p-8 shadow-2xl transition-all dark:bg-[#0c1a12] dark:border dark:border-[#1e3b2b]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* HEADER: LOGO & CLOSE BUTTON */}
                        <div className="flex items-center justify-between">
                            {/* LINK LOGO */}
                            <a
                                href="https://link.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 group"
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

                            {/* CLOSE BUTTON */}
                            <button
                                type="button"
                                onClick={() => setIsLinkModalOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-[#14281c] dark:hover:text-zinc-100 transition"
                                aria-label="Close modal"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* HEADLINE */}
                        <h3 className="mt-7 mb-8 text-center text-2xl font-bold leading-tight text-zinc-900 dark:text-white">
                            Pay quickly,<br />shop confidently
                        </h3>

                        {/* 3 FEATURE ITEMS */}
                        <div className="space-y-6">
                            {/* ITEM 1 */}
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-zinc-900 dark:text-zinc-100 shrink-0">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                                        Fast and simple
                                    </h4>
                                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        Autofill your payment, contact, and shipping details at checkout.
                                    </p>
                                </div>
                            </div>

                            {/* ITEM 2 */}
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-zinc-900 dark:text-zinc-100 shrink-0">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="5" width="20" height="14" rx="2" />
                                        <line x1="2" y1="10" x2="22" y2="10" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                                        Multiple ways to pay
                                    </h4>
                                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        Choose from your favorite cards or bank account.
                                    </p>
                                </div>
                            </div>

                            {/* ITEM 3 */}
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-zinc-900 dark:text-zinc-100 shrink-0">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                                        Protects your data
                                    </h4>
                                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                                        Shop safely knowing your information is encrypted.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER LINKS */}
                        <div className="mt-9 flex items-center justify-center gap-7 text-xs text-zinc-500 dark:text-zinc-400">
                            <a
                                href="https://link.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-zinc-900 dark:hover:text-white hover:underline transition"
                            >
                                Privacy
                            </a>
                            <a
                                href="https://link.com/cookies"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-zinc-900 dark:hover:text-white hover:underline transition"
                            >
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* =========================
          FOOTER
      ========================= */}
            <Footer />
        </div>
    );
}