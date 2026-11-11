/**
 * Format a price value with currency and locale formatting.
 */
export function formatPrice(
  amount: number,
  currency: "AED" | "USD" = "AED",
  options?: { compact?: boolean; hideDecimal?: boolean }
): string {
  const { compact = false, hideDecimal = true } = options ?? {};

  if (compact) {
    if (amount >= 1_000_000) {
      const val = amount / 1_000_000;
      const formatted =
        val % 1 === 0 ? val.toString() : val.toFixed(1).replace(/\.0$/, "");
      return `${currency} ${formatted}M`;
    }
    if (amount >= 1_000) {
      const val = amount / 1_000;
      const formatted =
        val % 1 === 0 ? val.toString() : val.toFixed(1).replace(/\.0$/, "");
      return `${currency} ${formatted}K`;
    }
  }

  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency,
    minimumFractionDigits: hideDecimal ? 0 : 2,
    maximumFractionDigits: hideDecimal ? 0 : 2,
  }).format(amount);
}

/**
 * Format an area value in sqft (with optional sqm conversion).
 */
export function formatArea(
  sqft: number,
  unit: "sqft" | "sqm" = "sqft"
): string {
  if (unit === "sqm") {
    const sqm = sqft * 0.092903;
    return `${new Intl.NumberFormat("en-AE").format(Math.round(sqm))} sqm`;
  }
  return `${new Intl.NumberFormat("en-AE").format(Math.round(sqft))} sqft`;
}

/**
 * Format a number with locale-aware separators.
 */
export function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-AE", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(
  dateStr: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-AE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(date);
}

/**
 * Format a date to a relative time string (e.g. "3 days ago").
 */
export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return formatDate(dateStr, { year: "numeric", month: "short" });
}

/**
 * Format a handover date to a quarter/year string.
 * e.g. "2026-03-01" → "Q1 2026"
 */
export function formatHandoverDate(dateStr: string): string {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1; // 1–12
  const year = date.getFullYear();
  const quarter =
    month <= 3 ? "Q1" : month <= 6 ? "Q2" : month <= 9 ? "Q3" : "Q4";
  return `${quarter} ${year}`;
}

/**
 * Format bedrooms count to a display string.
 */
export function formatBedrooms(count: number): string {
  if (count === 0) return "Studio";
  if (count === 1) return "1 Bedroom";
  return `${count} Bedrooms`;
}

/**
 * Compute estimated read time for a body of text.
 */
export function estimateReadTime(text: string, wpm = 200): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}
