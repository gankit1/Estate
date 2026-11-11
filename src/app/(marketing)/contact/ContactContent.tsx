"use client";

import * as React from "react";
import { ContactHeroStats } from "@/components/contact/ContactHeroStats";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { OfficesLocationGuide } from "@/components/contact/OfficesLocationGuide";
import { DepartmentDirectory } from "@/components/contact/DepartmentDirectory";
import { VipChauffeurServiceCard } from "@/components/contact/VipChauffeurServiceCard";
import { ContactFaqAccordion } from "@/components/contact/ContactFaqAccordion";

export function ContactContent() {
  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Key Rapid Response Stats */}
      <section id="contact-stats" aria-label="Contact Statistics">
        <ContactHeroStats />
      </section>

      {/* 2. Interactive Inquiry Form & Immediate Channels */}
      <section id="inquiry-form" aria-label="Submit Private Client Inquiry">
        <ContactFormSection />
      </section>

      {/* 3. Physical Office Visiting Guides */}
      <section id="office-locations" aria-label="Physical Office Locations and Directions">
        <OfficesLocationGuide />
      </section>

      {/* 4. Specialized Department Directory */}
      <section id="departments" aria-label="Specialized Department Directory">
        <DepartmentDirectory />
      </section>

      {/* 5. VIP Overseas Buyer Chauffeur Banner */}
      <section id="chauffeur-service" aria-label="VIP Airport Chauffeur Service">
        <VipChauffeurServiceCard />
      </section>

      {/* 6. Contact & Visiting FAQs */}
      <section id="faqs" aria-label="Frequently Asked Contact Questions">
        <ContactFaqAccordion />
      </section>
    </div>
  );
}

