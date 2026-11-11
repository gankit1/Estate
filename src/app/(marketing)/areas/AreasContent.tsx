"use client";

import * as React from "react";
import {
  Search,
  X,
  LayoutGrid,
  List,
  Train,
  Compass,
  Building2,
  TrendingUp,
  Percent,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { CustomSelect } from "@/components/ui/Select";
import { AreaCard } from "@/components/area/AreaCard";
import { AreaCompareModal } from "@/components/area/AreaCompareModal";
import { AreaLifestyleQuiz } from "@/components/area/AreaLifestyleQuiz";
import { AreaConsultationModal } from "@/components/area/AreaConsultationModal";
import {
  mockDubaiAreas,
  getMockAreas,
  getDistinctLifestyleCategories,
  type EnhancedArea,
  type AreaFilterCriteria,
} from "@/lib/data/mock-areas";

/* ── Sort Options ───────────────────────────────────────────── */
const sortOptions = [
  { value: "recommended", label: "Recommended / Investment Score" },
  { value: "yield-desc", label: "Rental Yield: High to Low" },
  { value: "growth-desc", label: "Capital Growth: Fastest YoY" },
  { value: "price-asc", label: "Price / sqft: Low to High" },
  { value: "price-desc", label: "Price / sqft: High to Low" },
  { value: "name-asc", label: "District Name: A to Z" },
];

export function AreasContent() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedLifestyle, setSelectedLifestyle] = React.useState("all");
  const [metroOnly, setMetroOnly] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("recommended");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Comparison State (Array of slugs, max 3)
  const [compareSlugs, setCompareSlugs] = React.useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = React.useState(false);

  // Advisory Modal State
  const [consultationArea, setConsultationArea] = React.useState<EnhancedArea | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  // Lifestyle categories with live counts
  const lifestyleTabs = React.useMemo(() => getDistinctLifestyleCategories(), []);

  // Filter application
  const filteredAreas = React.useMemo(() => {
    return getMockAreas({
      q: searchTerm,
      lifestyle: selectedLifestyle,
      metroOnly: metroOnly,
      sort: sortBy as AreaFilterCriteria["sort"],
    });
  }, [searchTerm, selectedLifestyle, metroOnly, sortBy]);

  // Comparison management
  const handleToggleCompare = (area: EnhancedArea) => {
    setCompareSlugs((prev) => {
      if (prev.includes(area.slug)) {
        return prev.filter((s) => s !== area.slug);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), area.slug]; // FIFO max 3
      }
      return [...prev, area.slug];
    });
  };

  const comparedAreas = React.useMemo(() => {
    const set = new Set(compareSlugs);
    return mockDubaiAreas.filter((a) => set.has(a.slug));
  }, [compareSlugs]);

  const hasActiveFilters =
    searchTerm !== "" || selectedLifestyle !== "all" || metroOnly || sortBy !== "recommended";

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLifestyle("all");
    setMetroOnly(false);
    setSortBy("recommended");
  };

  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-16">
      {/* ── Real-Time Market Highlights Strip ─────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Master Enclaves
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              12 Prime Districts
            </p>
          </div>
        </div>

        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-secondary/15 text-primary flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Highest Yield
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              8.4% Gross ROI
            </p>
          </div>
        </div>

        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Peak Capital Growth
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              +18.2% 1-Yr Surge
            </p>
          </div>
        </div>

        <div className="bg-surface border border-sand-200/90 rounded-2xl p-3.5 sm:p-5 shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold-100 text-gold-900 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-2xs uppercase tracking-wider text-text-muted font-medium block truncate">
              Foreign Ownership
            </span>
            <p className="text-base sm:text-xl lg:text-2xl font-display font-medium text-navy-900 mt-0.5">
              100% Freehold Title
            </p>
          </div>
        </div>
      </div>

      {/* ── Lifestyle Categories Strip ─────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-secondary" />
            Filter by Lifestyle Enclave
          </span>
          {selectedLifestyle !== "all" && (
            <button
              onClick={() => setSelectedLifestyle("all")}
              className="text-xs text-primary hover:underline font-medium cursor-pointer"
            >
              Show all enclaves
            </button>
          )}
        </div>

        <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0">
          {lifestyleTabs.map((tab) => {
            const isSelected = selectedLifestyle === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedLifestyle(tab.id)}
                className={cn(
                  "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border shrink-0 flex items-center gap-2 cursor-pointer",
                  isSelected
                    ? "bg-primary text-white border-primary shadow-xs font-semibold"
                    : "bg-surface hover:bg-sand-50 border-sand-200 text-text-secondary"
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-2xs",
                    isSelected ? "bg-white/20 text-white" : "bg-sand-100 text-navy-900"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Search, Filters & View Mode Panel ───────────────────────── */}
      <div className="bg-surface border border-sand-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              type="text"
              placeholder="Search districts, landmarks, beaches, or transport (e.g. Marina, Metro, Creek, Burj Khalifa)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 sm:h-11 text-xs sm:text-sm bg-sand-50/50 border-sand-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Metro Only Quick Toggle */}
          <button
            type="button"
            onClick={() => setMetroOnly(!metroOnly)}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-auto",
              metroOnly
                ? "bg-primary text-white border-primary shadow-xs font-semibold"
                : "bg-surface hover:bg-sand-50 border-sand-200 text-text-secondary"
            )}
          >
            <Train className="w-3.5 h-3.5 text-secondary" />
            Metro Connected Only
          </button>
        </div>

        {/* Lower Row: Result Count, Sort, & Layout Toggle */}
        <div className="pt-3 border-t border-sand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              Showing <strong className="text-navy-900">{filteredAreas.length}</strong> Dubai districts
            </span>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-error hover:underline font-medium ml-2 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Dropdown */}
            <div className="w-56">
              <CustomSelect
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                size="sm"
                align="right"
                buttonClassName="h-9 text-xs bg-white border-sand-200"
                aria-label="Sort Dubai districts"
              />
            </div>

            {/* Grid / List Switcher */}
            <div className="hidden sm:flex items-center p-1 bg-sand-100 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={cn(
                  "p-1.5 rounded-md transition-colors cursor-pointer",
                  viewMode === "grid" ? "bg-white shadow-2xs text-primary" : "text-text-muted hover:text-text"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={cn(
                  "p-1.5 rounded-md transition-colors cursor-pointer",
                  viewMode === "list" ? "bg-white shadow-2xs text-primary" : "text-text-muted hover:text-text"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Compare Toolbar (When 1+ Areas Checked) ──────── */}
      {compareSlugs.length > 0 && (
        <aside
          aria-label="District Comparison Bar"
          className="sticky bottom-6 z-40 bg-navy-900 text-white rounded-2xl p-4 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-3xl mx-auto animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Comparing ({compareSlugs.length}/3):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {comparedAreas.map((area) => (
                <span
                  key={area._id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs bg-white/10 border border-white/15"
                >
                  {area.name}
                  <button
                    onClick={() => handleToggleCompare(area)}
                    aria-label={`Remove ${area.name}`}
                    className="hover:text-secondary cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCompareSlugs([])}
              className="text-xs text-white/70 hover:text-white px-2 py-1 font-medium cursor-pointer"
            >
              Clear
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCompareModalOpen(true)}
              className="rounded-xl text-xs bg-secondary text-primary font-bold hover:bg-secondary-hover shadow-sm cursor-pointer whitespace-nowrap"
            >
              Compare Side-by-Side
            </Button>
          </div>
        </aside>
      )}

      {/* ── Areas Presentation Grid / List ─────────────────────────── */}
      {filteredAreas.length === 0 ? (
        <div className="bg-surface border border-sand-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-xs">
          <Building2 className="w-12 h-12 text-sand-400 mx-auto mb-4" />
          <h3 className="font-display text-xl sm:text-2xl text-text font-light mb-2">
            No Districts Match Your Criteria
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
            Try adjusting your search terms or lifestyle filters to explore our full Dubai neighborhoods portfolio.
          </p>
          <Button variant="primary" size="md" onClick={resetFilters} className="rounded-full">
            Reset District Filters
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {filteredAreas.map((area, idx) => (
            <AreaCard
              key={area._id}
              area={area}
              priority={idx < 3}
              isSelectedForCompare={compareSlugs.includes(area.slug)}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredAreas.map((area, idx) => (
            <AreaCard
              key={area._id}
              area={area}
              viewMode="list"
              priority={idx < 2}
              isSelectedForCompare={compareSlugs.includes(area.slug)}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      )}

      {/* ── Community Matcher Quiz ──────────────────────────────────── */}
      <section aria-labelledby="lifestyle-quiz-title">
        <AreaLifestyleQuiz
          onSelectArea={(area) => setConsultationArea(area)}
        />
      </section>

      {/* ── Dubai District Investment Strategy Matrix ───────────────── */}
      <section className="bg-surface border border-sand-200 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs space-y-6 sm:space-y-8">
        <div>
          <span className="eyebrow block mb-2">Portfolio Capital Allocation</span>
          <h3 className="font-display text-2xl sm:text-3xl text-text font-light tracking-tight">
            Dubai Neighborhood Investment Strategy Matrix
          </h3>
          <p className="text-text-muted text-xs sm:text-sm max-w-2xl mt-1">
            Understanding the historical yield vs. capital preservation dynamics across Dubai&apos;s leading property zones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: High Yield & Cash Flow */}
          <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-navy-900">High Yield &amp; Cash Flow</h4>
              <span className="text-2xs text-amber-700 font-mono font-medium block mt-0.5">
                Yields: 7.0% – 9.0%+ ROI
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Jumeirah Village Circle (JVC) and Business Bay offer superior cash-on-cash returns, low barrier to entry, and high occupancy rates from corporate and expatriate tenants.
            </p>
          </div>

          {/* Card 2: High Capital Appreciation */}
          <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-navy-900">Capital Appreciation</h4>
              <span className="text-2xs text-emerald-700 font-mono font-medium block mt-0.5">
                Appreciation: +14% – +18% YoY
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Dubai Creek Harbour and Mohammed Bin Rashid City (MBR City) are master developments undergoing extensive infrastructure expansion with immense equity upside upon completion.
            </p>
          </div>

          {/* Card 3: Trophy Waterfront Assets */}
          <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/15 text-primary flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-navy-900">Trophy Wealth Preservation</h4>
              <span className="text-2xs text-gold-700 font-mono font-medium block mt-0.5">
                Global Scarcity &amp; Prestige
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Palm Jumeirah and Bluewaters Island provide strictly limited waterfront supply, insulating capital from inflation while offering world-recognized billionaire status.
            </p>
          </div>

          {/* Card 4: Gated Master Family Enclaves */}
          <div className="bg-sand-50/70 border border-sand-200 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-navy-900">Family Villa Sanctuaries</h4>
              <span className="text-2xs text-primary font-mono font-medium block mt-0.5">
                High Liquidity Family Living
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Dubai Hills Estate and Dubailand provide complete ecosystems of international schools, championship golf courses, private parks, and world-class healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dubai Neighborhoods FAQ ───────────────────────────────── */}
      <section className="bg-sand-50/70 border border-sand-200 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-6">
        <div>
          <span className="eyebrow block mb-2">Area Intelligence FAQ</span>
          <h3 className="font-display text-2xl sm:text-3xl text-text font-light tracking-tight">
            Frequently Asked Questions on Dubai Areas
          </h3>
          <p className="text-text-muted text-xs sm:text-sm max-w-2xl mt-1">
            Critical insights on ownership regulations, transit impact, and rental return dynamics across Dubai&apos;s districts.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              question: "What is the difference between Freehold and Leasehold areas in Dubai?",
              answer:
                "In designated Freehold areas (such as Dubai Marina, Downtown, Palm Jumeirah, and Dubai Hills), foreign nationals of all citizenships receive 100% unconditional freehold title deeds registered with the Dubai Land Department (DLD). In Leasehold areas, property rights are typically granted for a duration of 30 to 99 years.",
            },
            {
              question: "Which areas in Dubai generate the highest net rental yields?",
              answer:
                "Affordable and high-density communities such as Jumeirah Village Circle (JVC) and Business Bay deliver the highest gross yields, frequently reaching 7.5% to 8.5%+. Prime luxury enclaves like Palm Jumeirah and Downtown Dubai yield between 5.2% and 6.5%, but compensate with substantially higher capital appreciation.",
            },
            {
              question: "Does Metro connectivity significantly influence property appreciation in Dubai?",
              answer:
                "Historical DLD transaction data demonstrates that residential units situated within a 5-minute walk of an operational Dubai Metro station command a 12% to 18% rental premium and appreciate faster than comparable properties that require vehicular transit.",
            },
            {
              question: "Are all 12 featured areas eligible for the UAE 06-Year Golden Visa?",
              answer:
                "Yes. Under UAE federal law, any property acquisition (ready or off-plan) across all registered freehold master developments valued at AED 2,000,000 or greater qualifies the purchaser and their family dependents for the 06-Year Golden Residency Visa.",
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
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-4 hover:bg-sand-50/60 transition-colors cursor-pointer"
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
      <AreaCompareModal
        areas={comparedAreas}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveArea={(slug) => setCompareSlugs((prev) => prev.filter((s) => s !== slug))}
        onClearAll={() => {
          setCompareSlugs([]);
          setIsCompareModalOpen(false);
        }}
      />

      <AreaConsultationModal
        area={consultationArea}
        isOpen={!!consultationArea}
        onClose={() => setConsultationArea(null)}
      />
    </div>
  );
}
