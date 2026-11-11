"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Percent,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  mockInvestmentDistricts,
} from "@/lib/data/mock-investment";

interface DistrictYieldMatrixProps {
  className?: string;
}

type FilterTab = "all" | "high-yield" | "high-growth" | "golden-visa" | "ultra-prime";

export function DistrictYieldMatrix({ className }: DistrictYieldMatrixProps) {
  const [activeTab, setActiveTab] = React.useState<FilterTab>("all");

  const filteredDistricts = React.useMemo(() => {
    let list = [...mockInvestmentDistricts];
    if (activeTab === "high-yield") {
      list = list.filter((d) => d.grossRentalYield >= 7.0);
    } else if (activeTab === "high-growth") {
      list = list.filter((d) => d.capitalGrowth1Yr >= 14.0);
    } else if (activeTab === "golden-visa") {
      list = list.filter((d) => d.avgStartingPrice <= 2500000 && d.goldenVisaEligible);
    } else if (activeTab === "ultra-prime") {
      list = list.filter((d) => d.avgPricePerSqft >= 2500 || d.slug.includes("palm"));
    }
    return list;
  }, [activeTab]);

  const tabs: { id: FilterTab; label: string; count: number }[] = [
    { id: "all", label: "All Corridors", count: mockInvestmentDistricts.length },
    {
      id: "high-yield",
      label: "High Cashflow (7%+)",
      count: mockInvestmentDistricts.filter((d) => d.grossRentalYield >= 7.0).length,
    },
    {
      id: "high-growth",
      label: "Capital Expansion (14%+)",
      count: mockInvestmentDistricts.filter((d) => d.capitalGrowth1Yr >= 14.0).length,
    },
    {
      id: "golden-visa",
      label: "Golden Visa Entry (< 2.5M)",
      count: mockInvestmentDistricts.filter((d) => d.avgStartingPrice <= 2500000 && d.goldenVisaEligible).length,
    },
    {
      id: "ultra-prime",
      label: "Ultra-Prime Trophy",
      count: mockInvestmentDistricts.filter((d) => d.avgPricePerSqft >= 2500 || d.slug.includes("palm")).length,
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Percent className="w-3.5 h-3.5 text-secondary" />
            ROI & Yield Heatmap
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Prime Dubai Investment Corridors
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Live gross rental yields, 1-year and 3-year capital appreciation metrics, and tenant occupancy rates curated across Dubai&apos;s leading master developments.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-sand-100 p-1.5 rounded-2xl border border-sand-200 self-start md:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-xs font-semibold"
                  : "text-text-muted hover:text-text hover:bg-surface/50"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "text-3xs font-mono px-1.5 py-0.2 rounded-full",
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-sand-200 text-text-muted"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Investment Districts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDistricts.map((district) => (
          <div
            key={district.id}
            className="bg-surface border border-sand-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image banner with high-contrast text */}
              <div className="relative aspect-[16/10] w-full bg-sand-200 overflow-hidden">
                <Image
                  src={district.heroImage}
                  alt={district.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent z-10" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                  <span className="text-3xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-primary border border-white/40 shadow-xs">
                    {district.categoryLabel}
                  </span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                    {district.grossRentalYield}% ROI
                  </span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                  <h4 className="font-display text-lg font-semibold text-white drop-shadow-sm leading-tight">
                    {district.name}
                  </h4>
                  <span className="text-3xs text-sand-200/90 block mt-0.5 truncate">
                    {district.tagline}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-2xs">
                  <div className="bg-sand-50 p-2 rounded-lg border border-sand-200/80">
                    <span className="text-text-muted block">1-Yr Capital Growth</span>
                    <span className="font-mono font-bold text-primary block mt-0.5 text-xs">
                      +{district.capitalGrowth1Yr}%
                    </span>
                  </div>
                  <div className="bg-sand-50 p-2 rounded-lg border border-sand-200/80">
                    <span className="text-text-muted block">Price / sq.ft</span>
                    <span className="font-mono font-bold text-text block mt-0.5 text-xs">
                      AED {district.avgPricePerSqft}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-2xs pt-1 border-t border-sand-100">
                  <span className="text-text-muted">Avg. Entry Price:</span>
                  <span className="font-mono font-semibold text-primary">
                    AED {(district.avgStartingPrice / 1000000).toFixed(2)}M
                  </span>
                </div>

                <p className="text-3xs text-text-muted line-clamp-2 leading-relaxed">
                  {district.investmentThesis}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {district.keyHighlights.slice(0, 2).map((h, i) => (
                    <span
                      key={i}
                      className="text-3xs bg-sand-100 text-text px-2 py-0.5 rounded-md border border-sand-200"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Link to Area Guide */}
            <div className="p-4 pt-0">
              <Link
                href={`/areas/${district.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-sand-100 hover:bg-primary hover:text-white text-primary border border-sand-200 transition-colors"
              >
                <span>Explore Area Deep-Dive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
