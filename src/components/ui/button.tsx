import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-xl";

    const variants = {
      primary:
        "bg-[#123B32] text-white hover:bg-[#1a4a40] active:scale-[0.99] shadow-sm focus-visible:ring-[#123B32]",
      secondary:
        "bg-[#285B4D] text-white hover:bg-[#346f5e] active:scale-[0.99] focus-visible:ring-[#285B4D]",
      outline:
        "border border-[#E7E8E3] bg-white text-[#202824] hover:bg-[#FAF9F6] hover:border-[#D5D7D1] focus-visible:ring-[#123B32]",
      ghost:
        "text-[#202824] hover:bg-[#EEE8DD]/40 hover:text-[#123B32] focus-visible:ring-[#123B32]",
      gold:
        "bg-[#C6A66B] text-[#123B32] font-semibold hover:bg-[#d6b77d] active:scale-[0.99] shadow-sm focus-visible:ring-[#C6A66B]",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 active:scale-[0.99] focus-visible:ring-red-600",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs tracking-wide",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-7 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
