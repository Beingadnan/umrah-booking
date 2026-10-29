"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchLogo } from "@/components/common/ArchLogo";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("+91 ");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      router.push("/my-account");
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred.");
      setLoading(false);
    }
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
          <h1 className="text-xl font-bold text-[#103D32]">Create your pilgrim account</h1>
          <p className="text-xs text-[#556059]">
            Track your booking applications, visa progress, and vouchers in one place.
          </p>
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
              <label className="text-xs font-semibold text-[#123B32]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#707873] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Farhan Qureshi"
                  className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#202824] focus:ring-1 focus:ring-[#123B32]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#123B32]">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#707873] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farhan@example.com"
                  className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#202824] focus:ring-1 focus:ring-[#123B32]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#123B32]">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#707873] absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
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
                  placeholder="At least 6 characters"
                  className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-[#202824] focus:ring-1 focus:ring-[#123B32]"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full font-bold">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E7E8E3] text-center text-xs text-[#707873]">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-[#123B32] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
