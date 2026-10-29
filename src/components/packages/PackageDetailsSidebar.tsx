"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Plane,
  ArrowRight,
  MessageSquare,
  Award,
  ShieldCheck,
  RotateCcw,
  FileCheck2,
  ChevronDown,
} from "lucide-react";
import type { PopulatedPackage } from "@/services/packages";

interface PackageDetailsSidebarProps {
  pkg: PopulatedPackage;
}

export function PackageDetailsSidebar({ pkg }: PackageDetailsSidebarProps) {
  const [city, setCity] = React.useState(pkg.departureCities?.[0] || "Mumbai");
  const [month, setMonth] = React.useState("November 2026");
  const [duration, setDuration] = React.useState("Any Duration");

  // Format base price in INR
  const formattedPrice = `₹${pkg.basePriceInr.toLocaleString("en-IN")}`;

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 self-start">
      {/* Card 1: Top Pricing & Availability Card matching design */}
      <div className="bg-white rounded-3xl border border-[#ECE7DC] p-6 shadow-sm space-y-5">
        {/* Category Pill */}
        <div>
          <span className="inline-block text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#EAE4D7] text-[#5A4D35] border border-[#DDD5C5]">
            {pkg.category || "Classic"} Package
          </span>
          <h2 className="font-display text-2xl font-bold text-[#152F26] mt-2">
            {pkg.name}
          </h2>
        </div>

        {/* 3 Key Stats Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-[#18261F]">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>{pkg.makkahNights} Nights Makkah</span>
          </div>
          <span className="text-[#C59A4E]">•</span>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>{pkg.madinahNights} Nights Madinah</span>
          </div>
          <span className="text-[#C59A4E]">•</span>
          <div className="flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-[#C59A4E]" />
            <span>Flights + Visa Assistance</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="pt-2 border-t border-[#ECE7DC]">
          <span className="text-xs font-medium text-[#7D8881]">From</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#152F26]">
              {formattedPrice}
            </span>
            <span className="text-xs text-[#7D8881] font-medium">per person</span>
          </div>
          <p className="text-[11px] text-[#8C9690] mt-1">
            (Price may vary based on season and availability)
          </p>
        </div>

        {/* Primary CTA Button */}
        <Link href={`/booking/${pkg.id}`} className="block">
          <button className="w-full h-[52px] rounded-2xl bg-[#103D32] hover:bg-[#1F5446] active:scale-[0.98] text-white font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2.5 shadow-sm transition-all duration-200 cursor-pointer">
            <span>Book This Package</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </Link>
      </div>

      {/* Card 2: Choose Your Dates Card matching design */}
      <div className="bg-white rounded-3xl border border-[#ECE7DC] p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#152F26]">
          <Calendar className="w-4 h-4 text-[#C59A4E]" />
          <h3 className="font-bold text-sm text-[#152F26]">Choose Your Dates</h3>
        </div>

        <div className="space-y-3">
          {/* Departure City */}
          <div className="rounded-2xl border border-[#E5E0D6] bg-white px-4 py-2 hover:border-[#C59A4E]/70 transition-colors">
            <label className="text-[10.5px] font-medium text-[#7A857E] block mb-0.5">
              Departure City
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

          {/* Travel Month */}
          <div className="rounded-2xl border border-[#E5E0D6] bg-white px-4 py-2 hover:border-[#C59A4E]/70 transition-colors">
            <label className="text-[10.5px] font-medium text-[#7A857E] block mb-0.5">
              Travel Month
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

          {/* Duration */}
          <div className="rounded-2xl border border-[#E5E0D6] bg-white px-4 py-2 hover:border-[#C59A4E]/70 transition-colors">
            <label className="text-[10.5px] font-medium text-[#7A857E] block mb-0.5">
              Duration
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
        </div>

        {/* Custom Quote Button */}
        <Link href={`/contact?package=${encodeURIComponent(pkg.name)}`} className="block pt-1">
          <button className="w-full h-[46px] rounded-2xl border border-[#152F26] text-[#152F26] hover:bg-[#152F26]/5 active:scale-[0.98] font-semibold text-xs sm:text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer">
            <MessageSquare className="w-4 h-4 text-[#152F26]" />
            <span>Get Custom Quote</span>
          </button>
        </Link>
      </div>

      {/* Card 3: Need Help? Card matching design */}
      <div className="bg-[#F4EFE6] rounded-3xl p-5 border border-[#E6E0D2] space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EADEC9] flex items-center justify-center text-[#152F26] shrink-0 border border-[#DFCFB3]">
            <Award className="w-5 h-5 text-[#152F26]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#152F26]">Need Help?</h4>
            <p className="text-xs text-[#707B74] leading-tight mt-0.5">
              Our travel experts are here to assist you with any questions.
            </p>
          </div>
        </div>

        <Link href="/contact" className="block">
          <button className="w-full h-[42px] rounded-xl bg-white border border-[#DDD5C5] hover:bg-neutral-50 active:scale-[0.98] text-xs font-semibold text-[#152F26] flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer">
            <MessageSquare className="w-3.5 h-3.5 text-[#152F26]" />
            <span>Chat with Us</span>
          </button>
        </Link>
      </div>

      {/* 4 Trust Badges underneath sidebar */}
      <div className="grid grid-cols-4 gap-2 pt-2 px-1 text-center">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#152F26]" />
          <span className="text-[10px] font-semibold text-[#556059] leading-tight">
            100% Secure <br /> Booking
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Award className="w-4 h-4 text-[#152F26]" />
          <span className="text-[10px] font-semibold text-[#556059] leading-tight">
            Best Price <br /> Guarantee
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <FileCheck2 className="w-4 h-4 text-[#152F26]" />
          <span className="text-[10px] font-semibold text-[#556059] leading-tight">
            Easy Visa <br /> Process
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-[#152F26]" />
          <span className="text-[10px] font-semibold text-[#556059] leading-tight">
            Flexible <br /> Cancellation
          </span>
        </div>
      </div>
    </aside>
  );
}
