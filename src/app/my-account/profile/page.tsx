"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, ShieldCheck, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();
  const [signingOut, setSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/auth/sign-in");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#123B32]">Account Settings</h2>
        <p className="text-xs text-[#707873]">Manage your login details and account preferences.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E8E3] p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[#E7E8E3]">
          <div className="w-16 h-16 rounded-full bg-[#123B32] text-white flex items-center justify-center text-xl font-bold">
            P
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#123B32]">Pilgrim Profile</h3>
            <p className="text-xs text-[#707873]">Authenticated Customer Account</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F6] border border-[#E7E8E3]">
            <span className="text-[#707873]">Account Status</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Active & Verified
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F6] border border-[#E7E8E3]">
            <span className="text-[#707873]">Security Level</span>
            <span className="font-semibold text-[#123B32]">Standard JWT Session (7 Days)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#E7E8E3]">
          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full gap-2 text-xs"
          >
            {signingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Sign Out from Ziyara</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
