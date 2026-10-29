"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPriceINR } from "@/lib/utils";
import { calculateBookingTotal } from "@/services/bookings";
import type { PopulatedPackage } from "@/services/packages";
import {
  Calendar,
  Users,
  Footprints,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Lock,
  Train,
  Car,
  Droplets,
  CreditCard,
  Building,
  Smartphone,
  Check,
  RefreshCw,
} from "lucide-react";

interface BookingWizardProps {
  packageData: PopulatedPackage;
  initialRoomType?: string;
  initialPax?: number;
  initialDepartureId?: string;
  userEmail?: string;
  userName?: string;
}

export function BookingWizard({
  packageData,
  initialRoomType = "SHARING_4",
  initialPax = 2,
  initialDepartureId,
  userEmail = "",
  userName = "",
}: BookingWizardProps) {
  const router = useRouter();

  // 5 Step Guided Flow: 1: Package, 2: Travelers, 3: Options, 4: Review, 5: Payment
  const [step, setStep] = React.useState<number>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Form Fields - Step 1: Package & Dates
  const [departureCity, setDepartureCity] = React.useState(
    packageData.departureCities[0] || "Mumbai"
  );
  const [departureId, setDepartureId] = React.useState(
    initialDepartureId || packageData.departures?.[0]?.id || ""
  );
  const [roomType, setRoomType] = React.useState(initialRoomType);
  const [paxCount, setPaxCount] = React.useState(initialPax);

  // Form Fields - Step 2: Primary Contact & Individual Travelers
  const [contactName, setContactName] = React.useState(userName);
  const [contactEmail, setContactEmail] = React.useState(userEmail);
  const [contactPhone, setContactPhone] = React.useState("+91 ");
  const [specialRequests, setSpecialRequests] = React.useState("");

  const [travellers, setTravellers] = React.useState<
    Array<{
      fullName: string;
      gender: "MALE" | "FEMALE";
      age: number;
      nationality: string;
      passportNumber: string;
    }>
  >(
    Array.from({ length: initialPax }, (_, i) => ({
      fullName: i === 0 && userName ? userName : "",
      gender: "MALE",
      age: 35,
      nationality: "Indian",
      passportNumber: "",
    }))
  );

  // Form Fields - Step 3: Upgrades
  const [upgradeBulletTrain, setUpgradeBulletTrain] = React.useState(false); // +₹6,500/pax
  const [upgradePrivateVehicle, setUpgradePrivateVehicle] = React.useState(false); // +₹12,000 flat
  const [upgradeZamzamDoorstep, setUpgradeZamzamDoorstep] = React.useState(false); // +₹1,200/pax

  // Form Fields - Step 4: Terms
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  // Form Fields - Step 5: Payment Simulation & Verification
  const [paymentMethod, setPaymentMethod] = React.useState<"UPI" | "CARD" | "NETBANKING">("UPI");
  const [upiId, setUpiId] = React.useState("pilgrim@okaxis");
  const [createdBookingId, setCreatedBookingId] = React.useState<string | null>(null);

  // Dynamic pricing calculation
  const { perPersonPrice, total: baseTotal } = calculateBookingTotal(
    packageData.basePriceInr,
    paxCount,
    roomType
  );

  // Calculate Upgrades Total
  const upgradesTotal =
    (upgradeBulletTrain ? 6500 * paxCount : 0) +
    (upgradePrivateVehicle ? 12000 : 0) +
    (upgradeZamzamDoorstep ? 1200 * paxCount : 0);

  const grandTotal = baseTotal + upgradesTotal;

  // Handle Pax Count changes
  const handlePaxChange = (newCount: number) => {
    setPaxCount(newCount);
    setTravellers((prev) => {
      const arr = [...prev];
      if (newCount > arr.length) {
        for (let i = arr.length; i < newCount; i++) {
          arr.push({
            fullName: "",
            gender: "MALE",
            age: 35,
            nationality: "Indian",
            passportNumber: "",
          });
        }
      } else {
        arr.length = newCount;
      }
      return arr;
    });
  };

  const updateTraveller = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setTravellers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!contactName.trim() || contactName.trim().length < 2) {
      setErrorMessage("Please enter lead traveler full legal name.");
      return false;
    }
    if (!contactEmail.includes("@") || !contactEmail.includes(".")) {
      setErrorMessage("Please enter a valid email address for booking confirmation.");
      return false;
    }
    if (contactPhone.replace(/\D/g, "").length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for concierge updates.");
      return false;
    }
    for (let i = 0; i < travellers.length; i++) {
      if (!travellers[i].fullName.trim()) {
        setErrorMessage(`Please enter the legal name for Traveler ${i + 1}.`);
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  // Step 4: Create Initial Booking
  const handleCreateBookingOrder = async () => {
    if (!agreedToTerms) {
      setErrorMessage("Please accept the terms and cancellation policy.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: packageData.id,
          departureId,
          departureCity,
          travellerCount: paxCount,
          roomType,
          contactName,
          contactEmail,
          contactPhone,
          specialRequests: [
            specialRequests,
            upgradeBulletTrain ? "Upgrade: Haramain Bullet Train VIP Business Class" : "",
            upgradePrivateVehicle ? "Upgrade: Private VIP GMC Airport Transfer" : "",
            upgradeZamzamDoorstep ? "Upgrade: 5L Zamzam Doorstep Dispatch" : "",
          ]
            .filter(Boolean)
            .join(" | "),
          travellers,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit booking order");
      }

      setCreatedBookingId(data.booking.id);
      setIsSubmitting(false);
      setStep(5); // Proceed to Payment Step
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMessage((err as Error).message);
    }
  };

  // Step 5: Execute and Verify Payment
  const handleVerifyAndCompletePayment = async () => {
    if (!createdBookingId) {
      setErrorMessage("No active booking order found. Please retry.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Generate transaction reference
      const paymentTxId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      const res = await fetch("/api/bookings/payment-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: createdBookingId,
          paymentId: paymentTxId,
          orderId: `order_${Date.now()}`,
          signature: "simulated_valid_signature",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Payment verification failed");
      }

      // Success redirect to Confirmation
      router.push(`/booking/confirmation/${createdBookingId}`);
    } catch (err: unknown) {
      setIsSubmitting(false);
      setErrorMessage((err as Error).message);
    }
  };

  const stepsList = [
    { num: 1, label: "Package" },
    { num: 2, label: "Travelers" },
    { num: 3, label: "Options" },
    { num: 4, label: "Review" },
    { num: 5, label: "Payment" },
  ];

  return (
    <div className="space-y-8">
      {/* 5-Step Guided Progress Indicator matching requirements */}
      <div className="bg-white rounded-2xl border border-[#E8E0D0] p-4 shadow-2xs">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {stepsList.map((s, idx) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-[#103D32] text-white shadow-2xs"
                        : isCurrent
                        ? "bg-[#C5A264] text-[#103D32] ring-4 ring-[#C5A264]/20 shadow-xs"
                        : "bg-[#F8F3E8] border border-[#E8E0D0] text-[#66726A]"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`text-[11px] font-semibold hidden sm:block ${
                      isCurrent ? "text-[#103D32]" : "text-[#707873]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {idx < stepsList.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 transition-all ${
                      step > s.num ? "bg-[#103D32]" : "bg-[#E8E0D0]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ================= STEP 1: PACKAGE & DATES ================= */}
      {step === 1 && (
        <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#103D32]">
              Select Dates & Occupancy
            </h3>
            <p className="text-xs text-[#66726A] mt-1">
              Configure your pilgrimage group size and room sharing preference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure City */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#18241E] block">
                Departure City
              </label>
              <select
                value={departureCity}
                onChange={(e) => setDepartureCity(e.target.value)}
                className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-xs text-[#18241E] font-medium focus:ring-1 focus:ring-[#103D32]"
              >
                {packageData.departureCities.map((c) => (
                  <option key={c} value={c}>
                    {c} (Direct Pilgrimage Flight)
                  </option>
                ))}
              </select>
            </div>

            {/* Departure Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#18241E] block">
                Departure Date
              </label>
              <select
                value={departureId}
                onChange={(e) => setDepartureId(e.target.value)}
                className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-xs text-[#18241E] font-medium focus:ring-1 focus:ring-[#103D32]"
              >
                {packageData.departures.map((dep) => {
                  const dStart = new Date(dep.departureDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const dEnd = new Date(dep.returnDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  return (
                    <option key={dep.id} value={dep.id}>
                      {dStart} – {dEnd} ({dep.availableSeats} verified seats left)
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Number of Travelers */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-[#18241E] block">
              Number of Pilgrims ({paxCount})
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handlePaxChange(num)}
                  className={`w-12 h-10 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paxCount === num
                      ? "bg-[#103D32] text-white border-[#103D32] shadow-2xs"
                      : "border-[#E8E0D0] text-[#66726A] hover:border-[#C5A264]"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-[#18241E] block">
              Room Occupancy Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: "SHARING_4", label: "Quad (4 Bed)", desc: "Standard Base Rate", sub: "Most popular for families" },
                { id: "TRIPLE_3", label: "Triple (3 Bed)", desc: "+10% supplement", sub: "Extra comfort" },
                { id: "DOUBLE_2", label: "Double (Couple)", desc: "+25% supplement", sub: "Private room for 2" },
                { id: "SINGLE_1", label: "Single Suite", desc: "+65% supplement", sub: "100% private solo room" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRoomType(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    roomType === item.id
                      ? "bg-[#FAF6ED] border-[#103D32] text-[#103D32] ring-2 ring-[#103D32]/20"
                      : "border-[#E8E0D0] text-[#66726A] hover:border-[#C5A264]"
                  }`}
                >
                  <div className="text-xs font-bold text-[#18241E]">{item.label}</div>
                  <div className="text-[11px] font-semibold text-[#A07D3E] mt-0.5">{item.desc}</div>
                  <div className="text-[10px] text-[#66726A] mt-1">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Transparent Live Pricing Callout */}
          <div className="bg-[#FAF6ED] p-4 rounded-2xl border border-[#E8E0D0] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#66726A] block">Estimated Base Price</span>
              <span className="text-xs font-semibold text-[#18241E]">
                {formatPriceINR(perPersonPrice)} × {paxCount} pilgrim{paxCount > 1 ? "s" : ""}
              </span>
            </div>
            <div className="text-right">
              <span className="font-display text-2xl font-bold text-[#103D32]">
                {formatPriceINR(baseTotal)}
              </span>
              <span className="text-[10px] text-[#66726A] block">All taxes & GST included</span>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end pt-4 border-t border-[#F0EAE0]">
            <Button onClick={() => setStep(2)} className="gap-2 bg-[#103D32] hover:bg-[#1F5446] text-white px-7">
              <span>Continue to Travelers</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: TRAVELERS INFORMATION ================= */}
      {step === 2 && (
        <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#103D32]">
              Traveler Information
            </h3>
            <p className="text-xs text-[#66726A] mt-1">
              Required by the Saudi Ministry of Hajj & Umrah for visa issuance and hotel room reservation.
            </p>
          </div>

          {/* Lead Traveler Contact */}
          <div className="p-5 rounded-2xl bg-[#FAF6ED] border border-[#E8E0D0] space-y-4">
            <h4 className="text-xs font-bold text-[#103D32] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A264]" />
              Lead Pilgrim / Contact Person
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#18241E]">
                  Full Legal Name (as per Passport) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mohammed Farhan Khan"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E] focus:outline-none focus:border-[#103D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#18241E]">
                  Contact Email (for Itinerary & Visa) *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E] focus:outline-none focus:border-[#103D32]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#18241E]">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98200 12345"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E] focus:outline-none focus:border-[#103D32]"
                />
              </div>
            </div>
          </div>

          {/* Individual Travelers List */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-[#18241E] uppercase tracking-wider">
              Pilgrim Passenger List ({travellers.length})
            </h4>

            {travellers.map((traveller, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[#E8E0D0] bg-white space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#103D32]">
                    Pilgrim {idx + 1} {idx === 0 && "(Lead Traveler)"}
                  </span>
                  <span className="text-[10px] text-[#66726A]">Mandatory Ministry Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10.5px] text-[#66726A]">Full Name</label>
                    <input
                      type="text"
                      placeholder="Name on Passport"
                      value={traveller.fullName}
                      onChange={(e) => updateTraveller(idx, "fullName", e.target.value)}
                      className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] text-[#66726A]">Gender</label>
                    <select
                      value={traveller.gender}
                      onChange={(e) => updateTraveller(idx, "gender", e.target.value)}
                      className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E]"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] text-[#66726A]">Age</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={traveller.age}
                      onChange={(e) => updateTraveller(idx, "age", parseInt(e.target.value) || 30)}
                      className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10.5px] text-[#66726A]">Passport Number</label>
                    <input
                      type="text"
                      placeholder="e.g. Z1234567"
                      value={traveller.passportNumber}
                      onChange={(e) => updateTraveller(idx, "passportNumber", e.target.value)}
                      className="w-full bg-[#F8F3E8] border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs text-[#18241E]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F0EAE0]">
            <Button variant="ghost" onClick={() => setStep(1)} className="gap-2 text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Package</span>
            </Button>
            <Button
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="gap-2 bg-[#103D32] hover:bg-[#1F5446] text-white px-7"
            >
              <span>Continue to Options</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: OPTIONS & UPGRADES ================= */}
      {step === 3 && (
        <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#103D32]">
              Pilgrimage Upgrades & Additional Services
            </h3>
            <p className="text-xs text-[#66726A] mt-1">
              Enhance your journey with seamless intercity bullet train seats, private airport transfers, and Zamzam doorstep delivery.
            </p>
          </div>

          <div className="space-y-4">
            {/* Upgrade 1: Bullet Train Business Class */}
            <label
              className={`p-5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                upgradeBulletTrain
                  ? "bg-[#FAF6ED] border-[#103D32] ring-1 ring-[#103D32]"
                  : "border-[#E8E0D0] hover:border-[#C5A264]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={upgradeBulletTrain}
                  onChange={(e) => setUpgradeBulletTrain(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#103D32] focus:ring-[#103D32]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-[#C5A264]" />
                    <span className="text-xs font-bold text-[#103D32]">
                      Haramain High-Speed Bullet Train (Business Class Upgrade)
                    </span>
                  </div>
                  <p className="text-xs text-[#66726A]">
                    Upgrade from standard coach to spacious Business Class between Makkah and Madinah with hot meal and priority boarding.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#103D32]">+₹6,500</span>
                <span className="text-[10px] text-[#66726A] block">per pilgrim</span>
              </div>
            </label>

            {/* Upgrade 2: Private VIP Airport Transfer */}
            <label
              className={`p-5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                upgradePrivateVehicle
                  ? "bg-[#FAF6ED] border-[#103D32] ring-1 ring-[#103D32]"
                  : "border-[#E8E0D0] hover:border-[#C5A264]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={upgradePrivateVehicle}
                  onChange={(e) => setUpgradePrivateVehicle(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#103D32] focus:ring-[#103D32]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-[#C5A264]" />
                    <span className="text-xs font-bold text-[#103D32]">
                      Private Luxury GMC Yukon / Lexus Chauffeur Transfer
                    </span>
                  </div>
                  <p className="text-xs text-[#66726A]">
                    Direct private transfer from Jeddah Airport to your hotel lobby. Zero waiting for group tour buses.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#103D32]">+₹12,000</span>
                <span className="text-[10px] text-[#66726A] block">entire family</span>
              </div>
            </label>

            {/* Upgrade 3: 5L Zamzam Doorstep Delivery */}
            <label
              className={`p-5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                upgradeZamzamDoorstep
                  ? "bg-[#FAF6ED] border-[#103D32] ring-1 ring-[#103D32]"
                  : "border-[#E8E0D0] hover:border-[#C5A264]"
              }`}
            >
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  checked={upgradeZamzamDoorstep}
                  onChange={(e) => setUpgradeZamzamDoorstep(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-[#103D32] focus:ring-[#103D32]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#C5A264]" />
                    <span className="text-xs font-bold text-[#103D32]">
                      5-Liter Sealed Zamzam Water Home Dispatch
                    </span>
                  </div>
                  <p className="text-xs text-[#66726A]">
                    Sealed government-certified Zamzam water delivered safely to your home address upon return to India.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#103D32]">+₹1,200</span>
                <span className="text-[10px] text-[#66726A] block">per pilgrim</span>
              </div>
            </label>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F0EAE0]">
            <Button variant="ghost" onClick={() => setStep(2)} className="gap-2 text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Travelers</span>
            </Button>
            <Button
              onClick={() => setStep(4)}
              className="gap-2 bg-[#103D32] hover:bg-[#1F5446] text-white px-7"
            >
              <span>Continue to Review</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: REVIEW & SUMMARY ================= */}
      {step === 4 && (
        <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#103D32]">
              Review Pilgrimage Summary
            </h3>
            <p className="text-xs text-[#66726A] mt-1">
              Please double check all selections before proceeding to secure payment.
            </p>
          </div>

          {/* Summary Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#E8E0D0] space-y-2">
              <span className="text-[10px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                Package & Departure
              </span>
              <div className="font-display text-base font-bold text-[#103D32]">
                {packageData.name}
              </div>
              <div className="text-xs text-[#66726A]">
                Ex: <strong>{departureCity}</strong> • Room: <strong>{roomType.replace("_", " ")}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#E8E0D0] space-y-2">
              <span className="text-[10px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                Pilgrims ({paxCount})
              </span>
              <div className="text-xs font-semibold text-[#18241E]">
                Lead: {contactName} ({contactPhone})
              </div>
              <div className="text-xs text-[#66726A]">
                {travellers.map((t) => t.fullName).filter(Boolean).join(", ")}
              </div>
            </div>
          </div>

          {/* Itemized Price Summary */}
          <div className="p-5 rounded-2xl bg-white border border-[#E8E0D0] space-y-3">
            <h4 className="text-xs font-bold text-[#103D32] uppercase tracking-wider">
              Transparent Price Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#66726A]">
                <span>Base Package Rate ({roomType.replace("_", " ")}):</span>
                <span>{formatPriceINR(perPersonPrice)} × {paxCount}</span>
              </div>

              {upgradeBulletTrain && (
                <div className="flex justify-between text-[#66726A]">
                  <span>Bullet Train Business Upgrade:</span>
                  <span>{formatPriceINR(6500 * paxCount)}</span>
                </div>
              )}

              {upgradePrivateVehicle && (
                <div className="flex justify-between text-[#66726A]">
                  <span>Private Chauffeur Airport Transfer:</span>
                  <span>{formatPriceINR(12000)}</span>
                </div>
              )}

              {upgradeZamzamDoorstep && (
                <div className="flex justify-between text-[#66726A]">
                  <span>5L Zamzam Doorstep Dispatch:</span>
                  <span>{formatPriceINR(1200 * paxCount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#66726A]">
                <span>Direct flights & visa with medical insurance:</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>

              <div className="flex justify-between text-[#66726A]">
                <span>Applicable GST (5%):</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>

              <div className="flex justify-between font-bold text-lg text-[#103D32] pt-3 border-t border-[#E8E0D0]">
                <span>Grand Total:</span>
                <span>{formatPriceINR(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Terms Acknowledgement */}
          <div className="p-4 rounded-2xl border border-[#E8E0D0] bg-[#FAF6ED] space-y-2">
            <label className="flex items-start gap-3 cursor-pointer text-xs text-[#18241E]">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 rounded border-[#E8E0D0] text-[#103D32] focus:ring-[#103D32] h-4 w-4 shrink-0"
              />
              <span>
                I agree to the Ziyara{" "}
                <a href="/terms" target="_blank" className="text-[#103D32] underline font-semibold">
                  Terms of Service
                </a>{" "}
                and acknowledge the{" "}
                <a href="/cancellation-policy" target="_blank" className="text-[#103D32] underline font-semibold">
                  Cancellation & Refund Policy
                </a>
                . I understand this booking is registered with verified concierge confirmation.
              </span>
            </label>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F0EAE0]">
            <Button variant="ghost" onClick={() => setStep(3)} className="gap-2 text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Options</span>
            </Button>
            <Button
              onClick={handleCreateBookingOrder}
              disabled={isSubmitting || !agreedToTerms}
              className="gap-2 bg-[#103D32] hover:bg-[#1F5446] text-white font-bold px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing Order...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* ================= STEP 5: PAYMENT & VERIFICATION ================= */}
      {step === 5 && (
        <div className="bg-white rounded-3xl border border-[#E8E0D0] p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted Payment Gateway</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-[#103D32]">
              Complete Your Pilgrimage Payment
            </h3>
            <p className="text-xs text-[#66726A] mt-1">
              Select your preferred method to complete payment of <strong>{formatPriceINR(grandTotal)}</strong>.
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "UPI", label: "UPI / QR", icon: Smartphone },
              { id: "CARD", label: "Cards (Visa/MC)", icon: CreditCard },
              { id: "NETBANKING", label: "Netbanking", icon: Building },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? "bg-[#FAF6ED] border-[#103D32] text-[#103D32] ring-2 ring-[#103D32]/20"
                      : "border-[#E8E0D0] text-[#66726A] hover:border-[#C5A264]"
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#103D32]" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Payment Input / Details */}
          {paymentMethod === "UPI" && (
            <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#E8E0D0] space-y-2">
              <label className="text-xs font-semibold text-[#18241E] block">
                Enter your Virtual Payment Address (VPA)
              </label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. yourname@oksbi"
                className="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-xs text-[#18241E] font-medium"
              />
              <span className="text-[10px] text-[#66726A] block">
                Supports Google Pay, PhonePe, Paytm, BHIM, and all UPI apps.
              </span>
            </div>
          )}

          {paymentMethod === "CARD" && (
            <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#E8E0D0] space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-[#18241E]">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 •••• •••• 8910"
                  defaultValue="4532 8910 2341 8910"
                  className="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-2 text-xs text-[#18241E]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10.5px] text-[#66726A]">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="08/29"
                    className="w-full bg-white border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10.5px] text-[#66726A]">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    defaultValue="786"
                    className="w-full bg-white border border-[#E8E0D0] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "NETBANKING" && (
            <div className="p-4 rounded-2xl bg-[#F8F3E8] border border-[#E8E0D0] space-y-2">
              <label className="text-xs font-semibold text-[#18241E] block">Select Your Bank</label>
              <select className="w-full bg-white border border-[#E8E0D0] rounded-xl px-4 py-2.5 text-xs text-[#18241E]">
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
            </div>
          )}

          {/* Security Assurance */}
          <div className="flex items-center gap-2.5 text-xs text-[#66726A]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Your transaction is verified server-side with zero risk of duplicate charge.
            </span>
          </div>

          {/* Action */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F0EAE0]">
            <Button variant="ghost" onClick={() => setStep(4)} disabled={isSubmitting} className="gap-2 text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Review</span>
            </Button>
            <Button
              onClick={handleVerifyAndCompletePayment}
              disabled={isSubmitting}
              className="gap-2 bg-[#103D32] hover:bg-[#1F5446] text-white font-bold px-8 shadow-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pay {formatPriceINR(grandTotal)} & Confirm</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
