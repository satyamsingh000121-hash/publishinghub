"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
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
    // PAYMENT & CONTACT (LINK)
    // =========================
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [cardName, setCardName] = useState("");
    const [linkOpen, setLinkOpen] = useState(true);
    const [saveInfoEmail, setSaveInfoEmail] = useState("");
    const [saveInfoPhone, setSaveInfoPhone] = useState("");
    const [saveInfoName, setSaveInfoName] = useState("");
    const [savedSuccessMsg, setSavedSuccessMsg] = useState("");
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    // =========================
    // CARD FORMATTERS & HELPERS
    // =========================
    const getCardBrand = (num: string) => {
        const clean = num.replace(/\s+/g, "");
        if (/^4/.test(clean)) return "VISA";
        if (/^(5[1-5]|2[2-7])/.test(clean)) return "MASTERCARD";
        if (/^3[47]/.test(clean)) return "AMEX";
        if (/^(6011|65|64[4-9])/.test(clean)) return "DISCOVER";
        return "CARD";
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
        const parts = raw.match(/.{1,4}/g);
        setCardNumber(parts ? parts.join(" ") : "");
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
        if (raw.length > 2) {
            raw = `${raw.slice(0, 2)} / ${raw.slice(2)}`;
        }
        setExpiry(raw);
    };

    const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
        setCvc(raw);
    };

    // =========================
    // ORDER DATA
    // =========================
    const orderItems = [
        {
            id: 1,
            name: "Bulle und Pelle",
            quantity: 2,
            price: 56,
        },
        {
            id: 2,
            name: "All this has nothing to do with Me",
            quantity: 1,
            price: 20,
        },
        {
            id: 3,
            name: "Dear Brain",
            quantity: 2,
            price: 36,
        },
        {
            id: 4,
            name: "Peter and the Wolf",
            quantity: 1,
            price: 22,
        },
    ];

    const subtotal = orderItems.reduce(
        (total, item) => total + item.price,
        0
    );

    const total = subtotal;

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

    // =========================
    // PLACE ORDER
    // =========================
    const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        alert("Order form submitted.");
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
              BILLING + ORDER
          ========================= */}
                    <form onSubmit={handlePlaceOrder}>
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
                                            {orderItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-start justify-between gap-5"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-[#f2eee3]">
                                                            {item.name}
                                                        </p>

                                                        <p className="mt-1 text-xs text-zinc-500 dark:text-[#7e8981]">
                                                            × {item.quantity}
                                                        </p>
                                                    </div>

                                                    <span className="whitespace-nowrap text-sm font-semibold text-purple-700 dark:text-[#d4b56a]">
                                                        £{item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
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

                                        {/* MAIN PAYMENT BOX */}
                                        <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-xl shadow-purple-500/5 sm:p-7 dark:border-[#1e3b2b] dark:bg-[#08140e] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                                            {/* SECURE FAST CHECKOUT WITH LINK */}
                                            <div className="mb-6 flex w-full items-center justify-between rounded-lg border border-emerald-200/80 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-700 transition dark:border-transparent dark:bg-[#0d261b]/80 dark:text-emerald-400">
                                                <button
                                                    type="button"
                                                    onClick={() => setLinkOpen(!linkOpen)}
                                                    className="flex flex-1 items-center gap-2 text-left hover:opacity-90"
                                                >
                                                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4zm-3 5a1 1 0 112 0v2a1 1 0 11-2 0v-2z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Secure, fast checkout with Link</span>
                                                </button>

                                                <div className="flex items-center gap-2">
                                                    {/* INFO BUTTON TO OPEN LINK MODAL */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsLinkModalOpen(true)}
                                                        title="What is Link?"
                                                        className="flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800 hover:bg-emerald-200 dark:bg-[#143d2b] dark:text-emerald-300 dark:hover:bg-[#1b5239] transition"
                                                    >
                                                        <span>About</span>
                                                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                        </svg>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => setLinkOpen(!linkOpen)}
                                                        className="p-1 hover:opacity-80"
                                                        aria-label="Toggle section"
                                                    >
                                                        <svg
                                                            className={`h-4 w-4 transition-transform duration-200 ${linkOpen ? "rotate-180" : ""}`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* CARD PREVIEW */}
                                            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#1b103c] via-[#221546] to-[#0f0920] p-5 sm:p-6 shadow-2xl text-white dark:border-[#d4b56a]/30 dark:from-[#0b2417] dark:via-[#0f3020] dark:to-[#040e08] dark:shadow-[0_20px_45px_rgba(0,0,0,0.6)]">
                                                {/* AMBIENT GLOWS */}
                                                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/25 blur-3xl dark:bg-[#d4b56a]/20" />
                                                <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl dark:bg-emerald-500/20" />
                                                <div className="pointer-events-none absolute -inset-full top-0 h-[200%] w-[200%] rotate-45 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

                                                {/* TOP ROW: CHIP, BRAND & CARD TYPE */}
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

                                                    {/* RIGHT SIDE: DETECTED BRAND OR SLEEK CARD BADGE */}
                                                    <div className="flex items-center gap-2">
                                                        {getCardBrand(cardNumber) === "VISA" && (
                                                            <span className="rounded bg-[#1A1F71] px-2.5 py-1 text-xs font-black italic tracking-wider text-white shadow-sm border border-white/20">
                                                                VISA
                                                            </span>
                                                        )}
                                                        {getCardBrand(cardNumber) === "MASTERCARD" && (
                                                            <div className="flex items-center">
                                                                <span className="h-5 w-5 rounded-full bg-[#EB001B] opacity-95 shadow-sm" />
                                                                <span className="h-5 w-5 -ml-2 rounded-full bg-[#F79E1B] opacity-95 shadow-sm" />
                                                            </div>
                                                        )}
                                                        {getCardBrand(cardNumber) === "AMEX" && (
                                                            <span className="rounded bg-[#006FCF] px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white shadow-sm">
                                                                AMEX
                                                            </span>
                                                        )}
                                                        {getCardBrand(cardNumber) === "DISCOVER" && (
                                                            <span className="rounded bg-[#FF6000] px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white shadow-sm">
                                                                DISCOVER
                                                            </span>
                                                        )}
                                                        {getCardBrand(cardNumber) === "CARD" && (
                                                            <span className="text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-purple-300 drop-shadow-[0_0_10px_rgba(192,132,252,0.7)] dark:text-[#d4b56a] dark:drop-shadow-[0_0_10px_rgba(212,181,106,0.7)]">
                                                                CARD
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* MIDDLE ROW: CARD NUMBER */}
                                                <div className="relative z-10 mt-6 min-h-[32px] flex items-center">
                                                    {cardNumber ? (
                                                        <p className="font-mono text-base font-bold tracking-[0.22em] text-white drop-shadow-md sm:text-xl">
                                                            {cardNumber}
                                                        </p>
                                                    ) : (
                                                        <div className="flex items-center gap-3 sm:gap-4 py-1.5">
                                                            {[0, 1, 2, 3].map((group) => (
                                                                <div key={group} className="flex gap-1.5 sm:gap-2">
                                                                    <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] ring-1 ring-white/30" />
                                                                    <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] ring-1 ring-white/30" />
                                                                    <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] ring-1 ring-white/30" />
                                                                    <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] ring-1 ring-white/30" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* BOTTOM ROW: CARD HOLDER & EXPIRES */}
                                                <div className="relative z-10 mt-6 flex items-end justify-between">
                                                    <div>
                                                        <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-purple-200/80 dark:text-[#d4b56a]/80">
                                                            Card Holder
                                                        </p>
                                                        <p className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white drop-shadow-sm">
                                                            {cardName || saveInfoName || (firstName || lastName ? `${firstName} ${lastName}`.trim() : "") || "YOUR NAME"}
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.22em] text-purple-200/80 dark:text-[#d4b56a]/80">
                                                            Expires
                                                        </p>
                                                        <p className="mt-1 font-mono text-xs sm:text-sm font-semibold tracking-wider text-white drop-shadow-sm">
                                                            {expiry || "MM / YY"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CARD NUMBER */}
                                            <div className="mb-4">
                                                <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-[#c6cbc7]">
                                                    Card number
                                                </label>

                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        value={cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        placeholder="1234 1234 1234 1234"
                                                        maxLength={19}
                                                        className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3 pr-28 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                    />

                                                    {/* CARD BRAND ICONS INSIDE INPUT */}
                                                    <div className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
                                                        <span className="rounded bg-[#1A1F71] px-1 py-0.5 text-[7px] font-black italic text-white">VISA</span>
                                                        <div className="flex rounded bg-[#222] px-1 py-0.5">
                                                            <span className="h-2.5 w-2.5 -mr-1 rounded-full bg-[#EB001B]" />
                                                            <span className="h-2.5 w-2.5 rounded-full bg-[#F79E1B]" />
                                                        </div>
                                                        <span className="rounded bg-[#006FCF] px-1 py-0.5 text-[7px] font-bold text-white">AMEX</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* EXPIRY & CVC */}
                                            <div className="mb-4 grid grid-cols-2 gap-3.5">
                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-[#c6cbc7]">
                                                        Expiration date
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={expiry}
                                                        onChange={handleExpiryChange}
                                                        placeholder="MM / YY"
                                                        maxLength={7}
                                                        className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1.5 block text-xs font-medium text-zinc-700 dark:text-[#c6cbc7]">
                                                        Security code
                                                    </label>

                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            inputMode="numeric"
                                                            value={cvc}
                                                            onChange={handleCvcChange}
                                                            placeholder="CVC"
                                                            maxLength={4}
                                                            className="w-full rounded-lg border border-purple-200 bg-[#faf8fd] px-4 py-3 pr-10 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a] dark:focus:ring-[#d4b56a]"
                                                        />

                                                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-[#7e8981]">
                                                            <svg className="h-5 w-6" viewBox="0 0 24 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                <rect x="1" y="2" width="22" height="14" rx="2" stroke="currentColor" />
                                                                <line x1="1" y1="6" x2="23" y2="6" stroke="currentColor" />
                                                                <rect x="4" y="10" width="5" height="3" fill="currentColor" />
                                                                <text x="14" y="13" fontSize="5" fill="currentColor" fontFamily="sans-serif" stroke="none">123</text>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ========================================================
                          SAVE MY INFORMATION FOR FASTER CHECKOUT (CONTACT FORM)
                      ======================================================== */}
                                            <div className="rounded-xl border border-purple-100 bg-[#faf8fd] p-4 sm:p-5 dark:border-[#1e3b2b] dark:bg-[#06110a]">
                                                <div className="mb-4">
                                                    <span className="inline-block rounded border border-purple-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-purple-700 dark:border-[#294333] dark:bg-[#08140e] dark:text-[#8d9790]">
                                                        Optional
                                                    </span>

                                                    <h4 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-[#f2eee3]">
                                                        Save my information for faster checkout
                                                    </h4>
                                                </div>

                                                {/* EMAIL */}
                                                <div className="mb-3.5">
                                                    <label className="mb-1 block text-xs text-zinc-600 dark:text-[#8d9790]">
                                                        Email
                                                    </label>

                                                    <input
                                                        type="email"
                                                        value={saveInfoEmail}
                                                        onChange={(e) => setSaveInfoEmail(e.target.value)}
                                                        placeholder="you@example.com"
                                                        className="w-full rounded-lg border border-purple-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a]"
                                                    />
                                                </div>

                                                {/* MOBILE NUMBER */}
                                                <div className="mb-3.5">
                                                    <label className="mb-1 block text-xs text-zinc-600 dark:text-[#8d9790]">
                                                        Mobile number
                                                    </label>

                                                    <div className="flex rounded-lg border border-purple-200 bg-white focus-within:border-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:focus-within:border-[#d4b56a]">
                                                        <div className="flex items-center gap-1.5 border-r border-purple-200 px-3 py-2 text-sm text-zinc-800 dark:border-[#294333] dark:text-[#f2eee3]">
                                                            <span className="text-base leading-none">🇮🇳</span>
                                                            <span className="text-xs text-zinc-400 dark:text-[#8d9790]">⌵</span>
                                                        </div>

                                                        <input
                                                            type="tel"
                                                            value={saveInfoPhone}
                                                            onChange={(e) => setSaveInfoPhone(e.target.value)}
                                                            placeholder="081234 56789"
                                                            className="w-full bg-transparent px-3.5 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-[#f2eee3] dark:placeholder:text-[#59645d]"
                                                        />
                                                    </div>
                                                </div>

                                                {/* FULL NAME */}
                                                <div className="mb-4">
                                                    <label className="mb-1 block text-xs text-zinc-600 dark:text-[#8d9790]">
                                                        Full name
                                                    </label>

                                                    <input
                                                        type="text"
                                                        value={saveInfoName}
                                                        onChange={(e) => setSaveInfoName(e.target.value)}
                                                        placeholder="First and last name"
                                                        className="w-full rounded-lg border border-purple-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-purple-600 dark:border-[#294333] dark:bg-[#050b08] dark:text-[#f2eee3] dark:placeholder:text-[#59645d] dark:focus:border-[#d4b56a]"
                                                    />
                                                </div>

                                                {/* LINK DISCLAIMER */}
                                                <div className="mb-4">
                                                    <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-[#7e8981]">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsLinkModalOpen(true)}
                                                            className="mr-1 inline-flex shrink-0 items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 dark:text-[#00D66F] dark:hover:text-[#38ef90] whitespace-nowrap group transition cursor-pointer"
                                                            title="What is Link?"
                                                        >
                                                            <svg className="h-3 w-3 transition-transform group-hover:scale-110" viewBox="0 0 16 16" fill="currentColor">
                                                                <circle cx="8" cy="8" r="7.5" fill="currentColor" />
                                                                <path d="M6 4.5l4.5 3.5-4.5 3.5v-7z" fill="white" />
                                                            </svg>
                                                            <span className="underline decoration-dotted underline-offset-2">link</span>
                                                        </button>
                                                        • By providing phone number and email, you agree to create an account subject to Link's{" "}
                                                        <a
                                                            href="https://link.com/terms"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium text-emerald-600 underline hover:text-emerald-700 dark:text-[#00D66F] dark:hover:text-[#38ef90]"
                                                        >
                                                            Terms
                                                        </a>{" "}
                                                        and{" "}
                                                        <a
                                                            href="https://link.com/privacy"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium text-emerald-600 underline hover:text-emerald-700 dark:text-[#00D66F] dark:hover:text-[#38ef90]"
                                                        >
                                                            Privacy Policy
                                                        </a>.
                                                    </p>
                                                </div>

                                                {/* SAVE TO ACCOUNT BUTTON */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSavedSuccessMsg("Information saved to account for faster checkout.");
                                                        setTimeout(() => setSavedSuccessMsg(""), 4000);
                                                    }}
                                                    className="text-xs font-semibold text-purple-700 transition hover:text-purple-900 dark:text-[#d4b56a] dark:hover:text-[#f2eee3]"
                                                >
                                                    Save to account
                                                </button>

                                                {savedSuccessMsg && (
                                                    <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                                                        ✓ {savedSuccessMsg}
                                                    </p>
                                                )}
                                            </div>

                                            {/* PLACE ORDER */}
                                            <button
                                                type="submit"
                                                className="mt-6 w-full rounded-md border border-purple-600 bg-purple-600 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-purple-500/25 transition duration-300 hover:bg-purple-700 dark:border-[#d4b56a] dark:bg-[#d4b56a] dark:text-[#050b08] dark:hover:bg-transparent dark:hover:text-[#d4b56a] dark:shadow-none"
                                            >
                                                Place Order — £{total.toFixed(2)}
                                            </button>

                                            {/* PRIVACY DISCLAIMER */}
                                            <p className="mt-4 text-center text-[11px] leading-5 text-zinc-500 dark:text-[#69746d]">
                                                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
                                                <Link href="/privacy-policy" className="underline text-purple-600 hover:text-purple-700 dark:text-[#d4b56a] dark:hover:text-[#f2eee3]">
                                                    privacy policy
                                                </Link>.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </aside>

                        </div>
                    </form>
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