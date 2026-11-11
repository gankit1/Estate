import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  getMockProjects,
  getProjectBySlug,
  mockOffPlanProjects,
} from "@/lib/data/mock-projects";
import { ProjectCard } from "@/components/project/ProjectCard";
import { PaymentPlanCalculator } from "@/components/project/PaymentPlanCalculator";

describe("New Projects Static Backend Data", () => {
  it("should have at least 10 rich off-plan developments", () => {
    expect(mockOffPlanProjects.length).toBeGreaterThanOrEqual(10);
  });

  it("should return all projects when no criteria is specified", () => {
    const all = getMockProjects();
    expect(all.length).toBe(mockOffPlanProjects.length);
  });

  it("should filter projects by developer", () => {
    const emaarProjects = getMockProjects({ developer: "emaar-properties" });
    expect(emaarProjects.length).toBeGreaterThan(0);
    emaarProjects.forEach((p) => {
      expect(
        p.developer?.slug === "emaar-properties" ||
        p.developerRef === "dev-emaar"
      ).toBe(true);
    });
  });

  it("should filter projects by status", () => {
    const underConstruction = getMockProjects({ status: "under-construction" });
    expect(underConstruction.length).toBeGreaterThan(0);
    underConstruction.forEach((p) => {
      expect(p.status).toBe("under-construction");
    });
  });

  it("should filter projects by search keyword", () => {
    const creekResults = getMockProjects({ q: "Creek" });
    expect(creekResults.length).toBeGreaterThan(0);
    creekResults.forEach((p) => {
      const match =
        p.name.toLowerCase().includes("creek") ||
        p.location.area.toLowerCase().includes("creek") ||
        p.location.community.toLowerCase().includes("creek");
      expect(match).toBe(true);
    });
  });

  it("should filter projects by post-handover availability", () => {
    const postHandover = getMockProjects({ hasPostHandover: true });
    expect(postHandover.length).toBeGreaterThan(0);
    postHandover.forEach((p) => {
      expect((p.paymentPlan?.postHandover ?? 0) > 0).toBe(true);
    });
  });

  it("should sort projects by price ascending", () => {
    const sorted = getMockProjects({ sort: "price-asc" });
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].startingPrice).toBeLessThanOrEqual(sorted[i + 1].startingPrice);
    }
  });

  it("should sort projects by price descending", () => {
    const sorted = getMockProjects({ sort: "price-desc" });
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].startingPrice).toBeGreaterThanOrEqual(sorted[i + 1].startingPrice);
    }
  });

  it("should find a project by slug", () => {
    const project = getProjectBySlug("emaar-harbour-views");
    expect(project).toBeDefined();
    expect(project?.name).toContain("Harbour Views");
    expect(project?.developer?.name).toBe("Emaar Properties");
  });
});

describe("Project UI Components", () => {
  it("renders ProjectCard in grid mode with price and title", () => {
    const project = mockOffPlanProjects[0];
    render(<ProjectCard project={project} />);

    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(project.developer?.name ?? "")).toBeInTheDocument();
  });

  it("renders ProjectCard in list mode with details", () => {
    const project = mockOffPlanProjects[0];
    render(<ProjectCard project={project} viewMode="list" />);

    expect(screen.getByText(project.name)).toBeInTheDocument();
    expect(screen.getByText(/Handover:/i)).toBeInTheDocument();
  });

  it("renders PaymentPlanCalculator and updates value", () => {
    render(<PaymentPlanCalculator />);

    expect(screen.getByText(/Calculate Your Payment Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Golden Visa Eligible/i)).toBeInTheDocument();

    // Click quick budget
    const quickBtn = screen.getByText("AED 1.2M");
    fireEvent.click(quickBtn);

    expect(screen.getByText(/Visa Threshold: AED 2.0M/i)).toBeInTheDocument();
  });
});

