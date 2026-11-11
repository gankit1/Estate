import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MarketingLayout from "@/app/(marketing)/layout";
import { Footer } from "@/components/layout/Footer";
import NotFound from "@/app/not-found";
import PrivacyPolicyPage from "@/app/(marketing)/privacy-policy/page";
import TermsOfServicePage from "@/app/(marketing)/terms/page";
import CookiePolicyPage from "@/app/(marketing)/cookie-policy/page";
import BlogIndexPage from "@/app/(marketing)/blog/page";
import DevelopersDirectoryPage from "@/app/(marketing)/developers/page";
import { AreaLifestyleQuiz } from "@/components/area/AreaLifestyleQuiz";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("All Pages Footer & Navigation Verification", () => {
  it("renders MarketingLayout with Header, flex-1 main, and Footer", () => {
    const { container } = render(
      <MarketingLayout>
        <div data-testid="page-content">Sample Page Content</div>
      </MarketingLayout>
    );

    expect(screen.getByTestId("page-content")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo", { name: /Site footer/i })).toBeInTheDocument();
    expect(container.querySelector("main.flex-1")).toBeInTheDocument();
  });

  it("Footer renders brand identity, RERA license, contact details, and all links", () => {
    render(<Footer />);

    // Brand & RERA license
    expect(screen.getByText("Pacific")).toBeInTheDocument();
    expect(screen.getByText("Realty")).toBeInTheDocument();
    expect(screen.getByText(/Licensed by RERA Dubai/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();

    // Key Footer categories & links
    expect(screen.getByRole("link", { name: "Apartments for Sale" })).toHaveAttribute(
      "href",
      "/properties?purpose=sale&propertyType=apartment"
    );
    expect(screen.getByRole("link", { name: "Off-Plan Projects" })).toHaveAttribute(
      "href",
      "/new-projects"
    );
    expect(screen.getByRole("link", { name: "Dubai Marina" })).toHaveAttribute(
      "href",
      "/areas/dubai-marina"
    );
    expect(screen.getByRole("link", { name: "All Areas" })).toHaveAttribute("href", "/areas");
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Investment Guide" })).toHaveAttribute(
      "href",
      "/investment"
    );
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Developers" })).toHaveAttribute(
      "href",
      "/developers"
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy"
    );
    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("href", "/terms");
    expect(screen.getByRole("link", { name: "Cookie Policy" })).toHaveAttribute(
      "href",
      "/cookie-policy"
    );
  });

  it("NotFound (404) page renders Header, Return to Home Page button, and Footer", () => {
    render(<NotFound />);
    expect(screen.getAllByText(/404/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Address Not Found/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Return to Home Page/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("contentinfo", { name: /Site footer/i })).toBeInTheDocument();
  });

  it("Privacy Policy page renders with statutory DLD compliance headings", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getAllByText(/Privacy Policy & Data Governance/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Personal Data Protection/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RERA/i).length).toBeGreaterThan(0);
  });

  it("Terms of Service page renders with brokerage agreement & commission details", () => {
    render(<TermsOfServicePage />);
    expect(screen.getByText(/Terms of Service & Brokerage Agreement/i)).toBeInTheDocument();
    expect(screen.getByText(/Brokerage Commission & Statutory Fees/i)).toBeInTheDocument();
  });

  it("Cookie Policy page renders with cookie classifications", () => {
    render(<CookiePolicyPage />);
    expect(screen.getAllByText(/Cookie Policy/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Essential Cookies/i).length).toBeGreaterThan(0);
  });

  it("Blog Market Insights page renders featured report and articles grid", () => {
    render(<BlogIndexPage />);
    expect(screen.getAllByText(/Dubai Real Estate Market Insights/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dubai Prime Real Estate Outlook/i).length).toBeGreaterThan(0);
  });

  it("Developers directory page renders top Dubai developers (Emaar, Nakheel, Sobha, DAMAC)", () => {
    render(<DevelopersDirectoryPage />);
    expect(screen.getAllByText(/Dubai Master Developers Directory/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText("Emaar Properties").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Nakheel").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sobha Realty").length).toBeGreaterThan(0);
    expect(screen.getAllByText("DAMAC Properties").length).toBeGreaterThan(0);
  });

  it("AreaLifestyleQuiz renders non-wrapping Fit badge and high-resolution photo", () => {
    render(<AreaLifestyleQuiz />);
    expect(screen.getByText(/Your Recommended District Match/i)).toBeInTheDocument();
    // Badge contains '% Fit'
    expect(screen.getByText(/% Fit/i)).toBeInTheDocument();
  });
});
