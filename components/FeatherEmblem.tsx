"use client";

import React from "react";

interface FeatherEmblemProps {
  size?: number | string;
  className?: string;
}

export default function FeatherEmblem({
  size = 260,
  className = "",
}: FeatherEmblemProps) {
  return (
    <div
      className={`relative rounded-full p-2 group transition-all duration-500 hover:scale-105 select-none ${className}`}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
      }}
    >
      {/* Outer ambient golden glow */}
      <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(212,181,106,0.35)_0%,rgba(18,61,43,0.25)_50%,transparent_75%)] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Main SVG Container */}
      <div className="relative w-full h-full rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          <defs>
            {/* Top Text Path */}
            <path
              id="topArcPath"
              d="M 45, 150 A 105, 105 0 0, 1 255, 150"
            />
            {/* Bottom Text Path */}
            <path
              id="bottomArcPath"
              d="M 255, 150 A 105, 105 0 0, 1 45, 150"
            />

            {/* 3D Metallic Gold Outer Rim Gradient */}
            <radialGradient id="outerRimGold" cx="50%" cy="50%" r="50%">
              <stop offset="85%" stopColor="#08100c" />
              <stop offset="92%" stopColor="#453109" />
              <stop offset="96%" stopColor="#e5c479" />
              <stop offset="100%" stopColor="#8a641d" />
            </radialGradient>

            {/* Rich 3D Gold Gradient for Feather */}
            <linearGradient id="richGoldFeather" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#fff6db" />
              <stop offset="25%" stopColor="#f5d584" />
              <stop offset="50%" stopColor="#d4a340" />
              <stop offset="75%" stopColor="#875e18" />
              <stop offset="100%" stopColor="#d8b15d" />
            </linearGradient>

            {/* Feather Spine Gradient */}
            <linearGradient id="spineGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f7e19e" />
              <stop offset="80%" stopColor="#b38222" />
              <stop offset="100%" stopColor="#533c0d" />
            </linearGradient>

            {/* Inner Emerald Gradient */}
            <radialGradient id="innerEmerald" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d2419" />
              <stop offset="60%" stopColor="#06120d" />
              <stop offset="100%" stopColor="#020704" />
            </radialGradient>

            {/* Feather Shadow */}
            <filter id="featherDropShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* 1. Base Disk with Deep Forest Green Background */}
          <circle cx="150" cy="150" r="146" fill="url(#innerEmerald)" />

          {/* 2. Outer Luxury Gold Ring Borders */}
          <circle cx="150" cy="150" r="144" fill="none" stroke="#d4b56a" strokeWidth="4" />
          <circle cx="150" cy="150" r="140" fill="none" stroke="#6e5016" strokeWidth="2" opacity="0.8" />

          {/* 3. Outer Dashed Gold Ring */}
          <circle
            cx="150" 
            cy="150"
            r="128"
            fill="none"
            stroke="#d4b56a"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.8"
          />

          {/* 4. Inner Solid Gold Circle Ring */}
          <circle cx="150" cy="150" r="82" fill="none" stroke="#d4b56a" strokeWidth="2" opacity="0.9" />
          <circle cx="150" cy="150" r="80" fill="none" stroke="#7a5b1c" strokeWidth="1" opacity="0.5" />

          {/* 5. Circular Text (Top & Bottom Arcs) */}
          <text
            className="text-[11px] uppercase font-serif font-bold tracking-[0.24em]"
            fill="#f7e4a8"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            <textPath href="#topArcPath" startOffset="50%" textAnchor="middle">
              • A MONTHLY •
            </textPath>
          </text>

          <text
            className="text-[11px] uppercase font-serif font-bold tracking-[0.24em]"
            fill="#f7e4a8"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
          >
            <textPath href="#bottomArcPath" startOffset="50%" textAnchor="middle">
              • BOOK REVIEW •
            </textPath>
          </text>

          {/* 6. Central Realistic 3D Metallic Gold Quill Feather */}
          <g filter="url(#featherDropShadow)">
            {/* Feather Vane - Left Side with Individual Barbs */}
            <path
              d="M 160,45 
                 C 142,65 125,95 120,135 
                 C 118,160 124,190 135,215 
                 C 138,195 145,155 155,115 Z"
              fill="url(#richGoldFeather)"
            />

            {/* Left Barbs Textures */}
            <path d="M 158,65 Q 140,80 128,95" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 154,85 Q 134,105 124,122" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 150,105 Q 130,130 121,148" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 146,128 Q 128,155 122,175" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 142,152 Q 130,175 126,195" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />

            {/* Feather Vane - Right Side */}
            <path
              d="M 160,45 
                 C 178,75 186,120 180,165 
                 C 175,195 162,215 152,225 
                 C 158,200 165,160 162,115 Z"
              fill="url(#richGoldFeather)"
            />

            {/* Right Barbs Textures */}
            <path d="M 160,70 Q 172,85 178,102" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 158,92 Q 172,112 179,132" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 156,118 Q 170,140 176,162" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 154,145 Q 166,168 170,188" stroke="#5a3d0b" strokeWidth="1.2" fill="none" opacity="0.65" />

            {/* Feather Calamus / Center Shaft */}
            <path
              d="M 125,245 Q 150,155 160,45"
              fill="none"
              stroke="url(#spineGold)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Quill Nib */}
            <polygon points="122,245 128,242 125,254" fill="#fff6db" />
          </g>

          {/* 7. Highlights and Lens Shimmer Effect */}
          <ellipse cx="150" cy="150" r="140" fill="url(#innerEmerald)" opacity="0.05" />
        </svg>
      </div>
    </div>
  );
}
  