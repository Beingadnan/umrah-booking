import { Star, ShieldCheck, Quote, CheckCircle2, UserCheck, Heart } from "lucide-react";

export function PilgrimStoriesSection() {
  const reviews = [
    {
      id: "rev-1",
      name: "Al-Hajj Tariq & Farzana Mansoor",
      city: "Mumbai, Maharashtra",
      month: "Travelled October 2026",
      packageType: "Executive VIP 15-Day Umrah",
      bookingRef: "ZYR-2026-7841",
      rating: 5,
      avatar: "TM",
      quote:
        "The hotel was literally 100 meters from the Haram courtyard at Swissôtel Al Maqam just like promised. My elderly parents never had to struggle with uphill walking or waiting for packed buses. The Haramain bullet train was seamless and the concierge met us right at the platform.",
      highlight: "100m Audited Walking Distance Verified",
    },
    {
      id: "rev-2",
      name: "Dr. Asim Siddiqui & Family",
      city: "New Delhi, Delhi",
      month: "Travelled September 2026",
      packageType: "Classic Deluxe 15-Day Umrah",
      bookingRef: "ZYR-2026-6219",
      rating: 5,
      avatar: "AS",
      quote:
        "What made Ziyara stand out from our previous local travel agents was the radical transparency. Every single rupee was itemized upfront—no surprise visa insurance fees at the last second, and our Nusuk Rawdah permit was confirmed before we even boarded our Saudia flight.",
      highlight: "Zero Hidden Surcharges Guaranteed",
    },
    {
      id: "rev-3",
      name: "Zubair & Ayesha Hashmi",
      city: "Hyderabad, Telangana",
      month: "Travelled August 2026",
      packageType: "10-Day Working Professional",
      bookingRef: "ZYR-2026-4402",
      rating: 5,
      avatar: "ZH",
      quote:
        "For working professionals with limited leave, this 10-day package was a gift. Direct flights, quick luxury airport transfers, and walking access to the Prophet's Mosque in Madinah allowed us to spend maximum time inside the Rawdah without logistical stress.",
      highlight: "Seamless Work-Life Pilgrimage",
    },
  ];

  const metrics = [
    { value: "10,000+", label: "Pilgrims Served", sub: "Across India & Abroad" },
    { value: "100%", label: "Audited Hotel Distances", sub: "Physically Verified Metres" },
    { value: "4.9 / 5", label: "Average Satisfaction", sub: "From Verified Pilgrims" },
    { value: "24 / 7", label: "Ground Support", sub: "Bilingual Mutawwif in Makkah & Madinah" },
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
            — Voices of the Sacred Sanctuary —
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#103D32] tracking-tight">
            Trusted by Over 10,000 Blessed Pilgrims
          </h2>
          <p className="text-sm sm:text-base text-[#556059] leading-relaxed">
            Read authentic reviews from families, elders, and first-time travelers who embarked on their sacred journey with Ziyara.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-[#E8ECE9] p-7 shadow-xs hover:border-[#C5A264] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Top row: stars + verified badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A264]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#103D32] bg-[#FAFAF7] border border-[#E8ECE9] px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A264]" />
                    <span>Verified Booking</span>
                  </div>
                </div>

                {/* Highlight callout */}
                <div className="text-xs font-semibold text-[#103D32] bg-[#FAFAF7] border border-[#E8ECE9] px-3 py-1.5 rounded-xl">
                  {rev.highlight}
                </div>

                {/* Quote text */}
                <p className="text-xs sm:text-sm text-[#556059] leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author row */}
              <div className="pt-4 border-t border-[#F0F2F0] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#103D32] text-[#C5A264] font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {rev.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#103D32] truncate">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-[#707873] truncate">
                    {rev.city} • <span className="text-[#C5A264] font-medium">{rev.month}</span>
                  </p>
                  <p className="text-[10px] text-[#8C9891] font-mono">
                    Ref: {rev.bookingRef}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metrics Strip */}
        <div className="bg-[#103D32] text-white rounded-3xl p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {metrics.map((m, idx) => (
              <div key={idx} className="pt-4 lg:pt-0 px-4 space-y-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#C5A264] font-serif block">
                  {m.value}
                </span>
                <strong className="text-sm font-bold text-white block">
                  {m.label}
                </strong>
                <span className="text-xs text-white/70 block">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
