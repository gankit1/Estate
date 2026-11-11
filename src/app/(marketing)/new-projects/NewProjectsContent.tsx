"use client";

import * as React from "react";
import {
  Search,
  X,
  LayoutGrid,
  List,
  Award,
  ShieldCheck,
  Building2,
  ChevronDown,
  TrendingUp,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { CustomSelect } from "@/components/ui/Select";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectQuickViewModal } from "@/components/project/ProjectQuickViewModal";
import { ProjectInquiryModal } from "@/components/project/ProjectInquiryModal";
import { PaymentPlanCalculator } from "@/components/project/PaymentPlanCalculator";
import {
  mockOffPlanProjects,
  mockProjectDevelopers,
  getMockProjects,
  getDistinctAreas,
  type OffPlanProject,
  type ProjectFilterCriteria,
} from "@/lib/data/mock-projects";

/* ── Sort Options ───────────────────────────────────────────── */
const sortOptions = [
  { value: "featured", label: "Featured / Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "handover-asc", label: "Handover: Soonest" },
  { value: "developer-asc", label: "Developer: A to Z" },
];

/* ── Handover Year Options ──────────────────────────────────── */
const handoverOptions = [
  { value: "all", label: "All Handovers" },
  { value: "2026", label: "2026 Completion" },
  { value: "2027", label: "2027 Completion" },
  { value: "2028+", label: "2028 & Beyond" },
];

/* ── Bedroom Options ────────────────────────────────────────── */
const bedroomOptions = [
  { value: "all", label: "Any Bedrooms" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4+", label: "4+ Beds / Penthouse" },
];

/* ── Price Filter Options ───────────────────────────────────── */
const priceRangeOptions = [
  { value: "all", label: "Any Price Range" },
  { value: "under-2m", label: "Under AED 2 Million" },
  { value: "2m-5m", label: "AED 2M – AED 5 Million" },
  { value: "5m-10m", label: "AED 5M – AED 10 Million" },
  { value: "above-10m", label: "Above AED 10 Million" },
];

export function NewProjectsContent() {
  // Filter states
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDeveloper, setSelectedDeveloper] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [selectedArea, setSelectedArea] = React.useState("all");
  const [selectedHandover, setSelectedHandover] = React.useState("all");
  const [selectedBedrooms, setSelectedBedrooms] = React.useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = React.useState("all");
  const [hasPostHandover, setHasPostHandover] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("featured");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Modal states
  const [quickViewProject, setQuickViewProject] = React.useState<OffPlanProject | null>(null);
  const [inquiryProject, setInquiryProject] = React.useState<OffPlanProject | null>(null);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // Distinct areas from dataset
  const areaOptions = React.useMemo(() => {
    const list = getDistinctAreas().map((area) => ({
      value: area,
      label: area,
    }));
    return [{ value: "all", label: "All Dubai Areas" }, ...list];
  }, []);

  // Filter application
  const filteredProjects = React.useMemo(() => {
    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (selectedPriceRange === "under-2m") {
      maxPrice = 2000000;
    } else if (selectedPriceRange === "2m-5m") {
      minPrice = 2000000;
      maxPrice = 5000000;
    } else if (selectedPriceRange === "5m-10m") {
      minPrice = 5000000;
      maxPrice = 10000000;
    } else if (selectedPriceRange === "above-10m") {
      minPrice = 10000000;
    }

    return getMockProjects({
      q: searchTerm,
      developer: selectedDeveloper,
      status: selectedStatus,
      area: selectedArea,
      handoverYear: selectedHandover,
      bedrooms: selectedBedrooms,
      hasPostHandover: hasPostHandover,
      minPrice,
      maxPrice,
      sort: sortBy as ProjectFilterCriteria["sort"],
    });
  }, [
    searchTerm,
    selectedDeveloper,
    selectedStatus,
    selectedArea,
    selectedHandover,
    selectedBedrooms,
    selectedPriceRange,
    hasPostHandover,
    sortBy,
  ]);

  // Check if any filter is active
  const hasActiveFilters =
    searchTerm !== "" ||
    selectedDeveloper !== "all" ||
    selectedStatus !== "all" ||
    selectedArea !== "all" ||
    selectedHandover !== "all" ||
    selectedBedrooms !== "all" ||
    selectedPriceRange !== "all" ||
    hasPostHandover;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDeveloper("all");
    setSelectedStatus("all");
    setSelectedArea("all");
    setSelectedHandover("all");
    setSelectedBedrooms("all");
    setSelectedPriceRange("all");
    setHasPostHandover(false);
    setSortBy("featured");
  };

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      {/* ── Key Metrics Highlights Bar ────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Master Projects
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              12 Developments
            </p>
          </div>
        </div>

        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-secondary/15 text-primary flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Starting Entry
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              AED 720,000
            </p>
          </div>
        </div>

        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Investor Security
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              100% Escrow Law
            </p>
          </div>
        </div>

        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold-100 text-amber-900 flex items-center justify-center shrink-0">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Residency Pathway
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              10-Yr Golden Visa
            </p>
          </div>
        </div>
      </div>

      {/* ── Top Developers Visual Filter Strip ─────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-secondary" />
            Filter by Master Developer
          </span>
          {selectedDeveloper !== "all" && (
            <button
              onClick={() => setSelectedDeveloper("all")}
              className="text-xs text-primary hover:underline font-medium"
            >
              Show all developers
            </button>
          )}
        </div>

        <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedDeveloper("all")}
            className={cn(
              "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 flex items-center gap-2",
              selectedDeveloper === "all"
                ? "bg-primary text-white border-primary shadow-xs"
                : "bg-surface hover:bg-sand-50 border-sand-200 text-text-secondary"
            )}
          >
            All Developers
            <span
              className={cn(
                "px-1.5 py-0.2 rounded-full text-2xs",
                selectedDeveloper === "all"
                  ? "bg-white/20 text-white"
                  : "bg-sand-100 text-navy-900"
              )}
            >
              {mockOffPlanProjects.length}
            </span>
          </button>

          {mockProjectDevelopers.map((dev) => {
            const count = mockOffPlanProjects.filter(
              (p) => p.developerRef === dev._id || p.developer?.slug === dev.slug
            ).length;
            const isSelected = selectedDeveloper === dev.slug || selectedDeveloper === dev._id;

            return (
              <button
                key={dev._id}
                onClick={() => setSelectedDeveloper(dev.slug)}
                className={cn(
                  "px-3 sm:px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 flex items-center gap-2",
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-surface hover:bg-sand-50 border-sand-200 text-text-secondary"
                )}
              >
                <span
                  className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold font-mono shrink-0",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-sand-200 text-primary"
                  )}
                >
                  {dev.name.charAt(0)}
                </span>
                <span>{dev.name}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-2xs",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-sand-100 text-navy-900"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search & Filter Controls Panel ─────────────────────────── */}
      <div className="bg-surface border border-sand-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        {/* Top search & status tabs row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Search projects, developers, or areas (e.g. Creek, Emaar, Palm Jumeirah)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 sm:h-11 text-xs sm:text-sm bg-sand-50/50 border-sand-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status selector tabs with smooth scroll on mobile */}
          <div className="flex items-center gap-1 p-1 bg-sand-100/80 rounded-xl overflow-x-auto scrollbar-none shrink-0 w-full lg:w-auto">
            {[
              { id: "all", label: "All Projects" },
              { id: "under-construction", label: "Under Construction" },
              { id: "upcoming", label: "Upcoming Launches" },
              { id: "ready", label: "Ready Handover" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-1 lg:flex-initial text-center",
                  selectedStatus === tab.id
                    ? "bg-white text-navy-900 shadow-2xs font-semibold"
                    : "text-text-muted hover:text-text"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
          {/* Area select */}
          <CustomSelect
            options={areaOptions}
            value={selectedArea}
            onChange={setSelectedArea}
            placeholder="Select Area"
            size="sm"
            buttonClassName="h-10 text-xs bg-white border-sand-200"
            aria-label="Filter by area"
          />

          {/* Price Range */}
          <CustomSelect
            options={priceRangeOptions}
            value={selectedPriceRange}
            onChange={setSelectedPriceRange}
            placeholder="Price Range"
            size="sm"
            buttonClassName="h-10 text-xs bg-white border-sand-200"
            aria-label="Filter by price range"
          />

          {/* Handover Year */}
          <CustomSelect
            options={handoverOptions}
            value={selectedHandover}
            onChange={setSelectedHandover}
            placeholder="Handover Year"
            size="sm"
            buttonClassName="h-10 text-xs bg-white border-sand-200"
            aria-label="Filter by handover year"
          />

          {/* Bedrooms */}
          <CustomSelect
            options={bedroomOptions}
            value={selectedBedrooms}
            onChange={setSelectedBedrooms}
            placeholder="Bedrooms"
            size="sm"
            buttonClassName="h-10 text-xs bg-white border-sand-200"
            aria-label="Filter by bedrooms"
          />
        </div>

        {/* Filter Quick Pills & Toggles */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-sand-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setHasPostHandover(!hasPostHandover)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5",
                hasPostHandover
                  ? "bg-amber-50 text-amber-900 border-amber-300 font-semibold shadow-2xs"
                  : "bg-white text-text-muted hover:text-text border-sand-200"
              )}
            >
              <Percent className="w-3.5 h-3.5 text-secondary" />
              Post-Handover Payment Plans
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-error hover:underline font-medium px-2 py-1 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            )}
          </div>

          {/* Active result count & View Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
            <span className="text-xs text-text-muted">
              Showing <strong className="text-navy-900">{filteredProjects.length}</strong> developments
            </span>

            {/* Sort Selector */}
            <div className="w-44">
              <CustomSelect
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                size="sm"
                align="right"
                buttonClassName="h-9 text-xs bg-white border-sand-200"
                aria-label="Sort off-plan projects"
              />
            </div>

            {/* Grid / List switch */}
            <div className="hidden sm:flex items-center p-1 bg-sand-100 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "grid" ? "bg-white shadow-2xs text-primary" : "text-text-muted hover:text-text"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  viewMode === "list" ? "bg-white shadow-2xs text-primary" : "text-text-muted hover:text-text"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Filters Badges Row (if any) ────────────────────── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 -mt-4 sm:-mt-6">
          <span className="text-2xs uppercase tracking-wider text-text-muted font-medium">Active Filters:</span>
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              &quot;{searchTerm}&quot;
              <button onClick={() => setSearchTerm("")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedDeveloper !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              Dev: {selectedDeveloper}
              <button onClick={() => setSelectedDeveloper("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedStatus !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              Status: {selectedStatus}
              <button onClick={() => setSelectedStatus("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedArea !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              Area: {selectedArea}
              <button onClick={() => setSelectedArea("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceRange !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              Price: {selectedPriceRange}
              <button onClick={() => setSelectedPriceRange("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedHandover !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              Handover: {selectedHandover}
              <button onClick={() => setSelectedHandover("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedBedrooms !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-sand-200 text-navy-900 font-medium">
              {selectedBedrooms} Beds
              <button onClick={() => setSelectedBedrooms("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {hasPostHandover && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-amber-100 text-amber-900 font-medium">
              Post-Handover
              <button onClick={() => setHasPostHandover(false)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* ── Projects Catalog Presentation ─────────────────────────── */}
      {filteredProjects.length === 0 ? (
        <div className="bg-surface border border-sand-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
          <Building2 className="w-12 h-12 text-sand-400 mx-auto mb-4" />
          <h3 className="font-display text-xl sm:text-2xl text-text font-light mb-2">
            No Developments Match Your Criteria
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
            Try adjusting your search filters or clearing active selections to explore our full Dubai off-plan portfolio.
          </p>
          <Button variant="primary" size="md" onClick={resetFilters} className="rounded-full">
            Clear All Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project._id}
              project={project}
              priority={idx < 3}
              onQuickView={(p) => setQuickViewProject(p)}
              onInquire={(p) => setInquiryProject(p)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project._id}
              project={project}
              viewMode="list"
              priority={idx < 2}
              onQuickView={(p) => setQuickViewProject(p)}
              onInquire={(p) => setInquiryProject(p)}
            />
          ))}
        </div>
      )}

      {/* ── Interactive Off-Plan Payment Calculator ────────────────── */}
      <section aria-labelledby="calculator-section-title">
        <PaymentPlanCalculator
          onOpenConsultation={() => {
            if (filteredProjects.length > 0) {
              setInquiryProject(filteredProjects[0]);
            }
          }}
        />
      </section>

      {/* ── Why Invest Off-Plan in Dubai Section ──────────────────── */}
      <section className="bg-surface border border-sand-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs space-y-6 sm:space-y-8">
        <div>
          <span className="eyebrow block mb-2">Investor Knowledge</span>
          <h3 className="font-display text-2xl sm:text-3xl text-text font-light tracking-tight">
            The Dubai Off-Plan Advantage
          </h3>
          <p className="text-text-muted text-xs sm:text-sm max-w-2xl mt-1">
            Understanding the legal safeguards and financial upside of purchasing directly from premier developers before completion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="space-y-2 p-3 sm:p-0 bg-sand-50/50 sm:bg-transparent rounded-xl border border-sand-200/50 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <h4 className="font-semibold text-sm text-navy-900">RERA Escrow Protection</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Law No. 8 guarantees that all buyer payments are deposited directly into a government-regulated escrow account, released exclusively upon verified construction progress.
            </p>
          </div>

          <div className="space-y-2 p-3 sm:p-0 bg-sand-50/50 sm:bg-transparent rounded-xl border border-sand-200/50 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/15 text-primary flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <h4 className="font-semibold text-sm text-navy-900">Capital Appreciation</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Acquiring units at initial launch pricing offers substantial capital gains upon handover, historically generating between 15% to 30% equity uplift.
            </p>
          </div>

          <div className="space-y-2 p-3 sm:p-0 bg-sand-50/50 sm:bg-transparent rounded-xl border border-sand-200/50 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold-100 text-gold-900 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-secondary" />
            </div>
            <h4 className="font-semibold text-sm text-navy-900">06-Year Golden Visa</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Investors purchasing properties valued at AED 2 Million or higher qualify for the prestigious UAE Golden Visa with full family sponsorship and no minimum stay requirements.
            </p>
          </div>

          <div className="space-y-2 p-3 sm:p-0 bg-sand-50/50 sm:bg-transparent rounded-xl border border-sand-200/50 sm:border-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Percent className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-sm text-navy-900">Flexible Phased Outlay</h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Spread acquisition costs across 3 to 5 years with interest-free developer schedules, including post-handover payment terms up to 36 months after moving in.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────── */}
      <section className="bg-sand-50/70 border border-sand-200 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
        <div>
          <span className="eyebrow block mb-2">Frequently Asked Questions</span>
          <h3 className="font-display text-2xl sm:text-3xl text-text font-light tracking-tight">
            Off-Plan Buying FAQ
          </h3>
          <p className="text-text-muted text-xs sm:text-sm max-w-2xl mt-1">
            Essential facts for international buyers and local investors navigating Dubai&apos;s off-plan developments.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              question: "How are my payments protected when buying off-plan in Dubai?",
              answer:
                "Under Dubai Law No. 8 of 2007, every developer must establish an independent Escrow Account with an accredited bank for each registered project. All buyer installments are paid directly into this escrow account and can only be withdrawn as independent engineering auditors verify construction milestone completion on site.",
            },
            {
              question: "Can foreign nationals and non-residents purchase off-plan properties in Dubai?",
              answer:
                "Yes. International buyers of all nationalities can purchase off-plan freehold real estate in designated investment zones (such as Downtown Dubai, Dubai Marina, Palm Jumeirah, Dubai Creek Harbour, and MBR City) with 100% foreign ownership rights.",
            },
            {
              question: "Can I sell or reassign my off-plan property before construction completion?",
              answer:
                "Yes, off-plan properties can be resold on the secondary market. Developers typically require the buyer to have paid between 30% to 40% of the property value, after which an official NOC (No Objection Certificate) is granted to transfer ownership to the new purchaser.",
            },
            {
              question: "What additional fees are due when purchasing an off-plan property?",
              answer:
                "The mandatory fees are: 4% Dubai Land Department (DLD) transfer fee, an Oqood (pre-title registration) fee of AED 3,000 to AED 5,000, and standard developer administrative fees. When purchasing through Pacific Star Realty, you pay 0% agency commission on direct off-plan purchases.",
            },
          ].map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-surface border border-sand-200/90 rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 hover:bg-sand-50/60 transition-colors"
                >
                  <span className="font-medium text-xs sm:text-sm text-navy-900">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-text-muted transition-transform shrink-0",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-sand-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Modals ────────────────────────────────────────────────── */}
      <ProjectQuickViewModal
        project={quickViewProject}
        isOpen={!!quickViewProject}
        onClose={() => setQuickViewProject(null)}
        onInquire={(p) => {
          setQuickViewProject(null);
          setInquiryProject(p);
        }}
      />

      <ProjectInquiryModal
        project={inquiryProject}
        isOpen={!!inquiryProject}
        onClose={() => setInquiryProject(null)}
      />
    </div>
  );
}
