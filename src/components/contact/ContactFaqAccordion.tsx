"use client";

import * as React from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockContactFaqs } from "@/lib/data/mock-contact";

interface ContactFaqAccordionProps {
  className?: string;
}

export function ContactFaqAccordion({ className }: ContactFaqAccordionProps) {
  const [openIds, setOpenIds] = React.useState<string[]>(["cfaq-1", "cfaq-2"]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

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
            Visiting &amp; Consultation FAQs
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Frequently Asked Contact Inquiries
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
            Everything you need to know regarding appointment scheduling, office access, remote transactions, and executive chauffeur services.
          </p>
        </div>
      </div>

      <div className="divide-y divide-sand-200">
        {mockContactFaqs.map((faq) => {
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
