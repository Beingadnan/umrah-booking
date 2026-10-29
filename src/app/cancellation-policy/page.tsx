import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy — Ziyara",
  description: "Transparent, honest cancellation timelines and refund rules.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
              — Consumer Protection —
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#103D32]">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#707873] mt-1">
              Effective Date: November 1, 2026 • Ziyara Technologies Pvt. Ltd.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E7E0D0] p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm text-[#5A6860] leading-relaxed">
            <h2 className="text-base font-bold text-[#123B32]">1. Cancellation Timelines & Refunds</h2>
            <p>
              We understand that unforeseen family, health, or visa issues can affect travel plans. Our refund schedule is calculated against the total package cost:
            </p>

            <div className="border border-[#E7E8E3] rounded-2xl overflow-hidden divide-y divide-[#E7E8E3]">
              <div className="p-4 flex items-center justify-between bg-[#FAF9F6] font-bold text-[#123B32]">
                <span>Cancellation Period</span>
                <span>Refund Eligibility</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span>30 or more days before departure</span>
                <span className="font-semibold text-emerald-800">100% refund (less actual visa & non-refundable airline fees)</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span>15 to 29 days before departure</span>
                <span className="font-semibold text-[#202824]">75% refund of package value</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span>7 to 14 days before departure</span>
                <span className="font-semibold text-[#202824]">50% refund of package value</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span>Less than 7 days or No-Show</span>
                <span className="font-semibold text-red-600">Non-refundable (hotel & airline allocations locked)</span>
              </div>
            </div>

            <h2 className="text-base font-bold text-[#123B32] pt-4">2. Visa Rejection Policy</h2>
            <p>
              In the rare event of a visa rejection by the Saudi Ministry of Foreign Affairs (MOFA), all hotel and ground transportation payments are refunded in full. Only the official Saudi visa issuance fee and embassy service fee are retained by the authorities.
            </p>

            <h2 className="text-base font-bold text-[#123B32] pt-4">3. Refund Processing Mode</h2>
            <p>
              Approved refunds are processed back to the original source bank account via RTGS/NEFT or credit card reversal within <strong>5 to 7 working days</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
