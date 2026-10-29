import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getBookingById } from "@/services/bookings";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CancellationRequestForm } from "@/components/booking/CancellationRequestForm";
import {
  ArrowLeft,
  Calendar,
  Users,
  Footprints,
  ShieldCheck,
  CreditCard,
  Building,
  FileCheck2,
  Phone,
} from "lucide-react";

interface BookingDetailPageProps {
  params: Promise<{ bookingId: string }>;
}

export const metadata = {
  title: "Booking Details — Ziyara",
  description: "View and manage your Umrah booking request.",
};

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const { bookingId } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/sign-in?callbackUrl=/my-account/bookings/${bookingId}`);
  }

  const booking = await getBookingById(bookingId);
  if (!booking) {
    notFound();
  }

  // Strict ownership check: Must be ADMIN or the user who created it
  const isOwner =
    booking.userId === user.id ||
    booking.contactEmail.toLowerCase() === user.email.toLowerCase();

  if (!isOwner && user.role !== "ADMIN") {
    return (
      <div className="bg-white rounded-3xl border border-red-200 p-8 text-center space-y-3">
        <h2 className="text-lg font-bold text-red-700">Access Denied</h2>
        <p className="text-xs text-[#707873]">
          You do not have permission to view this booking record.
        </p>
        <Link href="/my-account">
          <Button size="sm">Return to My Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/my-account/bookings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#707873] hover:text-[#123B32]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Bookings</span>
        </Link>
      </div>

      {/* Main Booking Header */}
      <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E8E3] gap-4">
          <div className="space-y-1">
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
            <h1 className="text-2xl font-extrabold text-[#123B32]">{booking.packageName}</h1>
            <p className="text-xs text-[#707873]">
              Departure: {booking.departureCity} Airport • Room: {booking.roomType.replace("_", " ")}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-bold text-[#707873] uppercase tracking-wider block">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-[#123B32]">
              {formatPriceINR(booking.totalAmountInr)}
            </span>
          </div>
        </div>

        {/* Pilgrims List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#123B32] uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#C6A66B]" />
            Registered Pilgrims ({booking.travellerCount} Persons)
          </h3>
          <div className="border border-[#E7E8E3] rounded-2xl overflow-hidden divide-y divide-[#E7E8E3]">
            {booking.travellers.map((t, idx) => (
              <div key={t.id || idx} className="p-4 flex items-center justify-between text-xs bg-white">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center font-bold text-[#123B32]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-[#202824] block">{t.fullName}</span>
                    <span className="text-[#707873]">
                      {t.gender} • {t.age} Years Old
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#707873]">Passport:</span>{" "}
                  <span className="font-mono font-medium text-[#202824]">
                    {t.passportNumber || "Verification in progress"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        {booking.specialRequests && (
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E7E8E3] space-y-1 text-xs">
            <span className="font-bold text-[#123B32] block">Special Requests</span>
            <p className="text-[#707873]">{booking.specialRequests}</p>
          </div>
        )}

        {/* Cancellation Eligibility & Request */}
        <CancellationRequestForm
          bookingId={booking.id}
          currentStatus={booking.status}
        />

        {/* Payment Reconciliation Info */}
        <div className="bg-[#FAF6ED] p-6 rounded-2xl border border-[#E8E0D0] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#103D32] uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#C5A264]" />
              Payment & Official Banking Registry
            </h3>
            <span className="text-xs font-semibold text-[#103D32]">Status: {booking.paymentStatus}</span>
          </div>

          <p className="text-xs text-[#66726A]">
            Payments can be made via direct RTGS / NEFT transfer to our official bank account or verified online gateway.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-[#E8E0D0]">
            <div>
              <span className="text-[#66726A] block">Beneficiary Name:</span>
              <strong className="text-[#103D32]">Ziyara Technologies Pvt Ltd</strong>
            </div>
            <div>
              <span className="text-[#66726A] block">Bank Name:</span>
              <strong className="text-[#103D32]">HDFC Bank Ltd (BKC Branch)</strong>
            </div>
            <div>
              <span className="text-[#66726A] block">Account Number:</span>
              <strong className="text-[#103D32] font-mono">50200089214532</strong>
            </div>
            <div>
              <span className="text-[#66726A] block">IFSC Code:</span>
              <strong className="text-[#103D32] font-mono">HDFC0000060</strong>
            </div>
          </div>
        </div>

        {/* Concierge Help */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#66726A]">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C5A264]" />
            <span>Need assistance? Call concierge: +91 98200 12345</span>
          </div>
          <Link href="/contact">
            <Button variant="outline" size="sm" className="text-xs border-[#E8E0D0] text-[#18241E]">
              Contact Concierge Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
