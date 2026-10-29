"use client";

import * as React from "react";
import Link from "next/link";
import {
  X,
  Check,
  Footprints,
  Plane,
  Building2,
  Calendar,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type { PopulatedPackage } from "@/services/packages";

interface PackageComparisonModalProps {
  packages: PopulatedPackage[];
  selectedSlugs: string[];
  onRemove: (slug: string) => void;
  onClose: () => void;
}

export function PackageComparisonModal({
  packages,
  selectedSlugs,
  onRemove,
  onClose,
}: PackageComparisonModalProps) {
  const selectedPackages = packages.filter((p) => selectedSlugs.includes(p.slug));

  if (selectedPackages.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#E8E0D0] shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#E8E0D0] flex items-center justify-between bg-[#F8F3E8]">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A264]">
              TRANSPARENT COMPARISON
            </span>
            <h3 className="font-display text-2xl font-bold text-[#103D32]">
              Compare Umrah Packages ({selectedPackages.length}/3)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#E8E0D0] hover:bg-neutral-100 flex items-center justify-center text-[#18241E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-x-auto flex-1">
          <div className="min-w-[650px] grid grid-cols-4 gap-4">
            {/* Feature labels column */}
            <div className="space-y-6 pt-28 text-xs font-semibold text-[#66726A]">
              <div className="h-10 flex items-center border-b border-[#F0EAE0]">Starting Price</div>
              <div className="h-10 flex items-center border-b border-[#F0EAE0]">Duration</div>
              <div className="h-14 flex items-center border-b border-[#F0EAE0]">Makkah Hotel & Haram Proximity</div>
              <div className="h-14 flex items-center border-b border-[#F0EAE0]">Madinah Hotel & Nabawi Proximity</div>
              <div className="h-10 flex items-center border-b border-[#F0EAE0]">Flights & Transfers</div>
              <div className="h-10 flex items-center border-b border-[#F0EAE0]">Visa & Insurance</div>
              <div className="h-10 flex items-center">Action</div>
            </div>

            {/* Compared Package Columns */}
            {selectedPackages.map((pkg) => (
              <div key={pkg.id} className="bg-[#FAF6ED] rounded-2xl p-4 border border-[#E8E0D0] space-y-6 relative flex flex-col justify-between">
                {/* Remove button */}
                <button
                  onClick={() => onRemove(pkg.slug)}
                  className="absolute top-2.5 right-2.5 text-[#66726A] hover:text-[#103D32] p-1 text-xs"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Package Head */}
                <div className="h-20 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A264] block">
                    {pkg.category} Tier
                  </span>
                  <h4 className="font-display text-base font-bold text-[#103D32] line-clamp-2">
                    {pkg.name}
                  </h4>
                </div>

                {/* Feature Rows */}
                <div className="space-y-6 text-xs text-[#18241E]">
                  {/* Price */}
                  <div className="h-10 flex items-center border-b border-[#E8E0D0]">
                    <span className="font-bold text-base text-[#103D32]">
                      ₹{pkg.basePriceInr.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-[#66726A] ml-1">/ person</span>
                  </div>

                  {/* Duration */}
                  <div className="h-10 flex items-center border-b border-[#E8E0D0]">
                    <span>{pkg.durationDays} Days / {pkg.durationNights} Nights</span>
                  </div>

                  {/* Makkah Proximity */}
                  <div className="h-14 flex flex-col justify-center border-b border-[#E8E0D0]">
                    <span className="font-semibold text-[#103D32] truncate">{pkg.makkahHotel?.name || "Swissôtel"}</span>
                    <span className="text-[11px] text-[#C5A264] font-bold flex items-center gap-1 mt-0.5">
                      <Footprints className="w-3.5 h-3.5" />
                      {pkg.makkahHotel?.distanceMeters || 100}m to Haram
                    </span>
                  </div>

                  {/* Madinah Proximity */}
                  <div className="h-14 flex flex-col justify-center border-b border-[#E8E0D0]">
                    <span className="font-semibold text-[#103D32] truncate">{pkg.madinahHotel?.name || "The Oberoi"}</span>
                    <span className="text-[11px] text-[#C5A264] font-bold flex items-center gap-1 mt-0.5">
                      <Footprints className="w-3.5 h-3.5" />
                      {pkg.madinahHotel?.distanceMeters || 80}m to Nabawi
                    </span>
                  </div>

                  {/* Flights */}
                  <div className="h-10 flex items-center border-b border-[#E8E0D0]">
                    <span className="flex items-center gap-1.5 font-medium text-[#103D32]">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Direct Flights Included
                    </span>
                  </div>

                  {/* Visa */}
                  <div className="h-10 flex items-center border-b border-[#E8E0D0]">
                    <span className="flex items-center gap-1.5 font-medium text-[#103D32]">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Ministry Visa + Insurance
                    </span>
                  </div>

                  {/* Primary CTA */}
                  <div className="h-10 flex items-center pt-2">
                    <Link href={`/packages/${pkg.slug}`} className="w-full">
                      <button className="w-full h-9 rounded-xl bg-[#103D32] hover:bg-[#1F5446] text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs">
                        <span>Book This Package</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
