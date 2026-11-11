"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { AboutStats } from "@/components/about/AboutStats";
import { OurStorySection } from "@/components/about/OurStorySection";
import { ExecutiveTeamGrid } from "@/components/about/ExecutiveTeamGrid";
import { TimelineMilestones } from "@/components/about/TimelineMilestones";
import { AwardsCertifications } from "@/components/about/AwardsCertifications";
import { OfficesShowcase } from "@/components/about/OfficesShowcase";
import { ContactAppointmentModal } from "@/components/about/ContactAppointmentModal";

export function AboutContent() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedOfficeId, setSelectedOfficeId] = React.useState<string | undefined>(undefined);

  const handleOpenAppointment = (officeId?: string) => {
    setSelectedOfficeId(officeId);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Key Statistics Ribbon */}
      <section id="stats" aria-label="Company Statistics">
        <AboutStats />
      </section>

      {/* 2. Our Story & 4 Core Pillars */}
      <section id="our-story" aria-label="Our Story & Operating Principles">
        <OurStorySection />
      </section>

      {/* 3. Executive Leadership Team Grid */}
      <section id="team" aria-label="Leadership & Advisory Board">
        <ExecutiveTeamGrid />
      </section>

      {/* 4. Company Journey & Timeline */}
      <section id="timeline" aria-label="Company Historical Milestones">
        <TimelineMilestones />
      </section>

      {/* 5. Institutional Awards & Accreditations */}
      <section id="awards" aria-label="Awards and Accreditations">
        <AwardsCertifications />
      </section>

      {/* 6. Physical Offices & Client Lounges */}
      <section id="offices" aria-label="Physical Office Locations">
        <OfficesShowcase onBookAppointment={handleOpenAppointment} />
      </section>

      {/* 7. Bottom Call-To-Action Banner */}
      <div className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-xl">
        <div
          className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/40 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            Fiduciary Real Estate Stewardship
          </div>
          <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-tight">
            Partner with Dubai&apos;s Most Trusted Property Advisors
          </h3>
          <p className="text-xs sm:text-sm text-sand-200 leading-relaxed max-w-2xl">
            Whether acquiring a luxury waterfront residence on Palm Jumeirah or structuring a multi-unit investment portfolio for UAE Golden Visa residency, our Senior Partners provide conflict-free stewardship.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleOpenAppointment()}
              className="text-xs sm:text-sm font-semibold tracking-wide justify-center shadow-lg"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              Schedule Director Briefing
            </Button>
            <Link
              href="/investment"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Explore Investment Intelligence</span>
              <ArrowRight className="w-4 h-4 ml-1.5 text-secondary" />
            </Link>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <ContactAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultOfficeId={selectedOfficeId}
      />
    </div>
  );
}
