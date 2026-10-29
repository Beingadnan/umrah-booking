"use client";

import * as React from "react";
import Link from "next/link";
import {
  Footprints,
  Building2,
  Star,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Search,
  Wifi,
  Coffee,
  Sparkles,
} from "lucide-react";
import type { SeedHotel } from "@/db/seed-data";
import type { PopulatedPackage } from "@/services/packages";

interface HotelsClientViewProps {
  hotels: SeedHotel[];
  packages: PopulatedPackage[];
}

export function HotelsClientView({ hotels, packages }: HotelsClientViewProps) {
  const [cityFilter, setCityFilter] = React.useState<"ALL" | "MAKKAH" | "MADINAH">("ALL");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredHotels = hotels.filter((hotel) => {
    const matchesCity = cityFilter === "ALL" || hotel.city === cityFilter;
    const matchesSearch =
      searchQuery === "" ||
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="py-10 sm:py-14">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A264]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A07D3E]">
              RADICAL PROXIMITY TRANSPARENCY
            </span>
            <span className="w-6 h-[1px] bg-[#C5A264]" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103D32] tracking-tight">
            Verified Hotels in Makkah & Madinah
          </h1>

          <p className="text-sm sm:text-base text-[#66726A] leading-relaxed">
            We physically measure the exact distance from each hotel lobby to the outer marble prayer courtyards. No misleading "close to Haram" claims — only audited meters and genuine pedestrian convenience.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-[#E8E0D0] shadow-2xs">
          {/* City Tabs */}
          <div className="inline-flex items-center bg-[#F8F3E8] p-1 rounded-xl border border-[#E8E0D0]">
            <button
              onClick={() => setCityFilter("ALL")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                cityFilter === "ALL"
                  ? "bg-[#103D32] text-white shadow-2xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              All Sanctuaries ({hotels.length})
            </button>
            <button
              onClick={() => setCityFilter("MAKKAH")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                cityFilter === "MAKKAH"
                  ? "bg-[#103D32] text-white shadow-2xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              Makkah al-Mukarramah
            </button>
            <button
              onClick={() => setCityFilter("MADINAH")}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                cityFilter === "MADINAH"
                  ? "bg-[#103D32] text-white shadow-2xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              Madinah al-Munawwarah
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#7A857E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by hotel name or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl pl-9 pr-4 py-2 text-xs text-[#18241E] focus:outline-none focus:border-[#C5A264]"
            />
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredHotels.map((hotel) => {
            // Find packages that use this hotel
            const matchingPackages = packages.filter(
              (p) => p.makkahHotelId === hotel.id || p.madinahHotelId === hotel.id
            );

            return (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl border border-[#E8E0D0] overflow-hidden shadow-2xs hover:shadow-md hover:border-[#C5A264]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo with badges */}
                  <div className="relative h-56 w-full bg-[#EDE6D6] overflow-hidden">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#103D32]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {hotel.city === "MAKKAH" ? "Makkah Haram" : "Madinah Nabawi"}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#103D32] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs">
                      <Star className="w-3.5 h-3.5 fill-[#C5A264] text-[#C5A264]" />
                      <span>{hotel.starRating} Star Luxury</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#103D32]">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-[#66726A] flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A264] shrink-0" />
                        <span className="truncate">{hotel.address}</span>
                      </p>
                    </div>

                    {/* Audited Walking Proximity Callout */}
                    <div className="bg-[#FAF6ED] p-3.5 rounded-2xl border border-[#E8E0D0] space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#103D32]">
                        <Footprints className="w-4 h-4 text-[#C5A264] shrink-0" />
                        <span>{hotel.distanceMeters} Meters to {hotel.city === "MAKKAH" ? "Haram Courtyard" : "Prophet's Mosque"}</span>
                      </div>
                      <p className="text-[11px] text-[#1F5446] font-medium pl-6">
                        {hotel.distanceText}
                      </p>
                    </div>

                    {/* Verified Hotel Features */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-[#103D32] bg-[#F8F3E8] border border-[#E8E0D0] px-2.5 py-1 rounded-lg">
                        {hotel.distanceType === "WALKING" ? "Direct Walking Access" : "24/7 AC Shuttle Bus"}
                      </span>
                      <span className="text-[10px] font-semibold text-[#556059] bg-[#F8F3E8] border border-[#E8E0D0] px-2.5 py-1 rounded-lg">
                        {hotel.starRating >= 5 ? "5-Star Luxury" : "4-Star Premium"}
                      </span>
                      <span className="text-[10px] font-semibold text-[#556059] bg-[#F8F3E8] border border-[#E8E0D0] px-2.5 py-1 rounded-lg">
                        Wheelchair Accessible
                      </span>
                      <span className="text-[10px] font-semibold text-[#556059] bg-[#F8F3E8] border border-[#E8E0D0] px-2.5 py-1 rounded-lg">
                        24/7 Concierge Desk
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer with package links */}
                <div className="p-6 pt-0 border-t border-[#F0EAE0] mt-4">
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#66726A]">
                      Included in {matchingPackages.length} package{matchingPackages.length === 1 ? "" : "s"}
                    </span>
                    {matchingPackages[0] ? (
                      <Link
                        href={`/packages/${matchingPackages[0].slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#103D32] hover:text-[#C5A264] transition-colors"
                      >
                        <span>View Package</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <Link
                        href="/packages"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#103D32] hover:text-[#C5A264] transition-colors"
                      >
                        <span>Browse Packages</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
