"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Percent,
  Train,
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice } from "@/lib/utils/format";
import type { EnhancedArea } from "@/lib/data/mock-areas";

interface AreaCardProps {
  area: EnhancedArea;
  viewMode?: "grid" | "list";
  isSelectedForCompare?: boolean;
  onToggleCompare?: (area: EnhancedArea) => void;
  priority?: boolean;
  className?: string;
}

export function AreaCard({
  area,
  viewMode = "grid",
  isSelectedForCompare = false,
  onToggleCompare,
  priority = false,
  className,
}: AreaCardProps) {
  // Local fallback graphic based on category
  const fallbackUrl = React.useMemo(() => {
    const slug = area.slug.toLowerCase();
    if (slug.includes("marina") || slug.includes("bluewaters")) return "/images/project-marina.svg";
    if (slug.includes("palm") || slug.includes("jumeirah")) return "/images/project-palm.svg";
    if (slug.includes("creek") || slug.includes("mbr")) return "/images/project-creek.svg";
    if (slug.includes("downtown") || slug.includes("business-bay") || slug.includes("difc")) return "/images/project-downtown.svg";
    if (slug.includes("hills") || slug.includes("jvc") || slug.includes("dubailand")) return "/images/project-hills.svg";
    return "/images/placeholder.jpg";
  }, [area.slug]);

  const [hasError, setHasError] = React.useState(false);
  const [prevHero, setPrevHero] = React.useState(area.heroImage);

  if (area.heroImage !== prevHero) {
    setPrevHero(area.heroImage);
    setHasError(false);
  }

  const imgSrc = hasError ? fallbackUrl : (area.heroImage || fallbackUrl);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleCompare?.(area);
  };

  /* ── List Mode Layout ───────────────────────────────────────── */
  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "group relative flex flex-col md:flex-row bg-surface border border-sand-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-primary/30 transition-all duration-300",
          isSelectedForCompare && "ring-2 ring-primary border-primary",
          className
        )}
      >
        {/* Left Visual Container */}
        <div className="relative w-full md:w-80 lg:w-96 aspect-[16/10] md:aspect-auto shrink-0 overflow-hidden bg-sand-200">
          <Image
            src={imgSrc}
            alt={area.name}
            fill
            priority={priority}
            unoptimized
            onError={() => setHasError(true)}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 384px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/20 to-transparent" />

          {/* Top category & Compare toggle */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20 text-white text-2xs font-semibold uppercase tracking-wider">
              {area.categoryLabel}
            </span>

            {onToggleCompare && (
              <button
                onClick={handleCompareClick}
                type="button"
                className={cn(
                  "px-2.5 py-1 rounded-full text-2xs font-medium transition-all backdrop-blur-md flex items-center gap-1 cursor-pointer",
                  isSelectedForCompare
                    ? "bg-primary text-white border border-primary shadow-xs"
                    : "bg-white/80 hover:bg-white text-navy-900 border border-white/40 shadow-2xs"
                )}
                aria-pressed={isSelectedForCompare}
              >
                {isSelectedForCompare ? (
                  <>
                    <Check className="w-3 h-3 text-secondary" />
                    Comparing
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3" />
                    Compare
                  </>
                )}
              </button>
            )}
          </div>

          {/* Bottom Overlay ROI and Growth */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
              <Percent className="w-3.5 h-3.5" />
              <span>{area.avgRentalYield}% Avg. Yield</span>
            </div>
            <div className="flex items-center gap-1 text-2xs font-mono font-medium text-emerald-300">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{area.capitalGrowth1Yr}% YoY</span>
            </div>
          </div>
        </div>

        {/* Right Content Body */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
              <Link href={`/areas/${area.slug}`} className="group-hover:text-primary transition-colors">
                <h3 className="font-display text-xl sm:text-2xl font-light text-text tracking-tight">
                  {area.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-medium px-2 py-0.5 rounded-full bg-sand-100 text-text-secondary border border-sand-200">
                  {area.lifestyleRating.toFixed(1)} ★ Rating
                </span>
                <span className="text-2xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Score {area.investmentScore}/100
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-muted line-clamp-2 mb-4 leading-relaxed">
              {area.overview}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs">
              <div className="bg-sand-50 border border-sand-200/80 rounded-xl p-2.5">
                <span className="text-2xs uppercase tracking-wider text-text-muted block">Avg. Price / sqft</span>
                <span className="font-mono font-semibold text-primary block mt-0.5">
                  AED {area.avgSalePricePerSqft?.toLocaleString()}
                </span>
              </div>
              <div className="bg-sand-50 border border-sand-200/80 rounded-xl p-2.5">
                <span className="text-2xs uppercase tracking-wider text-text-muted block">Starting From</span>
                <span className="font-mono font-semibold text-text block mt-0.5">
                  {formatPrice(area.avgStartingPrice, "AED", { compact: true })}
                </span>
              </div>
              <div className="bg-sand-50 border border-sand-200/80 rounded-xl p-2.5">
                <span className="text-2xs uppercase tracking-wider text-text-muted block">Avg. Annual Rent</span>
                <span className="font-mono font-semibold text-text block mt-0.5">
                  {formatPrice(area.avgRentApartment ?? 0, "AED", { compact: true })} / yr
                </span>
              </div>
              <div className="bg-sand-50 border border-sand-200/80 rounded-xl p-2.5">
                <span className="text-2xs uppercase tracking-wider text-text-muted block">Ownership</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Freehold
                </span>
              </div>
            </div>

            {/* Highlights Chips */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {area.transportation?.metro && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs bg-sand-100 text-text-secondary border border-sand-200 font-medium">
                  <Train className="w-3 h-3 text-primary" />
                  Metro Connected
                </span>
              )}
              {area.nearbyPlaces?.slice(0, 2).map((place, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs bg-sand-100 text-text-secondary border border-sand-200 font-medium"
                >
                  <MapPin className="w-3 h-3 text-secondary" />
                  {place.name} ({place.distance})
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-text-muted">
              {area.propertyTypes?.map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" • ")}
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" asChild className="rounded-full text-xs">
                <Link href={`/properties?area=${encodeURIComponent(area.name)}`}>
                  View Available Properties
                </Link>
              </Button>
              <Button
                variant="primary"
                size="sm"
                asChild
                className="rounded-full text-xs bg-primary text-white hover:bg-primary-hover shadow-xs"
              >
                <Link href={`/areas/${area.slug}`} className="flex items-center gap-1.5">
                  Explore District Guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Grid Mode Layout ───────────────────────────────────────── */
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-surface border border-sand-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1",
        isSelectedForCompare && "ring-2 ring-primary border-primary",
        className
      )}
    >
      {/* Visual Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
        <Image
          src={imgSrc}
          alt={area.name}
          fill
          priority={priority}
          unoptimized
          onError={() => setHasError(true)}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

        {/* Top Badges & Compare Toggle */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20 text-white text-2xs font-semibold uppercase tracking-wider">
            {area.categoryLabel}
          </span>

          {onToggleCompare && (
            <button
              onClick={handleCompareClick}
              type="button"
              className={cn(
                "px-2.5 py-1 rounded-full text-2xs font-medium transition-all backdrop-blur-md flex items-center gap-1 cursor-pointer",
                isSelectedForCompare
                  ? "bg-primary text-white border border-primary shadow-xs font-semibold"
                  : "bg-white/80 hover:bg-white text-navy-900 border border-white/40 shadow-2xs"
              )}
              aria-pressed={isSelectedForCompare}
            >
              {isSelectedForCompare ? (
                <>
                  <Check className="w-3 h-3 text-secondary" />
                  Selected
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  Compare
                </>
              )}
            </button>
          )}
        </div>

        {/* Bottom Image Overlay Metrics */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-2xs uppercase tracking-widest text-gold-300 font-semibold block mb-0.5">
              Avg. Rental Yield
            </span>
            <div className="flex items-center gap-1 text-base sm:text-lg font-display font-medium text-white">
              <Percent className="w-3.5 h-3.5 text-secondary" />
              <span>{area.avgRentalYield}% ROI</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xs font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-sm border border-emerald-400/30 text-emerald-300">
              +{area.capitalGrowth1Yr}% 1-Yr Growth
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link href={`/areas/${area.slug}`} className="block group-hover:text-primary transition-colors">
              <h3 className="font-display text-xl sm:text-2xl text-text font-light tracking-tight leading-snug">
                {area.name}
              </h3>
            </Link>
            <span className="text-2xs font-mono font-medium px-2 py-0.5 rounded bg-sand-100 text-text-secondary shrink-0">
              ★ {area.lifestyleRating.toFixed(1)}
            </span>
          </div>

          <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-3">
            {area.overview}
          </p>

          {/* Pricing & Transit Metrics */}
          <div className="grid grid-cols-2 gap-2 bg-sand-50/80 border border-sand-200/90 rounded-xl p-2.5 text-xs">
            <div>
              <span className="text-2xs uppercase tracking-wider text-text-muted font-medium block">
                Avg. Price / sqft
              </span>
              <span className="font-mono font-semibold text-primary block mt-0.5">
                AED {area.avgSalePricePerSqft?.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-2xs uppercase tracking-wider text-text-muted font-medium block">
                Starting Entry
              </span>
              <span className="font-mono font-semibold text-text block mt-0.5">
                {formatPrice(area.avgStartingPrice, "AED", { compact: true })}
              </span>
            </div>
          </div>

          {/* Key Feature Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3">
            {area.transportation?.metro && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs bg-sand-100 text-text-secondary border border-sand-200 font-medium">
                <Train className="w-3 h-3 text-primary" />
                Metro
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Freehold
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs bg-sand-100 text-text-secondary border border-sand-200 font-medium">
              <Building2 className="w-3 h-3 text-secondary" />
              {area.propertyTypes?.[0] ? area.propertyTypes[0].charAt(0).toUpperCase() + area.propertyTypes[0].slice(1) : "Residences"}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-sand-200 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 text-xs rounded-lg font-medium justify-center h-9"
          >
            <Link href={`/properties?area=${encodeURIComponent(area.name)}`}>
              Properties
            </Link>
          </Button>

          <Button
            variant="primary"
            size="sm"
            asChild
            className="flex-1 text-xs rounded-lg font-medium justify-center h-9 bg-primary text-white hover:bg-primary-hover shadow-xs"
          >
            <Link href={`/areas/${area.slug}`} className="flex items-center gap-1">
              Explore Guide
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
