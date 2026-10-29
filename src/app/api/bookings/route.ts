import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { CreateBookingSchema } from "@/lib/validations";
import { createBooking } from "@/services/bookings";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const parseResult = CreateBookingSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid booking data" },
        { status: 400 }
      );
    }

    const booking = await createBooking(parseResult.data, user?.id);

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        bookingReference: booking.bookingReference,
        status: booking.status,
      },
    });
  } catch (err: unknown) {
    console.error("[Booking API Error]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
