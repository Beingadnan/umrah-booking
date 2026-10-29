import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy — Ziyara",
  description: "How Ziyara protects pilgrim personal information and travel documents.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
              — Data Protection —
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#103D32]">
              Privacy & Document Security Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#707873] mt-1">
              Last updated: October 2026 • Ziyara Technologies Pvt. Ltd.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E7E0D0] p-8 sm:p-12 shadow-xs space-y-6 text-xs sm:text-sm text-[#5A6860] leading-relaxed">
            <h2 className="text-base font-bold text-[#123B32]">1. Information We Collect</h2>
            <p>
              To process your Umrah booking, issue airline tickets, and file electronic visa requests with the Saudi Ministry of Hajj & Umrah, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#202824]">
              <li>Contact details: Name, email address, phone number, and Indian postal address.</li>
              <li>Travel details: Number of passengers, room occupancy preferences, and departure airport.</li>
              <li>Official identification: Passport details and photographs strictly when required for visa filing.</li>
            </ul>

            <h2 className="text-base font-bold text-[#123B32]">2. How We Safeguard Your Documents</h2>
            <p>
              We treat pilgrim documents with the utmost reverence and security. We never store raw passport scans in publicly accessible storage buckets. Passports are submitted directly through secure, encrypted TLS connections to official Ministry portals.
            </p>

            <h2 className="text-base font-bold text-[#123B32]">3. No Sale of Personal Data</h2>
            <p>
              We do not sell, rent, or trade pilgrim data to third-party marketing companies. Data is only shared with authorized airlines (e.g. Saudia, Air India), the Ministry of Hajj & Umrah, and the allocated hotels for room check-in vouchers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
