import { ShieldCheck, Award, Tag, Headphones } from "lucide-react";

export function TrustIndicators() {
  const indicators = [
    {
      icon: ShieldCheck,
      title: "Verified Walking Distances",
      description:
        "We physically walk hotel distances to make sure the Haram is truly within walking distance.",
    },
    {
      icon: Award,
      title: "100% Itemized Inclusions",
      description:
        "Every ticket, buffer, meal, transport and visa cost is listed — no hidden charges, no surprises.",
    },
    {
      icon: Tag,
      title: "Transparent Pricing",
      description:
        "No hidden agent fees. What you see is what you pay — with complete clarity and fairness.",
    },
    {
      icon: Headphones,
      title: "Saudi Ministry & Visa Compliant",
      description:
        "All packages follow Saudi regulations and are fully compliant with visa and travel norms.",
    },
  ];

  return (
    <section className="py-10 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {indicators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7E8E3] p-6 shadow-xs flex flex-col space-y-3"
              >
                {/* Circular Icon Badge */}
                <div className="w-10 h-10 rounded-full border border-[#123B32]/20 bg-[#FAF9F6] flex items-center justify-center text-[#123B32]">
                  <Icon className="w-5 h-5 text-[#285B4D]" />
                </div>

                <h3 className="text-sm font-bold text-[#123B32]">{item.title}</h3>
                <p className="text-xs text-[#707873] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
