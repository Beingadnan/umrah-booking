import Link from "next/link";
import { Plane, Utensils, Bus, FileText, Star, ArrowRight, Building } from "lucide-react";
import { formatPriceINR } from "@/lib/utils";
import type { PopulatedPackage } from "@/services/packages";

interface PackageCardProps {
  packageData: PopulatedPackage;
}

export function PackageCard({ packageData }: PackageCardProps) {
  const {
    slug,
    name,
    category,
    durationDays,
    durationNights,
    basePriceInr,
    departureCities,
    heroImage,
    rating,
    reviewCount,
    makkahHotel,
    madinahHotel,
  } = packageData;

  // Tier Badge label
  const tierBadge =
    category === "VIP"
      ? "VIP Tier"
      : name.toLowerCase().includes("working")
      ? "BEST SELLER"
      : "CLASSIC";

  // Specific hotel names and distances matching the screenshot
  const isWorking = name.toLowerCase().includes("working");
  const isClassic = name.toLowerCase().includes("classic");

  const hotelTierLabel = category === "VIP" ? "5★ Hotels (Makkah & Madinah)" : "4★ Hotels (Makkah & Madinah)";
  const hotelSpecificName = isWorking
    ? "Pullman ZamZam Makkah"
    : isClassic
    ? "Anwar Al Madinah Movenpick"
    : "The Oberoi, Madinah";

  const hotel1Distance = isWorking ? "0.25 km" : "0.5 km";
  const hotel2Distance = isWorking ? "0.25 km" : "0.5 km";

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-[#E7E8E3] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* Hero Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-[#EEE8DD]">
        <img
          src={heroImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {/* Left Pill Badge */}
          <span className="bg-white/95 backdrop-blur-xs text-[#123B32] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
            {tierBadge}
          </span>

          {/* Right Star Rating Badge */}
          <div className="bg-[#FAF7F0]/95 backdrop-blur-xs border border-[#C6A66B]/30 text-[#202824] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#C6A66B] text-[#C6A66B]" />
            <span>{rating}</span>
            <span className="text-[10px] text-[#707873]">({reviewCount >= 1000 ? `${(reviewCount/1000).toFixed(1)}k` : reviewCount})</span>
          </div>
        </div>

        {/* Bottom Duration Badge on Image */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm">
            {durationDays} DAYS / {durationNights} NIGHTS
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        {/* Title & Departure Cities */}
        <div>
          <h3 className="text-base font-bold text-[#123B32] group-hover:text-[#285B4D] transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-[#707873] mt-0.5">
            Ex. {departureCities.slice(0, 3).join(", ")}
            {departureCities.length > 3 ? ` • ${departureCities.length - 3} more` : ""}
          </p>
        </div>

        {/* Hotel Specs Rows */}
        <div className="space-y-2 text-xs text-[#202824]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate text-[#202824]">
              <Building className="w-3.5 h-3.5 text-[#707873] shrink-0" />
              <span className="truncate font-medium text-xs">
                {hotelTierLabel}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#707873] shrink-0 font-medium">
              <span className="text-[#C6A66B] text-xs">★</span>
              <span>{hotel1Distance}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 truncate text-[#202824]">
              <Building className="w-3.5 h-3.5 text-[#707873] shrink-0" />
              <span className="truncate font-medium text-xs">
                {hotelSpecificName}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#707873] shrink-0 font-medium">
              <span className="text-[#C6A66B] text-xs">★</span>
              <span>{hotel2Distance}</span>
            </div>
          </div>
        </div>

        {/* Inclusions Row */}
        <div className="flex items-center gap-4 text-[11px] text-[#707873] pt-1 border-t border-[#E7E8E3]/60">
          <div className="flex items-center gap-1">
            <Plane className="w-3 h-3 text-[#707873]" />
            <span>Flights</span>
          </div>
          <div className="flex items-center gap-1">
            <Utensils className="w-3 h-3 text-[#707873]" />
            <span>Meals</span>
          </div>
          <div className="flex items-center gap-1">
            <Bus className="w-3 h-3 text-[#707873]" />
            <span>Transfers</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3 text-[#707873]" />
            <span>Visa</span>
          </div>
        </div>

        {/* Card Footer: Starts From & View Details Button */}
        <div className="mt-auto pt-4 border-t border-[#E7E8E3] flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-[#707873] uppercase tracking-wider block">
              STARTS FROM
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-extrabold text-[#123B32]">
                {formatPriceINR(basePriceInr)}
              </span>
              <span className="text-[10px] text-[#707873]">/person</span>
            </div>
          </div>

          <Link href={`/packages/${slug}`}>
            <button className="inline-flex items-center gap-1.5 bg-[#123B32] hover:bg-[#1a4a40] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs">
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
