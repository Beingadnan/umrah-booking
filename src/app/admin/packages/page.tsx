import Link from "next/link";
import { getPackages } from "@/services/packages";
import { formatPriceINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Package, Footprints, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Package Management — Ziyara Admin",
};

export default async function AdminPackagesPage() {
  const packages = await getPackages();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#123B32]">Package Inventory</h1>
          <p className="text-xs text-[#707873]">
            Configure published itineraries, hotel walking distances, and departure dates.
          </p>
        </div>

        <Link href="/admin/packages/new">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span>Create New Package</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E8E3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] text-[#707873] uppercase text-[10px] tracking-wider border-b border-[#E7E8E3]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Package Name</th>
                <th className="py-3.5 px-4 font-semibold">Tier</th>
                <th className="py-3.5 px-4 font-semibold">Duration</th>
                <th className="py-3.5 px-4 font-semibold">Makkah Hotel</th>
                <th className="py-3.5 px-4 font-semibold">Madinah Hotel</th>
                <th className="py-3.5 px-4 font-semibold">Base Price</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E8E3]">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-[#FAF9F6]/50">
                  <td className="py-3.5 px-4 font-bold text-[#123B32]">
                    <div className="truncate max-w-[200px]">{pkg.name}</div>
                    <div className="text-[10px] text-[#707873] font-mono">/{pkg.slug}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={pkg.category === "VIP" ? "gold" : "default"}>
                      {pkg.category}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-[#707873]">
                    {pkg.durationDays}D / {pkg.durationNights}N
                  </td>
                  <td className="py-3.5 px-4 text-[#202824]">
                    <div>{pkg.makkahHotel?.name}</div>
                    <div className="text-[10px] text-[#285B4D] font-semibold">
                      {pkg.makkahHotel?.distanceMeters}m walk
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#202824]">
                    <div>{pkg.madinahHotel?.name}</div>
                    <div className="text-[10px] text-[#285B4D] font-semibold">
                      {pkg.madinahHotel?.distanceMeters}m walk
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#123B32]">
                    {formatPriceINR(pkg.basePriceInr)}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">Published</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link href={`/packages/${pkg.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
