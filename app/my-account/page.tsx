"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  ShieldCheck,
  AlertCircle,
  Package,
  LogOut,
  ShoppingBag,
  Clock,
  Calendar,
  ExternalLink,
  KeyRound,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyAccountPage() {
  // Session State
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "account">("dashboard");
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register State
  const [registerEmail, setRegisterEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  // Forgot Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 6000);
  };

  // Check existing session on mount
  const checkSession = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data?.id) {
          setCurrentUser(json.data);
          return;
        }
      }
      setCurrentUser(null);
    } catch {
      setCurrentUser(null);
    } finally {
      setIsLoadingSession(false);
    }
  };

  useEffect(() => {
    checkSession();
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "forgot-password" || params.get("forgot") === "true") {
        setShowForgotPassword(true);
      }
    }
  }, []);

  // Fetch orders when user is authenticated
  useEffect(() => {
    if (currentUser?.id) {
      loadOrders();
    }
  }, [currentUser?.id]);

  const loadOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setOrders(json.data || []);
      }
    } catch {
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim() || !loginPassword) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginIdentifier.trim(),
          password: loginPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Invalid email or password.");
      }

      const user = data.data?.user;
      if (user) {
        setCurrentUser(user);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user } }));
        }
      } else {
        await checkSession();
      }

      const userName = user?.name || loginIdentifier.trim();
      showToast(`Welcome back, ${userName}! Logged in successfully.`, "success");
      setLoginPassword("");
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in.");
      showToast(err.message || "Login failed.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToReset = forgotEmail.trim();
    if (!emailToReset) return;

    setIsSendingReset(true);
    setForgotError(null);
    setForgotSuccess(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToReset,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to send reset link.");
      }

      const msg = data.message || `If an account with this email address exists, a password reset link has been sent. Please check your inbox.`;
      setForgotSuccess(msg);
      showToast("Password reset link requested. Please check your inbox.", "success");
    } catch (err: any) {
      const errorMsg = err.message || "Failed to send password reset link. Please try again.";
      setForgotError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: null } }));
      }
      showToast("You have been signed out.", "success");
    } catch {
      setCurrentUser(null);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth-state-changed", { detail: { user: null } }));
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailToRegister = registerEmail.trim();
    if (!emailToRegister) return;

    setIsRegistering(true);
    setRegisterError(null);
    setRegisterSuccess(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToRegister,
        }),
      });

      const data = await res.json();

      // Check whether registration and Resend email sending both succeeded
      if (!res.ok || !data.success || !data.data?.emailSent) {
        let failureReason = data.error || data.message || "Registration failed. Welcome email could not be sent.";
        if (failureReason.includes("apiKey") || failureReason.includes("re_")) {
          failureReason = "Email service is temporarily unconfigured. Please contact the administrator.";
        }
        throw new Error(failureReason);
      }

      const successMsg = `Your The Publishing Hub account has been created! A welcome email with your secure password setup link has been sent to ${emailToRegister}. Please check your inbox.`;
      setRegisterSuccess(successMsg);
      showToast(`Welcome email sent to ${emailToRegister}!`, "success");
      setRegisterEmail("");
    } catch (err: any) {
      const errorMsg = err.message || "Registration failed. Please try again.";
      setRegisterError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <main className="min-h-screen dark:bg-[#030806] bg-[#faf7fd] dark:text-[#f2eee3] text-[#18181b] flex flex-col font-sans transition-colors duration-300">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 text-xs font-semibold max-w-md ${
            toast.type === "error"
              ? "bg-red-50 dark:bg-[#1a0a0a] border border-red-300 dark:border-red-800 text-red-800 dark:text-red-200"
              : "bg-emerald-50 dark:bg-[#071a10] border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
          ) : (
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navbar with active account */}
      <Navbar />

      {/* Page Header / Breadcrumb Section */}
      <div className="border-b dark:border-[#f2eee3]/10 border-[#e9e1f5] dark:bg-[#050c08] bg-white py-8 sm:py-12">
        <div className="container-custom flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
            My account
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-serif italic dark:text-[#888b83] text-[#71717a]">
            <Link href="/" className="hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:dark:text-[#d4b56a] hover:text-[#9333ea] transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="dark:text-[#d4b56a] text-[#9333ea] font-medium not-italic">
              My account
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-custom max-w-6xl">
          {isLoadingSession ? (
            /* Subtle Loading Skeleton */
            <div className="py-20 text-center space-y-4">
              <div className="w-10 h-10 border-2 border-[#7e22ce] dark:border-[#d4b56a] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs tracking-wider uppercase font-semibold text-zinc-500">
                Checking your account session...
              </p>
            </div>
          ) : currentUser ? (
            /* ========================================================= */
            /* AUTHENTICATED USER DASHBOARD */
            /* ========================================================= */
            <div className="space-y-8">
              {/* Account Header Banner */}
              <div className="bg-white dark:bg-[#07100c] border border-[#e4d4f8] dark:border-[#f2eee3]/15 p-6 sm:p-8 rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#f3e8ff] dark:bg-[#184a32] text-[#7e22ce] dark:text-[#d4b56a] font-display text-2xl flex items-center justify-center border border-[#d8b4fe] dark:border-[#276643] uppercase font-semibold">
                    {currentUser.name ? currentUser.name[0] : "U"}
                  </div>
                  <div className="space-y-1">
                    <h2 className="font-display text-2xl sm:text-3xl font-normal dark:text-[#f2eee3] text-zinc-900">
                      Welcome, <span className="dark:text-[#d4b56a] text-[#7e22ce]">{currentUser.name}</span>
                    </h2>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 dark:text-[#888b83]">
                      <span>{currentUser.email}</span>
                      <span>•</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#faf5ff] dark:bg-[#184a32]/60 text-[#7e22ce] dark:text-[#d4b56a] border border-[#e9d5ff] dark:border-[#276643]">
                        {currentUser.role || "Member"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xs transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>

              {/* Navigation Tabs and Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Left Tabs Menu */}
                <div className="md:col-span-1 space-y-1 bg-white dark:bg-[#07100c] border border-[#e4d4f8] dark:border-[#f2eee3]/15 p-2 rounded-sm shadow-xs self-start">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all text-left cursor-pointer ${
                      activeTab === "dashboard"
                        ? "bg-[#9333ea] dark:bg-[#184a32] text-white dark:text-[#f2eee3] shadow-xs"
                        : "text-zinc-700 dark:text-[#c4c1b8] hover:bg-[#faf5ff] dark:hover:bg-[#12281d]"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all text-left cursor-pointer ${
                      activeTab === "orders"
                        ? "bg-[#9333ea] dark:bg-[#184a32] text-white dark:text-[#f2eee3] shadow-xs"
                        : "text-zinc-700 dark:text-[#c4c1b8] hover:bg-[#faf5ff] dark:hover:bg-[#12281d]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4" />
                      <span>Orders</span>
                    </div>
                    {orders.length > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-white/20 text-current">
                        {orders.length}
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("account")}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xs transition-all text-left cursor-pointer ${
                      activeTab === "account"
                        ? "bg-[#9333ea] dark:bg-[#184a32] text-white dark:text-[#f2eee3] shadow-xs"
                        : "text-zinc-700 dark:text-[#c4c1b8] hover:bg-[#faf5ff] dark:hover:bg-[#12281d]"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Account Details</span>
                  </button>
                </div>

                {/* Right Tab Content View */}
                <div className="md:col-span-3 bg-white dark:bg-[#07100c] border border-[#e4d4f8] dark:border-[#f2eee3]/15 p-6 sm:p-8 rounded-sm shadow-xs">
                  {/* TAB 1: DASHBOARD OVERVIEW */}
                  {activeTab === "dashboard" && (
                    <div className="space-y-6">
                      <div className="pb-4 border-b border-[#f0e7fa] dark:border-[#f2eee3]/10">
                        <h3 className="font-display text-2xl font-normal dark:text-[#d4b56a] text-[#7e22ce]">
                          Account Overview
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#888b83] mt-1 leading-relaxed">
                          From your account dashboard you can view your recent orders, manage your shipping details, and access author collections.
                        </p>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Total Orders
                          </span>
                          <p className="text-2xl font-bold dark:text-[#f2eee3] text-zinc-900">
                            {orders.length}
                          </p>
                        </div>

                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Security Status
                          </span>
                          <p className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5 pt-1">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Password Protected</span>
                          </p>
                        </div>

                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Account Tier
                          </span>
                          <p className="text-sm font-bold dark:text-[#d4b56a] text-[#7e22ce] pt-1">
                            {currentUser.role === "ADMIN" ? "Administrator" : "Standard Reader"}
                          </p>
                        </div>
                      </div>

                      {/* Quick Navigation Links */}
                      <div className="pt-2 flex flex-wrap gap-3">
                        <Link
                          href="/shop"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Browse Book Shop</span>
                        </Link>
                        <Link
                          href="/checkout"
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                        >
                          <span>Go to Checkout</span>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: RECENT ORDERS */}
                  {activeTab === "orders" && (
                    <div className="space-y-6">
                      <div className="pb-4 border-b border-[#f0e7fa] dark:border-[#f2eee3]/10 flex items-center justify-between">
                        <div>
                          <h3 className="font-display text-2xl font-normal dark:text-[#d4b56a] text-[#7e22ce]">
                            Your Orders
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-[#888b83] mt-0.5">
                            Order history and status tracking.
                          </p>
                        </div>
                      </div>

                      {isLoadingOrders ? (
                        <div className="py-12 text-center text-xs text-zinc-500">
                          Loading your orders...
                        </div>
                      ) : orders.length === 0 ? (
                        <div className="py-12 text-center space-y-4">
                          <Package className="w-10 h-10 mx-auto text-zinc-400" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            No orders placed yet.
                          </p>
                          <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
                          >
                            <span>Start Exploring Books</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-[#f0e7fa] dark:border-[#f2eee3]/10 text-zinc-500 uppercase tracking-wider text-[10px]">
                                <th className="pb-3">Order</th>
                                <th className="pb-3">Date</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Total</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0e7fa] dark:divide-[#f2eee3]/10">
                              {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-[#12281d]/50 transition-colors">
                                  <td className="py-3 font-semibold text-zinc-900 dark:text-[#f2eee3]">
                                    #{order.orderNumber}
                                  </td>
                                  <td className="py-3 text-zinc-600 dark:text-zinc-400">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </td>
                                  <td className="py-3">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-900">
                                      {order.status || "Completed"}
                                    </span>
                                  </td>
                                  <td className="py-3 font-semibold text-zinc-900 dark:text-[#f2eee3]">
                                    £{Number(order.totalAmount || 0).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: ACCOUNT DETAILS */}
                  {activeTab === "account" && (
                    <div className="space-y-6">
                      <div className="pb-4 border-b border-[#f0e7fa] dark:border-[#f2eee3]/10">
                        <h3 className="font-display text-2xl font-normal dark:text-[#d4b56a] text-[#7e22ce]">
                          Account Details
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-[#888b83] mt-0.5">
                          Personal account information and security configuration.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Full Name / Username
                          </span>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-[#f2eee3]">
                            {currentUser.name}
                          </p>
                        </div>

                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Registered Email
                          </span>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-[#f2eee3]">
                            {currentUser.email}
                          </p>
                        </div>

                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Password Status
                          </span>
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                            Configured &amp; Active
                          </p>
                        </div>

                        <div className="p-4 rounded-xs border border-[#e4d4f8] dark:border-[#f2eee3]/10 bg-[#faf7fd] dark:bg-[#050c08] space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Member Since
                          </span>
                          <p className="text-sm font-semibold text-zinc-900 dark:text-[#f2eee3]">
                            {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "Active Member"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* UNAUTHENTICATED: 2 COLUMN GRID (LOGIN & REGISTER) */
            /* ========================================================= */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
              {/* ========================================================= */}
              {/* LEFT COLUMN: LOGIN OR FORGOT PASSWORD FORM */}
              {/* ========================================================= */}
              <div className="space-y-6 sm:space-y-8">
                {showForgotPassword ? (
                  /* FORGOT PASSWORD FORM */
                  <div className="space-y-6">
                    <div className="relative inline-block pb-1">
                      <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
                        Forgot Password
                      </h2>
                      <div className="w-16 h-[2px] dark:bg-[#d4b56a] bg-[#9333ea] mt-1.5" />
                    </div>

                    <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-[#b4b1a8] leading-relaxed">
                      Lost your password? Please enter your registered email address. You will receive a secure single-use link to create a new password via email.
                    </p>

                    <form onSubmit={handleForgotPassword} className="space-y-5">
                      {forgotError && (
                        <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded text-xs flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{forgotError}</span>
                        </div>
                      )}

                      {forgotSuccess && (
                        <div className="p-3.5 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 rounded text-xs flex items-start gap-2.5">
                          <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                          <span>{forgotSuccess}</span>
                        </div>
                      )}

                      {/* Registered Email Address */}
                      <div className="space-y-2">
                        <label className="block text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase dark:text-[#f2eee3] text-[#27272a]">
                          EMAIL ADDRESS <span className="text-[#dc2626]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 dark:text-[#888b83] text-[#a1a1aa] absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            disabled={isSendingReset}
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="Enter your registered email address"
                            className="w-full h-12 pl-11 pr-4 text-xs sm:text-sm dark:bg-[#07100c] bg-white border dark:border-[#f2eee3]/15 border-[#e4d4f8] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-all shadow-xs disabled:opacity-60"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <button
                          type="submit"
                          disabled={isSendingReset}
                          className="min-h-[48px] px-8 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] border border-[#7e22ce] dark:border-[#276643] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer group active:scale-98 disabled:opacity-60"
                        >
                          {isSendingReset ? (
                            <span className="animate-pulse">SENDING RESET LINK...</span>
                          ) : (
                            <>
                              <span>RESET PASSWORD</span>
                              <ArrowRight className="w-4 h-4 text-white dark:text-[#d4b56a] transition-transform group-hover:translate-x-1" />
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowForgotPassword(false);
                            setForgotError(null);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-zinc-600 dark:text-[#b4b1a8] hover:text-[#7e22ce] dark:hover:text-[#d4b56a] transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back to Login</span>
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* NORMAL LOGIN FORM */
                  <>
                    {/* Column Title with Filigree Underline */}
                    <div className="relative inline-block pb-1">
                      <h2 className="font-display text-3xl sm:text-4xl md:text-[38px] font-normal dark:text-[#d4b56a] text-[#7e22ce] tracking-tight">
                        Login
                      </h2>
                      <div className="w-16 h-[2px] dark:bg-[#d4b56a] bg-[#9333ea] mt-1.5" />
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                      {loginError && (
                        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded text-xs flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{loginError}</span>
                        </div>
                      )}

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
                      <div className="pt-3">
                        <button
                          type="submit"
                          disabled={isLoggingIn}
                          className="min-h-[48px] px-8 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] border border-[#7e22ce] dark:border-[#276643] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer group active:scale-98 disabled:opacity-60"
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

                      {/* Forgot Password Action Link */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowForgotPassword(true);
                            setForgotError(null);
                            setForgotSuccess(null);
                            if (loginIdentifier && loginIdentifier.includes("@")) {
                              setForgotEmail(loginIdentifier.trim());
                            }
                          }}
                          className="text-xs sm:text-[13px] font-semibold text-[#7e22ce] dark:text-[#d4b56a] hover:underline cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                          <span>Forgot Password?</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
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
                  {registerError && (
                    <div className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 rounded text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{registerError}</span>
                    </div>
                  )}

                  {registerSuccess && (
                    <div className="p-3.5 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 rounded text-xs flex items-start gap-2.5">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                      <span>{registerSuccess}</span>
                    </div>
                  )}

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
                        disabled={isRegistering}
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full h-12 pl-11 pr-4 text-xs sm:text-sm dark:bg-[#07100c] bg-white border dark:border-[#f2eee3]/15 border-[#e4d4f8] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-all shadow-xs disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Info Text / Privacy Notice */}
                  <div className="space-y-3 pt-1 text-xs sm:text-[13px] dark:text-[#b4b1a8] text-[#52525b] leading-relaxed font-sans">
                    <p>
                      A link to set a new password will be sent to your email address.
                    </p>
                    <p>
                      Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                      <Link
                        href="/refund_returns"
                        className="dark:text-[#d4b56a] text-[#7e22ce] font-semibold hover:underline"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>

                  {/* Register Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="min-h-[48px] px-8 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] border border-[#7e22ce] dark:border-[#276643] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer group active:scale-98 disabled:opacity-60"
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
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
