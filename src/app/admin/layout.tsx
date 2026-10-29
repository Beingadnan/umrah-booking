import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  Settings,
  ShieldAlert,
  Compass,
  ArrowLeft,
} from "lucide-react";

import { ArchLogo } from "@/components/common/ArchLogo";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Strict server-side role check: Only role === "ADMIN" can enter
  if (!user) {
    redirect("/auth/sign-in?callbackUrl=/admin");
  }

  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-[#F8F3E8] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-red-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-red-800">403 — Unauthorized</h1>
          <p className="text-xs text-[#707873] leading-relaxed">
            Your account (<strong className="text-[#202824]">{user.email}</strong>) does not have administrative privileges. Admin access requires the ADMIN role.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/auth/sign-in"
              className="text-xs font-semibold text-[#103D32] hover:underline"
            >
              Sign in with Admin Credentials
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold text-[#707873] hover:underline"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/packages", label: "Packages", icon: Package },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/enquiries", label: "Enquiries & Callbacks", icon: MessageSquare },
    { href: "/admin/content", label: "Content & FAQ", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#103D32] text-white flex flex-col shrink-0 hidden md:flex border-r border-[#1a4a40]">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <ArchLogo className="w-8 h-10 text-[#C5A264]" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-widest font-serif">
                ZIYARA
              </span>
              <span className="text-[10px] text-[#C5A264] uppercase tracking-wider font-mono">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#EEE8DD]/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4 text-[#C6A66B]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 text-xs text-[#EEE8DD]/60 flex items-center justify-between">
          <Link href="/" className="hover:text-white flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-[#E7E8E3] bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#123B32] uppercase tracking-wider">
              Admin Workspace
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-[#123B32]">{user.name}</span>
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              SUPERADMIN
            </span>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
