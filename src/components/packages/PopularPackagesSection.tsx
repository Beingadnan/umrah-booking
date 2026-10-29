"use client";

import * as React from "react";
import { PopularPackageCard } from "./PopularPackageCard";
import { PackageComparisonModal } from "./PackageComparisonModal";
import type { PopulatedPackage } from "@/services/packages";

interface PopularPackagesSectionProps {
  initialPackages: PopulatedPackage[];
}

export function PopularPackagesSection({ initialPackages }: PopularPackagesSectionProps) {
  const [activeTab, setActiveTab] = React.useState<"ALL" | "ECONOMY" | "STANDARD" | "PREMIUM">("ALL");
  const [comparedSlugs, setComparedSlugs] = React.useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = React.useState(false);

  const toggleCompare = (slug: string) => {
    setComparedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], slug];
      }
      return [...prev, slug];
    });
  };

  // Filter 8 popular packages based on active tab
  const filteredPackages = React.useMemo(() => {
    const popularSlugs = [
      "holy-journey-classic",
      "premium-umrah",
      "deluxe-umrah",
      "family-umrah",
      "economy-umrah",
      "7-days-umrah",
      "group-umrah",
      "ramadan-umrah",
    ];

    const popularList = popularSlugs
      .map((slug) => initialPackages.find((p) => p.slug === slug))
      .filter((p): p is PopulatedPackage => Boolean(p));

    const sourceList = popularList.length > 0 ? popularList : initialPackages.slice(0, 8);

    if (activeTab === "ALL") return sourceList;
    if (activeTab === "ECONOMY") {
      return sourceList.filter((p) => p.category === "ECONOMY");
    }
    if (activeTab === "STANDARD") {
      return sourceList.filter((p) => p.category === "DELUXE");
    }
    if (activeTab === "PREMIUM") {
      return sourceList.filter((p) => p.category === "VIP");
    }
    return sourceList;
  }, [initialPackages, activeTab]);

  return (
    <section className="py-14 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#C5A264]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A07D3E]">
                FEATURED UMRAH PACKAGES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#103D32] tracking-tight font-display">
              Popular Umrah Packages
            </h2>
            <p className="text-xs sm:text-sm text-[#66726A] leading-relaxed">
              Handpicked packages for a comfortable, spiritual and hassle-free journey. Compare up to 3 packages side by side.
            </p>
          </div>

          {/* Filter Tabs matching reference screenshot */}
          <div className="inline-flex items-center bg-[#EDE6D6]/70 p-1 rounded-full border border-[#E8E0D0]">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "ALL"
                  ? "bg-[#103D32] text-white shadow-xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setActiveTab("ECONOMY")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "ECONOMY"
                  ? "bg-[#103D32] text-white shadow-xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              Economy
            </button>
            <button
              onClick={() => setActiveTab("STANDARD")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "STANDARD"
                  ? "bg-[#103D32] text-white shadow-xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setActiveTab("PREMIUM")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "PREMIUM"
                  ? "bg-[#103D32] text-white shadow-xs"
                  : "text-[#66726A] hover:text-[#103D32]"
              }`}
            >
              Premium
            </button>
          </div>
        </div>

        {/* 8 Package Cards Grid (4 columns × 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPackages.map((pkg) => (
            <PopularPackageCard
              key={pkg.id}
              packageData={pkg}
              isCompared={comparedSlugs.includes(pkg.slug)}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      </div>

      {/* Floating Compare Action Bar */}
      {comparedSlugs.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#103D32] text-white px-5 py-3 rounded-full shadow-2xl border border-[#C5A264] flex items-center gap-4 animate-in slide-in-from-bottom-5">
          <span className="text-xs font-semibold">
            {comparedSlugs.length} Package{comparedSlugs.length > 1 ? "s" : ""} selected for comparison
          </span>
          <button
            onClick={() => setIsCompareOpen(true)}
            className="bg-[#C5A264] hover:bg-[#B89352] text-[#103D32] font-bold text-xs px-4 py-1.5 rounded-full shadow-xs cursor-pointer transition-colors"
          >
            Compare Now
          </button>
          <button
            onClick={() => setComparedSlugs([])}
            className="text-white/70 hover:text-white text-xs underline cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* Comparison Modal */}
      {isCompareOpen && (
        <PackageComparisonModal
          packages={initialPackages}
          selectedSlugs={comparedSlugs}
          onRemove={(slug) => setComparedSlugs((prev) => prev.filter((s) => s !== slug))}
          onClose={() => setIsCompareOpen(false)}
        />
      )}
    </section>
  );
}
