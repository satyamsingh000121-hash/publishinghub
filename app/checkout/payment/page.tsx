"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPaymentRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect customer directly to main checkout page to use Stripe Hosted Checkout
    router.replace("/checkout");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf8fd] dark:bg-[#030a06] text-zinc-900 dark:text-[#f5f2eb]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-600 dark:border-[#d4af37] border-t-transparent mb-4" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-[#d4af37]">
        Redirecting to Checkout...
      </p>
    </div>
  );
}
