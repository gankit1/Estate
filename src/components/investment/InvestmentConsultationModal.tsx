"use client";

import * as React from "react";
import {
  X,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

interface InvestmentConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvestmentConsultationModal({
  isOpen,
  onClose,
}: InvestmentConsultationModalProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [budget, setBudget] = React.useState("2m-5m");
  const [objective, setObjective] = React.useState("golden-visa");
  const [notes, setNotes] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-surface border border-sand-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col justify-between">
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          aria-label="Close advisory modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-sand-100 hover:bg-sand-200 text-text-muted hover:text-text transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-light text-text">
              Consultation Scheduled
            </h3>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-text">{name || "Valued Investor"}</span>. A Senior Investment Director will contact you within 2 business hours with confidential market reports and personalized cashflow allocations.
            </p>
            <div className="bg-sand-50 border border-sand-200 p-4 rounded-2xl text-2xs text-text-muted space-y-1">
              <span className="font-semibold text-primary block">Next Steps:</span>
              <span>1. Direct WhatsApp / Email confirmation dispatched</span>
              <span className="block">2. Portfolio options tailored to {budget.toUpperCase()} target</span>
            </div>
            <Button variant="primary" onClick={handleReset} className="w-full justify-center">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-primary text-3xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-secondary" />
                Private Client Advisory
              </div>
              <h3 id="consultation-modal-title" className="font-display text-xl sm:text-2xl font-light text-text leading-tight">
                Schedule Private Investment Briefing
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Direct consultation with our RERA-licensed Senior Investment Directors. Complete discretion assured.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-text block mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lord Alexander Wright"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-text block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@familyoffice.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-text block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7911 123456"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-text block mb-1">Target Capital</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="under-2m">Under AED 2.0M (~$545K)</option>
                    <option value="2m-5m">AED 2.0M – 5.0M (Golden Visa)</option>
                    <option value="5m-10m">AED 5.0M – 10.0M Prime</option>
                    <option value="10m-plus">AED 10.0M+ Ultra-High-Net-Worth</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-text block mb-1">Primary Strategy</label>
                  <select
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="golden-visa">UAE 06-Year Golden Visa</option>
                    <option value="cashflow">Max Cashflow Yield (7%+)</option>
                    <option value="capital-growth">Maximum Capital Growth</option>
                    <option value="trophy">Capital Preservation Trophy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-text block mb-1">Specific Portfolio Inquiries (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in bulk off-plan floorplates in Creek Harbour, or ready units in Downtown..."
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button type="submit" variant="primary" className="w-full justify-center text-xs font-semibold py-2.5">
                Confirm Confidential Advisory Request
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-3xs text-text-muted">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Encrypted & NDA Protected. Zero unsolicited sales contact.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
