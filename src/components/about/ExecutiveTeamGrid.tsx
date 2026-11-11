"use client";

import * as React from "react";
import Image from "next/image";
import {
  Users,
  Globe2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockTeamMembers } from "@/lib/data/mock-about";

interface ExecutiveTeamGridProps {
  className?: string;
}

type DepartmentFilter = "all" | "executive" | "private-client" | "investment" | "legal";

export function ExecutiveTeamGrid({ className }: ExecutiveTeamGridProps) {
  const [activeTab, setActiveTab] = React.useState<DepartmentFilter>("all");

  const filteredMembers = React.useMemo(() => {
    if (activeTab === "all") return mockTeamMembers;
    return mockTeamMembers.filter((m) => m.department === activeTab);
  }, [activeTab]);

  const tabs: { id: DepartmentFilter; label: string; count: number }[] = [
    { id: "all", label: "All Directors", count: mockTeamMembers.length },
    {
      id: "executive",
      label: "Executive Leadership",
      count: mockTeamMembers.filter((m) => m.department === "executive").length,
    },
    {
      id: "private-client",
      label: "Private Clients",
      count: mockTeamMembers.filter((m) => m.department === "private-client").length,
    },
    {
      id: "investment",
      label: "Investment Analytics",
      count: mockTeamMembers.filter((m) => m.department === "investment").length,
    },
    {
      id: "legal",
      label: "Legal & Residency",
      count: mockTeamMembers.filter((m) => m.department === "legal").length,
    },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-secondary" />
            Leadership &amp; Advisory Board
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Meet Our Senior Directors &amp; Partners
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Every client is guided by licensed, seasoned industry leaders with an average of 12+ years of continuous Dubai real estate execution.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-sand-100 p-1.5 rounded-2xl border border-sand-200 self-start md:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-xs font-semibold"
                  : "text-text-muted hover:text-text hover:bg-surface/50"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "text-3xs font-mono px-1.5 py-0.2 rounded-full",
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-sand-200 text-text-muted"
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-surface border border-sand-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image banner with high contrast styling */}
              <div className="relative aspect-[16/10] w-full bg-sand-200 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent z-10" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
                  <span className="text-3xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-primary border border-white/40 shadow-xs">
                    {member.departmentLabel}
                  </span>
                  <span className="text-3xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-secondary/90 text-navy-950 shadow-xs">
                    {member.reraNumber}
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white z-20">
                  <h4 className="font-display text-xl font-semibold text-white drop-shadow-sm leading-tight">
                    {member.name}
                  </h4>
                  <span className="text-2xs text-gold-300 font-medium block mt-0.5">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-2xs border-b border-sand-100 pb-2.5">
                  <span className="text-text-muted">Dubai Experience:</span>
                  <span className="font-mono font-bold text-primary">
                    {member.experienceYears} Years Active
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-3xs font-semibold uppercase tracking-wider text-text-muted block">
                    Specialization:
                  </span>
                  <p className="text-xs font-medium text-text leading-snug">
                    {member.specialization}
                  </p>
                </div>

                <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                {/* Languages */}
                <div className="pt-2 border-t border-sand-100">
                  <span className="text-3xs font-semibold uppercase tracking-wider text-text-muted block mb-1.5">
                    Languages Spoken:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-3xs font-medium px-2 py-0.5 rounded-md bg-sand-100 text-text border border-sand-200"
                      >
                        <Globe2 className="w-2.5 h-2.5 text-secondary" />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* LinkedIn / Contact footer */}
            <div className="p-5 pt-0">
              <a
                href={member.linkedIn || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-sand-100 hover:bg-primary hover:text-white text-primary border border-sand-200 transition-colors"
              >
                <span>Connect with {member.name.split(" ")[0]}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
