"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, RotateCcw, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PackageFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCity = searchParams.get("city") || "ALL";
  const currentCategory = searchParams.get("category") || "ALL";
  const currentDuration = searchParams.get("duration") || "ALL";
  const currentSort = searchParams.get("sortBy") || "popular";
  const flightsOnly = searchParams.get("flights") === "true";

  const [isOpenMobile, setIsOpenMobile] = React.useState(false);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/packages?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/packages");
  };

  return (
    <div>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="gap-2 text-xs"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#285B4D]" />
          <span>{isOpenMobile ? "Hide Filters" : "Filter Packages"}</span>
        </Button>

        <span className="text-xs text-[#707873]">
          Active: {currentCategory !== "ALL" ? currentCategory : "All Tiers"}
        </span>
      </div>

      <div
        className={`${
          isOpenMobile ? "block" : "hidden"
        } lg:block bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-6 shadow-xs sticky top-28`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E8E3]">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#123B32]" />
            <h3 className="text-sm font-bold text-[#123B32] uppercase tracking-wider">Filters</h3>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-[#707873] hover:text-[#123B32] flex items-center gap-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Departure City */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#123B32] uppercase tracking-wider">
            Departure Hub
          </label>
          <select
            value={currentCity}
            onChange={(e) => updateParam("city", e.target.value)}
            className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3 py-2 text-xs text-[#202824] font-medium focus:ring-1 focus:ring-[#123B32]"
          >
            <option value="ALL">All Indian Airports</option>
            <option value="Mumbai">Mumbai (BOM)</option>
            <option value="Delhi">Delhi (DEL)</option>
            <option value="Hyderabad">Hyderabad (HYD)</option>
            <option value="Bengaluru">Bengaluru (BLR)</option>
            <option value="Ahmedabad">Ahmedabad (AMD)</option>
            <option value="Calicut">Calicut / Kochi (CCJ)</option>
            <option value="Lucknow">Lucknow (LKO)</option>
          </select>
        </div>

        {/* Hotel & Package Tier */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#123B32] uppercase tracking-wider">
            Accommodation Tier
          </label>
          <div className="space-y-1.5">
            {[
              { id: "ALL", label: "All Categories" },
              { id: "VIP", label: "Executive VIP (Clock Tower / Oberoi)" },
              { id: "DELUXE", label: "Classic Deluxe (Walking 150m)" },
              { id: "ECONOMY", label: "Comfort Economy (24/7 Shuttle)" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateParam("category", cat.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  currentCategory === cat.id
                    ? "bg-[#123B32] text-white"
                    : "text-[#707873] hover:bg-[#FAF9F6] hover:text-[#202824]"
                }`}
              >
                <span>{cat.label}</span>
                {currentCategory === cat.id && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#123B32] uppercase tracking-wider">
            Trip Duration
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "ALL", label: "Any" },
              { id: "short", label: "7-10 Days" },
              { id: "classic", label: "14-15 Days" },
              { id: "long", label: "20+ Days" },
            ].map((dur) => (
              <button
                key={dur.id}
                onClick={() => updateParam("duration", dur.id)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                  currentDuration === dur.id
                    ? "bg-[#FAF9F6] border-[#123B32] text-[#123B32] font-bold"
                    : "border-[#E7E8E3] text-[#707873] hover:border-[#D5D7D1]"
                }`}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>

        {/* Direct Flights */}
        <div className="pt-2 border-t border-[#E7E8E3]">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-[#202824] font-medium">
            <input
              type="checkbox"
              checked={flightsOnly}
              onChange={(e) => updateParam("flights", e.target.checked ? "true" : "ALL")}
              className="rounded border-[#E7E8E3] text-[#123B32] focus:ring-[#123B32] h-4 w-4"
            />
            <span>Include Direct Flights Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
