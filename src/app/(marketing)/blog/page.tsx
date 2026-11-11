import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Dubai Real Estate Market Insights & Advisory Blog | Pacific Star Realty",
  description:
    "Expert analysis on Dubai property market trends, rental yields, off-plan capital growth, RERA regulatory updates, and UAE Golden Visa requirements.",
  openGraph: {
    title: "Dubai Real Estate Market Insights & Advisory Blog | Pacific Star Realty",
    description:
      "Expert analysis on Dubai property market trends, rental yields, off-plan capital growth, RERA regulatory updates, and UAE Golden Visa requirements.",
    type: "website",
    locale: "en_AE",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
