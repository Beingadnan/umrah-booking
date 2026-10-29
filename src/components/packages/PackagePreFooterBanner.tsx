import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchLogo } from "@/components/common/ArchLogo";

export function PackagePreFooterBanner() {
  return (
    <section className="relative bg-[#122A22] text-white py-14 overflow-hidden border-t border-[#1C3D32]">
      {/* Decorative Minarets and Domes Silhouette on the right edge */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 hidden md:block">
        <svg width="420" height="140" viewBox="0 0 500 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Minaret 1 */}
          <path d="M420 160 L420 30 L425 25 L430 30 L430 160 Z" fill="#C59A4E" />
          <circle cx="425" cy="22" r="3" fill="#C59A4E" />
          {/* Minaret 2 */}
          <path d="M470 160 L470 45 L474 40 L478 45 L478 160 Z" fill="#C59A4E" />
          <circle cx="474" cy="37" r="2.5" fill="#C59A4E" />
          {/* Main Dome */}
          <path d="M340 160 C340 100 370 70 390 70 C410 70 440 100 440 160 Z" fill="#C59A4E" opacity="0.6" />
          <path d="M390 70 L390 60" stroke="#C59A4E" strokeWidth="2" />
          <circle cx="390" cy="58" r="2" fill="#C59A4E" />
          {/* Secondary Dome */}
          <path d="M280 160 C280 120 300 95 315 95 C330 95 350 120 350 160 Z" fill="#C59A4E" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Ziyara Brand Logo */}
          <div className="flex items-center gap-3 self-center lg:self-auto">
            <ArchLogo size={42} variant="gold" />
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.06em] text-white uppercase">
                Ziyara
              </span>
              <span className="text-[7.5px] font-semibold tracking-[0.25em] text-[#C59A4E] uppercase">
                SACRED • JOURNEYS • CURATED
              </span>
            </div>
          </div>

          {/* Center: Headline & Subtitle */}
          <div className="text-center lg:text-left space-y-1 max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to Begin Your Umrah Journey?
            </h3>
            <p className="text-xs sm:text-sm text-[#D1DDD6] font-normal leading-relaxed">
              Get the best packages, trusted support and a seamless experience.
            </p>
          </div>

          {/* Right: Gold CTA Button */}
          <div className="shrink-0">
            <Link href="/packages">
              <button className="bg-[#DFBF7A] hover:bg-[#D4B36A] active:scale-[0.98] text-[#152F26] font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all duration-200 cursor-pointer">
                <span>Explore More Packages</span>
                <ArrowRight className="w-4 h-4 text-[#152F26]" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
