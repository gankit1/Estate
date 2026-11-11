"use client";

import * as React from "react";
import {
  Calculator,
  ShieldCheck,
  Building2,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import {
  calculateInvestmentReturns,
  type InvestmentCalcInputs,
} from "@/lib/data/mock-investment";

interface InvestmentCalculatorProps {
  onOpenConsultation?: () => void;
  className?: string;
}

export function InvestmentCalculator({
  onOpenConsultation,
  className,
}: InvestmentCalculatorProps) {
  // Calculator States
  const [currency, setCurrency] = React.useState<"AED" | "USD">("AED");
  const [purchasePriceAed, setPurchasePriceAed] = React.useState<number>(2500000);
  const [grossYieldRate, setGrossYieldRate] = React.useState<number>(7.2);
  const [capitalGrowthRate, setCapitalGrowthRate] = React.useState<number>(10.0);
  const [holdingYears, setHoldingYears] = React.useState<number>(5);
  const [financingMode, setFinancingMode] = React.useState<"cash" | "mortgage">("cash");

  // Conversion rate (1 USD = 3.6725 AED)
  const USD_RATE = 3.6725;

  const results = React.useMemo(() => {
    const inputs: InvestmentCalcInputs = {
      purchasePriceAed,
      grossYieldRate,
      capitalGrowthRate,
      holdingYears,
      financingMode,
      mortgageLtv: 50,
      mortgageInterestRate: 4.5,
    };
    return calculateInvestmentReturns(inputs);
  }, [purchasePriceAed, grossYieldRate, capitalGrowthRate, holdingYears, financingMode]);

  // Formatter helper
  const fmt = (valAed: number) => {
    if (currency === "USD") {
      const usd = Math.round(valAed / USD_RATE);
      return `$${usd.toLocaleString()}`;
    }
    return `AED ${valAed.toLocaleString()}`;
  };

  const pricePresets = [
    { label: "1.2M Entry", value: 1200000 },
    { label: "2.0M Golden Visa", value: 2000000 },
    { label: "3.5M Prime", value: 3500000 },
    { label: "5.0M Executive", value: 5000000 },
    { label: "10.0M Ultra", value: 10000000 },
  ];

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden",
        className
      )}
    >
      {/* Decorative top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden="true"
      />

      {/* Header bar with Currency switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5 text-secondary" />
            Interactive ROI & Yield Model
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Dubai Property Investment & Yield Simulator
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Model institutional cash flows, annual net yields, and cumulative wealth accumulation backed by current Dubai Land Department benchmarks.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 self-start md:self-center bg-sand-100 p-1.5 rounded-xl border border-sand-200">
          <span className="text-2xs font-semibold text-text-muted uppercase px-2">Currency:</span>
          <button
            type="button"
            onClick={() => setCurrency("AED")}
            className={cn(
              "px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer",
              currency === "AED"
                ? "bg-primary text-white shadow-xs"
                : "text-text-muted hover:text-text"
            )}
          >
            AED
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={cn(
              "px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer",
              currency === "USD"
                ? "bg-primary text-white shadow-xs"
                : "text-text-muted hover:text-text"
            )}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* Grid: Inputs (7 cols) + Live Outputs Card (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Property Purchase Price */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-text flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-secondary" />
                Purchase Price
              </label>
              <span className="font-mono text-base sm:text-lg font-bold text-primary">
                {fmt(purchasePriceAed)}
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {pricePresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setPurchasePriceAed(preset.value)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-2xs font-medium border transition-colors cursor-pointer",
                    purchasePriceAed === preset.value
                      ? "bg-primary text-white border-primary shadow-2xs font-semibold"
                      : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <input
              type="range"
              min="800000"
              max="25000000"
              step="100000"
              value={purchasePriceAed}
              onChange={(e) => setPurchasePriceAed(Number(e.target.value))}
              aria-label="Purchase Price Slider"
              className="w-full h-2 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-2xs font-mono text-text-muted">
              <span>AED 800K</span>
              <span>AED 5.0M</span>
              <span>AED 15.0M</span>
              <span>AED 25.0M+</span>
            </div>
          </div>

          {/* 2. Sliders Grid: Yield & Capital Growth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Gross Yield */}
            <div className="space-y-2 bg-sand-50/70 p-4 rounded-2xl border border-sand-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text">Expected Rental Yield</span>
                <span className="font-mono text-sm font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {grossYieldRate.toFixed(1)}% Gross
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="12.0"
                step="0.2"
                value={grossYieldRate}
                onChange={(e) => setGrossYieldRate(Number(e.target.value))}
                aria-label="Rental Yield Slider"
                className="w-full h-1.5 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-3xs text-text-muted">
                Dubai Market Benchmark: 6.5% – 8.8%
              </p>
            </div>

            {/* Annual Capital Growth */}
            <div className="space-y-2 bg-sand-50/70 p-4 rounded-2xl border border-sand-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-text">Annual Capital Growth</span>
                <span className="font-mono text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  {capitalGrowthRate.toFixed(1)}% / yr
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="18.0"
                step="0.5"
                value={capitalGrowthRate}
                onChange={(e) => setCapitalGrowthRate(Number(e.target.value))}
                aria-label="Capital Growth Slider"
                className="w-full h-1.5 bg-sand-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <p className="text-3xs text-text-muted">
                Prime Historical Avg: 10.0% – 15.0%
              </p>
            </div>
          </div>

          {/* 3. Holding Period & Financing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Holding Horizon */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text block">
                Investment Horizon
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[3, 5, 7, 10].map((years) => (
                  <button
                    key={years}
                    type="button"
                    onClick={() => setHoldingYears(years)}
                    className={cn(
                      "py-2 text-center text-xs font-medium rounded-xl border transition-all cursor-pointer",
                      holdingYears === years
                        ? "bg-primary text-white border-primary shadow-2xs font-semibold"
                        : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                    )}
                  >
                    {years} Years
                  </button>
                ))}
              </div>
            </div>

            {/* Financing Option */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text block">
                Financing Structure
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setFinancingMode("cash")}
                  className={cn(
                    "py-2 text-center text-xs font-medium rounded-xl border transition-all cursor-pointer",
                    financingMode === "cash"
                      ? "bg-primary text-white border-primary shadow-2xs font-semibold"
                      : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                  )}
                >
                  100% Cash
                </button>
                <button
                  type="button"
                  onClick={() => setFinancingMode("mortgage")}
                  className={cn(
                    "py-2 text-center text-xs font-medium rounded-xl border transition-all cursor-pointer",
                    financingMode === "mortgage"
                      ? "bg-primary text-white border-primary shadow-2xs font-semibold"
                      : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                  )}
                >
                  50% Mortgage (4.5%)
                </button>
              </div>
            </div>
          </div>

          {/* 4. One-Off Closing Costs Breakdown Card */}
          <div className="bg-sand-50/90 border border-sand-200 rounded-2xl p-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between font-semibold text-text pb-1 border-b border-sand-200">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-secondary" />
                Dubai Land Department & Closing Costs (Estimated)
              </span>
              <span className="font-mono text-primary font-bold">
                {fmt(results.totalAcquisitionCostsAed)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-2xs text-text-muted pt-1">
              <div>
                <span className="block">DLD Transfer (4%)</span>
                <span className="font-mono font-medium text-text mt-0.5 block">
                  {fmt(results.dldFeeAed)}
                </span>
              </div>
              <div>
                <span className="block">Agency (2% + VAT)</span>
                <span className="font-mono font-medium text-text mt-0.5 block">
                  {fmt(results.agencyFeeAed)}
                </span>
              </div>
              <div>
                <span className="block">Trustee & Admin</span>
                <span className="font-mono font-medium text-text mt-0.5 block">
                  {fmt(results.adminTrusteeFeeAed)}
                </span>
              </div>
            </div>
            <p className="text-3xs text-text-muted pt-1">
              *0% Annual Municipal Property Tax. 0% Capital Gains Tax upon future resale.
            </p>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-navy-950 text-white rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          {/* Background subtle watermark */}
          <div
            className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/10 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-6 relative z-10">
            {/* Top Golden Visa Qualification Status */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
              <span className="text-2xs font-semibold uppercase tracking-wider text-sand-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                06-Year UAE Golden Visa Status
              </span>
              {results.goldenVisaEligible ? (
                <span className="whitespace-nowrap shrink-0 text-2xs font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full">
                  ✓ Eligible (AED 2M+)
                </span>
              ) : (
                <span className="whitespace-nowrap shrink-0 text-2xs font-mono font-medium text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-1 rounded-full">
                  Add {fmt(results.goldenVisaShortfallAed)} for Visa
                </span>
              )}
            </div>

            {/* Total Estimated Return Highlight */}
            <div className="space-y-1">
              <span className="text-2xs font-medium uppercase tracking-widest text-secondary block">
                Total Projected Wealth Creation ({holdingYears} Years)
              </span>
              <div className="flex items-baseline gap-3">
                <h4 className="font-display text-3xl sm:text-4xl font-light text-white tracking-tight">
                  {fmt(results.totalEstimatedReturnAed)}
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  +{results.totalRoiPercentage}% ROI
                </span>
              </div>
              <p className="text-2xs text-sand-200/80">
                Combined net rental income + capital appreciation minus acquisition fees.
              </p>
            </div>

            {/* Metric Blocks */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-2xs text-sand-300 block mb-1">
                  Annual Gross Rent
                </span>
                <span className="font-mono text-base font-bold text-white block">
                  {fmt(results.annualGrossRentalIncomeAed)}
                </span>
                <span className="text-3xs text-emerald-400 font-mono mt-0.5 block">
                  {grossYieldRate.toFixed(1)}% Gross Yield
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-2xs text-sand-300 block mb-1">
                  Annual Net Cashflow
                </span>
                <span className="font-mono text-base font-bold text-white block">
                  {fmt(results.annualNetCashFlowAed)}
                </span>
                <span className="text-3xs text-sand-300 font-mono mt-0.5 block">
                  ~{results.annualNetYieldPercent}% Net Yield
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-2xs text-sand-300 block mb-1">
                  Cumulative Net Rent
                </span>
                <span className="font-mono text-base font-bold text-secondary block">
                  {fmt(results.cumulativeNetRentalIncomeAed)}
                </span>
                <span className="text-3xs text-sand-300 mt-0.5 block">
                  Over {holdingYears} Years
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                <span className="text-2xs text-sand-300 block mb-1">
                  Projected Value at Exit
                </span>
                <span className="font-mono text-base font-bold text-white block">
                  {fmt(results.projectedPropertyValueAtExitAed)}
                </span>
                <span className="text-3xs text-emerald-400 font-mono mt-0.5 block">
                  +{fmt(results.totalCapitalAppreciationAed)} Gain
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
            <Button
              variant="secondary"
              size="lg"
              onClick={onOpenConsultation}
              className="w-full justify-center text-xs sm:text-sm font-semibold tracking-wide shadow-md"
            >
              Book Private Portfolio Briefing
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
            <p className="text-center text-3xs text-sand-200/70">
              Personalized asset allocation with Senior Investment Directors. Confidential & Compliant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
