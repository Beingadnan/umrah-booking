import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "secondary" | "outline" | "success" | "warning";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#123B32]/10 text-[#123B32] border border-[#123B32]/20",
    gold: "bg-[#FBF8F1] text-[#916E2E] border border-[#C6A66B]/30 font-medium",
    secondary: "bg-[#EEE8DD] text-[#202824] border border-[#E7E8E3]",
    outline: "border border-[#E7E8E3] text-[#707873] bg-white",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
