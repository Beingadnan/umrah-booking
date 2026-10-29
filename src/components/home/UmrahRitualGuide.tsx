"use client";

import * as React from "react";
import { Compass, BookOpen, CheckCircle, ArrowRight, Download, Calendar, Sun, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function UmrahRitualGuide() {
  const [activeStep, setActiveStep] = React.useState(0);

  const rituals = [
    {
      step: "01",
      name: "Ihram & Niyyah",
      arabic: "الإحرام والنية",
      station: "At the Miqat Boundary (Yalamlam / Dhul Hulaifah)",
      description:
        "Entering the sacred state of spiritual purity. Pilgrims perform ghusl, don the two unstitched white sheets of Ihram (for men) or modest attire (for women), offer two rak'ahs of Sunnah, and recite the Talbiyah.",
      talbiyah: "Labbayka Allāhumma Labbayk, Labbayka Lā Sharīka Laka Labbayk...",
      tips: ["Trim nails and groom before donning Ihram", "Avoid scented soaps or perfumes", "Maintain continuous Talbiyah until seeing the Kaaba"],
    },
    {
      step: "02",
      name: "Tawaf al-Umrah",
      arabic: "طواف العمرة",
      station: "Masjid al-Haram, Holy Kaaba Courtyard",
      description:
        "Performing seven circumambulations around the Holy Kaaba counter-clockwise, beginning and ending at the Black Stone (Hajar al-Aswad). Followed by two rak'ahs of prayer behind Maqam Ibrahim and drinking Zamzam.",
      talbiyah: "Bismillāhi Allāhu Akbar (at the start of each circuit)",
      tips: ["Uncover right shoulder for men (Idtiba) during all 7 circuits", "Perform Raml (brisk walking) in first 3 rounds if space allows", "Supplicate sincerely for forgiveness and your loved ones"],
    },
    {
      step: "03",
      name: "Sa'i between Safa & Marwah",
      arabic: "السعي بين الصفا والمروة",
      station: "The Sa'i Gallery (Al-Mas'a)",
      description:
        "Walking seven laps between the historical hillocks of Mount Safa and Mount Marwah, commemorating Lady Hajar's desperate devotion to finding water for infant Prophet Ismail (AS).",
      talbiyah: "Inna aṣ-Ṣafā wal-Marwata min Sha'ā'irillāh...",
      tips: ["Start at Safa and conclude at Marwah (7 total laps)", "Men jog briskly between the two green light markers", "Du'a is readily answered atop both Safa and Marwah"],
    },
    {
      step: "04",
      name: "Halq or Taqsir",
      arabic: "الحلق أو التقصير",
      station: "Designated Barbershops around Haram Courtyard",
      description:
        "Completing the Umrah by shaving the head (Halq - recommended for men) or trimming hair equally from all sides (Taqsir - minimum one fingertip length for women).",
      talbiyah: "Alḥamdulillāh (Ihram restrictions now lifted)",
      tips: ["Use licensed hygienic barbers authorized by Saudi Ministry", "Women trim an inch (fingertip length) from braid or ponytail", "All restrictions of Ihram are now completely lifted"],
    },
  ];

  const current = rituals[activeStep];

  return (
    <section className="py-24 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
            — Step-by-Step Spiritual Journey —
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#103D32] tracking-tight">
            The Sacred Rituals of Umrah Explained
          </h2>
          <p className="text-sm sm:text-base text-[#556059] leading-relaxed">
            Whether it is your first time or your tenth, understanding the four core pillars of Umrah ensures you perform your pilgrimage with profound presence and peace of heart.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {rituals.map((r, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={r.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#103D32] text-white border-[#103D32] shadow-md ring-2 ring-[#C5A264]/40"
                    : "bg-white text-[#18241E] border-[#E8ECE9] hover:border-[#C5A264]"
                }`}
              >
                <span className={`text-xs font-bold block ${isSelected ? "text-[#C5A264]" : "text-[#707873]"}`}>
                  Step {r.step}
                </span>
                <span className="text-sm font-bold block mt-1">
                  {r.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8ECE9] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0F2F0] pb-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-wider">
                Step {current.step} • {current.arabic}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#103D32]">
                {current.name}
              </h3>
              <p className="text-xs text-[#707873]">
                Location: <strong className="text-[#103D32]">{current.station}</strong>
              </p>
            </div>

            <div className="bg-[#FAFAF7] border border-[#E8ECE9] px-4 py-2 rounded-2xl text-xs text-[#103D32] font-semibold self-start sm:self-center">
              Guidance Included in All Packages
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#556059] leading-relaxed">
            {current.description}
          </p>

          {/* Talbiyah / Recitation Box */}
          <div className="bg-[#FAFAF7] rounded-2xl p-5 border border-[#E8ECE9] space-y-2">
            <span className="text-[10px] font-bold text-[#C5A264] uppercase tracking-wider block">
              Core Recitation & Supplication:
            </span>
            <p className="text-sm font-serif italic text-[#103D32]">
              "{current.talbiyah}"
            </p>
          </div>

          {/* Practical Tips */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#103D32] uppercase tracking-wider">
              Essential Practical Tips:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.tips.map((tip, idx) => (
                <div key={idx} className="bg-white border border-[#E8ECE9] rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-[#556059]">
                  <CheckCircle className="w-4 h-4 text-[#C5A264] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seasonality advice pill row */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E8ECE9] space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] border border-[#E8ECE9] flex items-center justify-center text-[#103D32]">
              <Calendar className="w-5 h-5 text-[#C5A264]" />
            </div>
            <h4 className="text-sm font-bold text-[#103D32]">Best Months for Pilgrimage</h4>
            <p className="text-xs text-[#556059] leading-relaxed">
              November through February offers pleasant 22°C temperatures in Makkah and breezy evenings in Madinah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8ECE9] space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] border border-[#E8ECE9] flex items-center justify-center text-[#103D32]">
              <Sun className="w-5 h-5 text-[#C5A264]" />
            </div>
            <h4 className="text-sm font-bold text-[#103D32]">Ramadan Spiritual Pinnacle</h4>
            <p className="text-xs text-[#556059] leading-relaxed">
              An Umrah performed during the holy month of Ramadan is equivalent in spiritual reward to performing Hajj with the Prophet ﷺ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8ECE9] space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAF7] border border-[#E8ECE9] flex items-center justify-center text-[#103D32]">
              <Shield className="w-5 h-5 text-[#C5A264]" />
            </div>
            <h4 className="text-sm font-bold text-[#103D32]">Visa & Health Protection</h4>
            <p className="text-xs text-[#556059] leading-relaxed">
              All electronic Umrah visas processed by Ziyara include mandatory Saudi medical & emergency hospital insurance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
