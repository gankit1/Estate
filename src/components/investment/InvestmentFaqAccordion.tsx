"use client";

import * as React from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  mockInvestmentFaqs,
} from "@/lib/data/mock-investment";

interface InvestmentFaqAccordionProps {
  className?: string;
}

export function InvestmentFaqAccordion({ className }: InvestmentFaqAccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(["faq-1", "faq-3"]);
  const [filter, setFilter] = React.useState<"all" | "legal" | "tax" | "returns" | "process">("all");

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFaqs = React.useMemo(() => {
    if (filter === "all") return mockInvestmentFaqs;
    return mockInvestmentFaqs.filter((f) => f.category === filter);
  }, [filter]);

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "legal", label: "Legal & Foreign Ownership" },
    { id: "tax", label: "Taxes & Currency Peg" },
    { id: "returns", label: "Rental Yields & Resale" },
    { id: "process", label: "Acquisition & Crypto" },
  ] as const;

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
            <HelpCircle className="w-3.5 h-3.5 text-secondary" />
            Investor Advisory FAQ
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Frequently Asked Investment Questions
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Everything international buyers need to know regarding regulations, 100% freehold titles, tax neutrality, and rental operations in Dubai.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 bg-sand-100 p-1.5 rounded-2xl border border-sand-200 self-start md:self-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-xl transition-all cursor-pointer",
                filter === c.id
                  ? "bg-primary text-white shadow-2xs font-semibold"
                  : "text-text-muted hover:text-text hover:bg-surface/50"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion list */}
      <div className="divide-y divide-sand-200">
        {filteredFaqs.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left py-1 group cursor-pointer focus:outline-none"
              >
                <span className="font-display text-base sm:text-lg font-medium text-text group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <span className="w-7 h-7 rounded-full bg-sand-100 group-hover:bg-sand-200 flex items-center justify-center text-text shrink-0 transition-colors">
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-primary" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-muted" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="pt-3 pb-1 text-xs sm:text-sm text-text-muted leading-relaxed max-w-3xl animate-in fade-in duration-200">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
