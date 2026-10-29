import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getPackages } from "@/services/packages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PackagesHero } from "@/components/packages/PackagesHero";
import { PopularPackagesSection } from "@/components/packages/PopularPackagesSection";
import { PackagesWhyBookWithUs } from "@/components/packages/PackagesWhyBookWithUs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explore Curated Umrah Packages — Ziyara",
  description:
    "Choose from our carefully curated luxury and deluxe Umrah packages with hotels in the Haram courtyards, verified flights, bullet train transfers, and 24/7 concierge support.",
};

interface PackagesPageProps {
  searchParams: Promise<{
    city?: string;
    category?: string;
    duration?: string;
    sortBy?: "price_asc" | "price_desc" | "duration" | "popular";
    month?: string;
  }>;
}

export default async function PackagesPage({ searchParams }: PackagesPageProps) {
  const params = await searchParams;
  const [user, packages] = await Promise.all([
    getCurrentUser(),
    getPackages({
      city: params.city && params.city !== "All Cities" ? params.city : undefined,
      category: params.category && params.category !== "ALL" ? params.category : undefined,
      duration: params.duration && params.duration !== "all" ? params.duration : undefined,
      sortBy: params.sortBy || "popular",
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      <Navbar user={user} />

      <main className="flex-1">
        {/* Packages Page Hero Section */}
        <Suspense fallback={<div className="h-96 bg-[#FAF9F6] animate-pulse" />}>
          <PackagesHero />
        </Suspense>

        {/* Popular Umrah Packages Grid (8 Cards + Tabs) */}
        <PopularPackagesSection initialPackages={packages} />

        {/* Why Book With Us Banner */}
        <PackagesWhyBookWithUs />
      </main>

      <Footer />
    </div>
  );
}
