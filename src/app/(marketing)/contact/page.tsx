import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Skeleton } from "@/components/ui/Skeleton/Skeleton";
import { ShieldCheck, Sparkles, Phone, MessageSquare } from "lucide-react";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us & Private Client Concierge | Pacific Star Realty Dubai",
  description:
    "Connect directly with our RERA-licensed Senior Partners at our Boulevard Plaza Downtown headquarters or Dubai Marina lounge. WhatsApp 24/7 concierge, private property tours, and institutional investment advisory.",
  openGraph: {
    title: "Contact Pacific Star Realty | Luxury Dubai Real Estate Concierge",
    description:
      "Schedule a confidential briefing, request VIP chauffeured property tours, or connect directly with our Private Client desk in Downtown Dubai.",
    url: "https://pacificstar-realty.ae/contact",
    siteName: "Pacific Star Realty",
    type: "website",
  },
};

function ContactLoadingSkeleton() {
  return (
    <div className="space-y-12">
      {/* Stats skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Form skeleton */}
      <Skeleton className="h-[520px] rounded-3xl" />

      {/* Offices grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-96 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Pacific Star Realty Contact & Concierge",
    description:
      "Official contact desk and private client concierge for Pacific Star Realty in Dubai, UAE.",
    url: "https://pacificstar-realty.ae/contact",
    mainEntity: {
      "@type": "RealEstateAgent",
      name: "Pacific Star Realty",
      telephone: "+97145001234",
      email: "hello@pacificstarrealty.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Suite 2401, Boulevard Plaza Tower 1",
        addressLocality: "Downtown Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
      ],
    },
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
              { label: "Contact Us" },
            ]}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                24/7 Private Client Concierge • Average Response &lt; 15 Mins
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-text font-light tracking-tight leading-[1.15]">
                Contact Pacific Star Realty Concierge
              </h1>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                Connect directly with our RERA-licensed Senior Partners in Downtown Dubai and Dubai Marina. Whether acquiring a trophy beachfront villa, structuring a Golden Visa portfolio, or booking a chauffeured property tour, we guarantee discretion and swift execution.
              </p>

              {/* Trust signals */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Licensed by RERA ORN 12480</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Direct WhatsApp Line (24/7)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Complimentary VIP Valet Parking</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-sand-200/90 shadow-lg aspect-[16/10] sm:aspect-[16/11] bg-navy-950 group">
                <Image
                  src="/images/hero-contact.svg"
                  alt="Pacific Star Realty private client concierge desks"
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
                    <Phone className="w-3.5 h-3.5 text-secondary" />
                    +971 4 500 1234
                  </span>
                </div>

                {/* Bottom stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 text-white space-y-2">
                  <span className="text-3xs font-semibold uppercase tracking-widest text-secondary block">
                    Rapid Execution
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-light text-white leading-tight">
                    Dedicated Private Wealth Desks in Downtown &amp; Marina
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-2xs">
                    <div>
                      <span className="text-sand-300 block">WhatsApp:</span>
                      <span className="font-semibold text-emerald-400">+971 50 123 4567</span>
                    </div>
                    <div>
                      <span className="text-sand-300 block">Response Time:</span>
                      <span className="font-semibold text-white">&lt; 15 Minutes</span>
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
          <Suspense fallback={<ContactLoadingSkeleton />}>
            <ContactContent />
          </Suspense>
        </Container>
      </section>
    </main>
  );
}
