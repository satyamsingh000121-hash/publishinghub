"use client";

import { useState } from "react";
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
  // PAYMENT
  // =========================
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // =========================
  // ORDER DATA
  // =========================
  const orderItems = [
    {
      id: 1,
      name: "Bulle and Pelle",
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
    <div className="min-h-screen bg-[#050b08] text-[#f2eee3]">
      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar />

      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="border-b border-[#1e3b2b] bg-[#07110c]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <h1 className="font-display text-4xl font-normal tracking-tight text-[#f2eee3] sm:text-5xl">
              Checkout
            </h1>

            <div className="text-sm text-[#7f8982]">
              <span>Home</span>
              <span className="mx-2 text-[#526057]">/</span>
              <span>Shop</span>
              <span className="mx-2 text-[#526057]">/</span>
              <span className="text-[#d4b56a]">Checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN CHECKOUT
      ========================= */}
      <main className="bg-[#050b08]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">

          {/* =========================
              LOGIN LINK
          ========================= */}
          <div className="mb-4 text-center">
            <button
              type="button"
              onClick={() => setShowLogin(!showLogin)}
              className="text-sm font-medium text-[#d4b56a] transition duration-300 hover:text-[#f2eee3]"
            >
              {showLogin ? "Close login" : "Click here to login"}
            </button>
          </div>

          {/* =========================
              LOGIN FORM
          ========================= */}
          {showLogin && (
            <div className="mx-auto mb-8 max-w-5xl rounded-2xl border border-[#1e3b2b] bg-[#08140e] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">

              <div className="mb-7">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4b56a]">
                  Returning Customer
                </span>

                <h2 className="font-display text-2xl text-[#f2eee3] sm:text-3xl">
                  Login to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#8d9790]">
                  If you have shopped with us before, please enter your
                  details below. If you are a new customer, please proceed
                  to the Billing Details section.
                </p>
              </div>

              <div className="grid gap-5">

                {/* USERNAME */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                    Username or Email
                    <span className="ml-1 text-[#d4b56a]">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Username or email"
                    className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                    Password
                    <span className="ml-1 text-[#d4b56a]">*</span>
                  </label>

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-5">

                  <button
                    type="button"
                    className="rounded-md border border-[#d4b56a] bg-[#d4b56a] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050b08] transition duration-300 hover:bg-transparent hover:text-[#d4b56a]"
                  >
                    Login
                  </button>

                  <label className="flex cursor-pointer items-center gap-2 text-xs text-[#8d9790]">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#d4b56a]"
                    />
                    Remember me
                  </label>

                </div>

                <button
                  type="button"
                  className="w-fit text-xs text-[#8d9790] transition hover:text-[#d4b56a]"
                >
                  Lost your password?
                </button>

              </div>
            </div>
          )}

          {/* =========================
              COUPON LINK
          ========================= */}
          <div className="mx-auto mb-12 max-w-5xl">
            <p className="text-sm text-[#8d9790]">
              Have a coupon?{" "}
              <button
                type="button"
                onClick={() => setShowCoupon(!showCoupon)}
                className="font-medium text-[#d4b56a] transition hover:text-[#f2eee3]"
              >
                {showCoupon
                  ? "Close coupon"
                  : "Click here to enter your code"}
              </button>
            </p>
          </div>

          {/* =========================
              COUPON FORM
          ========================= */}
          {showCoupon && (
            <div className="mx-auto mb-12 max-w-5xl rounded-2xl border border-[#1e3b2b] bg-[#08140e] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">

              <div className="mb-5">
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4b56a]">
                  Special Offer
                </span>

                <h3 className="mt-2 font-display text-2xl text-[#f2eee3]">
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
                  className="flex-1 rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                />

                <button
                  type="submit"
                  className="rounded-md border border-[#d4b56a] bg-[#d4b56a] px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#050b08] transition duration-300 hover:bg-transparent hover:text-[#d4b56a]"
                >
                  Apply Coupon
                </button>
              </form>

              {couponMessage && (
                <p className="mt-4 text-xs text-[#d4b56a]">
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
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4b56a]">
                    Checkout
                  </span>

                  <h2 className="font-display text-4xl font-normal text-[#f2eee3] sm:text-5xl">
                    Billing Details
                  </h2>

                  <div className="mt-4 h-px w-20 bg-[#d4b56a]" />
                </div>

                <div className="rounded-2xl border border-[#1e3b2b] bg-[#08140e] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-8">

                  {/* EMAIL */}
                  <div className="mb-6">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                      Email Address
                      <span className="ml-1 text-[#d4b56a]">*</span>
                    </label>

                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                    />
                  </div>

                  {/* FIRST + LAST NAME */}
                  <div className="grid gap-6 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                        First Name
                        <span className="ml-1 text-[#d4b56a]">*</span>
                      </label>

                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                        Last Name
                        <span className="ml-1 text-[#d4b56a]">*</span>
                      </label>

                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                      />
                    </div>

                  </div>

                  {/* COMPANY */}
                  <div className="mt-6">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                      Company Name
                      <span className="ml-1 text-[#59645d]">
                        (Optional)
                      </span>
                    </label>

                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company name"
                      className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                    />
                  </div>

                  {/* COUNTRY */}
                  <div className="mt-6">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                      Country / Region
                      <span className="ml-1 text-[#d4b56a]">*</span>
                    </label>

                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
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
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                      Street Address
                      <span className="ml-1 text-[#d4b56a]">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="House number and street name"
                      className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                    />

                    <input
                      type="text"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="mt-3 w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                    />
                  </div>

                  {/* CITY */}
                  <div className="mt-6">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                      Town / City
                      <span className="ml-1 text-[#d4b56a]">*</span>
                    </label>

                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Town / City"
                      className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                    />
                  </div>

                  {/* STATE + POSTCODE */}
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                        State
                        <span className="ml-1 text-[#d4b56a]">*</span>
                      </label>

                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                        Postcode / ZIP
                        <span className="ml-1 text-[#d4b56a]">*</span>
                      </label>

                      <input
                        type="text"
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="Postcode / ZIP"
                        className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                      />
                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="mt-6">
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                      Phone
                      <span className="ml-1 text-[#d4b56a]">*</span>
                    </label>

                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                    />
                  </div>

                  {/* ADDITIONAL INFORMATION */}
                  <div className="mt-10 border-t border-[#1e3b2b] pt-8">

                    <h3 className="font-display text-3xl text-[#f2eee3] sm:text-4xl">
                      Additional Information
                    </h3>

                    <div className="mt-7">
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                        Order Notes
                        <span className="ml-1 text-[#59645d]">
                          (Optional)
                        </span>
                      </label>

                      <textarea
                        rows={6}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        className="w-full resize-none rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
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
                    <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-[#d4b56a]">
                      Order Summary
                    </span>

                    <h2 className="font-display text-4xl font-normal text-[#f2eee3] sm:text-5xl">
                      Your Order
                    </h2>

                    <div className="mt-4 h-px w-20 bg-[#d4b56a]" />
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-[#1e3b2b] bg-[#08140e] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

                    {/* ORDER ITEMS */}
                    <div className="p-6 sm:p-8">

                      <div className="mb-5 flex items-center justify-between border-b border-[#1e3b2b] pb-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4b56a]">
                          Product
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4b56a]">
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
                              <p className="text-sm text-[#f2eee3]">
                                {item.name}
                              </p>

                              <p className="mt-1 text-xs text-[#7e8981]">
                                × {item.quantity}
                              </p>
                            </div>

                            <span className="whitespace-nowrap text-sm text-[#d4b56a]">
                              £{item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}

                      </div>

                      {/* SUBTOTAL */}
                      <div className="mt-7 border-t border-[#1e3b2b] pt-5">

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#8d9790]">
                            Subtotal
                          </span>

                          <span className="text-sm text-[#f2eee3]">
                            £{subtotal.toFixed(2)}
                          </span>
                        </div>

                      </div>

                      {/* TOTAL */}
                      <div className="mt-4 flex items-center justify-between border-t border-[#294333] pt-5">

                        <span className="font-display text-xl text-[#f2eee3]">
                          Total
                        </span>

                        <span className="font-display text-2xl text-[#d4b56a]">
                          £{total.toFixed(2)}
                        </span>

                      </div>

                    </div>

                    {/* =========================
                        PAYMENT
                    ========================= */}
                    <div className="border-t border-[#1e3b2b] bg-[#07110c] p-6 sm:p-8">

                      <div className="mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4b56a]">
                          Secure Payment
                        </span>

                        <h3 className="mt-2 font-display text-2xl text-[#f2eee3]">
                          Card Details
                        </h3>
                      </div>

                      {/* CARD PREVIEW */}
                      <div className="mb-6 rounded-xl border border-[#294333] bg-gradient-to-br from-[#10291d] to-[#07110c] p-5">

                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8d9790]">
                              Publishing Hub
                            </p>

                            <p className="mt-5 text-lg tracking-[0.18em] text-[#f2eee3]">
                              {cardNumber
                                ? cardNumber
                                    .replace(/\s/g, "")
                                    .replace(/(.{4})/g, "$1 ")
                                    .trim()
                                : "•••• •••• •••• ••••"}
                            </p>
                          </div>

                          <div className="text-xl text-[#d4b56a]">
                            CARD
                          </div>
                        </div>

                        <div className="mt-6 flex items-end justify-between">
                          <div>
                            <p className="text-[8px] uppercase tracking-[0.18em] text-[#6e7971]">
                              Card Holder
                            </p>

                            <p className="mt-1 text-xs uppercase text-[#d5d9d5]">
                              {cardName || "YOUR NAME"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[8px] uppercase tracking-[0.18em] text-[#6e7971]">
                              Expires
                            </p>

                            <p className="mt-1 text-xs text-[#d5d9d5]">
                              {expiry || "MM / YY"}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* CARD NUMBER */}
                      <div className="mb-5">
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                          Card Number
                        </label>

                        <input
                          type="text"
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(e) =>
                            setCardNumber(e.target.value)
                          }
                          placeholder="1234 1234 1234 1234"
                          className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                        />
                      </div>

                      {/* CARD NAME */}
                      <div className="mb-5">
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                          Cardholder Name
                        </label>

                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) =>
                            setCardName(e.target.value)
                          }
                          placeholder="Name on card"
                          className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                        />
                      </div>

                      {/* EXPIRY + CVC */}
                      <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                            Expiration Date
                          </label>

                          <input
                            type="text"
                            value={expiry}
                            onChange={(e) =>
                              setExpiry(e.target.value)
                            }
                            placeholder="MM / YY"
                            className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-[#c6cbc7]">
                            Security Code
                          </label>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={cvc}
                            onChange={(e) =>
                              setCvc(e.target.value)
                            }
                            placeholder="CVC"
                            className="w-full rounded-lg border border-[#294333] bg-[#050b08] px-4 py-3.5 text-sm text-[#f2eee3] outline-none transition placeholder:text-[#59645d] focus:border-[#d4b56a] focus:ring-1 focus:ring-[#d4b56a]"
                          />
                        </div>

                      </div>

                      {/* SECURE MESSAGE */}
                      <div className="mt-6 rounded-lg border border-[#1e3b2b] bg-[#050b08] p-4">

                        <div className="flex gap-3">

                          <div className="mt-0.5 text-[#d4b56a]">
                            ✓
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-[#f2eee3]">
                              Secure checkout
                            </p>

                            <p className="mt-1 text-[11px] leading-5 text-[#7e8981]">
                              Your payment information is protected
                              during checkout.
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* PLACE ORDER */}
                      <button
                        type="submit"
                        className="mt-6 w-full rounded-md border border-[#d4b56a] bg-[#d4b56a] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#050b08] transition duration-300 hover:bg-transparent hover:text-[#d4b56a]"
                      >
                        Place Order — £{total.toFixed(2)}
                      </button>

                      <p className="mt-4 text-center text-[10px] leading-5 text-[#69746d]">
                        Your personal data will be used to process your
                        order and support your experience throughout this
                        website.
                      </p>

                    </div>

                  </div>

                </div>

              </aside>

            </div>
          </form>
        </div>
      </main>

      {/* =========================
          FOOTER
      ========================= */}
      <Footer />
    </div>
  );
}