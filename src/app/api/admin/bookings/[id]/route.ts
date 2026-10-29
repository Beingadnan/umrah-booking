import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateBookingStatus } from "@/services/bookings";
import { UpdateBookingStatusSchema } from "@/lib/validations";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const parseResult = UpdateBookingStatusSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid update payload" },
        { status: 400 }
      );
    }

    const { status, paymentStatus, internalNotes } = parseResult.data;
    const updated = await updateBookingStatus(id, status, paymentStatus, internalNotes);

    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, booking: updated });
  } catch (err: unknown) {
    console.error("[Admin Update Booking Error]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
