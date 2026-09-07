"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Shield,
  User as UserIcon,
  ArrowLeft,
  Mail,
  Calendar,
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json?.data) {
          setUsers(json.data);
        } else {
          // Fallback mock users if unauthenticated in preview
          setUsers([
            {
              id: "usr-1",
              name: "Admin User",
              email: "admin@publishinghub.com",
              role: "ADMIN",
              createdAt: "2026-08-01",
            },
            {
              id: "usr-2",
              name: "Demo Customer",
              email: "user@publishinghub.com",
              role: "USER",
              createdAt: "2026-08-10",
            },
          ]);
        }
      })
      .catch(() => {
        setUsers([
          {
            id: "usr-1",
            name: "Admin User",
            email: "admin@publishinghub.com",
            role: "ADMIN",
            createdAt: "2026-08-01",
          },
          {
            id: "usr-2",
            name: "Demo Customer",
            email: "user@publishinghub.com",
            role: "USER",
            createdAt: "2026-08-10",
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            User Accounts
          </h1>
          <p className="text-[13px] admin-text-secondary mt-0.5">
            Registered customers, administrators, and privileges.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl admin-input-bg admin-text-primary border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-card rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-[#1E293B]/40 text-gray-400 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Member Since</th>
                <th className="px-6 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1E293B]/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-bold admin-text-primary text-[13px]">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 admin-text-secondary">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {u.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {u.role === "ADMIN" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#8B5CF6]/15 text-[#8B5CF6] dark:text-[#C4B5FD]">
                          <Shield className="w-3 h-3" />
                          Administrator
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-800 admin-text-secondary">
                          <UserIcon className="w-3 h-3" />
                          Customer
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 admin-text-secondary">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
