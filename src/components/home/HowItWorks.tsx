import Link from "next/link";
import { Search, ClipboardCheck, PlaneTakeoff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Explore and Compare Packages",
      description:
        "Filter by Indian departure airport, travel dates, and hotel tier. Compare verified walking distances to the Haram courtyards.",
      tag: "Automatic & Instant",
    },
    {
      number: "02",
      icon: ClipboardCheck,
      title: "Select Preferences & Submit",
      description:
        "Choose your room occupancy (Double, Triple, Quad), enter pilgrim names, and submit your booking to generate a unique tracking reference.",
      tag: "Instant Reference Generated",
    },
    {
      number: "03",
      icon: PlaneTakeoff,
      title: "Verification, Payment & Vouchers",
      description:
        "Our concierge audits passport validity, confirms seat allotments with airlines, reconciles secure payment, and issues your travel documents.",
      tag: "Concierge Verified",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-[#E7E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold text-[#285B4D] uppercase tracking-wider">
            Clear 3-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#123B32]">
            How Ziyara Works
          </h2>
          <p className="text-sm sm:text-base text-[#707873]">
            We clearly distinguish between instant digital submissions and verified operational confirmations so there are zero surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-[#E8ECE9] shadow-xs hover:border-[#C5A264] transition-all relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-[#C5A264]/60 font-serif">
                      {s.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#E7E8E3] text-[#123B32]">
                      {s.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
                    <Icon className="w-6 h-6 text-[#285B4D]" />
                  </div>

                  <h3 className="text-lg font-bold text-[#123B32]">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-[#707873] leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/packages">
            <Button size="lg" className="gap-2">
              <span>Start Exploring Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
