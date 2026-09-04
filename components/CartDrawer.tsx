"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemoveItem }: CartDrawerProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const num = parseFloat(item.price.replace("£", "")) || 0;
    return sum + num * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-white dark:bg-[#070d0a] border-l border-[#e9e1f5] dark:border-[#d4b56a]/30 shadow-2xl p-5 sm:p-6 flex flex-col justify-between text-[#18181b] dark:text-[#f2eee3]">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#e9e1f5] dark:border-[#f2eee3]/10">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center gap-2 group cursor-pointer"
                title="Go to Cart Page"
              >
                <ShoppingBag className="w-5 h-5 text-[#9333ea] dark:text-[#d4b56a] group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-medium text-[#18181b] dark:text-[#f2eee3] group-hover:text-[#9333ea] dark:group-hover:text-[#d4b56a] transition-colors">
                  Your Cart
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9333ea]/10 dark:bg-[#d4b56a]/15 text-[#9333ea] dark:text-[#d4b56a] font-semibold">
                  View Page →
                </span>
              </Link>
              <button onClick={onClose} className="text-[#71717a] hover:text-[#18181b] dark:text-[#888b83] dark:hover:text-[#f2eee3] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12 text-[#71717a] dark:text-[#888b83]">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#9333ea] dark:text-[#d4b56a]" />
                  <p className="text-sm">Your shopping bag is currently empty.</p>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="inline-block mt-4 text-xs font-semibold text-[#9333ea] dark:text-[#d4b56a] hover:underline"
                  >
                    Open Cart Page
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#faf7fd] dark:bg-[#0b1410] p-3 border border-[#e9e1f5] dark:border-[#f2eee3]/10 rounded-[2px]"
                  >
                    <div>
                      <h5 className="font-display text-sm font-medium text-[#18181b] dark:text-[#f2eee3]">{item.title}</h5>
                      <p className="text-xs text-[#9333ea] dark:text-[#d4b56a] mt-0.5 font-semibold">{item.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#71717a] hover:text-red-500 dark:text-[#888b83] dark:hover:text-red-400 p-1 cursor-pointer transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Checkout & View Cart */}
          {items.length > 0 && (
            <div className="border-t border-[#e9e1f5] dark:border-[#f2eee3]/10 pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#71717a] dark:text-[#888b83]">Subtotal:</span>
                <span className="font-display font-semibold text-lg text-[#9333ea] dark:text-[#d4b56a]">£{total.toFixed(2)}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="w-full min-h-[42px] border border-[#9333ea] dark:border-[#d4b56a] hover:bg-[#9333ea]/10 dark:hover:bg-[#d4b56a]/15 text-[#9333ea] dark:text-[#d4b56a] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors rounded-[2px] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  VIEW FULL CART PAGE
                </Link>

                <button
                  onClick={() => alert("Proceeding to checkout with " + items.length + " item(s)!")}
                  className="w-full min-h-[44px] bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#2c7650] dark:hover:bg-[#37865d] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors rounded-[2px] shadow-md cursor-pointer"
                >
                  PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
