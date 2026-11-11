import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BlogContent } from "@/app/(marketing)/blog/BlogContent";
import BlogPostDetailPage from "@/app/(marketing)/blog/[slug]/page";
import { BLOG_POSTS } from "@/lib/data/blog-data";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/blog",
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn(),
}));

describe("Blog & Market Insights Page", () => {
  it("renders page title, market benchmark metrics bar, and featured card", () => {
    render(<BlogContent />);

    // Header & title
    expect(
      screen.getByText(/Dubai Real Estate Market Insights & Intelligence/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Institutional Research & Advisory/i)).toBeInTheDocument();

    // Benchmarks Bar
    expect(screen.getByText("AED 430B+")).toBeInTheDocument();
    expect(screen.getByText("+14.8%")).toBeInTheDocument();
    expect(screen.getByText("7.1% ROI")).toBeInTheDocument();
    expect(screen.getByText("AED 2.0M")).toBeInTheDocument();
    expect(screen.getByText("0% Tax")).toBeInTheDocument();

    // Featured report
    expect(screen.getByText(/Featured • Market Report/i)).toBeInTheDocument();
  });

  it("filters articles when a category tab is clicked", () => {
    render(<BlogContent />);

    // Click on "Yield Strategy" category tab
    const yieldTab = screen.getByRole("button", { name: /Yield Strategy/i });
    fireEvent.click(yieldTab);

    // Yield strategy posts should be visible
    expect(
      screen.getByText(/Off-Plan vs. Ready Property in Dubai: Structuring an Optimal/i)
    ).toBeInTheDocument();
  });

  it("filters articles by keyword in search input", () => {
    render(<BlogContent />);

    const searchInput = screen.getByPlaceholderText(
      /Search market insights, tags, or areas.../i
    );
    fireEvent.change(searchInput, { target: { value: "Golden Visa" } });

    // Golden Visa post should be found
    expect(
      screen.getByText(/The Comprehensive 2026 Guide to the UAE 10-Year Golden Visa/i)
    ).toBeInTheDocument();
  });

  it("shows empty state when search produces no results and allows reset", () => {
    render(<BlogContent />);

    const searchInput = screen.getByPlaceholderText(
      /Search market insights, tags, or areas.../i
    );
    fireEvent.change(searchInput, { target: { value: "XYZ123NonExistentTopic" } });

    expect(screen.getByText(/No articles found/i)).toBeInTheDocument();

    // Click reset filters
    const resetButton = screen.getByRole("button", { name: /Reset Filters/i });
    fireEvent.click(resetButton);

    expect(
      screen.getAllByText(/Dubai Prime Real Estate Outlook 2026/i).length
    ).toBeGreaterThan(0);
  });

  it("handles newsletter subscription submission and displays VIP confirmation", () => {
    render(<BlogContent />);

    const emailInput = screen.getByPlaceholderText(
      /Enter your institutional or personal email/i
    );
    fireEvent.change(emailInput, { target: { value: "investor@familyoffice.com" } });

    const subscribeButton = screen.getByRole("button", { name: /Subscribe/i });
    fireEvent.click(subscribeButton);

    expect(
      screen.getByText(/You have been registered for our Q4 Prime Market Report/i)
    ).toBeInTheDocument();
  });

  it("renders BlogPostDetailPage with key takeaways, full content, and related articles", async () => {
    const post = BLOG_POSTS[0];
    const PageComponent = await BlogPostDetailPage({
      params: Promise.resolve({ slug: post.slug }),
    });

    render(PageComponent);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(post.title);
    expect(screen.getByText(/Executive Summary & Key Takeaways/i)).toBeInTheDocument();
    expect(screen.getByText(/Related Market Insights/i)).toBeInTheDocument();
    expect(screen.getByText(/Discuss this analysis with a senior portfolio advisor/i)).toBeInTheDocument();
  });
});
