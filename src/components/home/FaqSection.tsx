"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SEED_FAQS } from "@/db/seed-data";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-t border-[#E8ECE9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold text-[#C5A264] uppercase tracking-widest">
            — Clear & Honest Guidance —
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#103D32]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[#556059]">
            Everything you need to know about package pricing, verified hotel distances, and visa procedures.
          </p>
        </div>

        <div className="space-y-4">
          {SEED_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E7E8E3] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[#123B32]">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#707873] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#123B32]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-[#707873] leading-relaxed whitespace-pre-line border-t border-[#FAF9F6] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-[#E7E8E3] p-6 text-center space-y-3">
          <h3 className="text-base font-bold text-[#123B32]">Have a specific query about your family group?</h3>
          <p className="text-xs sm:text-sm text-[#707873]">
            Our knowledgeable team in Mumbai is available 6 days a week to clarify your itinerary.
          </p>
          <div className="pt-1 flex items-center justify-center gap-3">
            <Link href="/contact">
              <Button size="sm" variant="outline" className="gap-2">
                <MessageSquare className="w-4 h-4 text-[#285B4D]" />
                Send an Enquiry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
