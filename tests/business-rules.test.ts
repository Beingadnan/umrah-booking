import { describe, it, expect, beforeEach } from "vitest";
import { calculateBookingTotal, createBooking, updateBookingStatus } from "@/services/bookings";
import { getPackages } from "@/services/packages";
import { createEnquiry } from "@/services/enquiries";
import { payments } from "@/lib/payments";
import { generateBookingReference } from "@/lib/utils";
import { CreateBookingSchema } from "@/lib/validations";

describe("BookMyUmrah Business Rules & Verification Tests", () => {
  // 1. Pricing Calculations Test
  it("calculates transparent booking totals correctly across occupancy tiers", () => {
    const basePrice = 100000;

    // Quad sharing: 1.0x
    const quad = calculateBookingTotal(basePrice, 4, "SHARING_4");
    expect(quad.perPersonPrice).toBe(100000);
    expect(quad.total).toBe(400000);

    // Triple sharing: 1.1x (+10%)
    const triple = calculateBookingTotal(basePrice, 3, "TRIPLE_3");
    expect(triple.perPersonPrice).toBe(110000);
    expect(triple.total).toBe(330000);

    // Double sharing: 1.25x (+25%)
    const doubleSharing = calculateBookingTotal(basePrice, 2, "DOUBLE_2");
    expect(doubleSharing.perPersonPrice).toBe(125000);
    expect(doubleSharing.total).toBe(250000);

    // Single room: 1.65x (+65%)
    const single = calculateBookingTotal(basePrice, 1, "SINGLE_1");
    expect(single.perPersonPrice).toBe(165000);
    expect(single.total).toBe(165000);
  });

  // 2. Booking Reference Format Test
  it("generates unguessable, non-sequential public booking references with current year", () => {
    const ref1 = generateBookingReference();
    const ref2 = generateBookingReference();
    const currentYear = new Date().getFullYear().toString();

    expect(ref1).toMatch(/^BMU-\d{4}-[A-Z0-9]+$/);
    expect(ref1).toContain(`BMU-${currentYear}`);
    expect(ref1).not.toBe(ref2);
  });

  // 3. Package Filtering Test
  it("filters packages accurately by departure city and category", async () => {
    const all = await getPackages();
    expect(all.length).toBeGreaterThan(0);

    // Filter by city Mumbai
    const mumbaiPkgs = await getPackages({ city: "Mumbai" });
    expect(mumbaiPkgs.every((p) => p.departureCities.includes("Mumbai"))).toBe(true);

    // Filter by VIP tier
    const vipPkgs = await getPackages({ category: "VIP" });
    expect(vipPkgs.every((p) => p.category === "VIP")).toBe(true);

    // Filter by short duration
    const shortPkgs = await getPackages({ duration: "short" });
    expect(shortPkgs.every((p) => p.durationDays <= 10)).toBe(true);
  });

  // 4. Booking Validation & Creation Test
  it("validates and creates a booking in PENDING_CONFIRMATION status", async () => {
    const validBookingData = {
      packageId: "pkg-vip-executive-15",
      departureCity: "Mumbai",
      travellerCount: 2,
      roomType: "DOUBLE_2" as const,
      contactName: "Tariq Mansoor",
      contactEmail: "tariq.mansoor@example.com",
      contactPhone: "+91 9876543210",
      travellers: [
        { fullName: "Tariq Mansoor", gender: "MALE" as const, age: 46 },
        { fullName: "Farzana Mansoor", gender: "FEMALE" as const, age: 42 },
      ],
    };

    // Zod schema passes
    const parse = CreateBookingSchema.safeParse(validBookingData);
    expect(parse.success).toBe(true);

    // Creates booking
    const booking = await createBooking(validBookingData, "usr-test-1");
    expect(booking.id).toBeDefined();
    expect(booking.bookingReference).toMatch(/^BMU-/);
    expect(booking.status).toBe("PENDING_CONFIRMATION");
    expect(booking.paymentStatus).toBe("UNPAID");
    expect(booking.totalAmountInr).toBeGreaterThan(0);
    expect(booking.travellers.length).toBe(2);
  });

  // 5. Valid Status Transitions Test
  it("enforces allowed booking status transitions and prevents invalid state leaps", async () => {
    const booking = await createBooking({
      packageId: "pkg-deluxe-classic-15",
      departureCity: "Delhi",
      travellerCount: 1,
      roomType: "SINGLE_1",
      contactName: "Rashid Ali",
      contactEmail: "rashid@example.com",
      contactPhone: "+91 9811122233",
    });

    // Valid: PENDING_CONFIRMATION -> CONFIRMED
    const confirmed = await updateBookingStatus(booking.id, "CONFIRMED", "PAID");
    expect(confirmed?.status).toBe("CONFIRMED");
    expect(confirmed?.paymentStatus).toBe("PAID");

    // Invalid: CONFIRMED cannot jump directly back to PENDING_CONFIRMATION
    await expect(
      updateBookingStatus(booking.id, "PENDING_CONFIRMATION")
    ).rejects.toThrow(/Invalid status transition/);
  });

  // 6. Payment Signature & Dev Mode Test
  it("handles payment provider signatures and dev order creation", async () => {
    const order = await payments.createOrder({
      amountInr: 150000,
      bookingReference: "BMU-2026-9999",
      customerName: "Adnan Khan",
      customerEmail: "adnan@example.com",
      customerPhone: "+91 98200 12345",
    });

    expect(order.orderId).toBeDefined();
    expect(order.amount).toBe(15000000); // in paise
    expect(order.currency).toBe("INR");

    // In dev mode without keys, simulated signature check passes for dev orders
    const isValid = payments.verifySignature({
      razorpayOrderId: order.orderId,
      razorpayPaymentId: "pay_test_12345",
      razorpaySignature: "mock_signature",
    });
    expect(isValid).toBe(true);
  });

  // 7. Enquiry Submission Test
  it("creates customer callback enquiries with NEW status", async () => {
    const enq = await createEnquiry({
      name: "Irfan Pathan",
      email: "irfan@cricket.in",
      phone: "+91 99000 88000",
      city: "Vadodara",
      travelMonth: "January 2027",
      travellerCount: 4,
      message: "Need 2 connecting rooms at Clock Towers with Haram view for family.",
    });

    expect(enq.id).toBeDefined();
    expect(enq.name).toBe("Irfan Pathan");
    expect(enq.status).toBe("NEW");
  });
});
