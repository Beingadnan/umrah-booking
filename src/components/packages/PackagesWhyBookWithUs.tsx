import { ShieldCheck, Users, Headphones, Lock } from "lucide-react";

export function PackagesWhyBookWithUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Trusted & Verified Travel Partners",
      description: "Work with certified and reliable operators.",
    },
    {
      icon: Users,
      title: "Custom Packages & Group Discounts",
      description: "Flexible options for families, groups and individuals.",
    },
    {
      icon: Headphones,
      title: "Dedicated Support Team",
      description: "Guidance at every step of your journey.",
    },
    {
      icon: Lock,
      title: "100% Secure Booking",
      description: "Your data and payments are always protected.",
    },
  ];

  return (
    <section className="bg-[#123B32] text-white py-16 border-t border-[#1a4a40] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Title Column */}
          <div className="lg:col-span-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#C6A66B]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C6A66B]">
                WHY BOOK WITH US
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight font-display">
              More Than a Trip, <br />
              <span className="text-[#C6A66B] italic font-normal">It's a Blessing</span>
            </h2>
          </div>

          {/* Center 4 Feature Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-2.5">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-[#C6A66B]/30 flex items-center justify-center text-[#C6A66B] shrink-0">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h3 className="text-xs font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#D1DDD8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Far Right "Umrah Together" Islamic Arch Badge */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative w-28 h-36 rounded-2xl border border-[#C6A66B]/40 bg-white/5 flex flex-col items-center justify-center p-3 text-center shadow-inner">
              {/* Islamic Arch Outline inside badge */}
              <div className="w-full h-full border border-[#C6A66B]/30 rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#C6A66B] mb-1">
                  <path
                    d="M20 4 C14 10, 6 15, 6 25 C6 33, 12 37, 20 37 C28 37, 34 33, 34 25 C34 15, 26 10, 20 4 Z"
                    stroke="#C6A66B"
                    strokeWidth="1.2"
                  />
                  <rect x="15" y="20" width="10" height="12" rx="1" stroke="#C6A66B" strokeWidth="1" />
                  <path d="M15 23 L25 23" stroke="#C6A66B" strokeWidth="1" />
                </svg>
                <span className="font-display italic text-sm text-[#C6A66B] font-semibold tracking-wide">
                  Umrah
                </span>
                <span className="font-display italic text-xs text-white/90">
                  Together
                </span>
                {/* Decorative flourish underline */}
                <div className="w-8 h-[1px] bg-[#C6A66B] mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
