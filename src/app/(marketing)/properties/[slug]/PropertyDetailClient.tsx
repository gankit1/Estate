"use client";

import { PropertyGallery } from "@/components/property/PropertyGallery";
import { EnquirySidebar, MobileCTA } from "@/components/property/EnquirySidebar";
import type { Property } from "@/types";

interface PropertyDetailClientProps {
  property: Property;
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  return (
    <>
      {/* Gallery */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Mobile sticky bottom CTA */}
      <MobileCTA property={property} agent={property.agent} />
    </>
  );
}
