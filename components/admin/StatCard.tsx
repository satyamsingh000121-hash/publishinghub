import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  growth?: string;
  comparisonText?: string;
  isLoading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  growth = "+12.5%",
  comparisonText = "vs last month",
  isLoading = false,
}: StatCardProps) {
  return (
    <div className="admin-card rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 flex items-center gap-4">
      {/* Icon in Light Lavender / Dark Purple Circular Container */}
      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full admin-pill-bg text-[#8B5CF6] dark:text-[#C4B5FD] flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 stroke-[1.8]" />
      </div>

      {/* Metric Info */}
      <div className="min-w-0 flex-1">
        <span className="text-[12.5px] font-medium admin-text-secondary block">
          {title}
        </span>

        <div className="my-0.5">
          {isLoading ? (
            <div className="h-7 w-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          ) : (
            <h3 className="font-display text-2xl sm:text-[26px] font-bold admin-text-primary tracking-tight leading-tight">
              {value}
            </h3>
          )}
        </div>

        {/* Growth Label */}
        <div className="flex items-center gap-1.5 text-[11.5px]">
          <span className="font-bold text-[#10B981] dark:text-[#34D399]">
            {growth}
          </span>
          <span className="admin-text-secondary opacity-80">
            {comparisonText}
          </span>
        </div>
      </div>
    </div>
  );
}
