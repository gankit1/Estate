import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  mockDubaiAreas,
  getMockAreas,
  getAreaBySlug,
  compareAreas,
  getDistinctLifestyleCategories,
} from "@/lib/data/mock-areas";
import { AreaCard } from "@/components/area/AreaCard";
import { AreaCompareModal } from "@/components/area/AreaCompareModal";
import { AreaLifestyleQuiz } from "@/components/area/AreaLifestyleQuiz";

describe("Mock Areas Data Engine", () => {
  it("contains 12 curated Dubai master areas", () => {
    expect(mockDubaiAreas.length).toBe(12);
  });

  it("filters areas by lifestyle category", () => {
    const waterfront = getMockAreas({ lifestyle: "waterfront" });
    expect(waterfront.length).toBeGreaterThan(0);
    expect(waterfront.every((a) => a.lifestyleCategory === "waterfront")).toBe(true);

    const downtown = getMockAreas({ lifestyle: "downtown" });
    expect(downtown.length).toBeGreaterThan(0);
    expect(downtown.every((a) => a.lifestyleCategory === "downtown")).toBe(true);
  });

  it("searches areas by keyword", () => {
    const marinaResults = getMockAreas({ q: "Marina" });
    expect(marinaResults.some((a) => a.slug === "dubai-marina")).toBe(true);

    const creekResults = getMockAreas({ q: "Flamingo" }); // in nearby landmarks or overview
    expect(creekResults.some((a) => a.slug === "dubai-creek-harbour")).toBe(true);
  });

  it("filters areas by metro connectivity", () => {
    const metroAreas = getMockAreas({ metroOnly: true });
    expect(metroAreas.length).toBeGreaterThan(0);
    expect(metroAreas.every((a) => a.transportation?.metro === true)).toBe(true);
  });

  it("sorts areas by rental yield descending", () => {
    const sorted = getMockAreas({ sort: "yield-desc" });
    for (let i = 0; i < sorted.length - 1; i++) {
      expect((sorted[i].avgRentalYield ?? 0) >= (sorted[i + 1].avgRentalYield ?? 0)).toBe(true);
    }
  });

  it("sorts areas by price per sqft ascending", () => {
    const sorted = getMockAreas({ sort: "price-asc" });
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(
        (sorted[i].avgSalePricePerSqft ?? 0) <= (sorted[i + 1].avgSalePricePerSqft ?? 0)
      ).toBe(true);
    }
  });

  it("resolves area by slug accurately", () => {
    const marina = getAreaBySlug("dubai-marina");
    expect(marina).toBeDefined();
    expect(marina?.name).toBe("Dubai Marina");

    const nonExistent = getAreaBySlug("invalid-district");
    expect(nonExistent).toBeUndefined();
  });

  it("returns distinct lifestyle categories with correct counts", () => {
    const categories = getDistinctLifestyleCategories();
    expect(categories.length).toBeGreaterThanOrEqual(6);

    const allCat = categories.find((c) => c.id === "all");
    expect(allCat?.count).toBe(12);
  });

  it("compares multiple areas by slugs", () => {
    const selected = compareAreas(["dubai-marina", "palm-jumeirah"]);
    expect(selected.length).toBe(2);
    expect(selected.map((a) => a.slug)).toContain("dubai-marina");
    expect(selected.map((a) => a.slug)).toContain("palm-jumeirah");
  });
});

describe("Area UI Components", () => {
  const sampleArea = mockDubaiAreas[0]; // Dubai Marina

  it("renders AreaCard in grid mode with title, price/sqft, and yield", () => {
    render(<AreaCard area={sampleArea} />);
    expect(screen.getByText("Dubai Marina")).toBeInTheDocument();
    expect(screen.getByText(/1,800/)).toBeInTheDocument();
    expect(screen.getByText(/6.8% ROI/)).toBeInTheDocument();
    expect(screen.getByText("Explore Guide")).toBeInTheDocument();
  });

  it("triggers onToggleCompare callback when compare button is clicked", () => {
    const handleToggle = vi.fn();
    render(<AreaCard area={sampleArea} onToggleCompare={handleToggle} />);
    const compareBtn = screen.getByRole("button", { name: /compare/i });
    fireEvent.click(compareBtn);
    expect(handleToggle).toHaveBeenCalledWith(sampleArea);
  });

  it("renders AreaCard in list mode with full metrics", () => {
    render(<AreaCard area={sampleArea} viewMode="list" />);
    expect(screen.getByText("Dubai Marina")).toBeInTheDocument();
    expect(screen.getByText("Explore District Guide")).toBeInTheDocument();
    expect(screen.getByText("100% Freehold")).toBeInTheDocument();
  });

  it("renders AreaCompareModal with side-by-side comparison data", () => {
    const handleClose = vi.fn();
    const handleRemove = vi.fn();
    const handleClear = vi.fn();

    render(
      <AreaCompareModal
        areas={[mockDubaiAreas[0], mockDubaiAreas[1]]}
        isOpen={true}
        onClose={handleClose}
        onRemoveArea={handleRemove}
        onClearAll={handleClear}
      />
    );

    expect(screen.getByText(/District Comparison Matrix/i)).toBeInTheDocument();
    expect(screen.getByText("Dubai Marina")).toBeInTheDocument();
    expect(screen.getByText("Downtown Dubai")).toBeInTheDocument();
    expect(screen.getByText("Gross Rental Yield")).toBeInTheDocument();
  });

  it("renders AreaLifestyleQuiz with options, recommendation image and fit badge", () => {
    render(<AreaLifestyleQuiz />);
    expect(screen.getByText(/Find Your Ideal Dubai Neighborhood/i)).toBeInTheDocument();
    expect(screen.getByText("Max Rental Yield (Cashflow)")).toBeInTheDocument();
    expect(screen.getByText(/Your Recommended District Match/i)).toBeInTheDocument();

    // Verify fit badge text exists and doesn't break
    const fitBadge = screen.getByText(/% Fit$/i);
    expect(fitBadge).toBeInTheDocument();
    expect(fitBadge.className).toContain("whitespace-nowrap");

    // Verify match preview image is rendered
    const previewImg = screen.getByRole("img", { name: /Jumeirah Village Circle|Dubai Hills Estate|Dubai Marina|Downtown/i });
    expect(previewImg).toBeInTheDocument();
  });
});

