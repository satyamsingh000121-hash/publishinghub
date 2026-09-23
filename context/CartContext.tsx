"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  quantity: number;
  image?: string;
  slug?: string;
  author?: string;
  salePrice?: string;
  originalPrice?: string;
}

export interface AddItemInput {
  id?: string;
  title: string;
  price?: string | number;
  numericPrice?: number;
  quantity?: number;
  image?: string;
  slug?: string;
  author?: string;
  salePrice?: string;
  originalPrice?: string;
}

export interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  cartCount: number;
  subtotal: number;
  isOpen: boolean;
  isLoaded: boolean;
  addItem: (item: AddItemInput) => void;
  removeItem: (idOrTitle: string) => void;
  updateQuantity: (idOrTitle: string, quantity: number) => void;
  increaseQuantity: (idOrTitle: string) => void;
  decreaseQuantity: (idOrTitle: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export function parsePrice(price: string | number | undefined | null): number {
  if (typeof price === "number") return isNaN(price) ? 0 : price;
  if (!price) return 0;
  const cleaned = price.toString().replace(/[^0-9.]/g, "");
  const val = parseFloat(cleaned);
  return isNaN(val) ? 0 : val;
}

export function formatPrice(num: number): string {
  return `£${num.toFixed(2)}`;
}

const STORAGE_KEY = "publishinghub_cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

function matchesItem(item: CartItem, idOrTitle: string): boolean {
  if (!idOrTitle) return false;
  if (item.id === idOrTitle) return true;
  return item.title.trim().toLowerCase() === idOrTitle.trim().toLowerCase();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const sanitized: CartItem[] = parsed.map((item: any) => {
            const numeric = item.numericPrice ?? parsePrice(item.price);
            return {
              id: String(item.id || `item-${Date.now()}`),
              title: String(item.title || item.name || "Untitled"),
              price: item.price ? String(item.price) : formatPrice(numeric),
              numericPrice: numeric,
              quantity: Math.max(1, Number(item.quantity) || 1),
              image: item.image || "/images/shop1.jpg",
              slug: item.slug,
              author: item.author,
              salePrice: item.salePrice,
              originalPrice: item.originalPrice,
            };
          });
          setItems(sanitized);
        }
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  const saveCart = useCallback((newItems: CartItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, []);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const num = item.numericPrice ?? parsePrice(item.price);
      return sum + num * item.quantity;
    }, 0);
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const addItem = useCallback(
    (input: AddItemInput) => {
      const qtyToAdd = Math.max(1, input.quantity || 1);
      const numeric = input.numericPrice ?? parsePrice(input.price);
      const displayPrice =
        typeof input.price === "string" && input.price.includes("£")
          ? input.price
          : formatPrice(numeric);

      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (existing) =>
            (input.id && existing.id === input.id) ||
            existing.title.trim().toLowerCase() === input.title.trim().toLowerCase()
        );

        let updated: CartItem[];
        if (existingIndex >= 0) {
          updated = prev.map((item, index) =>
            index === existingIndex
              ? {
                  ...item,
                  quantity: item.quantity + qtyToAdd,
                  // Keep image and slug if previously missing
                  image: item.image || input.image || "/images/shop1.jpg",
                  slug: item.slug || input.slug,
                }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: input.id || `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title: input.title,
            price: displayPrice,
            numericPrice: numeric,
            quantity: qtyToAdd,
            image: input.image || "/images/shop1.jpg",
            slug: input.slug,
            author: input.author,
            salePrice: input.salePrice,
            originalPrice: input.originalPrice,
          };
          updated = [newItem, ...prev];
        }

        saveCart(updated);
        return updated;
      });

      // Automatically open drawer on Add to Cart
      setIsOpen(true);
    },
    [saveCart]
  );

  const removeItem = useCallback(
    (idOrTitle: string) => {
      setItems((prev) => {
        const updated = prev.filter((item) => !matchesItem(item, idOrTitle));
        saveCart(updated);
        return updated;
      });
    },
    [saveCart]
  );

  const updateQuantity = useCallback(
    (idOrTitle: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(idOrTitle);
        return;
      }
      setItems((prev) => {
        const updated = prev.map((item) =>
          matchesItem(item, idOrTitle) ? { ...item, quantity } : item
        );
        saveCart(updated);
        return updated;
      });
    },
    [removeItem, saveCart]
  );

  const increaseQuantity = useCallback(
    (idOrTitle: string) => {
      setItems((prev) => {
        const updated = prev.map((item) =>
          matchesItem(item, idOrTitle) ? { ...item, quantity: item.quantity + 1 } : item
        );
        saveCart(updated);
        return updated;
      });
    },
    [saveCart]
  );

  const decreaseQuantity = useCallback(
    (idOrTitle: string) => {
      setItems((prev) => {
        const updated = prev
          .map((item) =>
            matchesItem(item, idOrTitle) ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0);
        saveCart(updated);
        return updated;
      });
    },
    [saveCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
  }, [saveCart]);

  const value = useMemo<CartContextType>(
    () => ({
      items,
      totalQuantity,
      cartCount: totalQuantity,
      subtotal,
      isOpen,
      isLoaded,
      addItem,
      removeItem,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      totalQuantity,
      subtotal,
      isOpen,
      isLoaded,
      addItem,
      removeItem,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
