import Link from "next/link";
import { getAllBookingsAdmin } from "@/services/bookings";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, ArrowRight } from "lucide-react";

interface AdminBookingsPageProps {
  searchParams: Promise<{
    status?: string;
    paymentStatus?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: "Booking Management — Ziyara Admin",
};

export default async function AdminBookingsPage({ searchParams }: AdminBookingsPageProps) {
  const params = await searchParams;
  const bookings = await getAllBookingsAdmin({
    status: params.status,
    paymentStatus: params.paymentStatus,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#123B32]">Booking Registry</h1>
          <p className="text-xs text-[#707873]">
            Manage reservations, traveller allocations, status transitions, and payments.
          </p>
        </div>

        {/* Filter Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { label: "All", href: "/admin/bookings" },
            { label: "Pending", href: "/admin/bookings?status=PENDING_CONFIRMATION" },
            { label: "Confirmed", href: "/admin/bookings?status=CONFIRMED" },
            { label: "Paid", href: "/admin/bookings?paymentStatus=PAID" },
          ].map((pill) => (
            <Link key={pill.label} href={pill.href}>
              <Button variant="outline" size="sm" className="text-xs">
                {pill.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#E7E8E3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] text-[#707873] uppercase text-[10px] tracking-wider border-b border-[#E7E8E3]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Reference</th>
                <th className="py-3.5 px-4 font-semibold">Lead Contact</th>
                <th className="py-3.5 px-4 font-semibold">Package Name</th>
                <th className="py-3.5 px-4 font-semibold">Pilgrims</th>
                <th className="py-3.5 px-4 font-semibold">Amount</th>
                <th className="py-3.5 px-4 font-semibold">Booking Status</th>
                <th className="py-3.5 px-4 font-semibold">Payment</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E8E3]">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-[#707873]">
                    No bookings found matching current filters.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FAF9F6]/50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#123B32]">
                      #{b.bookingReference}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#202824]">
                      <div>{b.contactName}</div>
                      <div className="text-[10px] text-[#707873]">{b.contactEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#707873] truncate max-w-[180px]">
                      {b.packageName}
                    </td>
                    <td className="py-3.5 px-4 text-[#202824]">
                      {b.travellerCount} Persons ({b.roomType.replace("_", " ")})
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#123B32]">
                      {formatPriceINR(b.totalAmountInr)}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={b.status === "CONFIRMED" ? "success" : "warning"}>
                        {b.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={b.paymentStatus === "PAID" ? "success" : "secondary"}>
                        {b.paymentStatus}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/admin/bookings/${b.id}`}>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          Manage
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
