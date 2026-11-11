"use client";

import * as React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  TrendingUp,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockCompanyPillars } from "@/lib/data/mock-about";

interface OurStorySectionProps {
  className?: string;
}

export function OurStorySection({ className }: OurStorySectionProps) {
  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    TrendingUp,
    Building2,
    Award,
  };

  return (
    <div className={cn("space-y-16", className)}>
      {/* 1. Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left text */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Our Founding Creed
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text tracking-tight leading-tight">
            Redefining Dubai Property Advisory with Institutional Integrity
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-text-muted leading-relaxed">
            <p>
              Founded in 2020 in Downtown Dubai, Pacific Star Realty was created to bridge a critical divide in the United Arab Emirates property market: the gap between high-pressure transactional sales brokerages and genuine fiduciary private wealth advisory.
            </p>
            <p>
              In a rapidly evolving global financial capital, purchasing luxury real estate is rarely just about square footage. It is a strategic allocation of capital—designed to hedge currency volatility, secure tax-free passive yields, protect generational wealth, and unlock UAE 06-Year Golden Visa residency for family members.
            </p>
            <p>
              Every recommendation we make is grounded in rigorous empirical analysis: verified Dubai Land Department (DLD) transaction indices, developer escrow solvency audits, macro master community zoning, and realistic rental yield stress tests.
            </p>
          </div>

          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-text font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Independent &amp; Conflict-Free Representation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Tier-1 Master Developer Direct Allocations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% RERA Certified Senior Directors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Turnkey Property &amp; Tenant Management</span>
            </div>
          </div>
        </div>

        {/* Right Visual Image Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden border border-sand-200/90 shadow-lg aspect-[16/12] sm:aspect-[4/3] bg-navy-950 group">
            <Image
              src="/images/project-downtown.svg"
              alt="Downtown Dubai Architecture"
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent z-10" />

            <div className="absolute bottom-6 left-6 right-6 text-white z-20 space-y-2">
              <span className="text-3xs font-semibold uppercase tracking-widest text-secondary block">
                Fiduciary Excellence
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-light text-white leading-tight">
                Protecting &amp; Growing Your Capital in Dubai
              </h3>
              <p className="text-2xs text-sand-200/90 leading-relaxed">
                Operating out of Boulevard Plaza Tower 1 facing the Burj Khalifa and Marina Plaza on the Dubai waterfront.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Pillars Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Our Operating Principles
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text">
            The Four Pillars of Pacific Star Realty
          </h3>
          <p className="text-text-muted text-xs sm:text-sm">
            How we protect investor capital, guarantee transparency, and deliver outperforming portfolio returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCompanyPillars.map((pillar, i) => {
            const IconComponent = iconMap[pillar.iconName] || ShieldCheck;
            return (
              <div
                key={i}
                className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-xs group-hover:bg-secondary group-hover:text-primary transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <span className="text-2xs font-mono font-bold text-primary bg-secondary/15 px-2.5 py-1 rounded-full border border-secondary/30">
                      {pillar.metrics}
                    </span>
                  </div>

                  <div>
                    <span className="text-3xs font-semibold uppercase tracking-widest text-text-muted block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h4 className="font-display text-lg font-semibold text-text leading-snug">
                      {pillar.title}
                    </h4>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

