"use client";

import * as React from "react";
import {
  X,
  CheckCircle,
  FileText,
  Download,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import type { OffPlanProject } from "@/lib/data/mock-projects";

interface ProjectInquiryModalProps {
  project: OffPlanProject | null;
  isOpen: boolean;
  onClose: () => void;
}

interface InnerInquiryProps {
  project: OffPlanProject;
  onClose: () => void;
}

function InnerInquiry({ project, onClose }: InnerInquiryProps) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [buyerType, setBuyerType] = React.useState("investor");
  const [preferredBedrooms, setPreferredBedrooms] = React.useState("2");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant static API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="relative w-full max-w-lg bg-surface rounded-2xl shadow-2xl border border-sand-200 overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="px-6 py-5 border-b border-sand-200 flex items-center justify-between bg-sand-50/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 id="inquiry-modal-title" className="font-display text-lg text-text font-medium leading-none">
              VIP Access & Brochure
            </h3>
            <p className="text-2xs text-text-muted mt-0.5">{project.name}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text hover:bg-sand-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-6">
        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl text-text font-light">
              Request Confirmed
            </h4>
            <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-navy-900">{fullName || "valued investor"}</span>. Your VIP priority allocation request for <span className="font-medium">{project.name}</span> has been logged.
            </p>

            <div className="bg-sand-50 p-4 rounded-xl border border-sand-200 text-xs text-text-secondary space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium text-navy-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-secondary" />
                  Digital Brochure Package
                </span>
                <span className="text-2xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Ready
                </span>
              </div>
              <p className="text-text-muted">
                Includes full unit inventory floor plans, pricing index, and developer payment schedule.
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs rounded-lg justify-center"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => {
                    alert(`Downloading official PDF brochure for ${project.name}`);
                  }}
                >
                  Download Official PDF (3.8 MB)
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <Button variant="primary" size="sm" onClick={onClose} className="rounded-full px-6">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-sand-50 p-3 rounded-xl border border-sand-200/70 text-xs text-text-secondary flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Direct developer allocation • 0% agency commission • Escrow account protected by Dubai Land Department.
              </span>
            </div>

            {/* Form inputs */}
            <div className="space-y-3">
              <div>
                <label htmlFor="inquiry-name" className="block text-xs font-medium text-text-muted mb-1">
                  Full Name *
                </label>
                <Input
                  id="inquiry-name"
                  required
                  placeholder="e.g. Alexander Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-10 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-medium text-text-muted mb-1">
                    Email Address *
                  </label>
                  <Input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="alexander@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 text-xs"
                  />
                </div>
                <div>
                  <label htmlFor="inquiry-phone" className="block text-xs font-medium text-text-muted mb-1">
                    Phone / WhatsApp *
                  </label>
                  <Input
                    id="inquiry-phone"
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Investor Profile
                  </label>
                  <select
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-sand-300 rounded-lg text-xs text-text focus:outline-none focus:border-primary"
                  >
                    <option value="investor">Buy-to-Let Investor</option>
                    <option value="end-user">Private Resident (End-User)</option>
                    <option value="golden-visa">Golden Visa Applicant</option>
                    <option value="undecided">Exploring Options</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1">
                    Preferred Bedrooms
                  </label>
                  <select
                    value={preferredBedrooms}
                    onChange={(e) => setPreferredBedrooms(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-sand-300 rounded-lg text-xs text-text focus:outline-none focus:border-primary"
                  >
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4+">4+ Beds / Penthouse</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
                className="rounded-xl text-xs font-semibold justify-center h-11 bg-primary text-white"
                rightIcon={<Send className="w-3.5 h-3.5" />}
              >
                Send VIP Request & Unlock Brochure
              </Button>
              <p className="text-[10px] text-text-muted text-center mt-2">
                Your privacy is protected. We will never share your personal information.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function ProjectInquiryModal({
  project,
  isOpen,
  onClose,
}: ProjectInquiryModalProps) {
  // Handle ESC key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <InnerInquiry
        key={project._id}
        project={project}
        onClose={onClose}
      />
    </div>
  );
}
