import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import { PropertyListingContent } from "./PropertyListingContent";
import { PropertyCardSkeleton } from "@/components/property/PropertyCard";

export const metadata: Metadata = {
  title: "Properties for Sale & Rent in Dubai | Pacific Star Realty",
  description:
    "Browse premium properties for sale and rent across Dubai. Filter by area, price, bedrooms, and property type. Find your ideal home in Dubai Marina, Downtown, Palm Jumeirah, and more.",
  openGraph: {
    title: "Properties for Sale & Rent in Dubai | Pacific Star Realty",
    description:
      "Browse premium properties for sale and rent across Dubai.",
  },
};

function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-8 pb-10 lg:pt-12 lg:pb-14">
        <Container>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Properties" },
            ]}
            className="mb-6"
          />

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-text mb-2">
            Properties
          </h1>
          <p className="text-text-muted text-base max-w-xl">
            Explore our curated selection of properties across Dubai&apos;s most
            desirable neighbourhoods.
          </p>
        </Container>
      </div>

      <Container className="pb-20 lg:pb-28">
        <Suspense fallback={<ListingSkeleton />}>
          <PropertyListingContent />
        </Suspense>
      </Container>
    </main>
  );
}
