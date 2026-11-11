import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Layout";
import { LegalHeaderNav } from "@/components/legal/LegalHeaderNav";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  Scale,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Pacific Star Realty Dubai",
  description:
    "Pacific Star Realty privacy policy. Learn how we safeguard your personal data, transaction confidentiality, and investor communications in compliance with UAE Federal Data Protection Laws.",
  openGraph: {
    title: "Privacy Policy | Pacific Star Realty Dubai",
    description:
      "Pacific Star Realty privacy policy and personal data governance in compliance with UAE Federal Decree-Law No. 45 of 2021.",
    type: "website",
    locale: "en_AE",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-10 sm:py-14 lg:py-18 bg-background text-text">
      <Container className="max-w-4xl space-y-10">
        {/* Unified Legal Header & Navigation Tabs */}
        <LegalHeaderNav
          currentPath="/privacy-policy"
          badgeLabel="UAE Federal Decree-Law No. 45 of 2021 (PDPL)"
          lastUpdated="November 2026"
        />

        {/* Title Section */}
        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight">
            Privacy Policy &amp; Data Governance
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Pacific Star Realty is committed to protecting the privacy, identity confidentiality, and financial data integrity of our private clients, international investors, and property owners in accordance with UAE Federal Data Protection legislation.
          </p>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-text-secondary">
          {/* Section 1 */}
          <section className="bg-sand-50/80 border border-sand-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-2xs">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-secondary" />
              1. Institutional Commitment to Client Confidentiality
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Pacific Star Realty (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates a licensed private real estate brokerage licensed under the Real Estate Regulatory Agency (RERA registration #12894) and the Dubai Land Department (DLD). We handle sensitive high-net-worth investor criteria, acquisition budgets, and sovereign identity records with institutional discretion in compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              2. Categories of Personal Data Collected
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              In the course of delivering real estate advisory, title deed conveyance, and off-plan allocation services, we may collect:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  title: "Identification Records",
                  desc: "Passport copy, UAE Emirates ID, residency visa status, and nationality.",
                },
                {
                  title: "Contact Information",
                  desc: "Verified mobile number, direct WhatsApp handle, and secure corporate email.",
                },
                {
                  title: "Investment Criteria",
                  desc: "Target master communities, capital budget brackets, yield preferences, and timeline.",
                },
                {
                  title: "KYC & AML Verification",
                  desc: "Source of funds declaration in compliance with UAE Financial Intelligence Unit standards.",
                },
                {
                  title: "Statutory Contract Data",
                  desc: "DLD Form A (Seller Agreement), Form B (Buyer Mandate), and Unified Ejari lease records.",
                },
                {
                  title: "Digital Session Telemetry",
                  desc: "IP address, geographical device location, and anonymous interaction analytics.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-surface border border-sand-200/80 p-4 rounded-2xl space-y-1 text-xs"
                >
                  <span className="font-semibold text-text flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {item.title}
                  </span>
                  <p className="text-text-muted leading-relaxed text-2xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              3. Purpose &amp; Lawful Basis of Processing
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              We process client information strictly under lawful contractual, regulatory, and legitimate advisory bases:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Execution of DLD Transactions:</strong> Lodging official buyer agreements (Form F), title deed transfers, and registration trustee bookings at Dubai Land Department offices.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Anti-Money Laundering (AML) Compliance:</strong> Complying with UAE Cabinet Decision No. 10 of 2019 regarding Anti-Money Laundering and Combating the Financing of Terrorism.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Developer VIP Allocations:</strong> Securing priority pre-launch reservation tokens with master developers (Emaar, Nakheel, Meraas, Sobha) on your explicit instruction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary font-bold">•</span>
                <span><strong>Bespoke Yield Intelligence:</strong> Generating custom cash-flow models, ROI projections, and Golden Visa eligibility assessments.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              4. Data Protection Standards &amp; Non-Disclosure
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              All digital records are secured behind enterprise AES-256 encryption at rest and TLS 1.3 in transit. We maintain strict internal role-based access protocols within our private advisory office.
            </p>
            <div className="bg-sand-100/70 p-4 rounded-2xl border border-sand-200 text-xs space-y-1">
              <span className="font-semibold text-text block">Zero Commercial Monetization:</span>
              <p className="text-text-muted">
                Pacific Star Realty never sells, leases, rents, or exchanges client contact data with third-party telemarketing call centers or unregulated lead generation brokers.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium">
              5. International Client Rights under UAE PDPL
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              As a data subject under UAE Personal Data Protection Law, you possess unconditional rights to:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-surface border border-sand-200 p-3.5 rounded-xl">
                <span className="font-semibold text-text block">Right to Access</span>
                <span className="text-2xs text-text-muted mt-1 block">Request a digital transcript of all personal records held on file.</span>
              </div>
              <div className="bg-surface border border-sand-200 p-3.5 rounded-xl">
                <span className="font-semibold text-text block">Right to Rectify</span>
                <span className="text-2xs text-text-muted mt-1 block">Update expired identity documents or modified contact coordinates.</span>
              </div>
              <div className="bg-surface border border-sand-200 p-3.5 rounded-xl">
                <span className="font-semibold text-text block">Right to Erasure</span>
                <span className="text-2xs text-text-muted mt-1 block">Request deletion subject to UAE statutory DLD real estate record retention laws.</span>
              </div>
            </div>
          </section>

          {/* Section 6: Contact Desk */}
          <section className="bg-sand-50/90 border border-sand-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
            <h2 className="font-display text-xl text-navy-950 font-medium flex items-center gap-2">
              <Building2 className="w-5 h-5 text-secondary" />
              6. Data Protection Officer (DPO) Contact Desk
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              To exercise your privacy rights, request an electronic data copy, or clarify institutional compliance protocols, contact our dedicated Data Protection Officer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-text-muted block text-2xs">Official Email</span>
                  <a href="mailto:legal@pacificstarrealty.com" className="font-semibold text-primary hover:underline">
                    legal@pacificstarrealty.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-text-muted block text-2xs">Direct Office Line</span>
                  <a href="tel:+97145001234" className="font-semibold text-primary hover:underline font-mono">
                    +971 4 500 1234
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <span className="text-text-muted block text-2xs">Private Office</span>
                  <span className="font-semibold text-text">Downtown Burj Khalifa, Dubai</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
