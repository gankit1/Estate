"use client";

import * as React from "react";
import {
  X,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import type { EnhancedArea } from "@/lib/data/mock-areas";

interface AreaConsultationModalProps {
  area: EnhancedArea | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AreaConsultationModal({
  area,
  isOpen,
  onClose,
}: AreaConsultationModalProps) {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "invest" as "invest" | "relocate" | "compare",
    preferredTiming: "morning",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !area) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      purpose: "invest",
      preferredTiming: "morning",
      message: "",
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="area-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
    >
      {/* Backdrop */}
      <div
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-surface rounded-3xl shadow-2xl border border-sand-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-sand-200 flex items-center justify-between bg-sand-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              VIP Area Advisory
            </span>
          </div>

          <button
            onClick={handleResetAndClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text hover:bg-sand-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-display text-2xl text-text font-light">
                Consultation Request Confirmed
              </h3>

              <p className="text-xs sm:text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
                Our Senior Area Specialist for <strong className="text-primary">{area.name}</strong> will contact you via WhatsApp and phone within 15 minutes with current off-market inventory and investment reports.
              </p>

              <div className="pt-4">
                <Button variant="primary" size="md" onClick={handleResetAndClose} className="rounded-full">
                  Return to Area Explorer
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block mb-1">
                  Target Community
                </span>
                <h3 id="area-modal-title" className="font-display text-2xl text-text font-light flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary shrink-0" />
                  {area.name}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  Avg. {area.avgRentalYield}% Yield • AED {area.avgSalePricePerSqft}/sqft • 100% Freehold
                </p>
              </div>

              {/* Advisory Purpose Selector */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { id: "invest", label: "Buy to Invest" },
                  { id: "relocate", label: "Relocation" },
                  { id: "compare", label: "Compare Areas" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, purpose: item.id as typeof formData.purpose })}
                    className={cn(
                      "py-2 px-2 text-center text-xs font-medium rounded-xl border transition-all cursor-pointer",
                      formData.purpose === item.id
                        ? "bg-primary text-white border-primary shadow-xs font-semibold"
                        : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-text-secondary mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <Input
                      required
                      placeholder="e.g. Tariq Al-Mansoor"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10 text-xs sm:text-sm bg-sand-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-2xs uppercase tracking-wider font-semibold text-text-secondary mb-1">
                      Phone / WhatsApp *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input
                        required
                        type="tel"
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 text-xs sm:text-sm bg-sand-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-2xs uppercase tracking-wider font-semibold text-text-secondary mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <Input
                        required
                        type="email"
                        placeholder="tariq@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 text-xs sm:text-sm bg-sand-50/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-text-secondary mb-1">
                    Specific Questions or Preferences
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for 2-bedroom sea-facing apartment or high rental yield studios..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-sand-50/50 border border-sand-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={isSubmitting}
                  className="rounded-xl text-xs sm:text-sm font-semibold justify-center h-11 bg-primary text-white hover:bg-primary-hover shadow-xs cursor-pointer"
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                >
                  {isSubmitting ? "Submitting..." : `Request Private ${area.name} Advisory`}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-2xs text-text-muted pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>RERA Registered • Strict Confidentiality Guaranteed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
