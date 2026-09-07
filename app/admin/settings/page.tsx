"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  ArrowLeft,
  Database,
  Lock,
  Globe,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("Publishing Hub");
  const [currency, setCurrency] = useState("GBP (£)");
  const [supportEmail, setSupportEmail] = useState("support@publishinghub.com");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link
            href="/admin"
            className="text-xs font-semibold text-[#8B5CF6] hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
        </div>
        <h1 className="font-display text-[28px] sm:text-[32px] font-semibold admin-text-primary tracking-tight">
          System & Store Settings
        </h1>
        <p className="text-[13px] admin-text-secondary mt-0.5">
          Configure bookstore preferences, database connection, and store rules.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          Settings updated successfully!
        </div>
      )}

      {/* Settings Sections */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="admin-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
            <Globe className="w-4 h-4 text-[#8B5CF6]" />
            <h3 className="text-sm font-bold admin-text-primary">Store Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-medium admin-text-secondary mb-1">Store Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
            <div>
              <label className="block font-medium admin-text-secondary mb-1">Currency</label>
              <input
                type="text"
                value={currency}
                disabled
                className="w-full px-3.5 py-2 rounded-xl admin-input-bg admin-text-secondary border border-gray-200 dark:border-gray-800 opacity-70 cursor-not-allowed"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-medium admin-text-secondary mb-1">Customer Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
              />
            </div>
          </div>
        </div>

        {/* Database Status */}
        <div className="admin-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
            <Database className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold admin-text-primary">Database & Engine</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#1E293B]/40">
              <span className="text-gray-400 block text-[11px]">Database Provider</span>
              <span className="font-semibold admin-text-primary text-[13px] mt-0.5 block">
                SQLite (Prisma ORM)
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#1E293B]/40">
              <span className="text-gray-400 block text-[11px]">Database Status</span>
              <span className="font-semibold text-emerald-500 text-[13px] mt-0.5 block flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Connected & Active
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-gray-50/70 dark:bg-[#1E293B]/40">
              <span className="text-gray-400 block text-[11px]">Storage Engine</span>
              <span className="font-semibold admin-text-primary text-[13px] mt-0.5 block">
                Local Dev File (dev.db)
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
