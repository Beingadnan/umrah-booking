import Link from "next/link";
import { getAllBookingsAdmin } from "@/services/bookings";
import { getEnquiries } from "@/services/enquiries";
import { getAllCustomersAdmin } from "@/services/users";
import { getPackages } from "@/services/packages";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  MessageSquare,
  DollarSign,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "Admin Overview — Ziyara Admin",
};

export default async function AdminOverviewPage() {
  const [bookings, enquiries, customers, packages] = await Promise.all([
    getAllBookingsAdmin(),
    getEnquiries(),
    getAllCustomersAdmin(),
    getPackages(),
  ]);

  const pendingBookings = bookings.filter((b) => b.status === "PENDING_CONFIRMATION");
  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const newEnquiries = enquiries.filter((e) => e.status === "NEW");

  // Calculate gross booking requests total vs actual paid revenue
  const totalBookingPipelineInr = bookings.reduce((sum, b) => sum + b.totalAmountInr, 0);
  const totalPaidRevenueInr = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce((sum, b) => sum + b.totalAmountInr, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#123B32]">Operations Overview</h1>
        <p className="text-xs text-[#707873]">
          Live platform metrics, booking requests, and pending customer enquiries.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E8E3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#707873] uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#123B32]">
              <Calendar className="w-4 h-4 text-[#285B4D]" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#123B32]">{bookings.length}</div>
          <span className="text-[11px] text-amber-700 font-medium">
            {pendingBookings.length} awaiting confirmation
          </span>
        </div>

        {/* Confirmed Pilgrims */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E8E3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#707873] uppercase tracking-wider">
              Confirmed Bookings
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#123B32]">{confirmedBookings.length}</div>
          <span className="text-[11px] text-emerald-700 font-medium">
            Seats & Vouchers Confirmed
          </span>
        </div>

        {/* Actionable Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E8E3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#707873] uppercase tracking-wider">
              New Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#123B32]">{newEnquiries.length}</div>
          <span className="text-[11px] text-[#707873]">
            {enquiries.length} total customer leads
          </span>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-[#E7E8E3] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#707873] uppercase tracking-wider">
              Paid Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] text-[#C6A66B] flex items-center justify-center font-bold text-xs">
              ₹
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-800">
            {formatPriceINR(totalPaidRevenueInr)}
          </div>
          <span className="text-[11px] text-[#707873] block truncate">
            Pipeline: {formatPriceINR(totalBookingPipelineInr)}
          </span>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#123B32]">Recent Pilgrim Bookings</h2>
          <Link href="/admin/bookings">
            <Button variant="outline" size="sm" className="text-xs">
              View All Bookings
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] text-[#707873] uppercase text-[10px] tracking-wider border-y border-[#E7E8E3]">
              <tr>
                <th className="py-3 px-4 font-semibold">Reference</th>
                <th className="py-3 px-4 font-semibold">Lead Contact</th>
                <th className="py-3 px-4 font-semibold">Package</th>
                <th className="py-3 px-4 font-semibold">Pilgrims</th>
                <th className="py-3 px-4 font-semibold">Total (INR)</th>
                <th className="py-3 px-4 font-semibold">Booking Status</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E8E3]">
              {bookings.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-[#FAF9F6]/50">
                  <td className="py-3 px-4 font-mono font-bold text-[#123B32]">
                    #{b.bookingReference}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#202824]">
                    <div>{b.contactName}</div>
                    <div className="text-[10px] text-[#707873]">{b.contactPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-[#707873] truncate max-w-[150px]">
                    {b.packageName}
                  </td>
                  <td className="py-3 px-4 text-[#202824]">
                    {b.travellerCount} ({b.roomType.replace("_", " ")})
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#123B32]">
                    {formatPriceINR(b.totalAmountInr)}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={b.status === "CONFIRMED" ? "success" : "warning"}>
                      {b.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={b.paymentStatus === "PAID" ? "success" : "secondary"}>
                      {b.paymentStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/admin/bookings/${b.id}`}>
                      <Button variant="ghost" size="sm" className="text-xs h-8 px-2.5">
                        Manage
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
