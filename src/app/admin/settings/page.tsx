import { memoryDb } from "@/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Phone, Mail, MapPin, CreditCard, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Platform Settings — Ziyara Admin",
};

export default function AdminSettingsPage() {
  const isRazorpayConfigured = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
  const isResendConfigured = Boolean(process.env.RESEND_API_KEY);
  const isDatabaseLive = Boolean(process.env.DATABASE_URL);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#123B32]">Platform & Business Settings</h1>
        <p className="text-xs text-[#707873]">
          System integrations, statutory credentials, and customer helpline configurations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E8E3] p-8 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-[#123B32] uppercase tracking-wider flex items-center gap-2">
          <Settings className="w-4 h-4 text-[#285B4D]" />
          Third-Party Integrations Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Neon Database */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] space-y-1">
            <span className="text-[#707873] block">PostgreSQL (Neon)</span>
            <div className="flex items-center gap-1.5 pt-1">
              <Badge variant={isDatabaseLive ? "success" : "warning"}>
                {isDatabaseLive ? "Connected" : "Dev Fallback Active"}
              </Badge>
            </div>
            <p className="text-[10px] text-[#707873] pt-1">
              {isDatabaseLive ? "Live Neon connection" : "Running in memory store mode"}
            </p>
          </div>

          {/* Razorpay */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] space-y-1">
            <span className="text-[#707873] block">Payments (Razorpay India)</span>
            <div className="flex items-center gap-1.5 pt-1">
              <Badge variant={isRazorpayConfigured ? "success" : "warning"}>
                {isRazorpayConfigured ? "Production Active" : "Dev Simulator Mode"}
              </Badge>
            </div>
            <p className="text-[10px] text-[#707873] pt-1">
              {isRazorpayConfigured ? "Live API keys set" : "Mock orders & signatures active"}
            </p>
          </div>

          {/* Resend Email */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] space-y-1">
            <span className="text-[#707873] block">Transactional Email (Resend)</span>
            <div className="flex items-center gap-1.5 pt-1">
              <Badge variant={isResendConfigured ? "success" : "warning"}>
                {isResendConfigured ? "Live Dispatch" : "Console Fallback"}
              </Badge>
            </div>
            <p className="text-[10px] text-[#707873] pt-1">
              {isResendConfigured ? "Resend API active" : "Emails logged to dev console"}
            </p>
          </div>
        </div>

        {/* Business Contact Configuration */}
        <div className="pt-4 border-t border-[#E7E8E3] space-y-4 text-xs">
          <h3 className="font-bold text-[#123B32] uppercase tracking-wider">
            Statutory & Official Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-[#E7E8E3] bg-[#FAF9F6]">
              <span className="text-[#707873] block mb-0.5">Customer Support Hotline</span>
              <strong className="text-[#123B32] font-semibold">{memoryDb.settings.contactPhone}</strong>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E7E8E3] bg-[#FAF9F6]">
              <span className="text-[#707873] block mb-0.5">Concierge Email</span>
              <strong className="text-[#123B32] font-semibold">{memoryDb.settings.contactEmail}</strong>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E7E8E3] bg-[#FAF9F6]">
              <span className="text-[#707873] block mb-0.5">Registered Office</span>
              <strong className="text-[#123B32] font-semibold">{memoryDb.settings.officeAddress}</strong>
            </div>
            <div className="p-3.5 rounded-xl border border-[#E7E8E3] bg-[#FAF9F6]">
              <span className="text-[#707873] block mb-0.5">Saudi Emergency Hotline</span>
              <strong className="text-[#123B32] font-semibold">{memoryDb.settings.emergencyHelpline}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
