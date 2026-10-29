import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { User, Calendar, FileText, Settings, LogOut, Compass } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in?callbackUrl=/my-account");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={user} />

      {/* Dashboard Sub-Header */}
      <div className="border-b border-[#E7E8E3] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6A66B]">
                Pilgrim Portal
              </span>
              <h1 className="text-2xl font-extrabold text-[#123B32]">
                Assalamu Alaikum, {user.name}
              </h1>
              <p className="text-xs text-[#707873] mt-0.5">{user.email}</p>
            </div>

            {/* Sub-nav Links */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Link
                href="/my-account"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#123B32] hover:bg-[#FAF9F6] border border-transparent hover:border-[#E7E8E3] transition-all flex items-center gap-1.5 shrink-0"
              >
                <Compass className="w-3.5 h-3.5 text-[#285B4D]" />
                <span>Overview</span>
              </Link>
              <Link
                href="/my-account/bookings"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#123B32] hover:bg-[#FAF9F6] border border-transparent hover:border-[#E7E8E3] transition-all flex items-center gap-1.5 shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-[#285B4D]" />
                <span>My Bookings</span>
              </Link>
              <Link
                href="/my-account/documents"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#123B32] hover:bg-[#FAF9F6] border border-transparent hover:border-[#E7E8E3] transition-all flex items-center gap-1.5 shrink-0"
              >
                <FileText className="w-3.5 h-3.5 text-[#285B4D]" />
                <span>Document Checklist</span>
              </Link>
              <Link
                href="/my-account/profile"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#123B32] hover:bg-[#FAF9F6] border border-transparent hover:border-[#E7E8E3] transition-all flex items-center gap-1.5 shrink-0"
              >
                <User className="w-3.5 h-3.5 text-[#285B4D]" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
