import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getPackageById } from "@/services/packages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingWizard } from "@/components/booking/BookingWizard";

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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />

      <main className="flex-1 py-10">
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
