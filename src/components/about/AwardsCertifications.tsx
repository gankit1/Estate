"use client";

import * as React from "react";
import { Award, Trophy } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockAwards } from "@/lib/data/mock-about";

interface AwardsCertificationsProps {
  className?: string;
}

export function AwardsCertifications({ className }: AwardsCertificationsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5 text-secondary" />
            Accreditations &amp; Recognition
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Institutional Awards &amp; Master Developer Alliances
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Recognized by government authorities and the UAE&apos;s leading master developers for transactional volume, client stewardship, and regulatory compliance.
          </p>
        </div>

        <span className="text-2xs font-mono font-medium px-3 py-1.5 rounded-full bg-sand-100 text-primary border border-sand-200 self-start md:self-auto shrink-0">
          RERA Licensed Brokerage ORN 12480
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockAwards.map((award) => (
          <div
            key={award.id}
            className="bg-surface border border-sand-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-xs">
                  <Award className="w-5 h-5 text-secondary" />
                </span>
                <span className="text-2xs font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                  {award.year}
                </span>
              </div>

              <div>
                <span className="text-3xs font-semibold uppercase tracking-wider text-secondary font-mono block mb-1">
                  {award.issuer}
                </span>
                <h4 className="font-display text-lg font-semibold text-text leading-snug">
                  {award.title}
                </h4>
              </div>

              <span className="inline-block text-2xs font-mono font-medium px-2 py-0.5 rounded-md bg-sand-100 text-primary border border-sand-200">
                {award.badgeText}
              </span>

              <p className="text-xs text-text-muted leading-relaxed">
                {award.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
