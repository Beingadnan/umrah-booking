"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Tag,
  Headphones,
  ShieldCheck,
  Plane,
  Calendar,
  Clock,
  Users,
  Search,
  ArrowRight,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

export function PackagesHero() {
  const router = useRouter();
  const [city, setCity] = React.useState("Mumbai");
  const [month, setMonth] = React.useState("November 2026");
  const [duration, setDuration] = React.useState("all");
  const [travellers, setTravellers] = React.useState("2 Adults");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city && city !== "All Cities") params.set("city", city);
    if (month && month !== "Any Month") params.set("month", month);
    if (duration && duration !== "all") params.set("duration", duration);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative bg-white pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12 overflow-hidden flex flex-col justify-center lg:min-h-[calc(100vh-68px)] lg:max-h-[850px] border-b border-[#E8ECE9]">
      {/* Right-Side Full-Bleed Background Image (Unboxed, Seamless Blend into white) */}
      <div className="absolute top-0 right-0 w-full lg:w-[48%] xl:w-[46%] h-full pointer-events-none select-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src="/images/hero_kaaba_clocktower.jpg"
            alt="Holy Kaaba and Makkah Royal Clock Tower with Pilgrims"
            className="w-full h-full object-cover object-[center_top] lg:object-[22%_top]"
          />
          {/* Soft atmospheric gradient fade on the left edge into the white background */}
          <div className="absolute inset-y-0 left-0 w-28 sm:w-44 lg:w-56 bg-gradient-to-r from-white via-white/80 to-transparent" />
          
          {/* Bottom gradient fade so the floating search bar sits gracefully */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/60 to-transparent" />
          
          {/* Subtle mobile overlay so text is 100% legible on small viewports */}
          <div className="absolute inset-0 bg-white/85 lg:hidden" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Grid: Left Text & Right Kaaba Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center min-h-[260px] lg:min-h-[290px] relative">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 z-10 pt-1">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#C6A66B]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#A27B3A]">
                PLAN YOUR BLESSED JOURNEY
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-bold text-[#123B32] tracking-tight leading-[1.14] font-display">
              Umrah Packages <br />
              <span className="text-[#C6A66B] italic font-normal">for Every Pilgrim</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-[#68726C] max-w-lg leading-relaxed">
              Choose from our carefully curated Umrah packages with best-in-class hotels, reliable flights and complete support — so you can focus on what truly matters.
            </p>

            {/* 4 Feature Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                  <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#123B32]" />
                </div>
                <span className="text-[11px] font-semibold text-[#202824] leading-tight">
                  Trusted <br /> Travel Partners
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                  <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#123B32]" />
                </div>
                <span className="text-[11px] font-semibold text-[#202824] leading-tight">
                  Transparent <br /> Pricing
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                  <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#123B32]" />
                </div>
                <span className="text-[11px] font-semibold text-[#202824] leading-tight">
                  24/7 <br /> Support
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#123B32]" />
                </div>
                <span className="text-[11px] font-semibold text-[#202824] leading-tight">
                  Easy Visa <br /> Assistance
                </span>
              </div>
            </div>
          </div>

          {/* Right Spacer (Unboxed layout - Kaaba & Clock Tower show cleanly in full view) */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
        </div>

        {/* Floating Search Bar — Clean 5-column layout */}
        <div className="mt-5 sm:mt-6 relative z-20 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-5 sm:p-6">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 items-end">
              {/* Departure City */}
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-gray-500 flex items-center gap-1.5 cursor-pointer">
                  <Plane className="w-3.5 h-3.5 text-gray-400" />
                  <span>Departure City</span>
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#111827] focus:outline-none cursor-pointer appearance-none pr-6 py-1"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Calicut">Calicut / Kochi</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="All Cities">All Indian Cities</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Travel Month */}
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-gray-500 flex items-center gap-1.5 cursor-pointer">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Travel Month</span>
                </label>
                <div className="relative">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#111827] focus:outline-none cursor-pointer appearance-none pr-6 py-1"
                  >
                    <option value="November 2026">November 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="January 2027">January 2027</option>
                    <option value="February 2027">February 2027</option>
                    <option value="March 2027 (Ramadan)">March 2027 (Ramadan)</option>
                    <option value="Any Month">Any Month</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-gray-500 flex items-center gap-1.5 cursor-pointer">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Duration</span>
                </label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#111827] focus:outline-none cursor-pointer appearance-none pr-6 py-1"
                  >
                    <option value="all">Any Duration</option>
                    <option value="short">7 - 10 Days</option>
                    <option value="classic">12 - 14 Days</option>
                    <option value="long">15+ Days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Travellers */}
              <div className="space-y-1.5">
                <label className="text-xs font-normal text-gray-500 flex items-center gap-1.5 cursor-pointer">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span>Travellers</span>
                </label>
                <div className="relative">
                  <select
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#111827] focus:outline-none cursor-pointer appearance-none pr-6 py-1"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="3 Adults">3 Adults</option>
                    <option value="4 Adults">4 Adults (Family)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-[46px] rounded-xl bg-[#123B32] hover:bg-[#1a4a40] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-all duration-200 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-white" />
                  <span>Search Packages</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>

          {/* Underneath Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-5 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#285B4D]" />
              </div>
              <div className="text-left leading-tight">
                <span className="font-bold text-[#202824] block text-[11px]">Visa Included</span>
                <span className="text-[10px] text-[#707873]">(In selected packages)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                <Plane className="w-3.5 h-3.5 text-[#285B4D]" />
              </div>
              <div className="text-left leading-tight">
                <span className="font-bold text-[#202824] block text-[11px]">Flights Included</span>
                <span className="text-[10px] text-[#707873]">(In selected packages)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                <Building2 className="w-3.5 h-3.5 text-[#285B4D]" />
              </div>
              <div className="text-left leading-tight">
                <span className="font-bold text-[#202824] block text-[11px]">Best Hotels</span>
                <span className="text-[10px] text-[#707873]">Near Haram</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#123B32]/8 flex items-center justify-center text-[#123B32] shrink-0">
                <RotateCcw className="w-3.5 h-3.5 text-[#285B4D]" />
              </div>
              <div className="text-left leading-tight">
                <span className="font-bold text-[#202824] block text-[11px]">Flexible Cancellation</span>
                <span className="text-[10px] text-[#707873]">(terms apply)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
