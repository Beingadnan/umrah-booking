import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Compass, Footprints, ShieldCheck, HeartHandshake, Eye } from "lucide-react";

export const metadata = {
  title: "About Us — Ziyara",
  description: "The story and mission behind Ziyara — Luxury hospitality meets spiritual simplicity in Umrah booking.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
              — Our Sacred Mission —
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#103D32] tracking-tight">
              Radical Transparency in Umrah Travel
            </h1>
            <p className="text-base text-[#5A6860] max-w-2xl mx-auto leading-relaxed">
              Ziyara was founded to solve a persistent grievance for pilgrims: vague hotel distances, concealed costs, and total dependence on middle-agents.
            </p>
          </div>

          {/* Core Story */}
          <div className="bg-white rounded-3xl border border-[#E7E0D0] p-8 sm:p-12 shadow-xs space-y-6 text-sm text-[#5A6860] leading-relaxed">
            <h2 className="text-xl font-bold text-[#103D32]">Why We Built Ziyara</h2>
            <p>
              Every year, hundreds of thousands of pilgrims embark on the sacred journey of Umrah. Yet, the traditional tour agency model has remained frustratingly opaque:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[#1B2923]">
              <li>Hotels over 2 kilometers away are frequently advertised as "only 2 minutes from Haram".</li>
              <li>Final prices routinely escalate once documents are handed over.</li>
              <li>Airlines, stopovers, and room sharing ratios are often swapped without consent.</li>
            </ul>
            <p>
              We believe a sacred spiritual journey should begin with honesty, peace of mind, and absolute clarity. On Ziyara, every meter between the hotel lobby and the Haram courtyard is audited. Every meal, bullet train ticket, and visa insurance policy is documented before you pay.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#E7E8E3] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
                <Footprints className="w-5 h-5 text-[#285B4D]" />
              </div>
              <h3 className="text-base font-bold text-[#123B32]">Audited Distances</h3>
              <p className="text-xs text-[#707873] leading-relaxed">
                We clearly separate true pedestrian walking distances from 24/7 shuttle bus routes so families and seniors can choose with confidence.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E7E8E3] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
                <Eye className="w-5 h-5 text-[#285B4D]" />
              </div>
              <h3 className="text-base font-bold text-[#123B32]">No Hidden Surcharges</h3>
              <p className="text-xs text-[#707873] leading-relaxed">
                What you see is what you pay. Room sharing multipliers and mandatory taxes are calculated upfront in INR.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E7E8E3] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
                <HeartHandshake className="w-5 h-5 text-[#285B4D]" />
              </div>
              <h3 className="text-base font-bold text-[#123B32]">Dignified Support</h3>
              <p className="text-xs text-[#707873] leading-relaxed">
                Our bilingual ground teams in Jeddah, Makkah, and Madinah coordinate your Rawdah Nusuk permits and airport reception with care.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
