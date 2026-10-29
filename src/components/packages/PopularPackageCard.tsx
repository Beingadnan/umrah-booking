import Link from "next/link";
import { Calendar, Building, Plane, FileText, ArrowRight } from "lucide-react";
import { formatPriceINR } from "@/lib/utils";
import type { PopulatedPackage } from "@/services/packages";

interface PopularPackageCardProps {
  packageData: PopulatedPackage;
  isCompared?: boolean;
  onToggleCompare?: (slug: string) => void;
}

export function PopularPackageCard({
  packageData,
  isCompared = false,
  onToggleCompare,
}: PopularPackageCardProps) {
  const {
    slug,
    name,
    durationDays,
    durationNights,
    basePriceInr,
    heroImage,
    badgeLabel,
    badgeStyle,
    locationSubtitle,
    makkahHotelText,
    madinahHotelText,
    makkahHotel,
    madinahHotel,
  } = packageData;

  // Fallbacks if not explicitly provided
  const badge = badgeLabel || "Best Value";
  const subtitle = locationSubtitle || (madinahHotelText === "" ? "Makkah Only" : "Makkah + Madinah");
  const makkahText = makkahHotelText || `Makkah: ${makkahHotel?.name || "Swissôtel Makkah"}`;
  const madinahText = madinahHotelText !== undefined ? madinahHotelText : `Madinah: ${madinahHotel?.name || "Pullman ZamZam"}`;

  // Badge background styling matching screenshot
  const getBadgeClasses = (style?: string, label?: string) => {
    if (style === "gold" || label?.includes("Popular")) {
      return "bg-[#D97706]/95 text-white";
    }
    if (style === "cyan" || label?.includes("Value") || label?.includes("Budget")) {
      return "bg-[#0284C7]/95 text-white";
    }
    if (style === "amber" || label?.includes("Ramadan")) {
      return "bg-[#D97706]/95 text-white";
    }
    return "bg-white/95 text-[#103D32] font-bold shadow-xs";
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-[#E8E0D0] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Image container with Badge */}
      <div className="relative h-44 w-full overflow-hidden bg-[#EDE6D6]">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Top-Left Badge */}
        <div className="absolute top-2.5 left-2.5 pointer-events-none">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs ${getBadgeClasses(
              badgeStyle,
              badge
            )}`}
          >
            {badge}
          </span>
        </div>

        {/* Top-Right Compare Toggle Button */}
        {onToggleCompare && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleCompare(slug);
            }}
            className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs transition-all cursor-pointer z-10 ${
              isCompared
                ? "bg-[#103D32] text-white shadow-xs"
                : "bg-white/90 text-[#103D32] hover:bg-white border border-[#E8E0D0]"
            }`}
          >
            {isCompared ? "✓ Compared" : "+ Compare"}
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        {/* Title & Location Subtitle */}
        <div>
          <h3 className="text-sm font-bold text-[#123B32] group-hover:text-[#285B4D] transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-[11px] text-[#707873] mt-0.5">{subtitle}</p>
        </div>

        {/* Specs List with Icons */}
        <div className="space-y-1.5 text-xs text-[#202824]">
          {/* Duration */}
          <div className="flex items-center gap-2 text-[#202824]">
            <Calendar className="w-3.5 h-3.5 text-[#707873] shrink-0" />
            <span className="text-[11px] font-medium">
              {durationDays} Days / {durationNights} Nights
            </span>
          </div>

          {/* Makkah Hotel */}
          <div className="flex items-center gap-2 text-[#202824]">
            <Building className="w-3.5 h-3.5 text-[#707873] shrink-0" />
            <span className="text-[11px] truncate text-[#202824]">
              {makkahText}
            </span>
          </div>

          {/* Madinah Hotel (if applicable) */}
          {madinahText ? (
            <div className="flex items-center gap-2 text-[#202824]">
              <Building className="w-3.5 h-3.5 text-[#707873] shrink-0" />
              <span className="text-[11px] truncate text-[#202824]">
                {madinahText}
              </span>
            </div>
          ) : (
            <div className="h-[18px]" />
          )}
        </div>

        {/* Inclusions Row */}
        <div className="flex items-center gap-3 text-[10px] text-[#707873] pt-1 border-t border-[#E7E8E3]/60">
          <div className="flex items-center gap-1">
            <Plane className="w-3 h-3 text-[#285B4D]" />
            <span>Flights Included</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-[#285B4D]" />
            <span>Visa Included</span>
          </div>
        </div>

        {/* Card Footer: Starts From & View Details Button */}
        <div className="mt-auto pt-3 border-t border-[#E7E8E3] flex items-center justify-between">
          <div>
            <span className="text-[9px] text-[#707873] block leading-none">
              From
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-extrabold text-[#123B32]">
                {formatPriceINR(basePriceInr)}
              </span>
              <span className="text-[10px] text-[#707873]">/person</span>
            </div>
          </div>

          <Link href={`/packages/${slug}`}>
            <button className="inline-flex items-center gap-1 bg-[#123B32] hover:bg-[#1a4a40] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-xs">
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
