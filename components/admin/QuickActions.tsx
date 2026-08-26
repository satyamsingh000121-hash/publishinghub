import React from "react";
import Link from "next/link";
import { PlusCircle, ShoppingBag, Users, Layers } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Book",
      desc: "Publish new catalog title",
      href: "/shop",
      icon: PlusCircle,
    },
    {
      title: "Manage Orders",
      desc: "View & fulfill transactions",
      href: "/admin",
      icon: ShoppingBag,
    },
    {
      title: "Manage Users",
      desc: "Customer & admin accounts",
      href: "/admin",
      icon: Users,
    },
    {
      title: "Add Category",
      desc: "Organize book genres",
      href: "/shop",
      icon: Layers,
    },
  ];

  return (
    <div className="bg-white border border-[#EAE5F2] rounded-xl p-5 sm:p-6 shadow-sm">
      <div className="mb-4 pb-2 border-b border-[#FAF8FF]">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-[#211C24]">
          Quick Actions
        </h3>
        <p className="text-[12px] text-[#77717D] mt-0.5">
          Frequently used management shortcuts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              href={act.href}
              className="flex items-center gap-3.5 p-3.5 rounded-xl border border-[#EAE5F2] bg-[#FAF8FF] hover:bg-[#F5F1FF] hover:border-[#D8B4FE] transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white border border-[#EEE8FF] text-[#6D28D9] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[13px] font-semibold text-[#211C24] group-hover:text-[#6D28D9] transition-colors truncate">
                  {act.title}
                </h4>
                <p className="text-[11.5px] text-[#77717D] truncate">
                  {act.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
