import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getBookingById } from "@/services/bookings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPriceINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  Calendar,
  Users,
  Building2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Lock,
} from "lucide-react";
import { PrintConfirmationButton } from "@/components/booking/PrintConfirmationButton";

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Booking Confirmation — Ziyara",
  description: "Your Umrah pilgrimage booking summary, confirmation reference, and next steps.",
};

export default async function BookingConfirmationPage({ params }: ConfirmationPageProps) {
  const { bookingId } = await params;
  const [user, booking] = await Promise.all([
    getCurrentUser(),
    getBookingById(bookingId),
  ]);

  if (!booking) {
    notFound();
  }

  const isPaid = booking.paymentStatus === "PAID";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Header with verified badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isPaid
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {isPaid ? "Payment Verified • Booking Confirmed" : "Booking Registered • Pending Final Review"}
                  </span>
                  <span className="text-xs text-[#66726A]">Ref: #{booking.bookingReference}</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#103D32]">
                  {isPaid ? "Your Sacred Journey is Confirmed" : "Pilgrimage Request Received"}
                </h1>

                <p className="text-xs sm:text-sm text-[#66726A]">
                  Thank you, <strong className="text-[#18241E]">{booking.contactName}</strong>. Your reservation is securely logged in the Ziyara pilgrimage registry.
                </p>
              </div>
            </div>

            {/* Reference Callout */}
            <div className="bg-[#FAF6ED] rounded-2xl border border-[#E8E0D0] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                  Official Tracking Reference
                </span>
                <span className="text-2xl font-black text-[#103D32] font-mono tracking-wider">
                  {booking.bookingReference}
                </span>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-[10px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                  Total Amount ({booking.paymentStatus})
                </span>
                <span className="font-display text-2xl font-bold text-[#103D32]">
                  {formatPriceINR(booking.totalAmountInr)}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block">GST & Taxes Included</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white rounded-2xl border border-[#E8E0D0] p-5">
              <div className="space-y-1">
                <span className="text-[#66726A] block">Selected Package</span>
                <span className="font-bold text-[#103D32] text-sm">{booking.packageName}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[#66726A] block">Departure City</span>
                <span className="font-bold text-[#103D32] text-sm">{booking.departureCity} Airport</span>
              </div>

              <div className="space-y-1">
                <span className="text-[#66726A] block">Room Occupancy & Pilgrims</span>
                <span className="font-semibold text-[#18241E]">
                  {booking.roomType.replace("_", " ")} ({booking.travellerCount} Persons)
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[#66726A] block">Contact Details</span>
                <span className="font-semibold text-[#18241E]">
                  {booking.contactEmail} • {booking.contactPhone}
                </span>
              </div>
            </div>

            {/* Traveler Names List */}
            <div className="p-4 rounded-2xl border border-[#E8E0D0] bg-[#FAF6ED] space-y-2">
              <span className="text-[10.5px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                Registered Pilgrims
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#18241E]">
                {booking.travellers?.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#103D32] text-white flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{t.fullName}</span>
                    <span className="text-[10px] text-[#66726A]">({t.gender}, {t.age} yrs)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps Checklist */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#103D32] uppercase tracking-wider">
                What Happens Next?
              </h3>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Concierge Welcome & Verification",
                    desc: "Your assigned Ziyara pilgrimage concierge contacts you via WhatsApp & Email within 2 business hours.",
                  },
                  {
                    step: "2",
                    title: "Saudi Ministry Visa Submission",
                    desc: "Submit your passport copies digitally. We issue the official e-Visa with mandatory Saudi health insurance.",
                  },
                  {
                    step: "3",
                    title: "Departure Pack & Airport Meetup",
                    desc: "Receive your verified hotel confirmation vouchers, flight e-tickets, and arrival airport gate instructions.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 text-xs">
                    <span className="w-6 h-6 rounded-full bg-[#103D32] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div className="space-y-0.5">
                      <strong className="text-[#103D32] block font-semibold">{item.title}</strong>
                      <span className="text-[#66726A]">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#E8E0D0] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link href="/my-account/bookings" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto gap-2 bg-[#103D32] hover:bg-[#1F5446] text-white">
                    <span>Manage in My Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <PrintConfirmationButton />
              </div>

              <Link href="/packages" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto border-[#E8E0D0] text-[#18241E]">
                  Explore More Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
