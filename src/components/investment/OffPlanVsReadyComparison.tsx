"use client";

import * as React from "react";
import Link from "next/link";
import {
  Layers,
  KeyRound,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface OffPlanVsReadyComparisonProps {
  className?: string;
}

export function OffPlanVsReadyComparison({ className }: OffPlanVsReadyComparisonProps) {
  const [selectedStrategy, setSelectedStrategy] = React.useState<"off-plan" | "ready">("off-plan");

  const offPlanPros = [
    "Lower Initial Outlay: 10%–20% down payment to secure the asset",
    "Interest-Free Payment Plans: 60/40, 70/30, or post-handover schedules directly from developers",
    "Capital Gain During Construction: Asset value appreciates as construction milestones complete",
    "Zero Brokerage Commissions: Direct developer pricing and registration fee waivers (e.g. 50% or 100% DLD waiver)",
    "Modern Sustainable Architecture: Highest energy efficiency, smart home tech, and brand-new warranty",
  ];

  const readyPros = [
    "Immediate Cash Flow: Earn 6.5%–9% gross rental income from Day 1 of acquisition",
    "Instant Golden Visa Eligibility: Immediate Title Deed issuance allows immediate residency application",
    "Tangible Physical Inspection: Inspect build quality, views, acoustic isolation, and building amenities in person",
    "Proven Historic Occupancy: Established community track record with transparent service charge history",
    "Immediate Mortgage Availability: Up to 80% LTV financing available for qualifying residents and 50% for non-residents",
  ];

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5 text-secondary" />
            Asset Class Strategy
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Off-Plan vs. Ready Secondary Investment
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Choosing the right real estate vehicle depends on your liquidity profile, cashflow expectations, and investment timeline.
          </p>
        </div>

        {/* Strategy Switcher for Mobile */}
        <div className="flex md:hidden bg-sand-100 p-1 rounded-xl border border-sand-200">
          <button
            type="button"
            onClick={() => setSelectedStrategy("off-plan")}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all",
              selectedStrategy === "off-plan" ? "bg-primary text-white shadow-xs" : "text-text-muted"
            )}
          >
            Off-Plan Projects
          </button>
          <button
            type="button"
            onClick={() => setSelectedStrategy("ready")}
            className={cn(
              "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all",
              selectedStrategy === "ready" ? "bg-primary text-white shadow-xs" : "text-text-muted"
            )}
          >
            Ready Secondary
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Off-Plan Card */}
        <div
          className={cn(
            "rounded-3xl p-6 sm:p-7 border transition-all space-y-6 flex flex-col justify-between",
            selectedStrategy === "off-plan" ? "block" : "hidden md:flex",
            "bg-sand-50/60 border-sand-200 hover:border-primary/40 hover:shadow-xs"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-xs">
                <Layers className="w-5 h-5 text-secondary" />
              </span>
              <span className="text-2xs font-mono font-bold uppercase tracking-wider text-primary bg-secondary/15 border border-secondary/30 px-3 py-1 rounded-full">
                Capital Expansion Play
              </span>
            </div>

            <div>
              <h4 className="font-display text-xl sm:text-2xl font-semibold text-text">
                Off-Plan Development
              </h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Purchasing brand-new residential towers or master-community villas under construction with phased developer milestone payments.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-2xs font-semibold uppercase tracking-wider text-text block">
                Key Strategic Advantages:
              </span>
              <ul className="space-y-2">
                {offPlanPros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-sand-200/80">
            <Link
              href="/new-projects"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-white hover:bg-navy-900 text-xs font-semibold tracking-wide transition-colors shadow-xs"
            >
              <span>Explore Dubai Off-Plan Projects</span>
              <ArrowRight className="w-4 h-4 text-secondary" />
            </Link>
          </div>
        </div>

        {/* Ready Secondary Card */}
        <div
          className={cn(
            "rounded-3xl p-6 sm:p-7 border transition-all space-y-6 flex flex-col justify-between",
            selectedStrategy === "ready" ? "block" : "hidden md:flex",
            "bg-sand-50/60 border-sand-200 hover:border-primary/40 hover:shadow-xs"
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-xs">
                <KeyRound className="w-5 h-5 text-secondary" />
              </span>
              <span className="text-2xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
                Immediate Cashflow Play
              </span>
            </div>

            <div>
              <h4 className="font-display text-xl sm:text-2xl font-semibold text-text">
                Ready Secondary Property
              </h4>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Acquiring existing completed residences in established neighborhoods with active tenant leases or immediate vacancy.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-2xs font-semibold uppercase tracking-wider text-text block">
                Key Strategic Advantages:
              </span>
              <ul className="space-y-2">
                {readyPros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-sand-200/80">
            <Link
              href="/properties?purpose=sale"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface hover:bg-sand-100 text-primary border border-sand-200 text-xs font-semibold tracking-wide transition-colors shadow-2xs"
            >
              <span>Browse Ready Luxury Properties</span>
              <ArrowRight className="w-4 h-4 text-secondary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
