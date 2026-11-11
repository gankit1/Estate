"use client";

import * as React from "react";
import { Clock, MessageSquare, Building2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ContactHeroStatsProps {
  className?: string;
}

export function ContactHeroStats({ className }: ContactHeroStatsProps) {
  const stats = [
    {
      value: "< 15 Minutes",
      label: "Average Response Time",
      subtext: "During business hours across all channels",
      icon: Clock,
      color: "text-emerald-800 bg-emerald-100 border-emerald-300/60",
    },
    {
      value: "24/7 Concierge",
      label: "Direct WhatsApp Line",
      subtext: "Instant encrypted messaging with our desk",
      icon: MessageSquare,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      value: "2 Flagship Offices",
      label: "Downtown & Marina",
      subtext: "Boulevard Plaza 1 & Marina Plaza suites",
      icon: Building2,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      value: "RERA ORN 12480",
      label: "Fully Licensed & Regulated",
      subtext: "Dubai Land Department verified fiduciary standards",
      icon: ShieldCheck,
      color: "text-amber-800 bg-amber-100 border-amber-300/60",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="bg-surface border border-sand-200 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold uppercase tracking-wider text-text-muted">
                {stat.label}
              </span>
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center border ${stat.color}`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>
            <div className="space-y-0.5">
              <div className="font-display text-2xl font-semibold text-text tracking-tight">
                {stat.value}
              </div>
              <p className="text-2xs text-text-muted leading-relaxed">
                {stat.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

