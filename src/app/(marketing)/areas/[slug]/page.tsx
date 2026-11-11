import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  TrendingUp,
  Percent,
  Train,
  ShieldCheck,
  Award,
  ArrowLeft,
  ArrowRight,
  School,
  Phone,
  FileText,
} from "lucide-react";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice } from "@/lib/utils/format";
import {
  mockDubaiAreas,
  getAreaBySlug,
} from "@/lib/data/mock-areas";
import { mockProperties } from "@/lib/data/mock-properties";
import { mockOffPlanProjects } from "@/lib/data/mock-projects";

interface AreaDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AreaDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    return {
      title: "District Not Found | Pacific Star Realty",
    };
  }

  return {
    title: `${area.name} Area Guide & Real Estate Investment | Pacific Star Realty`,
    description: `${area.name} in Dubai. Average price AED ${area.avgSalePricePerSqft}/sqft, ${area.avgRentalYield}% gross rental yield. 100% Freehold community guide with transit, schools, and investment benchmarks.`,
    openGraph: {
      title: `${area.name} Neighborhood Guide | Pacific Star Realty`,
      description: area.overview,
      images: [area.heroImage],
    },
  };
}

export default async function AreaDetailPage({
  params,
}: AreaDetailPageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  // Find properties in this area
  const areaProperties = mockProperties
    .filter(
      (p) =>
        p.location.area.toLowerCase().includes(area.name.toLowerCase()) ||
        area.name.toLowerCase().includes(p.location.area.toLowerCase()) ||
        (p.areaRef && p.areaRef === area._id)
    )
    .slice(0, 3);

  // Find off-plan projects in this area
  const areaProjects = mockOffPlanProjects
    .filter(
      (p) =>
        p.location.area.toLowerCase().includes(area.name.toLowerCase()) ||
        area.name.toLowerCase().includes(p.location.area.toLowerCase())
    )
    .slice(0, 3);

  // Neighboring or similar districts
  const similarAreas = mockDubaiAreas
    .filter(
      (a) =>
        a.slug !== area.slug &&
        (a.lifestyleCategory === area.lifestyleCategory || a.lifestyleCategory === "waterfront")
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-sand-50/80 border-b border-sand-200/60 py-4">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Neighborhoods", href: "/areas" },
                { label: area.name },
              ]}
            />
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-xs text-text-muted hover:text-text self-start sm:self-auto"
            >
              <Link href="/areas" className="flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to all Dubai neighborhoods
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Main District Header & Showcase Section */}
      <section className="pt-8 pb-10">
        <Container>
          {/* Header Title & Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {area.categoryLabel}
                </span>
                <span className="text-sand-300">•</span>
                <Badge variant="secondary" size="sm" className="gap-1">
                  <Award className="w-3 h-3 text-[#C5A880]" />
                  10-Yr Golden Visa Eligible
                </Badge>
                <Badge variant="success" size="sm" className="gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  100% Freehold Title
                </Badge>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text font-light tracking-tight">
                {area.name} Area Guide
              </h1>

              <p className="text-sm text-text-muted flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>Dubai, United Arab Emirates • Lat: {area.coordinates?.lat}, Lng: {area.coordinates?.lng}</span>
              </p>
            </div>

            {/* Quick Pricing KPI Summary Box */}
            <div className="bg-sand-50 border border-sand-200 rounded-2xl p-5 shrink-0 min-w-[260px]">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-medium block">
                Avg. Sale Price / sqft
              </span>
              <p className="text-2xl sm:text-3xl font-display font-medium text-primary mt-0.5">
                AED {area.avgSalePricePerSqft?.toLocaleString()}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="text-primary font-semibold flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 text-secondary" />
                  {area.avgRentalYield}% Yield
                </span>
                <span className="text-emerald-700 font-medium flex items-center gap-1 font-mono">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +{area.capitalGrowth1Yr}% YoY
                </span>
              </div>
            </div>
          </div>

          {/* District Showcase Hero Visual */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg border border-sand-200 bg-sand-100 mb-12">
            <Image
              src={area.heroImage}
              alt={`${area.name} skyline and architectural panorama`}
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

            {/* Floating Overlay Details */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-2xs uppercase tracking-widest text-gold-300 font-semibold block mb-1">
                  District Architecture &amp; Atmosphere
                </span>
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-light">
                  {area.lifestyle}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Button
                  variant="primary"
                  size="sm"
                  asChild
                  className="rounded-full bg-secondary text-primary font-bold hover:bg-secondary-hover shadow-sm"
                >
                  <Link href={`/properties?area=${encodeURIComponent(area.name)}`}>
                    Browse Properties in {area.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Two-Column Details & Sticky Advisory Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* 1. Neighborhood Overview */}
              <section className="bg-surface border border-sand-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <h2 className="font-display text-2xl text-text font-light tracking-tight">
                  About {area.name}
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {area.overview}
                </p>
                <div className="pt-2 border-t border-sand-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                      Lifestyle Atmosphere
                    </span>
                    <p className="text-xs sm:text-sm text-text mt-1 leading-relaxed">
                      {area.lifestyle}
                    </p>
                  </div>
                  <div>
                    <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                      Primary Property Typologies
                    </span>
                    <p className="text-xs sm:text-sm text-text mt-1 leading-relaxed capitalize">
                      {area.propertyTypes?.join(", ")}
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Key Investment Benchmarks */}
              <section className="bg-surface border border-sand-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl sm:text-2xl text-text font-light">
                    Real Estate Investment Benchmarks
                  </h3>
                  <span className="text-2xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    DLD 2026 Indexed
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                    <span className="text-2xs uppercase tracking-wider text-text-muted block">Avg. Price / sqft</span>
                    <span className="text-lg sm:text-xl font-mono font-semibold text-primary block mt-1">
                      AED {area.avgSalePricePerSqft?.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Capital entry benchmark</span>
                  </div>

                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                    <span className="text-2xs uppercase tracking-wider text-text-muted block">Gross Rental Yield</span>
                    <span className="text-lg sm:text-xl font-mono font-semibold text-emerald-700 flex items-center gap-1 mt-1">
                      <Percent className="w-4 h-4" />
                      {area.avgRentalYield}% ROI
                    </span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Annualized gross returns</span>
                  </div>

                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                    <span className="text-2xs uppercase tracking-wider text-text-muted block">1-Yr Capital Growth</span>
                    <span className="text-lg sm:text-xl font-mono font-semibold text-text flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      +{area.capitalGrowth1Yr}%
                    </span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Year-over-year equity uplift</span>
                  </div>

                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                    <span className="text-2xs uppercase tracking-wider text-text-muted block">Avg. Starting Unit</span>
                    <span className="text-lg sm:text-xl font-display font-medium text-text block mt-1">
                      {formatPrice(area.avgStartingPrice, "AED", { compact: true })}
                    </span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Studio / 1BR minimum</span>
                  </div>

                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                    <span className="text-2xs uppercase tracking-wider text-text-muted block">Avg. Annual 1BR Rent</span>
                    <span className="text-lg sm:text-xl font-mono font-semibold text-text block mt-1">
                      {formatPrice(area.avgRentApartment ?? 0, "AED", { compact: true })}
                    </span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Standard 1-year tenancy</span>
                  </div>

                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                    <span className="text-2xs uppercase tracking-wider text-text-muted block">Investment Rating</span>
                    <span className="text-lg sm:text-xl font-mono font-semibold text-primary block mt-1">
                      {area.investmentScore} / 100
                    </span>
                    <span className="text-[11px] text-text-muted block mt-0.5">Lifestyle: {area.lifestyleRating} ★</span>
                  </div>
                </div>
              </section>

              {/* 3. District Highlights */}
              <section className="bg-surface border border-sand-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <h3 className="font-display text-xl sm:text-2xl text-text font-light">
                  Why Investors Choose {area.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {area.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-sand-50/60 border border-sand-200/70">
                      <div className="w-5 h-5 rounded-full bg-secondary/20 text-gold-700 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold font-mono">{i + 1}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-text-secondary leading-snug">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Transit, Connectivity & Schools */}
              <section className="bg-surface border border-sand-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-text font-light">
                    Transit &amp; Neighborhood Connectivity
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">
                    {area.transportation?.notes ?? "Strategic highway junctions and public transportation access."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Transit Card */}
                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <Train className="w-4 h-4 text-secondary" />
                      Public Transportation
                    </span>
                    <div className="space-y-1.5 text-xs text-text-secondary">
                      <div className="flex items-center justify-between">
                        <span>Dubai Metro Red/Green Line:</span>
                        <strong className={area.transportation?.metro ? "text-emerald-700" : "text-text-muted"}>
                          {area.transportation?.metro ? "Direct Station Access" : "Via Feeder Bus"}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Dubai Tram / Monorail:</span>
                        <strong className={area.transportation?.tram ? "text-emerald-700" : "text-text-muted"}>
                          {area.transportation?.tram ? "Integrated Loop" : "N/A"}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>RTA Feeder Bus Routes:</span>
                        <strong className="text-emerald-700">Fully Serviced</strong>
                      </div>
                    </div>
                  </div>

                  {/* Schools Nearby */}
                  <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80 space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <School className="w-4 h-4 text-secondary" />
                      Top Academic Institutions
                    </span>
                    <div className="space-y-1 text-xs text-text-secondary">
                      {area.schoolsNearby?.map((school, i) => (
                        <div key={i} className="truncate">• {school}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nearby Places Grid */}
                {area.nearbyPlaces && area.nearbyPlaces.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-2.5">
                      Prominent Nearby Landmarks &amp; Distances
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {area.nearbyPlaces.map((place, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white border border-sand-200/80 text-xs">
                          <span className="text-2xs uppercase text-primary font-semibold block">{place.category}</span>
                          <span className="font-medium text-text block truncate mt-0.5">{place.name}</span>
                          <span className="text-2xs text-text-muted block mt-0.5">{place.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* 5. Available Properties in this District */}
              {areaProperties.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="eyebrow block">Live Inventory</span>
                      <h3 className="font-display text-xl sm:text-2xl text-text font-light">
                        Featured Properties in {area.name}
                      </h3>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-xs text-primary font-medium">
                      <Link href={`/properties?area=${encodeURIComponent(area.name)}`} className="flex items-center gap-1">
                        View All
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {areaProperties.map((prop) => (
                      <Link
                        key={prop._id}
                        href={`/properties/${prop.slug}`}
                        className="group bg-surface border border-sand-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all block"
                      >
                        <div className="relative aspect-[16/10] bg-sand-200">
                          <Image
                            src={prop.images[0]?.url || "/images/placeholder.jpg"}
                            alt={prop.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="280px"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-navy-950/80 text-white">
                              {prop.purpose === "sale" ? "For Sale" : "For Rent"}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 space-y-1">
                          <h4 className="font-display text-sm font-medium text-text truncate group-hover:text-primary transition-colors">
                            {prop.title}
                          </h4>
                          <p className="font-mono text-sm font-semibold text-primary">
                            {formatPrice(prop.price, "AED")}
                          </p>
                          <span className="text-2xs text-text-muted block">
                            {prop.bedrooms} Beds • {prop.builtUpArea} sqft
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. Off-Plan Projects in this District */}
              {areaProjects.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="eyebrow block">Developer Launches</span>
                      <h3 className="font-display text-xl sm:text-2xl text-text font-light">
                        New Off-Plan Developments in {area.name}
                      </h3>
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-xs text-primary font-medium">
                      <Link href="/new-projects" className="flex items-center gap-1">
                        All Projects
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {areaProjects.map((proj) => (
                      <Link
                        key={proj._id}
                        href={`/new-projects/${proj.slug}`}
                        className="group bg-surface border border-sand-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all block"
                      >
                        <div className="relative aspect-[16/10] bg-sand-200">
                          <Image
                            src={proj.images[0]?.url || "/images/placeholder.jpg"}
                            alt={proj.name}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="280px"
                          />
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-secondary text-primary font-bold">
                              {proj.developer?.name ?? "Off-Plan"}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 space-y-1">
                          <h4 className="font-display text-sm font-medium text-text truncate group-hover:text-primary transition-colors">
                            {proj.name}
                          </h4>
                          <p className="font-mono text-sm font-semibold text-primary">
                            From {formatPrice(proj.startingPrice, "AED", { compact: true })}
                          </p>
                          <span className="text-2xs text-text-muted block">
                            Handover: {proj.handoverDate ? new Date(proj.handoverDate).getFullYear() : "TBD"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* 6. District FAQ Accordion */}
              {area.faq && area.faq.length > 0 && (
                <section className="bg-sand-50/70 border border-sand-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="font-display text-xl sm:text-2xl text-text font-light">
                    Frequently Asked Questions about {area.name}
                  </h3>
                  <div className="space-y-3">
                    {area.faq.map((item, idx) => (
                      <div key={idx} className="bg-surface border border-sand-200 rounded-xl p-4 shadow-2xs">
                        <span className="font-semibold text-xs sm:text-sm text-navy-900 block mb-1">
                          {item.question}
                        </span>
                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sticky Column: District Advisory & Similar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Consultation Card */}
              <div className="sticky top-24 bg-surface border border-sand-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
                <div className="border-b border-sand-100 pb-4">
                  <span className="text-2xs font-semibold uppercase tracking-wider text-secondary block mb-1">
                    Specialist Advisory
                  </span>
                  <h4 className="font-display text-xl font-light text-text">
                    Consult our {area.name} Area Desk
                  </h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Direct access to exclusive off-market listings, historical rental registers, and off-plan allocation rights.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>0% Agency Commission on New Launches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-secondary shrink-0" />
                    <span>UAE 06-Year Golden Visa Consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>Comprehensive 2026 District Report</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    asChild
                    className="rounded-xl text-xs font-semibold justify-center h-11 bg-primary text-white hover:bg-primary-hover shadow-xs"
                  >
                    <Link href={`/properties?area=${encodeURIComponent(area.name)}`}>
                      Explore {area.name} Properties
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    asChild
                    className="rounded-xl text-xs justify-center h-10 border-sand-200 text-text hover:bg-sand-50"
                  >
                    <a href="tel:+97144000000" className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-secondary" />
                      Call Senior Advisor
                    </a>
                  </Button>
                </div>
              </div>

              {/* Similar Districts Widget */}
              {similarAreas.length > 0 && (
                <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 space-y-3">
                  <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                    Similar Dubai Communities
                  </span>
                  <div className="space-y-2">
                    {similarAreas.map((sim) => (
                      <Link
                        key={sim._id}
                        href={`/areas/${sim.slug}`}
                        className="p-2.5 rounded-xl bg-surface border border-sand-200 hover:border-primary/40 transition-all flex items-center justify-between gap-3 block group"
                      >
                        <div>
                          <span className="text-xs font-medium text-text group-hover:text-primary transition-colors block">
                            {sim.name}
                          </span>
                          <span className="text-2xs text-text-muted">
                            AED {sim.avgSalePricePerSqft}/sqft • {sim.avgRentalYield}% Yield
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
