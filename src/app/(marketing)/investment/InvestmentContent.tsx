"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Percent,
  Coins,
  Sparkles,
  ArrowRight,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";
import { GlobalComparisonTable } from "@/components/investment/GlobalComparisonTable";
import { GoldenVisaGuide } from "@/components/investment/GoldenVisaGuide";
import { DistrictYieldMatrix } from "@/components/investment/DistrictYieldMatrix";
import { OffPlanVsReadyComparison } from "@/components/investment/OffPlanVsReadyComparison";
import { InvestmentFaqAccordion } from "@/components/investment/InvestmentFaqAccordion";
import { InvestmentConsultationModal } from "@/components/investment/InvestmentConsultationModal";
import { mockInvestmentPlaybooks } from "@/lib/data/mock-investment";

export function InvestmentContent() {
  const [isConsultationOpen, setIsConsultationOpen] = React.useState(false);

  const macroStats = [
    {
      label: "Personal & Capital Gains Tax",
      value: "0% Tax-Free",
      sub: "No stamp duty surcharges or annual property taxes",
      icon: ShieldCheck,
      color: "text-emerald-700 bg-emerald-100 border-emerald-300/60",
    },
    {
      label: "Average Gross Rental Yield",
      value: "6.8% – 8.6%",
      sub: "Outperforming London (3.6%) and New York (4.1%)",
      icon: Percent,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    {
      label: "UAE 06-Year Golden Visa",
      value: "AED 2,000,000",
      sub: "~$545,000 USD single or combined freehold property",
      icon: Award,
      color: "text-amber-800 bg-amber-100 border-amber-300/60",
    },
    {
      label: "Currency Security",
      value: "USD Pegged (3.6725)",
      sub: "Zero exchange fluctuation risk for USD investors",
      icon: Coins,
      color: "text-navy-800 bg-navy-100 border-navy-300/60",
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Macro Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {macroStats.map((stat, i) => {
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
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Interactive Investment Calculator */}
      <section id="calculator" aria-label="Investment ROI Calculator">
        <InvestmentCalculator onOpenConsultation={() => setIsConsultationOpen(true)} />
      </section>

      {/* 3. Top Investment Corridors Matrix */}
      <section id="districts" aria-label="Prime Investment Corridors">
        <DistrictYieldMatrix />
      </section>

      {/* 4. Strategic Investment Playbooks */}
      <section id="playbooks" aria-label="Strategic Investment Playbooks" className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Institutional Playbooks
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Curated Investment Strategies for Global Wealth
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Tailored deployment blueprints structured by Pacific Star Realty for family offices, income investors, and private individuals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockInvestmentPlaybooks.map((playbook) => (
            <div
              key={playbook.id}
              className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xs font-mono font-bold uppercase tracking-wider text-primary bg-secondary/15 border border-secondary/30 px-2.5 py-1 rounded-full">
                    {playbook.badge}
                  </span>
                  <span className="text-2xs font-mono text-text-muted">
                    {playbook.horizon}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-xl font-semibold text-text">
                    {playbook.title}
                  </h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {playbook.description}
                  </p>
                </div>

                <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Target Gross Yield:</span>
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                      {playbook.targetYield}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Target Net IRR:</span>
                    <span className="font-mono font-bold text-primary">
                      {playbook.targetIrr}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-muted">Minimum Capital:</span>
                    <span className="font-mono font-medium text-text">
                      {playbook.minCapitalAed.split("(")[0]}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-3xs font-semibold uppercase tracking-wider text-text-muted block">
                    Recommended Allocations:
                  </span>
                  {playbook.sampleAllocation.map((alloc, idx) => (
                    <div key={idx} className="flex justify-between items-center text-2xs text-text">
                      <span className="truncate pr-2">{alloc.asset}</span>
                      <span className="font-mono font-semibold text-primary shrink-0">
                        {alloc.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConsultationOpen(true)}
                className="w-full justify-center text-xs font-semibold"
              >
                Discuss Strategy Allocation
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Global Benchmarking Table */}
      <section id="global-comparison" aria-label="Global City Comparison">
        <GlobalComparisonTable />
      </section>

      {/* 6. UAE Golden Visa Deep-Dive */}
      <section id="golden-visa" aria-label="UAE Golden Visa Guide">
        <GoldenVisaGuide onOpenConsultation={() => setIsConsultationOpen(true)} />
      </section>

      {/* 7. Off-Plan vs Ready Secondary Breakdown */}
      <section id="strategy-comparison" aria-label="Off-Plan vs Ready Comparison">
        <OffPlanVsReadyComparison />
      </section>

      {/* 8. FAQ Accordion */}
      <section id="faqs" aria-label="Investment FAQ">
        <InvestmentFaqAccordion />
      </section>

      {/* 9. VIP Concierge Advisory CTA Strip */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-xl">
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/40 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Institutional Wealth Advisory
          </div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">
            Ready to Structure Your Dubai Real Estate Portfolio?
          </h3>
          <p className="text-xs sm:text-sm text-sand-200 leading-relaxed max-w-2xl">
            Whether deploying private capital into high-cashflow apartments or securing beachfront trophy assets for UAE 06-Year Golden Visa residency, our Senior Directors provide discrete, data-driven stewardship.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsConsultationOpen(true)}
              className="text-xs sm:text-sm font-semibold tracking-wide justify-center shadow-lg"
            >
              Book Private Consultation
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
            <Link
              href="/properties?purpose=sale"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              View Qualifying AED 2M+ Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <InvestmentConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
