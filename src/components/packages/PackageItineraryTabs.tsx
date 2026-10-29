"use client";

import * as React from "react";
import {
  Plane,
  Building2,
  Footprints,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  Utensils,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import type { PopulatedPackage } from "@/services/packages";

interface PackageItineraryTabsProps {
  pkg: PopulatedPackage;
}

export function PackageItineraryTabs({ pkg }: PackageItineraryTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"itinerary" | "hotels" | "inclusions" | "exclusions">("itinerary");

  // Format steps for Day-by-Day timeline matching design
  const defaultSteps = [
    {
      badge: "1",
      title: "Departure from Your City",
      description: `Fly from your selected departure city (${pkg.departureCities?.[0] || "Mumbai"}) to Jeddah. Complete immigration and transfer to Makkah hotel.`,
      location: "Jeddah → Makkah",
      icon: Plane,
    },
    {
      badge: `2-${pkg.makkahNights}`,
      title: "Makkah Stay",
      description: `Perform Umrah with our experienced guide, visit Masjid al-Haram for daily prayers, and explore the holy sites of Makkah (Ziyarat).`,
      location: "Makkah",
      icon: Building2,
    },
    {
      badge: `${pkg.makkahNights + 1}-${pkg.durationDays - 1}`,
      title: "Madinah Stay",
      description: `Travel to Madinah via the high-speed Haramain Bullet Train, visit Masjid an-Nabawi, greet the Prophet (PBUH) at the Rawdah, and explore the blessed city.`,
      location: "Madinah",
      icon: Building2,
    },
    {
      badge: `${pkg.durationDays}`,
      title: "Return Journey",
      description: "Transfer to Jeddah Airport for your return flight home, carrying Zamzam and cherished memories of your blessed pilgrimage.",
      location: "Jeddah",
      icon: Plane,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#152F26]">
          Itinerary
        </h2>

        {/* Segmented Pill Tabs matching design */}
        <div className="inline-flex items-center bg-[#F1ECE1] p-1 rounded-full border border-[#E3DDD0] max-w-fit">
          <button
            onClick={() => setActiveTab("itinerary")}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === "itinerary"
                ? "bg-[#152F26] text-white shadow-xs"
                : "text-[#556059] hover:text-[#152F26]"
            }`}
          >
            Day by Day
          </button>
          <button
            onClick={() => setActiveTab("hotels")}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === "hotels"
                ? "bg-[#152F26] text-white shadow-xs"
                : "text-[#556059] hover:text-[#152F26]"
            }`}
          >
            Hotels
          </button>
          <button
            onClick={() => setActiveTab("inclusions")}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === "inclusions"
                ? "bg-[#152F26] text-white shadow-xs"
                : "text-[#556059] hover:text-[#152F26]"
            }`}
          >
            Inclusions
          </button>
          <button
            onClick={() => setActiveTab("exclusions")}
            className={`px-4 sm:px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeTab === "exclusions"
                ? "bg-[#152F26] text-white shadow-xs"
                : "text-[#556059] hover:text-[#152F26]"
            }`}
          >
            Exclusions
          </button>
        </div>
      </div>

      {/* Tab 1: Day by Day Timeline */}
      {activeTab === "itinerary" && (
        <div className="space-y-4 pt-2">
          {defaultSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#ECE7DC] p-5 sm:p-6 shadow-2xs hover:border-[#C59A4E]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Number Badge + Content */}
                <div className="flex items-start sm:items-center gap-4">
                  {/* Circular Step Badge matching design */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#152F26] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-xs">
                    {step.badge}
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display text-base sm:text-lg font-bold text-[#152F26]">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66726B] leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Right Location Badge matching design */}
                <div className="flex items-center gap-2 self-start sm:self-center bg-[#FAF7F2] border border-[#E9E3D5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#152F26] shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#C59A4E]" />
                  <span>{step.location}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Hotels with Verified Walking Proximity */}
      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Makkah Hotel Card */}
          <div className="bg-white rounded-3xl border border-[#ECE7DC] p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#152F26]">
                Makkah ({pkg.makkahNights} Nights)
              </span>
              <span className="text-[11px] font-semibold text-[#152F26] bg-[#FAF7F2] border border-[#C59A4E]/40 px-2.5 py-0.5 rounded-full">
                {pkg.makkahHotel?.starRating || 5}★ Luxury
              </span>
            </div>

            <div className="h-44 rounded-2xl overflow-hidden relative bg-[#EFE9DC]">
              <img
                src={pkg.makkahHotel?.imageUrl || "/images/makkah_clocktower_facade.jpg"}
                alt={pkg.makkahHotel?.name || "Makkah Hotel"}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-[#152F26]">
                {pkg.makkahHotel?.name || "Swissôtel Al Maqam Makkah"}
              </h3>
              <p className="text-xs text-[#707873] mt-0.5">
                {pkg.makkahHotel?.address || "Abraj Al Bait Complex, King Abdul Aziz Endowment"}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#ECE7DC] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#152F26]">
                <Footprints className="w-4 h-4 text-[#C59A4E]" />
                <span>{pkg.makkahHotel?.distanceMeters || 100} Meters to Haram Courtyard</span>
              </div>
              <p className="text-[11px] text-[#285B4D] font-medium">
                {pkg.makkahHotel?.distanceText || "Direct internal pedestrian access via the Clock Tower elevator"}
              </p>
            </div>
          </div>

          {/* Madinah Hotel Card */}
          <div className="bg-white rounded-3xl border border-[#ECE7DC] p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#152F26]">
                Madinah ({pkg.madinahNights} Nights)
              </span>
              <span className="text-[11px] font-semibold text-[#152F26] bg-[#FAF7F2] border border-[#C59A4E]/40 px-2.5 py-0.5 rounded-full">
                {pkg.madinahHotel?.starRating || 5}★ Luxury
              </span>
            </div>

            <div className="h-44 rounded-2xl overflow-hidden relative bg-[#EFE9DC]">
              <img
                src={pkg.madinahHotel?.imageUrl || "/images/hotel_voco_lobby.jpg"}
                alt={pkg.madinahHotel?.name || "Madinah Hotel"}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-[#152F26]">
                {pkg.madinahHotel?.name || "The Oberoi Madinah"}
              </h3>
              <p className="text-xs text-[#707873] mt-0.5">
                {pkg.madinahHotel?.address || "Northern Central Area, near Ladies Gate 25"}
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-[#ECE7DC] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#152F26]">
                <Footprints className="w-4 h-4 text-[#C59A4E]" />
                <span>{pkg.madinahHotel?.distanceMeters || 80} Meters to Prophet's Mosque</span>
              </div>
              <p className="text-[11px] text-[#285B4D] font-medium">
                {pkg.madinahHotel?.distanceText || "Under 2-minute flat marble stroll directly into the courtyard"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Itemized Inclusions */}
      {activeTab === "inclusions" && (
        <div className="bg-white rounded-3xl border border-[#ECE7DC] p-6 shadow-2xs space-y-4 pt-4">
          <p className="text-xs text-[#707873]">
            Every inclusion is guaranteed and audited by Ziyara. No hidden costs or agent markups.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {pkg.inclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EBE5D8]">
                <CheckCircle2 className="w-4 h-4 text-[#152F26] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#152F26]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Exclusions */}
      {activeTab === "exclusions" && (
        <div className="bg-white rounded-3xl border border-[#ECE7DC] p-6 shadow-2xs space-y-4 pt-4">
          <p className="text-xs text-[#707873]">
            Transparent disclosure of personal items and optional services not covered in the base tier.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {pkg.exclusions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EBE5D8]">
                <XCircle className="w-4 h-4 text-[#A84236] shrink-0 mt-0.5" />
                <span className="text-xs text-[#556059] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
