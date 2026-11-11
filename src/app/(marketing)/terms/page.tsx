import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Layout";
import { LegalHeaderNav } from "@/components/legal/LegalHeaderNav";
import {
  Scale,
  Building2,
  FileText,
  ShieldAlert,
  CheckCircle2,
  Banknote,
  FileCheck,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Pacific Star Realty Dubai",
  description:
    "Pacific Star Realty terms of service. Review terms governing our real estate brokerage, advisory consultations, off-plan bookings, and website usage under UAE RERA governance.",
  openGraph: {
    title: "Terms of Service | Pacific Star Realty Dubai",
    description:
      "Official RERA brokerage agreement and terms of service governing real estate transactions in the Emirate of Dubai.",
    type: "website",
    locale: "en_AE",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="py-10 sm:py-14 lg:py-18 bg-background text-text">
      <Container className="max-w-4xl space-y-10">
        {/* Unified Legal Header & Navigation Tabs */}
        <LegalHeaderNav
          currentPath="/terms"
          badgeLabel="RERA Broker License #12894 • DLD Regulatory Compliance"
          lastUpdated="November 2026"
        />

        {/* Title Section */}
        <div className="space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight">
            Terms of Service &amp; Brokerage Agreement
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            These terms govern your engagement with Pacific Star Realty, our website, and all advisory consultations, off-plan developer allocations, and secondary market brokerage transactions in Dubai, United Arab Emirates.
          </p>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-text-secondary">
          {/* Section 1 */}
          <section className="bg-sand-50/80 border border-sand-200 rounded-3xl p-6 sm:p-8 space-y-3 shadow-2xs">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2.5">
              <Scale className="w-5 h-5 text-secondary" />
              1. Regulatory Authority &amp; Licensure
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Pacific Star Realty is a licensed real estate brokerage operating under the statutory supervision of the Real Estate Regulatory Agency (RERA) and the Dubai Land Department (DLD), holding Commercial Trade License and RERA Registration #12894. All transactions adhere to UAE Law No. 7 of 2006 concerning Real Property Registration in the Emirate of Dubai.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              2. Property Listings &amp; Trakheesi Permit Verification
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              Every property advertised on this platform is verified with an official DLD Trakheesi advertising permit or backed by direct master developer agency mandates:
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm pt-1">
              <div className="bg-surface border border-sand-200 p-4 rounded-2xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-text block">Off-Plan Developments</span>
                  <p className="text-text-muted text-2xs mt-0.5 leading-relaxed">
                    Unit availability, architectural renderings, floor plans, and milestone payment schedules are subject to official developer updates (Emaar, Nakheel, Sobha, DAMAC, Meraas).
                  </p>
                </div>
              </div>
              <div className="bg-surface border border-sand-200 p-4 rounded-2xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-text block">Secondary Resale Market</span>
                  <p className="text-text-muted text-2xs mt-0.5 leading-relaxed">
                    Resale listings remain subject to prior sale, lease termination, or owner price revision until formal execution of Dubai Land Department Form F (Contract of Sale).
                  </p>
                </div>
              </div>
              <div className="bg-surface border border-sand-200 p-4 rounded-2xl flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-text block">Yield Calculations &amp; Projections</span>
                  <p className="text-text-muted text-2xs mt-0.5 leading-relaxed">
                    Rental yields (ROI) and historical growth figures reflect verified transaction data from the Dubai Land Department and do not represent a promissory return guarantee.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2">
              <Banknote className="w-5 h-5 text-secondary" />
              3. Brokerage Commission &amp; Statutory Fees
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              In accordance with standard Dubai Land Department guidelines and RERA brokerage schedules:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-sand-50/90 border border-sand-200 p-4 rounded-2xl space-y-1.5 shadow-2xs">
                <span className="font-semibold text-text block">Secondary Sales</span>
                <span className="font-mono text-primary font-bold text-sm block">2.0% Commission</span>
                <p className="text-2xs text-text-muted leading-relaxed">
                  Payable respectively by the buyer and seller (+ 5% UAE VAT) upon DLD title deed transfer.
                </p>
              </div>

              <div className="bg-sand-50/90 border border-sand-200 p-4 rounded-2xl space-y-1.5 shadow-2xs">
                <span className="font-semibold text-text block">Off-Plan Purchases</span>
                <span className="font-mono text-emerald-700 font-bold text-sm block">0% Buyer Commission</span>
                <p className="text-2xs text-text-muted leading-relaxed">
                  Direct developer allocation. Agency remuneration is covered directly by the master developer.
                </p>
              </div>

              <div className="bg-sand-50/90 border border-sand-200 p-4 rounded-2xl space-y-1.5 shadow-2xs">
                <span className="font-semibold text-text block">Residential Leasing</span>
                <span className="font-mono text-text font-bold text-sm block">5.0% Annual Rent</span>
                <p className="text-2xs text-text-muted leading-relaxed">
                  Payable by the tenant (+ 5% VAT) upon execution of the official Unified Ejari contract.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              4. Escrow Account Protections (Law No. 8 of 2007)
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              All client payments for off-plan real estate must be deposited directly into the designated RERA-audited Escrow trust account of the respective project. Pacific Star Realty never accepts off-plan principal property purchase funds into corporate brokerage accounts.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="font-display text-xl sm:text-2xl text-navy-950 font-medium">
              5. Governing Law &amp; Judicial Jurisdiction
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              These terms are governed by and construed in accordance with the federal laws of the United Arab Emirates and the local decrees of the Emirate of Dubai. Any dispute arising out of or in connection with real estate brokerage mandates shall be subject to the exclusive jurisdiction of the Dubai Courts or the Dubai International Financial Centre (DIFC) Courts.
            </p>
          </section>

          {/* Section 6 */}
          <section className="bg-sand-50 border border-sand-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <h2 className="font-display text-lg sm:text-xl text-navy-950 font-medium">
              6. Agency Inquiries &amp; Legal Notices
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Formal legal notices or contractual inquiries may be directed to our Chief Compliance Counsel:
            </p>
            <div className="text-xs sm:text-sm font-mono text-primary space-y-1 pt-1">
              <p>Email: legal@pacificstarrealty.com</p>
              <p>Office: Level 28, Downtown Burj Khalifa District, Dubai, UAE</p>
              <p>Official RERA Agency Registration: #12894</p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
