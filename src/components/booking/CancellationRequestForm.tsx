"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, RotateCcw, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CancellationRequestFormProps {
  bookingId: string;
  currentStatus: string;
}

export function CancellationRequestForm({
  bookingId,
  currentStatus,
}: CancellationRequestFormProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [reason, setReason] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (currentStatus === "CANCELLED") {
    return (
      <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
        <span>This booking is currently marked as Cancelled. Our concierge team is processing any applicable refund according to the policy.</span>
      </div>
    );
  }

  const handleRequestCancellation = async () => {
    if (!reason.trim()) {
      setError("Please provide a reason for your cancellation request.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "CANCELLED",
          paymentStatus: "REFUNDED",
          internalNotes: `Customer cancellation requested online. Reason: ${reason}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit cancellation. Please contact concierge support.");
      }

      setSuccess(true);
      setIsSubmitting(false);
      router.refresh();
    } catch (err: unknown) {
      setIsSubmitting(false);
      setError((err as Error).message);
    }
  };

  return (
    <div className="p-5 rounded-2xl border border-[#E8E0D0] bg-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-[#103D32] uppercase tracking-wider flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-[#C5A264]" />
            Cancellation & Refund Eligibility
          </h4>
          <p className="text-[11px] text-[#66726A]">
            Transparent refunds based on departure timeframe in compliance with Saudi Ministry rules.
          </p>
        </div>

        {!isOpen && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="text-xs text-red-700 border-red-200 hover:bg-red-50 cursor-pointer"
          >
            Request Cancellation
          </Button>
        )}
      </div>

      {/* Policy highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] bg-[#FAF6ED] p-3 rounded-xl border border-[#E8E0D0]">
        <div>
          <strong className="text-[#103D32] block">&gt; 30 Days to Travel:</strong>
          <span className="text-[#66726A]">100% Refundable (minus ₹2,500 visa/admin fee)</span>
        </div>
        <div>
          <strong className="text-[#103D32] block">15 - 30 Days to Travel:</strong>
          <span className="text-[#66726A]">50% Refundable</span>
        </div>
        <div>
          <strong className="text-[#103D32] block">&lt; 15 Days to Travel:</strong>
          <span className="text-[#66726A]">Non-refundable (Flights & hotel vouchers committed)</span>
        </div>
      </div>

      {isOpen && !success && (
        <div className="pt-3 border-t border-[#F0EAE0] space-y-3 animate-in fade-in">
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[#18241E]">
              Reason for Cancellation Request *
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain reason for cancellation (e.g. medical reason, date conflict)..."
              className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl p-2.5 text-xs text-[#18241E]"
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-xs"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleRequestCancellation}
              disabled={isSubmitting}
              className="text-xs bg-red-700 hover:bg-red-800 text-white gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm Cancellation Request</span>
              )}
            </Button>
          </div>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Cancellation request submitted. Your assigned Ziyara concierge will contact you within 24 hours to process your refund.</span>
        </div>
      )}
    </div>
  );
}
