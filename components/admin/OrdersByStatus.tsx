import React from "react";

export default function OrdersByStatus() {
  return (
    <div className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between transition-colors">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-[16px] font-bold admin-text-primary">
          Orders by Status
        </h3>
      </div>

      {/* Donut Chart & Legend in Row */}
      <div className="flex items-center justify-between gap-4 my-auto py-2">
        {/* SVG Donut */}
        <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Completed: 68% */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="16"
              strokeDasharray="154 226"
              strokeDashoffset="0"
            />
            {/* Processing: 22% */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="#C4B5FD"
              strokeWidth="16"
              strokeDasharray="50 226"
              strokeDashoffset="-154"
            />
            {/* Pending: 10% */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="#EDE9FE"
              className="dark:stroke-[#4C1D95]"
              strokeWidth="16"
              strokeDasharray="23 226"
              strokeDashoffset="-204"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2.5 flex-1 pl-2">
          {/* Completed */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] flex-shrink-0" />
            <div className="text-[12px]">
              <span className="admin-text-secondary block text-[11px] leading-tight">Completed</span>
              <span className="font-semibold admin-text-primary">1,024 (68%)</span>
            </div>
          </div>

          {/* Processing */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#C4B5FD] flex-shrink-0" />
            <div className="text-[12px]">
              <span className="admin-text-secondary block text-[11px] leading-tight">Processing</span>
              <span className="font-semibold admin-text-primary">324 (22%)</span>
            </div>
          </div>

          {/* Pending */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#EDE9FE] dark:bg-[#4C1D95] flex-shrink-0" />
            <div className="text-[12px]">
              <span className="admin-text-secondary block text-[11px] leading-tight">Pending</span>
              <span className="font-semibold admin-text-primary">152 (10%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
