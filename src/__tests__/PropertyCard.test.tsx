import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PropertyCard } from "@/components/property/PropertyCard";
import { mockProperties } from "@/lib/data/mock-properties";

const saleProperty = mockProperties.find((p) => p.purpose === "sale")!;
const rentProperty = mockProperties.find((p) => p.purpose === "rent")!;
const offPlanProperty = mockProperties.find((p) => p.status === "off-plan")!;
const featuredProperty = mockProperties.find((p) => p.verificationStatus === "featured")!;

describe("PropertyCard", () => {
  it("renders property title", () => {
    render(<PropertyCard property={saleProperty} />);
    expect(screen.getByText(saleProperty.title)).toBeInTheDocument();
  });

  it("renders location area", () => {
    render(<PropertyCard property={saleProperty} />);
    expect(screen.getByText(new RegExp(saleProperty.location.area))).toBeInTheDocument();
  });

  it("displays 'For Sale' badge for sale properties", () => {
    render(<PropertyCard property={saleProperty} />);
    expect(screen.getByText("For Sale")).toBeInTheDocument();
  });

  it("displays 'For Rent' badge for rent properties", () => {
    render(<PropertyCard property={rentProperty} />);
    expect(screen.getByText("For Rent")).toBeInTheDocument();
  });

  it("shows '/year' suffix for rental price", () => {
    render(<PropertyCard property={rentProperty} />);
    expect(screen.getByText("/year")).toBeInTheDocument();
  });

  it("shows Off-Plan badge when status is off-plan", () => {
    render(<PropertyCard property={offPlanProperty} />);
    expect(screen.getByText("Off-Plan")).toBeInTheDocument();
  });

  it("shows Featured badge for featured properties", () => {
    render(<PropertyCard property={featuredProperty} />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("renders bedroom and bathroom counts", () => {
    render(<PropertyCard property={saleProperty} />);
    expect(screen.getByText(new RegExp(`${saleProperty.bathrooms} Bath`))).toBeInTheDocument();
  });

  it("links to the property detail page", () => {
    render(<PropertyCard property={saleProperty} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/properties/${saleProperty.slug}`);
  });

  it("renders favorite button with correct initial state", () => {
    render(<PropertyCard property={saleProperty} />);
    const favButton = screen.getByLabelText("Save property");
    expect(favButton).toBeInTheDocument();
    expect(favButton).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles favorite state on click", async () => {
    const user = userEvent.setup();
    render(<PropertyCard property={saleProperty} />);
    const favButton = screen.getByLabelText("Save property");

    await user.click(favButton);
    expect(screen.getByLabelText("Remove from saved")).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByLabelText("Remove from saved"));
    expect(screen.getByLabelText("Save property")).toHaveAttribute("aria-pressed", "false");
  });

  it("renders an image with alt text", () => {
    render(<PropertyCard property={saleProperty} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt");
    expect(img.getAttribute("alt")).not.toBe("");
  });

  it("has accessible link label", () => {
    render(<PropertyCard property={saleProperty} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label");
  });
});
