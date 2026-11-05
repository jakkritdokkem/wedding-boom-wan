'use client';

import React from 'react';

interface FabricDrapeDividerProps {
  flip?: boolean;
  fillTop?: string;
  fillBottom?: string;
  className?: string;
}

export function FabricDrapeDivider({
  flip = false,
  className = '',
}: FabricDrapeDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none my-[-1px] ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-12 sm:h-20 md:h-24 preserve-3d"
        preserveAspectRatio="none"
      >
        {/* Back Sage Linen Fold (Solid Opaque) */}
        <path
          d="M0 25C240 95 480 -15 720 45C960 105 1200 10 1440 65V130H0V25Z"
          fill="#E4E9DC"
        />
        {/* Middle Warm Linen Silk Fold (Solid Opaque) */}
        <path
          d="M0 55C310 -10 610 115 940 45C1180 -5 1320 70 1440 40V130H0V55Z"
          fill="#F4F1EA"
        />
        {/* Front Pure Ivory Draped Edge (Solid Opaque) */}
        <path
          d="M0 80C360 125 680 25 1060 85C1240 112 1360 75 1440 60V130H0V80Z"
          fill="#FBFAF7"
        />
        {/* Delicate Olive Silk Thread Line following the drape */}
        <path
          d="M0 55C310 -10 610 115 940 45C1180 -5 1320 70 1440 40"
          stroke="#C9CEB8"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeOpacity="0.65"
        />
      </svg>
    </div>
  );
}

export function BotanicalFlourish() {
  return (
    <div className="flex items-center justify-center gap-3 my-3 select-none pointer-events-none" aria-hidden="true">
      <svg width="70" height="18" viewBox="0 0 70 18" fill="none" className="text-[#66754e]/60">
        <path
          d="M68 9C52 9 42 2 24 9C12 13.5 4 9 1 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M46 6C42 2 36 3 34 6C38 8 43 8 46 6Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <path
          d="M26 11C22 15 16 14 14 11C18 9 23 9 26 11Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>
      <div className="w-2 h-2 rounded-full bg-[#66754e]/50 ring-4 ring-[#c9ceb8]/25" />
      <svg width="70" height="18" viewBox="0 0 70 18" fill="none" className="text-[#66754e]/60 scale-x-[-1]">
        <path
          d="M68 9C52 9 42 2 24 9C12 13.5 4 9 1 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M46 6C42 2 36 3 34 6C38 8 43 8 46 6Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <path
          d="M26 11C22 15 16 14 14 11C18 9 23 9 26 11Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>
    </div>
  );
}

