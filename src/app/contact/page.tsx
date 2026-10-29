"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("+91 ");
  const [city, setCity] = React.useState("Mumbai");
  const [travelMonth, setTravelMonth] = React.useState("November 2026");
  const [travellerCount, setTravellerCount] = React.useState("2");
  const [message, setMessage] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorText, setErrorText] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorText("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          travelMonth,
          travellerCount: parseInt(travellerCount) || 2,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setMessage("");
    } catch (err: unknown) {
      setErrorText((err as Error).message || "Failed to submit enquiry.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#285B4D] uppercase tracking-wider">
              Pilgrim Support
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#123B32]">
              Contact Our Umrah Concierge
            </h1>
            <p className="text-sm text-[#707873]">
              Whether you need customized family room configurations or advice on walking distances, our team is here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-[#E7E8E3] p-6 space-y-6 shadow-xs">
                <h3 className="text-base font-bold text-[#123B32]">Direct Channels</h3>
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#285B4D] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#707873] block">Phone Support (India)</span>
                      <strong className="text-[#123B32] text-sm">+91 98200 12345</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#285B4D] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#707873] block">Official Email</span>
                      <strong className="text-[#103D32] text-sm">concierge@ziyara.com</strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#285B4D] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#707873] block">Registered Office</span>
                      <span className="text-[#202824]">
                        Unit 402, Trade Centre, BKC, Bandra East, Mumbai 400051
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E7E8E3] flex items-center justify-center text-[#285B4D] shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#707873] block">Working Hours</span>
                      <span className="text-[#202824]">
                        Monday – Saturday: 9:30 AM to 7:00 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl border border-[#E7E8E3] p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#123B32]">Request a Callback or Custom Quote</h3>
                  <p className="text-xs text-[#707873] mt-1">
                    Fill out your preferences and an Umrah specialist will get back to you within 2 hours.
                  </p>
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>
                      Thank you! Your enquiry has been received. Our concierge team will reach out to you shortly.
                    </span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>{errorText}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#123B32]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Tariq Mansoor"
                        className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#123B32]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tariq@gmail.com"
                        className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#123B32]">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#123B32]">Departure City</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
                      >
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#123B32]">Travel Month</label>
                      <select
                        value={travelMonth}
                        onChange={(e) => setTravelMonth(e.target.value)}
                        className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl px-3.5 py-2.5 text-xs text-[#202824]"
                      >
                        <option value="November 2026">November 2026</option>
                        <option value="December 2026">December 2026</option>
                        <option value="January 2027">January 2027</option>
                        <option value="February 2027">February 2027</option>
                        <option value="March 2027">March 2027 (Ramadan)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#123B32]">
                      Your Requirements / Questions *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know how many adults/children, hotel preferences, or special assistance needed..."
                      className="w-full bg-[#FAF9F6] border border-[#E7E8E3] rounded-xl p-3.5 text-xs text-[#202824]"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full sm:w-auto font-bold gap-2">
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
