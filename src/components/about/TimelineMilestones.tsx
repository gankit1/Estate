"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockMilestones } from "@/lib/data/mock-about";

interface TimelineMilestonesProps {
  className?: string;
}

export function TimelineMilestones({ className }: TimelineMilestonesProps) {
  const [activeYear, setActiveYear] = React.useState<string>("2026");

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-sand-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            Our Journey
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            14+ Years of Continuous Execution in Dubai
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            From our founding in Downtown Dubai to structuring multi-billion Dirham master portfolios across the UAE.
          </p>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-sand-100 p-1.5 rounded-2xl border border-sand-200 self-start md:self-auto">
          {mockMilestones.map((m) => (
            <button
              key={m.year}
              type="button"
              onClick={() => setActiveYear(m.year)}
              className={cn(
                "px-3 py-1 text-xs font-mono font-semibold rounded-xl transition-all cursor-pointer",
                activeYear === m.year
                  ? "bg-primary text-white shadow-xs"
                  : "text-text-muted hover:text-text hover:bg-surface/50"
              )}
            >
              {m.year}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMilestones.map((milestone) => (
          <div
            key={milestone.year}
            onClick={() => setActiveYear(milestone.year)}
            className={cn(
              "p-6 rounded-3xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between",
              activeYear === milestone.year
                ? "bg-primary text-white border-primary shadow-md ring-2 ring-primary/20"
                : "bg-sand-50/70 hover:bg-sand-50 border-sand-200 text-text"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xl sm:text-2xl font-mono font-bold tracking-tight",
                    activeYear === milestone.year ? "text-secondary" : "text-primary"
                  )}
                >
                  {milestone.year}
                </span>
                <span
                  className={cn(
                    "text-3xs font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border",
                    activeYear === milestone.year
                      ? "bg-white/10 text-sand-100 border-white/20"
                      : "bg-secondary/15 text-primary border-secondary/30"
                  )}
                >
                  {milestone.badge}
                </span>
              </div>

              <h4
                className={cn(
                  "font-display text-lg font-semibold leading-snug",
                  activeYear === milestone.year ? "text-white" : "text-text"
                )}
              >
                {milestone.title}
              </h4>

              <p
                className={cn(
                  "text-xs leading-relaxed",
                  activeYear === milestone.year ? "text-sand-100" : "text-text-muted"
                )}
              >
                {milestone.description}
              </p>
            </div>

            <div
              className={cn(
                "pt-3 border-t text-2xs font-mono font-semibold flex items-center justify-between",
                activeYear === milestone.year
                  ? "border-white/15 text-gold-300"
                  : "border-sand-200/80 text-emerald-800"
              )}
            >
              <span>Milestone Result:</span>
              <span>{milestone.highlightMetric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
