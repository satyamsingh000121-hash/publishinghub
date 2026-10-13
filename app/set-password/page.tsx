"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token || !email) {
      setErrorMessage("Missing or invalid password setup link. Please request a new link.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and try again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to set password.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to set password. Link may have expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-[#07100c] border border-red-200 dark:border-red-900/50 rounded-lg text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-display text-zinc-900 dark:text-[#f2eee3]">Invalid Setup Link</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This password setup link is incomplete or missing required parameters.
        </p>
        <div className="pt-2">
          <a
            href="/my-account"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Go to My Account
          </a>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white dark:bg-[#07100c] border border-green-200 dark:border-green-900/50 rounded-lg text-center space-y-5 shadow-md">
        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center">
          <Check className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-display text-zinc-900 dark:text-[#f2eee3]">Password Set Successfully</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Your password has been configured and your account is ready. You are now logged in to The Publishing Hub.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/my-account"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#9333ea] hover:bg-[#7e22ce] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm"
          >
            View My Account <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            Explore Books
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-[#07100c] border border-[#e4d4f8] dark:border-[#f2eee3]/15 p-6 sm:p-8 rounded-sm shadow-md space-y-6">
      <div className="space-y-1 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3e8ff] dark:bg-[#184a32]/40 text-[#7e22ce] dark:text-[#d4b56a] text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Secure Password Setup</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl text-zinc-900 dark:text-[#f2eee3]">
          Create Your Password
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Setting password for <strong className="text-zinc-900 dark:text-zinc-200">{email}</strong>
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New Password */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-zinc-800 dark:text-[#f2eee3]">
            NEW PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full h-11 pl-11 pr-11 text-xs sm:text-sm bg-white dark:bg-[#050c08] border border-[#e4d4f8] dark:border-[#f2eee3]/15 rounded-xs text-zinc-900 dark:text-[#f2eee3] focus:outline-none focus:border-[#9333ea] dark:focus:border-[#d4b56a] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold tracking-[0.14em] uppercase text-zinc-800 dark:text-[#f2eee3]">
            CONFIRM NEW PASSWORD <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full h-11 pl-11 pr-11 text-xs sm:text-sm bg-white dark:bg-[#050c08] border border-[#e4d4f8] dark:border-[#f2eee3]/15 rounded-xs text-zinc-900 dark:text-[#f2eee3] focus:outline-none focus:border-[#9333ea] dark:focus:border-[#d4b56a] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] text-xs font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="animate-pulse">SAVING PASSWORD...</span>
            ) : (
              <>
                <span>SAVE PASSWORD &amp; LOG IN</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SetPasswordPage() {
  return (
    <main className="min-h-screen dark:bg-[#030806] bg-[#faf7fd] dark:text-[#f2eee3] text-[#18181b] flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      <div className="border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#050c08] bg-white py-8 sm:py-12">
        <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
            Account Setup
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-serif italic dark:text-[#888b83] text-[#71717a]">
            <a href="/" className="hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/my-account" className="hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors">
              My account
            </a>
            <span>/</span>
            <span className="dark:text-[#d4b56a] text-[#9333ea] font-medium not-italic">
              Set Password
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 py-12 sm:py-16">
        <div className="container-custom">
          <Suspense
            fallback={
              <div className="max-w-md mx-auto p-12 text-center text-zinc-500">
                Loading password setup...
              </div>
            }
          >
            <SetPasswordForm />
          </Suspense>
        </div>
      </div>

      <Footer />
    </main>
  );
}
