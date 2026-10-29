import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getUserBookings } from "@/services/bookings";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Compass } from "lucide-react";

export const metadata = {
  title: "My Bookings — Ziyara",
  description: "View your past and current Umrah bookings.",
};

export default async function MyBookingsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/sign-in?callbackUrl=/my-account/bookings");
  }

  const bookings = await getUserBookings(user.id, user.email);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#123B32]">All My Bookings</h2>
          <p className="text-xs text-[#707873]">
            Track status, pilgrim allotments, and electronic vouchers.
          </p>
        </div>
        <Link href="/packages">
          <Button size="sm" className="gap-2">
            <span>Explore Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#707873] mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#123B32]">No bookings found</h3>
          <p className="text-xs sm:text-sm text-[#707873] max-w-sm mx-auto">
            You have not submitted any Umrah bookings yet. Explore our packages to begin.
          </p>
          <Link href="/packages">
            <Button size="sm">Browse Packages</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-[#E7E8E3] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs hover:border-[#123B32]/30 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#123B32]">
                    #{b.bookingReference}
                  </span>
                  <Badge variant={b.status === "CONFIRMED" ? "success" : "warning"}>
                    {b.status.replace("_", " ")}
                  </Badge>
                  <Badge variant={b.paymentStatus === "PAID" ? "success" : "secondary"}>
                    {b.paymentStatus}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-[#123B32]">{b.packageName}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#707873]">
                  <span>Departure: {b.departureCity} Airport</span>
                  <span>•</span>
                  <span>{b.travellerCount} Pilgrims ({b.roomType.replace("_", " ")})</span>
                  <span>•</span>
                  <span className="font-bold text-[#123B32]">
                    Total: {formatPriceINR(b.totalAmountInr)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/my-account/bookings/${b.id}`}>
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <span>View Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
