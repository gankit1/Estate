import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { Award, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Pacific Star Realty — Prime Dubai Real Estate & Wealth Advisory",
  description:
    "Founded in 2020, Pacific Star Realty is a premier RERA-licensed luxury real estate advisory firm in Downtown Dubai. Discover our leadership team, master developer alliances, fiduciary principles, and track record.",
  openGraph: {
    title: "About Us | Pacific Star Realty — Prime Dubai Real Estate",
    description:
      "Meet our licensed leadership team, explore our 14+ years of Dubai market leadership, and discover our conflict-free fiduciary advisory.",
    url: "https://pacificstar-realty.ae/about",
    siteName: "Pacific Star Realty",
    type: "website",
  },
};

function AboutLoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Story skeleton */}
      <Skeleton className="h-[380px] rounded-3xl" />

      {/* Team grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Pacific Star Realty",
    description:
      "Premier luxury real estate brokerage, investment advisory, and UAE Golden Visa concierge headquartered in Downtown Dubai.",
    url: "https://pacificstar-realty.ae/about",
    telephone: "+97145001234",
    email: "hello@pacificstarrealty.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Suite 2401, Boulevard Plaza Tower 1",
      addressLocality: "Downtown Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
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
              { label: "About Us" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                RERA ORN 12480 • Established 2012 in Downtown Dubai
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-text font-light tracking-tight leading-[1.15]">
                Pioneering Prime Dubai Real Estate with Fiduciary Integrity
              </h1>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Founded on institutional transparency, deep Land Department analytics, and white-glove stewardship, Pacific Star Realty advises private investors, international family offices, and discerning homeowners across Dubai&apos;s most coveted master communities.
              </p>

              {/* Trust signals */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed by RERA Dubai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-secondary" />
                  <span>Emaar &amp; Sobha Platinum Partner</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>100% Conflict-Free Advisory</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-sand-200/90 shadow-lg aspect-[16/10] sm:aspect-[16/11] bg-navy-950 group">
                <Image
                  src="/images/hero-about.svg"
                  alt="Pacific Star Realty Boulevard Plaza Downtown headquarters"
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
                    <Building2 className="w-3.5 h-3.5 text-secondary" />
                    Boulevard Plaza Tower 1
                  </span>
                </div>

                {/* Bottom stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white space-y-2">
                  <span className="text-3xs font-semibold uppercase tracking-widest text-secondary block">
                    Institutional Heritage
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-light text-white leading-tight">
                    Trusted Stewardship of AED 8.4B+ in Client Capital
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-2xs">
                    <div>
                      <span className="text-sand-300 block">Licensing:</span>
                      <span className="font-semibold text-white">RERA ORN 12480</span>
                    </div>
                    <div>
                      <span className="text-sand-300 block">Headquarters:</span>
                      <span className="font-semibold text-white">Downtown Dubai</span>
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
          <Suspense fallback={<AboutLoadingSkeleton />}>
            <AboutContent />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}

