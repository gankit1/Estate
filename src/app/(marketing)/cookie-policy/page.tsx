import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Layout";
import { LegalHeaderNav } from "@/components/legal/LegalHeaderNav";
import { CookiePreferencesCenter } from "@/components/legal/CookiePreferencesCenter";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Pacific Star Realty Dubai",
  description:
    "Pacific Star Realty cookie policy. Understand how we use essential, analytics, and preference cookies to elevate your Dubai property discovery experience.",
  openGraph: {
    title: "Cookie Policy | Pacific Star Realty Dubai",
    description:
      "Interactive cookie preferences and telemetry policy for Pacific Star Realty web portal.",
    type: "website",
    locale: "en_AE",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="py-10 sm:py-14 lg:py-18 bg-background text-text">
      <Container className="max-w-4xl space-y-10">
        {/* Unified Legal Header & Navigation Tabs */}
        <LegalHeaderNav
          currentPath="/cookie-policy"
          badgeLabel="Transparent Cookie & Telemetry Governance"
          lastUpdated="November 2026"
        />

        {/* Title Section */}
        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight">
            Cookie Policy &amp; Tracking Preferences
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            We use essential, functionality, and performance cookies to ensure seamless navigation, preserve your regional currency preferences, and deliver institutional-grade Dubai property recommendations.
          </p>
        </div>

        {/* ── Interactive Preference Center Component ───────────────── */}
        <CookiePreferencesCenter />

        {/* ── Detailed Technical Cookie Table ────────────────────────── */}
        <section className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <span className="eyebrow block mb-1">Technical Transparency</span>
            <h3 className="font-display text-2xl text-text font-light">
              Inventory of Cookies Deployed on this Platform
            </h3>
            <p className="text-xs text-text-muted mt-1">
              Detailed technical specification of cookies utilized across our real estate discovery ecosystem.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50/70 text-text-muted uppercase text-2xs tracking-wider">
                  <th className="py-3 px-3 font-semibold">Cookie Identifier</th>
                  <th className="py-3 px-3 font-semibold">Category</th>
                  <th className="py-3 px-3 font-semibold">Duration</th>
                  <th className="py-3 px-3 font-semibold">Functional Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200/80">
                {[
                  {
                    name: "__psr_session",
                    cat: "Essential",
                    dur: "Session",
                    desc: "Maintains secure session state, CSRF token validation, and inquiry forms.",
                  },
                  {
                    name: "__psr_currency",
                    cat: "Functional",
                    dur: "1 Year",
                    desc: "Remembers user selection between AED, USD, EUR, and GBP valuations.",
                  },
                  {
                    name: "__psr_unit_pref",
                    cat: "Functional",
                    dur: "1 Year",
                    desc: "Preserves square feet (sqft) vs. square meter (sqm) measurement choice.",
                  },
                  {
                    name: "__psr_analytics_id",
                    cat: "Performance",
                    dur: "6 Months",
                    desc: "Anonymized aggregation of district guide and mortgage calculator usage.",
                  },
                ].map((c) => (
                  <tr key={c.name} className="hover:bg-sand-50/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-primary">
                      {c.name}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-sand-100 text-text text-2xs font-mono border border-sand-200">
                        {c.cat}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-text-muted font-mono">{c.dur}</td>
                    <td className="py-3 px-3 text-text-secondary text-2xs">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Browser Management Instructions ────────────────────────── */}
        <section className="space-y-4 text-xs sm:text-sm text-text-secondary">
          <h3 className="font-display text-xl text-navy-950 font-medium">
            How to Control Cookies Through Web Browser Settings
          </h3>
          <p className="leading-relaxed">
            Most modern web browsers permit users to review, filter, or erase stored cookies via browser privacy settings. You can find guidance for the most widely used browsers below:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { name: "Google Chrome", note: "Settings > Privacy and security > Cookies" },
              { name: "Apple Safari", note: "Preferences > Privacy > Block all cookies" },
              { name: "Mozilla Firefox", note: "Options > Privacy & Security > Cookies" },
              { name: "Microsoft Edge", note: "Settings > Cookies and site permissions" },
            ].map((b) => (
              <div key={b.name} className="bg-sand-50 border border-sand-200 p-3.5 rounded-xl text-center space-y-1">
                <span className="font-semibold text-text block text-xs">{b.name}</span>
                <span className="text-2xs text-text-muted block">{b.note}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
