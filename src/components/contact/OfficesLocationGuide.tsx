"use client";

import * as React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Train,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockDetailedOffices } from "@/lib/data/mock-contact";

interface OfficesLocationGuideProps {
  className?: string;
}

export function OfficesLocationGuide({ className }: OfficesLocationGuideProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5 text-secondary" />
            Physical Headquarters &amp; Lounges
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Visiting Our Dubai Offices
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Experience discrete, white-glove advisory at our executive headquarters in Downtown Dubai or our private waterfront suite in Dubai Marina.
          </p>
        </div>

        <span className="text-2xs font-mono font-medium px-3 py-1.5 rounded-full bg-sand-100 text-primary border border-sand-200 self-start md:self-auto shrink-0">
          Complimentary Valet Parking at Both Locations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockDetailedOffices.map((office) => (
          <div
            key={office.id}
            className="bg-surface border border-sand-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Header Image Banner with high contrast */}
              <div className="relative aspect-[16/9] w-full bg-sand-200 overflow-hidden">
                <Image
                  src={office.image}
                  alt={office.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent z-10" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                  <span className="text-3xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/95 text-primary border border-white/50 shadow-xs">
                    {office.district}
                  </span>
                  <span className="text-3xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-secondary text-navy-950 shadow-xs">
                    VIP Valet Available
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white z-20">
                  <h4 className="font-display text-xl font-semibold text-white drop-shadow-sm leading-tight">
                    {office.name}
                  </h4>
                  <span className="text-2xs text-gold-300 font-medium block mt-0.5">
                    {office.landmark}
                  </span>
                </div>
              </div>

              {/* Detailed information body */}
              <div className="p-6 space-y-4">
                <p className="text-xs text-text leading-relaxed font-medium">
                  {office.address}
                </p>

                <div className="space-y-2.5 text-xs border-t border-sand-100 pt-3">
                  <div className="flex items-center gap-2.5 text-text">
                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                    <a href={`tel:${office.phone}`} className="font-mono hover:text-primary transition-colors">
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-text">
                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                    <a href={`mailto:${office.email}`} className="font-mono hover:text-primary transition-colors">
                      {office.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-text-muted">
                    <Clock className="w-4 h-4 text-secondary shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>

                {/* Valet & Transit Instructions */}
                <div className="space-y-2 text-2xs bg-sand-50 p-3.5 rounded-2xl border border-sand-200/80">
                  <div className="flex items-start gap-2 text-text">
                    <Car className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text">Valet &amp; Parking:</strong> {office.parking}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-text">
                    <Train className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-text">Metro Transit:</strong> {office.metroTransit}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="pt-1">
                  <span className="text-3xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                    Office Amenities:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-2xs text-text">
                    {office.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="p-6 pt-0 flex gap-2">
              <a
                href={`tel:${office.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-sand-100 hover:bg-primary hover:text-white text-primary border border-sand-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Office</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-primary text-white hover:bg-navy-900 transition-colors shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5 text-secondary" />
                <span>Directions</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

