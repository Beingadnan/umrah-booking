import { memoryDb } from "@/db";
import { generateBookingReference } from "@/lib/utils";
import { sendBookingConfirmationEmail } from "@/lib/email";
import type { CreateBookingInput } from "@/lib/validations";

export interface BookingWithDetails {
  id: string;
  bookingReference: string;
  userId: string | null;
  packageId: string;
  packageName: string;
  packageCategory: string;
  packageHeroImage: string;
  departureId: string | null;
  departureCity: string;
  travellerCount: number;
  roomType: string;
  totalAmountInr: number;
  status: "PENDING_CONFIRMATION" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentStatus: "UNPAID" | "PARTIALLY_PAID" | "PAID" | "REFUNDED";
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  specialRequests?: string;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  travellers: Array<{
    id: string;
    fullName: string;
    gender: "MALE" | "FEMALE";
    age: number;
    passportNumber?: string;
  }>;
}

export const ROOM_MULTIPLIERS: Record<string, number> = {
  SHARING_4: 1.0,
  TRIPLE_3: 1.1,
  DOUBLE_2: 1.25,
  SINGLE_1: 1.65,
};

export function calculateBookingTotal(
  basePriceInr: number,
  travellerCount: number,
  roomType: string = "SHARING_4"
): { perPersonPrice: number; total: number; roomMultiplier: number } {
  const multiplier = ROOM_MULTIPLIERS[roomType] || 1.0;
  const perPersonPrice = Math.round(basePriceInr * multiplier);
  const total = perPersonPrice * travellerCount;
  return { perPersonPrice, total, roomMultiplier: multiplier };
}

export async function createBooking(
  input: CreateBookingInput,
  userId?: string | null
): Promise<BookingWithDetails> {
  const pkg = memoryDb.packages.find((p) => p.id === input.packageId);
  if (!pkg) {
    throw new Error("Invalid package selected");
  }

  // Calculate price safely
  const { total } = calculateBookingTotal(
    pkg.basePriceInr,
    input.travellerCount,
    input.roomType
  );

  const bookingId = `book-${Date.now()}`;
  const bookingReference = generateBookingReference();

  const travellers = (input.travellers || []).map((t, idx) => ({
    id: `trav-${Date.now()}-${idx}`,
    fullName: t.fullName,
    gender: t.gender,
    age: t.age,
    passportNumber: t.passportNumber,
  }));

  // If travellers array wasn't provided for all seats, fill default entries
  while (travellers.length < input.travellerCount) {
    const idx = travellers.length + 1;
    travellers.push({
      id: `trav-${Date.now()}-${idx}`,
      fullName: idx === 1 ? input.contactName : `Pilgrim ${idx}`,
      gender: "MALE",
      age: 35,
      passportNumber: undefined,
    });
  }

  const newBooking = {
    id: bookingId,
    bookingReference,
    userId: userId || null,
    packageId: pkg.id,
    departureId: input.departureId || null,
    departureCity: input.departureCity,
    travellerCount: input.travellerCount,
    roomType: input.roomType,
    totalAmountInr: total,
    status: "PENDING_CONFIRMATION" as const,
    paymentStatus: "UNPAID" as const,
    contactName: input.contactName,
    contactEmail: input.contactEmail,
    contactPhone: input.contactPhone,
    specialRequests: input.specialRequests,
    internalNotes: "Booking received online. Awaiting document verification.",
    createdAt: new Date(),
    updatedAt: new Date(),
    travellers,
  };

  memoryDb.bookings.unshift(newBooking);

  // Send confirmation email asynchronously (with fallback)
  sendBookingConfirmationEmail({
    to: input.contactEmail,
    customerName: input.contactName,
    bookingReference,
    packageName: pkg.name,
    totalAmountInr: total,
    departureDate: input.departureCity,
    travellerCount: input.travellerCount,
  }).catch((err) => console.error("Email send error", err));

  return formatBookingWithDetails(newBooking);
}

export async function getBookingById(id: string): Promise<BookingWithDetails | null> {
  const b = memoryDb.bookings.find((item) => item.id === id);
  if (!b) return null;
  return formatBookingWithDetails(b);
}

export async function getBookingByReference(reference: string): Promise<BookingWithDetails | null> {
  const b = memoryDb.bookings.find(
    (item) => item.bookingReference.toLowerCase() === reference.trim().toLowerCase()
  );
  if (!b) return null;
  return formatBookingWithDetails(b);
}

export async function getUserBookings(userId: string, email?: string): Promise<BookingWithDetails[]> {
  const matches = memoryDb.bookings.filter(
    (b) =>
      b.userId === userId ||
      (email && b.contactEmail.toLowerCase() === email.toLowerCase())
  );
  return matches.map(formatBookingWithDetails);
}

export async function getAllBookingsAdmin(filters?: {
  status?: string;
  paymentStatus?: string;
  search?: string;
}): Promise<BookingWithDetails[]> {
  let list = [...memoryDb.bookings];

  if (filters?.status && filters.status !== "ALL") {
    list = list.filter((b) => b.status === filters.status);
  }

  if (filters?.paymentStatus && filters.paymentStatus !== "ALL") {
    list = list.filter((b) => b.paymentStatus === filters.paymentStatus);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (b) =>
        b.bookingReference.toLowerCase().includes(q) ||
        b.contactName.toLowerCase().includes(q) ||
        b.contactEmail.toLowerCase().includes(q) ||
        b.contactPhone.toLowerCase().includes(q)
    );
  }

  return list.map(formatBookingWithDetails);
}

export async function updateBookingStatus(
  id: string,
  newStatus: "PENDING_CONFIRMATION" | "CONFIRMED" | "CANCELLED" | "COMPLETED",
  paymentStatus?: "UNPAID" | "PARTIALLY_PAID" | "PAID" | "REFUNDED",
  internalNotes?: string
): Promise<BookingWithDetails | null> {
  const b = memoryDb.bookings.find((item) => item.id === id);
  if (!b) return null;

  // Validate state transitions
  const allowedTransitions: Record<string, string[]> = {
    PENDING_CONFIRMATION: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["COMPLETED", "CANCELLED"],
    CANCELLED: ["PENDING_CONFIRMATION"], // Allow reopening if cancelled by mistake
    COMPLETED: [],
  };

  if (newStatus !== b.status && !allowedTransitions[b.status]?.includes(newStatus)) {
    throw new Error(`Invalid status transition from ${b.status} to ${newStatus}`);
  }

  b.status = newStatus;
  if (paymentStatus) {
    b.paymentStatus = paymentStatus;
  }
  if (internalNotes) {
    b.internalNotes = internalNotes;
  }
  b.updatedAt = new Date();

  return formatBookingWithDetails(b);
}

function formatBookingWithDetails(b: (typeof memoryDb.bookings)[0]): BookingWithDetails {
  const pkg = memoryDb.packages.find((p) => p.id === b.packageId);
  return {
    ...b,
    packageName: pkg?.name || "Umrah Package",
    packageCategory: pkg?.category || "DELUXE",
    packageHeroImage:
      pkg?.heroImage ||
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop",
  };
}
