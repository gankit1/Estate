import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  mockDepartments,
  mockDetailedOffices,
  mockContactFaqs,
} from "@/lib/data/mock-contact";
import { ContactHeroStats } from "@/components/contact/ContactHeroStats";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { OfficesLocationGuide } from "@/components/contact/OfficesLocationGuide";
import { DepartmentDirectory } from "@/components/contact/DepartmentDirectory";
import { VipChauffeurServiceCard } from "@/components/contact/VipChauffeurServiceCard";
import { ContactFaqAccordion } from "@/components/contact/ContactFaqAccordion";

describe("Contact Mock Data Integrity", () => {
  it("contains specialized divisional departments with direct contacts", () => {
    expect(mockDepartments.length).toBe(4);
    expect(mockDepartments.some((d) => d.id === "dept-private-clients")).toBe(true);
    expect(mockDepartments.some((d) => d.id === "dept-golden-visa")).toBe(true);
    expect(mockDepartments.every((d) => d.email && d.phone && d.leadName)).toBe(true);
  });

  it("contains detailed physical office guides for Downtown and Marina", () => {
    expect(mockDetailedOffices.length).toBe(2);
    expect(mockDetailedOffices.some((o) => o.district === "Downtown Dubai")).toBe(true);
    expect(mockDetailedOffices.some((o) => o.district === "Dubai Marina")).toBe(true);
    expect(mockDetailedOffices.every((o) => o.parking && o.metroTransit)).toBe(true);
  });

  it("contains practical contact FAQs", () => {
    expect(mockContactFaqs.length).toBeGreaterThanOrEqual(4);
  });
});

describe("Contact UI Components", () => {
  it("renders ContactHeroStats with rapid response indicators", () => {
    render(<ContactHeroStats />);
    expect(screen.getByText("< 15 Minutes")).toBeInTheDocument();
    expect(screen.getByText("24/7 Concierge")).toBeInTheDocument();
    expect(screen.getByText("2 Flagship Offices")).toBeInTheDocument();
    expect(screen.getByText("RERA ORN 12480")).toBeInTheDocument();
  });

  it("renders ContactFormSection, changes categories, and handles form submission", () => {
    render(<ContactFormSection />);
    expect(screen.getByText("Submit a Private Inquiry")).toBeInTheDocument();
    expect(screen.getByText("Property Acquisition")).toBeInTheDocument();

    // Select category tab
    const goldenVisaTab = screen.getByRole("button", { name: /Investment & Golden Visa/i });
    fireEvent.click(goldenVisaTab);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/Full Legal Name/i), {
      target: { value: "Lord Sterling" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "sterling@capital.ae" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Phone \/ WhatsApp/i), {
      target: { value: "+971 50 999 8888" },
    });

    // Select WhatsApp as preferred method
    const waBtn = screen.getByRole("button", { name: "WhatsApp" });
    fireEvent.click(waBtn);

    // Submit inquiry
    const submitBtn = screen.getByRole("button", { name: /Dispatch Private Client Inquiry/i });
    fireEvent.click(submitBtn);

    // Verify confirmation view
    expect(screen.getByText("Inquiry Dispatched Successfully")).toBeInTheDocument();
    expect(screen.getByText(/Lord Sterling/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open Fast-Track WhatsApp/i })).toBeInTheDocument();
  });

  it("renders OfficesLocationGuide with detailed directions and transit", () => {
    render(<OfficesLocationGuide />);
    expect(screen.getByText("Visiting Our Dubai Offices")).toBeInTheDocument();
    expect(screen.getByText("Downtown Dubai Headquarters")).toBeInTheDocument();
    expect(screen.getByText("Dubai Marina Waterfront Lounge")).toBeInTheDocument();
    expect(screen.getAllByText(/Valet & Parking:/i).length).toBe(2);
    expect(screen.getAllByText(/Metro Transit:/i).length).toBe(2);
  });

  it("renders DepartmentDirectory with direct lines to leads", () => {
    render(<DepartmentDirectory />);
    expect(screen.getByText("Direct Divisional Contacts")).toBeInTheDocument();
    expect(screen.getByText(/Private Client Advisory \(UHNW\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Elena Rostova/i)).toBeInTheDocument();
    expect(screen.getByText(/UAE 06-Year Golden Visa Concierge/i)).toBeInTheDocument();
  });

  it("renders VipChauffeurServiceCard with airport reception details", () => {
    render(<VipChauffeurServiceCard />);
    expect(screen.getByText(/VIP Airport Reception & Chauffeured Property Tours/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Request Chauffeur Tour/i })).toBeInTheDocument();
  });

  it("renders ContactFaqAccordion and toggles accordion items", () => {
    render(<ContactFaqAccordion />);
    expect(screen.getByText("Frequently Asked Contact Inquiries")).toBeInTheDocument();

    const firstQuestion = mockContactFaqs[0].question;
    expect(screen.getByText(firstQuestion)).toBeInTheDocument();

    const btn = screen.getByText(firstQuestion);
    fireEvent.click(btn);
  });
});

