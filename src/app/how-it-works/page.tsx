import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Footprints,
  Headphones,
  ArrowRight,
  Plane,
  Building2,
  FileText,
  BadgeCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "How Ziyara Works — Radical Transparency in Umrah Booking",
  description:
    "Discover how Ziyara eliminates guesswork with audited Haram walking distances, 100% itemized pricing, and dedicated pilgrimage concierge.",
};

export default async function HowItWorksPage() {
  const user = await getCurrentUser();

  const steps = [
    {
      num: "01",
      title: "Discover Audited Packages",
      description:
        "Select your preferred travel dates, duration, and departure city. Every hotel walking distance to Masjid al-Haram and Masjid an-Nabawi is physically audited by our ground team in meters.",
      icon: Compass,
      highlights: ["Physical distance verification", "Clear airline itineraries", "Transparent starting prices"],
    },
    {
      num: "02",
      title: "Customize Room & Pilgrimage Details",
      description:
        "Tailor your occupancy (quad, triple, double, or private suite) and enter traveler information. Real-time pricing recalculates transparently with zero hidden fees.",
      icon: Building2,
      highlights: ["Clear room supplement pricing", "Simple traveler registry", "Flexible dates"],
    },
    {
      num: "03",
      title: "Concierge Audit & Verified Confirmation",
      description:
        "Our dedicated Saudi concierge audits hotel room allocations, processes Ministry-approved visas with medical insurance, and issues your confirmed itinerary.",
      icon: ShieldCheck,
      highlights: ["Ministry & IATA compliance", "Included health insurance", "Guaranteed hotel allocation"],
    },
    {
      num: "04",
      title: "Sacred Journey with 24/7 Ground Support",
      description:
        "Embark on your pilgrimage with peace of mind. Our local ground representatives welcome you at the airport, manage intercity transfers, and support you every step of the way.",
      icon: Headphones,
      highlights: ["Airport meet & greet", "Haramain bullet train transfers", "Historical Ziyarat tours"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#C5A264]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#A07D3E]">
                SIMPLICITY • TRANSPARENCY • DIGNITY
              </span>
              <span className="w-6 h-[1px] bg-[#C5A264]" />
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#103D32] tracking-tight">
              How Ziyara Works
            </h1>

            <p className="text-sm sm:text-base text-[#66726A] leading-relaxed">
              We replace agent ambiguity and inflated claims with audited distances, itemized costs, and dedicated ground support from start to finish.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white rounded-3xl border border-[#E8E0D0] p-8 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <span className="font-display text-6xl font-bold text-[#103D32]/5 absolute -right-2 -top-2 select-none">
                    {step.num}
                  </span>

                  <div className="space-y-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F3E8] border border-[#E8E0D0] flex items-center justify-center text-[#103D32]">
                      <Icon className="w-6 h-6 text-[#103D32]" />
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#C5A264] uppercase tracking-wider block">
                        Step {step.num}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-[#103D32]">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#66726A] leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F0EAE0] space-y-2">
                      {step.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#18241E]">
                          <CheckCircle2 className="w-4 h-4 text-[#103D32] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Banner */}
          <div className="bg-[#103D32] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold">
                Ready to Experience Umrah with Confidence?
              </h2>
              <p className="text-xs sm:text-sm text-[#D1DDD6] leading-relaxed">
                Explore our handpicked Umrah packages with verified hotels near Masjid al-Haram and Masjid an-Nabawi.
              </p>
            </div>

            <div className="relative z-10 pt-2">
              <Link href="/packages">
                <button className="bg-[#C5A264] hover:bg-[#B89352] text-[#103D32] font-semibold text-sm px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer">
                  <span>Explore Umrah Packages</span>
                  <ArrowRight className="w-4 h-4 text-[#103D32]" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
