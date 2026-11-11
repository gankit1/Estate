"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  TrendingUp,
  Percent,
  Train,
  ShieldCheck,
  Award,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice } from "@/lib/utils/format";
import type { EnhancedArea } from "@/lib/data/mock-areas";

interface AreaCompareModalProps {
  areas: EnhancedArea[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveArea: (slug: string) => void;
  onClearAll: () => void;
}

export function AreaCompareModal({
  areas,
  isOpen,
  onClose,
  onRemoveArea,
  onClearAll,
}: AreaCompareModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || areas.length === 0) return null;

  // Highlights comparison
  const highestYield = Math.max(...areas.map((a) => a.avgRentalYield ?? 0));
  const lowestPriceSqft = Math.min(...areas.map((a) => a.avgSalePricePerSqft ?? 999999));
  const highestGrowth = Math.max(...areas.map((a) => a.capitalGrowth1Yr ?? 0));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-surface rounded-2xl sm:rounded-3xl shadow-2xl border border-sand-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-sand-200 bg-sand-50/60 flex items-center justify-between shrink-0">
          <div>
            <span className="text-2xs uppercase tracking-wider text-primary font-semibold block mb-0.5">
              Investment Intelligence
            </span>
            <h2 id="compare-modal-title" className="font-display text-xl sm:text-2xl text-text font-light">
              District Comparison Matrix ({areas.length}/3)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="text-xs text-text-muted hover:text-error flex items-center gap-1 font-medium transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text hover:bg-sand-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body with Side-by-Side Table */}
        <div className="overflow-y-auto overflow-x-auto flex-1 p-4 sm:p-6 md:p-8">
          <div className="min-w-[640px]">
            {/* Area Header Cards */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-sand-200">
              <div className="flex flex-col justify-end text-xs uppercase tracking-wider text-text-muted font-semibold">
                District Overview
              </div>
              {areas.map((area) => (
                <div key={area._id} className="relative bg-sand-50/60 border border-sand-200 rounded-2xl p-4 space-y-3">
                  <button
                    onClick={() => onRemoveArea(area.slug)}
                    aria-label={`Remove ${area.name} from comparison`}
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/80 hover:bg-error hover:text-white flex items-center justify-center text-text-muted shadow-2xs transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-sand-200">
                    <Image
                      src={area.heroImage}
                      alt={area.name}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>

                  <div>
                    <span className="text-2xs font-semibold text-primary uppercase tracking-wider block">
                      {area.categoryLabel}
                    </span>
                    <h3 className="font-display text-lg font-light text-text leading-tight mt-0.5">
                      {area.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-sand-200/70 text-xs sm:text-sm">
              {/* Row 1: Avg. Sale Price / sqft */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">Avg. Price / sqft</span>
                {areas.map((area) => {
                  const isLowest = area.avgSalePricePerSqft === lowestPriceSqft;
                  return (
                    <div key={area._id} className="font-mono font-semibold text-text flex items-center gap-1.5">
                      <span>AED {area.avgSalePricePerSqft?.toLocaleString()}</span>
                      {isLowest && (
                        <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Lowest Entry
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Row 2: Gross Rental Yield (ROI) */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">Gross Rental Yield</span>
                {areas.map((area) => {
                  const isHighest = area.avgRentalYield === highestYield;
                  return (
                    <div key={area._id} className="font-mono font-semibold text-primary flex items-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-secondary" />
                      <span>{area.avgRentalYield}%</span>
                      {isHighest && (
                        <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 rounded bg-gold-100 text-gold-900">
                          Top Yield
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Row 3: 1-Year Capital Growth */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">1-Yr Capital Growth</span>
                {areas.map((area) => {
                  const isHighest = area.capitalGrowth1Yr === highestGrowth;
                  return (
                    <div key={area._id} className="font-mono font-medium text-emerald-700 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+{area.capitalGrowth1Yr}% YoY</span>
                      {isHighest && (
                        <span className="text-[10px] font-sans font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Fastest Growth
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Row 4: Average Annual Rent */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">Avg. Annual Rent (1BR)</span>
                {areas.map((area) => (
                  <span key={area._id} className="font-mono font-medium text-text">
                    {formatPrice(area.avgRentApartment ?? 0, "AED", { compact: true })} / yr
                  </span>
                ))}
              </div>

              {/* Row 5: Minimum Starting Price */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">Starting Purchase Entry</span>
                {areas.map((area) => (
                  <span key={area._id} className="font-display text-base font-semibold text-primary">
                    {formatPrice(area.avgStartingPrice, "AED")}
                  </span>
                ))}
              </div>

              {/* Row 6: Public Transit & Metro */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">Metro &amp; Transit</span>
                {areas.map((area) => (
                  <div key={area._id} className="space-y-1">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-2xs font-medium px-2 py-0.5 rounded-full",
                        area.transportation?.metro
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-sand-100 text-text-muted"
                      )}
                    >
                      <Train className="w-3 h-3" />
                      {area.transportation?.metro ? "Metro Connected" : "Bus / Highway"}
                    </span>
                    {area.transportation?.tram && (
                      <span className="inline-flex items-center gap-1 text-2xs font-medium px-2 py-0.5 rounded-full bg-secondary/15 text-gold-900 ml-1">
                        Tram Loop
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Row 7: Golden Visa Eligibility */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <span className="font-medium text-text-muted">Residency &amp; Ownership</span>
                {areas.map((area) => (
                  <div key={area._id} className="flex flex-col gap-1 text-2xs font-medium">
                    <span className="text-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% Freehold Title
                    </span>
                    <span className="text-gold-700 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      10-Yr Golden Visa Eligible
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 8: Top Schools Nearby */}
              <div className="grid grid-cols-4 gap-4 py-4 items-start">
                <span className="font-medium text-text-muted">Top Schools Nearby</span>
                {areas.map((area) => (
                  <div key={area._id} className="space-y-1 text-2xs text-text-secondary">
                    {area.schoolsNearby?.map((school, i) => (
                      <div key={i} className="truncate">• {school}</div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Row 9: Actions */}
              <div className="grid grid-cols-4 gap-4 pt-6 items-center">
                <span className="font-medium text-text-muted">Next Steps</span>
                {areas.map((area) => (
                  <div key={area._id} className="space-y-2">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      asChild
                      className="rounded-xl text-xs bg-primary text-white hover:bg-primary-hover shadow-xs"
                    >
                      <Link href={`/areas/${area.slug}`}>
                        District Guide
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      asChild
                      className="rounded-xl text-xs"
                    >
                      <Link href={`/properties?area=${encodeURIComponent(area.name)}`}>
                        View Properties
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
