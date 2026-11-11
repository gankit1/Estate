"use client";

import * as React from "react";
import {
  Calculator,
  Award,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice } from "@/lib/utils/format";

interface PaymentPlanCalculatorProps {
  onOpenConsultation?: () => void;
  className?: string;
}

export function PaymentPlanCalculator({
  onOpenConsultation,
  className,
}: PaymentPlanCalculatorProps) {
  const [budget, setBudget] = React.useState<number>(2500000);
  const [planType, setPlanType] = React.useState<"60-40" | "70-30" | "50-50-post">("60-40");

  // Calculations
  const isGoldenVisa = budget >= 2000000;
  const dldFee = budget * 0.04; // 4% DLD fee

  let bookingPct = 10;
  let constructionPct = 50;
  let handoverPct = 40;
  let postHandoverPct = 0;

  if (planType === "70-30") {
    bookingPct = 10;
    constructionPct = 60;
    handoverPct = 30;
    postHandoverPct = 0;
  } else if (planType === "50-50-post") {
    bookingPct = 10;
    constructionPct = 40;
    handoverPct = 20;
    postHandoverPct = 30;
  }

  const bookingAmount = (budget * bookingPct) / 100;
  const constructionAmount = (budget * constructionPct) / 100;
  const handoverAmount = (budget * handoverPct) / 100;
  const postHandoverAmount = (budget * postHandoverPct) / 100;

  // Estimated gross rental yield (Dubai off-plan benchmark 7.2%)
  const estAnnualRental = budget * 0.072;

  const quickBudgets = [
    { label: "1.2M", value: 1200000 },
    { label: "1.8M", value: 1800000 },
    { label: "2.5M", value: 2500000 },
    { label: "4.0M", value: 4000000 },
    { label: "8.5M", value: 8500000 },
  ];

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xs relative overflow-hidden",
        className
      )}
    >
      {/* Signature luxury top gradient accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-semibold mb-3">
              <Calculator className="w-3.5 h-3.5 text-secondary" />
              Off-Plan Payment Estimator
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text tracking-tight">
              Calculate Your Payment Schedule
            </h3>
            <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
              Model phased capital requirements, milestone disbursements, and check UAE 06-Year Golden Visa eligibility.
            </p>
          </div>

          {/* Golden visa indicator */}
          <div
            className={cn(
              "px-4 py-3 rounded-2xl border flex items-center gap-3.5 transition-all self-start lg:self-auto",
              isGoldenVisa
                ? "bg-gold-50 border-secondary/40 text-text shadow-2xs"
                : "bg-sand-50 border-sand-200 text-text-muted"
            )}
          >
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                isGoldenVisa
                  ? "bg-secondary text-primary font-bold"
                  : "bg-sand-200 text-text-muted"
              )}
            >
              <Award className="w-5 h-5 text-current" />
            </div>
            <div>
              <span
                className={cn(
                  "text-[11px] font-bold uppercase tracking-wider block",
                  isGoldenVisa ? "text-gold-700" : "text-text-muted"
                )}
              >
                {isGoldenVisa ? "Golden Visa Eligible" : "Visa Threshold: AED 2.0M"}
              </span>
              <span className="text-xs font-medium text-text-secondary block mt-0.5">
                {isGoldenVisa
                  ? "Qualifies for 06-Year UAE Residency"
                  : `Add ${formatPrice(2000000 - budget, "AED", { compact: true })} to qualify`}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Controls & Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Sliders & Quick Buttons */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <label className="text-xs font-semibold text-text uppercase tracking-wider">
                  Target Purchase Price
                </label>
                <span className="text-2xl sm:text-3xl font-display font-medium text-primary">
                  {formatPrice(budget, "AED")}
                </span>
              </div>

              {/* Slider */}
              <div className="pt-2">
                <input
                  type="range"
                  min={700000}
                  max={15000000}
                  step={50000}
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2.5 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  aria-label="Target Purchase Price"
                />
                <div className="flex justify-between text-[11px] text-text-muted mt-1.5 font-mono">
                  <span>AED 700K</span>
                  <span>AED 7.5M</span>
                  <span>AED 15M+</span>
                </div>
              </div>

              {/* Quick Select Buttons */}
              <div className="pt-2 border-t border-sand-200">
                <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block mb-2">
                  Popular Price Points:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {quickBudgets.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setBudget(item.value)}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-lg transition-all border font-medium cursor-pointer",
                        budget === item.value
                          ? "bg-primary text-white border-primary shadow-xs font-semibold"
                          : "bg-surface text-text-secondary hover:bg-sand-100 hover:text-text border-sand-200"
                      )}
                    >
                      AED {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Plan Structure Selector */}
            <div>
              <label className="block text-xs font-semibold text-text uppercase tracking-wider mb-2.5">
                Select Payment Structure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPlanType("60-40")}
                  className={cn(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer",
                    planType === "60-40"
                      ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                      : "bg-surface hover:bg-sand-100/70 border-sand-200 text-text"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-bold block",
                      planType === "60-40" ? "text-white" : "text-text"
                    )}
                  >
                    60 / 40
                  </span>
                  <span
                    className={cn(
                      "text-2xs block mt-0.5",
                      planType === "60-40" ? "text-white/80" : "text-text-muted"
                    )}
                  >
                    Standard Off-Plan
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType("70-30")}
                  className={cn(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer",
                    planType === "70-30"
                      ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                      : "bg-surface hover:bg-sand-100/70 border-sand-200 text-text"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-bold block",
                      planType === "70-30" ? "text-white" : "text-text"
                    )}
                  >
                    70 / 30
                  </span>
                  <span
                    className={cn(
                      "text-2xs block mt-0.5",
                      planType === "70-30" ? "text-white/80" : "text-text-muted"
                    )}
                  >
                    Emaar Typical
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType("50-50-post")}
                  className={cn(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer",
                    planType === "50-50-post"
                      ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                      : "bg-surface hover:bg-sand-100/70 border-sand-200 text-text"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-bold block",
                      planType === "50-50-post" ? "text-white" : "text-text"
                    )}
                  >
                    Post-Handover
                  </span>
                  <span
                    className={cn(
                      "text-2xs block mt-0.5",
                      planType === "50-50-post" ? "text-white/80" : "text-text-muted"
                    )}
                  >
                    3-Year Extended
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Estimated Disbursements Grid */}
          <div className="lg:col-span-6 bg-sand-50/70 border border-sand-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold">
                Estimated Milestone Breakdown
              </h4>
              <span className="text-2xs text-primary font-mono font-bold bg-surface px-2.5 py-0.5 rounded-full border border-sand-200">
                100% Total
              </span>
            </div>

            {/* Visual Phased Milestone Bar */}
            <div className="h-2 w-full bg-sand-200 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${bookingPct}%` }}
                className="bg-primary h-full transition-all duration-300"
                title={`Booking: ${bookingPct}%`}
              />
              <div
                style={{ width: `${constructionPct}%` }}
                className="bg-secondary h-full transition-all duration-300"
                title={`Construction: ${constructionPct}%`}
              />
              <div
                style={{ width: `${handoverPct}%` }}
                className="bg-emerald-600 h-full transition-all duration-300"
                title={`Handover: ${handoverPct}%`}
              />
              {postHandoverPct > 0 && (
                <div
                  style={{ width: `${postHandoverPct}%` }}
                  className="bg-amber-500 h-full transition-all duration-300"
                  title={`Post-Handover: ${postHandoverPct}%`}
                />
              )}
            </div>

            <div className="space-y-2.5">
              {/* 1. Down payment */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-sand-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text block">
                      Down Payment ({bookingPct}%)
                    </span>
                    <span className="text-2xs text-text-muted">Due upon reservation &amp; SPA signing</span>
                  </div>
                </div>
                <span className="text-base sm:text-lg font-display font-semibold text-primary">
                  {formatPrice(bookingAmount, "AED")}
                </span>
              </div>

              {/* 2. Construction installments */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-sand-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/25 text-gold-700 text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text block">
                      Construction Milestones ({constructionPct}%)
                    </span>
                    <span className="text-2xs text-text-muted">Spread across construction progress</span>
                  </div>
                </div>
                <span className="text-base sm:text-lg font-display font-semibold text-text">
                  {formatPrice(constructionAmount, "AED")}
                </span>
              </div>

              {/* 3. On Handover */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface border border-sand-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-text block">
                      On Key Handover ({handoverPct}%)
                    </span>
                    <span className="text-2xs text-text-muted">Mortgage financing eligible upon completion</span>
                  </div>
                </div>
                <span className="text-base sm:text-lg font-display font-semibold text-emerald-700">
                  {formatPrice(handoverAmount, "AED")}
                </span>
              </div>

              {/* 4. Post Handover if applicable */}
              {postHandoverPct > 0 && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-amber-900 block">
                        Post-Handover Milestones ({postHandoverPct}%)
                      </span>
                      <span className="text-2xs text-amber-700">Spread over 24–36 monthly checks</span>
                    </div>
                  </div>
                  <span className="text-base sm:text-lg font-display font-semibold text-amber-900">
                    {formatPrice(postHandoverAmount, "AED")}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Metrics: DLD Fee & Yield Forecast */}
            <div className="pt-3 border-t border-sand-200 grid grid-cols-2 gap-3 text-2xs">
              <div className="bg-surface p-3 rounded-xl border border-sand-200">
                <span className="text-text-muted block">DLD Transfer Fee (4%)</span>
                <span className="text-primary font-mono font-semibold block mt-0.5 text-xs sm:text-sm">
                  {formatPrice(dldFee, "AED")}
                </span>
              </div>
              <div className="bg-surface p-3 rounded-xl border border-sand-200">
                <span className="text-text-muted block">Est. Annual Rental Yield</span>
                <span className="text-emerald-700 font-mono font-semibold block mt-0.5 text-xs sm:text-sm">
                  ~{formatPrice(estAnnualRental, "AED", { compact: true })} / yr (7.2%)
                </span>
              </div>
            </div>

            {onOpenConsultation && (
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={onOpenConsultation}
                  className="rounded-xl text-xs sm:text-sm font-semibold justify-center h-11 bg-primary text-white hover:bg-primary-hover shadow-xs cursor-pointer"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Consult an Off-Plan Investment Specialist
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
