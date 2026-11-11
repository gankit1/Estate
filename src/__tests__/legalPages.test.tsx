import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PrivacyPolicyPage from "@/app/(marketing)/privacy-policy/page";
import TermsOfServicePage from "@/app/(marketing)/terms/page";
import CookiePolicyPage from "@/app/(marketing)/cookie-policy/page";
import { LegalHeaderNav } from "@/components/legal/LegalHeaderNav";
import { CookiePreferencesCenter } from "@/components/legal/CookiePreferencesCenter";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/privacy-policy",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Legal & Compliance Suite", () => {
  describe("LegalHeaderNav", () => {
    it("renders navigation tabs with active state, compliance badges, and action triggers", () => {
      const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});

      render(
        <LegalHeaderNav
          currentPath="/privacy-policy"
          badgeLabel="UAE Federal Decree-Law No. 45 of 2021"
          lastUpdated="November 2026"
        />
      );

      // Links to all 3 legal pages
      expect(screen.getByRole("link", { name: /Privacy Policy/i })).toHaveAttribute(
        "href",
        "/privacy-policy"
      );
      expect(screen.getByRole("link", { name: /Terms of Service/i })).toHaveAttribute(
        "href",
        "/terms"
      );
      expect(screen.getByRole("link", { name: /Cookie Policy/i })).toHaveAttribute(
        "href",
        "/cookie-policy"
      );

      // Badges
      expect(screen.getByText(/RERA Lic\. #12894/i)).toBeInTheDocument();
      expect(screen.getByText(/UAE Federal Decree-Law No\. 45 of 2021/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Updated: November 2026/i)).toBeInTheDocument();

      // Action buttons
      const printBtn = screen.getByRole("button", { name: /Print/i });
      fireEvent.click(printBtn);
      expect(printSpy).toHaveBeenCalled();
      printSpy.mockRestore();
    });
  });

  describe("CookiePreferencesCenter", () => {
    it("renders cookie category toggles, locked essential cookies, and saves preferences", () => {
      render(<CookiePreferencesCenter />);

      // Essential cookies is locked Always Active
      expect(screen.getByText(/Essential Cookies/i)).toBeInTheDocument();
      expect(screen.getByText(/Always Active/i)).toBeInTheDocument();

      // Preference toggles
      expect(screen.getByText(/Preference & Currency/i)).toBeInTheDocument();
      expect(screen.getByText(/Analytics & Performance/i)).toBeInTheDocument();
      expect(screen.getByText(/Tailored Advisory/i)).toBeInTheDocument();

      // Save preferences
      const saveBtn = screen.getByRole("button", { name: /Save & Apply Preferences/i });
      fireEvent.click(saveBtn);

      expect(
        screen.getByText(/Your custom privacy and cookie preferences have been successfully recorded/i)
      ).toBeInTheDocument();
    });
  });

  describe("PrivacyPolicyPage", () => {
    it("renders DPO contacts, PDPL compliance, and client rights", () => {
      render(<PrivacyPolicyPage />);

      expect(screen.getAllByText(/Privacy Policy & Data Governance/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Data Protection Officer \(DPO\) Contact Desk/i)).toBeInTheDocument();
      expect(screen.getByText("legal@pacificstarrealty.com")).toBeInTheDocument();
      expect(screen.getByText("+971 4 500 1234")).toBeInTheDocument();
      expect(screen.getByText(/Right to Erasure/i)).toBeInTheDocument();
    });
  });

  describe("TermsOfServicePage", () => {
    it("renders RERA brokerage mandates, 2% resale vs 0% off-plan commissions, and Law No. 8 escrow", () => {
      render(<TermsOfServicePage />);

      expect(screen.getAllByText(/Terms of Service & Brokerage Agreement/i).length).toBeGreaterThan(0);
      expect(screen.getByText("2.0% Commission")).toBeInTheDocument();
      expect(screen.getByText("0% Buyer Commission")).toBeInTheDocument();
      expect(screen.getByText(/Escrow Account Protections \(Law No\. 8 of 2007\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Dubai International Financial Centre \(DIFC\) Courts/i)).toBeInTheDocument();
    });
  });

  describe("CookiePolicyPage", () => {
    it("renders preference center, technical cookie inventory table, and browser settings", () => {
      render(<CookiePolicyPage />);

      expect(screen.getAllByText(/Cookie Policy & Tracking Preferences/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Inventory of Cookies Deployed on this Platform/i)).toBeInTheDocument();
      expect(screen.getByText("__psr_session")).toBeInTheDocument();
      expect(screen.getByText("__psr_currency")).toBeInTheDocument();
      expect(screen.getByText("Google Chrome")).toBeInTheDocument();
      expect(screen.getByText("Apple Safari")).toBeInTheDocument();
    });
  });
});

