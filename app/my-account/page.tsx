"use client";

import React, { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff, ArrowRight, Check, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyAccountPage() {
  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Register State
  const [registerEmail, setRegisterEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);
      setToastMessage(`Welcome back! Logged in as ${loginIdentifier}.`);
      setLoginPassword("");
      setTimeout(() => setToastMessage(null), 4500);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);

    setTimeout(() => {
      setIsRegistering(false);
      setToastMessage(`Registration link sent to ${registerEmail}. Please check your inbox.`);
      setRegisterEmail("");
      setTimeout(() => setToastMessage(null), 5000);
    }, 800);
  };

  return (
    <main className="min-h-screen dark:bg-[#030806] bg-[#faf7fd] dark:text-[#f2eee3] text-[#18181b] flex flex-col font-sans transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 dark:bg-[#0d2a1d] bg-[#f3e8ff] border dark:border-[#d4b56a] border-[#9333ea] dark:text-[#f2eee3] text-[#581c87] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 dark:text-[#d4b56a] text-[#9333ea]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with active account */}
      <Navbar />

      {/* Page Header / Breadcrumb Section (Exact Match to Image) */}
      <div className="border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#050c08] bg-white py-8 sm:py-12">
        <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
            My account
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-serif italic dark:text-[#888b83] text-[#71717a]">
            <a href="/" className="hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/shop" className="hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors">
              Shop
            </a>
            <span>/</span>
            <span className="dark:text-[#d4b56a] text-[#9333ea] font-medium not-italic">
              My account
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Content (2 Column Grid matching Image) */}
      <div className="flex-1 py-12 sm:py-16 lg:py-24">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            
            {/* ========================================================= */}
            {/* LEFT COLUMN: LOGIN FORM */}
            {/* ========================================================= */}
            <div className="space-y-6 sm:space-y-8">
              {/* Column Title with Filigree Underline */}
              <div className="relative inline-block pb-1">
                <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
                  Login
                </h2>
                <div className="w-16 h-[2px] dark:bg-[#d4b56a] bg-[#9333ea] mt-1.5" />
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Username or Email Address */}
                <div className="space-y-2">
                  <label className="block text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase dark:text-[#f2eee3] text-[#27272a]">
                    USERNAME OR EMAIL ADDRESS <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 dark:text-[#888b83] text-[#a1a1aa] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Enter your username or email"
                      className="w-full h-12 pl-11 pr-4 text-xs sm:text-sm dark:bg-[#07100c] bg-white border dark:border-[#f2eee3]/15 border-[#e4d4f8] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase dark:text-[#f2eee3] text-[#27272a]">
                    PASSWORD <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 dark:text-[#888b83] text-[#a1a1aa] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full h-12 pl-11 pr-12 text-xs sm:text-sm dark:bg-[#07100c] bg-white border dark:border-[#f2eee3]/15 border-[#e4d4f8] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-all shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 dark:text-[#888b83] text-[#a1a1aa] hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border dark:border-[#f2eee3]/30 border-[#d8b4fe] dark:bg-[#07100c] bg-white text-[#184a32] focus:ring-0 cursor-pointer accent-[#184a32]"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase dark:text-[#b4b1a8] text-[#52525b] cursor-pointer select-none"
                  >
                    REMEMBER ME
                  </label>
                </div>

                {/* Log In Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="min-h-[48px] px-8 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] border border-[#7e22ce] dark:border-[#276643] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md cursor-pointer group"
                  >
                    {isLoggingIn ? (
                      <span className="animate-pulse">LOGGING IN...</span>
                    ) : (
                      <>
                        <span>LOG IN</span>
                        <ArrowRight className="w-4 h-4 text-white dark:text-[#d4b56a] transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Lost Password Link */}
                <div className="pt-1">
                  <a
                    href="#forgot-password"
                    onClick={(e) => {
                      e.preventDefault();
                      setToastMessage("Password reset link request panel will open soon.");
                      setTimeout(() => setToastMessage(null), 3500);
                    }}
                    className="text-xs sm:text-[13px] dark:text-[#d4b56a] text-[#7e22ce] hover:underline font-serif italic"
                  >
                    Lost your password?
                  </a>
                </div>
              </form>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: REGISTER FORM */}
            {/* ========================================================= */}
            <div className="space-y-6 sm:space-y-8">
              {/* Column Title with Filigree Underline */}
              <div className="relative inline-block pb-1">
                <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
                  Register
                </h2>
                <div className="w-16 h-[2px] dark:bg-[#d4b56a] bg-[#9333ea] mt-1.5" />
              </div>

              <form onSubmit={handleRegister} className="space-y-5">
                {/* Email Address Field */}
                <div className="space-y-2">
                  <label className="block text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase dark:text-[#f2eee3] text-[#27272a]">
                    EMAIL ADDRESS <span className="text-[#dc2626]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 dark:text-[#888b83] text-[#a1a1aa] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full h-12 pl-11 pr-4 text-xs sm:text-sm dark:bg-[#07100c] bg-white border dark:border-[#f2eee3]/15 border-[#e4d4f8] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Info Text / Privacy Notice (Exact Match to Image) */}
                <div className="space-y-3 pt-1 text-xs sm:text-[13px] dark:text-[#b4b1a8] text-[#52525b] leading-relaxed font-sans">
                  <p>
                    A link to set a new password will be sent to your email address.
                  </p>
                  <p>
                    Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                    <a
                      href="/refund_returns"
                      className="dark:text-[#d4b56a] text-[#7e22ce] font-semibold hover:underline"
                    >
                      privacy policy
                    </a>
                    .
                  </p>
                </div>

                {/* Register Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isRegistering}
                    className="min-h-[48px] px-8 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] border border-[#7e22ce] dark:border-[#276643] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md cursor-pointer group"
                  >
                    {isRegistering ? (
                      <span className="animate-pulse">REGISTERING...</span>
                    ) : (
                      <>
                        <span>REGISTER</span>
                        <ArrowRight className="w-4 h-4 text-white dark:text-[#d4b56a] transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
