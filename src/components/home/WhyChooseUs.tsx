import { BadgePercent, Footprints, ShieldCheck, FileCheck2 } from "lucide-react";

export function WhyChooseUs() {
  const benefits = [
    {
      icon: BadgePercent,
      title: "Transparent Package Pricing",
      description:
        "Every price listed reflects the exact room occupancy tier and includes all statutory taxes. There are no surprise agent markups or hidden fees after you inquire.",
    },
    {
      icon: Footprints,
      title: "Clear Hotel & Distance Information",
      description:
        "We specify exact walking meters to the outer Haram courtyards. You will always know whether your accommodation requires a stroll or an air-conditioned shuttle ride.",
    },
    {
      icon: ShieldCheck,
      title: "Straightforward Booking Process",
      description:
        "Select your dates, enter pilgrim details, and receive an instant reference number. Track status changes in real-time from your private customer dashboard.",
    },
    {
      icon: FileCheck2,
      title: "Assistance with Travel Documentation",
      description:
        "Our concierge reviews your passports, helps file official Saudi electronic visa applications with health cover, and prepares your flight itinerary and hotel vouchers.",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
            — Built for Pilgrims & Families —
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#103D32]">
            Why Choose Ziyara?
          </h2>
          <p className="text-sm sm:text-base text-[#556059]">
            We set a new standard for honesty, transparency, and pilgrim dignity in Umrah travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#E8ECE9] shadow-xs space-y-4 hover:border-[#C5A264] transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAFAF7] border border-[#E8ECE9] flex items-center justify-center text-[#103D32]">
                  <Icon className="w-6 h-6 text-[#C5A264]" />
                </div>
                <h3 className="text-lg font-bold text-[#103D32]">{b.title}</h3>
                <p className="text-xs sm:text-sm text-[#707873] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
