import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum("user_role", ["CUSTOMER", "ADMIN"]);
export const packageCategoryEnum = pgEnum("package_category", ["ECONOMY", "DELUXE", "VIP"]);
export const cityEnum = pgEnum("hotel_city", ["MAKKAH", "MADINAH"]);
export const distanceTypeEnum = pgEnum("distance_type", ["WALKING", "SHUTTLE"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "PENDING_CONFIRMATION",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "UNPAID",
  "PARTIALLY_PAID",
  "PAID",
  "REFUNDED",
]);
export const enquiryStatusEnum = pgEnum("enquiry_status", ["NEW", "CONTACTED", "RESOLVED"]);

// 1. Users
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  role: varchar("role", { length: 20 }).default("CUSTOMER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Packages
export const packages = pgTable("packages", {
  id: text("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 20 }).default("DELUXE").notNull(),
  durationNights: integer("duration_nights").notNull(),
  durationDays: integer("duration_days").notNull(),
  basePriceInr: integer("base_price_inr").notNull(), // Per person starting price
  departureCities: jsonb("departure_cities").$type<string[]>().notNull(),
  flightsIncluded: boolean("flights_included").default(true).notNull(),
  mealsIncluded: boolean("meals_included").default(true).notNull(),
  transportIncluded: boolean("transport_included").default(true).notNull(),
  visaIncluded: boolean("visa_included").default(true).notNull(),
  rating: text("rating").default("4.9"),
  reviewCount: integer("review_count").default(120),
  heroImage: text("hero_image").notNull(),
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Package Departures
export const packageDepartures = pgTable("package_departures", {
  id: text("id").primaryKey(),
  packageId: text("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  departureDate: timestamp("departure_date").notNull(),
  returnDate: timestamp("return_date").notNull(),
  totalSeats: integer("total_seats").notNull(),
  availableSeats: integer("available_seats").notNull(),
  priceInr: integer("price_inr").notNull(),
});

// 4. Hotels
export const hotels = pgTable("hotels", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  city: varchar("city", { length: 20 }).notNull(), // MAKKAH or MADINAH
  starRating: integer("star_rating").default(4).notNull(),
  distanceMeters: integer("distance_meters").notNull(),
  distanceText: varchar("distance_text", { length: 100 }).notNull(), // e.g. "120m from Haram courtyard"
  distanceType: varchar("distance_type", { length: 20 }).default("WALKING").notNull(), // WALKING or SHUTTLE
  address: text("address").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
});

// 5. Package Hotels (Mapping)
export const packageHotels = pgTable("package_hotels", {
  id: text("id").primaryKey(),
  packageId: text("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  hotelId: text("hotel_id").references(() => hotels.id, { onDelete: "cascade" }).notNull(),
  nights: integer("nights").notNull(),
  roomCategory: varchar("room_category", { length: 100 }).default("Deluxe Room").notNull(),
});

// 6. Package Images
export const packageImages = pgTable("package_images", {
  id: text("id").primaryKey(),
  packageId: text("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  isHero: boolean("is_hero").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 7. Itineraries
export const itineraries = pgTable("itineraries", {
  id: text("id").primaryKey(),
  packageId: text("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  dayNumber: integer("day_number").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  mealsIncluded: varchar("meals_included", { length: 100 }).notNull(),
});

// 8. Inclusions & Exclusions
export const packageInclusions = pgTable("package_inclusions", {
  id: text("id").primaryKey(),
  packageId: text("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  item: text("item").notNull(),
  category: varchar("category", { length: 50 }).default("GENERAL").notNull(),
});

export const packageExclusions = pgTable("package_exclusions", {
  id: text("id").primaryKey(),
  packageId: text("package_id").references(() => packages.id, { onDelete: "cascade" }).notNull(),
  item: text("item").notNull(),
});

// 9. Bookings
export const bookings = pgTable("bookings", {
  id: text("id").primaryKey(),
  bookingReference: varchar("booking_reference", { length: 50 }).notNull().unique(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  packageId: text("package_id").references(() => packages.id).notNull(),
  departureId: text("departure_id"),
  departureCity: varchar("departure_city", { length: 100 }).notNull(),
  travellerCount: integer("traveller_count").notNull(),
  roomType: varchar("room_type", { length: 50 }).default("SHARING_4").notNull(),
  totalAmountInr: integer("total_amount_inr").notNull(),
  status: varchar("status", { length: 30 }).default("PENDING_CONFIRMATION").notNull(),
  paymentStatus: varchar("payment_status", { length: 30 }).default("UNPAID").notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }).notNull(),
  specialRequests: text("special_requests"),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 10. Booking Travellers
export const bookingTravellers = pgTable("booking_travellers", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id").references(() => bookings.id, { onDelete: "cascade" }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  age: integer("age").notNull(),
  passportNumber: varchar("passport_number", { length: 50 }),
  nationality: varchar("nationality", { length: 50 }).default("INDIAN").notNull(),
});

// 11. Payments & Logs
export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id").references(() => bookings.id, { onDelete: "cascade" }).notNull(),
  orderId: varchar("order_id", { length: 100 }).notNull(),
  paymentId: varchar("payment_id", { length: 100 }),
  amountInr: integer("amount_inr").notNull(),
  status: varchar("status", { length: 50 }).default("PENDING").notNull(),
  provider: varchar("provider", { length: 50 }).default("RAZORPAY").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 12. Enquiries & Callback Requests
export const enquiries = pgTable("enquiries", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }),
  travelMonth: varchar("travel_month", { length: 50 }),
  travellerCount: integer("traveller_count"),
  message: text("message").notNull(),
  status: varchar("status", { length: 30 }).default("NEW").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 13. FAQ Items
export const faqItems = pgTable("faq_items", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }).default("General").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 14. Site Settings
export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 100 }).primaryKey(),
  value: text("value").notNull(),
  description: text("description"),
});

// Relations
export const packagesRelations = relations(packages, ({ many }) => ({
  departures: many(packageDepartures),
  packageHotels: many(packageHotels),
  images: many(packageImages),
  itineraries: many(itineraries),
  inclusions: many(packageInclusions),
  exclusions: many(packageExclusions),
  bookings: many(bookings),
}));

export const packageHotelsRelations = relations(packageHotels, ({ one }) => ({
  package: one(packages, { fields: [packageHotels.packageId], references: [packages.id] }),
  hotel: one(hotels, { fields: [packageHotels.hotelId], references: [hotels.id] }),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, { fields: [bookings.userId], references: [users.id] }),
  package: one(packages, { fields: [bookings.packageId], references: [packages.id] }),
  travellers: many(bookingTravellers),
  payments: many(payments),
}));
