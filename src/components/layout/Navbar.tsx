"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowRight, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/common/ArchLogo";

interface NavbarProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "CUSTOMER" | "ADMIN";
  } | null;
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/packages", label: "Umrah Packages" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E8ECE9] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Exact Logo & Tagline */}
          <Link href="/" className="group py-1 hover:opacity-95 transition-opacity">
            <BrandLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[13px] tracking-wide transition-colors relative py-1 font-medium ${
                    isActive ? "text-[#152F26] font-semibold" : "text-[#556059] hover:text-[#152F26]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C59A4E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden sm:flex items-center gap-5">
            {/* Search Icon */}
            <Link
              href="/packages"
              className="text-[#556059] hover:text-[#152F26] p-2 rounded-full hover:bg-black/5 transition-colors"
              title="Search packages"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Auth / Account */}
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "ADMIN" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs text-[#152F26] bg-[#FBF8F1] border-[#C59A4E]/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C59A4E]" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link href="/my-account">
                  <Button variant="ghost" size="sm" className="gap-2 text-xs font-semibold text-[#152F26]">
                    <User className="w-3.5 h-3.5" />
                    <span>{user.name.split(" ")[0]}</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/auth/sign-in" className="text-xs sm:text-sm font-semibold text-[#152F26] hover:text-[#C59A4E] transition-colors">
                Sign In
              </Link>
            )}

            {/* Primary CTA (Explore Umrah Packages) */}
            <Link href="/packages">
              <Button size="md" className="rounded-full bg-[#152F26] hover:bg-[#1E4337] active:scale-[0.98] text-white px-5 py-2.5 text-xs sm:text-sm font-medium gap-2 shadow-sm transition-all">
                <span>Explore Umrah Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link href="/packages">
              <Button size="sm" className="rounded-full bg-[#152F26] text-xs px-3.5 py-1.5 font-medium text-white">
                Packages
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#202824] hover:bg-[#EEE8DD]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#E7E8E3] bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#202824] hover:bg-[#FAF9F6]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-[#E7E8E3] flex flex-col gap-2">
            {user ? (
              <Link href="/my-account" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" />
                  My Account ({user.name})
                </Button>
              </Link>
            ) : (
              <Link href="/auth/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/packages" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-full bg-[#123B32]">
                Explore Packages
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
