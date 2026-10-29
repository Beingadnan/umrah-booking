"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PhoneCall, Loader2 } from "lucide-react";

interface AdminEnquiryActionsProps {
  enquiryId: string;
  currentStatus: "NEW" | "CONTACTED" | "RESOLVED";
}

export function AdminEnquiryActions({ enquiryId, currentStatus }: AdminEnquiryActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const updateStatus = async (status: string) => {
    setLoading(true);
    try {
      await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
      {currentStatus !== "CONTACTED" && currentStatus !== "RESOLVED" && (
        <Button
          size="sm"
          variant="outline"
          disabled={loading}
          onClick={() => updateStatus("CONTACTED")}
          className="gap-1.5 text-xs h-8"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <PhoneCall className="w-3 h-3 text-[#285B4D]" />
          )}
          <span>Mark Contacted</span>
        </Button>
      )}

      {currentStatus !== "RESOLVED" && (
        <Button
          size="sm"
          variant="secondary"
          disabled={loading}
          onClick={() => updateStatus("RESOLVED")}
          className="gap-1.5 text-xs h-8"
        >
          {loading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3 h-3 text-[#C6A66B]" />
          )}
          <span>Mark Resolved</span>
        </Button>
      )}
    </div>
  );
}
