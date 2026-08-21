"use client";

import React from "react";

interface RotatingLogoProps {
  size?: number | string;
  className?: string;
  speedSeconds?: number;
}

export default function RotatingLogo({
  size = 380,
  className = "",
  speedSeconds = 18,
}: RotatingLogoProps) {
  const dimensionStyle = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  return (
    <div
      className={`relative select-none group flex items-center justify-center ${className}`}
      style={dimensionStyle}
    >
      {/* Outer subtle atmospheric golden ambient glow */}
      <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(212,181,106,0.3)_0%,rgba(18,61,43,0.2)_50%,transparent_75%)] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main emblem container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Layer 1: Static Center Feather (3d_2.png) */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            src="/images/3d_2.png"
            alt="Center Gold Feather"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Layer 2: Fixed-Axis Rotating Outer Ring (3d_1.png) with precise transform-origin */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none ring-spinner"
        >
          <img
            src="/images/3d_1.png"
            alt="Rotating Book Review Ring"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>

      <style jsx>{`
        .ring-spinner {
          animation: spinRing ${speedSeconds}s linear infinite;
          transform-origin: 52.963% 48.975%;
        }
        @keyframes spinRing {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
