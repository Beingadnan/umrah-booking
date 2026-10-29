"use client";

import * as React from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrintConfirmationButton() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handlePrint}
      className="gap-2 border-[#E8E0D0] text-[#18241E] hover:bg-neutral-100 cursor-pointer"
      title="Print or Save PDF Receipt"
    >
      <Printer className="w-4 h-4 text-[#103D32]" />
      <span className="hidden sm:inline">Print Receipt</span>
    </Button>
  );
}
