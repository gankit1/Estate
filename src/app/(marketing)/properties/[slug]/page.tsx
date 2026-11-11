import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyBySlug, getSimilarProperties } from "@/lib/api/propertyService";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { PropertyCard } from "@/components/property/PropertyCard";
import { EnquirySidebar } from "@/components/property/EnquirySidebar";
import { formatPrice, formatArea, formatBedrooms, formatHandoverDate } from "@/lib/utils/format";
import { PropertyDetailClient } from "./PropertyDetailClient";

/* ── Generate metadata ──────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getPropertyBySlug(slug);

  if (!res.success) {
    return {
      title:
        res.error?.code === "NOT_FOUND"
          ? "Property Not Found | Pacific Star Realty"
          : "Error Loading Property | Pacific Star Realty",
    };
  }

  const p = res.data;
  return {
    title: `${p.title} | Pacific Star Realty`,
    description: `${formatBedrooms(p.bedrooms)} ${p.propertyType} for ${p.purpose} in ${p.location.area}. ${formatPrice(p.price, p.currency)}. ${p.description.slice(0, 150)}...`,
    openGraph: {
      title: p.title,
      description: `${formatBedrooms(p.bedrooms)} in ${p.location.area} — ${formatPrice(p.price, p.currency)}`,
      images: p.images[0] ? [{ url: p.images[0].url, width: 1200, height: 800 }] : undefined,
    },
  };
}

/* ── Amenity Icon Helper ────────────────────────────────────── */
function AmenityIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();

  if (lower.includes("pool") || lower.includes("swim")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      </svg>
    );
  }
  if (lower.includes("gym") || lower.includes("fitness")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
        <path d="m6.5 6.5 11 11" />
        <path d="m21 21-1-1a3 3 0 0 1 0-4.24l.76-.76a1 1 0 0 0 0-1.41L17.5 10.3a1 1 0 0 0-1.41 0l-.76.76a3 3 0 0 1-4.24 0L10.3 10.3a1 1 0 0 0-1.41 0L5.64 13.55a1 1 0 0 0 0 1.41l.76.76a3 3 0 0 1 0 4.24l-1 1" />
        <path d="m3 3 1 1a3 3 0 0 1 0 4.24l-.76.76a1 1 0 0 0 0 1.41l3.26 3.29a1 1 0 0 0 1.41 0l.76-.76a3 3 0 0 1 4.24 0l.79.79a1 1 0 0 0 1.41 0l3.25-3.25a1 1 0 0 0 0-1.41l-.76-.76a3 3 0 0 1 0-4.24l1-1" />
      </svg>
    );
  }
  if (lower.includes("park") || lower.includes("garage")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M9 17v-8h3a3 3 0 0 1 0 6H9" />
      </svg>
    );
  }
  if (lower.includes("secur") || lower.includes("guard") || lower.includes("cctv")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }
  if (lower.includes("balcony") || lower.includes("terrace") || lower.includes("view")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
        <path d="M3 21h18" />
        <path d="M4 10h16v11H4z" />
        <path d="M4 14h16" />
        <path d="M4 18h16" />
        <path d="M9 10V3" />
        <path d="M15 10V3" />
      </svg>
    );
  }
  if (lower.includes("wardrobe") || lower.includes("closet")) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="9" y1="10" x2="9" y2="12" />
        <line x1="15" y1="10" x2="15" y2="12" />
      </svg>
    );
  }

  // Default amenity spark
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getPropertyBySlug(slug);

  if (!res.success) {
    if (res.error?.code === "NOT_FOUND") {
      notFound();
    }
    return (
      <main className="min-h-screen bg-[#FAF8F5] pt-12 pb-16">
        <Container>
          <div className="max-w-md mx-auto text-center py-20 bg-white border border-sand-200 rounded-sm p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-error" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-2xl font-display text-text mb-3">Unable to Load Property</h1>
            <p className="text-text-muted text-sm mb-6">
              {res.error?.message || "A server or network error occurred while loading this property."}
            </p>
            <a
              href={`/properties/${slug}`}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium bg-primary text-white rounded-xs hover:bg-primary-hover transition-colors"
            >
              Retry
            </a>
          </div>
        </Container>
      </main>
    );
  }

  const property = res.data;
  const similarRes = await getSimilarProperties(property, 3);
  const similarProperties = similarRes.success ? similarRes.data : [];

  const isRent = property.purpose === "rent";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.location.address}, Dubai`)}`;

  return (
    <main className="min-h-screen bg-[#FAF8F5] pb-24 lg:pb-28">
      {/* ── Top Bar: Breadcrumb & Quick Actions ──────────────── */}
      <div className="pt-6 lg:pt-8 pb-4 border-b border-sand-200/50 bg-[#FAF8F5]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Properties", href: "/properties" },
                { label: property.location.area, href: `/properties?area=${encodeURIComponent(property.location.area)}` },
                { label: property.title },
              ]}
              className="text-2xs"
            />

            <div className="flex items-center gap-2 self-start sm:self-auto text-2xs font-mono text-text-muted">
              <span className="px-2.5 py-1 bg-white border border-sand-200/80 rounded-xs">
                Ref: {property._id?.slice(-8).toUpperCase() || "BL-89E9"}
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-xs font-sans font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                DLD Verified
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Hero Architectural Gallery ───────────────────────── */}
      <div className="py-6 sm:py-8">
        <Container>
          <PropertyDetailClient property={property} />
        </Container>
      </div>

      {/* ── Main Content Grid & Sticky Advisor Sidebar ───────── */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Property Dossier (Left 8 Columns) */}
          <div className="lg:col-span-8 min-w-0 space-y-10">
            {/* Header: Title, Tags & Price Block */}
            <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-8 shadow-[0_2px_16px_rgba(44,32,24,0.03)] space-y-5">
              {/* Badge Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 bg-primary text-white font-semibold text-[11px] tracking-widest uppercase rounded-xs">
                  {isRent ? "For Rent" : "For Sale"}
                </span>

                <span className="px-3.5 py-1 bg-sand-100 text-text-secondary border border-sand-200 font-semibold text-[11px] tracking-wider uppercase rounded-xs">
                  {property.propertyType}
                </span>

                {property.status === "off-plan" && (
                  <span className="px-3.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[11px] tracking-wider uppercase rounded-xs">
                    Off-Plan
                  </span>
                )}

                {property.verificationStatus === "featured" && (
                  <span className="px-3.5 py-1 bg-secondary text-white font-semibold text-[11px] tracking-wider uppercase rounded-xs">
                    Featured Collection
                  </span>
                )}

                {property.verificationStatus === "verified" && (
                  <span className="px-3.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px] tracking-wider uppercase rounded-xs flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    DLD Permit Validated
                  </span>
                )}
              </div>

              {/* Title & Location */}
              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] text-text font-normal tracking-[-0.015em] leading-[1.18] mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-text-muted text-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary flex-shrink-0" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{property.location.address}, Dubai, UAE</span>
                </div>
              </div>

              {/* Price Ribbon */}
              <div className="pt-4 border-t border-sand-200/70 flex flex-wrap items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl sm:text-4xl lg:text-5xl text-text font-medium tracking-tight">
                    {formatPrice(property.price, property.currency)}
                  </span>
                  {isRent && (
                    <span className="text-sm sm:text-base text-text-muted font-normal font-sans">
                      / year
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {property.pricePerSqft && (
                    <span className="text-xs font-mono font-medium text-text-secondary bg-sand-100/90 border border-sand-200 px-3 py-1.5 rounded-xs">
                      {formatPrice(property.pricePerSqft, property.currency)} / sq.ft
                    </span>
                  )}
                  {isRent && (
                    <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xs font-medium">
                      Est. AED {Math.round(property.price / 12).toLocaleString()}/mo
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Architectural Key Specifications Showcase */}
            <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-8 shadow-[0_2px_16px_rgba(44,32,24,0.03)]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-sand-200/70">
                <div className="text-xs font-mono uppercase tracking-[0.15em] text-primary font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Property Specifications
                </div>
                <span className="text-2xs text-text-muted font-mono uppercase">Architectural Data</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 22v-9a2 2 0 012-2h14a2 2 0 012 2v9M1 22h22M7 11V9a5 5 0 0110 0v2" />
                    </svg>
                  }
                  label="Bedrooms"
                  value={formatBedrooms(property.bedrooms)}
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 12h16M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 12V8a4 4 0 014-4h8a4 4 0 014 4v4" />
                    </svg>
                  }
                  label="Bathrooms"
                  value={`${property.bathrooms} Luxury Baths`}
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  }
                  label="Built-up Area"
                  value={formatArea(property.builtUpArea)}
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M9 17v-8h3a3 3 0 0 1 0 6H9" />
                    </svg>
                  }
                  label="Parking"
                  value={`${property.parking ?? 1} Covered Space`}
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M7 11v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6" />
                    </svg>
                  }
                  label="Furnishing"
                  value={property.furnished ? property.furnished.replace("-", " ") : "Unfurnished"}
                  className="capitalize"
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
                    </svg>
                  }
                  label="Property Type"
                  value={property.propertyType}
                  className="capitalize"
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  }
                  label="Availability"
                  value="Ready to Move"
                />
                <SpecItem
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  }
                  label="Ownership"
                  value="Freehold"
                />
              </div>
            </div>

            {/* Description & Overview Section */}
            <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-8 shadow-[0_2px_16px_rgba(44,32,24,0.03)] space-y-5">
              <div className="border-b border-sand-200/70 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary font-semibold">Curated Living</span>
                <h2 className="font-display text-2xl sm:text-3xl text-text font-normal mt-0.5">
                  Property Overview
                </h2>
              </div>

              <div className="text-text-secondary text-[15px] sm:text-base leading-relaxed space-y-4 font-normal">
                {property.description.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Key Features & Finishes */}
            {property.features.length > 0 && (
              <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-8 shadow-[0_2px_16px_rgba(44,32,24,0.03)] space-y-5">
                <div className="border-b border-sand-200/70 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary font-semibold">Finishes & Details</span>
                  <h2 className="font-display text-2xl sm:text-3xl text-text font-normal mt-0.5">
                    Key Features
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3.5 p-4 bg-[#FAF8F5] border border-sand-200/70 rounded-xs hover:border-primary/40 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium text-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities & Facilities */}
            {property.amenities.length > 0 && (
              <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-8 shadow-[0_2px_16px_rgba(44,32,24,0.03)] space-y-5">
                <div className="border-b border-sand-200/70 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary font-semibold">Lifestyle & Comfort</span>
                  <h2 className="font-display text-2xl sm:text-3xl text-text font-normal mt-0.5">
                    Amenities & Facilities
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-3.5 bg-[#FAF8F5] border border-sand-200/80 rounded-xs hover:border-primary/50 transition-colors"
                    >
                      <AmenityIcon name={amenity} />
                      <span className="text-xs font-medium text-text capitalize">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location & Neighbourhood Card */}
            <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-8 shadow-[0_2px_16px_rgba(44,32,24,0.03)] space-y-6">
              <div className="border-b border-sand-200/70 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary font-semibold">Prime Position</span>
                <h2 className="font-display text-2xl sm:text-3xl text-text font-normal mt-0.5">
                  Location & Connectivity
                </h2>
              </div>

              <div className="p-6 bg-[#FAF8F5] border border-sand-200/80 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                    {property.location.city || "Dubai"}, United Arab Emirates
                  </span>
                  <h3 className="font-display text-2xl text-text font-medium">
                    {property.location.community || property.location.area}
                  </h3>
                  <p className="text-xs text-text-muted">
                    {property.location.address}
                  </p>
                </div>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xs bg-primary hover:bg-primary-hover text-white text-xs font-semibold tracking-wide transition-colors shrink-0 shadow-xs"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  <span className="text-white">Open in Google Maps</span>
                </a>
              </div>

              {/* Nearby Key Destinations */}
              {property.area?.nearbyPlaces && property.area.nearbyPlaces.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
                    Key Proximity Distances
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.area.nearbyPlaces.map((place, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3.5 bg-white border border-sand-200/80 rounded-xs"
                      >
                        <div>
                          <p className="text-xs font-semibold text-text">{place.name}</p>
                          <p className="text-[10px] text-text-muted capitalize">{place.category}</p>
                        </div>
                        <span className="text-2xs font-mono font-medium text-primary px-2.5 py-1 bg-sand-100 rounded-xs">
                          {place.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Similar Properties Showcase */}
            {similarProperties.length > 0 && (
              <div className="pt-6 space-y-6">
                <div className="flex items-center justify-between border-b border-sand-200/80 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary font-semibold">
                      Curated Selection
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl text-text font-normal mt-0.5">
                      Similar Properties in {property.location.area}
                    </h2>
                  </div>
                  <a
                    href={`/properties?area=${encodeURIComponent(property.location.area)}`}
                    className="text-xs font-medium text-primary hover:text-primary-hover flex items-center gap-1"
                  >
                    View All
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarProperties.map((p) => (
                    <PropertyCard key={p._id} property={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Sticky Enquiry Sidebar (Right 4 Columns) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            <EnquirySidebar property={property} agent={property.agent} />
          </aside>
        </div>
      </Container>
    </main>
  );
}

/* ── Helper Component ───────────────────────────────────────── */
function SpecItem({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="p-3.5 bg-[#FAF8F5] border border-sand-200/70 rounded-xs space-y-2">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted font-medium">
          {label}
        </span>
      </div>
      <p className={`text-sm sm:text-base font-semibold text-text leading-tight truncate ${className ?? ""}`}>
        {value}
      </p>
    </div>
  );
}
