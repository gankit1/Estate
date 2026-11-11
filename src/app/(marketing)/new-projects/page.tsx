import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { Award, Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { NewProjectsContent } from "./NewProjectsContent";

export const metadata: Metadata = {
  title: "Dubai Off-Plan Projects & New Developments | Pacific Star Realty",
  description:
    "Explore luxury off-plan developments and new master communities in Dubai. Direct developer pricing, flexible 60/40 payment plans, and UAE Golden Visa eligible residences from Emaar, DAMAC, Sobha, and Nakheel.",
  openGraph: {
    title: "Dubai Off-Plan Projects & New Developments | Pacific Star Realty",
    description:
      "Explore curated off-plan residences and luxury towers in Dubai Creek Harbour, Palm Jumeirah, Downtown Dubai, and Dubai Hills.",
    url: "https://pacificstar-realty.ae/new-projects",
    siteName: "Pacific Star Realty",
    type: "website",
  },
};

function ProjectsLoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Top metrics skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Developer strip skeleton */}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-xl shrink-0" />
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

export default function NewProjectsPage() {
  // Structured JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dubai Off-Plan Projects & New Developments",
    description:
      "Exclusive off-plan residential developments in Dubai from top developers including Emaar, DAMAC, Sobha, and Meraas.",
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

      {/* Hero Header Banner with Architectural Visual */}
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
              { label: "New Projects" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Direct Developer Launch Pricing • 0% Agency Fee
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-text font-light tracking-tight leading-[1.15]">
                Dubai Off-Plan Projects &amp; New Developments
              </h1>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Secure premier residential towers, branded penthouses, and waterfront villas before public completion. Enjoy phased interest-free payment plans, strong capital appreciation, and UAE Golden Visa qualification.
              </p>

              {/* Trust badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>RERA Escrow Protected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>Golden Visa Eligible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Guaranteed Allocation</span>
                </div>
              </div>
            </div>

            {/* Right Architectural Showcase Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-sand-200/90 bg-sand-100 group">
                <Image
                  src="/images/hero-new-projects.svg"
                  alt="Dubai luxury off-plan developments and architectural master towers"
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={85}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

                {/* Floating Badges on Hero Showcase Image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    Handovers 2026 – 2028+
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold shadow-xs">
                    0% Commission
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-2xs uppercase tracking-widest text-gold-300 font-semibold block mb-1">
                    Dubai Waterfront &amp; Prime Towers
                  </span>
                  <p className="font-display text-lg sm:text-xl font-light leading-snug">
                    Curated Master Communities by Emaar, DAMAC &amp; Sobha
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container className="py-10 lg:py-16">
        <Suspense fallback={<ProjectsLoadingSkeleton />}>
          <NewProjectsContent />
        </Suspense>
      </Container>
    </main>
  );
}
