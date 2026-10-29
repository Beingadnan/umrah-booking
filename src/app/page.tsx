import { getCurrentUser } from "@/lib/auth";
import { getPackages } from "@/services/packages";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { HotelTransparency } from "@/components/home/HotelTransparency";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FaqSection } from "@/components/home/FaqSection";
import { SpiritualZiyaratSection } from "@/components/home/SpiritualZiyaratSection";
import { PilgrimStoriesSection } from "@/components/home/PilgrimStoriesSection";
import { ConciergeServicesSection } from "@/components/home/ConciergeServicesSection";
import { UmrahRitualGuide } from "@/components/home/UmrahRitualGuide";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ziyara — Your Sacred Journey, Beautifully Arranged | Premium Umrah Booking",
  description:
    "Ziyara is a bespoke premium Umrah and pilgrimage booking platform. Experience luxury hospitality, audited Haram proximity, transparent pricing, and spiritual simplicity.",
};

export default async function HomePage() {
  const [user, packages] = await Promise.all([
    getCurrentUser(),
    getPackages(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />
      <main className="flex-1">
        <Hero />
        <TrustIndicators />
        <FeaturedPackages packages={packages} />
        <HotelTransparency />
        <SpiritualZiyaratSection />
        <ConciergeServicesSection />
        <WhyChooseUs />
        <UmrahRitualGuide />
        <HowItWorks />
        <PilgrimStoriesSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
