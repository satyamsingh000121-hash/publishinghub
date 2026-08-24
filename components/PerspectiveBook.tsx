"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PerspectiveBookProps {
  className?: string;
  children: React.ReactNode;
  textured?: boolean;
}

export function PerspectiveBook({
  className = "",
  children,
  textured = false,
}: PerspectiveBookProps) {
  return (
    <div className="group [perspective:1200px] w-full h-full flex items-center justify-center select-none overflow-visible">
      {/* 3D Rotating Container */}
      <div
        className={cn(
          "transition-transform duration-300 ease-out relative [transform-style:preserve-3d] [transform:rotateY(0deg)] group-hover:[transform:rotateY(-20deg)_scale(1.04)] w-full h-full",
          className
        )}
        style={{
          transformOrigin: "left center",
        }}
      >
        {/* Front Cover - 100% Full-bleed without any black/dark border */}
        <div
          className="relative w-full h-full overflow-hidden rounded-l-[2px] rounded-r-[4px] shadow-md flex flex-col"
          style={{
            transform: "translateZ(0px)",
          }}
        >
          {/* Subtle Left Spine Crease Shadow */}
          <div
            className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none"
            style={{
              width: "7%",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }}
          />

          {/* Book Image / Artwork (Edge-to-Edge) */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {children}
          </div>

          {/* Paper Texture Overlay */}
          {textured && (
            <div
              className="absolute inset-0 mix-blend-hard-light rotate-180 opacity-25 brightness-110 bg-no-repeat bg-cover pointer-events-none z-10 bg-[url('https://assets.vercel.com/image/upload/v1720554484/front/design/book-texture.avif')]"
            />
          )}

          {/* Top gloss reflection */}
          <div className="absolute top-0 inset-x-0 h-1/5 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
        </div>

        {/* 3D Pages Thickness (Right Edge - Realistic White Pages) */}
        <div
          className="absolute top-[2px] bottom-[2px] right-0 pointer-events-none"
          style={{
            width: "24px",
            background:
              "repeating-linear-gradient(90deg, #e4e4e7 0px, #ffffff 1px, #f4f4f5 2px, #d4d4d8 3px)",
            transform: "translateX(calc(100% - 12px)) rotateY(90deg) translateX(12px)",
            boxShadow: "inset 0 0 3px rgba(0,0,0,0.2)",
          }}
        />

        {/* 3D Back Cover */}
        <div
          className="bg-[#0f1411] absolute inset-0 rounded-l-[2px] rounded-r-[4px] pointer-events-none shadow-xl"
          style={{
            transform: "translateZ(-24px)",
          }}
        />
      </div>
    </div>
  );
}

export default PerspectiveBook;
