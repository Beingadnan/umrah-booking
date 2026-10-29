import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PackageCard } from "@/components/packages/PackageCard";
import { Button } from "@/components/ui/button";
import type { PopulatedPackage } from "@/services/packages";

interface FeaturedPackagesProps {
  packages: PopulatedPackage[];
}

export function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  return (
    <section className="py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A27B3A]">
                HANDPICKED PILGRIM PACKAGES
              </span>
              <span className="w-6 h-[2px] bg-[#C6A66B]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#123B32] tracking-tight font-display">
              Featured Umrah Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#707873] leading-relaxed">
              Every package includes confirmed hotel walking distances to the Haram, authentic Indian meals, and dedicated ground support.
            </p>
          </div>

          <Link href="/packages">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-[#D5D7D1] bg-white text-[#123B32] hover:bg-[#FAF9F6] text-xs font-semibold px-5 py-2 h-9 gap-1.5 shadow-xs"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 3).map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
