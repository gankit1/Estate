"use client";

import * as React from "react";
import { Car, Plane, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface VipChauffeurServiceCardProps {
  className?: string;
}

export function VipChauffeurServiceCard({
  className,
}: VipChauffeurServiceCardProps) {
  const perks = [
    "Complimentary DXB & DWC Airport Meet & Assist with Private Terminal Chauffeur",
    "Curated Luxury Fleet (Mercedes Maybach, Range Rover Autobiography)",
    "Bespoke 1-on-1 Community Property Tours guided by a Senior Investment Director",
    "Private Yacht Tours for Waterfront Islands (Palm Jumeirah & Bluewaters)",
  ];

  return (
    <div
      className={cn(
        "bg-navy-950 text-white rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-xl",
        className
      )}
    >
      <div
        className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/40 text-xs font-semibold">
            <Plane className="w-4 h-4 text-secondary" />
            Visiting Dubai from Overseas?
          </div>

          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">
            VIP Airport Reception &amp; Chauffeured Property Tours
          </h3>

          <p className="text-xs sm:text-sm text-sand-200 leading-relaxed max-w-2xl">
            We provide our international private clients with seamless, door-to-door hospitality. From the moment your flight lands in Dubai, our private concierge handles executive transfers and tailored master community inspections.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-sand-100">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-300 shrink-0 mt-0.5" />
                <span className="leading-snug">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-3">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971501234567"}?text=Hello%20Pacific%20Star%20Realty,%20I%20am%20planning%20a%20visit%20to%20Dubai%20and%20would%20like%20to%20request%20the%20VIP%20Chauffeured%20Property%20Tour.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-secondary text-navy-950 hover:bg-gold-300 text-xs sm:text-sm font-semibold tracking-wide transition-colors shadow-lg"
          >
            <Car className="w-4 h-4" />
            <span>Request Chauffeur Tour</span>
          </a>
          <span className="text-3xs text-sand-300/80">
            Available for qualified buyers and family offices by prior notice.
          </span>
        </div>
      </div>
    </div>
  );
}
