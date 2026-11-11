import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Award,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Download,
  Phone,
  ArrowLeft,
  Layers,
} from "lucide-react";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice, formatHandoverDate } from "@/lib/utils/format";
import {
  mockOffPlanProjects,
  getProjectBySlug,
} from "@/lib/data/mock-projects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Pacific Star Realty",
    };
  }

  return {
    title: `${project.name} by ${project.developer?.name ?? "Developer"} | Dubai Off-Plan`,
    description: `${project.name} located in ${project.location.area}. Starting from AED ${project.startingPrice.toLocaleString()}. Expected handover ${project.handoverDate ? formatHandoverDate(project.handoverDate) : "TBD"}.`,
    openGraph: {
      title: `${project.name} | Pacific Star Realty`,
      description: project.description,
      images: project.images.map((img) => img.url),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const plan = project.paymentPlan;
  const relatedProjects = mockOffPlanProjects
    .filter((p) => p.slug !== slug && (p.developerRef === project.developerRef || p.location.area === project.location.area))
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
                { label: "New Projects", href: "/new-projects" },
                { label: project.name },
              ]}
            />
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-xs text-text-muted hover:text-text self-start sm:self-auto"
            >
              <Link href="/new-projects" className="flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to all new projects
              </Link>
            </Button>
          </div>
        </Container>
      </div>

      {/* Main Project Header & Gallery Section */}
      <section className="pt-8 pb-10">
        <Container>
          {/* Header Title & Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {project.developer?.name}
                </span>
                <span className="text-sand-300">•</span>
                <Badge
                  variant={
                    project.status === "upcoming"
                      ? "info"
                      : project.status === "under-construction"
                      ? "warning"
                      : "success"
                  }
                  size="sm"
                >
                  {project.status === "upcoming"
                    ? "Upcoming Launch"
                    : project.status === "under-construction"
                    ? "Under Construction"
                    : "Ready to Handover"}
                </Badge>
                {project.goldenVisaEligible && (
                  <Badge variant="secondary" size="sm" className="gap-1">
                    <Award className="w-3 h-3 text-[#C5A880]" />
                    UAE 06-Year Golden Visa
                  </Badge>
                )}
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text font-light tracking-tight">
                {project.name}
              </h1>

              <p className="text-sm text-text-muted flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0" />
                <span>
                  {project.location.address}, {project.location.community},{" "}
                  {project.location.area}, {project.location.city}
                </span>
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-sand-50 border border-sand-200/90 rounded-2xl p-5 shrink-0 min-w-[240px]">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-medium block">
                Launch Starting Price
              </span>
              <p className="text-2xl sm:text-3xl font-display font-medium text-primary mt-0.5">
                {formatPrice(project.startingPrice, "AED")}
              </p>
              {project.handoverDate && (
                <span className="text-xs text-text-muted flex items-center gap-1 mt-2">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  Estimated Handover: {formatHandoverDate(project.handoverDate)}
                </span>
              )}
            </div>
          </div>

          {/* High-Resolution Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 rounded-3xl overflow-hidden mb-12 shadow-sm">
            <div className="md:col-span-8 relative aspect-[16/10] overflow-hidden bg-sand-100">
              <Image
                src={project.images[0]?.url ?? "/images/placeholder.jpg"}
                alt={project.name}
                fill
                priority
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </div>
            <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
              {project.images.slice(1, 3).map((img, idx) => (
                <div key={idx} className="relative aspect-[16/10] md:aspect-auto h-full overflow-hidden bg-sand-100 rounded-xl md:rounded-none">
                  <Image
                    src={img.url || "/images/placeholder.jpg"}
                    alt={img.caption ?? `${project.name} render ${idx + 2}`}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Two-Column Details & Contact Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* About Section */}
              <section className="bg-surface border border-sand-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <h2 className="font-display text-2xl text-text font-light tracking-tight">
                  About {project.name}
                </h2>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {project.description}
                </p>

                {project.highlights && project.highlights.length > 0 && (
                  <div className="pt-4 border-t border-sand-100">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-3">
                      Development Highlights
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Unit Types Table */}
              <section className="bg-surface border border-sand-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl text-text font-light tracking-tight">
                    Unit Configurations & Pricing
                  </h2>
                  <span className="text-xs font-mono text-text-muted">
                    {project.unitTypes.length} Layouts Available
                  </span>
                </div>

                <div className="border border-sand-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-sand-100/70 border-b border-sand-200 text-text-muted font-medium">
                        <th className="py-3 px-4">Configuration</th>
                        <th className="py-3 px-4">Bedrooms</th>
                        <th className="py-3 px-4">Estimated Area</th>
                        <th className="py-3 px-4 text-right">Starting Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand-200">
                      {project.unitTypes.map((u, i) => (
                        <tr key={i} className="hover:bg-sand-50/60 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-navy-900">{u.type}</td>
                          <td className="py-3.5 px-4 text-text-muted">
                            {u.bedrooms === 0 ? "Studio" : `${u.bedrooms} BR`}
                          </td>
                          <td className="py-3.5 px-4 text-text-muted font-mono">{u.area}</td>
                          <td className="py-3.5 px-4 text-right font-display text-base font-semibold text-primary">
                            {formatPrice(u.startingPrice, "AED", { compact: true })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Payment Plan Milestone Breakdown */}
              {plan && (
                <section className="bg-surface border border-sand-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
                  <h2 className="font-display text-2xl text-text font-light tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-secondary" />
                    Off-Plan Payment Plan Schedule
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                      <span className="text-xs text-text-muted font-medium block">1. Down Payment</span>
                      <span className="text-3xl font-display font-medium text-primary block mt-1">
                        {plan.onBooking}%
                      </span>
                      <span className="text-2xs text-text-muted block mt-1">Due immediately on reservation</span>
                    </div>

                    <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                      <span className="text-xs text-text-muted font-medium block">2. During Construction</span>
                      <span className="text-3xl font-display font-medium text-secondary block mt-1">
                        {plan.duringConstruction}%
                      </span>
                      <span className="text-2xs text-text-muted block mt-1">Paid in verified construction milestones</span>
                    </div>

                    <div className="bg-sand-50 p-4 rounded-xl border border-sand-200/80">
                      <span className="text-xs text-text-muted font-medium block">3. On Handover</span>
                      <span className="text-3xl font-display font-medium text-emerald-700 block mt-1">
                        {plan.onHandover}%
                      </span>
                      <span className="text-2xs text-text-muted block mt-1">Upon handover ({formatHandoverDate(project.handoverDate || "")})</span>
                    </div>
                  </div>

                  {plan.postHandover && plan.postHandover > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900">
                      <span className="font-semibold block mb-0.5">Post-Handover Payment Option:</span>
                      {plan.postHandover}% of the purchase price is payable across {plan.postHandoverYears ?? 2} years post key collection.
                    </div>
                  )}
                </section>
              )}

              {/* Curated Amenities */}
              <section className="bg-surface border border-sand-200/90 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <h2 className="font-display text-2xl text-text font-light tracking-tight">
                  Lifestyle & Building Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-sand-50/70 border border-sand-200/60 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-navy-900 font-medium"
                    >
                      <Sparkles className="w-4 h-4 text-secondary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sticky Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* VIP Registration Card */}
              <div className="bg-surface border border-sand-200/90 rounded-2xl p-6 shadow-sm sticky top-28 space-y-5">
                <div className="space-y-1">
                  <span className="text-2xs uppercase tracking-wider font-semibold text-secondary block">
                    Direct Developer Allocation
                  </span>
                  <h3 className="font-display text-xl text-text font-medium">
                    Request VIP Priority Pack
                  </h3>
                  <p className="text-xs text-text-muted">
                    Receive complete brochure, official floor plan diagrams, and guaranteed launch allocations.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    className="rounded-xl text-xs font-semibold justify-center h-11 bg-primary text-white"
                    leftIcon={<Download className="w-4 h-4" />}
                    asChild
                  >
                    <Link href={`/new-projects?inquire=${project.slug}`}>
                      Download Official Brochure
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    fullWidth
                    className="rounded-xl text-xs font-semibold justify-center h-11"
                    leftIcon={<Phone className="w-4 h-4" />}
                    asChild
                  >
                    <a href="tel:+9714800378283">
                      Speak with Project Specialist
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t border-sand-100 space-y-2 text-2xs text-text-secondary">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>0% Agency Commission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Government Escrow Account Protected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Official Developer Unit Allocation</span>
                  </div>
                </div>

                {/* Developer Profile Snippet */}
                {project.developer && (
                  <div className="pt-4 border-t border-sand-100 bg-sand-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                    <span className="text-2xs uppercase tracking-wider font-medium text-text-muted block mb-1">
                      Master Developer
                    </span>
                    <h4 className="font-display text-base text-navy-900 font-medium">
                      {project.developer.name}
                    </h4>
                    <p className="text-2xs text-text-muted mt-1 line-clamp-3">
                      {project.developer.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Developments Strip */}
      {relatedProjects.length > 0 && (
        <section className="pt-10 border-t border-sand-200/80 bg-sand-50/40">
          <Container>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="eyebrow block mb-1">Explore Further</span>
                <h3 className="font-display text-2xl text-text font-light">
                  Similar Off-Plan Developments
                </h3>
              </div>
              <Button variant="outline" size="sm" asChild className="rounded-full text-xs">
                <Link href="/new-projects">View All Projects</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p._id}
                  href={`/new-projects/${p.slug}`}
                  className="group bg-surface border border-sand-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.images[0]?.url ?? "/images/placeholder.jpg"}
                      alt={p.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-2xs uppercase text-primary font-semibold">
                      {p.developer?.name}
                    </span>
                    <h4 className="font-display text-lg text-text group-hover:text-primary transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-text-muted">
                      Starting from {formatPrice(p.startingPrice, "AED", { compact: true })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
