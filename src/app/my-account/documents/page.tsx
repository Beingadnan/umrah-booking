import { FileText, CheckCircle2, AlertCircle, ShieldAlert, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Document Guidelines — Ziyara",
  description: "Official documentation checklist and visa requirements for Indian pilgrims.",
};

export default function DocumentsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-[#123B32]">Pilgrim Document Checklist</h2>
        <p className="text-xs text-[#707873]">
          Official requirements mandated by the Ministry of Hajj & Umrah for Indian passport holders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document 1: Indian Passport */}
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
            <FileText className="w-5 h-5 text-[#285B4D]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#123B32]">1. Indian Passport</h3>
            <p className="text-xs text-[#707873] mt-1">
              Must be valid for at least <strong>6 months</strong> from your scheduled departure date.
            </p>
          </div>
          <div className="space-y-1.5 text-xs text-[#707873]">
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Scanned color copy of first page & last page</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Minimum 2 blank pages required for entry stamps</span>
            </div>
          </div>
        </div>

        {/* Document 2: White Background Photographs */}
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
            <FileText className="w-5 h-5 text-[#285B4D]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#123B32]">2. Pilgrim Photograph</h3>
            <p className="text-xs text-[#707873] mt-1">
              Recent passport-sized photo taken within the past 3 months.
            </p>
          </div>
          <div className="space-y-1.5 text-xs text-[#707873]">
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Pure white background without border</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>80% face visibility, dark clothing recommended</span>
            </div>
          </div>
        </div>

        {/* Document 3: PAN Card & Remittance */}
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
            <FileText className="w-5 h-5 text-[#285B4D]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#123B32]">3. PAN Card (Lead Pilgrim)</h3>
            <p className="text-xs text-[#707873] mt-1">
              Required under Reserve Bank of India (RBI) Liberalised Remittance Scheme (LRS) regulations.
            </p>
          </div>
          <div className="space-y-1.5 text-xs text-[#707873]">
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>PAN number must match bank transfer account</span>
            </div>
          </div>
        </div>

        {/* Document 4: Vaccination / Medical */}
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
            <FileText className="w-5 h-5 text-[#285B4D]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#123B32]">4. Meningitis / Health Certificate</h3>
            <p className="text-xs text-[#707873] mt-1">
              Standard quadrivalent meningitis vaccination certificate issued by authorized clinic.
            </p>
          </div>
          <div className="space-y-1.5 text-xs text-[#707873]">
            <div className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Valid for 3-5 years from inoculation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security notice regarding storage */}
      <div className="bg-[#FAF9F6] border border-[#E7E8E3] rounded-3xl p-6 flex items-start gap-4 text-xs text-[#707873] leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-[#C6A66B] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#123B32] block font-semibold mb-0.5">
            Privacy and Document Security Policy
          </strong>
          We never store sensitive passport scans in public storage buckets or expose permanent links. All documents are transmitted via encrypted TLS channels strictly for Ministry of Hajj & Umrah visa clearance and deleted post-travel according to our data privacy rules.
        </div>
      </div>
    </div>
  );
}
