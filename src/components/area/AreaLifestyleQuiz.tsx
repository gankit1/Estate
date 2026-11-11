"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { mockDubaiAreas, type EnhancedArea } from "@/lib/data/mock-areas";

interface AreaLifestyleQuizProps {
  onSelectArea?: (area: EnhancedArea) => void;
  className?: string;
}

export function AreaLifestyleQuiz({
  onSelectArea,
  className,
}: AreaLifestyleQuizProps) {
  const [goal, setGoal] = React.useState<"yield" | "growth" | "waterfront" | "family">("yield");
  const [scenery, setScenery] = React.useState<"marine" | "city" | "golf" | "island">("marine");
  const [budget, setBudget] = React.useState<"under-1.5m" | "1.5m-3m" | "3m-7m" | "above-7m">("1.5m-3m");

  // Recommendation engine incorporating goal, scenery, and budget
  const recommendedAreas = React.useMemo(() => {
    let matched = [...mockDubaiAreas];

    if (goal === "yield") {
      matched.sort((a, b) => (b.avgRentalYield ?? 0) - (a.avgRentalYield ?? 0));
    } else if (goal === "growth") {
      matched.sort((a, b) => b.capitalGrowth1Yr - a.capitalGrowth1Yr);
    } else if (goal === "waterfront") {
      matched = matched.filter((a) => a.lifestyleCategory === "waterfront");
    } else if (goal === "family") {
      matched = matched.filter(
        (a) => a.lifestyleCategory === "family" || a.lifestyleCategory === "golf" || a.lifestyleCategory === "luxury-villas"
      );
    }

    // Scenery weighting
    if (scenery === "island") {
      const islandMatches = matched.filter((a) => a.slug.includes("palm") || a.slug.includes("bluewaters"));
      if (islandMatches.length > 0) matched = islandMatches;
    } else if (scenery === "golf") {
      const golfMatches = matched.filter((a) => a.lifestyleCategory === "golf");
      if (golfMatches.length > 0) matched = golfMatches;
    } else if (scenery === "city") {
      const cityMatches = matched.filter((a) => a.lifestyleCategory === "downtown");
      if (cityMatches.length > 0) matched = cityMatches;
    }

    if (budget === "under-1.5m") {
      const affordable = matched.filter((a) => a.avgStartingPrice <= 1500000);
      if (affordable.length > 0) matched = affordable;
    } else if (budget === "1.5m-3m") {
      const mid = matched.filter((a) => a.avgStartingPrice <= 3000000);
      if (mid.length > 0) matched = mid;
    }

    return matched.slice(0, 2);
  }, [goal, scenery, budget]);

  const topMatch = recommendedAreas[0] || mockDubaiAreas[0];

  const fallbackUrl = React.useMemo(() => {
    const slug = (topMatch?.slug || "").toLowerCase();
    if (slug.includes("marina") || slug.includes("bluewaters")) return "/images/hero-dubai.jpg";
    if (slug.includes("palm") || slug.includes("jumeirah")) return "/images/hero-dubai-palm.jpg";
    if (slug.includes("creek") || slug.includes("mbr")) return "/images/hero-dubai-downtown.jpg";
    if (slug.includes("downtown") || slug.includes("business-bay") || slug.includes("difc")) return "/images/hero-dubai-downtown.jpg";
    if (slug.includes("hills") || slug.includes("jvc") || slug.includes("dubailand")) return "/images/hero-dubai-villa.jpg";
    return "/images/hero-dubai-villa.jpg";
  }, [topMatch?.slug]);

  const [imgError, setImgError] = React.useState(false);
  React.useEffect(() => {
    setImgError(false);
  }, [topMatch?.slug, topMatch?.heroImage]);

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden",
        className
      )}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 text-secondary" />
              Community Matcher
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text tracking-tight">
              Find Your Ideal Dubai Neighborhood
            </h3>
            <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
              Select your primary investment goal, environment, and capital range for a tailored neighborhood recommendation.
            </p>
          </div>

          <span className="text-2xs font-mono font-medium px-3 py-1.5 rounded-full bg-secondary/15 text-primary border border-secondary/30 self-start lg:self-auto">
            Algorithm Updated with 2026 DLD Data
          </span>
        </div>

        {/* 3 Step Interactive Selectors & Output Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Goal */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text block mb-2.5">
                1. What is your primary investment focus?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "yield", label: "Max Rental Yield (Cashflow)" },
                  { id: "growth", label: "Rapid Capital Appreciation" },
                  { id: "waterfront", label: "Beachfront & Marina Living" },
                  { id: "family", label: "Family Villa Sanctuary" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoal(item.id as typeof goal)}
                    className={cn(
                      "p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer",
                      goal === item.id
                        ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20 font-semibold"
                        : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scenery */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text block mb-2.5">
                2. Preferred Lifestyle Environment
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "marine", label: "Waterfront & Promenades" },
                  { id: "city", label: "Iconic High-Rise & Downtown" },
                  { id: "golf", label: "Lush Golf Course Parks" },
                  { id: "island", label: "Secluded Private Island" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScenery(item.id as typeof scenery)}
                    className={cn(
                      "p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer",
                      scenery === item.id
                        ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20 font-semibold"
                        : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Budget Range */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-text block mb-2.5">
                3. Target Budget Scope
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "under-1.5m", label: "Under 1.5M" },
                  { id: "1.5m-3m", label: "1.5M – 3.0M" },
                  { id: "3m-7m", label: "3.0M – 7.0M" },
                  { id: "above-7m", label: "7.0M+ Ultra" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBudget(item.id as typeof budget)}
                    className={cn(
                      "p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer",
                      budget === item.id
                        ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20 font-semibold"
                        : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                    )}
                  >
                    AED {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Match Card (5 cols) */}
          <div className="lg:col-span-5 bg-sand-50/80 border border-sand-200 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2.5">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5 min-w-0">
                <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">Your Recommended District Match</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300/80 whitespace-nowrap leading-none shrink-0 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {topMatch.investmentScore}% Fit
              </span>
            </div>

            {/* Match Preview Card */}
            <div className="bg-surface border border-sand-200 rounded-2xl overflow-hidden shadow-2xs group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-sand-200 overflow-hidden">
                <Image
                  src={imgError ? fallbackUrl : (topMatch.heroImage || fallbackUrl)}
                  alt={topMatch.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 1024px) 100vw, 450px"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent z-10" />
                <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                  <span className="text-2xs font-semibold uppercase tracking-widest text-gold-300 drop-shadow-sm block mb-1">
                    {topMatch.categoryLabel}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-light text-white drop-shadow-sm leading-tight">
                    {topMatch.name}
                  </h4>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                  {topMatch.overview}
                </p>

                <div className="grid grid-cols-2 gap-2 text-2xs pt-1">
                  <div className="bg-sand-50 p-2 rounded-lg border border-sand-200/80">
                    <span className="text-text-muted block">Avg. Rental Yield</span>
                    <span className="font-mono font-semibold text-primary block mt-0.5 text-xs">
                      {topMatch.avgRentalYield}% ROI
                    </span>
                  </div>
                  <div className="bg-sand-50 p-2 rounded-lg border border-sand-200/80">
                    <span className="text-text-muted block">Price / sqft</span>
                    <span className="font-mono font-semibold text-text block mt-0.5 text-xs">
                      AED {topMatch.avgSalePricePerSqft}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    fullWidth
                    asChild
                    className="rounded-xl text-xs bg-primary text-white hover:bg-primary-hover shadow-xs"
                  >
                    <Link href={`/areas/${topMatch.slug}`} className="flex items-center justify-center gap-1.5">
                      View District Guide
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                  {onSelectArea && (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      type="button"
                      onClick={() => onSelectArea(topMatch)}
                      className="rounded-xl text-xs border-sand-200"
                    >
                      Book Tour
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <p className="text-2xs text-text-muted text-center">
              Based on historical yield, capital appreciation momentum, and active master community zoning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
