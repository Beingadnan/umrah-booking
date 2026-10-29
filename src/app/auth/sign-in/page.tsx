"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchLogo } from "@/components/common/ArchLogo";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      if (callbackUrl) {
        router.push(callbackUrl);
      } else if (data.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/my-account");
      }
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || "Invalid credentials.");
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex flex-col items-center gap-1.5 group">
            <ArchLogo className="w-10 h-12 text-[#C5A264]" />
            <span className="text-2xl font-bold tracking-widest text-[#103D32] font-serif">
              ZIYARA
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#103D32]">Sign in to your account</h1>
          <p className="text-xs text-[#556059]">
            Access your bookings, document checklist, and travel vouchers.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-white rounded-2xl border border-[#E7E8E3] p-4 space-y-2 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#707873] block">
            Quick Demo Accounts:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@ziyara.com", "admin123456")}
              className="px-2.5 py-1.5 rounded-lg border border-[#E7E8E3] bg-[#FAF9F6] text-left hover:border-[#103D32] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#103D32]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A264]" />
                Admin Demo
              </div>
              <div className="text-[10px] text-[#707873] truncate">admin@ziyara.com</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("adnan@example.com", "customer123456")}
              className="px-2.5 py-1.5 rounded-lg border border-[#E7E8E3] bg-[#FAF9F6] text-left hover:border-[#123B32] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#123B32]">
                <User className="w-3.5 h-3.5 text-[#285B4D]" />
                Customer Demo
              </div>
              <div className="text-[10px] text-[#707873] truncate">adnan@example.com</div>
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border border-[#E7E8E3] p-8 shadow-xs space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#123B32]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#707873] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#202824] focus:ring-1 focus:ring-[#123B32]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#123B32]">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#707873] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#202824] focus:ring-1 focus:ring-[#123B32]"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full font-bold">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E7E8E3] text-center text-xs text-[#707873]">
            Don't have an account yet?{" "}
            <Link href="/auth/sign-up" className="text-[#123B32] font-bold hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-xs text-[#707873]">Loading...</div>}>
      <SignInForm />
    </React.Suspense>
  );
}
