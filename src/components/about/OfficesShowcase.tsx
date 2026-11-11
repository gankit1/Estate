"use client";

import * as React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { mockOffices } from "@/lib/data/mock-about";

interface OfficesShowcaseProps {
  onBookAppointment?: (officeId?: string) => void;
  className?: string;
}

export function OfficesShowcase({
  onBookAppointment,
  className,
}: OfficesShowcaseProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Building className="w-3.5 h-3.5 text-secondary" />
            Our Physical Presence
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Flagship Offices &amp; Private Client Lounges
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Meet our Senior Directors in person at our executive suites in Downtown Dubai or our waterfront lounge in Dubai Marina.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => onBookAppointment?.()}
          className="self-start md:self-auto shrink-0 text-xs font-semibold"
        >
          <Calendar className="w-4 h-4 mr-1.5" />
          Schedule In-Person Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockOffices.map((office) => (
          <div
            key={office.id}
            className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-xs">
                  <MapPin className="w-5 h-5 text-secondary" />
                </span>
                <span className="text-2xs font-mono font-bold uppercase tracking-wider text-primary bg-secondary/15 border border-secondary/30 px-3 py-1 rounded-full">
                  {office.district}
                </span>
              </div>

              <div>
                <h4 className="font-display text-xl sm:text-2xl font-semibold text-text">
                  {office.name}
                </h4>
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  {office.address}
                </p>
              </div>

              {/* Contact info list */}
              <div className="space-y-2.5 pt-2 text-xs border-t border-sand-200/80">
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

              {/* Amenities */}
              <div className="pt-2">
                <span className="text-3xs font-semibold uppercase tracking-wider text-text-muted block mb-2">
                  Office Amenities &amp; Services:
                </span>
                <div className="grid grid-cols-2 gap-2 text-2xs text-text">
                  {office.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-sand-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBookAppointment?.(office.id)}
                className="w-full justify-center text-xs font-semibold"
              >
                <span>Book Appointment at {office.district.split(" ")[0]}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
