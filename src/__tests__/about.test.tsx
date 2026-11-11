import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  mockTeamMembers,
  mockMilestones,
  mockAwards,
  mockOffices,
} from "@/lib/data/mock-about";
import { AboutStats } from "@/components/about/AboutStats";
import { OurStorySection } from "@/components/about/OurStorySection";
import { ExecutiveTeamGrid } from "@/components/about/ExecutiveTeamGrid";
import { TimelineMilestones } from "@/components/about/TimelineMilestones";
import { AwardsCertifications } from "@/components/about/AwardsCertifications";
import { OfficesShowcase } from "@/components/about/OfficesShowcase";
import { ContactAppointmentModal } from "@/components/about/ContactAppointmentModal";

describe("About Mock Data Integrity", () => {
  it("contains curated leadership team with RERA credentials", () => {
    expect(mockTeamMembers.length).toBeGreaterThanOrEqual(5);
    expect(mockTeamMembers.every((m) => m.name && m.role && m.reraNumber)).toBe(true);
    expect(mockTeamMembers.some((m) => m.name === "Tariq Al-Mansoor")).toBe(true);
  });

  it("contains chronological company milestones", () => {
    expect(mockMilestones.length).toBeGreaterThanOrEqual(5);
    expect(mockMilestones[0].year).toBe("2012");
  });

  it("contains verified master developer awards and accreditations", () => {
    expect(mockAwards.length).toBeGreaterThanOrEqual(4);
    expect(mockAwards.some((a) => a.issuer.includes("Emaar"))).toBe(true);
    expect(mockAwards.some((a) => a.issuer.includes("RERA") || a.issuer.includes("Dubai Land Department"))).toBe(true);
  });

  it("contains physical office locations in Downtown and Marina", () => {
    expect(mockOffices.length).toBe(2);
    expect(mockOffices.some((o) => o.district === "Downtown Dubai")).toBe(true);
    expect(mockOffices.some((o) => o.district === "Dubai Marina")).toBe(true);
  });
});

describe("About UI Components", () => {
  it("renders AboutStats with key volume and track record metrics", () => {
    render(<AboutStats />);
    expect(screen.getByText("AED 8.4B+")).toBeInTheDocument();
    expect(screen.getByText("14+ Years")).toBeInTheDocument();
    expect(screen.getByText("98.2%")).toBeInTheDocument();
    expect(screen.getByText("65+ Nationalities")).toBeInTheDocument();
  });

  it("renders OurStorySection with narrative and company pillars", () => {
    render(<OurStorySection />);
    expect(screen.getByText(/Redefining Dubai Property Advisory with Institutional Integrity/i)).toBeInTheDocument();
    expect(screen.getByText("The Four Pillars of Pacific Star Realty")).toBeInTheDocument();
    expect(screen.getByText("Uncompromising Fiduciary Duty")).toBeInTheDocument();
    expect(screen.getByText("Data-Driven Market Intelligence")).toBeInTheDocument();
  });

  it("renders ExecutiveTeamGrid and filters by department", () => {
    render(<ExecutiveTeamGrid />);
    expect(screen.getByText("Meet Our Senior Directors & Partners")).toBeInTheDocument();
    expect(screen.getByText("Tariq Al-Mansoor")).toBeInTheDocument();

    // Click Private Clients filter tab
    const privateClientsTab = screen.getByRole("button", { name: /Private Clients/i });
    fireEvent.click(privateClientsTab);

    // Elena Rostova should be present
    expect(screen.getByText("Elena Rostova")).toBeInTheDocument();
  });

  it("renders TimelineMilestones and allows selecting years", () => {
    render(<TimelineMilestones />);
    expect(screen.getByText(/14\+ Years of Continuous Execution in Dubai/i)).toBeInTheDocument();
    expect(screen.getByText("Inception in Downtown Dubai")).toBeInTheDocument();

    // Select 2012 tab
    const y2012Btn = screen.getByRole("button", { name: "2012" });
    fireEvent.click(y2012Btn);
  });

  it("renders AwardsCertifications with official developer accolades", () => {
    render(<AwardsCertifications />);
    expect(screen.getByText(/Institutional Awards & Master Developer Alliances/i)).toBeInTheDocument();
    expect(screen.getByText("Top Performing Brokerage Award")).toBeInTheDocument();
    expect(screen.getByText("Excellence in Regulatory Compliance")).toBeInTheDocument();
  });

  it("renders OfficesShowcase and triggers appointment modal callback", () => {
    const handleBook = vi.fn();
    render(<OfficesShowcase onBookAppointment={handleBook} />);

    expect(screen.getByText("Flagship Offices & Private Client Lounges")).toBeInTheDocument();
    expect(screen.getByText("Downtown Dubai Headquarters")).toBeInTheDocument();
    expect(screen.getByText("Dubai Marina Private Client Lounge")).toBeInTheDocument();

    const bookBtns = screen.getAllByRole("button", { name: /Schedule In-Person Meeting|Book Appointment/i });
    fireEvent.click(bookBtns[0]);
    expect(handleBook).toHaveBeenCalled();
  });

  it("renders ContactAppointmentModal and handles client booking submission", () => {
    const handleClose = vi.fn();
    render(<ContactAppointmentModal isOpen={true} onClose={handleClose} defaultOfficeId="office-downtown" />);

    expect(screen.getByText(/Schedule a Consultation with a Director/i)).toBeInTheDocument();

    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/Elena Rostova/i), {
      target: { value: "Lady Katherine" },
    });
    fireEvent.change(screen.getByPlaceholderText(/name@company.com/i), {
      target: { value: "katherine@familyoffice.co.uk" },
    });
    fireEvent.change(screen.getByPlaceholderText(/\+971 50 123 4567/i), {
      target: { value: "+44 20 7946 0958" },
    });

    // Submit form
    const submitBtn = screen.getByRole("button", { name: /Confirm Private Appointment Request/i });
    fireEvent.click(submitBtn);

    // Verify confirmation view
    expect(screen.getByText("Appointment Requested")).toBeInTheDocument();
    expect(screen.getByText(/Lady Katherine/i)).toBeInTheDocument();

    // Click close
    const closeBtn = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});

