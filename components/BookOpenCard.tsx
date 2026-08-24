"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingBag, Check } from "lucide-react";
import styles from "./BookOpenCard.module.css";

export interface BookOpenCardProps {
  coverSrc: string;
  title: string;
  price: string;
  description: string;
  authors?: string[];
  category?: string;
  onAddToCart?: (quantity: number) => void;
  className?: string;
}

export default function BookOpenCard({
  coverSrc,
  title,
  price,
  description,
  authors = [],
  category = "Featured Book",
  onAddToCart,
  className = "",
}: BookOpenCardProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(quantity);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {/* ========================================================================= */}
      {/* 3D PERSPECTIVE BOOK STAGE WITH OPEN-ON-HOVER EFFECT                      */}
      {/* ========================================================================= */}
      <div
        className={styles.stage}
        tabIndex={0}
        role="region"
        aria-label={`3D Book showcase for ${title}`}
      >
        {/* Soft Radial Contact Shadow */}
        <div className={styles.contactShadow} aria-hidden="true" />

        {/* 3D Book Assembly */}
        <div className={styles.book}>
          {/* Back Cover & Spine Block */}
          <div className={styles.bookBody}>
            {/* Realistic Page Edges Layer */}
            <div className={styles.pagesLayer}>
              {/* Inner Page Preview visible when opened */}
              <div className={styles.pageContent}>
                <div className="space-y-1">
                  <span className="text-[7px] tracking-[0.2em] uppercase font-bold text-[#a9822e] block">
                    {category}
                  </span>
                  <p className="font-serif text-[9px] font-semibold text-[#2c3e50] line-clamp-2 leading-tight">
                    {title}
                  </p>
                </div>
                <p className="text-[7px] text-[#555] italic leading-tight line-clamp-6">
                  {description}
                </p>
                <div className="text-[7px] font-serif text-[#888] pt-1 border-t border-[#e2d8c3] text-right">
                  Page 1
                </div>
              </div>
            </div>
          </div>

          {/* 3D Hinged Cover Assembly (Rotates -30deg on hover) */}
          <div className={styles.cover}>
            {/* Front Face: Book Artwork Image */}
            <div className={styles.frontFace}>
              <div className={styles.spineHighlight} aria-hidden="true" />
              <Image
                src={coverSrc}
                alt={title}
                fill
                sizes="(max-width: 640px) 280px, 320px"
                priority
                className="object-cover"
              />
            </div>

            {/* Back Face: Cream Blank Inner Facing Page (Pre-rotated 180deg) */}
            <div className={styles.backFace} aria-hidden="true">
              <div className={styles.innerPagePattern}>
                <div className="text-center p-3 opacity-60">
                  <div className="w-8 h-[1px] bg-[#a9822e] mx-auto mb-1.5" />
                  <span className="text-[8px] font-serif tracking-widest text-[#a9822e] uppercase block">
                    Ex Libris
                  </span>
                  <div className="w-8 h-[1px] bg-[#a9822e] mx-auto mt-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOOK DETAILS, PRICE, QUANTITY STEPPER & CTA BUTTON                       */}
      {/* ========================================================================= */}
      <div className="w-full max-w-md mt-8 md:mt-0 flex flex-col justify-center space-y-4">
        {/* Category Label with Gold Accent */}
        {category && (
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#a9822e] block">
            {category}
          </span>
        )}

        {/* Title */}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#18181b] dark:text-[#f2eee3] leading-snug">
          {title}
        </h2>

        {/* Authors */}
        {authors && authors.length > 0 && (
          <p className="text-xs sm:text-sm font-medium text-[#71717a] dark:text-[#a1a1aa]">
            By {authors.join(", ")}
          </p>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#52525b] dark:text-[#babcb2] leading-relaxed">
          {description}
        </p>

        {/* Price with Gold Accent */}
        <div className="pt-2">
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#a9822e]">
            {price}
          </span>
        </div>

        {/* Quantity Stepper & Terracotta Add to Cart Button */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          {/* Stepper (+ / -) */}
          <div className="flex items-center border border-[#d8d3c5] dark:border-[#a9822e]/40 bg-[#faf7f0] dark:bg-[#0c1410] rounded-[2px] h-11 px-2">
            <button
              type="button"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              className="w-7 h-full flex items-center justify-center text-[#a9822e] hover:opacity-75 transition-opacity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-serif text-sm font-semibold text-[#18181b] dark:text-[#f2eee3]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              aria-label="Increase quantity"
              className="w-7 h-full flex items-center justify-center text-[#a9822e] hover:opacity-75 transition-opacity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA Button with Terracotta Accent (#c1673f) */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 min-w-[180px] h-11 bg-[#c1673f] hover:bg-[#aa532d] active:scale-[0.98] text-white text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center gap-2 rounded-[2px] transition-all shadow-md hover:shadow-lg shadow-[#c1673f]/25"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" /> Added ({quantity})
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-white" /> Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
