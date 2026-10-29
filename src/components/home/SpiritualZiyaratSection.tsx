import Link from "next/link";
import { Compass, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpiritualZiyaratSection() {
  const sites = [
    {
      id: "site-1",
      city: "Makkah Al-Mukarramah",
      name: "Jabal al-Nour & Cave of Hira",
      significance: "The Mountain of Divine Revelation",
      description:
        "The sacred summit where the Prophet Muhammad ﷺ received the very first verses of the Holy Quran through Angel Jibril (AS).",
      features: ["Historical Guided Commentary", "AC Transport to Base", "Sunrise / Fajr Viewing"],
      image: "/images/kaaba_kiswah_gold.jpg",
      badge: "Spiritual Highlight",
    },
    {
      id: "site-2",
      city: "Madinah Al-Munawwarah",
      name: "Masjid Quba & Date Palm Oasis",
      significance: "The First Mosque in Islam",
      description:
        "Built by the Prophet ﷺ upon his arrival during the Hijrah. Performing two rak'ahs here carries the immense spiritual reward of a complete Umrah.",
      features: ["Sunnah Saturday Ziyarat", "Direct Courtyard Entry", "Historical Lecture"],
      image: "/images/madinah_arch_view.jpg",
      badge: "Sunnah Ziyarat",
    },
    {
      id: "site-3",
      city: "Madinah Al-Munawwarah",
      name: "Mount Uhud & Martyrs' Sanctuary",
      significance: "Site of the Battle of Uhud",
      description:
        "The beloved mountain where 70 noble companions were martyred, including Hazrat Hamza (RA). Embodying steadfastness, faith, and devotion.",
      features: ["Scholarly Narration", "Archer's Hill (Jabal al-Rumat)", "Martyrs' Cemetery"],
      image: "/images/prophet_mosque_madinah.jpg",
      badge: "Prophetic Heritage",
    },
    {
      id: "site-4",
      city: "Makkah Al-Mukarramah",
      name: "Jabal Thawr & The Cave of Refuge",
      significance: "Sanctuary of the Great Hijrah",
      description:
        "The historic cave where the Prophet ﷺ and Abu Bakr As-Siddiq (RA) took refuge from Quraysh pursuers under divine spiderweb protection.",
      features: ["Air-Conditioned Coach", "Dedicated Urdu/English Guide", "Historical Map Review"],
      image: "/images/makkah_clocktower_facade.jpg",
      badge: "Historical Landmark",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
              — Prophetic Heritage & Sacred Landmarks —
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#103D32] tracking-tight">
              Walk Where the Prophet ﷺ Walked
            </h2>
            <p className="text-sm sm:text-base text-[#556059] leading-relaxed">
              Every Ziyara package includes guided historical tours in Makkah and Madinah led by bilingual Islamic scholars, traveling in private air-conditioned comfort with zero rushed itineraries.
            </p>
          </div>

          <Link href="/packages" className="shrink-0">
            <Button
              variant="outline"
              size="md"
              className="rounded-full border-[#103D32] text-[#103D32] hover:bg-[#103D32] hover:text-white transition-all gap-2"
            >
              <span>Explore Packages with Ziyarat</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-3xl border border-[#E8ECE9] overflow-hidden flex flex-col justify-between hover:border-[#C5A264] hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Photo banner */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-3.5 left-3.5 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#103D32] px-2.5 py-1 rounded-full shadow-xs">
                    {site.badge}
                  </span>

                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] font-medium text-[#C5A264] flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {site.city}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug drop-shadow-xs">
                      {site.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <p className="text-xs font-semibold text-[#103D32]">
                    {site.significance}
                  </p>
                  <p className="text-xs text-[#556059] leading-relaxed">
                    {site.description}
                  </p>

                  <div className="pt-2 border-t border-[#F0F2F0] space-y-1.5">
                    {site.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-[#33423B]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A264] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="p-5 pt-0">
                <div className="bg-[#FAFAF7] border border-[#E8ECE9] rounded-xl px-3 py-2 text-[11px] text-[#556059] flex items-center justify-between">
                  <span>Included with Guide</span>
                  <span className="font-bold text-[#103D32]">100% Free</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Callout Bar */}
        <div className="mt-12 bg-[#FAFAF7] rounded-3xl border border-[#E8ECE9] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#103D32] text-[#C5A264] flex items-center justify-center shrink-0 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#103D32]">
                Customized Private Family Ziyarat Available
              </h4>
              <p className="text-xs sm:text-sm text-[#556059]">
                Traveling with elderly parents or young children? Upgrade to a private luxury GMC Yukon with customized departure timings.
              </p>
            </div>
          </div>

          <Link href="/contact" className="shrink-0">
            <Button size="sm" className="rounded-full bg-[#103D32] hover:bg-[#1A5C4C] text-white px-5 py-2 text-xs">
              Inquire About Private Ziyarat
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
