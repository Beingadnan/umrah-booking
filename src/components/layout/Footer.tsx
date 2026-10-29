import Link from "next/link";
import { Compass, ShieldCheck, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { ArchLogo } from "@/components/common/ArchLogo";

export function Footer() {
  return (
    <footer className="bg-[#123B32] text-white pt-16 pb-12 border-t border-[#1a4a40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <ArchLogo size={38} variant="gold" />
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-[0.06em] text-white uppercase">
                  Ziyara
                </span>
                <span className="text-[7.5px] font-semibold tracking-[0.25em] text-[#C6A66B] uppercase">
                  PREMIUM UMRAH & PILGRIMAGE
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#EEE8DD]/80 leading-relaxed max-w-sm">
              India’s first radically transparent Umrah booking platform. We eliminate vague hotel distances, hidden charges, and agent ambiguity so you can embark on your sacred journey with peace of mind.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#C6A66B] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Haram Distances</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#C6A66B] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>IATA & Ministry Compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C6A66B]">Packages</h4>
            <ul className="space-y-2 text-sm text-[#EEE8DD]/80">
              <li>
                <Link href="/packages?category=VIP" className="hover:text-white transition-colors">
                  Executive VIP Umrah
                </Link>
              </li>
              <li>
                <Link href="/packages?category=DELUXE" className="hover:text-white transition-colors">
                  Classic Deluxe Family
                </Link>
              </li>
              <li>
                <Link href="/packages?category=ECONOMY" className="hover:text-white transition-colors">
                  Comfort Economy Packages
                </Link>
              </li>
              <li>
                <Link href="/packages?duration=short" className="hover:text-white transition-colors">
                  10-Day Working Professional
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition-colors">
                  All Departure Cities
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Guides */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C6A66B]">Transparency</h4>
            <ul className="space-y-2 text-sm text-[#EEE8DD]/80">
              <li>
                <Link href="/#hotel-transparency" className="hover:text-white transition-colors">
                  Verified Walking Distances
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How Bookings Work
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Ziyara
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-white transition-colors">
                  Transparent Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C6A66B]">Contact & Helpline</h4>
            <div className="space-y-2.5 text-xs text-[#EEE8DD]/80">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>+91 98200 12345 (Toll-Free India)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>concierge@ziyara.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A66B] shrink-0 mt-0.5" />
                <span>BKC, Bandra East, Mumbai, Maharashtra 400051</span>
              </div>
              <p className="pt-2 text-[11px] text-[#EEE8DD]/60">
                Saudi 24/7 Ground Helpline: +966 50 123 4567
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#EEE8DD]/60 gap-4">
          <p>© 2026 Ziyara Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cancellation-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
