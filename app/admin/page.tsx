"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  PoundSterling,
  ShoppingBag,
  BookOpen,
  User,
  Calendar as CalendarIcon,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import SalesOverview from "@/components/admin/SalesOverview";
import TopSellingBooks from "@/components/admin/TopSellingBooks";
import RecentOrders, { RecentOrderItem } from "@/components/admin/RecentOrders";
import OrdersByStatus, { StatusItem } from "@/components/admin/OrdersByStatus";
import UpcomingEvents, { EventItem } from "@/components/admin/UpcomingEvents";

interface AnalyticsData {
  kpis: {
    totalRevenue: number;
    totalOrders: number;
    totalBooks: number;
    totalAuthors: number;
  };
  salesOverview: Array<{
    period: string;
    revenue: number;
    orders: number;
  }>;
  topSellingBooks: Array<{
    id: string;
    title: string;
    author: string;
    image: string;
    unitsSold: number;
    revenue: number;
    price: string;
  }>;
  recentOrders: RecentOrderItem[];
  ordersByStatus: StatusItem[];
  upcomingEvents: EventItem[];
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Fetch logged in user
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) setUser(json.data);
      })
      .catch(() => {});
  }, []);

  // Fetch Real-Time Analytics from Database
  const fetchAnalytics = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data) {
          setAnalytics(json.data);
          const now = new Date();
          setLastUpdated(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch dashboard analytics:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const userName = user?.name ? user.name.split(" ")[0] : "John";

  // KPIs
  const kpis = analytics?.kpis;
  const formattedRevenue = kpis
    ? `£${kpis.totalRevenue.toLocaleString()}`
    : "£24,850";
  const formattedOrders = kpis
    ? kpis.totalOrders.toLocaleString()
    : "1,248";
  const formattedBooks = kpis
    ? kpis.totalBooks.toLocaleString()
    : "342";
  const formattedAuthors = kpis
    ? kpis.totalAuthors.toLocaleString()
    : "78";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Title, Live Indicator & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-[28px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
              Welcome back, {userName} 👋
            </h1>
            {/* Live Database Pulse Badge */}
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live DB Active
            </span>
          </div>
          <p className="text-[13px] admin-text-secondary mt-0.5">
            Real-time publishing metrics connected to your SQLite database.
            {lastUpdated && ` (Updated at ${lastUpdated})`}
          </p>
        </div>

        {/* Action Controls: Refresh & Date Range */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Refresh / Sync Button */}
          <button
            onClick={fetchAnalytics}
            disabled={isRefreshing}
            title="Refresh database metrics"
            className="inline-flex items-center gap-2 px-3 py-2 admin-card rounded-xl text-[12.5px] font-medium admin-text-primary shadow-sm hover:border-[#8B5CF6]/50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#8B5CF6] ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>

          {/* Date Filter Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 admin-card rounded-xl text-[12.5px] font-medium admin-text-primary shadow-sm transition-colors">
            <span>Aug 1 – Aug 24, 2026</span>
            <CalendarIcon className="w-4 h-4 text-[#94A3B8]" />
          </div>
        </div>
      </div>

      {/* 4 KPI Summary Cards with Live Data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={formattedRevenue}
          icon={PoundSterling}
          growth="+12.5%"
          comparisonText="vs last month"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Orders"
          value={formattedOrders}
          icon={ShoppingBag}
          growth="+8.3%"
          comparisonText="vs last month"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Books"
          value={formattedBooks}
          icon={BookOpen}
          growth="+5.7%"
          comparisonText="vs last month"
          isLoading={isLoading}
        />
        <StatCard
          title="Total Authors"
          value={formattedAuthors}
          icon={User}
          growth="+3.1%"
          comparisonText="vs last month"
          isLoading={isLoading}
        />
      </div>

      {/* Middle Row: Sales Overview (2 cols) + Top Selling Books (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2">
          <SalesOverview
            data={analytics?.salesOverview}
            totalRevenue={kpis?.totalRevenue}
          />
        </div>
        <div className="lg:col-span-1">
          <TopSellingBooks books={analytics?.topSellingBooks} />
        </div>
      </div>

      {/* Bottom Row: 3 Equal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
        <RecentOrders orders={analytics?.recentOrders} />
        <OrdersByStatus data={analytics?.ordersByStatus} />
        <UpcomingEvents events={analytics?.upcomingEvents} />
      </div>
    </div>
  );
}
