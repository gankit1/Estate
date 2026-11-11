import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  mockInvestmentDistricts,
  mockGlobalCityComparisons,
  mockInvestmentFaqs,
  calculateInvestmentReturns,
  getFilteredInvestmentDistricts,
} from "@/lib/data/mock-investment";
import { InvestmentCalculator } from "@/components/investment/InvestmentCalculator";
import { GlobalComparisonTable } from "@/components/investment/GlobalComparisonTable";
import { GoldenVisaGuide } from "@/components/investment/GoldenVisaGuide";
import { DistrictYieldMatrix } from "@/components/investment/DistrictYieldMatrix";
import { InvestmentFaqAccordion } from "@/components/investment/InvestmentFaqAccordion";
import { InvestmentConsultationModal } from "@/components/investment/InvestmentConsultationModal";

describe("Investment Data Engine & Calculations", () => {
  it("contains curated Dubai investment corridors", () => {
    expect(mockInvestmentDistricts.length).toBeGreaterThanOrEqual(6);
    expect(mockInvestmentDistricts.some((d) => d.slug === "dubai-hills-estate")).toBe(true);
    expect(mockInvestmentDistricts.some((d) => d.slug === "jumeirah-village-circle")).toBe(true);
  });

  it("calculates accurate returns for 2.5M AED cash purchase (Golden Visa eligible)", () => {
    const results = calculateInvestmentReturns({
      purchasePriceAed: 2500000,
      grossYieldRate: 7.0,
      capitalGrowthRate: 10.0,
      holdingYears: 5,
      financingMode: "cash",
    });

    expect(results.purchasePriceAed).toBe(2500000);
    expect(results.dldFeeAed).toBe(100000); // 4% of 2.5M
    expect(results.goldenVisaEligible).toBe(true);
    expect(results.goldenVisaShortfallAed).toBe(0);
    expect(results.annualGrossRentalIncomeAed).toBe(175000); // 7% of 2.5M
    expect(results.totalRoiPercentage).toBeGreaterThan(0);
  });

  it("calculates Golden Visa shortfall for 1.2M AED property", () => {
    const results = calculateInvestmentReturns({
      purchasePriceAed: 1200000,
      grossYieldRate: 8.0,
      capitalGrowthRate: 8.0,
      holdingYears: 3,
      financingMode: "cash",
    });

    expect(results.goldenVisaEligible).toBe(false);
    expect(results.goldenVisaShortfallAed).toBe(800000); // 2.0M - 1.2M = 800K
  });

  it("filters investment districts by minimum yield", () => {
    const highYield = getFilteredInvestmentDistricts({ minYield: 7.0 });
    expect(highYield.length).toBeGreaterThan(0);
    expect(highYield.every((d) => d.grossRentalYield >= 7.0)).toBe(true);
  });

  it("filters investment districts by category", () => {
    const waterfront = getFilteredInvestmentDistricts({ category: "waterfront" });
    expect(waterfront.length).toBeGreaterThan(0);
    expect(waterfront.every((d) => d.category === "waterfront")).toBe(true);
  });

  it("sorts investment districts by yield descending", () => {
    const sorted = getFilteredInvestmentDistricts({ sort: "yield-desc" });
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].grossRentalYield >= sorted[i + 1].grossRentalYield).toBe(true);
    }
  });

  it("benchmarks global cities with Dubai as home city", () => {
    const dubai = mockGlobalCityComparisons.find((c) => c.city === "Dubai");
    expect(dubai).toBeDefined();
    expect(dubai?.capitalGainsTax).toBe("0%");
    expect(dubai?.annualPropertyTax).toBe("0%");
    expect(dubai?.isHomeCity).toBe(true);
  });
});

describe("Investment UI Components", () => {
  it("renders InvestmentCalculator with sliders, presets, and currency switcher", () => {
    const handleConsultation = vi.fn();
    render(<InvestmentCalculator onOpenConsultation={handleConsultation} />);

    expect(screen.getByText(/Dubai Property Investment & Yield Simulator/i)).toBeInTheDocument();
    expect(screen.getByText("2.0M Golden Visa")).toBeInTheDocument();

    // Click USD currency toggle
    const usdBtn = screen.getByRole("button", { name: "USD ($)" });
    fireEvent.click(usdBtn);

    // Click 2.0M Golden Visa preset
    const presetBtn = screen.getByRole("button", { name: "2.0M Golden Visa" });
    fireEvent.click(presetBtn);

    // Check consultation trigger
    const ctaBtn = screen.getByRole("button", { name: /Book Private Portfolio Briefing/i });
    fireEvent.click(ctaBtn);
    expect(handleConsultation).toHaveBeenCalled();
  });

  it("renders GlobalComparisonTable with Dubai and competitor cities", () => {
    render(<GlobalComparisonTable />);
    expect(screen.getByText("Dubai vs. Tier-1 Global Gateway Cities")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getAllByText("Singapore").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/0% Tax-Free/i).length).toBeGreaterThan(0);
  });

  it("renders GoldenVisaGuide with interactive checker and roadmap", () => {
    render(<GoldenVisaGuide />);
    expect(screen.getByText(/UAE 06-Year Golden Visa via Real Estate Investment/i)).toBeInTheDocument();
    expect(screen.getByText("06-Year Renewable Residency")).toBeInTheDocument();

    // Verify qualification checker input
    const input = screen.getByLabelText(/Planned Investment Amount/i);
    expect(input).toBeInTheDocument();

    // Test typing below threshold
    fireEvent.change(input, { target: { value: "1500000" } });
    expect(screen.getByText(/Need \+AED 500,000 more/i)).toBeInTheDocument();

    // Test typing above threshold
    fireEvent.change(input, { target: { value: "3000000" } });
    expect(screen.getByText(/Qualifies for 06-Year Visa/i)).toBeInTheDocument();
  });

  it("renders DistrictYieldMatrix and filters tabs", () => {
    render(<DistrictYieldMatrix />);
    expect(screen.getByText("Prime Dubai Investment Corridors")).toBeInTheDocument();

    // Click high cashflow tab
    const highYieldTab = screen.getByRole("button", { name: /High Cashflow/i });
    fireEvent.click(highYieldTab);

    // Verify JVC is present in high cashflow
    expect(screen.getByText(/Jumeirah Village Circle/i)).toBeInTheDocument();
  });

  it("renders InvestmentFaqAccordion and toggles accordion items", () => {
    render(<InvestmentFaqAccordion />);
    expect(screen.getByText("Frequently Asked Investment Questions")).toBeInTheDocument();

    const firstQuestion = mockInvestmentFaqs[0].question;
    expect(screen.getByText(firstQuestion)).toBeInTheDocument();

    // Find and click on an accordion button
    const btn = screen.getByText(firstQuestion);
    fireEvent.click(btn);
  });

  it("renders InvestmentConsultationModal and handles confidential submission", () => {
    const handleClose = vi.fn();
    render(<InvestmentConsultationModal isOpen={true} onClose={handleClose} />);

    expect(screen.getByText(/Schedule Private Investment Briefing/i)).toBeInTheDocument();

    // Fill inputs
    fireEvent.change(screen.getByPlaceholderText(/Lord Alexander Wright/i), {
      target: { value: "Sir Arthur Conan" },
    });
    fireEvent.change(screen.getByPlaceholderText(/alexander@familyoffice.com/i), {
      target: { value: "arthur@investor.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/\+44 7911 123456/i), {
      target: { value: "+971 50 123 4567" },
    });

    // Submit form
    const submitBtn = screen.getByRole("button", { name: /Confirm Confidential Advisory Request/i });
    fireEvent.click(submitBtn);

    // Check confirmation screen
    expect(screen.getByText("Consultation Scheduled")).toBeInTheDocument();
    expect(screen.getByText(/Sir Arthur Conan/i)).toBeInTheDocument();

    // Click done
    const doneBtn = screen.getByRole("button", { name: "Done" });
    fireEvent.click(doneBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
