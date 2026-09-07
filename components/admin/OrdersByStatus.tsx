import React from "react";

export interface StatusItem {
  status: string;
  count: number;
  percentage: number;
  color?: string;
}

const defaultStatusData: StatusItem[] = [
  { status: "Completed", count: 1024, percentage: 68, color: "#8B5CF6" },
  { status: "Processing", count: 324, percentage: 22, color: "#C4B5FD" },
  { status: "Pending", count: 152, percentage: 10, color: "#EDE9FE" },
];

export default function OrdersByStatus({ data }: { data?: StatusItem[] }) {
  const displayList = data && data.length > 0 ? data : defaultStatusData;
  const circumference = 226; // 2 * PI * 36

  // Compute accumulated offsets for SVG circles
  let accumulatedPercent = 0;
  const slices = displayList.map((item) => {
    const dashLength = Math.max(2, Math.round((item.percentage / 100) * circumference));
    const offset = -Math.round((accumulatedPercent / 100) * circumference);
    accumulatedPercent += item.percentage;
    return {
      ...item,
      dashLength,
      offset,
      color: item.color || "#8B5CF6",
    };
  });

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
            {slices.map((slice, idx) => (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke={slice.color}
                strokeWidth="16"
                strokeDasharray={`${slice.dashLength} ${circumference}`}
                strokeDashoffset={slice.offset}
                className="transition-all duration-500 ease-out"
              />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-2.5 flex-1 pl-2">
          {displayList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color || "#8B5CF6" }}
              />
              <div className="text-[12px]">
                <span className="admin-text-secondary block text-[11px] leading-tight">
                  {item.status}
                </span>
                <span className="font-semibold admin-text-primary">
                  {item.count.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
