"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { SEED_HOTELS } from "@/db/seed-data";

export default function NewPackagePage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [category, setCategory] = React.useState("DELUXE");
  const [durationDays, setDurationDays] = React.useState("15");
  const [durationNights, setDurationNights] = React.useState("14");
  const [basePriceInr, setBasePriceInr] = React.useState("125000");
  const [makkahHotelId, setMakkahHotelId] = React.useState("hotel-makkah-1");
  const [madinahHotelId, setMadinahHotelId] = React.useState("hotel-madinah-1");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const makkahHotels = SEED_HOTELS.filter((h) => h.city === "MAKKAH");
  const madinahHotels = SEED_HOTELS.filter((h) => h.city === "MADINAH");

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          category,
          durationDays: parseInt(durationDays),
          durationNights: parseInt(durationNights),
          basePriceInr: parseInt(basePriceInr),
          makkahHotelId,
          madinahHotelId,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create package");
      }

      router.push("/admin/packages");
      router.refresh();
    } catch (err: unknown) {
      setError((err as Error).message || "An error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#707873] hover:text-[#123B32]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Package List</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E8E3] p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-[#123B32]">Create New Umrah Package</h1>
          <p className="text-xs text-[#707873]">
            Add a transparent itinerary with verified Haramain accommodation.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-[#123B32]">Package Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Winter Deluxe 15-Day Umrah"
              className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824] font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">Category Tier</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
              >
                <option value="VIP">Executive VIP</option>
                <option value="DELUXE">Classic Deluxe</option>
                <option value="ECONOMY">Comfort Economy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">Duration (Days)</label>
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">Duration (Nights)</label>
              <input
                type="number"
                value={durationNights}
                onChange={(e) => setDurationNights(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">Base Price (₹ INR / Pax)</label>
              <input
                type="number"
                value={basePriceInr}
                onChange={(e) => setBasePriceInr(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">Makkah Accommodation</label>
              <select
                value={makkahHotelId}
                onChange={(e) => setMakkahHotelId(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
              >
                {makkahHotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.distanceMeters}m {h.distanceType})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-[#123B32]">Madinah Accommodation</label>
              <select
                value={madinahHotelId}
                onChange={(e) => setMadinahHotelId(e.target.value)}
                className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
              >
                {madinahHotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.distanceMeters}m {h.distanceType})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-[#123B32]">Package Overview Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the flights, hotel features, and catering in clear terms..."
              className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl p-3 text-xs text-[#202824]"
            />
          </div>

          <div className="pt-4 border-t border-[#E7E8E3]">
            <Button type="submit" disabled={loading} className="w-full font-bold">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Publish Package</span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
