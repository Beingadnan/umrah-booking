"use client";

import * as React from "react";
import Link from "next/link";
import { formatPriceINR } from "@/lib/utils";
import { ROOM_MULTIPLIERS, calculateBookingTotal } from "@/services/bookings";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calendar, Users, PhoneCall, ArrowRight, CheckCircle2 } from "lucide-react";
import type { PopulatedPackage } from "@/services/packages";

interface BookingStickyCardProps {
  packageData: PopulatedPackage;
}

export function BookingStickyCard({ packageData }: BookingStickyCardProps) {
  const [roomType, setRoomType] = React.useState<string>("SHARING_4");
  const [travellerCount, setTravellerCount] = React.useState<number>(2);
  const [selectedDeparture, setSelectedDeparture] = React.useState<string>(
    packageData.departures?.[0]?.id || ""
  );

  const { perPersonPrice, total } = calculateBookingTotal(
    packageData.basePriceInr,
    travellerCount,
    roomType
  );

  return (
    <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 shadow-md space-y-6 sticky top-28">
      {/* Price Header */}
      <div className="pb-4 border-b border-[#E7E8E3]">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#707873]">
          Estimated Price
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-extrabold text-[#123B32]">
            {formatPriceINR(perPersonPrice)}
          </span>
          <span className="text-xs text-[#707873]">/ person</span>
        </div>
        <p className="text-[11px] text-[#285B4D] font-medium mt-1">
          Includes Flights, 5-Star / Walking Hotels, Visas & Meals
        </p>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#123B32] uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#C6A66B]" />
          Available Departure Date
        </label>
        <select
          value={selectedDeparture}
          onChange={(e) => setSelectedDeparture(e.target.value)}
          className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3 py-2.5 text-xs text-[#202824] font-medium focus:ring-1 focus:ring-[#123B32]"
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
                {dStart} – {dEnd} ({dep.availableSeats} seats left)
              </option>
            );
          })}
        </select>
      </div>

      {/* Room Occupancy Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#123B32] uppercase tracking-wider">
          Room Occupancy Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "SHARING_4", label: "Quad (4 Sharing)", desc: "Standard Base" },
            { id: "TRIPLE_3", label: "Triple (3 Bed)", desc: "+10% supplement" },
            { id: "DOUBLE_2", label: "Double (Couple)", desc: "+25% supplement" },
            { id: "SINGLE_1", label: "Private Single", desc: "Private Room" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRoomType(item.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                roomType === item.id
                  ? "bg-[#FAF9F6] border-[#123B32] text-[#123B32]"
                  : "border-[#E7E8E3] text-[#707873] hover:border-[#D5D7D1]"
              }`}
            >
              <div className="text-xs font-bold">{item.label}</div>
              <div className="text-[10px] text-[#707873]">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Traveller Count */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#123B32] uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#C6A66B]" />
            Number of Pilgrims
          </label>
          <span className="text-xs font-bold text-[#123B32]">{travellerCount} Persons</span>
        </div>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 6].map((num) => (
            <button
              key={num}
              onClick={() => setTravellerCount(num)}
              className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                travellerCount === num
                  ? "bg-[#123B32] border-[#123B32] text-white"
                  : "border-[#E7E8E3] text-[#707873] hover:bg-[#FAF9F6]"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Total Breakdown */}
      <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E7E8E3] space-y-2 text-xs">
        <div className="flex justify-between text-[#707873]">
          <span>Per person rate:</span>
          <span>{formatPriceINR(perPersonPrice)}</span>
        </div>
        <div className="flex justify-between text-[#707873]">
          <span>Travellers:</span>
          <span>{travellerCount}</span>
        </div>
        <div className="flex justify-between font-bold text-[#123B32] text-sm pt-2 border-t border-[#E7E8E3]">
          <span>Estimated Total:</span>
          <span>{formatPriceINR(total)}</span>
        </div>
        <p className="text-[10px] text-[#707873] pt-1">
          * Transparent calculation. No hidden agent surcharges.
        </p>
      </div>

      {/* Primary Action Button */}
      <div className="space-y-3">
        <Link
          href={`/booking/${packageData.id}?roomType=${roomType}&pax=${travellerCount}&dep=${selectedDeparture}`}
          className="block w-full"
        >
          <Button size="lg" className="w-full gap-2 font-bold shadow-md">
            <span>Book This Package</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        <Link href="/contact" className="block w-full">
          <Button variant="outline" size="sm" className="w-full gap-2 text-xs border-[#D5D7D1]">
            <PhoneCall className="w-3.5 h-3.5 text-[#285B4D]" />
            <span>Request a Free Callback</span>
          </Button>
        </Link>
      </div>

      {/* Trust reassurance */}
      <div className="pt-2 text-center text-[11px] text-[#707873] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>No advance commitment required to submit</span>
      </div>
    </div>
  );
}
