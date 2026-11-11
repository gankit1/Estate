"use client";

import * as React from "react";
import { Award, ShieldCheck, Globe, Building2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AboutStatsProps {
  className?: string;
}

export function AboutStats({ className }: AboutStatsProps) {
  const stats = [
    {
      value: "AED 8.4B+",
      label: "Cumulative Transaction Volume",
      subtext: "Across prime Dubai freehold master developments",
      icon: Building2,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      value: "14+ Years",
      label: "Dubai Market Leadership",
      subtext: "Continuous advisory through multiple market cycles",
      icon: Award,
      color: "text-amber-800 bg-amber-100 border-amber-300/60",
    },
    {
      value: "98.2%",
      label: "Investor Client Retention",
      subtext: "Long-term portfolio management & repeat acquisitions",
      icon: ShieldCheck,
      color: "text-emerald-800 bg-emerald-100 border-emerald-300/60",
    },
    {
      value: "65+ Nationalities",
      label: "Global Client Base",
      subtext: "Bespoke multilingual private wealth stewardship",
      icon: Globe,
      color: "text-navy-800 bg-navy-100 border-navy-300/60",
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
              <div className="font-display text-2xl sm:text-3xl font-semibold text-text tracking-tight">
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
