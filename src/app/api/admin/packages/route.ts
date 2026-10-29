import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createPackage } from "@/services/packages";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 403 });
    }

    const body = await req.json();

    if (!body.name || !body.slug || !body.basePriceInr) {
      return NextResponse.json({ error: "Missing required package fields" }, { status: 400 });
    }

    const newPackage = await createPackage({
      slug: body.slug,
      name: body.name,
      description: body.description || "",
      category: body.category || "DELUXE",
      durationNights: Number(body.durationNights) || 14,
      durationDays: Number(body.durationDays) || 15,
      basePriceInr: Number(body.basePriceInr),
      departureCities: body.departureCities || ["Mumbai", "Delhi"],
      flightsIncluded: body.flightsIncluded ?? true,
      mealsIncluded: body.mealsIncluded ?? true,
      transportIncluded: body.transportIncluded ?? true,
      visaIncluded: body.visaIncluded ?? true,
      rating: "4.9",
      reviewCount: 1,
      heroImage:
        body.heroImage ||
        "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop",
      featured: false,
      published: true,
      makkahHotelId: body.makkahHotelId || "hotel-makkah-1",
      makkahNights: Number(body.makkahNights) || 8,
      madinahHotelId: body.madinahHotelId || "hotel-madinah-1",
      madinahNights: Number(body.madinahNights) || 6,
      departures: [
        {
          id: `dep-${Date.now()}`,
          departureDate: "2026-12-01T00:00:00.000Z",
          returnDate: "2026-12-15T00:00:00.000Z",
          totalSeats: 30,
          availableSeats: 30,
          priceInr: Number(body.basePriceInr),
        },
      ],
      itinerary: [
        {
          dayNumber: 1,
          title: "Arrival and Umrah",
          description: "Flight to Jeddah and transfer to Makkah hotel.",
          location: "Makkah",
          mealsIncluded: "Dinner",
        },
      ],
      inclusions: ["Return Flights", "Hotel Accommodation", "Umrah Visa", "Indian Meals"],
      exclusions: ["Personal Laundry", "Extra Baggage"],
    });

    return NextResponse.json({ success: true, package: newPackage });
  } catch (err: unknown) {
    console.error("[Create Package Error]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
