"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Award,
  CheckCircle2,
  Sparkles,
  Download,
  Phone,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge/Badge";
import { Button } from "@/components/ui/Button/Button";
import { formatPrice, formatHandoverDate } from "@/lib/utils/format";
import type { OffPlanProject } from "@/lib/data/mock-projects";

interface ProjectQuickViewModalProps {
  project: OffPlanProject | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: (project: OffPlanProject) => void;
}

interface InnerQuickViewProps {
  project: OffPlanProject;
  onClose: () => void;
  onInquire: (project: OffPlanProject) => void;
}

function InnerQuickView({ project, onClose, onInquire }: InnerQuickViewProps) {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState<"overview" | "units" | "payment" | "floorplans">("overview");
  const [imgErrors, setImgErrors] = React.useState<Record<number, boolean>>({});

  const plan = project.paymentPlan;

  const fallbackUrl = React.useMemo(() => {
    const loc = (project.location.area + " " + project.name).toLowerCase();
    if (loc.includes("creek") || loc.includes("harbour")) return "/images/project-creek.svg";
    if (loc.includes("palm") || loc.includes("beach") || loc.includes("coastal") || loc.includes("island")) return "/images/project-palm.svg";
    if (loc.includes("hills") || loc.includes("villa") || loc.includes("oasis") || loc.includes("townhouse")) return "/images/project-hills.svg";
    if (loc.includes("downtown") || loc.includes("binghatti") || loc.includes("dorchester") || loc.includes("canal") || loc.includes("bay")) return "/images/project-downtown.svg";
    return "/images/placeholder.jpg";
  }, [project.location.area, project.name]);

  const currentImage = imgErrors[activeImageIndex]
    ? fallbackUrl
    : project.images[activeImageIndex]?.url ?? fallbackUrl;

  return (
    <div className="relative w-full max-w-4xl max-h-[92vh] bg-surface rounded-2xl sm:rounded-3xl shadow-2xl border border-sand-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
      {/* Modal Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-sand-200 flex items-center justify-between bg-sand-50/50 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {project.developer?.name ?? "Developer"}
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
            <Badge variant="secondary" size="sm" className="hidden sm:inline-flex gap-1">
              <Award className="w-3 h-3 text-[#C5A880]" />
              Golden Visa Eligible
            </Badge>
          )}
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text hover:bg-sand-100 transition-colors shrink-0 ml-2"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Scrollable Body */}
      <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-7 space-y-6">
        {/* Main Visual & Image switcher */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-sand-100 shadow-xs">
            <Image
              src={currentImage}
              alt={project.images[activeImageIndex]?.caption ?? project.name}
              fill
              unoptimized
              onError={() =>
                setImgErrors((prev) => ({ ...prev, [activeImageIndex]: true }))
              }
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
              <p className="text-2xs sm:text-xs font-medium text-gold-300 drop-shadow-sm mb-1">
                {project.images[activeImageIndex]?.caption ?? project.name}
              </p>
              <h2 id="modal-project-title" className="font-display text-xl sm:text-2xl md:text-3xl font-light">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Thumbnail selector */}
          {project.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all",
                    activeImageIndex === i
                      ? "border-primary ring-2 ring-primary/20 scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={imgErrors[i] ? fallbackUrl : (img.url || fallbackUrl)}
                    alt={img.caption ?? `Image ${i + 1}`}
                    fill
                    unoptimized
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [i]: true }))
                    }
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-sand-50/70 border border-sand-200/90 rounded-2xl p-3.5 sm:p-4">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block">Starting Price</span>
            <p className="text-base sm:text-lg font-display font-medium text-primary">
              {formatPrice(project.startingPrice, "AED", { compact: true })}
            </p>
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block">Handover Date</span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900 mt-0.5">
              {project.handoverDate ? formatHandoverDate(project.handoverDate) : "TBD"}
            </p>
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block">Community / Area</span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900 mt-0.5 truncate">
              {project.location.area}
            </p>
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted font-medium block">Est. Service Charge</span>
            <p className="text-xs sm:text-sm font-semibold text-navy-900 mt-0.5">
              {project.serviceChargeEst ?? "AED 16 / sqft"}
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-sand-200 gap-4 sm:gap-6 text-xs sm:text-sm font-medium overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "pb-3 -mb-px transition-colors relative whitespace-nowrap",
              activeTab === "overview"
                ? "text-primary border-b-2 border-primary font-semibold"
                : "text-text-muted hover:text-text"
            )}
          >
            Overview &amp; Amenities
          </button>
          <button
            onClick={() => setActiveTab("units")}
            className={cn(
              "pb-3 -mb-px transition-colors relative whitespace-nowrap",
              activeTab === "units"
                ? "text-primary border-b-2 border-primary font-semibold"
                : "text-text-muted hover:text-text"
            )}
          >
            Unit Types &amp; Pricing ({project.unitTypes.length})
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={cn(
              "pb-3 -mb-px transition-colors relative whitespace-nowrap",
              activeTab === "payment"
                ? "text-primary border-b-2 border-primary font-semibold"
                : "text-text-muted hover:text-text"
            )}
          >
            Payment Schedule
          </button>
          {project.floorPlans && project.floorPlans.length > 0 && (
            <button
              onClick={() => setActiveTab("floorplans")}
              className={cn(
                "pb-3 -mb-px transition-colors relative whitespace-nowrap",
                activeTab === "floorplans"
                  ? "text-primary border-b-2 border-primary font-semibold"
                  : "text-text-muted hover:text-text"
              )}
            >
              Floor Plans ({project.floorPlans.length})
            </button>
          )}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-2">Project Vision</h4>
              <p className="text-xs sm:text-sm md:text-base text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-3">Key Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-3">Curated Amenities</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {project.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-sand-50 rounded-lg border border-sand-200/60 text-xs text-navy-900 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="truncate">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Unit Types with horizontal scroll */}
        {activeTab === "units" && (
          <div className="space-y-4">
            <div className="border border-sand-200 rounded-xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-sand-100/70 border-b border-sand-200 text-text-muted font-medium">
                    <th className="py-3 px-4">Configuration</th>
                    <th className="py-3 px-4">Bedrooms</th>
                    <th className="py-3 px-4">Estimated Area</th>
                    <th className="py-3 px-4 text-right">Starting Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {project.unitTypes.map((unit, idx) => (
                    <tr key={idx} className="hover:bg-sand-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-navy-900">{unit.type}</td>
                      <td className="py-3.5 px-4 text-text-muted">
                        {unit.bedrooms === 0 ? "Studio" : `${unit.bedrooms} BR`}
                      </td>
                      <td className="py-3.5 px-4 text-text-muted font-mono">{unit.area}</td>
                      <td className="py-3.5 px-4 text-right font-display text-base font-semibold text-primary">
                        {formatPrice(unit.startingPrice, "AED", { compact: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-2xs sm:text-xs text-text-muted italic">
              * Inventory availability and exact unit prices are subject to developer confirmation and release phases.
            </p>
          </div>
        )}

        {/* Tab 3: Payment Plan */}
        {activeTab === "payment" && (
          <div className="space-y-6">
            {plan ? (
              <>
                <div className="bg-sand-50 rounded-2xl p-4 sm:p-5 border border-sand-200 space-y-4">
                  <h4 className="text-xs sm:text-sm font-semibold text-navy-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-secondary" />
                    Milestone Schedule
                  </h4>

                  {/* Progress Bar visual */}
                  <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-sand-200">
                    <div
                      style={{ width: `${plan.onBooking}%` }}
                      className="bg-primary h-full"
                      title={`On Booking: ${plan.onBooking}%`}
                    />
                    <div
                      style={{ width: `${plan.duringConstruction}%` }}
                      className="bg-secondary h-full"
                      title={`During Construction: ${plan.duringConstruction}%`}
                    />
                    <div
                      style={{ width: `${plan.onHandover}%` }}
                      className="bg-emerald-600 h-full"
                      title={`On Handover: ${plan.onHandover}%`}
                    />
                    {plan.postHandover && plan.postHandover > 0 && (
                      <div
                        style={{ width: `${plan.postHandover}%` }}
                        className="bg-amber-600 h-full"
                        title={`Post Handover: ${plan.postHandover}%`}
                      />
                    )}
                  </div>

                  {/* Milestone Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                    <div className="bg-white p-3.5 rounded-xl border border-sand-200/80 shadow-2xs">
                      <span className="text-xs text-text-muted block font-medium">1. On Booking</span>
                      <span className="text-2xl font-display font-medium text-primary block mt-0.5">
                        {plan.onBooking}%
                      </span>
                      <span className="text-2xs text-text-muted block mt-1">Immediate reservation deposit</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-sand-200/80 shadow-2xs">
                      <span className="text-xs text-text-muted block font-medium">2. Construction</span>
                      <span className="text-2xl font-display font-medium text-[#9E7D52] block mt-0.5">
                        {plan.duringConstruction}%
                      </span>
                      <span className="text-2xs text-text-muted block mt-1">Linked to verified site milestones</span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-sand-200/80 shadow-2xs">
                      <span className="text-xs text-text-muted block font-medium">3. On Handover</span>
                      <span className="text-2xl font-display font-medium text-emerald-700 block mt-0.5">
                        {plan.onHandover}%
                      </span>
                      <span className="text-2xs text-text-muted block mt-1">Upon key collection ({formatHandoverDate(project.handoverDate || "")})</span>
                    </div>
                    {plan.postHandover && plan.postHandover > 0 && (
                      <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/80 shadow-2xs">
                        <span className="text-xs text-amber-900 block font-medium">4. Post-Handover</span>
                        <span className="text-2xl font-display font-medium text-amber-800 block mt-0.5">
                          {plan.postHandover}%
                        </span>
                        <span className="text-2xs text-amber-750 block mt-1">Over {plan.postHandoverYears ?? 2} years after move-in</span>
                      </div>
                    )}
                  </div>
                </div>

                {project.goldenVisaEligible && (
                  <div className="bg-gold-50/80 border border-gold-200 rounded-2xl p-4 flex items-start gap-3">
                    <Award className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-navy-900">UAE 06-Year Golden Visa Eligible</h5>
                      <p className="text-xs text-text-secondary mt-1">
                        Properties in this development meet or exceed the AED 2,000,000 threshold required for the UAE Golden Visa residency scheme for investors and immediate family members.
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-text-muted">Payment plan details available upon VIP inquiry.</p>
            )}
          </div>
        )}

        {/* Tab 4: Floor Plans */}
        {activeTab === "floorplans" && project.floorPlans && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.floorPlans.map((fp, idx) => (
              <div key={idx} className="border border-sand-200 rounded-xl p-4 bg-sand-50/50 space-y-3">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white border border-sand-200">
                  <Image
                    src={fp.url}
                    alt={fp.title}
                    fill
                    unoptimized
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = "/images/placeholder.jpg";
                    }}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 350px"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-navy-900">{fp.title}</span>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onInquire(project)}
                    className="text-2xs rounded-full gap-1"
                  >
                    <Download className="w-3 h-3" />
                    PDF Layout
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Footer with Actions */}
      <div className="px-4 sm:px-6 py-4 border-t border-sand-200 bg-sand-50/70 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-2xs sm:text-xs text-text-muted">Need personalised guidance?</span>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" />
            +971 4 800 ESTATE
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Button
            variant="outline"
            size="md"
            onClick={() => onInquire(project)}
            className="rounded-full text-xs font-medium flex-1 sm:flex-initial"
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Get Brochure
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => onInquire(project)}
            className="rounded-full text-xs font-medium bg-primary text-white flex-1 sm:flex-initial"
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            VIP Priority Access
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProjectQuickViewModal({
  project,
  isOpen,
  onClose,
  onInquire,
}: ProjectQuickViewModalProps) {
  // Handle ESC key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <InnerQuickView
        key={project._id}
        project={project}
        onClose={onClose}
        onInquire={onInquire}
      />
    </div>
  );
}
