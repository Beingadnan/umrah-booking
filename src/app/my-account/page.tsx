import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getUserBookings } from "@/services/bookings";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText,
  Phone,
  Compass,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "My Account — Ziyara",
  description: "View your pilgrim dashboard and manage bookings.",
};

export default async function CustomerOverviewPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const bookings = await getUserBookings(user.id, user.email);
  const activeBooking = bookings[0];

  return (
    <div className="space-y-8">
      {/* Active Trip Banner */}
      {activeBooking ? (
        <div className="bg-white rounded-3xl border border-[#E7E8E3] overflow-hidden shadow-xs">
          <div className="bg-[#123B32] p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="gold" className="text-xs uppercase">
                  {activeBooking.status.replace("_", " ")}
                </Badge>
                <span className="text-xs text-[#EEE8DD]/70">Ref: #{activeBooking.bookingReference}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {activeBooking.packageName}
              </h2>
              <p className="text-xs sm:text-sm text-[#EEE8DD]/80">
                Departure from {activeBooking.departureCity} Airport • {activeBooking.travellerCount} Pilgrims • {activeBooking.roomType.replace("_", " ")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Link href={`/my-account/bookings/${activeBooking.id}`}>
                <Button variant="gold" size="md" className="gap-2 font-bold">
                  <span>View Booking Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs bg-[#FAF9F6]">
            <div>
              <span className="text-[#707873] font-medium block">Total Amount</span>
              <span className="text-lg font-bold text-[#123B32]">
                {formatPriceINR(activeBooking.totalAmountInr)}
              </span>
            </div>
            <div>
              <span className="text-[#707873] font-medium block">Payment Status</span>
              <Badge
                variant={activeBooking.paymentStatus === "PAID" ? "success" : "warning"}
                className="mt-1"
              >
                {activeBooking.paymentStatus}
              </Badge>
            </div>
            <div>
              <span className="text-[#707873] font-medium block">Dedicated Concierge</span>
              <span className="text-xs font-semibold text-[#123B32] flex items-center gap-1 mt-1">
                <Phone className="w-3.5 h-3.5 text-[#285B4D]" />
                +91 98200 12345
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#707873] mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#123B32]">No active bookings yet</h3>
          <p className="text-xs sm:text-sm text-[#707873] max-w-sm mx-auto">
            Explore our verified Umrah packages departing from your preferred Indian airport.
          </p>
          <Link href="/packages">
            <Button size="sm" className="gap-2">
              <span>Find Umrah Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Grid: Recent Bookings & Pre-departure Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookings List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#123B32]">Recent Bookings</h3>
            <Link
              href="/my-account/bookings"
              className="text-xs text-[#285B4D] font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-[#E7E8E3] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#123B32]/30 transition-all shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#123B32] font-mono">
                      #{b.bookingReference}
                    </span>
                    <Badge variant={b.status === "CONFIRMED" ? "success" : "warning"}>
                      {b.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-[#123B32]">{b.packageName}</h4>
                  <p className="text-xs text-[#707873]">
                    {b.departureCity} • {b.travellerCount} Persons • {formatPriceINR(b.totalAmountInr)}
                  </p>
                </div>

                <Link href={`/my-account/bookings/${b.id}`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <span>Manage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Card */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#123B32]">Pilgrim Checklist</h3>
          <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#123B32] block">Indian Passport Validity</strong>
                  <span className="text-[#707873]">Must have at least 6 months validity.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#103D32] block">Saudi Electronic Umrah Visa</strong>
                  <span className="text-[#707873]">Filed and tracked by Ziyara concierge.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#123B32] block">Nusuk Rawdah Appointment</strong>
                  <span className="text-[#707873]">Coordinated before entering Madinah.</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E7E8E3]">
              <Link href="/my-account/documents" className="block w-full">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Full Document Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
