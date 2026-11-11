"use client";

import * as React from "react";
import {
  X,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";

interface ContactAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOfficeId?: string;
}

export function ContactAppointmentModal({
  isOpen,
  onClose,
  defaultOfficeId,
}: ContactAppointmentModalProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState(
    defaultOfficeId === "office-marina" ? "marina" : "downtown"
  );
  const [date, setDate] = React.useState("");
  const [topic, setTopic] = React.useState("portfolio-advisory");
  const [notes, setNotes] = React.useState("");

  React.useEffect(() => {
    if (defaultOfficeId === "office-marina") {
      setLocation("marina");
    } else if (defaultOfficeId === "office-downtown") {
      setLocation("downtown");
    }
  }, [defaultOfficeId]);

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
      aria-labelledby="appointment-modal-title"
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
          aria-label="Close appointment modal"
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
              Appointment Requested
            </h3>
            <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-text">{name || "Valued Client"}</span>. Our Private Concierge has reserved your consultation request at our{" "}
              <span className="font-semibold text-text">
                {location === "downtown"
                  ? "Downtown Headquarters"
                  : location === "marina"
                  ? "Dubai Marina Lounge"
                  : "Private Virtual Video Suite"}
              </span>.
            </p>
            <div className="bg-sand-50 border border-sand-200 p-4 rounded-2xl text-2xs text-text-muted space-y-1">
              <span className="font-semibold text-primary block">Confirmation Details:</span>
              <span>1. Direct calendar invite &amp; VIP parking pass sent to {email}</span>
              <span className="block">2. Senior Partner briefing materials prepared</span>
            </div>
            <Button variant="primary" onClick={handleReset} className="w-full justify-center">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary/15 text-primary text-3xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-secondary" />
                In-Person &amp; Virtual Meetings
              </div>
              <h3 id="appointment-modal-title" className="font-display text-xl sm:text-2xl font-light text-text leading-tight">
                Schedule a Consultation with a Director
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Meet privately at our Boulevard Plaza suites, Marina Lounge, or via secure video link.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-text block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
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
                    placeholder="name@company.com"
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
                    placeholder="+971 50 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-text block mb-1">Preferred Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="downtown">Downtown (Boulevard Plaza 1)</option>
                    <option value="marina">Dubai Marina (Marina Plaza)</option>
                    <option value="virtual">Virtual Video Conference</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-text block mb-1">Advisory Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="portfolio-advisory">Prime Portfolio Advisory</option>
                    <option value="off-plan-allocation">Tier-1 Off-Plan Allocation</option>
                    <option value="golden-visa">06-Year UAE Golden Visa</option>
                    <option value="luxury-resale">Beachfront Villa Acquisition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-text block mb-1">Preferred Date &amp; Time (Optional)</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. Next Tuesday morning at 11:00 AM"
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-text block mb-1">Specific Portfolio Objectives (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Looking to acquire 2 units in Dubai Creek Harbour or Downtown for family residency..."
                  className="w-full px-3.5 py-2 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <Button type="submit" variant="primary" className="w-full justify-center text-xs font-semibold py-2.5">
                Confirm Private Appointment Request
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-3xs text-text-muted">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Strict Discretion Assured. Valet parking provided at all locations.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
