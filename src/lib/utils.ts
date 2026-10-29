import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency in Indian Rupees (INR)
 * Supports whole amounts as well as integer minor units if stored in paise.
 */
export function formatPriceINR(amount: number, isMinorUnits: boolean = false): string {
  const value = isMinorUnits ? Math.round(amount / 100) : amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format human-readable date e.g. "15 Nov 2026"
 */
export function formatDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "TBD";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "TBD";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Format date range e.g. "15 Nov - 29 Nov 2026"
 */
export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

/**
 * Generates an unguessable yet user-friendly public booking reference.
 * Format: ZYR-{YEAR}-{RANDOM 4-CHAR ALPHANUMERIC}
 */
export function generateBookingReference(): string {
  const year = new Date().getFullYear();
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `ZYR-${year}-${randomChars}${randomDigits.toString().slice(-2)}`;
}

/**
 * Helper to slugify strings for URLs
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
