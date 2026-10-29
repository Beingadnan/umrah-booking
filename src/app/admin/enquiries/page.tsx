import { getEnquiries } from "@/services/enquiries";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, Mail, MapPin, Calendar, Clock } from "lucide-react";
import { AdminEnquiryActions } from "@/components/admin/AdminEnquiryActions";

export const metadata = {
  title: "Enquiries & Callbacks — Ziyara Admin",
};

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#123B32]">Customer Enquiries & Callbacks</h1>
        <p className="text-xs text-[#707873]">
          Inbound leads, custom family group requests, and callback requests.
        </p>
      </div>

      <div className="space-y-4">
        {enquiries.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E7E8E3] p-12 text-center text-xs text-[#707873]">
            No enquiries recorded yet.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-3xl border border-[#E7E8E3] p-6 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#123B32]">{enq.name}</span>
                  <Badge
                    variant={
                      enq.status === "NEW"
                        ? "warning"
                        : enq.status === "CONTACTED"
                        ? "default"
                        : "success"
                    }
                  >
                    {enq.status}
                  </Badge>
                  <span className="text-[10px] text-[#707873]">
                    {new Date(enq.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#707873]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#285B4D]" />
                    {enq.email}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-[#202824]">
                    <Phone className="w-3.5 h-3.5 text-[#285B4D]" />
                    {enq.phone}
                  </span>
                  {enq.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#285B4D]" />
                      {enq.city}
                    </span>
                  )}
                  {enq.travelMonth && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#285B4D]" />
                      {enq.travelMonth}
                    </span>
                  )}
                </div>

                <div className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#E7E8E3] text-xs text-[#202824] leading-relaxed">
                  "{enq.message}"
                </div>
              </div>

              {/* Status Action Buttons */}
              <AdminEnquiryActions enquiryId={enq.id} currentStatus={enq.status} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
