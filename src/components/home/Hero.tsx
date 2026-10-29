"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  Plane,
  Headphones,
  MapPin,
  Calendar,
  Clock,
  Search,
  ArrowRight,
  RotateCcw,
  FileCheck2,
  Award,
  ChevronDown,
} from "lucide-react";
import { ArchLogo } from "@/components/common/ArchLogo";

export function Hero() {
  const router = useRouter();
  const [city, setCity] = React.useState("Mumbai");
  const [month, setMonth] = React.useState("November 2026");
  const [duration, setDuration] = React.useState("Any Duration");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city && city !== "All Indian Cities") params.set("city", city);
    if (month && month !== "Any Month") params.set("month", month);
    if (duration && duration !== "Any Duration") params.set("duration", duration);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative bg-[#FAF7F2] pt-6 pb-20 sm:pt-10 sm:pb-24 lg:pt-12 lg:pb-28 overflow-hidden select-none">
      {/* Background Architectural Watermark / Arch on top left */}
      <div className="absolute top-2 left-6 pointer-events-none opacity-20 hidden md:block">
        <svg width="220" height="320" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 150 L10 60 C10 30 30 10 50 10 C70 10 90 30 90 60 L90 150"
            stroke="#C59A4E"
            strokeWidth="1.2"
          />
          <path
            d="M20 150 L20 65 C20 40 34 22 50 22 C66 22 80 40 80 65 L80 150"
            stroke="#C59A4E"
            strokeWidth="0.8"
          />
          <path
            d="M30 150 L30 70 C30 50 40 34 50 34 C60 34 70 50 70 70 L70 150"
            stroke="#C59A4E"
            strokeWidth="0.6"
          />
        </svg>
      </div>

      {/* Hero Right-Side Background Image with Kaaba & Clock Tower */}
      <div className="absolute top-0 right-0 w-full lg:w-[58%] xl:w-[55%] h-full pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src="/images/hero_exact_makkah.jpg"
            alt="Makkah Royal Clock Tower and Holy Kaaba with Pilgrims"
            className="w-full h-full object-cover object-[center_28%] lg:object-[35%_25%]"
          />

          {/* Smooth left gradient fade into the cream backdrop */}
          <div className="absolute inset-y-0 left-0 w-32 sm:w-64 lg:w-96 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent" />

          {/* Top subtle gradient */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF7F2]/90 to-transparent" />

          {/* Bottom gradient fade so the floating search bar sits gracefully */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent" />

          {/* Mobile responsive overlay for high text legibility on small screens */}
          <div className="absolute inset-0 bg-[#FAF7F2]/85 lg:hidden" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content Grid: Left Text Copy & Right Open Visual Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[360px] lg:min-h-[420px]">
          {/* Left Column: Headlines & Subheading & Badges */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 pt-2">
            {/* Top Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-7 h-[1px] bg-[#C59A4E]" />
              <span className="text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-[0.24em] text-[#8C7A58]">
                BESPOKE PILGRIMAGE & SACRED HOSPITALITY
              </span>
              <span className="w-7 h-[1px] bg-[#C59A4E]" />
            </div>

            {/* Headline matching user request */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-bold text-[#152F26] leading-[1.12] tracking-tight">
              Your Sacred Journey, <br />
              <span className="font-display italic font-normal text-[#C59A4E]">
                Beautifully Arranged.
              </span>
            </h1>

            {/* Subheading reflecting luxury hospitality & spiritual simplicity */}
            <p className="text-sm sm:text-[15px] text-[#636C66] max-w-lg leading-relaxed font-normal">
              Curated packages, hand-selected luxury hotels within walking distance of the Haram, dedicated private concierge, and seamless visa processing.
            </p>

            {/* 4 Feature Badges Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {/* Badge 1 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB]/60 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#152F26]" />
                </div>
                <div className="text-[12px] font-semibold text-[#1F2B24] leading-tight">
                  Verified <br /> Packages
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB]/60 shadow-2xs">
                  <Building2 className="w-4 h-4 text-[#152F26]" />
                </div>
                <div className="text-[12px] font-semibold text-[#1F2B24] leading-tight">
                  Trusted <br /> Hotels Near Haram
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB]/60 shadow-2xs">
                  <Plane className="w-4 h-4 text-[#152F26]" />
                </div>
                <div className="text-[12px] font-semibold text-[#1F2B24] leading-tight">
                  Flight + Visa <br /> Assistance
                </div>
              </div>

              {/* Badge 4 */}
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB]/60 shadow-2xs">
                  <Headphones className="w-4 h-4 text-[#152F26]" />
                </div>
                <div className="text-[12px] font-semibold text-[#1F2B24] leading-tight">
                  24/7 <br /> Support
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Spacer (Leaves Kaaba & Clock Tower in clear, unboxed view) */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />
        </div>

        {/* Floating Search Bar ("Plan Your Umrah") — Pixel-Perfect match to reference design */}
        <div className="mt-8 sm:mt-12 relative z-20 max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-[#ECE7DC] shadow-[0_16px_45px_rgba(20,46,37,0.08)] p-5 sm:p-7">
            {/* Header label inside card */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <ArchLogo size={28} className="shrink-0" />
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#152F26]">
                  Plan Your Umrah
                </h2>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.25em] font-semibold text-[#8B938D] uppercase">
                <span className="w-8 h-[1px] bg-[#C59A4E]/40" />
                <span>• SAFE</span>
                <span>• • TRUSTED</span>
              </div>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center"
            >
              {/* Field 1: Departure City */}
              <div className="flex-1 min-w-0 rounded-2xl border border-[#E5E0D6] bg-white px-4 py-2.5 hover:border-[#C59A4E]/70 transition-colors">
                <label className="text-[11px] font-medium text-[#7A857E] flex items-center gap-1.5 cursor-pointer mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7A857E]" />
                  <span>Departure City</span>
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#152F26] focus:outline-none cursor-pointer appearance-none pr-6 py-0.5"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Calicut">Calicut / Kochi</option>
                    <option value="Lucknow">Lucknow</option>
                    <option value="All Indian Cities">All Indian Cities</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7A857E] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Field 2: Travel Month */}
              <div className="flex-1 min-w-0 rounded-2xl border border-[#E5E0D6] bg-white px-4 py-2.5 hover:border-[#C59A4E]/70 transition-colors">
                <label className="text-[11px] font-medium text-[#7A857E] flex items-center gap-1.5 cursor-pointer mb-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#7A857E]" />
                  <span>Travel Month</span>
                </label>
                <div className="relative">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#152F26] focus:outline-none cursor-pointer appearance-none pr-6 py-0.5"
                  >
                    <option value="November 2026">November 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="January 2027">January 2027</option>
                    <option value="February 2027">February 2027</option>
                    <option value="March 2027">March 2027 (Ramadan)</option>
                    <option value="Any Month">Any Month</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7A857E] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Field 3: Duration */}
              <div className="flex-1 min-w-0 rounded-2xl border border-[#E5E0D6] bg-white px-4 py-2.5 hover:border-[#C59A4E]/70 transition-colors">
                <label className="text-[11px] font-medium text-[#7A857E] flex items-center gap-1.5 cursor-pointer mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-[#7A857E]" />
                  <span>Duration</span>
                </label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#152F26] focus:outline-none cursor-pointer appearance-none pr-6 py-0.5"
                  >
                    <option value="Any Duration">Any Duration</option>
                    <option value="10 Days">10 Days / 9 Nights</option>
                    <option value="15 Days">15 Days / 14 Nights</option>
                    <option value="20+ Days">20+ Days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#7A857E] pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-2 lg:col-span-1 lg:shrink-0">
                <button
                  type="submit"
                  className="w-full lg:w-auto h-[52px] rounded-2xl bg-[#152F26] hover:bg-[#1E4337] active:scale-[0.98] text-white font-semibold text-sm sm:text-[14px] px-6 sm:px-7 flex items-center justify-center gap-2.5 shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Search className="w-4 h-4 text-white shrink-0" />
                  <span className="whitespace-nowrap">Explore Umrah Packages</span>
                  <ArrowRight className="w-4 h-4 text-white shrink-0" />
                </button>
              </div>
            </form>
          </div>

          {/* Underneath Trust Badges Row (Exact match to reference design) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 mt-7 px-2">
            {/* 1. 100% Secure Booking */}
            <div className="flex items-center justify-start sm:justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#152F26] shrink-0" />
              <div className="text-xs font-semibold text-[#18261F] leading-tight">
                100% Secure <br /> Booking
              </div>
            </div>

            {/* 2. Best Price Guarantee */}
            <div className="flex items-center justify-start sm:justify-center gap-3">
              <Award className="w-5 h-5 text-[#152F26] shrink-0" />
              <div className="text-xs font-semibold text-[#18261F] leading-tight">
                Best Price <br /> Guarantee
              </div>
            </div>

            {/* 3. Easy Visa Process */}
            <div className="flex items-center justify-start sm:justify-center gap-3">
              <FileCheck2 className="w-5 h-5 text-[#152F26] shrink-0" />
              <div className="text-xs font-semibold text-[#18261F] leading-tight">
                Easy Visa <br /> Process
              </div>
            </div>

            {/* 4. Flexible Cancellation */}
            <div className="flex items-center justify-start sm:justify-center gap-3">
              <RotateCcw className="w-5 h-5 text-[#152F26] shrink-0" />
              <div className="text-xs font-semibold text-[#18261F] leading-tight">
                Flexible <br /> Cancellation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave & Golden Arch Crest at the Bottom Transition */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none z-10 overflow-hidden leading-none">
        {/* Golden Arch Emblem right at the center dip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <ArchLogo size={32} />
        </div>

        {/* Bottom Curved Wave Container */}
        <svg
          viewBox="0 0 1440 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 object-cover"
          preserveAspectRatio="none"
        >
          {/* Golden stroke along the wave */}
          <path
            d="M0,45 C320,85 580,5 720,20 C860,35 1120,85 1440,45"
            stroke="#C59A4E"
            strokeWidth="2.2"
            fill="none"
            opacity="0.8"
          />
          {/* Deep Forest Green Fill */}
          <path
            d="M0,48 C320,88 580,8 720,23 C860,38 1120,88 1440,48 L1440,85 L0,85 Z"
            fill="#152F26"
          />
        </svg>
      </div>

      {/* Bottom Corner Foliage Accents for Cinematic Natural Framing */}
      {/* Bottom Left Foliage */}
      <div className="absolute -bottom-6 -left-6 pointer-events-none opacity-40 z-20 hidden md:block">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 100 C30 80 50 60 70 30 C75 22 82 10 90 0 C60 20 40 45 20 70 Z"
            fill="#152F26"
          />
          <path
            d="M10 100 C35 75 60 65 85 45 C70 55 45 75 25 95 Z"
            fill="#1E4337"
          />
        </svg>
      </div>

      {/* Bottom Right Foliage */}
      <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-40 z-20 hidden md:block">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 100 C70 80 50 60 30 30 C25 22 18 10 10 0 C40 20 60 45 80 70 Z"
            fill="#152F26"
          />
          <path
            d="M90 100 C65 75 40 65 15 45 C30 55 55 75 75 95 Z"
            fill="#1E4337"
          />
        </svg>
      </div>
    </section>
  );
}
