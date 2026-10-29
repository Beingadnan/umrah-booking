import { notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getPackageById } from "@/services/packages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { ArrowLeft, ShieldCheck, Clock, Sparkles } from "lucide-react";

interface BookingPageProps {
  params: Promise<{ packageId: string }>;
  searchParams: Promise<{
    roomType?: string;
    pax?: string;
    dep?: string;
  }>;
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book Umrah Package — Ziyara",
  description: "Complete your multi-step Umrah booking request with transparent pricing, audited hotel distances, and seamless concierge support.",
};

export default async function BookingPage({ params, searchParams }: BookingPageProps) {
  const { packageId } = await params;
  const sParams = await searchParams;

  const [user, pkg] = await Promise.all([
    getCurrentUser(),
    getPackageById(packageId),
  ]);

  if (!pkg) {
    notFound();
  }

  const initialPax = parseInt(sParams.pax || "2", 10) || 2;
  const initialRoomType = sParams.roomType || "SHARING_4";
  const initialDepartureId = sParams.dep;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar user={user} />

      {/* Top Breadcrumb & Trust Banner */}
      <section className="border-b border-slate-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link
                href={`/packages/${pkg.slug}`}
                className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-[#103D32] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to {pkg.name}</span>
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
                Express Checkout
              </span>
            </div>

            {/* Micro Trust Pills */}
            <div className="flex items-center gap-4 text-[11px] text-slate-600">
              <div className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ministry Licensed</span>
              </div>
              <div className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C5A264] shrink-0" />
                <span>Instant Seat Lock</span>
              </div>
              <div className="hidden md:inline-flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Wizard Area */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingWizard
            packageData={pkg}
            initialRoomType={initialRoomType}
            initialPax={initialPax}
            initialDepartureId={initialDepartureId}
            userEmail={user?.email || ""}
            userName={user?.name || ""}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
