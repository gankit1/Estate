import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DevelopersContent } from "@/app/(marketing)/developers/DevelopersContent";
import { DEVELOPERS_DATA } from "@/lib/data/developers-data";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/developers",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Developers Directory Page", () => {
  it("renders page title, institutional guarantees bar, and developer cards", () => {
    render(<DevelopersContent />);

    // Header title & badge
    expect(
      screen.getByText(/Dubai Master Developers Directory & Agency Registry/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Authorized Master Developer Agency Partner/i)
    ).toBeInTheDocument();

    // Guarantees bar
    expect(screen.getAllByText(/0% Buyer Commission/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RERA Trust Accounts/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/First-Tier Floor Plans/i).length).toBeGreaterThan(0);

    // Developer cards
    expect(screen.getAllByText("Emaar Properties").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Nakheel").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Omniyat").length).toBeGreaterThan(0);
  });

  it("filters developers when clicking on tier filter tabs", () => {
    render(<DevelopersContent />);

    // Click on "Master Waterfront Developer" tier tab
    const waterfrontTab = screen.getByRole("button", {
      name: /Master Waterfront Developer/i,
    });
    fireEvent.click(waterfrontTab);

    // Nakheel should be visible
    expect(screen.getAllByText("Nakheel").length).toBeGreaterThan(0);
  });

  it("filters developers in real-time by search query", () => {
    render(<DevelopersContent />);

    const searchInput = screen.getByPlaceholderText(
      /Search developer, area \(e.g\. Palm, Hills\)\.\.\./i
    );
    fireEvent.change(searchInput, { target: { value: "Sobha" } });

    expect(screen.getAllByText("Sobha Realty").length).toBeGreaterThan(0);
  });

  it("shows empty state when search produces no results and resets cleanly", () => {
    render(<DevelopersContent />);

    const searchInput = screen.getByPlaceholderText(
      /Search developer, area \(e.g\. Palm, Hills\)\.\.\./i
    );
    fireEvent.change(searchInput, { target: { value: "UnknownDeveloperXYZ" } });

    expect(screen.getByText(/No developers found/i)).toBeInTheDocument();

    const resetButton = screen.getByRole("button", { name: /Reset Filters/i });
    fireEvent.click(resetButton);

    expect(screen.getAllByText("Emaar Properties").length).toBeGreaterThan(0);
  });

  it("opens and closes Developer Dossier modal", () => {
    render(<DevelopersContent />);

    // Click on the first "Dossier" button
    const dossierButtons = screen.getAllByRole("button", { name: /Dossier/i });
    fireEvent.click(dossierButtons[0]);

    // Modal should show developer details
    expect(screen.getByText(/Signature Completed & Active Developments:/i)).toBeInTheDocument();
    expect(screen.getByText(/RERA Escrow Trustee:/i)).toBeInTheDocument();

    // Close modal
    const closeButton = screen.getByRole("button", { name: /Close/i });
    fireEvent.click(closeButton);

    expect(
      screen.queryByText(/Signature Completed & Active Developments:/i)
    ).not.toBeInTheDocument();
  });

  it("submits the VIP Developer Pre-Launch Registration form and displays confirmation", () => {
    render(<DevelopersContent />);

    const nameInput = screen.getByPlaceholderText(/Alexander Hamilton/i);
    const emailInput = screen.getByPlaceholderText(/alex@familyoffice\.com/i);

    fireEvent.change(nameInput, { target: { value: "Lord Sterling" } });
    fireEvent.change(emailInput, { target: { value: "sterling@mayfair.com" } });

    const submitBtn = screen.getByRole("button", {
      name: /Request Pre-Launch VIP Reservation Token/i,
    });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/VIP Allocation Token Registered/i)).toBeInTheDocument();
    expect(screen.getByText(/Lord Sterling/i)).toBeInTheDocument();
  });

  it("renders the comparative matrix table with delivered units and ratings", () => {
    render(<DevelopersContent />);

    expect(
      screen.getByText(/Dubai Master Developer Comparative Matrix/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Signature Specialization")).toBeInTheDocument();
    expect(screen.getByText("Handover Score")).toBeInTheDocument();
  });
});
