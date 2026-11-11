"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/PropertyCard";
import { FilterPanel } from "@/components/property/FilterPanel";
import { Button } from "@/components/ui/Button/Button";
import {
  getProperties,
  getMockProperties,
  sortOptions,
} from "@/lib/api/propertyService";
import { parseSearchParams, buildSearchParams } from "@/lib/utils/search";
import { useRouter, usePathname } from "next/navigation";
import { CustomSelect } from "@/components/ui/Select";
import type { Property, Pagination, PropertyFilters } from "@/types";

/* ── Sort select ────────────────────────────────────────────── */
function SortSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-muted whitespace-nowrap font-medium hidden sm:inline">
        Sort by
      </span>
      <div className="w-[180px] sm:w-[190px]">
        <CustomSelect
          id="sort-select"
          size="sm"
          value={value}
          onChange={onChange}
          options={sortOptions}
          align="right"
          aria-label="Sort properties"
          buttonClassName="bg-white border-sand-200 h-9 rounded-lg text-xs"
        />
      </div>
    </div>
  );
}

/* ── Pagination ─────────────────────────────────────────────── */
function PaginationBar({
  pagination,
  onPageChange,
}: {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}) {
  if (pagination.totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  const { page, totalPages } = pagination;

  // Build visible page numbers
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 text-sm text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ← Prev
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-text-muted">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "w-9 h-9 text-sm rounded-sm transition-colors",
              p === page
                ? "bg-primary text-text-inverse"
                : "text-text-secondary hover:bg-sand-50"
            )}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 text-sm text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}

/* ── Map Placeholder ────────────────────────────────────────── */
function MapPlaceholder() {
  return (
    <div className="sticky top-28 h-[calc(100vh-8rem)] bg-sand-50 border border-border rounded-sm flex items-center justify-center">
      <div className="text-center px-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-sand-300 mb-3"
          aria-hidden
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className="text-sm text-text-muted font-medium">Map View</p>
        <p className="text-xs text-sand-400 mt-1">
          Interactive map will be available in a future update
        </p>
      </div>
    </div>
  );
}

/* ── Empty state ────────────────────────────────────────────── */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-sand-300 mb-4"
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <h3 className="font-display text-xl text-text mb-2">No Properties Found</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">
        We couldn&apos;t find any properties matching your criteria. Try adjusting your filters or search.
      </p>
      <Button variant="outline" size="sm" onClick={onClear}>
        Clear All Filters
      </Button>
    </div>
  );
}

/* ── Error state ────────────────────────────────────────────── */
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-error" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-display text-xl text-text mb-2">Something Went Wrong</h3>
      <p className="text-sm text-text-muted max-w-sm mb-6">
        We couldn&apos;t load properties at this time. Please try again.
      </p>
      <Button variant="primary" size="sm" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

/* ── Main content ───────────────────────────────────────────── */
export function PropertyListingContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [properties, setProperties] = React.useState<Property[]>([]);
  const [pagination, setPagination] = React.useState<Pagination>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);

  const searchParamsString = searchParams.toString();
  const filters = React.useMemo(
    () => parseSearchParams(new URLSearchParams(searchParamsString)),
    [searchParamsString]
  );

  const lastFetchedParamsRef = React.useRef<string | null>(null);

  const fetchProperties = React.useCallback(async (paramsString: string) => {
    setLoading(true);
    setError(false);
    try {
      const currentFilters = parseSearchParams(new URLSearchParams(paramsString));
      const res = await getProperties({ ...currentFilters, limit: 12 });
      if (res.success && res.data) {
        setProperties(res.data.items);
        setPagination(res.data.pagination);
      } else {
        // Direct client-side failover to local mock data generator
        const fallbackRes = getMockProperties({ ...currentFilters, limit: 12 });
        if (fallbackRes.success && fallbackRes.data) {
          setProperties(fallbackRes.data.items);
          setPagination(fallbackRes.data.pagination);
        } else {
          setError(true);
        }
      }
    } catch {
      try {
        const currentFilters = parseSearchParams(new URLSearchParams(paramsString));
        const fallbackRes = getMockProperties({ ...currentFilters, limit: 12 });
        if (fallbackRes.success && fallbackRes.data) {
          setProperties(fallbackRes.data.items);
          setPagination(fallbackRes.data.pagination);
          return;
        }
      } catch {
        // ignore
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (lastFetchedParamsRef.current === searchParamsString) {
      return;
    }
    lastFetchedParamsRef.current = searchParamsString;
    fetchProperties(searchParamsString);
  }, [searchParamsString, fetchProperties]);

  const handleRetry = React.useCallback(() => {
    lastFetchedParamsRef.current = null;
    fetchProperties(searchParamsString);
  }, [fetchProperties, searchParamsString]);

  const handleSortChange = (sort: string) => {
    const newFilters: PropertyFilters = { ...filters, sort, page: 1 };
    const qs = buildSearchParams(newFilters);
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const newFilters: PropertyFilters = { ...filters, page };
    const qs = buildSearchParams(newFilters);
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // Count active filters
  const activeFilterCount = [
    filters.purpose,
    filters.propertyType,
    filters.bedrooms !== undefined,
    filters.area,
    filters.minPrice,
    filters.maxPrice,
    filters.status,
  ].filter(Boolean).length;

  return (
    <div className="flex gap-8">
      {/* Desktop filter sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-28">
          <FilterPanel />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(true)}
              className="lg:hidden gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="14" y2="12" />
                <line x1="4" y1="18" x2="10" y2="18" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-text-inverse text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            {/* Results count */}
            {!loading && (
              <p className="text-sm text-text-muted">
                <span className="font-medium text-text">{pagination.total}</span>{" "}
                {pagination.total === 1 ? "property" : "properties"} found
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <SortSelect
              value={filters.sort ?? "newest"}
              onChange={handleSortChange}
            />

            {/* Map toggle (mobile + tablet) */}
            <Button
              variant={showMap ? "primary" : "ghost"}
              size="sm"
              onClick={() => setShowMap(!showMap)}
              className="xl:hidden"
              aria-label={showMap ? "Show list" : "Show map"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile map */}
        {showMap && (
          <div className="xl:hidden mb-6 h-64 sm:h-80">
            <MapPlaceholder />
          </div>
        )}

        <div className="flex gap-6">
          {/* Property grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <ErrorState onRetry={handleRetry} />
            ) : properties.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property, i) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      priority={i < 3}
                    />
                  ))}
                </div>

                <PaginationBar
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>

          {/* Desktop map */}
          {showMap && (
            <div className="hidden xl:block w-96 flex-shrink-0">
              <MapPlaceholder />
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-modal lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-surface-elevated shadow-xl flex flex-col">
            <FilterPanel
              isMobile
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
