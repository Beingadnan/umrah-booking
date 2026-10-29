import { memoryDb } from "@/db";
import type { EnquiryInput } from "@/lib/validations";

export interface EnquiryRecord {
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
}

export async function createEnquiry(input: EnquiryInput): Promise<EnquiryRecord> {
  const enquiry: EnquiryRecord = {
    id: `enq-${Date.now()}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    city: input.city,
    travelMonth: input.travelMonth,
    travellerCount: input.travellerCount,
    message: input.message,
    status: "NEW",
    createdAt: new Date(),
  };

  memoryDb.enquiries.unshift(enquiry);
  return enquiry;
}

export async function getEnquiries(status?: string): Promise<EnquiryRecord[]> {
  if (status && status !== "ALL") {
    return memoryDb.enquiries.filter((e) => e.status === status);
  }
  return memoryDb.enquiries;
}

export async function updateEnquiryStatus(
  id: string,
  status: "NEW" | "CONTACTED" | "RESOLVED"
): Promise<EnquiryRecord | null> {
  const enquiry = memoryDb.enquiries.find((e) => e.id === id);
  if (!enquiry) return null;
  enquiry.status = status;
  return enquiry;
}
