import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookingById } from "@/services/bookings";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Phone, Calendar, Users, ShieldCheck } from "lucide-react";
import { AdminBookingWorkflowForm } from "@/components/admin/AdminBookingWorkflowForm";

interface AdminBookingDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "Manage Booking — Ziyara Admin",
};

export default async function AdminBookingDetailPage({ params }: AdminBookingDetailPageProps) {
  const { id } = await params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#707873] hover:text-[#123B32]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Bookings</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E8E3] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#123B32]">
              Ref: #{booking.bookingReference}
            </span>
            <Badge variant={booking.status === "CONFIRMED" ? "success" : "warning"}>
              {booking.status.replace("_", " ")}
            </Badge>
            <Badge variant={booking.paymentStatus === "PAID" ? "success" : "secondary"}>
              {booking.paymentStatus}
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-[#123B32] mt-1">{booking.packageName}</h1>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707873] block">
            Booking Total
          </span>
          <span className="text-2xl font-bold text-[#123B32]">
            {formatPriceINR(booking.totalAmountInr)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Details & Travellers */}
        <div className="lg:col-span-2 space-y-6">
          {/* Primary Contact */}
          <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold text-[#123B32] uppercase tracking-wider">
              Lead Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[#707873] block">Full Name</span>
                <strong className="text-[#202824] block">{booking.contactName}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[#707873] block">Email</span>
                <strong className="text-[#202824] block">{booking.contactEmail}</strong>
              </div>
              <div className="space-y-1">
                <span className="text-[#707873] block">Mobile Phone</span>
                <strong className="text-[#202824] block">{booking.contactPhone}</strong>
              </div>
            </div>
          </div>

          {/* Travellers Table */}
          <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
            <h2 className="text-xs font-bold text-[#123B32] uppercase tracking-wider">
              Pilgrim Passenger Roster ({booking.travellerCount} Persons)
            </h2>
            <div className="border border-[#E7E8E3] rounded-2xl overflow-hidden divide-y divide-[#E7E8E3]">
              {booking.travellers.map((trav, idx) => (
                <div key={trav.id || idx} className="p-3.5 flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center font-bold text-[#123B32]">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-[#202824] block">{trav.fullName}</span>
                      <span className="text-[#707873]">
                        {trav.gender} • {trav.age} Years Old
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#707873]">Passport:</span>{" "}
                    <span className="font-mono font-medium text-[#202824]">
                      {trav.passportNumber || "Not yet uploaded"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-2 shadow-xs text-xs">
              <h2 className="font-bold text-[#123B32] uppercase tracking-wider">
                Special Pilgrim Notes / Requests
              </h2>
              <p className="text-[#707873] bg-[#FAF9F6] p-3 rounded-xl border border-[#E7E8E3]">
                {booking.specialRequests}
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Interactive Workflow Form */}
        <div className="lg:col-span-1">
          <AdminBookingWorkflowForm booking={booking} />
        </div>
      </div>
    </div>
  );
}
