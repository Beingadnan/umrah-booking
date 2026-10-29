import { z } from "zod";

export const BookingTravellerSchema = z.object({
  fullName: z.string().min(2, "Traveller name must be at least 2 characters"),
  gender: z.enum(["MALE", "FEMALE"]),
  age: z.coerce.number().min(0, "Age must be 0 or greater").max(120, "Please enter a valid age"),
  passportNumber: z.string().optional(),
});

export const CreateBookingSchema = z.object({
  packageId: z.string().min(1, "Package ID is required"),
  departureId: z.string().optional(),
  departureCity: z.string().min(1, "Departure city is required"),
  travellerCount: z.coerce.number().min(1, "At least 1 traveller is required").max(30, "For groups larger than 30, please contact us for custom group rates"),
  roomType: z.enum(["SHARING_4", "TRIPLE_3", "DOUBLE_2", "SINGLE_1"]).default("SHARING_4"),
  contactName: z.string().min(2, "Full name is required"),
  contactEmail: z.string().email("Valid email address is required"),
  contactPhone: z.string().min(10, "Valid 10-digit phone number is required").max(15, "Phone number is too long"),
  specialRequests: z.string().max(500, "Special requests must be under 500 characters").optional(),
  travellers: z.array(BookingTravellerSchema).optional(),
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;

export const EnquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  city: z.string().optional(),
  travelMonth: z.string().optional(),
  travellerCount: z.coerce.number().optional(),
  message: z.string().min(5, "Please share some details about your Umrah requirements"),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const UpdateBookingStatusSchema = z.object({
  status: z.enum(["PENDING_CONFIRMATION", "CONFIRMED", "CANCELLED", "COMPLETED"]),
  paymentStatus: z.enum(["UNPAID", "PARTIALLY_PAID", "PAID", "REFUNDED"]).optional(),
  internalNotes: z.string().optional(),
});
