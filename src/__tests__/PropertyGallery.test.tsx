import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import type { PropertyImage } from "@/types";

const testImages: PropertyImage[] = [
  { url: "/img1.jpg", caption: "Living room", isPrimary: true, width: 1200, height: 800 },
  { url: "/img2.jpg", caption: "Kitchen", isPrimary: false, width: 1200, height: 800 },
  { url: "/img3.jpg", caption: "Bedroom", isPrimary: false, width: 1200, height: 800 },
];

describe("PropertyGallery", () => {
  it("renders the main image", () => {
    render(<PropertyGallery images={testImages} title="Test Property" />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders nothing when no images", () => {
    const { container } = render(<PropertyGallery images={[]} title="Test" />);
    expect(container.innerHTML).toBe("");
  });

  it("opens lightbox when clicking main image", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery images={testImages} title="Test Property" />);

    const mainButton = screen.getByLabelText(/View Living room in full size/i);
    await user.click(mainButton);

    // Lightbox should be open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("closes lightbox with close button", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery images={testImages} title="Test Property" />);

    // Open lightbox
    await user.click(screen.getByLabelText(/View Living room in full size/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close
    await user.click(screen.getByLabelText("Close gallery"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates to next image", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery images={testImages} title="Test Property" />);

    await user.click(screen.getByLabelText(/View Living room in full size/i));
    expect(screen.getByText("1 / 3")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Next image"));
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to previous image", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery images={testImages} title="Test Property" />);

    await user.click(screen.getByLabelText(/View Living room in full size/i));
    await user.click(screen.getByLabelText("Previous image"));
    // Wraps around to last
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("closes lightbox on Escape key", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery images={testImages} title="Test Property" />);

    await user.click(screen.getByLabelText(/View Living room in full size/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
