# BookMyUmrah — Premium Umrah Booking Platform

**BookMyUmrah** is a modern, production-minded Umrah booking platform built specifically for Indian pilgrims and families. It introduces **radical transparency** into Umrah travel — featuring audited hotel distances to the Haram courtyards, itemized pricing without hidden fees, interactive multi-step booking flows with non-guessable references, customer tracking portals, and a comprehensive operations admin dashboard.

---

## 🕋 Core Features & Pillars

1. **Hotel Transparency & Proximity Audits**:
   - Strictly distinguishes between true pedestrian walking distance (e.g. 100m direct indoor access via Clock Tower or 50m to Prophet's Mosque courtyard) and 24/7 private air-conditioned shuttle transport (e.g. Voco Makkah).
   - Zero misleading "2 minutes to Haram" claims.
2. **Transparent Room Occupancy Pricing**:
   - Dynamic real-time calculation in Indian Rupees (INR) across room sharing tiers: Quad (4 sharing), Triple (3 bed), Double (Couple), and Private Single.
   - All statutory taxes, direct airline tickets, e-visas with medical insurance, and buffet meals clearly documented.
3. **Multi-Step Booking Flow**:
   - Step 1: Travel dates, departure airport, and room occupancy.
   - Step 2: Primary lead contact and individual pilgrim names/ages.
   - Step 3: Transparent line-item review and terms acceptance.
   - Step 4: Transactional submission generating an unguessable tracking reference (e.g. `BMU-2026-XXXX`).
   - Initial state: Truthful `PENDING_CONFIRMATION` status until audited by concierge.
4. **Customer Pilgrim Portal (`/my-account`)**:
   - Overview of active trips, booking history, and transparent payment reconciliation.
   - Mandatory document checklist (Indian passport validity, white-background photo, PAN card, and Nusuk Rawdah permit guidance).
   - Profile settings and secure session logout.
5. **Admin Operations Management (`/admin`)**:
   - Overview dashboard showing booking pipeline vs actual paid revenue, pending confirmations, and leads.
   - Package manager: Create, edit, and publish packages linked to verified hotels.
   - Booking registry: Search, filter by status and payment, and execute authorized state transitions (`PENDING_CONFIRMATION` -> `CONFIRMED` -> `COMPLETED` / `CANCELLED`).
   - Customer registry and inbound enquiry & callback lead tracker.
6. **Payment & Notification Abstractions**:
   - Server-side Razorpay order creation and signature verification with honest dev-fallback simulator.
   - Resend transactional email integration with automatic console fallback logger.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router, Turbopack, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS & custom design tokens:
  - Deep Emerald Green: `#123B32`
  - Forest Accent: `#285B4D`
  - Warm Sand / Off-White: `#FAF9F6` & `#EEE8DD`
  - Subtle Gold: `#C6A66B`
  - Primary Slate: `#202824`
- **Database**: Neon PostgreSQL with Drizzle ORM (includes transparent development memory store for instant out-of-the-box local testing)
- **Authentication**: Server-side Jose JWT with bcrypt password hashing and HTTP-only secure cookie sessions
- **Validation**: Zod v4 schemas
- **Testing**: Vitest automated test suite

---

## 🚀 Getting Started

### 1. Installation

```bash
git clone <repository-url>
cd umrah-booking
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Default local secrets are already configured in `.env.local`.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Credentials

The platform is pre-loaded with realistic seed accounts for instant testing:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@bookmyumrah.com` | `admin123456` | Full Admin Console (`/admin`) |
| **Customer** | `adnan@example.com` | `customer123456` | Customer Dashboard (`/my-account`) |

> You can also click the **"Quick Demo"** buttons on the `/auth/sign-in` screen to autofill these credentials.

---

## 🧪 Testing & Verification

Run the automated test suite testing price calculations, unguessable reference formats, package filtering, booking state machines, and payment signatures:

```bash
npm test
```

Run a complete production build:

```bash
npm run build
```

---

## 🐘 Connecting to Live Neon PostgreSQL

When you are ready to connect a live Neon PostgreSQL database:

1. Create a project at [Neon.tech](https://neon.tech).
2. Copy your pooled connection string and set `DATABASE_URL` in `.env.local`:
   ```bash
   DATABASE_URL="postgresql://user:password@ep-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
   ```
3. Push schemas directly to Neon:
   ```bash
   npm run db:push
   ```

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── (marketing)/             # Public pages (Home, About, Contact, FAQ, Terms, Privacy)
│   ├── packages/                # Package listing, filters, and [slug] details
│   ├── booking/                 # Multi-step checkout & [bookingId] confirmation
│   ├── (auth)/                  # Sign-in and Sign-up
│   ├── my-account/              # Protected Customer Portal
│   ├── admin/                   # Protected Admin Portal (RBAC)
│   └── api/                     # Server Route Handlers (Bookings, Enquiries, Auth)
├── components/
│   ├── ui/                      # Button, Badge, Card primitives
│   ├── layout/                  # Navbar, Footer
│   ├── home/                    # Hero, FilterBar, TrustIndicators, HotelTransparency
│   ├── packages/                # PackageCard, PackageFilters, BookingStickyCard
│   ├── booking/                 # BookingWizard multi-step form
│   └── admin/                   # Admin forms and status badges
├── db/
│   ├── schema/                  # Drizzle ORM PostgreSQL schema
│   ├── index.ts                 # Neon connection + fallback adapter
│   └── seed-data.ts             # Authentic hotels, packages, and itineraries
├── lib/
│   ├── auth/                    # Jose JWT session, password hashing, role checks
│   ├── payments/                # Razorpay abstraction & signature verification
│   ├── email/                   # Resend transactional email with dev fallback
│   ├── validations/             # Zod input schemas
│   └── utils.ts                 # Currency formatting (INR), dates, reference generator
└── services/                    # Business domain logic (Packages, Bookings, Enquiries, Users)
```

---

## 📄 License & Ownership

© 2026 BookMyUmrah Technologies Pvt. Ltd. All rights reserved.
Built with dedication for Indian pilgrims.
# umrah-booking
