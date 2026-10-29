import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getPackageBySlug } from "@/services/packages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PackageItineraryTabs } from "@/components/packages/PackageItineraryTabs";
import { PackageDetailsSidebar } from "@/components/packages/PackageDetailsSidebar";
import { PackagePreFooterBanner } from "@/components/packages/PackagePreFooterBanner";
import {
  ArrowLeft,
  Building2,
  Plane,
  Headphones,
  Award,
  UserCheck,
  Play,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PackageDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PackageDetailsPageProps) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Package Not Found — Ziyara" };

  return {
    title: `${pkg.name} — Ziyara | Premium Umrah Pilgrimage`,
    description: pkg.description,
  };
}

export default async function PackageDetailsPage({ params }: PackageDetailsPageProps) {
  const { slug } = await params;
  const [user, pkg] = await Promise.all([
    getCurrentUser(),
    getPackageBySlug(slug),
  ]);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />

      <main className="flex-1">
        {/* Package Hero Section matching design */}
        <section className="relative bg-white pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 overflow-hidden border-b border-[#E8ECE9]">
          {/* Right Background Image: Kaaba & Clock Tower */}
          <div className="absolute top-0 right-0 w-full lg:w-[58%] xl:w-[55%] h-full pointer-events-none z-0 overflow-hidden">
            <div className="relative w-full h-full">
              <img
                src="/images/hero_exact_makkah.jpg"
                alt="Holy Kaaba and Makkah Royal Clock Tower"
                className="w-full h-full object-cover object-[center_28%] lg:object-[35%_25%]"
              />
              {/* Smooth Left Gradient */}
              <div className="absolute inset-y-0 left-0 w-32 sm:w-64 lg:w-96 bg-gradient-to-r from-white via-white/80 to-transparent" />
              {/* Top & Bottom Soft Overlays */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/70 to-transparent" />
              <div className="absolute inset-0 bg-white/85 lg:hidden" />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Top Bar: Back Link & Trusted by Badge */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#556059] hover:text-[#152F26] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#152F26]" />
                <span>Back to Packages</span>
              </Link>

              {/* Trusted by 10,000+ Pilgrims Pill Badge matching design */}
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xs rounded-full border border-[#E7E1D4] px-4 py-1.5 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#DFD6C5]">
                  <Award className="w-3.5 h-3.5 text-[#152F26]" />
                </div>
                <div className="text-[10.5px] font-semibold text-[#1F2B24] leading-tight">
                  Trusted by <br />
                  <span className="text-[#C59A4E]">10,000+ Pilgrims</span>
                </div>
              </div>
            </div>

            {/* Left Content Area */}
            <div className="max-w-2xl space-y-3 pt-2">
              {/* Popular Pill Badge */}
              <span className="inline-block text-[10px] sm:text-[10.5px] font-bold tracking-[0.16em] uppercase px-3 py-1 rounded-full bg-[#EAE4D7] text-[#5A4D35] border border-[#DDD5C5]">
                {pkg.category === "VIP" ? "VIP TIER" : "MOST POPULAR"}
              </span>

              {/* Title */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#152F26] leading-[1.12] tracking-tight">
                {pkg.name}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#636C66] leading-relaxed font-normal pt-1 max-w-xl">
                {pkg.description}
              </p>

              {/* 4 Feature Pills in a row matching design */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {/* 1. Makkah */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB] shadow-2xs">
                    <Building2 className="w-4 h-4 text-[#152F26]" />
                  </div>
                  <div className="text-xs font-semibold text-[#1F2B24] leading-tight">
                    {pkg.makkahNights} Nights <br /> Makkah
                  </div>
                </div>

                {/* 2. Madinah */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB] shadow-2xs">
                    <Building2 className="w-4 h-4 text-[#152F26]" />
                  </div>
                  <div className="text-xs font-semibold text-[#1F2B24] leading-tight">
                    {pkg.madinahNights} Nights <br /> Madinah
                  </div>
                </div>

                {/* 3. Flights + Visa */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB] shadow-2xs">
                    <Plane className="w-4 h-4 text-[#152F26]" />
                  </div>
                  <div className="text-xs font-semibold text-[#1F2B24] leading-tight">
                    Flights + Visa <br /> Assistance
                  </div>
                </div>

                {/* 4. 24/7 Support */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26] shrink-0 border border-[#E2DACB] shadow-2xs">
                    <Headphones className="w-4 h-4 text-[#152F26]" />
                  </div>
                  <div className="text-xs font-semibold text-[#1F2B24] leading-tight">
                    24/7 <br /> Support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Two-Column Layout matching design */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Section 1: Package Overview matching design */}
              <section className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#152F26]">
                  Package Overview
                </h2>
                <p className="text-sm sm:text-base text-[#636C66] leading-relaxed max-w-3xl">
                  The <span className="font-semibold text-[#152F26]">{pkg.name}</span> is designed for pilgrims who want a balanced and comfortable experience with excellent hotels, convenient flight options and complete support throughout your journey.
                </p>

                {/* 4 Overview Feature Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  {/* Card 1: Hotels */}
                  <div className="bg-white rounded-2xl border border-[#ECE7DC] p-4 sm:p-5 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26]">
                      <Building2 className="w-5 h-5 text-[#152F26]" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#152F26]">
                        4★ / 5★ Hotels
                      </h4>
                      <p className="text-xs text-[#707B74] mt-0.5 leading-tight">
                        Near Haram for easy access
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Flights & Visa */}
                  <div className="bg-white rounded-2xl border border-[#ECE7DC] p-4 sm:p-5 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26]">
                      <Plane className="w-5 h-5 text-[#152F26]" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#152F26]">
                        Flight + Visa Assistance
                      </h4>
                      <p className="text-xs text-[#707B74] mt-0.5 leading-tight">
                        Hassle-free travel process
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Guides */}
                  <div className="bg-white rounded-2xl border border-[#ECE7DC] p-4 sm:p-5 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26]">
                      <UserCheck className="w-5 h-5 text-[#152F26]" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#152F26]">
                        Experienced Guides
                      </h4>
                      <p className="text-xs text-[#707B74] mt-0.5 leading-tight">
                        Support throughout your journey
                      </p>
                    </div>
                  </div>

                  {/* Card 4: 24/7 Support */}
                  <div className="bg-white rounded-2xl border border-[#ECE7DC] p-4 sm:p-5 shadow-2xs space-y-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#152F26]">
                      <Headphones className="w-5 h-5 text-[#152F26]" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-[#152F26]">
                        24/7 Support
                      </h4>
                      <p className="text-xs text-[#707B74] mt-0.5 leading-tight">
                        Always here when you need us
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Itinerary & Details Tabs */}
              <PackageItineraryTabs pkg={pkg} />

              {/* Section 3: Gallery matching design */}
              <section className="space-y-4">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#152F26]">
                    Gallery
                  </h2>
                  <p className="text-xs sm:text-sm text-[#707B74] mt-1">
                    Experience the beauty and serenity of the holy cities.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  {/* Photo 1: Masjid al-Haram, Makkah */}
                  <div className="space-y-2">
                    <div className="h-40 rounded-2xl overflow-hidden border border-[#ECE7DC] shadow-2xs bg-[#EFE9DC] group">
                      <img
                        src="/images/hero_exact_makkah.jpg"
                        alt="Masjid al-Haram, Makkah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#152F26] block">
                      Masjid al-Haram, Makkah
                    </span>
                  </div>

                  {/* Photo 2: Masjid an-Nabawi, Madinah */}
                  <div className="space-y-2">
                    <div className="h-40 rounded-2xl overflow-hidden border border-[#ECE7DC] shadow-2xs bg-[#EFE9DC] group">
                      <img
                        src="/images/prophet_mosque_madinah.jpg"
                        alt="Masjid an-Nabawi, Madinah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#152F26] block">
                      Masjid an-Nabawi, Madinah
                    </span>
                  </div>

                  {/* Photo 3: Hotel in Makkah */}
                  <div className="space-y-2">
                    <div className="h-40 rounded-2xl overflow-hidden border border-[#ECE7DC] shadow-2xs bg-[#EFE9DC] group">
                      <img
                        src="/images/makkah_clocktower_facade.jpg"
                        alt="Hotel in Makkah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#152F26] block">
                      Hotel in Makkah
                    </span>
                  </div>

                  {/* Photo 4: Hotel in Madinah */}
                  <div className="space-y-2">
                    <div className="h-40 rounded-2xl overflow-hidden border border-[#ECE7DC] shadow-2xs bg-[#EFE9DC] group">
                      <img
                        src="/images/hotel_voco_lobby.jpg"
                        alt="Hotel in Madinah"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#152F26] block">
                      Hotel in Madinah
                    </span>
                  </div>
                </div>
              </section>

              {/* Section 4: Lifetime Blessing Story / Video Banner Card matching design */}
              <div className="bg-[#F3EFE6] rounded-3xl p-6 sm:p-7 border border-[#E3DDD0] flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xs">
                {/* Left: Arched Architecture Photo Frame */}
                <div className="w-32 h-44 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#C59A4E]/50 shrink-0 shadow-xs bg-[#EFE9DC]">
                  <img
                    src="/images/madinah_arch_view.jpg"
                    alt="Sanctuary Arch view of Prophet's Mosque in Madinah"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Middle: Content */}
                <div className="space-y-1.5 flex-1 text-center md:text-left">
                  <span className="text-[10px] font-bold tracking-[0.22em] text-[#8C7A58] uppercase">
                    A JOURNEY OF FAITH
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#152F26] leading-tight">
                    More Than a Trip, <br className="hidden sm:inline" />
                    It's a Lifetime Blessing
                  </h3>
                  <p className="text-xs sm:text-sm text-[#636C66] leading-relaxed pt-1 max-w-md">
                    Experience peace, comfort and complete support for your Umrah journey. Let us take care of the details, so you can focus on what truly matters — your faith.
                  </p>
                </div>

                {/* Right: Watch Video Button */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#152F26] hover:bg-[#1E4337] flex items-center justify-center text-white shadow-sm transition-all cursor-pointer">
                    <Play className="w-5 h-5 text-white ml-0.5 fill-white" />
                  </div>
                  <span className="text-xs font-semibold text-[#152F26] whitespace-nowrap">
                    Watch Our <br /> Journey Video
                  </span>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar Column (4 cols) */}
            <div className="lg:col-span-4">
              <PackageDetailsSidebar pkg={pkg} />
            </div>
          </div>
        </div>

        {/* Pre-Footer Banner matching design */}
        <PackagePreFooterBanner />
      </main>

      <Footer />
    </div>
  );
}
