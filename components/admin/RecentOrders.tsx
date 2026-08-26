import React from "react";
import Link from "next/link";

interface RecentOrderItem {
  id: string;
  orderNumber: string;
  bookTitle: string;
  customerName: string;
  totalAmount: number;
  status: string;
}

const defaultOrders: RecentOrderItem[] = [
  {
    id: "1",
    orderNumber: "#ORD-00125",
    bookTitle: "Visions of Victory",
    customerName: "John Doe",
    totalAmount: 29.0,
    status: "Completed",
  },
  {
    id: "2",
    orderNumber: "#ORD-00124",
    bookTitle: "The Journey of a Young Entrepreneur",
    customerName: "Jane Smith",
    totalAmount: 19.0,
    status: "Completed",
  },
  {
    id: "3",
    orderNumber: "#ORD-00123",
    bookTitle: "All This Has Nothing to Do with Me",
    customerName: "Michael Brown",
    totalAmount: 20.0,
    status: "Processing",
  },
  {
    id: "4",
    orderNumber: "#ORD-00122",
    bookTitle: "Bulle & Pelle",
    customerName: "Emily Davis",
    totalAmount: 16.0,
    status: "Completed",
  },
];

export default function RecentOrders({ orders }: { orders?: RecentOrderItem[] }) {
  const displayList = orders && orders.length > 0 ? orders : defaultOrders;

  return (
    <div className="admin-card rounded-2xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[16px] font-bold admin-text-primary">
          Recent Orders
        </h3>
        <Link
          href="/admin"
          className="text-xs font-semibold text-[#8B5CF6] dark:text-[#A78BFA] hover:text-[#7C3AED] transition-colors"
        >
          View All
        </Link>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-[#F8FAFC] dark:divide-[#334155]/40">
        {displayList.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-center justify-between gap-3"
          >
            {/* Order Code & Book Title */}
            <div className="min-w-0">
              <span className="text-[12px] font-semibold admin-text-secondary block leading-tight">
                {item.orderNumber}
              </span>
              <h4 className="text-[13px] font-bold admin-text-primary truncate mt-0.5">
                {item.bookTitle}
              </h4>
            </div>

            {/* Customer Name */}
            <div className="hidden sm:block text-left text-[12px] admin-text-secondary min-w-[85px] truncate">
              {item.customerName}
            </div>

            {/* Amount */}
            <div className="text-[13px] font-bold admin-text-primary whitespace-nowrap min-w-[45px] text-right">
              £{item.totalAmount.toFixed(2)}
            </div>

            {/* Status Badge */}
            <div className="min-w-[75px] text-right">
              {item.status.toLowerCase() === "completed" || item.status.toLowerCase() === "delivered" ? (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#10B981] dark:text-[#34D399] bg-[#ECFDF5] dark:bg-[#064E3B]/30">
                  Completed
                </span>
              ) : (
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium text-[#8B5CF6] dark:text-[#C4B5FD] bg-[#F5F3FF] dark:bg-[#7C3AED]/20">
                  Processing
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
