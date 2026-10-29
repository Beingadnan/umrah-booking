"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  Plane,
  Sparkles,
  Bed,
  MapPin,
  Clock,
  Phone,
  Mail,
  User,
  ChevronDown,
  ChevronUp,
  Info,
  QrCode,
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

  // 5 Step Guided Flow
  const [step, setStep] = React.useState<number>(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [mobileSummaryOpen, setMobileSummaryOpen] = React.useState(false);

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
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

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
  const [selectedBank, setSelectedBank] = React.useState("State Bank of India");
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

  // Selected departure object
  const selectedDeparture =
    packageData.departures?.find((d) => d.id === departureId) ||
    packageData.departures?.[0];

  const formattedDepartureDate = selectedDeparture
    ? new Date(selectedDeparture.departureDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Flexible";

  const formattedReturnDate = selectedDeparture
    ? new Date(selectedDeparture.returnDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Flexible";

  // Handle Pax Count changes
  const handlePaxChange = (newCount: number) => {
    const validCount = Math.max(1, Math.min(20, newCount));
    setPaxCount(validCount);
    setTravellers((prev) => {
      const arr = [...prev];
      if (validCount > arr.length) {
        for (let i = arr.length; i < validCount; i++) {
          arr.push({
            fullName: "",
            gender: "MALE",
            age: 35,
            nationality: "Indian",
            passportNumber: "",
          });
        }
      } else {
        arr.length = validCount;
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

  const copyLeadToTraveler1 = () => {
    if (contactName.trim()) {
      updateTraveller(0, "fullName", contactName.trim());
    }
  };

  const toggleRequestTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!contactName.trim() || contactName.trim().length < 2) {
      setErrorMessage("Please enter lead traveler's full legal name as per passport.");
      return false;
    }
    if (!contactEmail.includes("@") || !contactEmail.includes(".")) {
      setErrorMessage("Please enter a valid email address for your booking confirmation & e-tickets.");
      return false;
    }
    const cleanPhone = contactPhone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number for concierge updates.");
      return false;
    }
    for (let i = 0; i < travellers.length; i++) {
      if (!travellers[i].fullName.trim()) {
        setErrorMessage(`Please enter the legal name for Pilgrim ${i + 1}.`);
        return false;
      }
    }
    setErrorMessage(null);
    return true;
  };

  // Step 4: Create Initial Booking
  const handleCreateBookingOrder = async () => {
    if (!agreedToTerms) {
      setErrorMessage("Please accept the terms of service and cancellation policy to proceed.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const compiledRequests = [
      ...selectedTags,
      specialRequests.trim(),
      upgradeBulletTrain ? "Upgrade: Haramain High-Speed Bullet Train (Business Class)" : "",
      upgradePrivateVehicle ? "Upgrade: Private VIP GMC Chauffeur Airport Transfer" : "",
      upgradeZamzamDoorstep ? "Upgrade: 5L Sealed Zamzam Home Delivery" : "",
    ]
      .filter(Boolean)
      .join(" | ");

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
          specialRequests: compiledRequests,
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
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    { num: 1, label: "Dates & Rooms", short: "Dates" },
    { num: 2, label: "Travelers", short: "Pilgrims" },
    { num: 3, label: "Upgrades", short: "Extras" },
    { num: 4, label: "Review", short: "Review" },
    { num: 5, label: "Payment", short: "Payment" },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* ================= STEPPER HEADER ================= */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-4 sm:p-5 shadow-xs">
        {/* Desktop Stepper */}
        <div className="hidden sm:flex items-center justify-between max-w-3xl mx-auto">
          {stepsList.map((s, idx) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                      isCompleted
                        ? "bg-[#103D32] text-white shadow-xs"
                        : isCurrent
                        ? "bg-[#103D32] text-white ring-4 ring-[#103D32]/15 shadow-xs"
                        : "bg-slate-100 border border-slate-200 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span
                    className={`text-xs font-semibold tracking-tight transition-colors ${
                      isCurrent
                        ? "text-[#103D32]"
                        : isCompleted
                        ? "text-slate-700"
                        : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {idx < stepsList.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-3 transition-colors duration-300 ${
                      step > s.num ? "bg-[#103D32]" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Stepper Header */}
        <div className="sm:hidden space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              Step {step} of 5
            </span>
            <span className="font-bold text-[#103D32]">
              {stepsList[step - 1]?.label}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#103D32] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-amber-700 hover:text-amber-900 text-xs font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ================= MAIN 2-COLUMN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: STEP FORMS ================= */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* ================= STEP 1: DATES & ROOM OCCUPANCY ================= */}
          {step === 1 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-7 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#103D32] bg-[#103D32]/5 px-3 py-1 rounded-full mb-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A264]" />
                  <span>Step 1: Dates & Rooms</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Select Dates & Room Occupancy
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose your departure city, available travel dates, and room sharing type.
                </p>
              </div>

              {/* Departure City */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#C5A264]" />
                  <span>Departure Airport / City</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {packageData.departureCities.map((city) => {
                    const isSelected = departureCity === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setDepartureCity(city)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#103D32] border-[#103D32] text-white shadow-xs font-bold"
                            : "bg-slate-50/50 border-slate-200 text-slate-700 hover:border-slate-300 font-medium"
                        }`}
                      >
                        <div className="text-xs sm:text-sm">{city}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? "text-emerald-200" : "text-slate-400"
                          }`}
                        >
                          Direct Flight
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Departure Date Selection Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C5A264]" />
                    <span>Available Travel Dates</span>
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {packageData.durationDays} Days / {packageData.durationNights} Nights
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {packageData.departures.map((dep) => {
                    const isSelected = departureId === dep.id;
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
                      <button
                        key={dep.id}
                        type="button"
                        onClick={() => setDepartureId(dep.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-emerald-50/40 border-[#103D32] ring-2 ring-[#103D32]/15 shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900">
                              {dStart} – {dEnd}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{packageData.durationDays} Days Tour</span>
                            </div>
                          </div>
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isSelected
                                ? "bg-[#103D32] text-white"
                                : dep.availableSeats <= 6
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {dep.availableSeats} seats left
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Pilgrims Counter */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C5A264]" />
                    <span>Number of Pilgrims</span>
                  </label>
                  <span className="text-xs font-semibold text-[#103D32]">
                    {paxCount} {paxCount === 1 ? "Pilgrim" : "Pilgrims"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handlePaxChange(num)}
                      className={`h-11 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        paxCount === num
                          ? "bg-[#103D32] text-white border-[#103D32] shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </button>
                  ))}
                  <div className="inline-flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      type="button"
                      onClick={() => handlePaxChange(paxCount - 1)}
                      disabled={paxCount <= 1}
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-slate-600 hover:bg-white disabled:opacity-30 cursor-pointer"
                    >
                      –
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-slate-900">
                      {paxCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePaxChange(paxCount + 1)}
                      disabled={paxCount >= 20}
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-slate-600 hover:bg-white disabled:opacity-30 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Room Occupancy Selection Cards */}
              <div className="space-y-3 pt-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#C5A264]" />
                  <span>Room Occupancy Preference</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: "SHARING_4",
                      title: "Quad Sharing (4 Beds)",
                      subtitle: "Included in Base Rate",
                      desc: "Most popular for families and group travelers.",
                      badge: "Best Value",
                    },
                    {
                      id: "TRIPLE_3",
                      title: "Triple Room (3 Beds)",
                      subtitle: "+10% supplement",
                      desc: "Comfortable spacious sharing for 3 guests.",
                      badge: "Spacious",
                    },
                    {
                      id: "DOUBLE_2",
                      title: "Double / Couple Room",
                      subtitle: "+25% supplement",
                      desc: "Dedicated private room with attached bath.",
                      badge: "Couples Choice",
                    },
                    {
                      id: "SINGLE_1",
                      title: "Single Private Suite",
                      subtitle: "+65% supplement",
                      desc: "100% private solo room with luxury privacy.",
                      badge: "Solo Luxury",
                    },
                  ].map((item) => {
                    const isSelected = roomType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRoomType(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-emerald-50/40 border-[#103D32] ring-2 ring-[#103D32]/15 shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {item.title}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-[#103D32] text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[#A07D3E] mt-1">
                          {item.subtitle}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action */}
              <div className="flex justify-end pt-5 border-t border-slate-100">
                <Button
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 bg-[#103D32] hover:bg-[#194E41] text-white font-semibold px-8 py-3 rounded-xl shadow-xs cursor-pointer text-sm"
                >
                  <span>Continue to Travelers</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: TRAVELERS INFORMATION ================= */}
          {step === 2 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-7 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#103D32] bg-[#103D32]/5 px-3 py-1 rounded-full mb-2">
                  <Users className="w-3.5 h-3.5 text-[#C5A264]" />
                  <span>Step 2: Pilgrim & Contact Details</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Traveler Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Required by the Saudi Ministry of Hajj & Umrah for electronic visa issuance and verified hotel vouchers.
                </p>
              </div>

              {/* Lead Pilgrim / Primary Contact Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Primary Contact / Lead Pilgrim
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">Receives tickets & visa</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="e.g. Mohammed Farhan Khan"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-[#103D32]/20 focus:border-[#103D32] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        placeholder="farhan@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-[#103D32]/20 focus:border-[#103D32] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Mobile (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        placeholder="+91 98200 12345"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-2 focus:ring-[#103D32]/20 focus:border-[#103D32] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Individual Passengers List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C5A264]" />
                    <span>Pilgrim Passenger Roster ({travellers.length})</span>
                  </h3>
                  {travellers.length > 0 && (
                    <button
                      type="button"
                      onClick={copyLeadToTraveler1}
                      className="text-xs font-semibold text-[#103D32] hover:underline cursor-pointer"
                    >
                      Copy Lead Pilgrim to Pilgrim 1
                    </button>
                  )}
                </div>

                {travellers.map((traveller, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white space-y-3.5 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#103D32] text-white flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Pilgrim {idx + 1} {idx === 0 && "(Lead Traveler)"}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">Passport Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-1 space-y-1">
                        <label className="text-[11px] font-medium text-slate-600">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          placeholder="As on passport"
                          value={traveller.fullName}
                          onChange={(e) => updateTraveller(idx, "fullName", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-[#103D32] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-600">
                          Gender
                        </label>
                        <select
                          value={traveller.gender}
                          onChange={(e) => updateTraveller(idx, "gender", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-[#103D32] outline-none"
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-600">
                          Age
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={100}
                          value={traveller.age}
                          onChange={(e) =>
                            updateTraveller(idx, "age", parseInt(e.target.value) || 30)
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-[#103D32] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-600">
                          Passport No. (Optional now)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Z1234567"
                          value={traveller.passportNumber}
                          onChange={(e) =>
                            updateTraveller(idx, "passportNumber", e.target.value)
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:ring-1 focus:ring-[#103D32] outline-none uppercase"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Dietary & Mobility Assistance */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A264]" />
                  <span>Special Requests & Assistance</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Wheelchair Assistance at Airport",
                    "Ground Floor Room Preference",
                    "Adjoining Family Rooms",
                    "Diabetic / Low-Sodium Meals",
                    "Senior Citizen Concierge Support",
                  ].map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleRequestTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#103D32] text-white border-[#103D32]"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {tag}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="text"
                  placeholder="Other notes (e.g. traveling with infants, flight seat preference)..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-1 focus:ring-[#103D32] outline-none"
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Dates</span>
                </Button>
                <Button
                  onClick={() => {
                    if (validateStep2()) {
                      setStep(3);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="gap-2 bg-[#103D32] hover:bg-[#194E41] text-white font-semibold px-8 py-3 rounded-xl shadow-xs cursor-pointer text-sm"
                >
                  <span>Continue to Upgrades</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: PILGRIMAGE UPGRADES ================= */}
          {step === 3 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-7 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#103D32] bg-[#103D32]/5 px-3 py-1 rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A264]" />
                  <span>Step 3: Pilgrimage Upgrades</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Curated Pilgrimage Upgrades
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enhance your sacred journey with high-speed bullet train transfers, private luxury chauffeur, and certified Zamzam delivery.
                </p>
              </div>

              <div className="space-y-4">
                {/* Upgrade 1: Haramain Bullet Train */}
                <label
                  className={`p-5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                    upgradeBulletTrain
                      ? "bg-emerald-50/40 border-[#103D32] ring-2 ring-[#103D32]/15 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      checked={upgradeBulletTrain}
                      onChange={(e) => setUpgradeBulletTrain(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#103D32] focus:ring-[#103D32] cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4 text-[#C5A264]" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Haramain High-Speed Bullet Train (Business Class Upgrade)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Travel between Makkah and Madinah in just 2 hours at 300 km/h. Includes Business Class seating, complimentary hot meals, and priority luggage handling.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-[#103D32]">
                      +₹6,500
                    </span>
                    <span className="text-[10px] text-slate-400 block">per pilgrim</span>
                  </div>
                </label>

                {/* Upgrade 2: Private VIP Airport Chauffeur */}
                <label
                  className={`p-5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                    upgradePrivateVehicle
                      ? "bg-emerald-50/40 border-[#103D32] ring-2 ring-[#103D32]/15 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      checked={upgradePrivateVehicle}
                      onChange={(e) => setUpgradePrivateVehicle(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#103D32] focus:ring-[#103D32] cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-[#C5A264]" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          Private Luxury GMC Yukon / Lexus Chauffeur Transfer
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Direct private airport pickup from Jeddah or Madinah to your hotel lobby. Zero waiting for group tour buses or luggage delays.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-[#103D32]">
                      +₹12,000
                    </span>
                    <span className="text-[10px] text-slate-400 block">entire family</span>
                  </div>
                </label>

                {/* Upgrade 3: 5L Zamzam Doorstep Delivery */}
                <label
                  className={`p-5 rounded-2xl border flex items-start justify-between gap-4 cursor-pointer transition-all ${
                    upgradeZamzamDoorstep
                      ? "bg-emerald-50/40 border-[#103D32] ring-2 ring-[#103D32]/15 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      checked={upgradeZamzamDoorstep}
                      onChange={(e) => setUpgradeZamzamDoorstep(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#103D32] focus:ring-[#103D32] cursor-pointer"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-[#C5A264]" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900">
                          5-Liter Sealed Zamzam Water Home Delivery
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Sealed government-certified 5L Zamzam container delivered securely to your home address in India upon return. Zero airport baggage hassle.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-[#103D32]">
                      +₹1,200
                    </span>
                    <span className="text-[10px] text-slate-400 block">per pilgrim</span>
                  </div>
                </label>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Travelers</span>
                </Button>
                <Button
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(4);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 bg-[#103D32] hover:bg-[#194E41] text-white font-semibold px-8 py-3 rounded-xl shadow-xs cursor-pointer text-sm"
                >
                  <span>Continue to Review</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: REVIEW & CONFIRMATION ================= */}
          {step === 4 && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-7 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#103D32] bg-[#103D32]/5 px-3 py-1 rounded-full mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A264]" />
                  <span>Step 4: Review Summary</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Review Pilgrimage Summary
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Double check your group details and itinerary before proceeding to secure payment.
                </p>
              </div>

              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                    Package & Travel Dates
                  </span>
                  <div className="font-display text-base font-bold text-slate-900">
                    {packageData.name}
                  </div>
                  <div className="text-xs text-slate-600">
                    Ex: <strong>{departureCity}</strong> • {formattedDepartureDate} – {formattedReturnDate}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Room: <strong>{roomType.replace("_", " ")}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
                  <span className="text-[10px] font-bold text-[#A07D3E] uppercase tracking-wider block">
                    Lead Contact & Pilgrims ({paxCount})
                  </span>
                  <div className="text-xs font-semibold text-slate-900">
                    {contactName} ({contactPhone})
                  </div>
                  <div className="text-xs text-slate-600 truncate">
                    {contactEmail}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Pilgrims: {travellers.map((t) => t.fullName).filter(Boolean).join(", ")}
                  </div>
                </div>
              </div>

              {/* Inclusions & Distance Badges */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Audited Hotel Accommodations & Distance
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        Makkah: {packageData.makkahHotel?.name || "5-Star Hotel"}
                      </strong>
                      <span className="text-slate-500 text-[11px]">
                        {packageData.makkahHotel?.distanceText || "50m from Haram"} (Walking)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">
                        Madinah: {packageData.madinahHotel?.name || "5-Star Hotel"}
                      </strong>
                      <span className="text-slate-500 text-[11px]">
                        {packageData.madinahHotel?.distanceText || "100m from Prophet's Mosque"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Itemized Price Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Transparent Price Summary
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>
                      Base Package ({roomType.replace("_", " ")}):
                    </span>
                    <span className="font-medium text-slate-900">
                      {formatPriceINR(perPersonPrice)} × {paxCount} = {formatPriceINR(baseTotal)}
                    </span>
                  </div>

                  {upgradeBulletTrain && (
                    <div className="flex justify-between text-slate-600">
                      <span>Bullet Train Business Upgrade:</span>
                      <span className="font-medium text-slate-900">
                        {formatPriceINR(6500 * paxCount)}
                      </span>
                    </div>
                  )}

                  {upgradePrivateVehicle && (
                    <div className="flex justify-between text-slate-600">
                      <span>Private Chauffeur Airport Transfer:</span>
                      <span className="font-medium text-slate-900">
                        {formatPriceINR(12000)}
                      </span>
                    </div>
                  )}

                  {upgradeZamzamDoorstep && (
                    <div className="flex justify-between text-slate-600">
                      <span>5L Zamzam Doorstep Dispatch:</span>
                      <span className="font-medium text-slate-900">
                        {formatPriceINR(1200 * paxCount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>Direct Flights & Saudi Ministry Umrah e-Visa:</span>
                    <span className="text-emerald-700 font-semibold">Included</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>Applicable GST (5%) & Saudi Tourist Taxes:</span>
                    <span className="text-emerald-700 font-semibold">Included</span>
                  </div>

                  <div className="flex justify-between font-bold text-base sm:text-lg text-slate-900 pt-3 border-t border-slate-200">
                    <span>Grand Total:</span>
                    <span className="text-[#103D32]">{formatPriceINR(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Terms and Cancellation Agreement */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-emerald-50/30 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#103D32] focus:ring-[#103D32] h-4 w-4 shrink-0 cursor-pointer"
                  />
                  <span className="leading-relaxed">
                    I agree to the Ziyara{" "}
                    <a href="/terms" target="_blank" className="text-[#103D32] underline font-semibold">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/cancellation-policy" target="_blank" className="text-[#103D32] underline font-semibold">
                      Cancellation Policy
                    </a>
                    . I understand my booking is locked with official Ministry concierge assistance and full price transparency.
                  </span>
                </label>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(3);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Upgrades</span>
                </Button>
                <Button
                  onClick={handleCreateBookingOrder}
                  disabled={isSubmitting || !agreedToTerms}
                  className="gap-2 bg-[#103D32] hover:bg-[#194E41] text-white font-semibold px-8 py-3 rounded-xl shadow-xs cursor-pointer text-sm disabled:opacity-50"
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
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-7 shadow-xs">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted Payment</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Complete Pilgrimage Payment
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose your payment method to complete payment of{" "}
                  <strong className="text-slate-900">{formatPriceINR(grandTotal)}</strong>.
                </p>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "UPI", label: "UPI / QR Code", icon: Smartphone },
                  { id: "CARD", label: "Debit / Credit Card", icon: CreditCard },
                  { id: "NETBANKING", label: "Net Banking", icon: Building },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3.5 rounded-2xl border flex flex-col items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50/50 border-[#103D32] text-[#103D32] ring-2 ring-[#103D32]/15 shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#103D32]" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Method UI Details */}
              {paymentMethod === "UPI" && (
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Simulated QR Code box */}
                    <div className="w-36 h-36 bg-white rounded-2xl border border-slate-200 p-3 flex flex-col items-center justify-center text-center shadow-xs shrink-0">
                      <QrCode className="w-20 h-20 text-[#103D32]" />
                      <span className="text-[9px] font-bold text-slate-500 mt-1 uppercase">
                        Instant Scan
                      </span>
                    </div>

                    <div className="space-y-3 w-full">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Or enter UPI ID / VPA
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. pilgrim@okaxis"
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-1 focus:ring-[#103D32] outline-none"
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
                        <span className="bg-white px-2 py-1 rounded-lg border border-slate-200 font-medium">Google Pay</span>
                        <span className="bg-white px-2 py-1 rounded-lg border border-slate-200 font-medium">PhonePe</span>
                        <span className="bg-white px-2 py-1 rounded-lg border border-slate-200 font-medium">Paytm</span>
                        <span className="bg-white px-2 py-1 rounded-lg border border-slate-200 font-medium">BHIM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "CARD" && (
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8910"
                      defaultValue="4532 8910 2341 8910"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-mono focus:ring-1 focus:ring-[#103D32] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="08/29"
                        defaultValue="08/29"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:ring-1 focus:ring-[#103D32] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-700">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="786"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs sm:text-sm text-slate-900 font-mono focus:ring-1 focus:ring-[#103D32] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "NETBANKING" && (
                <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                  <label className="text-xs font-medium text-slate-700">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:ring-1 focus:ring-[#103D32] outline-none"
                  >
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Security Reassurance */}
              <div className="flex items-center gap-2.5 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Your transaction is verified instantly. No extra surcharge or booking commission.
                </span>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setErrorMessage(null);
                    setStep(4);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={isSubmitting}
                  className="gap-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Review</span>
                </Button>
                <Button
                  onClick={handleVerifyAndCompletePayment}
                  disabled={isSubmitting}
                  className="gap-2 bg-[#103D32] hover:bg-[#194E41] text-white font-semibold px-8 py-3 rounded-xl shadow-xs cursor-pointer text-sm"
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

        {/* ================= RIGHT COLUMN: STICKY ORDER SUMMARY ================= */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-5 lg:sticky lg:top-24">
            {/* Package Thumbnail & Title */}
            <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
              <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 bg-slate-100 border border-slate-200">
                <Image
                  src={packageData.heroImage || "/images/kaaba_sunset_pilgrims.jpg"}
                  alt={packageData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A264]">
                    {packageData.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {packageData.durationDays} Days / {packageData.durationNights} Nights
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
                  {packageData.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span className="text-amber-500 font-bold">★ {packageData.rating}</span>
                  <span>({packageData.reviewCount} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Hotel Distances Badges */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Footprints className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">
                  Makkah: <strong>{packageData.makkahHotel?.distanceText || "50m from Haram"}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Footprints className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">
                  Madinah: <strong>{packageData.madinahHotel?.distanceText || "100m from Masjid An-Nabawi"}</strong>
                </span>
              </div>
            </div>

            {/* Selected Booking Chips */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Departure City:</span>
                <strong className="text-slate-900">{departureCity}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Travel Dates:</span>
                <strong className="text-slate-900">{formattedDepartureDate}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Room Type:</span>
                <strong className="text-slate-900">{roomType.replace("_", " ")}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Pilgrims:</span>
                <strong className="text-slate-900">{paxCount} {paxCount > 1 ? "Persons" : "Person"}</strong>
              </div>
            </div>

            {/* Itemized Price Calculation */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Package Base ({paxCount} × {formatPriceINR(perPersonPrice)}):</span>
                <span className="font-semibold text-slate-900">{formatPriceINR(baseTotal)}</span>
              </div>

              {upgradesTotal > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Selected Upgrades:</span>
                  <span className="font-semibold text-slate-900">{formatPriceINR(upgradesTotal)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Flights & Umrah Visa:</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Taxes & 5% GST:</span>
                <span className="text-emerald-700 font-semibold">Included</span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Total Payable</span>
                  <span className="text-[10px] text-emerald-700 font-medium">All-Inclusive</span>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-bold text-[#103D32]">
                    {formatPriceINR(grandTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Price Lock — Zero hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Official Saudi Ministry Licensed Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>24/7 Pilgrimage Concierge Support</span>
              </div>
            </div>

            {/* Helpline */}
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-[#103D32]" />
                <span className="font-medium">Need Booking Help?</span>
              </div>
              <a
                href="tel:+919820012345"
                className="font-bold text-[#103D32] hover:underline"
              >
                +91 98200 12345
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
