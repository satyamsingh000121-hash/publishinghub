"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center overflow-hidden border-t border-b border-[#b89245]/35 bg-[#050c08]">
      
      {/* Deep atmospheric dark forest photographic background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030604] via-[#07130c] to-[#040806]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(20,65,42,0.45),transparent_70%)] pointer-events-none" />
      
      {/* Shelf Surface bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black via-black/80 to-transparent border-b border-[#b89245]/20" />

      {/* ========================================================= */}
      {/* LEFT VISUAL: Realistic 3D Stacked Books with Open Book */}
      {/* ========================================================= */}
      <div className="absolute -left-6 sm:left-0 md:left-6 lg:left-10 bottom-0 top-0 w-72 sm:w-96 md:w-[460px] lg:w-[500px] pointer-events-none flex items-end pb-2 z-10">
        <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px]">
          <svg viewBox="0 0 520 360" className="w-full h-full filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]">
            <defs>
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

              <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8a692b" />
                <stop offset="50%" stopColor="#e5c577" />
                <stop offset="100%" stopColor="#967431" />
              </linearGradient>

              <linearGradient id="paperEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d9cdb4" />
                <stop offset="50%" stopColor="#ede3cc" />
                <stop offset="100%" stopColor="#bfae8f" />
              </linearGradient>

              <linearGradient id="openPageLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#b8a88a" />
                <stop offset="25%" stopColor="#ede5d3" />
                <stop offset="85%" stopColor="#f5efe1" />
                <stop offset="100%" stopColor="#99876a" />
              </linearGradient>

              <linearGradient id="openPageRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#99876a" />
                <stop offset="15%" stopColor="#f5efe1" />
                <stop offset="75%" stopColor="#ede5d3" />
                <stop offset="100%" stopColor="#b8a88a" />
              </linearGradient>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Base Surface Shadow */}
            <ellipse cx="240" cy="340" rx="220" ry="18" fill="#000000" opacity="0.9" />

            {/* BOOK 1 (Bottom Thick Volume - Brown Leather) */}
            <g id="book-bottom">
              <path d="M40,325 C40,305 60,300 280,295 L460,300 L440,345 C280,342 60,350 40,325 Z" fill="url(#leatherBrown)" stroke="#1a0c06" strokeWidth="1" />
              <polygon points="280,295 470,290 450,332 280,340" fill="url(#paperEdge)" stroke="#8f7e62" strokeWidth="0.5" />
              <line x1="300" y1="299" x2="465" y2="295" stroke="#9e8c6e" strokeWidth="0.5" />
              <line x1="295" y1="309" x2="460" y2="305" stroke="#9e8c6e" strokeWidth="0.5" />
              <line x1="290" y1="319" x2="455" y2="315" stroke="#9e8c6e" strokeWidth="0.5" />
              <line x1="285" y1="329" x2="450" y2="325" stroke="#9e8c6e" strokeWidth="0.5" />

              <path d="M70,302 Q90,300 110,302 L108,348 Q90,346 68,348 Z" fill="#29150b" opacity="0.7" />
              <rect x="75" y="303" width="3" height="44" fill="url(#goldFoil)" />
              <rect x="100" y="303" width="3" height="44" fill="url(#goldFoil)" />

              <path d="M160,298 Q180,296 200,298 L198,344 Q180,342 158,344 Z" fill="#29150b" opacity="0.7" />
              <rect x="165" y="299" width="3" height="44" fill="url(#goldFoil)" />
              <rect x="190" y="299" width="3" height="44" fill="url(#goldFoil)" />

              <text x="125" y="327" fontFamily="Cormorant Garamond, serif" fontSize="9" fontWeight="700" fill="url(#goldFoil)" letterSpacing="3">
                VOL. I
              </text>
            </g>

            {/* BOOK 2 (Middle Volume - Green Leather) */}
            <g id="book-middle" transform="translate(10, -38)">
              <ellipse cx="250" cy="335" rx="200" ry="10" fill="#000000" opacity="0.7" />
              <path d="M45,318 C45,300 65,295 275,290 L450,295 L430,335 C275,332 65,340 45,318 Z" fill="url(#leatherGreen)" stroke="#09140c" strokeWidth="1" />
              <polygon points="275,290 460,285 440,323 275,330" fill="url(#paperEdge)" stroke="#7a6c52" strokeWidth="0.5" />
              <line x1="290" y1="293" x2="455" y2="289" stroke="#948366" strokeWidth="0.5" />
              <line x1="285" y1="303" x2="450" y2="299" stroke="#948366" strokeWidth="0.5" />
              <line x1="280" y1="313" x2="445" y2="309" stroke="#948366" strokeWidth="0.5" />

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
              <path d="M50,265 C130,240 240,250 250,270 C260,250 370,240 450,265 C380,290 270,280 250,290 C230,280 120,290 50,265 Z" fill="#000000" opacity="0.85" filter="url(#softGlow)" />
              <path d="M55,248 C140,225 235,238 250,270 C265,238 360,225 445,248 L450,260 C360,236 265,250 250,280 C235,250 140,236 50,260 Z" fill="#21130a" stroke="#3b2212" strokeWidth="1.5" />

              <path d="M60,238 C145,212 238,228 250,262 C262,228 355,212 440,238 L437,246 C355,220 262,236 250,268 C238,236 145,220 63,246 Z" fill="#c4b59b" />
              <path d="M65,220 C150,188 240,210 250,250 C260,210 350,188 435,220 L432,228 C350,198 260,218 250,256 C240,218 150,198 68,228 Z" fill="#d9cdb6" />
              <path d="M72,200 C155,162 242,192 250,238 C258,192 345,162 428,200 L425,208 C345,172 258,200 250,244 C242,200 155,172 75,208 Z" fill="#e8dec8" />

              <path d="M78,175 C160,125 242,165 250,225 L250,236 C242,176 160,136 78,186 Z" fill="url(#openPageLeft)" stroke="#ab997a" strokeWidth="0.5" />
              <path d="M422,175 C340,125 258,165 250,225 L250,236 C258,176 340,136 422,186 Z" fill="url(#openPageRight)" stroke="#ab997a" strokeWidth="0.5" />

              <path d="M247,150 Q250,190 250,236 Q250,190 253,150 Z" fill="#000000" opacity="0.9" />
              <line x1="250" y1="145" x2="250" y2="236" stroke="#382817" strokeWidth="1.5" />

              <path d="M250,228 Q248,260 235,285 Q225,305 240,320" stroke="#8b1c1c" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.95" />
              <path d="M250,228 Q248,260 235,285 Q225,305 240,320" stroke="#d43f3f" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />

              <g opacity="0.55" stroke="#5c503d" strokeWidth="0.9" strokeLinecap="round">
                <line x1="105" y1="168" x2="205" y2="155" />
                <line x1="102" y1="176" x2="208" y2="163" />
                <line x1="100" y1="184" x2="210" y2="171" />
                <line x1="98" y1="192" x2="212" y2="179" />
                <line x1="96" y1="200" x2="215" y2="187" />
                <line x1="95" y1="208" x2="190" y2="196" />
              </g>

              <g opacity="0.55" stroke="#5c503d" strokeWidth="0.9" strokeLinecap="round">
                <line x1="295" y1="155" x2="395" y2="168" />
                <line x1="292" y1="163" x2="398" y2="176" />
                <line x1="290" y1="171" x2="400" y2="184" />
                <line x1="288" y1="179" x2="402" y2="192" />
                <line x1="285" y1="187" x2="404" y2="200" />
                <line x1="285" y1="195" x2="380" y2="208" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT VISUAL: Clean Ceramic Cup & Eucalyptus with Warm Glow */}
      {/* ========================================================= */}
      <div className="absolute right-4 sm:right-8 md:right-12 lg:right-16 bottom-0 top-0 w-60 sm:w-72 md:w-80 pointer-events-none flex items-end justify-end pb-3 z-10">
        <div className="relative w-full h-[220px] sm:h-[250px] flex items-end justify-end">
          
          {/* Eucalyptus Leaf Branch (Natural position behind candle) */}
          <div className="absolute right-12 sm:right-16 bottom-8 w-56 sm:w-64 h-44 pointer-events-none">
            <svg viewBox="0 0 240 180" className="w-full h-full">
              <path d="M210,130 Q140,85 80,95 Q40,105 10,120" stroke="#2c4233" strokeWidth="2.5" fill="none" />
              <path d="M140,85 Q110,60 70,55" stroke="#2c4233" strokeWidth="2" fill="none" />
              <path d="M90,92 Q60,115 30,135" stroke="#2c4233" strokeWidth="1.8" fill="none" />

              {[
                { x: 30, y: 135, r: 15, rot: 15 },
                { x: 55, y: 118, r: 17, rot: -10 },
                { x: 80, y: 95, r: 19, rot: 25 },
                { x: 68, y: 55, r: 16, rot: -20 },
                { x: 100, y: 60, r: 18, rot: 30 },
                { x: 115, y: 88, r: 20, rot: -15 },
                { x: 145, y: 85, r: 21, rot: 20 },
                { x: 175, y: 110, r: 22, rot: -25 },
              ].map((leaf, i) => (
                <g key={i} transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.rot})`}>
                  <ellipse cx="0" cy="0" rx={leaf.r} ry={leaf.r * 0.68} fill="#183124" opacity="0.95" />
                  <ellipse cx="1" cy="-1" rx={leaf.r * 0.85} ry={leaf.r * 0.58} fill="#294e39" opacity="0.95" />
                  <ellipse cx="2" cy="-1.5" rx={leaf.r * 0.55} ry={leaf.r * 0.35} fill="#d4b56a" opacity="0.45" />
                  <line x1={-leaf.r * 0.5} y1="0" x2={leaf.r * 0.5} y2="0" stroke="#5d9670" strokeWidth="0.75" opacity="0.8" />
                  <line x1={-leaf.r * 0.3} y1={-leaf.r * 0.3} x2={leaf.r * 0.3} y2={leaf.r * 0.3} stroke="#5d9670" strokeWidth="0.6" opacity="0.6" />
                  <line x1={-leaf.r * 0.3} y1={leaf.r * 0.3} x2={leaf.r * 0.3} y2={-leaf.r * 0.3} stroke="#5d9670" strokeWidth="0.6" opacity="0.6" />
                </g>
              ))}
            </svg>
          </div>

          {/* Candle Container with Soft, Clean Centered Flickering Glow */}
          <div className="relative z-20 flex flex-col items-center mr-6 sm:mr-10 mb-2">
            
            {/* Flickering Ambient Warmth directly on Flame */}
            <div className="absolute -top-10 -left-6 -right-6 w-24 h-24 bg-[radial-gradient(circle,rgba(255,170,0,0.5)_0%,rgba(255,130,0,0.2)_50%,transparent_75%)] rounded-full blur-lg pointer-events-none animate-candle-glow" />

            {/* Candle Flame with realistic flicker & dance animation */}
            <div className="relative mb-[-2px] flex flex-col items-center animate-candle-flame">
              {/* Outer Golden Flame Body */}
              <div className="relative z-10 w-6 h-11 bg-gradient-to-t from-[#ff4400] via-[#ffaa00] to-[#fffde0] rounded-[50%_50%_35%_35%] blur-[0.4px] shadow-[0_0_20px_#ff9900]" />
              
              {/* Inner Hot Blue-White Core */}
              <div className="absolute bottom-1 z-20 w-2.5 h-4 bg-gradient-to-t from-[#2a66ff] via-[#ffffff] to-[#ffffff] rounded-[50%_50%_40%_40%]" />
              
              {/* Wick */}
              <div className="w-0.5 h-1.5 bg-[#111111] mt-[-1px] relative z-10" />
            </div>

            {/* Rounded Ceramic Cup (Clean Matte Dark Frame) */}
            <div className="w-20 sm:w-22 h-20 sm:h-22 bg-[#161a18] rounded-xl border border-[#2c332e] shadow-[-10px_15px_30px_rgba(0,0,0,0.95)] relative overflow-hidden flex flex-col justify-start p-1.5">
              
              {/* Glowing Wax Pool */}
              <div className="w-full h-3.5 bg-gradient-to-r from-[#242b27] via-[#f0d694] to-[#1c221e] rounded-full border border-black/60 shadow-inner flex items-center justify-center">
                <div className="w-4/5 h-2 bg-gradient-to-r from-[#ebd69b] via-[#ffffff] to-[#dfc480] rounded-full blur-[0.3px]" />
              </div>

              {/* Surface Reflection */}
              <div className="absolute top-4 left-2 bottom-2 w-2 bg-gradient-to-r from-white/10 to-transparent rounded-full pointer-events-none" />
            </div>

            {/* Shadow under base */}
            <div className="w-22 h-2.5 bg-black/90 blur-sm rounded-full -mt-0.5" />
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* CENTER: Main Typography & Button */}
      {/* ========================================================= */}
      <div className="container-custom relative z-20 text-center px-4 py-16 sm:py-20 max-w-[850px] mx-auto space-y-5">
        <span className="text-[11px] sm:text-xs tracking-[0.32em] text-[#d4b56a] font-bold uppercase block">
          LIMITED TIME OFFER
        </span>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight text-[#f2eee3] leading-[1.05] drop-shadow-md">
          Get -30% purchase on <br />
          order over £299.00
        </h2>

        <div className="pt-3">
          <a
            href="#bestsellers"
            className="min-h-[46px] px-9 bg-[#2c7650] hover:bg-[#37865d] text-white text-[11px] font-bold tracking-[0.14em] uppercase inline-flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-xl shadow-black/70 hover:shadow-[#2c7650]/40"
          >
            EXPLORE NOW <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
}
