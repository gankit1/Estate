"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge/Badge";
import { formatPrice, formatArea, formatBedrooms } from "@/lib/utils/format";
import type { Property } from "@/types";

/* ── Favorite button ────────────────────────────────────────── */
function FavoriteButton({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const [saved, setSaved] = React.useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((prev) => !prev);
  };

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Remove from saved" : "Save property"}
      aria-pressed={saved}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-full",
        "bg-white/80 backdrop-blur-sm text-brown-400",
        "hover:bg-white hover:text-error transition-colors duration-150",
        saved && "text-error bg-white",
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

export { FavoriteButton };

/* ── Property Card ──────────────────────────────────────────── */
interface PropertyCardProps {
  property: Property;
  className?: string;
  priority?: boolean;
}

export function PropertyCard({
  property,
  className,
  priority = false,
}: PropertyCardProps) {
  const isRent = property.purpose === "rent";
  const isFeatured = property.verificationStatus === "featured";
  const isVerified = property.verificationStatus === "verified";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "group flex flex-col bg-surface border border-border overflow-hidden",
        "hover:border-sand-300 transition-colors duration-300 rounded-sm",
        className
      )}
      aria-label={`View ${property.title} — ${formatBedrooms(property.bedrooms)} in ${property.location.area}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={property.images[0]?.url ?? "/images/placeholder.jpg"}
          alt={property.images[0]?.caption ?? property.title}
          fill
          priority={priority}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <Badge variant={isRent ? "info" : "primary"} size="sm">
              {isRent ? "For Rent" : "For Sale"}
            </Badge>
            {property.status === "off-plan" && (
              <Badge variant="warning" size="sm">
                Off-Plan
              </Badge>
            )}
          </div>

          <FavoriteButton propertyId={property._id} />
        </div>

        {/* Bottom badges */}
        {(isFeatured || isVerified) && (
          <div className="absolute bottom-3 left-3">
            {isFeatured && (
              <Badge variant="secondary" size="sm" className="bg-sienna-500/90 text-white border-none">
                Featured
              </Badge>
            )}
            {isVerified && !isFeatured && (
              <Badge variant="success" size="sm">
                Verified
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-1">
        {/* Location */}
        <p className="text-xs text-text-muted flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {property.location.area}
          {property.location.community !== property.location.area &&
            ` · ${property.location.community}`}
        </p>

        {/* Title */}
        <h3 className="font-display text-xl sm:text-2xl text-text group-hover:text-primary transition-colors duration-200 leading-tight line-clamp-2">
          {property.title}
        </h3>

        {/* Price */}
        <p className="price text-lg text-text font-medium">
          {formatPrice(property.price, property.currency)}
          {isRent && (
            <span className="text-sm text-text-muted font-normal"> /year</span>
          )}
        </p>

        {/* Divider */}
        <div className="border-t border-border my-0.5" aria-hidden />

        {/* Specs */}
        <div className="flex items-center gap-4 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M3 22v-9a2 2 0 012-2h14a2 2 0 012 2v9M1 22h22M7 11V9a5 5 0 0110 0v2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {formatBedrooms(property.bedrooms)}
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M4 12h16M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 12V8a4 4 0 014-4h8a4 4 0 014 4v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 3v18" strokeLinecap="round" />
            </svg>
            {formatArea(property.builtUpArea)}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Property Card Skeleton ─────────────────────────────────── */
export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-border bg-surface rounded-sm animate-pulse">
      <div className="aspect-[4/3] bg-sand-100" />
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="h-3 w-2/5 bg-sand-100 rounded" />
        <div className="h-5 w-full bg-sand-100 rounded" />
        <div className="h-4 w-1/3 bg-sand-100 rounded" />
        <div className="border-t border-border" />
        <div className="flex gap-4">
          <div className="h-3 w-16 bg-sand-100 rounded" />
          <div className="h-3 w-14 bg-sand-100 rounded" />
          <div className="h-3 w-20 bg-sand-100 rounded" />
        </div>
      </div>
    </div>
  );
}
