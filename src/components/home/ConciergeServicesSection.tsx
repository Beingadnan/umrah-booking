import Link from "next/link";
import { Sparkles, HeartHandshake, Car, Droplets, Shield, Clock, PhoneCall, ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConciergeServicesSection() {
  const services = [
    {
      icon: HeartHandshake,
      title: "Nusuk Rawdah Permit Coordination",
      description:
        "Guaranteed advance coordination of official permits for the Sacred Garden (Rawdah ash-Sharifah) at the Prophet's Mosque through the official Nusuk portal.",
      tag: "100% Coordinated",
    },
    {
      icon: Car,
      title: "Private Executive Airport Transfers",
      description:
        "Chauffeured GMC Yukon / Lexus reception from Jeddah Airport (KAIA) and Madinah Airport (PRMA) directly to your hotel lobby, bypassing public queues.",
      tag: "VIP Chauffeur",
    },
    {
      icon: UserCheck,
      title: "Senior & Wheelchair Ground Assistance",
      description:
        "Dedicated multilingual escorts trained to assist elderly parents and pilgrims requiring wheelchairs through Tawaf courtyards and the Sa'i gallery.",
      tag: "Dignified Care",
    },
    {
      icon: Droplets,
      title: "5-Liter Sealed Zamzam Water Dispatch",
      description:
        "Authentic, sealed 5L containers from the Saudi National Water Company secured, baggage-cleared, and handed to you before airport boarding.",
      tag: "Direct Delivery",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
            — Bespoke Ground Hospitality —
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#103D32] tracking-tight">
            Our Concierge Takes Care of Every Sacred Detail
          </h2>
          <p className="text-sm sm:text-base text-[#556059] leading-relaxed">
            From the moment your plane lands until your safe journey home, our dedicated Saudi ground team ensures you focus purely on worship and reflection.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((serv, idx) => {
            const Icon = serv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#E8ECE9] p-7 shadow-xs hover:border-[#C5A264] hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAFAF7] border border-[#E8ECE9] flex items-center justify-center text-[#103D32]">
                      <Icon className="w-6 h-6 text-[#C5A264]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FAFAF7] text-[#103D32] border border-[#E8ECE9] px-2.5 py-1 rounded-full">
                      {serv.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#103D32]">
                    {serv.title}
                  </h3>

                  <p className="text-xs text-[#556059] leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F0F2F0] text-[11px] font-semibold text-[#103D32] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A264]" />
                  <span>Available on All Packages</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Concierge Contact Banner */}
        <div className="mt-14 bg-[#103D32] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 z-10 max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-wider block">
              24/7 Dedicated Concierge Support
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need a Custom Itinerary for Your Family?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Speak directly with our senior Umrah concierge. We tailor travel dates, suite categories, private vehicle transfers, and elderly assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 shrink-0">
            <a
              href="tel:+919820012345"
              className="inline-flex items-center gap-2 bg-[#C5A264] hover:bg-[#B89355] text-[#103D32] font-bold px-6 py-3 rounded-full text-xs transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 98200 12345</span>
            </a>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full border-white text-white hover:bg-white hover:text-[#103D32] text-xs px-6 py-3"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
