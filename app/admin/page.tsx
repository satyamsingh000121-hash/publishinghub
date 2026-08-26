"use client";

import React, { useEffect, useState } from "react";
import {
  PoundSterling,
  ShoppingBag,
  BookOpen,
  User,
  Calendar as CalendarIcon,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import SalesOverview from "@/components/admin/SalesOverview";
import TopSellingBooks from "@/components/admin/TopSellingBooks";
import RecentOrders from "@/components/admin/RecentOrders";
import OrdersByStatus from "@/components/admin/OrdersByStatus";
import UpcomingEvents from "@/components/admin/UpcomingEvents";

export default function AdminDashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) setUser(json.data);
      })
      .catch(() => {});
  }, []);

  const userName = user?.name ? user.name.split(" ")[0] : "John";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Title & Date Pill Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-[13px] admin-text-secondary mt-0.5">
            Here&apos;s what&apos;s happening with your publishing hub today.
          </p>
        </div>

        {/* Date Filter Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 admin-card rounded-xl text-[12.5px] font-medium admin-text-primary shadow-sm self-start sm:self-auto transition-colors">
          <span>Aug 1 – Aug 24, 2026</span>
          <CalendarIcon className="w-4 h-4 text-[#94A3B8]" />
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="£24,850"
          icon={PoundSterling}
          growth="+12.5%"
          comparisonText="vs last month"
        />
        <StatCard
          title="Total Orders"
          value="1,248"
          icon={ShoppingBag}
          growth="+8.3%"
          comparisonText="vs last month"
        />
        <StatCard
          title="Total Books"
          value="342"
          icon={BookOpen}
          growth="+5.7%"
          comparisonText="vs last month"
        />
        <StatCard
          title="Total Authors"
          value="78"
          icon={User}
          growth="+3.1%"
          comparisonText="vs last month"
        />
      </div>

      {/* Middle Row: Sales Overview (2 cols) + Top Selling Books (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        <div className="lg:col-span-2">
          <SalesOverview />
        </div>
        <div className="lg:col-span-1">
          <TopSellingBooks />
        </div>
      </div>

      {/* Bottom Row: 3 Equal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
        <RecentOrders />
        <OrdersByStatus />
        <UpcomingEvents />
      </div>
    </div>
  );
}
