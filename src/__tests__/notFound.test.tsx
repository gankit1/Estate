import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NotFound from "@/app/not-found";

describe("Estate 404 Page (Not Found)", () => {
  it("renders real estate themed 404 headings and badge", () => {
    render(<NotFound />);

    expect(screen.getByText(/Property Off the Market or Unlisted Address/i)).toBeInTheDocument();
    expect(screen.getByText("Address Not Found")).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("provides a prominent, clickable option to return to the home page", () => {
    render(<NotFound />);

    const homeButton = screen.getByRole("link", { name: /Return to Home Page/i });
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute("href", "/");
  });

  it("provides alternative navigation options to browse properties and new projects", () => {
    render(<NotFound />);

    const browseProperties = screen.getByRole("link", { name: /Browse Properties for Sale/i });
    expect(browseProperties).toBeInTheDocument();
    expect(browseProperties).toHaveAttribute("href", "/properties?purpose=sale");

    const newProjects = screen.getByRole("link", { name: /New Off-Plan Launches/i });
    expect(newProjects).toBeInTheDocument();
    expect(newProjects).toHaveAttribute("href", "/new-projects");
  });

  it("renders the inline property search form", () => {
    render(<NotFound />);

    const searchInput = screen.getByPlaceholderText(/Search by area, developer, or project/i);
    expect(searchInput).toBeInTheDocument();

    const findButton = screen.getByRole("button", { name: /Find/i });
    expect(findButton).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "Palm Jumeirah" } });
    expect(searchInput).toHaveValue("Palm Jumeirah");
  });

  it("displays popular Dubai luxury destinations", () => {
    render(<NotFound />);

    expect(screen.getAllByText("Dubai Marina").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Downtown Dubai").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Palm Jumeirah").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Dubai Hills Estate").length).toBeGreaterThanOrEqual(1);
  });

  it("provides private office telephone concierge contact", () => {
    render(<NotFound />);

    const phoneLink = screen.getByRole("link", { name: /\+971 4 400 0000/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:+97144000000");
  });
});
