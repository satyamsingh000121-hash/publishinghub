"use client";

import React from "react";
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-[#070d0a] border-l border-[#d4b56a]/30 shadow-2xl p-5 sm:p-6 flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#f2eee3]/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#d4b56a]" />
                <h3 className="font-display text-xl font-medium text-[#f2eee3]">Your Cart</h3>
              </div>
              <button onClick={onClose} className="text-[#888b83] hover:text-[#f2eee3]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-12 text-[#888b83]">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#d4b56a]" />
                  <p className="text-sm">Your shopping bag is currently empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-[#0b1410] p-3 border border-[#f2eee3]/10"
                  >
                    <div>
                      <h5 className="font-display text-sm font-medium text-[#f2eee3]">{item.title}</h5>
                      <p className="text-xs text-[#d4b56a] mt-0.5">{item.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#888b83] hover:text-red-400 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="border-t border-[#f2eee3]/10 pt-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#888b83]">Subtotal:</span>
                <span className="font-display font-semibold text-lg text-[#d4b56a]">£{total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => alert("Proceeding to checkout with " + items.length + " item(s)!")}
                className="w-full min-h-[46px] bg-[#2c7650] hover:bg-[#37865d] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors"
              >
                PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
