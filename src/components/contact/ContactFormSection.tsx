"use client";

import * as React from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button/Button";

interface ContactFormSectionProps {
  className?: string;
}

type InquiryType = "acquisition" | "investment" | "sell" | "general";

export function ContactFormSection({ className }: ContactFormSectionProps) {
  const [inquiryType, setInquiryType] = React.useState<InquiryType>("acquisition");
  const [submitted, setSubmitted] = React.useState(false);

  // Form states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [preferredMethod, setPreferredMethod] = React.useState<"whatsapp" | "phone" | "email">("whatsapp");
  const [budget, setBudget] = React.useState("2m-5m");
  const [area, setArea] = React.useState("downtown-dubai");
  const [timeline, setTimeline] = React.useState("immediate");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const inquiryTypes: { id: InquiryType; label: string; desc: string }[] = [
    { id: "acquisition", label: "Property Acquisition", desc: "Buying ready or off-plan luxury residences" },
    { id: "investment", label: "Investment & Golden Visa", desc: "High-yield cashflow & 10-Yr residency" },
    { id: "sell", label: "List / Sell Property", desc: "Confidential valuation & private marketing" },
    { id: "general", label: "General & Press", desc: "Corporate partnerships & media requests" },
  ];

  return (
    <div
      className={cn(
        "bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden",
        className
      )}
    >
      {/* Decorative top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-primary border border-secondary/30 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              Direct Senior Partner Access
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
              Submit a Private Inquiry
            </h2>
            <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-xl">
              Fill in your details below. Your inquiry is treated with complete confidentiality and assigned directly to a specialized Senior Partner.
            </p>
          </div>

          {submitted ? (
            <div className="bg-sand-50 border border-sand-200 rounded-3xl p-8 sm:p-10 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-2xl font-light text-text">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-text">{name || "Valued Client"}</span>. Your inquiry regarding <span className="font-semibold text-primary">{inquiryType.toUpperCase()}</span> has been assigned to our Senior Private Client Director.
                </p>
              </div>

              <div className="bg-surface border border-sand-200 p-4 rounded-2xl text-2xs text-text-muted space-y-2 max-w-md mx-auto text-left">
                <div className="flex justify-between items-center pb-2 border-b border-sand-100">
                  <span className="font-semibold text-text">Follow-up Commitment:</span>
                  <span className="font-mono font-bold text-emerald-700">&lt; 15 Minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Preferred Contact:</span>
                  <span className="font-semibold text-text uppercase">{preferredMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Direct Notification:</span>
                  <span className="font-mono text-text">{email}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971501234567"}?text=Hello%20Pacific%20Star%20Realty,%20I%20just%20submitted%20an%20inquiry%20regarding%20${inquiryType}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open Fast-Track WhatsApp</span>
                </a>
                <Button variant="outline" size="sm" onClick={handleReset} className="w-full sm:w-auto text-xs">
                  Submit Another Inquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Inquiry Category Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text block">
                  1. Select Inquiry Nature
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInquiryType(type.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                        inquiryType === type.id
                          ? "bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20"
                          : "bg-sand-50/70 hover:bg-sand-50 border-sand-200 text-text"
                      )}
                    >
                      <span className="text-xs font-semibold block leading-tight">
                        {type.label}
                      </span>
                      <span
                        className={cn(
                          "text-3xs mt-1 block line-clamp-1",
                          inquiryType === type.id ? "text-sand-200" : "text-text-muted"
                        )}
                      >
                        {type.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Client Personal Details */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-text block">
                  2. Your Details &amp; Contact Preferences
                </label>

                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Legal Name *"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp (+Country Code) *"
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                    />
                  </div>
                </div>

                {/* Preferred Communication Channel */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-2xs font-semibold text-text-muted">
                    Preferred Response Via:
                  </span>
                  <div className="flex gap-2">
                    {[
                      { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                      { id: "phone", label: "Phone Call", icon: Phone },
                      { id: "email", label: "Email", icon: Mail },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPreferredMethod(item.id as typeof preferredMethod)}
                        className={cn(
                          "px-2.5 py-1 text-2xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1",
                          preferredMethod === item.id
                            ? "bg-primary text-white border-primary shadow-2xs font-semibold"
                            : "bg-surface hover:bg-sand-50 border-sand-200 text-text"
                        )}
                      >
                        <item.icon className="w-3 h-3" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Scope & Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-2xs font-semibold text-text block mb-1">
                    Planned Capital
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="under-2m">Under AED 2.0M</option>
                    <option value="2m-5m">AED 2.0M – 5.0M (Golden Visa)</option>
                    <option value="5m-10m">AED 5.0M – 10.0M Prime</option>
                    <option value="above-10m">AED 10.0M+ Ultra Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="text-2xs font-semibold text-text block mb-1">
                    Target Community
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="downtown-dubai">Downtown Dubai</option>
                    <option value="dubai-marina">Dubai Marina</option>
                    <option value="palm-jumeirah">Palm Jumeirah</option>
                    <option value="dubai-hills-estate">Dubai Hills Estate</option>
                    <option value="dubai-creek-harbour">Dubai Creek Harbour</option>
                    <option value="business-bay">Business Bay</option>
                    <option value="jumeirah-village-circle">Jumeirah Village Circle (JVC)</option>
                    <option value="other">Flexible / Advisory Needed</option>
                  </select>
                </div>

                <div>
                  <label className="text-2xs font-semibold text-text block mb-1">
                    Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-sand-200 bg-sand-50/50 text-text focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                  >
                    <option value="immediate">Immediate (&lt; 30 Days)</option>
                    <option value="1-3-months">1 – 3 Months</option>
                    <option value="3-6-months">3 – 6 Months</option>
                    <option value="exploring">Market Research Only</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-2xs font-semibold text-text block mb-1">
                  Specific Requirements or Property Inquiries (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Inquiring about 3-bedroom beachfront penthouses or off-plan payment plans in Creek Harbour eligible for 06-Year Golden Visa..."
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-sand-50/50 text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center text-xs sm:text-sm font-semibold tracking-wide py-3 shadow-md"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Dispatch Private Client Inquiry
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-3xs text-text-muted">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Strict NDA Discretion Assured. Zero unsolicited sales calls or data sharing.</span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Direct Channels Card (5 cols) */}
        <div className="lg:col-span-5 bg-navy-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div
            className="absolute -right-12 -top-12 w-48 h-48 bg-secondary/15 rounded-full blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-6 relative z-10">
            <div>
              <span className="text-2xs font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5 mb-1">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Executive Contact Desk
              </span>
              <h3 className="font-display text-2xl font-light text-white leading-tight">
                Immediate Communication Channels
              </h3>
              <p className="text-xs text-sand-200 mt-1 leading-relaxed">
                Reach our central advisory team directly for immediate assistance, off-market listings, or urgent viewing requests.
              </p>
            </div>

            {/* Direct Contact Blocks */}
            <div className="space-y-3">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? "+97145001234"}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center shrink-0 border border-secondary/30">
                  <Phone className="w-5 h-5 text-secondary" />
                </span>
                <div>
                  <span className="text-3xs uppercase tracking-wider text-sand-300 block">
                    Main Advisory Switchboard
                  </span>
                  <span className="font-mono text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                    {process.env.NEXT_PUBLIC_PHONE ?? "+971 4 500 1234"}
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971501234567"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-950/60 transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-200" />
                </span>
                <div>
                  <span className="text-3xs uppercase tracking-wider text-emerald-300 block">
                    Direct WhatsApp Concierge (24/7)
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-100 group-hover:text-emerald-300 transition-colors">
                    +971 50 123 4567
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL ?? "hello@pacificstarrealty.com"}`}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <span className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center shrink-0 border border-secondary/30">
                  <Mail className="w-5 h-5 text-secondary" />
                </span>
                <div>
                  <span className="text-3xs uppercase tracking-wider text-sand-300 block">
                    Private Client Email Desk
                  </span>
                  <span className="font-mono text-xs font-bold text-white group-hover:text-gold-300 transition-colors truncate block">
                    {process.env.NEXT_PUBLIC_EMAIL ?? "hello@pacificstarrealty.com"}
                  </span>
                </div>
              </a>
            </div>

            {/* Operating Hours */}
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2 text-2xs">
              <div className="flex items-center gap-2 text-sand-200 font-semibold">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                <span>Executive Office Working Hours</span>
              </div>
              <div className="flex justify-between text-sand-300">
                <span>Monday – Friday:</span>
                <span className="font-mono text-white">9:00 AM – 7:00 PM GST</span>
              </div>
              <div className="flex justify-between text-sand-300">
                <span>Saturday:</span>
                <span className="font-mono text-white">10:00 AM – 5:00 PM GST</span>
              </div>
              <div className="flex justify-between text-sand-300">
                <span>Sunday:</span>
                <span className="font-mono text-secondary">Private Bookings Only</span>
              </div>
            </div>
          </div>

          {/* RERA Regulatory note */}
          <div className="pt-4 border-t border-white/10 text-3xs text-sand-200/80 relative z-10 flex justify-between items-center">
            <span>RERA Registered ORN: 12480</span>
            <span>Dubai Land Dept Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
