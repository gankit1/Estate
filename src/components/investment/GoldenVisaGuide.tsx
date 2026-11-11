"use client";

import * as React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Building,
  Clock,
  Sparkles,
  FileText,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { mockGoldenVisaRoadmap } from "@/lib/data/mock-investment";

interface GoldenVisaGuideProps {
  onOpenConsultation?: () => void;
  className?: string;
}

export function GoldenVisaGuide({
  onOpenConsultation,
  className,
}: GoldenVisaGuideProps) {
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [checkValue, setCheckValue] = React.useState<string>("2500000");

  const numericValue = React.useMemo(() => {
    const parsed = parseInt(checkValue.replace(/[^0-9]/g, ""), 10);
    return isNaN(parsed) ? 0 : parsed;
  }, [checkValue]);

  const isEligible = numericValue >= 2000000;
  const shortfall = Math.max(0, 2000000 - numericValue);

  const benefits = [
    {
      title: "06-Year Renewable Residency",
      desc: "Zero local sponsor required, self-sponsored 100% renewable residence status in the United Arab Emirates.",
      icon: ShieldCheck,
    },
    {
      title: "No Minimum Stay Requirement",
      desc: "Unlike standard residence visas, you can remain outside the UAE for more than 6 consecutive months without visa cancellation.",
      icon: Clock,
    },
    {
      title: "Full Family Sponsorship",
      desc: "Sponsor your spouse and unmarried children of any age, plus domestic staff with no residency limits.",
      icon: Users,
    },
    {
      title: "100% Business Ownership & Esaad",
      desc: "Full foreign ownership of commercial enterprises plus automatic entitlement to the exclusive government Esaad discount card.",
      icon: Building,
    },
  ];

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-semibold mb-2">
            <BadgeCheck className="w-3.5 h-3.5 text-secondary" />
            Official Government Framework
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            UAE 06-Year Golden Visa via Real Estate Investment
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Acquire freehold property valued at AED 2,000,000 (~$545,000 USD) or more to secure long-term residency for you and your family with zero personal tax liabilities.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={onOpenConsultation}
          className="self-start lg:self-auto shrink-0 text-xs font-semibold"
        >
          Request Golden Visa Concierge
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>

      {/* 4 Core Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div
              key={idx}
              className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 space-y-2.5 transition-all hover:bg-sand-50 hover:shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-primary text-secondary flex items-center justify-center shadow-2xs">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <h4 className="font-display text-base font-semibold text-text leading-snug">
                {b.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Interactive Visa Checker Strip */}
      <div className="bg-sand-100/80 border border-sand-200 rounded-2xl p-5 sm:p-6 mb-10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Instant Golden Visa Qualification Checker
            </span>
            <p className="text-xs text-text-muted">
              Enter your planned investment amount in AED to verify qualifying threshold:
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-text-muted">
                AED
              </span>
              <input
                type="text"
                value={checkValue}
                onChange={(e) => setCheckValue(e.target.value)}
                aria-label="Planned Investment Amount"
                className="pl-12 pr-4 py-2 text-sm font-mono font-bold text-primary bg-surface border border-sand-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary w-48 sm:w-56"
                placeholder="2,000,000"
              />
            </div>

            {isEligible ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-xl whitespace-nowrap shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Qualifies for 06-Year Visa
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-800 bg-amber-100 border border-amber-300 px-3 py-2 rounded-xl whitespace-nowrap shadow-2xs">
                Need +AED {shortfall.toLocaleString()} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 5-Step Acquisition to Visa Roadmap */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-lg sm:text-xl font-semibold text-text">
            5-Stage Golden Visa Roadmap with Pacific Star VIP Concierge
          </h4>
          <span className="text-2xs font-mono text-text-muted">
            Average Processing Time: 3–4 Weeks
          </span>
        </div>

        {/* Step Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {mockGoldenVisaRoadmap.map((step) => (
            <button
              key={step.step}
              type="button"
              onClick={() => setActiveStep(step.step)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all cursor-pointer",
                activeStep === step.step
                  ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                  : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
              )}
            >
              <div className="flex items-center justify-between text-2xs font-mono mb-1">
                <span className={activeStep === step.step ? "text-secondary font-bold" : "text-text-muted"}>
                  Stage 0{step.step}
                </span>
                <span className={activeStep === step.step ? "text-white/80" : "text-text-muted"}>
                  {step.timeline}
                </span>
              </div>
              <span className="text-xs font-medium block truncate">
                {step.title.split("(")[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Step Details */}
        {(() => {
          const current = mockGoldenVisaRoadmap.find((s) => s.step === activeStep) || mockGoldenVisaRoadmap[0];
          return (
            <div className="bg-sand-50 border border-sand-200 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sand-200 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-secondary flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {current.step}
                  </span>
                  <h5 className="font-display text-base sm:text-lg font-semibold text-text">
                    {current.title}
                  </h5>
                </div>
                <span className="text-2xs font-mono font-semibold px-2.5 py-1 rounded-md bg-secondary/15 text-primary border border-secondary/30 self-start sm:self-auto">
                  Estimated Timeline: {current.timeline}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2">
                <span className="text-2xs font-semibold uppercase tracking-wider text-text block mb-2">
                  Required Documentation & Verification:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.documents.map((doc, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-2xs bg-surface border border-sand-200 px-3 py-1.5 rounded-lg text-text font-medium"
                    >
                      <FileText className="w-3 h-3 text-secondary shrink-0" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
