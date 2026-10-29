import { getCurrentUser } from "@/lib/auth";
import { getHotels, getPackages } from "@/services/packages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HotelsClientView } from "@/components/hotels/HotelsClientView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Audited Hotels in Makkah & Madinah — Ziyara",
  description:
    "Explore handpicked, verified luxury hotels in Makkah and Madinah with audited walking distances to Masjid al-Haram and Masjid an-Nabawi.",
};

export default async function HotelsPage() {
  const [user, hotels, packages] = await Promise.all([
    getCurrentUser(),
    getHotels(),
    getPackages(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />
      <main className="flex-1">
        <HotelsClientView hotels={hotels} packages={packages} />
      </main>
      <Footer />
    </div>
  );
}
