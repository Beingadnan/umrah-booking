"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

interface CopyReferenceButtonProps {
  reference: string;
}

export function CopyReferenceButton({ reference }: CopyReferenceButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-all cursor-pointer"
      title="Copy booking reference"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-300" />
          <span className="text-emerald-300">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-200">Copy</span>
        </>
      )}
    </button>
  );
}

