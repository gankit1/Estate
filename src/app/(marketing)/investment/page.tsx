import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { Award, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { InvestmentContent } from "./InvestmentContent";

export const metadata: Metadata = {
  title: "Dubai Real Estate Investment Advisory & ROI Intelligence | Pacific Star Realty",
  description:
    "Institutional market intelligence, UAE 06-Year Golden Visa advisory, gross rental yield benchmarks (6.8%–8.6%), 0% tax benefits, and off-plan vs ready portfolio structuring for global private wealth.",
  openGraph: {
    title: "Dubai Real Estate Investment & Wealth Advisory | Pacific Star Realty",
    description:
      "Model cash flows, compare global prime yields, and navigate the UAE 06-Year Golden Visa program with Pacific Star Realty.",
    url: "https://pacificstar-realty.ae/investment",
    siteName: "Pacific Star Realty",
    type: "website",
  },
};

function InvestmentLoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Top metrics skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Calculator skeleton */}
      <Skeleton className="h-[450px] rounded-3xl" />

      {/* Corridors matrix skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function InvestmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Pacific Star Realty Real Estate Investment Advisory",
    description:
      "Institutional real estate investment advisory, UAE Golden Visa processing, and high-yield portfolio structuring in Dubai.",
    url: "https://pacificstar-realty.ae/investment",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    currenciesAccepted: "AED, USD, EUR, GBP",
    openingHours: "Mo-Sa 09:00-19:00",
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Banner */}
      <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 lg:pt-16 lg:pb-18 bg-gradient-to-b from-sand-100/70 via-sand-50/50 to-background border-b border-sand-200/60 overflow-hidden">
        {/* Subtle decorative background glow */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Investment Advisory" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Dubai Land Department Verified Benchmarks • 2026 Advisory
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-text font-light tracking-tight leading-[1.15]">
                Dubai Real Estate Investment &amp; ROI Advisory
              </h1>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Institutional-grade market data, UAE 06-Year Golden Visa structuring, and transparent cashflow simulation for global private investors. Benefit from 0% property taxes and world-leading 6.8%–8.6% gross yields.
              </p>

              {/* Trust signals */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>0% Personal &amp; Capital Gains Tax</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>10-Yr Golden Visa (AED 2M+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>USD Currency Peg (3.6725)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-sand-200/90 shadow-lg aspect-[16/10] sm:aspect-[16/11] bg-navy-950 group">
                <Image
                  src="/images/hero-investment.svg"
                  alt="Dubai Prime Real Estate Investment & ROI Intelligence"
                  fill
                  priority
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent z-10" />

                {/* Floating badge top right */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-white/95 text-primary border border-white/50 px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                    <TrendingUp className="w-3.5 h-3.5 text-secondary" />
                    +14.8% YoY Citywide Growth
                  </span>
                </div>

                {/* Bottom stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white space-y-2">
                  <span className="text-3xs font-semibold uppercase tracking-widest text-secondary block">
                    Global Wealth Destination
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-light text-white leading-tight">
                    Capital Preservation in the World&apos;s Safest Commercial Hub
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-2xs">
                    <div>
                      <span className="text-sand-300 block">Foreign Ownership:</span>
                      <span className="font-semibold text-white">100% Freehold Title</span>
                    </div>
                    <div>
                      <span className="text-sand-300 block">Avg Occupancy:</span>
                      <span className="font-semibold text-emerald-400">92.4% Annual Avg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <Suspense fallback={<InvestmentLoadingSkeleton />}>
            <InvestmentContent />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
