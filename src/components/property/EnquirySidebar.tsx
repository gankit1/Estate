"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";
import { CustomSelect } from "@/components/ui/Select";
import { getWhatsAppUrl, getPropertyWhatsAppMessage } from "@/lib/utils/search";
import { formatPrice } from "@/lib/utils/format";
import type { Property, Agent } from "@/types";

/* ── Icons ──────────────────────────────────────────────────── */
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function CalendarIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CheckShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* ── Viewing Form Modal ─────────────────────────────────────── */
const timeOptions = [
  { value: "Morning (10:00 - 12:00)", label: "Morning (10:00 - 12:00)" },
  { value: "Afternoon (14:00 - 16:00)", label: "Afternoon (14:00 - 16:00)" },
  { value: "Evening (17:00 - 19:00)", label: "Evening (17:00 - 19:00)" },
];

function ViewingForm({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const [time, setTime] = React.useState("Morning (10:00 - 12:00)");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-modal bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Request a viewing"
    >
      <div
        className="bg-white w-full max-w-lg rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl border border-sand-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-sand-200/80 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary font-semibold">Private Viewing</span>
            <h3 className="font-display text-2xl text-text font-normal mt-0.5">Schedule a Tour</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text hover:bg-sand-100 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h4 className="font-display text-2xl text-text font-normal">Tour Request Confirmed</h4>
            <p className="text-sm text-text-muted mt-2 max-w-xs mx-auto">
              Our private client advisor will contact you within 15 minutes to confirm the arrangement.
            </p>
            <Button variant="primary" size="md" onClick={onClose} className="mt-6 px-8">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-sand-50/80 border border-sand-200/60 rounded-xs">
              <p className="text-xs text-text font-medium truncate">{property.title}</p>
              <p className="text-2xs text-text-muted">{property.location.address}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label htmlFor="modal-name" className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-1">
                  Full Name *
                </label>
                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-3.5 py-2.5 text-sm border border-sand-300 bg-sand-50/40 rounded-xs text-text focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-phone" className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    className="w-full px-3.5 py-2.5 text-sm border border-sand-300 bg-sand-50/40 rounded-xs text-text focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-1">
                    Email Address
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    placeholder="alex@domain.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-sand-300 bg-sand-50/40 rounded-xs text-text focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-date" className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-1">
                    Preferred Date *
                  </label>
                  <input
                    id="modal-date"
                    name="date"
                    type="date"
                    required
                    className="w-full px-3.5 py-2.5 text-sm border border-sand-300 bg-sand-50/40 rounded-xs text-text focus:outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-time" className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-1">
                    Preferred Time
                  </label>
                  <CustomSelect
                    id="modal-time"
                    name="time"
                    value={time}
                    onChange={setTime}
                    options={timeOptions}
                    size="sm"
                    buttonClassName="bg-sand-50/40 border-sand-300 rounded-xs h-10 text-xs"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-msg" className="text-xs font-semibold uppercase tracking-wider text-text-secondary block mb-1">
                  Special Notes
                </label>
                <textarea
                  id="modal-msg"
                  name="message"
                  rows={2}
                  placeholder="Looking for canal view, flexible handover..."
                  className="w-full px-3.5 py-2.5 text-sm border border-sand-300 bg-sand-50/40 rounded-xs text-text focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            <Button variant="primary" size="md" fullWidth type="submit" className="py-3 font-medium">
              Submit Tour Request
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── EnquirySidebar (Desktop Sticky Column) ─────────────────── */
interface EnquirySidebarProps {
  property: Property;
  agent?: Agent;
  className?: string;
}

export function EnquirySidebar({ property, agent, className }: EnquirySidebarProps) {
  const [showViewing, setShowViewing] = React.useState(false);
  const [quickSent, setQuickSent] = React.useState(false);
  const [quickName, setQuickName] = React.useState("");
  const [quickPhone, setQuickPhone] = React.useState("");

  const isRent = property.purpose === "rent";
  const monthlyEst = Math.round(property.price / 12);
  const depositEst = Math.round(property.price * 0.05);

  const whatsappUrl = getWhatsAppUrl(
    agent?.whatsapp ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+971500000000",
    getPropertyWhatsAppMessage(
      property.title,
      `https://dubaiestate.ae/properties/${property.slug}`
    )
  );

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setQuickSent(true);
  };

  return (
    <>
      <div className={cn("space-y-5", className)}>
        {/* Main Luxury Broker Card */}
        <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 sm:p-7 shadow-[0_4px_24px_rgba(44,32,24,0.06)] relative overflow-hidden">
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

          {/* Agent Dossier */}
          {agent && (
            <div className="flex items-center gap-4 pb-6 border-b border-sand-200/80">
              <div className="relative">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-xs flex-shrink-0">
                  <Image
                    src={agent.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"}
                    alt={`${agent.firstName} ${agent.lastName}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                {/* Active status pulse */}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" title="Online" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-primary font-semibold">
                    Luxury Advisor
                  </span>
                  <span className="text-sand-400">•</span>
                  <span className="text-[10px] text-text-muted font-mono">DLD BRN #48291</span>
                </div>
                <h3 className="font-display text-xl text-text font-medium truncate mt-0.5">
                  {agent.firstName} {agent.lastName}
                </h3>
                {agent.languages && agent.languages.length > 0 && (
                  <p className="text-2xs text-text-muted mt-0.5">
                    Speaks {agent.languages.join(" • ")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-3 pt-6">
            {/* WhatsApp - High Priority */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xs bg-[#1F7A4A] hover:bg-[#18663D] text-white font-medium text-sm tracking-wide shadow-xs transition-all duration-200"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Direct WhatsApp Inquiry</span>
            </a>

            {/* Schedule Private Tour */}
            <button
              type="button"
              onClick={() => setShowViewing(true)}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xs bg-primary hover:bg-primary-hover text-white font-medium text-sm tracking-wide shadow-xs transition-all duration-200 cursor-pointer"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Schedule Private Tour</span>
            </button>

            {/* Direct Call Advisor */}
            {agent && (
              <a
                href={`tel:${agent.phone || "+97145001234"}`}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-4 rounded-xs border border-sand-300 text-text hover:border-primary hover:text-primary bg-sand-50/50 hover:bg-white text-xs font-medium tracking-wide transition-colors"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-text-muted" />
                <span>Call Advisor: {agent.phone || "+971 4 500 1234"}</span>
              </a>
            )}
          </div>

          {/* Quick Instant Inquiry Box */}
          <div className="mt-6 pt-5 border-t border-sand-200/80">
            <div className="text-xs font-sans uppercase tracking-wider text-text-secondary font-semibold mb-3 flex items-center justify-between">
              <span>Send Instant Message</span>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-xs">15m response</span>
            </div>

            {quickSent ? (
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xs text-center text-xs text-emerald-800">
                <p className="font-semibold">Message Dispatched</p>
                <p className="text-2xs text-emerald-700 mt-0.5">Advisor {agent?.firstName || "Priya"} will WhatsApp you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-sand-200 rounded-xs bg-sand-50/40 text-text focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp Number"
                  required
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-sand-200 rounded-xs bg-sand-50/40 text-text focus:outline-none focus:border-primary focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sand-100 hover:bg-primary hover:text-white text-text font-medium text-xs tracking-wider uppercase rounded-xs transition-colors cursor-pointer border border-sand-200"
                >
                  Request Call Back
                </button>
              </form>
            )}
          </div>

          {/* Reference & Security Assurance */}
          <div className="mt-6 pt-4 border-t border-sand-200/60 flex items-center justify-between text-2xs text-text-muted font-mono">
            <span>Ref: {property._id?.slice(-8) || "PROPERTY"}</span>
            <span className="flex items-center gap-1 text-emerald-700 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Verified Listing
            </span>
          </div>
        </div>

        {/* Financial & Tenancy Snapshot Card */}
        <div className="bg-white border border-[#E5DFD7] rounded-sm p-6 shadow-xs space-y-4">
          <div className="text-xs font-mono uppercase tracking-[0.12em] text-text-muted font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {isRent ? "Rental Terms & Estimates" : "Financial Estimates"}
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-sand-100">
              <span className="text-text-muted">Estimated Monthly</span>
              <span className="font-semibold text-text font-mono">AED {monthlyEst.toLocaleString()} / mo</span>
            </div>

            {isRent ? (
              <>
                <div className="flex items-center justify-between py-1.5 border-b border-sand-100">
                  <span className="text-text-muted">Security Deposit (5%)</span>
                  <span className="font-medium text-text font-mono">AED {depositEst.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-sand-100">
                  <span className="text-text-muted">Cheque Options</span>
                  <span className="font-medium text-text">1, 2, or 4 Cheques</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-text-muted">Agency Commission</span>
                  <span className="text-emerald-700 font-semibold">0% Direct Listing</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between py-1.5 border-b border-sand-100">
                  <span className="text-text-muted">20% Down Payment</span>
                  <span className="font-medium text-text font-mono">AED {Math.round(property.price * 0.2).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-text-muted">Est. ROI / Yield</span>
                  <span className="text-emerald-700 font-semibold font-mono">7.2% Net Yield</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trust & Guarantee Badges */}
        <div className="bg-sand-50/80 border border-sand-200/60 rounded-sm p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-xs text-text">
            <CheckShieldIcon />
            <span className="font-medium">100% Authentic Title Deeds</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-text">
            <CheckShieldIcon />
            <span className="font-medium">RERA & DLD Registered Broker</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-text">
            <CheckShieldIcon />
            <span className="font-medium">Escrow Account Protected</span>
          </div>
        </div>
      </div>

      {/* Viewing Modal */}
      {showViewing && (
        <ViewingForm
          property={property}
          onClose={() => setShowViewing(false)}
        />
      )}
    </>
  );
}

/* ── MobileCTA (Sticky bottom bar) ──────────────────────────── */
export function MobileCTA({
  property,
  agent,
}: {
  property: Property;
  agent?: Agent;
}) {
  const [showViewing, setShowViewing] = React.useState(false);

  const whatsappUrl = getWhatsAppUrl(
    agent?.whatsapp ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+971500000000",
    getPropertyWhatsAppMessage(
      property.title,
      `https://dubaiestate.ae/properties/${property.slug}`
    )
  );

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-header bg-white/95 backdrop-blur-md border-t border-sand-200 px-4 py-3 flex items-center gap-2.5 lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-3 rounded-xs bg-[#1F7A4A] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => setShowViewing(true)}
          className="flex-1 py-3 px-3 rounded-xs bg-primary text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs"
        >
          <CalendarIcon className="w-4 h-4" />
          <span>Book Tour</span>
        </button>

        {agent && (
          <a
            href={`tel:${agent.phone || "+97145001234"}`}
            aria-label="Call advisor"
            className="w-11 h-11 rounded-xs border border-sand-300 flex items-center justify-center text-text hover:bg-sand-50"
          >
            <PhoneIcon className="w-4 h-4" />
          </a>
        )}
      </div>

      {showViewing && (
        <ViewingForm
          property={property}
          onClose={() => setShowViewing(false)}
        />
      )}
    </>
  );
}
