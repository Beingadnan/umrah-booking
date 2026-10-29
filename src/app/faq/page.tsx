import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqSection } from "@/components/home/FaqSection";

export const metadata = {
  title: "Frequently Asked Questions — Ziyara",
  description: "Comprehensive pilgrim answers on visas, packages, hotels, and cancellation policies.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 py-12">
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
