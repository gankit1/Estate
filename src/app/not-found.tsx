"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Search,
  Compass,
  Building2,
  ArrowRight,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/properties?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/properties");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-text selection:bg-secondary/20 selection:text-primary">
      <Header />
      <main className="flex-1 flex flex-col justify-center relative overflow-hidden py-16 lg:py-24">
        {/* Subtle Luxury Radial Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <Container className="relative z-10 max-w-4xl text-center space-y-10">
          {/* Eyebrow & Graphic Badge */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-semibold shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-secondary" />
              <span>404 • Property Off the Market or Unlisted Address</span>
            </div>

            {/* Large Architectural 404 Heading */}
            <div className="relative inline-block">
              <span className="font-display text-7xl sm:text-8xl md:text-9xl font-light tracking-tight text-sand-300/80 block select-none">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl text-text font-light tracking-tight">
                  Address Not Found
                </span>
              </div>
            </div>

            <p className="text-text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              The residence, community, or off-plan development you are searching for might have been sold, leased, or relocated to a new address.
            </p>
          </div>

          {/* ── Primary Action Buttons (Clear Option to Home Page) ──── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              asChild
              className="rounded-full px-8 py-3 text-sm font-semibold bg-primary text-white hover:bg-primary-hover shadow-md w-full sm:w-auto justify-center cursor-pointer"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-4 h-4 text-secondary" />
                Return to Home Page
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full px-6 py-3 text-sm font-medium border-sand-300 text-text hover:bg-sand-100 w-full sm:w-auto justify-center cursor-pointer"
            >
              <Link href="/properties?purpose=sale" className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Browse Properties for Sale
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              asChild
              className="rounded-full px-6 py-3 text-sm font-medium text-text-secondary hover:text-primary w-full sm:w-auto justify-center cursor-pointer"
            >
              <Link href="/new-projects" className="flex items-center gap-1.5">
                New Off-Plan Launches
                <ArrowRight className="w-4 h-4 text-secondary" />
              </Link>
            </Button>
          </div>

          {/* ── Inline Property Search Form ─────────────────────────── */}
          <div className="max-w-xl mx-auto bg-surface border border-sand-200/90 rounded-2xl p-2 sm:p-2.5 shadow-sm">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <Input
                  type="text"
                  placeholder="Search by area, developer, or project (e.g. Palm Jumeirah, Emaar, Creek)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 sm:h-11 text-xs sm:text-sm bg-sand-50/50 border-none shadow-none focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="rounded-xl px-4 h-10 text-xs font-semibold bg-primary text-white hover:bg-primary-hover shrink-0 cursor-pointer"
              >
                Find
              </Button>
            </form>
          </div>

          {/* ── Popular Destinations Grid ───────────────────────────── */}
          <div className="pt-6 border-t border-sand-200/70 text-left">
            <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block text-center mb-4">
              Or Explore Dubai&apos;s Most Popular Luxury Destinations
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  name: "Dubai Marina",
                  href: "/areas/dubai-marina",
                  desc: "Waterfront Riviera & Superyachts",
                  stat: "6.8% Yield",
                },
                {
                  name: "Downtown Dubai",
                  href: "/areas/downtown-dubai",
                  desc: "Burj Khalifa & Opera District",
                  stat: "+15.8% Growth",
                },
                {
                  name: "Palm Jumeirah",
                  href: "/areas/palm-jumeirah",
                  desc: "Private Island Beach Mansions",
                  stat: "Prime Luxury",
                },
                {
                  name: "Dubai Hills Estate",
                  href: "/areas/dubai-hills-estate",
                  desc: "Championship Golf & Villas",
                  stat: "Family Choice",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-3.5 rounded-xl bg-surface border border-sand-200/90 hover:border-primary/40 hover:shadow-xs transition-all block group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-semibold text-text group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-sand-100 text-primary">
                      {item.stat}
                    </span>
                  </div>
                  <p className="text-2xs text-text-muted truncate">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* ── VIP Real Estate Concierge Helpdesk ──────────────────── */}
          <div className="pt-2 text-center text-xs text-text-muted flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Need help finding an exclusive off-market property?
            </span>
            <a
              href="tel:+97144000000"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
            >
              <Phone className="w-3.5 h-3.5 text-secondary" />
              Call Private Office: +971 4 400 0000
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
