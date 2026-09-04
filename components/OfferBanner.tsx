"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center overflow-hidden border-t border-b border-[#b89245]/35 bg-[#050c08]">
      
      {/* Deep atmospheric dark forest background (Dark Mode Only) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030604] via-[#07130c] to-[#040806] dark:block hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(20,65,42,0.45),transparent_70%)] pointer-events-none dark:block hidden" />
      
      {/* Shelf Surface bottom line (Dark Mode Only) */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black via-black/80 to-transparent border-b border-[#b89245]/20 dark:block hidden" />

      {/* ========================================================= */}
      {/* LEFT VISUAL: Realistic 3D Stacked Books with Open Book */}
      {/* ========================================================= */}
      <div className="absolute -left-10 sm:left-0 md:left-6 lg:left-10 bottom-0 top-0 w-52 sm:w-80 md:w-[460px] lg:w-[500px] pointer-events-none flex items-end pb-2 z-10 opacity-20 sm:opacity-40 md:opacity-100 transition-opacity">
        <div className="relative w-full h-[200px] sm:h-[280px] md:h-[340px]">
          <svg viewBox="0 0 520 360" className="w-full h-full dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_25px_rgba(147,51,234,0.12)]">
            <defs>
              {/* Dark mode leather gradients */}
              <linearGradient id="leatherBrown" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3d2215" />
                <stop offset="30%" stopColor="#54311e" />
                <stop offset="70%" stopColor="#2e190e" />
                <stop offset="100%" stopColor="#1a0c06" />
              </linearGradient>

              <linearGradient id="leatherGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a29" />
                <stop offset="30%" stopColor="#2d573e" />
                <stop offset="70%" stopColor="#183122" />
                <stop offset="100%" stopColor="#0c1b12" />
              </linearGradient>

              {/* Light mode pastel book gradients */}
              <linearGradient id="bookLilac" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="40%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>

              <linearGradient id="bookViolet" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#6d28d9" />
                <stop offset="100%" stopColor="#5b21b6" />
              </linearGradient>

              <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8a692b" />
                <stop offset="50%" stopColor="#e5c577" />
                <stop offset="100%" stopColor="#967431" />
              </linearGradient>

              <linearGradient id="paperEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f7f2ea" />
                <stop offset="50%" stopColor="#ede3cc" />
                <stop offset="100%" stopColor="#dfd0b5" />
              </linearGradient>

              <linearGradient id="openPageLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d9cdb4" />
                <stop offset="25%" stopColor="#faf6ed" />
                <stop offset="85%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#cfc2a7" />
              </linearGradient>

              <linearGradient id="openPageRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cfc2a7" />
                <stop offset="15%" stopColor="#ffffff" />
                <stop offset="75%" stopColor="#faf6ed" />
                <stop offset="100%" stopColor="#d9cdb4" />
              </linearGradient>
            </defs>

            {/* Base Surface Shadow */}
            <ellipse cx="240" cy="340" rx="200" ry="14" className="dark:fill-black dark:opacity-85 fill-purple-900 opacity-10" />

            {/* BOOK 1 (Bottom Thick Volume) */}
            <g id="book-bottom">
              <path
                d="M40,325 C40,305 60,300 280,295 L460,300 L440,345 C280,342 60,350 40,325 Z"
                className="dark:fill-[url(#leatherBrown)] fill-[url(#bookLilac)]"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
              <polygon points="280,295 470,290 450,332 280,340" fill="url(#paperEdge)" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="300" y1="299" x2="465" y2="295" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="295" y1="309" x2="460" y2="305" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="290" y1="319" x2="455" y2="315" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="285" y1="329" x2="450" y2="325" stroke="#baa88c" strokeWidth="0.5" />

              <rect x="75" y="303" width="3" height="44" fill="url(#goldFoil)" />
              <rect x="100" y="303" width="3" height="44" fill="url(#goldFoil)" />
              <rect x="165" y="299" width="3" height="44" fill="url(#goldFoil)" />
              <rect x="190" y="299" width="3" height="44" fill="url(#goldFoil)" />

              <text x="125" y="327" fontFamily="Cormorant Garamond, serif" fontSize="9" fontWeight="700" fill="url(#goldFoil)" letterSpacing="3">
                VOL. I
              </text>
            </g>

            {/* BOOK 2 (Middle Volume) */}
            <g id="book-middle" transform="translate(10, -38)">
              <ellipse cx="250" cy="335" rx="180" ry="8" className="dark:fill-black dark:opacity-60 fill-purple-950 opacity-10" />
              <path
                d="M45,318 C45,300 65,295 275,290 L450,295 L430,335 C275,332 65,340 45,318 Z"
                className="dark:fill-[url(#leatherGreen)] fill-[url(#bookViolet)]"
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="1"
              />
              <polygon points="275,290 460,285 440,323 275,330" fill="url(#paperEdge)" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="290" y1="293" x2="455" y2="289" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="285" y1="303" x2="450" y2="299" stroke="#baa88c" strokeWidth="0.5" />
              <line x1="280" y1="313" x2="445" y2="309" stroke="#baa88c" strokeWidth="0.5" />

              <rect x="80" y="298" width="3" height="38" fill="url(#goldFoil)" />
              <rect x="105" y="298" width="3" height="38" fill="url(#goldFoil)" />
              <rect x="170" y="293" width="3" height="38" fill="url(#goldFoil)" />
              <rect x="195" y="293" width="3" height="38" fill="url(#goldFoil)" />

              <text x="128" y="320" fontFamily="Cormorant Garamond, serif" fontSize="8" fontWeight="700" fill="url(#goldFoil)" letterSpacing="2">
                HISTORIA
              </text>
            </g>

            {/* BOOK 3 (Top Natural Open Book Resting on Stack) */}
            <g id="book-open" transform="translate(15, -15)">
              <path d="M55,248 C140,225 235,238 250,270 C265,238 360,225 445,248 L450,260 C360,236 265,250 250,280 C235,250 140,236 50,260 Z" className="dark:fill-[#21130a] fill-[#581c87]" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />

              <path d="M60,238 C145,212 238,228 250,262 C262,228 355,212 440,238 L437,246 C355,220 262,236 250,268 C238,236 145,220 63,246 Z" fill="#ded5c5" />
              <path d="M65,220 C150,188 240,210 250,250 C260,210 350,188 435,220 L432,228 C350,198 260,218 250,256 C240,218 150,198 68,228 Z" fill="#ebe4d5" />
              <path d="M72,200 C155,162 242,192 250,238 C258,192 345,162 428,200 L425,208 C345,172 258,200 250,244 C242,200 155,172 75,208 Z" fill="#f5efe1" />

              <path d="M78,175 C160,125 242,165 250,225 L250,236 C242,176 160,136 78,186 Z" fill="url(#openPageLeft)" stroke="#ab997a" strokeWidth="0.5" />
              <path d="M422,175 C340,125 258,165 250,225 L250,236 C258,176 340,136 422,186 Z" fill="url(#openPageRight)" stroke="#ab997a" strokeWidth="0.5" />

              {/* Spine center crease */}
              <line x1="250" y1="150" x2="250" y2="236" stroke="#5c4a30" strokeWidth="1" opacity="0.7" />

              {/* Red Silk Ribbon Bookmark */}
              <path d="M250,228 Q248,260 235,285 Q225,305 240,320" stroke="#9333ea" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9" />

              {/* Realistic subtle text print lines */}
              <g opacity="0.45" stroke="#4a3e2e" strokeWidth="0.8" strokeLinecap="round">
                <line x1="105" y1="168" x2="205" y2="155" />
                <line x1="102" y1="176" x2="208" y2="163" />
                <line x1="100" y1="184" x2="210" y2="171" />
                <line x1="98" y1="192" x2="212" y2="179" />
                <line x1="96" y1="200" x2="215" y2="187" />
              </g>

              <g opacity="0.45" stroke="#4a3e2e" strokeWidth="0.8" strokeLinecap="round">
                <line x1="295" y1="155" x2="395" y2="168" />
                <line x1="292" y1="163" x2="398" y2="176" />
                <line x1="290" y1="171" x2="400" y2="184" />
                <line x1="288" y1="179" x2="402" y2="192" />
                <line x1="285" y1="187" x2="404" y2="200" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT VISUAL: Clean Ceramic Cup & Eucalyptus with Warm Glow */}
      {/* ========================================================= */}
      <div className="absolute -right-6 sm:right-4 md:right-12 lg:right-16 bottom-0 top-0 w-44 sm:w-60 md:w-80 pointer-events-none flex items-end justify-end pb-3 z-10 opacity-20 sm:opacity-40 md:opacity-100 transition-opacity">
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] flex items-end justify-end">
          
          {/* Natural Botanical Eucalyptus / Olive Branch */}
          <div className="absolute right-10 sm:right-20 bottom-6 w-40 sm:w-64 h-32 sm:h-48 pointer-events-none">
            <svg viewBox="0 0 240 180" className="w-full h-full">
              {/* Branch stem */}
              <path d="M10,165 Q80,125 155,85 T220,35" fill="none" className="dark:stroke-[#2c5a40] stroke-[#4f772d]" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <path d="M120,105 Q150,80 185,70" fill="none" className="dark:stroke-[#2c5a40] stroke-[#4f772d]" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
              
              {/* Natural Oval Leaves */}
              {[
                { x: 30, y: 145, rx: 16, ry: 10, rot: 20 },
                { x: 58, y: 125, rx: 18, ry: 11, rot: -15 },
                { x: 88, y: 102, rx: 20, ry: 12, rot: 25 },
                { x: 78, y: 68, rx: 16, ry: 10, rot: -25 },
                { x: 115, y: 72, rx: 19, ry: 11, rot: 30 },
                { x: 130, y: 98, rx: 21, ry: 12, rot: -20 },
                { x: 162, y: 90, rx: 20, ry: 11, rot: 15 },
                { x: 188, y: 68, rx: 17, ry: 10, rot: 35 },
                { x: 198, y: 112, rx: 19, ry: 11, rot: -30 },
              ].map((leaf, i) => (
                <g key={i} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot})`}>
                  {/* Outer Leaf Body */}
                  <ellipse cx="0" cy="0" rx={leaf.rx} ry={leaf.ry} className="dark:fill-[#1e3f2d] fill-[#588157]" opacity="0.85" />
                  {/* Leaf Highlight */}
                  <ellipse cx="-1" cy="-1" rx={leaf.rx * 0.75} ry={leaf.ry * 0.6} className="dark:fill-[#2d5c43] fill-[#a3b18a]" opacity="0.9" />
                  {/* Leaf Center Vein */}
                  <line x1={-leaf.rx * 0.7} y1="0" x2={leaf.rx * 0.7} y2="0" className="dark:stroke-[#5d9670] stroke-[#344e41]" strokeWidth="0.8" opacity="0.8" />
                </g>
              ))}
            </svg>
          </div>

          {/* Candle Container */}
          <div className="relative z-20 flex flex-col items-center mr-4 sm:mr-10 mb-2">
            
            {/* Flickering Ambient Warmth */}
            <div className="absolute -top-10 -left-6 -right-6 w-24 h-24 bg-[radial-gradient(circle,rgba(255,170,0,0.5)_0%,rgba(255,130,0,0.2)_50%,transparent_75%)] rounded-full blur-lg pointer-events-none animate-candle-glow" />

            {/* Candle Flame */}
            <div className="relative mb-[-2px] flex flex-col items-center animate-candle-flame">
              <div className="relative z-10 w-5 sm:w-6 h-9 sm:h-11 bg-gradient-to-t from-[#ff4400] via-[#ffaa00] to-[#fffde0] rounded-[50%_50%_35%_35%] blur-[0.4px] shadow-[0_0_20px_#ff9900]" />
              <div className="absolute bottom-1 z-20 w-2 sm:w-2.5 h-3.5 sm:h-4 bg-gradient-to-t from-[#2a66ff] via-[#ffffff] to-[#ffffff] rounded-[50%_50%_40%_40%]" />
              <div className="w-0.5 h-1.5 bg-[#111111] mt-[-1px] relative z-10" />
            </div>

            {/* Translucent Glass Tumbler */}
            <div className="w-16 sm:w-20 md:w-22 h-16 sm:h-20 md:h-22 bg-gradient-to-b from-white/40 to-purple-200/50 border border-purple-300/60 shadow-[0_8px_20px_rgba(147,51,234,0.12)] dark:bg-[#161a18] dark:border-[#2c332e] dark:shadow-[-10px_15px_30px_rgba(0,0,0,0.95)] rounded-xl relative overflow-hidden flex flex-col justify-start p-1.5 backdrop-blur-md">
              <div className="w-full h-3 sm:h-3.5 bg-gradient-to-r from-purple-100 via-amber-100 to-purple-100 dark:from-[#242b27] dark:via-[#f0d694] dark:to-[#1c221e] rounded-full border border-purple-200/50 dark:border-black/60 shadow-inner flex items-center justify-center">
                <div className="w-4/5 h-2 bg-gradient-to-r from-white via-amber-200 to-white dark:from-[#ebd69b] dark:via-[#ffffff] dark:to-[#dfc480] rounded-full blur-[0.3px]" />
              </div>
              <div className="absolute top-4 left-2 bottom-2 w-2 bg-gradient-to-r from-white/40 to-transparent rounded-full pointer-events-none" />
            </div>

            <div className="w-18 sm:w-22 h-2.5 bg-black/90 blur-sm rounded-full -mt-0.5 dark:block hidden" />
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* CENTER: Main Typography & Button */}
      {/* ========================================================= */}
      <div className="container-custom relative z-20 text-center px-4 py-12 sm:py-20 max-w-[850px] mx-auto space-y-4 sm:space-y-5">
        <span className="text-[10px] sm:text-xs tracking-[0.28em] sm:tracking-[0.32em] text-[#d4b56a] font-bold uppercase block">
          WHAT&apos;S HOT IN AUGUST
        </span>

        <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight text-[#f2eee3] leading-[1.1] sm:leading-[1.05] drop-shadow-md">
          Get -30% purchase on <br />
          order over £299.00
        </h2>

        <div className="pt-2 sm:pt-3">
          <a
            href="#bestsellers"
            className="min-h-[44px] sm:min-h-[46px] px-7 sm:px-9 bg-[#2c7650] hover:bg-[#37865d] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 dark:shadow-black/70 shadow-[0_6px_20px_rgba(147,51,234,0.3)] rounded-sm"
          >
            EXPLORE NOW <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
}
