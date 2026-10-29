import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { SEED_HOTELS, SEED_PACKAGES, SEED_FAQS } from "./seed-data";
import bcrypt from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL;

export const isLiveDatabase = Boolean(databaseUrl && !databaseUrl.includes("sample-pooler"));

// Neon client if configured
const sql = isLiveDatabase && databaseUrl ? neon(databaseUrl) : null;
export const drizzleDb = sql ? drizzle(sql, { schema }) : null;

/**
 * In-memory / local development repository for when DATABASE_URL is not yet connected
 * Ensures 100% interactive demo, booking creation, status updates, auth, and testing work out of the box.
 */
class MemoryDatabase {
  users: Array<{
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    phone: string | null;
    role: "CUSTOMER" | "ADMIN";
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  packages = [...SEED_PACKAGES];
  hotels = [...SEED_HOTELS];
  faqs = [...SEED_FAQS];

  bookings: Array<{
    id: string;
    bookingReference: string;
    userId: string | null;
    packageId: string;
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
  }> = [];

  enquiries: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    city?: string;
    travelMonth?: string;
    travellerCount?: number;
    message: string;
    status: "NEW" | "CONTACTED" | "RESOLVED";
    createdAt: Date;
  }> = [];

  settings: Record<string, string> = {
    contactPhone: "+91 98200 12345",
    contactEmail: "concierge@ziyara.com",
    officeAddress: "Unit 402, Trade Centre, BKC, Bandra East, Mumbai 400051",
    supportHours: "Mon-Sat: 9:30 AM to 7:00 PM IST",
    emergencyHelpline: "+91 98200 99999 (24/7 in Saudi Arabia)",
  };

  constructor() {
    this.initDefaultUsers();
    this.initDefaultBookings();
    this.initDefaultEnquiries();
  }

  private initDefaultUsers() {
    // Default Admin (password: admin123456)
    const adminSalt = bcrypt.genSaltSync(10);
    const adminHash = bcrypt.hashSync("admin123456", adminSalt);
    this.users.push({
      id: "usr-admin-01",
      email: "admin@ziyara.com",
      passwordHash: adminHash,
      name: "Ziyara Admin",
      phone: "+91 98200 12345",
      role: "ADMIN",
      createdAt: new Date("2026-10-25T10:00:00Z"),
      updatedAt: new Date("2026-10-25T10:00:00Z"),
    });

    // Default Customer (password: customer123456)
    const userSalt = bcrypt.genSaltSync(10);
    const userHash = bcrypt.hashSync("customer123456", userSalt);
    this.users.push({
      id: "usr-customer-01",
      email: "adnan@example.com",
      passwordHash: userHash,
      name: "Tariq Mansoor",
      phone: "+91 98765 43210",
      role: "CUSTOMER",
      createdAt: new Date("2026-10-25T10:00:00Z"),
      updatedAt: new Date("2026-10-25T10:00:00Z"),
    });
  }

  private initDefaultBookings() {
    this.bookings.push({
      id: "book-sample-01",
      bookingReference: "ZYR-2026-7841",
      userId: "usr-customer-01",
      packageId: "pkg-vip-executive-15",
      departureId: "dep-vip-1",
      departureCity: "Mumbai",
      travellerCount: 2,
      roomType: "DOUBLE_2",
      totalAmountInr: 330000,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      contactName: "Tariq Mansoor",
      contactEmail: "adnan@example.com",
      contactPhone: "+91 98765 43210",
      specialRequests: "Couple room preferred on higher floor with Haram view if possible.",
      internalNotes: "Verified documents. Saudia PNR generated. Welcome kit dispatched.",
      createdAt: new Date("2026-10-20T10:00:00Z"),
      updatedAt: new Date("2026-10-21T14:30:00Z"),
      travellers: [
        { id: "trav-1", fullName: "Tariq Mansoor", gender: "MALE", age: 46, passportNumber: "Z5678912" },
        { id: "trav-2", fullName: "Farzana Mansoor", gender: "FEMALE", age: 42, passportNumber: "Z5678913" },
      ],
    });

    this.bookings.push({
      id: "book-sample-02",
      bookingReference: "ZYR-2026-9214",
      userId: "usr-customer-01",
      packageId: "pkg-deluxe-classic-15",
      departureId: "dep-deluxe-1",
      departureCity: "Delhi",
      travellerCount: 4,
      roomType: "SHARING_4",
      totalAmountInr: 472000,
      status: "PENDING_CONFIRMATION",
      paymentStatus: "UNPAID",
      contactName: "Tariq Mansoor",
      contactEmail: "adnan@example.com",
      contactPhone: "+91 98765 43210",
      specialRequests: "Wheelchair assistance required for elderly parents at Jeddah airport.",
      internalNotes: "Pending document upload and passport verification.",
      createdAt: new Date("2026-10-24T08:15:00Z"),
      updatedAt: new Date("2026-10-24T08:15:00Z"),
      travellers: [
        { id: "trav-3", fullName: "Tariq Mansoor", gender: "MALE", age: 46 },
        { id: "trav-4", fullName: "Farzana Mansoor", gender: "FEMALE", age: 42 },
        { id: "trav-5", fullName: "Mansoor Ahmed", gender: "MALE", age: 72 },
        { id: "trav-6", fullName: "Begum Mansoor", gender: "FEMALE", age: 68 },
      ],
    });
  }

  private initDefaultEnquiries() {
    this.enquiries.push({
      id: "enq-01",
      name: "Zubair Hashmi",
      email: "zubair.hashmi@gmail.com",
      phone: "+91 99887 76655",
      city: "Hyderabad",
      travelMonth: "December 2026",
      travellerCount: 6,
      message: "Looking for an exclusive family package with Clock Tower stay during winter school holidays.",
      status: "NEW",
      createdAt: new Date("2026-10-24T12:00:00Z"),
    });

    this.enquiries.push({
      id: "enq-02",
      name: "Dr. Ayesha Siddiqui",
      email: "ayesha.siddiqui@hospital.org",
      phone: "+91 91234 56789",
      city: "Bengaluru",
      travelMonth: "January 2027",
      travellerCount: 2,
      message: "Inquiring about wheelchair accessible shuttle buses and proximity of hotel elevator to Haram courtyard.",
      status: "CONTACTED",
      createdAt: new Date("2026-10-23T15:20:00Z"),
    });
  }
}

// Global persistent instance for local server lifespan
const globalForDb = globalThis as unknown as { bmuMemoryDb?: MemoryDatabase };
export const memoryDb = globalForDb.bmuMemoryDb || new MemoryDatabase();
if (process.env.NODE_ENV !== "production") {
  globalForDb.bmuMemoryDb = memoryDb;
}
