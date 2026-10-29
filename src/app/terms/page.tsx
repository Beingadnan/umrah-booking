import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Terms and Conditions — Ziyara",
  description: "Terms of service and pilgrimage booking agreements.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
              — Legal Framework —
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#103D32]">
              Terms and Conditions
            </h1>
            <p className="text-xs sm:text-sm text-[#707873] mt-1">
              Last updated: October 2026 • Ziyara Technologies Pvt. Ltd.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E7E0D0] p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm text-[#5A6860] leading-relaxed">
            <h2 className="text-base font-bold text-[#103D32]">1. Introduction & Booking Scope</h2>
            <p>
              Welcome to Ziyara. By using our website, submitting booking requests, or communicating with our concierge, you agree to comply with these terms. Ziyara acts as an accredited travel facilitator coordinating with IATA-licensed airlines, Saudi Ministry of Hajj & Umrah approved Munazzim operators, and registered hoteliers in Makkah and Madinah.
            </p>

            <h2 className="text-base font-bold text-[#123B32]">2. Pricing & Currency</h2>
            <p>
              All package prices are quoted in Indian Rupees (INR) and are per person based on the selected room occupancy (Quad, Triple, Double, Single). Prices reflect flight fare, accommodation, Saudi e-visa with insurance, and specified meal plans.
            </p>

            <h2 className="text-base font-bold text-[#123B32]">3. Pilgrim Responsibilities</h2>
            <p>
              Pilgrims must ensure their Indian passport possesses at least 6 months validity from travel date. It is the responsibility of the traveller to adhere to all local regulations, behavioral codes of the two Holy Sanctuaries, and flight check-in deadlines.
            </p>

            <h2 className="text-base font-bold text-[#123B32]">4. Hotel Proximity Guarantees</h2>
            <p>
              We guarantee that hotel distances listed on our platform reflect measured pedestrian walking meters or dedicated shuttle transport as stated. If an unavoidable maintenance issue causes a hotel substitution, the replacement hotel shall be of equal or closer proximity to the Haram.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
