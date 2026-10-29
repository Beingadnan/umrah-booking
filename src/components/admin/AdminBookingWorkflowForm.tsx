"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import type { BookingWithDetails } from "@/services/bookings";

interface AdminBookingWorkflowFormProps {
  booking: BookingWithDetails;
}

export function AdminBookingWorkflowForm({ booking }: AdminBookingWorkflowFormProps) {
  const router = useRouter();

  const [status, setStatus] = React.useState(booking.status);
  const [paymentStatus, setPaymentStatus] = React.useState(booking.paymentStatus);
  const [internalNotes, setInternalNotes] = React.useState(booking.internalNotes || "");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<{ text: string; isError: boolean } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, paymentStatus, internalNotes }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update booking status");
      }

      setMessage({ text: "Booking updated successfully!", isError: false });
      router.refresh();
    } catch (err: unknown) {
      setMessage({ text: (err as Error).message || "Update failed.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-6 shadow-xs sticky top-28">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-[#123B32] uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#916E2E]" />
          Operations Workflow
        </h3>
        <p className="text-xs text-[#707873]">Authorized admin status transitions.</p>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            message.isError
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          {message.isError ? (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          ) : (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleUpdate} className="space-y-4 text-xs">
        {/* Booking Status */}
        <div className="space-y-1.5">
          <label className="font-semibold text-[#123B32] uppercase tracking-wider block">
            Booking Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3 py-2.5 text-xs text-[#202824] font-medium"
          >
            <option value="PENDING_CONFIRMATION">Pending Confirmation</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Payment Status */}
        <div className="space-y-1.5">
          <label className="font-semibold text-[#123B32] uppercase tracking-wider block">
            Payment Reconciliation
          </label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as any)}
            className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3 py-2.5 text-xs text-[#202824] font-medium"
          >
            <option value="UNPAID">Unpaid</option>
            <option value="PARTIALLY_PAID">Partially Paid (Advance)</option>
            <option value="PAID">Paid in Full</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* Internal Notes */}
        <div className="space-y-1.5">
          <label className="font-semibold text-[#123B32] uppercase tracking-wider block">
            Internal Operations Notes
          </label>
          <textarea
            rows={4}
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            placeholder="Record airline PNR, visa application reference, or special voucher requests..."
            className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl p-3 text-xs text-[#202824]"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full font-bold">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span>Save Status Updates</span>
          )}
        </Button>
      </form>
    </div>
  );
}
