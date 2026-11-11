import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { Award, ShieldCheck, Sparkles, MapPin } from "lucide-react";
import { AreasContent } from "./AreasContent";

export const metadata: Metadata = {
  title: "Dubai Area Guides & Neighborhood Investment Matrix | Pacific Star Realty",
  description:
    "Explore Dubai's premier residential districts, waterfront islands, and downtown hubs. Discover average prices per square foot, gross rental yields (ROI), Metro access, and capital growth across Dubai Marina, Palm Jumeirah, Downtown, and Dubai Hills.",
  openGraph: {
    title: "Dubai Neighborhood Guides & Real Estate Areas | Pacific Star Realty",
    description:
      "Comprehensive investment intelligence, lifestyle rankings, and pricing benchmarks across Dubai's 12 master-planned freehold districts.",
    url: "https://pacificstar-realty.ae/areas",
    siteName: "Pacific Star Realty",
    type: "website",
  },
};

function AreasLoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Top metrics skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Lifestyle filter strip skeleton */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-32 rounded-xl shrink-0" />
        ))}
      </div>

      {/* Search & filter bar skeleton */}
      <Skeleton className="h-28 rounded-2xl" />

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-sand-200 overflow-hidden space-y-4 p-4">
            <Skeleton className="aspect-[16/10] w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AreasPage() {
  // Structured JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dubai Area Guides & Neighborhood Investment Matrix",
    description:
      "In-depth market intelligence, average prices per square foot, and rental yields across Dubai's premier residential communities.",
    publisher: {
      "@type": "RealEstateAgent",
      name: "Pacific Star Realty",
      url: "https://pacificstar-realty.ae",
    },
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Banner */}
      <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-18 bg-gradient-to-b from-sand-100/70 via-sand-50/50 to-background border-b border-sand-200/60 overflow-hidden">
        {/* Subtle decorative background light */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Neighborhood Guides" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Dubai Master Communities • 100% Freehold Enclaves
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-text font-light tracking-tight leading-[1.15]">
                Dubai Neighborhood &amp; Area Guides
              </h1>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Explore Dubai&apos;s premier residential enclaves, waterfront islands, and downtown districts. Compare average prices per square foot, rental yields (ROI), transit connectivity, and capital growth to choose your ideal property address.
              </p>

              {/* Trust badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>DLD Verified Benchmarks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>10-Yr Golden Visa Eligible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>100% Foreign Freehold Title</span>
                </div>
              </div>
            </div>

            {/* Right Architectural Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-sand-200/90 bg-sand-100 group">
                <Image
                  src="/images/hero-areas.svg"
                  alt="Dubai luxury neighborhoods and master communities map matrix"
                  fill
                  priority
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    12 Master Districts
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold shadow-xs">
                    Up to 8.4% ROI
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-2xs uppercase tracking-widest text-gold-300 font-semibold block mb-1">
                    Dubai Real Estate Matrix
                  </span>
                  <p className="font-display text-lg sm:text-xl font-light leading-snug">
                    Waterfront, Downtown, Golf &amp; Luxury Villa Enclaves
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container className="py-10 lg:py-16">
        <Suspense fallback={<AreasLoadingSkeleton />}>
          <AreasContent />
        </Suspense>
      </Container>
    </main>
  );
}
