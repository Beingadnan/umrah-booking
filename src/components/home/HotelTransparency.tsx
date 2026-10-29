"use client";

import * as React from "react";
import Link from "next/link";
import { Footprints, Bus, Wifi, Utensils, Dumbbell, ArrowRight } from "lucide-react";

export function HotelTransparency() {
  const hotels = [
    {
      id: "hotel-makkah-1",
      name: "Swissôtel Al Maqam Makkah",
      location: "Haram, Makkah • Makkah",
      distance: "100 meters",
      description: "Direct access to Haram courtyard",
      distanceType: "WALKING",
      badgeLabel: "Pedestrian Walk",
      badgeType: "walk",
      imageUrl: "/images/makkah_clocktower_facade.jpg",
    },
    {
      id: "hotel-makkah-2",
      name: "Pullman ZamZam Makkah",
      location: "Haram, Makkah • Makkah",
      distance: "150 meters",
      description: "Walking distance to King Abdulaziz Gate",
      distanceType: "WALKING",
      badgeLabel: "Pedestrian Walk",
      badgeType: "walk",
      imageUrl: "/images/hero_kaaba_clocktower.jpg",
    },
    {
      id: "hotel-makkah-3",
      name: "Voco Makkah an IHG Hotel",
      location: "Al Shohada District, Makkah • Makkah",
      distance: "1200 meters",
      description: "Shuttle bus to Haram (approx. 10-15 min)",
      distanceType: "SHUTTLE",
      badgeLabel: "24/7 Shuttle Bus",
      badgeType: "shuttle",
      imageUrl: "/images/hotel_voco_lobby.jpg",
    },
    {
      id: "hotel-makkah-4",
      name: "Anjum Hotel Makkah",
      location: "Haram, Makkah • Makkah",
      distance: "250 meters",
      description: "Close walking distance via private path",
      distanceType: "WALKING",
      badgeLabel: "Pedestrian Walk",
      badgeType: "walk",
      imageUrl: "/images/prophet_mosque_madinah.jpg",
    },
  ];

  return (
    <section id="hotel-transparency" className="relative py-20 bg-[#123B32] text-white overflow-hidden">
      {/* Real photographic mosque minaret & Green Dome watermark on the left matching reference */}
      <div className="absolute top-0 left-0 bottom-0 w-[440px] pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/images/madinah_banner_bg.jpg"
          alt="Masjid an-Nabawi watermark"
          className="h-full w-full object-cover object-left opacity-30 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#123B32]/60 to-[#123B32]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-block">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C6A66B] px-3.5 py-1 rounded-full border border-[#C6A66B]/40 bg-[#C6A66B]/10">
              RADICAL TRUTH IN HOSPITALITY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            Never Get Missed by 'Near Haram' Again
          </h2>

          <p className="text-xs sm:text-sm text-[#D1DDD8] leading-relaxed max-w-2xl mx-auto">
            Many agencies call hotels 2 kilometres away 'Near Haram'. At Ziyara, we verify the exact distances in metres from the hotel lobby to the outer marble prayer courtyard, and explicitly label pedestrian walking vs shuttle bus rides.
          </p>
        </div>

        {/* 4 White Hotel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden text-[#202824] shadow-lg flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Image & Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-[#EEE8DD]">
                  <img
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    {hotel.badgeType === "walk" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#EBF5FA] text-[#1E7498] shadow-xs">
                        <Footprints className="w-3 h-3" />
                        <span>{hotel.badgeLabel}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] shadow-xs">
                        <Bus className="w-3 h-3" />
                        <span>{hotel.badgeLabel}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="p-4 space-y-2.5">
                  <div>
                    <h3 className="text-xs font-bold text-[#123B32] line-clamp-1">{hotel.name}</h3>
                    <p className="text-[10px] text-[#707873] mt-0.5">{hotel.location}</p>
                  </div>

                  {/* Distance Highlight */}
                  <div className="pt-1">
                    <div className="text-xs font-bold text-[#202824]">{hotel.distance}</div>
                    <p className="text-[10px] text-[#707873]">{hotel.description}</p>
                  </div>

                  {/* Amenities Row */}
                  <div className="flex items-center gap-3 text-[10px] text-[#707873] pt-2 border-t border-[#E7E8E3]">
                    <span className="flex items-center gap-1">
                      <Wifi className="w-2.5 h-2.5" /> Free WiFi
                    </span>
                    <span className="flex items-center gap-1">
                      <Utensils className="w-2.5 h-2.5" /> Restaurant
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-2.5 h-2.5" /> Gym
                    </span>
                  </div>
                </div>
              </div>

              {/* View Hotel CTA Button */}
              <div className="p-4 pt-0">
                <Link href="/packages">
                  <button className="w-full bg-[#123B32] hover:bg-[#1a4a40] text-white text-[11px] font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs">
                    <span>View Hotel</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
