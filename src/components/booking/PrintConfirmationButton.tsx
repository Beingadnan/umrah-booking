"use client";

import * as React from "react";
import { Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintConfirmationButton() {
  const [printed, setPrinted] = React.useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      setPrinted(true);
      window.print();
      setTimeout(() => setPrinted(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handlePrint}
      className="inline-flex items-center gap-2 border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900 shadow-xs text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
      title="Print or Save PDF Receipt"
    >
      {printed ? (
        <Check className="w-4 h-4 text-emerald-600" />
      ) : (
        <Printer className="w-4 h-4 text-emerald-800" />
      )}
      <span>{printed ? "Printed" : "Print Voucher"}</span>
    </Button>
  );
}
