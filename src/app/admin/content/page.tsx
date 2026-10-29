import { memoryDb } from "@/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, HelpCircle, Plus } from "lucide-react";

export const metadata = {
  title: "Content & FAQ Management — Ziyara Admin",
};

export default function AdminContentPage() {
  const faqs = memoryDb.faqs;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#123B32]">Content & FAQ Registry</h1>
          <p className="text-xs text-[#707873]">
            Edit customer-facing educational FAQs and transparency advisories.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
        <h2 className="text-sm font-bold text-[#123B32] uppercase tracking-wider flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#285B4D]" />
          Published Frequently Asked Questions ({faqs.length} Total)
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 rounded-2xl border border-[#E7E8E3] bg-[#FAF9F6] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#123B32] text-sm">{faq.question}</span>
                <Badge variant="secondary">{faq.category}</Badge>
              </div>
              <p className="text-[#707873] leading-relaxed whitespace-pre-line">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
