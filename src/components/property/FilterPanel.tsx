"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { filterOptions } from "@/lib/api/propertyService";
import type { PropertyFilters } from "@/types";
import { parseSearchParams, buildSearchParams } from "@/lib/utils/search";

/* ── Chevron icon ───────────────────────────────────────────── */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("transition-transform duration-200", open && "rotate-180")}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ── Collapsible section ────────────────────────────────────── */
function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-text hover:text-primary transition-colors"
        aria-expanded={open}
      >
        {title}
        <ChevronIcon open={open} />
      </button>
      {open && <div className="pt-2">{children}</div>}
    </div>
  );
}

/* ── Pill buttons (multi-select) ────────────────────────────── */
function PillGroup({
  options,
  selected,
  onToggle,
  ariaLabel,
}: {
  options: readonly { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
      {options.map((opt) => {
        const isActive = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            aria-pressed={isActive}
            className={cn(
              "px-3 py-1.5 text-xs rounded-sm border transition-colors duration-150",
              isActive
                ? "bg-primary text-text-inverse border-primary"
                : "bg-surface text-text-secondary border-border hover:border-primary hover:text-primary"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main FilterPanel ───────────────────────────────────────── */
interface FilterPanelProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

export function FilterPanel({ className, onClose, isMobile }: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  // Local state mirrors URL for instant UI feedback
  const [filters, setFilters] = React.useState<PropertyFilters>(() =>
    parseSearchParams(new URLSearchParams(searchParamsString))
  );

  // Sync from URL when searchParams change externally
  React.useEffect(() => {
    setFilters(parseSearchParams(new URLSearchParams(searchParamsString)));
  }, [searchParamsString]);

  const updateURL = React.useCallback(
    (newFilters: PropertyFilters) => {
      const cleaned: PropertyFilters = { ...newFilters, page: 1 };
      const qs = buildSearchParams(cleaned);
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname]
  );

  const applyFilters = () => {
    updateURL(filters);
    onClose?.();
  };

  const clearFilters = () => {
    const cleared: PropertyFilters = {};
    setFilters(cleared);
    updateURL(cleared);
    onClose?.();
  };

  const togglePurpose = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      purpose: prev.purpose === val ? undefined : (val as PropertyFilters["purpose"]),
    }));
  };

  const togglePropertyType = (val: string) => {
    setFilters((prev) => {
      const current: string[] = Array.isArray(prev.propertyType)
        ? (prev.propertyType as string[])
        : prev.propertyType
          ? [prev.propertyType]
          : [];
      const next = current.includes(val)
        ? current.filter((t) => t !== val)
        : [...current, val];
      return {
        ...prev,
        propertyType: next.length === 0
          ? undefined
          : next.length === 1
            ? (next[0] as PropertyFilters["propertyType"])
            : (next as PropertyFilters["propertyType"]),
      };
    });
  };

  const toggleBedroom = (val: string) => {
    const num = Number(val);
    setFilters((prev) => {
      const current = Array.isArray(prev.bedrooms)
        ? prev.bedrooms
        : prev.bedrooms !== undefined
          ? [prev.bedrooms]
          : [];
      const next = current.includes(num)
        ? current.filter((b) => b !== num)
        : [...current, num];
      return {
        ...prev,
        bedrooms: next.length === 0
          ? undefined
          : next.length === 1
            ? next[0]
            : next,
      };
    });
  };

  const toggleArea = (val: string) => {
    setFilters((prev) => {
      const current = Array.isArray(prev.area)
        ? prev.area
        : prev.area
          ? [prev.area]
          : [];
      const next = current.includes(val)
        ? current.filter((a) => a !== val)
        : [...current, val];
      return {
        ...prev,
        area: next.length === 0
          ? undefined
          : next.length === 1
            ? next[0]
            : next,
      };
    });
  };

  const toggleStatus = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status === val ? undefined : (val as PropertyFilters["status"]),
    }));
  };

  const hasActiveFilters =
    filters.purpose ||
    filters.propertyType ||
    filters.bedrooms !== undefined ||
    filters.area ||
    filters.status ||
    filters.minPrice ||
    filters.maxPrice;

  const selectedPurposes = filters.purpose ? [filters.purpose] : [];
  const selectedTypes = Array.isArray(filters.propertyType)
    ? (filters.propertyType as string[])
    : filters.propertyType
      ? [filters.propertyType]
      : [];
  const selectedBeds = Array.isArray(filters.bedrooms)
    ? filters.bedrooms.map(String)
    : filters.bedrooms !== undefined
      ? [String(filters.bedrooms)]
      : [];
  const selectedAreas = Array.isArray(filters.area)
    ? filters.area
    : filters.area
      ? [filters.area]
      : [];
  const selectedStatuses = filters.status ? [filters.status] : [];

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Mobile header */}
      {isMobile && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display text-xl text-text">Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Purpose */}
        <FilterSection title="Purpose">
          <PillGroup
            options={filterOptions.purposes}
            selected={selectedPurposes}
            onToggle={togglePurpose}
            ariaLabel="Filter by purpose"
          />
        </FilterSection>

        {/* Property type */}
        <FilterSection title="Property Type">
          <PillGroup
            options={filterOptions.propertyTypes}
            selected={selectedTypes}
            onToggle={togglePropertyType}
            ariaLabel="Filter by property type"
          />
        </FilterSection>

        {/* Bedrooms */}
        <FilterSection title="Bedrooms">
          <PillGroup
            options={filterOptions.bedrooms}
            selected={selectedBeds}
            onToggle={toggleBedroom}
            ariaLabel="Filter by bedrooms"
          />
        </FilterSection>

        {/* Price range */}
        <FilterSection title="Price Range">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border bg-surface-elevated rounded-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary"
              aria-label="Minimum price"
            />
            <span className="py-2 text-text-muted text-sm">–</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                }))
              }
              className="w-full px-3 py-2 text-sm border border-border bg-surface-elevated rounded-sm text-text placeholder:text-text-muted focus:outline-none focus:border-primary"
              aria-label="Maximum price"
            />
          </div>
        </FilterSection>

        {/* Area */}
        <FilterSection title="Area" defaultOpen={false}>
          <PillGroup
            options={filterOptions.areas}
            selected={selectedAreas}
            onToggle={toggleArea}
            ariaLabel="Filter by area"
          />
        </FilterSection>

        {/* Status */}
        <FilterSection title="Status" defaultOpen={false}>
          <PillGroup
            options={filterOptions.statuses}
            selected={selectedStatuses}
            onToggle={toggleStatus}
            ariaLabel="Filter by status"
          />
        </FilterSection>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-border flex gap-3">
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="flex-1">
            Clear All
          </Button>
        )}
        <Button variant="primary" size="sm" onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
