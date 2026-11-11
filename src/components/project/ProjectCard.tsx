"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Layers,
  Award,
  ChevronRight,
  Eye,
  FileText,
  Heart,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice, formatHandoverDate } from "@/lib/utils/format";
import type { OffPlanProject } from "@/lib/data/mock-projects";

interface ProjectCardProps {
  project: OffPlanProject;
  viewMode?: "grid" | "list";
  onQuickView?: (project: OffPlanProject) => void;
  onInquire?: (project: OffPlanProject) => void;
  className?: string;
  priority?: boolean;
}

export function ProjectCard({
  project,
  viewMode = "grid",
  onQuickView,
  onInquire,
  className,
  priority = false,
}: ProjectCardProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  // Thematic luxury local fallback image based on area & architecture
  const fallbackUrl = React.useMemo(() => {
    const loc = (project.location.area + " " + project.name).toLowerCase();
    if (loc.includes("creek") || loc.includes("harbour")) return "/images/project-creek.svg";
    if (loc.includes("palm") || loc.includes("beach") || loc.includes("coastal") || loc.includes("island")) return "/images/project-palm.svg";
    if (loc.includes("hills") || loc.includes("villa") || loc.includes("oasis") || loc.includes("townhouse")) return "/images/project-hills.svg";
    if (loc.includes("downtown") || loc.includes("binghatti") || loc.includes("dorchester") || loc.includes("canal") || loc.includes("bay")) return "/images/project-downtown.svg";
    return "/images/placeholder.jpg";
  }, [project.location.area, project.name]);

  const [prevProjectUrl, setPrevProjectUrl] = React.useState(project.images[0]?.url);
  const [hasError, setHasError] = React.useState(false);

  if (project.images[0]?.url !== prevProjectUrl) {
    setPrevProjectUrl(project.images[0]?.url);
    setHasError(false);
  }

  const imgSrc = hasError ? fallbackUrl : (project.images[0]?.url || fallbackUrl);

  const handleImageError = () => {
    setHasError(true);
  };

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  const statusLabel =
    project.status === "upcoming"
      ? "Upcoming Launch"
      : project.status === "under-construction"
      ? "Under Construction"
      : "Ready for Handover";

  const statusVariant =
    project.status === "upcoming"
      ? "info"
      : project.status === "under-construction"
      ? "warning"
      : "success";

  // Bedroom range summary
  const bedrooms = project.unitTypes.map((u) => u.bedrooms).filter((b) => b > 0);
  const minBed = bedrooms.length > 0 ? Math.min(...bedrooms) : 1;
  const maxBed = bedrooms.length > 0 ? Math.max(...bedrooms) : 4;
  const bedSummary =
    minBed === maxBed
      ? `${minBed} Bedroom`
      : `${minBed} - ${maxBed} Bedrooms`;

  // Payment plan summary
  const plan = project.paymentPlan;
  const paymentPlanLabel = plan
    ? plan.postHandover && plan.postHandover > 0
      ? `${plan.duringConstruction}/${plan.onHandover} + ${plan.postHandover}% Post`
      : `${plan.onBooking + plan.duringConstruction}/${plan.onHandover} Plan`
    : "Flexible Plan";

  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "group relative flex flex-col md:flex-row bg-surface border border-sand-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-primary/30 transition-all duration-300",
          className
        )}
      >
        {/* Image side */}
        <div className="relative w-full md:w-80 lg:w-96 aspect-[16/10] md:aspect-auto shrink-0 overflow-hidden bg-sand-200">
          <Image
            src={imgSrc}
            alt={project.name}
            fill
            priority={priority}
            unoptimized
            onError={handleImageError}
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 384px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent md:hidden" />

          {/* Badges on image */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            <Badge variant={statusVariant} size="sm">
              {statusLabel}
            </Badge>
            {project.goldenVisaEligible && (
              <Badge variant="secondary" size="sm" className="hidden sm:inline-flex gap-1">
                <Award className="w-3 h-3 text-[#C5A880]" />
                Golden Visa
              </Badge>
            )}
          </div>

          <button
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md",
              isSaved
                ? "bg-red-500 text-white shadow-sm"
                : "bg-white/80 hover:bg-white text-navy-900/70 hover:text-navy-900 shadow-2xs"
            )}
          >
            <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
          </button>
        </div>

        {/* Content side */}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider truncate">
                {project.developer?.name ?? "Premier Developer"}
              </span>
              {project.handoverDate && (
                <span className="text-2xs sm:text-xs font-medium text-text-muted flex items-center gap-1 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  Handover: {formatHandoverDate(project.handoverDate)}
                </span>
              )}
            </div>

            <Link href={`/new-projects/${project.slug}`} className="block group-hover:text-primary transition-colors">
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-light text-text tracking-tight mb-1.5">
                {project.name}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-text-muted flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="truncate">
                {project.location.community}, {project.location.area}
              </span>
            </p>

            <p className="text-xs md:text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Highlights pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-2xs md:text-xs font-medium px-2.5 py-1 bg-sand-100 text-navy-900 rounded-md">
                <Layers className="w-3 h-3 text-secondary" />
                {bedSummary}
              </span>
              <span className="inline-flex items-center gap-1.5 text-2xs md:text-xs font-medium px-2.5 py-1 bg-sand-100 text-navy-900 rounded-md">
                <Percent className="w-3 h-3 text-secondary" />
                {paymentPlanLabel}
              </span>
            </div>
          </div>

          {/* Pricing & Actions footer */}
          <div className="pt-3 sm:pt-4 border-t border-sand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-2xs uppercase tracking-wider text-text-muted font-medium block">Starting from</span>
              <p className="text-xl md:text-2xl font-display font-medium text-primary">
                {formatPrice(project.startingPrice, "AED", { compact: true })}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onQuickView && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuickView(project)}
                  className="rounded-full text-xs font-medium"
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                >
                  Quick View
                </Button>
              )}
              {onInquire && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onInquire(project)}
                  className="rounded-full text-xs font-medium bg-primary text-white"
                  leftIcon={<FileText className="w-3.5 h-3.5" />}
                >
                  VIP Brochure
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-xs font-medium px-2"
                asChild
              >
                <Link href={`/new-projects/${project.slug}`} aria-label={`View full details of ${project.name}`}>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view layout
  return (
    <div
      className={cn(
        "group relative flex flex-col bg-surface border border-sand-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Visual Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
        <Image
          src={imgSrc}
          alt={project.name}
          fill
          priority={priority}
          unoptimized
          onError={handleImageError}
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex flex-wrap gap-1.5 max-w-[80%]">
            <Badge variant={statusVariant} size="sm">
              {statusLabel}
            </Badge>
            {project.goldenVisaEligible && (
              <Badge variant="secondary" size="sm" className="hidden sm:inline-flex gap-1">
                <Award className="w-3 h-3 text-[#C5A880]" />
                Golden Visa
              </Badge>
            )}
          </div>

          <button
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md shrink-0",
              isSaved
                ? "bg-red-500 text-white shadow-sm"
                : "bg-white/80 hover:bg-white text-navy-900/70 hover:text-navy-900 shadow-2xs"
            )}
          >
            <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
          </button>
        </div>

        {/* Bottom image overlay with developer and handover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <span className="text-2xs font-semibold uppercase tracking-widest text-gold-300 drop-shadow-sm truncate max-w-[60%]">
            {project.developer?.name ?? "Developer"}
          </span>
          {project.handoverDate && (
            <span className="text-2xs font-medium px-2 py-0.5 rounded-full bg-navy-950/80 backdrop-blur-sm border border-white/10 text-white/90 shrink-0">
              {formatHandoverDate(project.handoverDate)}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/new-projects/${project.slug}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-display text-lg sm:text-xl text-text font-light tracking-tight mb-1.5 leading-snug">
              {project.name}
            </h3>
          </Link>

          <p className="text-xs text-text-muted flex items-center gap-1.5 mb-3.5">
            <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="truncate">
              {project.location.community}, {project.location.area}
            </span>
          </p>

          {/* Unit configuration & Payment plan pills */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-sand-50 border border-sand-100 rounded-lg p-2 text-center">
              <span className="text-[10px] uppercase font-semibold text-text-muted block">Bedrooms</span>
              <span className="text-xs font-medium text-navy-900 truncate block">
                {bedSummary}
              </span>
            </div>
            <div className="bg-sand-50 border border-sand-100 rounded-lg p-2 text-center">
              <span className="text-[10px] uppercase font-semibold text-text-muted block">Payment Plan</span>
              <span className="text-xs font-medium text-navy-900 truncate block">
                {plan?.postHandover && plan.postHandover > 0 ? "Post-Handover" : `${plan?.onBooking ?? 10}% Booking`}
              </span>
            </div>
          </div>
        </div>

        {/* Price & Actions Row */}
        <div className="pt-3.5 border-t border-sand-200/80">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium block">Starting from</span>
              <p className="text-lg md:text-xl font-display font-medium text-primary">
                {formatPrice(project.startingPrice, "AED", { compact: true })}
              </p>
            </div>
            {project.completionPercentage !== undefined && (
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-text-muted font-medium block">Progress</span>
                <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {project.completionPercentage}% Done
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {onQuickView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onQuickView(project)}
                className="w-full text-xs rounded-lg font-medium justify-center h-8.5"
                leftIcon={<Eye className="w-3.5 h-3.5" />}
              >
                Quick View
              </Button>
            )}
            {onInquire ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onInquire(project)}
                className="w-full text-xs rounded-lg font-medium justify-center h-8.5 bg-primary text-white"
                leftIcon={<FileText className="w-3.5 h-3.5" />}
              >
                VIP Brochure
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                asChild
                className="w-full text-xs rounded-lg font-medium justify-center h-8.5"
              >
                <Link href={`/new-projects/${project.slug}`}>
                  Details
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
