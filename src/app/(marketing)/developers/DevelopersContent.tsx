"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import {
  Building2,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Search,
  Star,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  Info,
  Calendar,
  Layers,
  Banknote,
  Send,
} from "lucide-react";
import { DEVELOPERS_DATA, type Developer } from "@/lib/data/developers-data";

export function DevelopersContent() {
  const [selectedTier, setSelectedTier] = React.useState<string>("All Developers");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDeveloper, setSelectedDeveloper] = React.useState<Developer | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [regName, setRegName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regDev, setRegDev] = React.useState("Emaar Properties");

  const tiers = [
    "All Developers",
    "Tier 1 Master Developer",
    "Master Waterfront Developer",
    "Ultra-Luxury & Branded",
    "Design-Led & Boutique",
  ];

  const filteredDevelopers = React.useMemo(() => {
    return DEVELOPERS_DATA.filter((dev) => {
      const matchesTier = selectedTier === "All Developers" || dev.tier === selectedTier;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dev.name.toLowerCase().includes(q) ||
        dev.tagline.toLowerCase().includes(q) ||
        dev.specialty.toLowerCase().includes(q) ||
        dev.flagshipCommunities.some((c) => c.toLowerCase().includes(q));

      return matchesTier && matchesSearch;
    });
  }, [selectedTier, searchQuery]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regName && regEmail) {
      setRegistrationSuccess(true);
    }
  };

  return (
    <div className="py-10 sm:py-14 lg:py-18 bg-background text-text">
      <Container className="space-y-12 sm:space-y-16">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-4 max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-text font-medium">Developers</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
            <span>Authorized Master Developer Agency Partner</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight">
            Dubai Master Developers Directory &amp; Agency Registry
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            Pacific Star Realty holds direct institutional agency agreements with Dubai&apos;s leading government-backed and premier private master developers. We ensure priority VIP launch allocations, 0% buyer commission, and direct developer payment plans.
          </p>
        </div>

        {/* ── Key Institutional Developer Guarantees ─────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              title: "Direct Developer Allocation",
              desc: "0% Buyer Commission",
              sub: "Transparent pricing directly from developer price books",
            },
            {
              title: "100% Escrow Protection",
              desc: "RERA Trust Accounts",
              sub: "Audited construction milestone release via Law No. 8",
            },
            {
              title: "VIP Pre-Launch Access",
              desc: "First-Tier Floor Plans",
              sub: "Early corner units, high floors & penthouse allocation",
            },
            {
              title: "Flexible Payment Terms",
              desc: "Up to 5 Years Post-Handover",
              sub: "Milestone-linked schedules without interest",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-sand-50/80 border border-sand-200 rounded-2xl p-4 sm:p-5 text-center space-y-1.5 shadow-2xs"
            >
              <span className="text-xs font-semibold text-text block">{item.title}</span>
              <span className="text-2xs font-mono font-bold text-primary block">{item.desc}</span>
              <span className="text-2xs text-text-muted block leading-relaxed">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* ── Interactive Search & Category Filter Bar ───────────────── */}
        <section className="space-y-6 pt-2" aria-labelledby="registry-heading">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div>
              <h2 id="registry-heading" className="font-display text-2xl sm:text-3xl text-text font-light">
                Developer Directory ({filteredDevelopers.length} Developers)
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Filter by developer classification or search by master community name
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search developer, area (e.g. Palm, Hills)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-xs rounded-full border-sand-300 bg-surface focus:ring-1 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-2xs text-text-muted hover:text-text cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Tier Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {tiers.map((t) => {
              const isSelected = selectedTier === t;
              const count =
                t === "All Developers"
                  ? DEVELOPERS_DATA.length
                  : DEVELOPERS_DATA.filter((d) => d.tier === t).length;

              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTier(t)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-white shadow-xs font-semibold"
                      : "bg-surface hover:bg-sand-100 text-text-secondary border border-sand-200"
                  }`}
                >
                  <span>{t}</span>
                  <span
                    className={`text-2xs font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-sand-200/70 text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Developer Cards Grid ─────────────────────────────────── */}
          {filteredDevelopers.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-sand-200 rounded-3xl p-8 space-y-4">
              <Building2 className="w-10 h-10 text-sand-400 mx-auto" />
              <h4 className="font-display text-xl text-text font-light">No developers found</h4>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                No developer records matched &ldquo;{searchQuery}&rdquo;. Try another name like &ldquo;Emaar&rdquo;, &ldquo;Sobha&rdquo;, or &ldquo;Palm&rdquo;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTier("All Developers");
                }}
                className="rounded-full text-xs mt-2"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredDevelopers.map((dev) => (
                <article
                  key={dev.slug}
                  className="bg-surface border border-sand-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Photo & Badges */}
                  <div className="relative aspect-[16/10] w-full bg-sand-200 overflow-hidden">
                    <Image
                      src={dev.image}
                      alt={dev.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-gold-300 border border-gold-400/30 text-2xs font-mono uppercase tracking-widest font-semibold shadow-xs">
                        {dev.tier}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-navy-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-2xs font-mono text-sand-100">
                      <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                      <span>{dev.handoverRating} / 5</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display text-2xl text-text font-light group-hover:text-primary transition-colors">
                          {dev.name}
                        </h3>
                        <span className="text-2xs font-mono text-text-muted">Est. {dev.founded}</span>
                      </div>

                      <p className="text-xs text-text-muted leading-relaxed">
                        {dev.tagline}
                      </p>

                      {/* Stat Metrics Box */}
                      <div className="bg-sand-50/90 p-3.5 rounded-2xl border border-sand-200/80 space-y-1.5 text-2xs">
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted">Delivered Units:</span>
                          <span className="font-mono font-semibold text-text">{dev.deliveredUnits}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted">Active Pipeline:</span>
                          <span className="font-mono font-semibold text-primary">{dev.activeProjectsCount} Projects</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-muted">Escrow Account:</span>
                          <span className="font-semibold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            RERA Regulated
                          </span>
                        </div>
                      </div>

                      {/* Flagship Communities */}
                      <div>
                        <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block mb-1.5">
                          Signature Master Communities:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {dev.flagshipCommunities.map((c, i) => (
                            <span
                              key={i}
                              className="text-2xs bg-sand-100 text-text-secondary px-2.5 py-0.5 rounded-md border border-sand-200/60 font-mono"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Typical Payment Structure */}
                      <div className="pt-1">
                        <span className="text-2xs text-text-muted flex items-center gap-1">
                          <Banknote className="w-3.5 h-3.5 text-secondary" />
                          <span className="font-medium">Payment Plan:</span> {dev.typicalPaymentPlan}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-sand-200/80 flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        asChild
                        className="rounded-xl text-xs bg-primary text-white hover:bg-primary-hover shadow-xs cursor-pointer"
                      >
                        <Link
                          href={`/new-projects?q=${encodeURIComponent(dev.name)}`}
                          className="flex items-center justify-center gap-1.5"
                        >
                          Explore {dev.name} Projects
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={() => setSelectedDeveloper(dev)}
                        className="rounded-xl text-xs border-sand-300 text-text shrink-0 cursor-pointer"
                      >
                        Dossier
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── Developer Comparison Matrix Table ──────────────────────── */}
        <section className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
          <div>
            <span className="eyebrow block mb-1.5">Market Intelligence</span>
            <h3 className="font-display text-2xl sm:text-3xl text-text font-light tracking-tight">
              Dubai Master Developer Comparative Matrix
            </h3>
            <p className="text-xs sm:text-sm text-text-muted max-w-2xl mt-1">
              Compare developer specializations, typical payment plan terms, and RERA delivery track records across prime Dubai zones.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50/70 text-text-muted uppercase text-2xs tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Developer Name</th>
                  <th className="py-3.5 px-4 font-semibold">Classification</th>
                  <th className="py-3.5 px-4 font-semibold">Delivered Units</th>
                  <th className="py-3.5 px-4 font-semibold">Signature Specialization</th>
                  <th className="py-3.5 px-4 font-semibold">Standard Payment Terms</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Handover Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-200/80">
                {DEVELOPERS_DATA.map((dev) => (
                  <tr key={dev.slug} className="hover:bg-sand-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-text whitespace-nowrap">
                      {dev.name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-text-secondary text-2xs font-mono border border-sand-200/60 whitespace-nowrap">
                        {dev.tier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-primary font-medium">
                      {dev.deliveredUnits}
                    </td>
                    <td className="py-3.5 px-4 text-text-muted">
                      {dev.specialty}
                    </td>
                    <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                      {dev.typicalPaymentPlan}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-emerald-700 text-right">
                      {dev.handoverRating} / 5.0
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Pre-Launch VIP Developer Allocation Registration Form ───── */}
        <section className="bg-sand-50 border border-sand-200 rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="text-2xs uppercase tracking-widest text-primary font-mono font-semibold block">
                Direct Agency Allocations
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-navy-950 font-light tracking-tight">
                Register for VIP Developer Launch Allocations
              </h3>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Secure your priority token before public queue releases. Select your preferred master developer to receive immediate inventory updates and confidential price matrices.
              </p>
            </div>

            {registrationSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-display text-lg font-medium">VIP Allocation Token Registered</h4>
                <p className="text-xs text-emerald-700">
                  Thank you, {regName}. A Senior Developer Relations Director from Pacific Star Realty has been assigned to your profile for upcoming {regDev} releases.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="bg-surface p-6 sm:p-8 rounded-2xl border border-sand-200 shadow-2xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-2xs font-semibold text-text uppercase tracking-wider">
                      Full Legal Name
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Alexander Hamilton"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="text-xs rounded-xl border-sand-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-2xs font-semibold text-text uppercase tracking-wider">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="e.g. alex@familyoffice.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="text-xs rounded-xl border-sand-300"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-2xs font-semibold text-text uppercase tracking-wider">
                    Target Master Developer
                  </label>
                  <select
                    value={regDev}
                    onChange={(e) => setRegDev(e.target.value)}
                    className="w-full text-xs rounded-xl border border-sand-300 p-2.5 bg-surface text-text focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {DEVELOPERS_DATA.map((d) => (
                      <option key={d.slug} value={d.name}>
                        {d.name} ({d.tier})
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  type="submit"
                  className="rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-hover shadow-xs cursor-pointer py-3"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Request Pre-Launch VIP Reservation Token
                </Button>

                <p className="text-2xs text-text-muted text-center">
                  Protected under UAE RERA Agency Broker License #12894. 100% Confidential.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ── Developer Dossier Modal / Detail Drawer ─────────────────── */}
        {selectedDeveloper && (
          <div
            className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedDeveloper(null)}
          >
            <div
              className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-xl space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-2xs font-mono uppercase tracking-widest text-secondary font-semibold">
                    {selectedDeveloper.tier}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-text font-light">
                    {selectedDeveloper.name}
                  </h3>
                  <span className="text-2xs text-text-muted font-mono">
                    Established in {selectedDeveloper.founded}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDeveloper(null)}
                  className="w-8 h-8 rounded-full bg-sand-100 text-text-muted hover:text-text flex items-center justify-center text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {selectedDeveloper.highlight}
              </p>

              <div className="space-y-3 bg-sand-50 p-4 rounded-2xl border border-sand-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-muted">Total Handed-Over Units:</span>
                  <span className="font-mono font-semibold text-text">{selectedDeveloper.deliveredUnits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">RERA Escrow Trustee:</span>
                  <span className="font-medium text-text">{selectedDeveloper.escrowTrustee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Typical Payment Terms:</span>
                  <span className="font-mono font-semibold text-primary">{selectedDeveloper.typicalPaymentPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Handover Satisfaction Rating:</span>
                  <span className="font-mono font-semibold text-emerald-700">{selectedDeveloper.handoverRating} / 5.0</span>
                </div>
              </div>

              <div>
                <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block mb-2">
                  Signature Completed &amp; Active Developments:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDeveloper.signatureProjects.map((proj, idx) => (
                    <span
                      key={idx}
                      className="text-2xs bg-sand-100 text-text px-2.5 py-1 rounded-md border border-sand-200 font-mono"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  asChild
                  className="rounded-xl text-xs bg-primary text-white hover:bg-primary-hover shadow-xs"
                >
                  <Link href={`/new-projects?q=${encodeURIComponent(selectedDeveloper.name)}`}>
                    Browse Available Projects
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setSelectedDeveloper(null)}
                  className="rounded-xl text-xs border-sand-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Bottom Advisory Banner ─────────────────────────────────── */}
        <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-md">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-2xs uppercase tracking-widest text-gold-300 font-mono font-semibold">
              Pre-Launch VIP Allocations
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-sand-50">
              Access Private Developer Inventory Before Public Launch
            </h3>
            <p className="text-sand-300 text-xs sm:text-sm leading-relaxed">
              Skip queues and secure prime corner units, penthouse inventory, and private waterfront mansions directly through our senior advisory desk.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                asChild
                className="rounded-full bg-secondary text-navy-950 hover:bg-gold-300 font-semibold text-xs px-6 py-2.5 shadow-sm cursor-pointer"
              >
                <Link href="/contact">Register for Developer Pre-Launches</Link>
              </Button>
              <Button
                variant="outline"
                size="md"
                asChild
                className="rounded-full border-sand-400 text-sand-100 hover:bg-white/10 text-xs px-6 py-2.5 cursor-pointer"
              >
                <Link href="/new-projects">View Off-Plan Projects</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

