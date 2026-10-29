import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";
import { getBookingById } from "@/services/bookings";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { formatPriceINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Users,
  MapPin,
  Plane,
  ArrowRight,
  Phone,
  Mail,
  Sparkles,
  MessageCircle,
  Footprints,
  Download,
} from "lucide-react";
import { PrintConfirmationButton } from "@/components/booking/PrintConfirmationButton";
import { CopyReferenceButton } from "@/components/booking/CopyReferenceButton";

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
  const bookingDate = new Date(booking.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar user={user} />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* ================= HERO CELEBRATION CARD ================= */}
          <div className="bg-gradient-to-br from-[#103D32] via-[#144A3D] to-[#0A261F] text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#C5A264]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isPaid ? "Payment Verified • Official Booking Confirmed" : "Booking Registered • Pending Final Review"}
                  </span>
                </div>

                <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  Alhamdulillah! Your Pilgrimage is Confirmed
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Peace be upon you, <strong className="text-white">{booking.contactName}</strong>. Your sacred journey has been securely registered in the official Ziyara Pilgrimage Registry.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-5 text-left sm:text-right shrink-0 w-full sm:w-auto">
                <span className="text-[10px] font-bold text-[#C5A264] uppercase tracking-wider block">
                  Official Booking Reference
                </span>
                <div className="flex items-center justify-start sm:justify-end gap-2 mt-1">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-wider">
                    {booking.bookingReference}
                  </span>
                  <CopyReferenceButton reference={booking.bookingReference} />
                </div>
                <span className="text-[11px] text-slate-300 block mt-1">
                  Registered on {bookingDate}
                </span>
              </div>
            </div>
          </div>

          {/* ================= 2-COLUMN MAIN CONTENT ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ================= LEFT COLUMN: MAIN VOUCHER DETAILS (8 COLS) ================= */}
            <div className="lg:col-span-8 space-y-6">
              {/* Card 1: Package & Itinerary Details */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A264]">
                      Package Summary
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                      {booking.packageName}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#103D32] text-white">
                    {booking.packageCategory}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-slate-400 block">Departure City</span>
                    <strong className="text-slate-900 block font-semibold text-sm">
                      {booking.departureCity} (Direct)
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block">Occupancy</span>
                    <strong className="text-slate-900 block font-semibold text-sm">
                      {booking.roomType.replace("_", " ")}
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block">Total Pilgrims</span>
                    <strong className="text-slate-900 block font-semibold text-sm">
                      {booking.travellerCount} {booking.travellerCount > 1 ? "Guests" : "Guest"}
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="text-slate-400 block">Contact Phone</span>
                    <strong className="text-slate-900 block font-semibold text-sm">
                      {booking.contactPhone}
                    </strong>
                  </div>
                </div>

                {/* Special Requests if present */}
                {booking.specialRequests && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                    <span className="font-bold text-slate-700 block mb-1">
                      Included Options & Requests:
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {booking.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              {/* Card 2: Registered Pilgrims Roster */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#C5A264]" />
                    <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                      Registered Pilgrims Roster ({booking.travellers?.length || 0})
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Ministry e-Visa Processing</span>
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {booking.travellers?.map((traveller, idx) => (
                    <div
                      key={traveller.id || idx}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <strong className="text-slate-900 text-sm block">
                            {traveller.fullName}
                          </strong>
                          <span className="text-slate-500 text-[11px]">
                            {traveller.gender} • {traveller.age} years old
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Passport</span>
                          <span className="font-mono font-semibold text-slate-700">
                            {traveller.passportNumber || "To be provided"}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                          Verified
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: What Happens Next? (Roadmap) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                  <Sparkles className="w-5 h-5 text-[#C5A264]" />
                  <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                    What Happens Next? (Roadmap to Departure)
                  </h2>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      step: "1",
                      title: "Concierge Welcome & WhatsApp Group",
                      desc: "Your assigned Senior Pilgrimage Concierge contacts you via WhatsApp & Email within 2 business hours to review your preferences.",
                    },
                    {
                      step: "2",
                      title: "Digital Passport Upload & Saudi e-Visa Issuance",
                      desc: "Submit your digital passport scans via our secure portal. We issue your official Saudi Ministry of Hajj & Umrah e-Visa with mandatory medical insurance.",
                    },
                    {
                      step: "3",
                      title: "Final Departure Pack & Airport Meetup",
                      desc: "Receive confirmed flight e-tickets, hotel booking vouchers, physical luggage tags, and arrival gate instructions for Jeddah / Madinah.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#103D32] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {item.step}
                      </div>
                      <div className="space-y-1">
                        <strong className="text-slate-900 font-semibold text-sm block">
                          {item.title}
                        </strong>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: RECEIPT & CONCIERGE SIDEBAR (4 COLS) ================= */}
            <div className="lg:col-span-4 space-y-6">
              {/* Payment Receipt Voucher */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Payment Receipt
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {booking.paymentStatus}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Reference No:</span>
                    <span className="font-mono font-bold text-slate-900">{booking.bookingReference}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Booking Date:</span>
                    <span className="font-medium text-slate-900">{bookingDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Flights & Saudi Visa:</span>
                    <span className="text-emerald-700 font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>5% GST & Taxes:</span>
                    <span className="text-emerald-700 font-semibold">Included</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="font-bold text-slate-900 text-sm">Total Paid</span>
                    <span className="font-display text-2xl font-bold text-[#103D32]">
                      {formatPriceINR(booking.totalAmountInr)}
                    </span>
                  </div>
                </div>

                {/* Print / Save Receipt Action */}
                <div className="pt-2">
                  <PrintConfirmationButton />
                </div>
              </div>

              {/* Dedicated Concierge Support Card */}
              <div className="bg-gradient-to-br from-emerald-50/70 via-slate-50 to-white rounded-3xl border border-emerald-100 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#103D32] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                    SI
                  </div>
                  <div>
                    <strong className="text-slate-900 text-sm block">Syed Imran</strong>
                    <span className="text-[11px] text-slate-500 block">
                      Senior Pilgrimage Concierge
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Have questions about baggage allowances, Ihram regulations, or special assistance? Your concierge is available 24/7.
                </p>

                <div className="space-y-2">
                  <a
                    href="https://wa.me/919820012345"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href="tel:+919820012345"
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#103D32]" />
                    <span>Call Concierge: +91 98200 12345</span>
                  </a>
                </div>
              </div>

              {/* Quick Navigation Links */}
              <div className="space-y-2">
                <Link href="/my-account/bookings" className="block">
                  <Button className="w-full gap-2 bg-[#103D32] hover:bg-[#194E41] text-white font-semibold py-2.5 rounded-xl shadow-xs cursor-pointer text-xs">
                    <span>Manage in My Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/packages" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-2.5 rounded-xl cursor-pointer text-xs"
                  >
                    Browse Other Packages
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
