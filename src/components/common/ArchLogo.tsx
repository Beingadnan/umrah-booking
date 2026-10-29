import * as React from "react";
import Image from "next/image";

interface ArchLogoProps {
  className?: string;
  size?: number;
  variant?: "gold" | "white" | "dark";
}

/**
 * Bespoke architectural arch with subtle crescent for Ziyara.
 * Inspired by luxury Islamic sanctuary portals with geometric ribbed dome,
 * cusped archway, and crescent finial.
 */
export function ArchLogo({ className = "", size = 40, variant = "gold" }: ArchLogoProps) {
  const strokeColor =
    variant === "white"
      ? "#FFFFFF"
      : variant === "dark"
      ? "#152F26"
      : "url(#ziyaraGoldGradient)";

  const fillAccent =
    variant === "white"
      ? "#FFFFFF"
      : variant === "dark"
      ? "#152F26"
      : "#C59A4E";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ziyaraGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBF7A" />
          <stop offset="45%" stopColor="#C59A4E" />
          <stop offset="100%" stopColor="#9C752F" />
        </linearGradient>
      </defs>

      {/* Crescent Finial on Spire */}
      <path
        d="M32 3 C30.8 4.2 30.8 6.2 32 7.4 C33.2 6.2 33.2 4.2 32 3 Z"
        fill={fillAccent}
      />
      <circle cx="32" cy="5.2" r="1.1" fill={fillAccent} />
      <path
        d="M32 7.5 L32 10.5"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Ribbed Cupola / Dome Roof */}
      <path
        d="M24 22 C24 14.5 28 10.5 32 10.5 C36 10.5 40 14.5 40 22"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M27 22 C27 16 29.5 12 32 10.5"
        stroke={strokeColor}
        strokeWidth="1.1"
      />
      <path
        d="M37 22 C37 16 34.5 12 32 10.5"
        stroke={strokeColor}
        strokeWidth="1.1"
      />

      {/* Outer Stepped Arch Portal */}
      <path
        d="M19 55 L19 28 C19 19 25 14 32 14 C39 14 45 19 45 28 L45 55"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Pointed Cusped Archway */}
      <path
        d="M23.5 55 L23.5 31 C23.5 23 27.5 18 32 18 C36.5 18 40.5 23 40.5 31 L40.5 55"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Innermost Architectural Sanctuary Arch */}
      <path
        d="M28 55 L28 34 C28 28 29.8 23 32 23 C34.2 23 36 28 36 34 L36 55"
        stroke={strokeColor}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Stepped Column Plinth */}
      <path
        d="M17 55 L21 55"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Right Stepped Column Plinth */}
      <path
        d="M43 55 L47 55"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Base Foundation Bar */}
      <path
        d="M15 55 L49 55"
        stroke={strokeColor}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Brand Logo component featuring Ziyara's luxury hospitality identity
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Arch Emblem */}
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <ArchLogo size={40} className="shrink-0" />
      </div>

      {/* Brand Typography: Luxury Serif paired with refined tracking */}
      <div className="flex flex-col justify-center">
        <div className="font-display text-[22px] sm:text-[23px] font-bold tracking-[0.06em] text-[#152F26] leading-none uppercase">
          Ziyara
        </div>
        <div className="text-[7.5px] sm:text-[8px] font-semibold tracking-[0.24em] uppercase text-[#7D8881] mt-1 flex items-center gap-1.5">
          <span>SACRED</span>
          <span className="text-[#C59A4E]">•</span>
          <span>JOURNEYS</span>
          <span className="text-[#C59A4E]">•</span>
          <span>CURATED</span>
        </div>
      </div>
    </div>
  );
}
