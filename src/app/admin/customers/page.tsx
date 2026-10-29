import { getAllCustomersAdmin } from "@/services/users";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar } from "lucide-react";

export const metadata = {
  title: "Customer Registry — Ziyara Admin",
};

export default async function AdminCustomersPage() {
  const customers = await getAllCustomersAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#123B32]">Customer Directory</h1>
        <p className="text-xs text-[#707873]">
          Registered pilgrim accounts and primary contact records.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E8E3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] text-[#707873] uppercase text-[10px] tracking-wider border-b border-[#E7E8E3]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Customer Name</th>
                <th className="py-3.5 px-4 font-semibold">Email</th>
                <th className="py-3.5 px-4 font-semibold">Phone Number</th>
                <th className="py-3.5 px-4 font-semibold">Role</th>
                <th className="py-3.5 px-4 font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E8E3]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF9F6]/50">
                  <td className="py-3.5 px-4 font-bold text-[#123B32]">{c.name}</td>
                  <td className="py-3.5 px-4 text-[#707873]">{c.email}</td>
                  <td className="py-3.5 px-4 text-[#202824]">{c.phone || "—"}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={c.role === "ADMIN" ? "gold" : "default"}>{c.role}</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-[#707873]">
                    {new Date(c.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
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
