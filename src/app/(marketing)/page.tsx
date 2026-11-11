"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge/Badge";
import { CustomSelect } from "@/components/ui/Select";
import { Container, Section, SectionHeader, Divider } from "@/components/layout/Layout";
import {
  formatPrice,
  formatArea,
  formatBedrooms,
} from "@/lib/utils/format";
import { getWhatsAppUrl } from "@/lib/utils/search";
import { getFeaturedProperties } from "@/lib/api/propertyService";
import type { Property } from "@/types";

/* ── Animation helpers ──────────────────────────────────────── */
// Use direct initial/animate/transition props to avoid Variants type issues
const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function motionFadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_EXPO, delay },
  } as const;
}

function motionFadeIn(delay = 0) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  } as const;
}

function motionFadeUpViewport(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px" },
    transition: { duration: 0.6, ease: EASE_EXPO, delay },
  } as const;
}

/* ── Mock data (to be replaced by API calls in Phase 4) ─────── */
const mockFeaturedProperties = [
  {
    id: "1",
    slug: "azure-residences-dubai-marina",
    title: "Azure Residences",
    location: "Dubai Marina",
    price: 2850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1420,
    propertyType: "apartment" as const,
    purpose: "sale" as const,
    status: "ready" as const,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    badge: "Featured",
  },
  {
    id: "2",
    slug: "palm-serenity-villa",
    title: "Palm Serenity Villa",
    location: "Palm Jumeirah",
    price: 14500000,
    bedrooms: 5,
    bathrooms: 6,
    area: 7200,
    propertyType: "villa" as const,
    purpose: "sale" as const,
    status: "ready" as const,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    badge: "Exclusive",
  },
  {
    id: "3",
    slug: "downtown-skyline-penthouse",
    title: "Downtown Skyline Penthouse",
    location: "Downtown Dubai",
    price: 8200000,
    bedrooms: 3,
    bathrooms: 4,
    area: 3100,
    propertyType: "penthouse" as const,
    purpose: "sale" as const,
    status: "ready" as const,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    badge: "New Listing",
  },
];

const mockProjects = [
  {
    id: "1",
    slug: "emaar-harbour-views",
    name: "Harbour Views",
    developer: "Emaar Properties",
    location: "Dubai Creek Harbour",
    startingPrice: 1850000,
    handoverDate: "2026-12-01",
    image: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=800&q=80",
    status: "under-construction" as const,
  },
  {
    id: "2",
    slug: "damac-hills-2-townhouses",
    name: "Hills 2 Townhouses",
    developer: "DAMAC Properties",
    location: "DAMAC Hills 2",
    startingPrice: 720000,
    handoverDate: "2027-06-01",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    status: "upcoming" as const,
  },
  {
    id: "3",
    slug: "sobha-one-riverside-tower",
    name: "One Riverside Tower",
    developer: "Sobha Realty",
    location: "Mohammed Bin Rashid City",
    startingPrice: 2100000,
    handoverDate: "2027-03-01",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    status: "under-construction" as const,
  },
];

const mockAreas = [
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    description: "Vibrant waterfront living with stunning canal views",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    avgPrice: 1850000,
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    description: "Iconic address home to the Burj Khalifa",
    image: "https://images.unsplash.com/photo-1546412414-8035e1776c9a?w=800&q=80",
    avgPrice: 2400000,
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    description: "World-famous island with beachfront residences",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    avgPrice: 4200000,
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    description: "Dynamic urban hub blending work and lifestyle",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    avgPrice: 1600000,
  },
];

const trustStats = [
  { value: "1,200+", label: "Properties Sold" },
  { value: "15+", label: "Years in Dubai" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "AED 3.2B+", label: "Total Transaction Value" },
];

const whyUsPoints = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "RERA Licensed Brokerage",
    description: "Fully regulated by the Real Estate Regulatory Agency. Every transaction is transparent, legal, and protected.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Expert Local Agents",
    description: "Our multilingual team has deep knowledge of every Dubai neighbourhood, price trend, and off-plan opportunity.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "End-to-End Service",
    description: "From initial search to handover keys, we manage every step — viewings, negotiations, paperwork, and registration.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "International Reach",
    description: "We serve buyers and investors from over 50 countries, with support in English, Arabic, Russian, and more.",
  },
];

const mockTestimonials = [
  {
    id: "1",
    name: "James Whitfield",
    location: "London, United Kingdom",
    text: "The team made buying an off-plan apartment in Dubai Marina completely seamless. They guided me through every step, explained the payment plan clearly, and were available anytime I had a question.",
    property: "2BR Apartment, Dubai Marina",
    rating: 5,
  },
  {
    id: "2",
    name: "Priya Nair",
    location: "Mumbai, India",
    text: "As an international investor, I was nervous about buying in Dubai remotely. The team arranged virtual viewings, handled all paperwork, and I now have a beautiful property earning great rental yield.",
    property: "Villa, Damac Hills",
    rating: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    location: "Hong Kong",
    text: "Exceptional service. They understood my investment goals immediately and found me two off-plan units with strong fundamentals. The entire process took just 3 weeks.",
    property: "2 Units, Creek Harbour",
    rating: 5,
  },
];

/* ════════════════════════════════════════════════════════════
   HOMEPAGE SECTIONS
   ════════════════════════════════════════════════════════════ */

const heroViews = [
  {
    id: "downtown",
    label: "Downtown & Burj Khalifa",
    sub: "Iconic City Skyline",
    src: "/images/hero-dubai-downtown.jpg",
    alt: "Downtown Dubai skyline with Burj Khalifa illuminated at golden twilight",
  },
  {
    id: "marina",
    label: "Dubai Marina Waterfront",
    sub: "Yacht Club & Promenade",
    src: "/images/hero-dubai.jpg",
    alt: "Dubai Marina sparkling waterfront with luxury yachts and golden glass towers",
  },
  {
    id: "palm",
    label: "Palm Jumeirah",
    sub: "Beachfront Island Living",
    src: "/images/hero-dubai-palm.jpg",
    alt: "Palm Jumeirah luxury waterfront aerial overlooking Arabian Gulf",
  },
  {
    id: "villa",
    label: "Private Luxury Villas",
    sub: "Architectural Estates",
    src: "/images/hero-dubai-villa.jpg",
    alt: "Contemporary ultra-luxury private villa estate with infinity pool and palm trees",
  },
] as const;

/* ── 1. Hero Section ────────────────────────────────────────── */
function HeroSection() {
  const prefersReduced = useReducedMotion();
  const [activeViewIndex, setActiveViewIndex] = React.useState(0);
  const whatsappUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971501234567",
    "Hi, I'm interested in learning about prime luxury properties in Dubai."
  );

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-navy-950"
      aria-label="Hero"
    >
      {/* Background Images with smooth cross-fade */}
      {heroViews.map((view, idx) => (
        <div
          key={view.id}
          className={cn(
            "absolute inset-0 transition-opacity ease-in-out pointer-events-none",
            idx === activeViewIndex ? "opacity-100 scale-100 z-0" : "opacity-0 scale-105 -z-10"
          )}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1200ms" }}
        >
          <Image
            src={view.src}
            alt={view.alt}
            fill
            priority={idx === 0}
            fetchPriority={idx === 0 ? "high" : "low"}
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      {/* Cinematic Luxury Overlays */}
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(7, 18, 36, 0.92) 0%, rgba(7, 18, 36, 0.78) 38%, rgba(7, 18, 36, 0.45) 68%, rgba(7, 18, 36, 0.22) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none z-1"
        style={{
          background:
            "linear-gradient(180deg, rgba(7, 18, 36, 0.6) 0%, transparent 25%, transparent 70%, rgba(7, 18, 36, 0.92) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <Container className="relative z-10 pt-32 pb-24 lg:pt-36 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Hero Column (7 cols) */}
          <div className="lg:col-span-7 max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              {...(prefersReduced ? {} : motionFadeUp(0))}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-900/75 border border-secondary/40 backdrop-blur-md mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" aria-hidden />
                <span className="text-2xs sm:text-xs font-semibold uppercase tracking-widest text-secondary">
                  Pacific Star Realty • Dubai Private Office
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...(prefersReduced ? {} : motionFadeUp(0.12))}
              className="font-display font-light text-warm-white leading-[1.08] mb-6 tracking-tight drop-shadow-md"
              style={{ fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)" }}
            >
              Find Your Place
              <br />
              <span className="italic font-light text-secondary">
                in Dubai&apos;s Finest
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...(prefersReduced ? {} : motionFadeUp(0.24))}
              className="text-base sm:text-lg text-sand-100/90 leading-relaxed mb-8 sm:mb-10 max-w-xl drop-shadow-sm font-normal"
            >
              Curated luxury residences, waterfront penthouses, and private estates across Dubai&apos;s most prestigious addresses. Licensed RERA advisory with institutional discretion.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...(prefersReduced ? {} : motionFadeUp(0.36))}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                className="bg-secondary hover:bg-secondary-hover text-navy-950 font-semibold px-7 py-3.5 shadow-lg shadow-secondary/20 hover:shadow-secondary/30 transition-all border-0 rounded-xl text-sm"
                asChild
              >
                <Link href="/properties">
                  Explore Properties
                  <svg className="w-4 h-4 ml-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-warm-white border border-warm-white/35 hover:border-warm-white hover:bg-white/10 hover:text-warm-white backdrop-blur-md px-6 py-3.5 rounded-xl text-sm transition-all"
                asChild
              >
                <Link href="/new-projects">Exclusive Off-Plan</Link>
              </Button>
            </motion.div>

            {/* Trust Mini Strip & WhatsApp */}
            <motion.div
              {...(prefersReduced ? {} : motionFadeIn(0.5))}
              className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3.5 gap-x-5 text-2xs sm:text-xs text-sand-200/90"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sand-100 hover:text-white transition-colors group"
              >
                <span className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 transition-colors shadow-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <span className="font-medium underline underline-offset-4 decoration-emerald-400/50 group-hover:decoration-emerald-400">
                  Instant WhatsApp VIP Advisory
                </span>
              </a>

              <span className="hidden sm:inline text-white/30">•</span>

              <span className="flex items-center gap-1.5 text-sand-300">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                RERA Lic. #12894
              </span>

              <span className="hidden sm:inline text-white/30">•</span>

              <span className="flex items-center gap-1.5 text-sand-300">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                AED 3.2B+ Transacted
              </span>
            </motion.div>
          </div>

          {/* Interactive Landmark Perspective Switcher (5 cols, right side) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3 mt-4 lg:mt-0">
            <motion.div
              {...(prefersReduced ? {} : motionFadeIn(0.55))}
              className="bg-navy-950/80 border border-white/20 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl w-full max-w-md shadow-2xl space-y-2.5"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-2xs uppercase tracking-wider text-sand-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Curated Prime Perspectives
                </span>
                <span className="text-secondary font-mono text-3xs">
                  {activeViewIndex + 1} / {heroViews.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {heroViews.map((view, idx) => {
                  const isCurrent = idx === activeViewIndex;
                  return (
                    <button
                      key={view.id}
                      type="button"
                      onClick={() => setActiveViewIndex(idx)}
                      className={cn(
                        "p-2.5 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between",
                        isCurrent
                          ? "bg-secondary/20 border-secondary text-white shadow-xs"
                          : "bg-white/5 border-white/10 text-sand-300 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs font-semibold leading-tight line-clamp-1",
                          isCurrent ? "text-secondary" : "text-sand-100"
                        )}
                      >
                        {view.label}
                      </span>
                      <span className="text-3xs text-sand-300 mt-0.5 line-clamp-1">
                        {view.sub}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-3xs text-sand-300/80 pt-1 flex items-center justify-between">
                <span>Select to tour Dubai&apos;s iconic flagship corridors</span>
                <span className="text-secondary font-medium">Ultra-Luxury</span>
              </p>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10 hidden sm:flex"
        aria-hidden
      >
        <span className="text-2xs text-sand-300 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-sand-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ── 2. Search Bar ──────────────────────────────────────────── */
const propertyTypeOptions = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
];

const bedroomOptions = [
  { value: "", label: "Any Beds" },
  { value: "0", label: "Studio" },
  { value: "1", label: "1 Bedroom" },
  { value: "2", label: "2 Bedrooms" },
  { value: "3", label: "3 Bedrooms" },
  { value: "4", label: "4+ Bedrooms" },
];

function SearchSection() {
  const [purpose, setPurpose] = React.useState<"sale" | "rent">("sale");
  const [query, setQuery] = React.useState("");
  const [bedrooms, setBedrooms] = React.useState("");
  const [type, setType] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", purpose);
    if (query) params.set("q", query);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (type) params.set("propertyType", type);
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <div className="relative z-20 -mt-10 lg:-mt-14 px-4 sm:px-6">
      <div className="max-w-[1240px] mx-auto bg-white rounded-2xl shadow-xl border border-sand-200/90 p-4 sm:p-5 lg:p-6 backdrop-blur-md">
        <form
          id="homepage-search"
          onSubmit={handleSearch}
          aria-label="Property search"
          className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center"
        >
          {/* Buy / Rent toggle */}
          <div className="inline-flex p-1 bg-sand-100 rounded-xl shrink-0 h-12">
            {(["sale", "rent"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPurpose(p)}
                className={cn(
                  "min-w-[72px] h-full px-6 text-sm font-semibold rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer",
                  purpose === p
                    ? "bg-primary text-white shadow-xs"
                    : "text-text-secondary hover:text-text"
                )}
                aria-pressed={purpose === p}
              >
                {p === "sale" ? "Buy" : "Rent"}
              </button>
            ))}
          </div>

          {/* Location / keyword */}
          <div className="flex-1 relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              aria-hidden
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <input
              type="text"
              id="search-location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search area, community or keyword…"
              className={cn(
                "w-full h-12 pl-12 pr-4 text-sm text-text bg-sand-50/70",
                "border border-sand-200 rounded-xl",
                "placeholder:text-text-muted",
                "focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "transition-all duration-150"
              )}
              aria-label="Search location or keyword"
            />
          </div>

          {/* Property type */}
          <div className="w-full lg:w-[170px] shrink-0">
            <CustomSelect
              id="search-type"
              name="propertyType"
              value={type}
              onChange={setType}
              options={propertyTypeOptions}
              placeholder="All Types"
              aria-label="Property type"
            />
          </div>

          {/* Bedrooms */}
          <div className="w-full lg:w-[160px] shrink-0">
            <CustomSelect
              id="search-bedrooms"
              name="bedrooms"
              value={bedrooms}
              onChange={setBedrooms}
              options={bedroomOptions}
              placeholder="Any Beds"
              aria-label="Number of bedrooms"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            id="search-submit"
            className="h-12 px-8 rounded-xl shadow-md font-semibold text-sm shrink-0 flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}

/* ── 3. Trust stats ─────────────────────────────────────────── */
function TrustSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-sand-50/70 py-12 lg:py-16 border-b border-sand-200/80">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-sand-200">
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5, delay: prefersReduced ? 0 : i * 0.08 }}
              className="flex flex-col items-center text-center px-4 py-3 lg:py-0"
            >
              <span className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight mb-1.5">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── 4. Featured Properties ─────────────────────────────────── */
function FeaturedProperties() {
  const prefersReduced = useReducedMotion();
  const [featured, setFeatured] = React.useState<Property[]>([]);

  React.useEffect(() => {
    let active = true;
    getFeaturedProperties(3)
      .then((res) => {
        if (active && res.success && res.data.length > 0) {
          setFeatured(res.data);
        }
      })
      .catch(() => {
        // preserve visual continuity
      });
    return () => {
      active = false;
    };
  }, []);

  const items = featured.length > 0
    ? featured.map((p) => ({
        id: p._id,
        slug: p.slug,
        title: p.title,
        location: p.location.area,
        price: p.price,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.builtUpArea,
        purpose: p.purpose,
        image: p.images[0]?.url || "/images/placeholder.jpg",
        badge:
          p.verificationStatus === "featured"
            ? "Featured"
            : p.verificationStatus === "verified"
            ? "Verified"
            : "Exclusive",
      }))
    : mockFeaturedProperties;

  return (
    <Section className="bg-background">
      <Container>
        <SectionHeader
          eyebrow="Featured Properties"
          title="Curated for Discerning Buyers"
          description="A selection of our finest properties across Dubai's most prestigious addresses."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((property, i) => (
            <motion.div
              key={property.id}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: prefersReduced ? 0 : i * 0.1 }}
            >
              <Link
                href={`/properties/${property.slug}`}
                className="group flex flex-col bg-surface border border-sand-200/90 overflow-hidden hover:border-primary/30 transition-all duration-300 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1"
                aria-label={`View ${property.title} — ${property.bedrooms}BR in ${property.location}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-brown-500/0 group-hover:bg-brown-500/10 transition-colors duration-300" aria-hidden />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="primary" size="sm">
                      {property.badge}
                    </Badge>
                  </div>

                  {/* Purpose badge */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" size="sm">
                      {property.purpose === "sale" ? "For Sale" : "For Rent"}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  {/* Location */}
                  <p className="text-xs text-text-muted flex items-center gap-1.5 font-medium">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.location}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-text group-hover:text-primary transition-colors duration-200">
                    {property.title}
                  </h3>

                  {/* Price */}
                  <p className="price text-2xl text-primary font-semibold tracking-tight">
                    {formatPrice(property.price, "AED")}
                  </p>

                  <Divider />

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                        <path d="M3 22v-9a2 2 0 012-2h14a2 2 0 012 2v9M1 22h22M7 11V9a5 5 0 0110 0v2" />
                      </svg>
                      {formatBedrooms(property.bedrooms)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                        <path d="M4 12h16M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 12V8a4 4 0 014-4h8a4 4 0 014 4v4" />
                      </svg>
                      {property.bathrooms} Bath
                    </span>
                    <span>{formatArea(property.area)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 shadow-xs hover:shadow-md" asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ── 5. New Projects ─────────────────────────────────────────── */
function NewProjectsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <Section className="bg-sienna-50">
      <Container>
        <SectionHeader
          eyebrow="Off-Plan Projects"
          title="Invest Before the Market"
          description="Secure a property at launch prices from Dubai's most trusted developers. Flexible payment plans available."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: prefersReduced ? 0 : i * 0.12 }}
            >
              <Link
                href={`/new-projects/${project.slug}`}
                className="group block bg-surface border border-sand-200/90 overflow-hidden hover:border-primary/30 transition-all duration-300 rounded-2xl shadow-xs hover:shadow-xl hover:-translate-y-1"
                aria-label={`View ${project.name} by ${project.developer}`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-500/60 via-transparent to-transparent" aria-hidden />
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      variant={project.status === "upcoming" ? "info" : "warning"}
                      size="sm"
                    >
                      {project.status === "upcoming"
                        ? "Coming Soon"
                        : "Under Construction"}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2">
                  <p className="text-xs text-text-muted">{project.developer}</p>
                  <h3 className="font-display text-2xl text-text group-hover:text-primary transition-colors duration-200">
                    {project.name}
                  </h3>
                  <p className="text-sm text-text-muted flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-text-muted">Starting from</p>
                      <p className="price text-lg text-text font-medium">
                        {formatPrice(project.startingPrice, "AED", { compact: true })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-text-muted">Handover</p>
                      <p className="text-sm text-text font-medium">
                        {new Date(project.handoverDate).toLocaleDateString("en-AE", {
                          year: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 shadow-xs hover:shadow-md" asChild>
            <Link href="/new-projects">Explore All Projects</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ── 6. Dubai Areas ─────────────────────────────────────────── */
function AreasSection() {
  const prefersReduced = useReducedMotion();

  return (
    <Section className="bg-background">
      <Container>
        <SectionHeader
          eyebrow="Explore Dubai"
          title="Find Your Neighbourhood"
          description="Each Dubai community has its own character, lifestyle, and investment story. Explore our curated area guides."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockAreas.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: prefersReduced ? 0 : i * 0.1 }}
            >
              <Link
                href={`/areas/${area.slug}`}
                className="group relative block overflow-hidden rounded-2xl shadow-md hover:shadow-2xl aspect-[3/4] transition-all duration-500 hover:-translate-y-1.5"
                aria-label={`Explore ${area.name} area guide`}
              >
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,28,56,0.92) 0%, rgba(10,28,56,0.3) 55%, transparent 100%)",
                  }}
                  aria-hidden
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-display text-2xl text-warm-white mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-sand-200 leading-snug line-clamp-2">
                    {area.description}
                  </p>
                  <p className="text-xs text-secondary font-medium mt-2">
                    From {formatPrice(area.avgPrice, "AED", { compact: true })}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full px-8 shadow-xs hover:shadow-md" asChild>
            <Link href="/areas">View All Areas</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ── 7. Why Choose Us ────────────────────────────────────────── */
function WhyUsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <Section className="bg-[#0A1C38] text-sand-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <span className="eyebrow text-secondary mb-4 block">Why Pacific Star Realty</span>
            <h2 className="font-display font-light text-4xl lg:text-5xl text-warm-white leading-tight mb-6">
              A Partner You Can
              <br />
              <span className="italic font-normal text-secondary">Trust Completely</span>
            </h2>
            <p className="text-sand-200 leading-relaxed mb-10 max-w-lg">
              In a market as dynamic as Dubai real estate, the right advisor
              makes all the difference. We combine deep market knowledge with
              genuine care for every client&apos;s outcome.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-navy-900 rounded-full px-8 font-medium transition-all duration-200"
              asChild
            >
              <Link href="/about">About Our Team</Link>
            </Button>
          </div>

          {/* Right — grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyUsPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: prefersReduced ? 0 : i * 0.1 }}
                className="flex flex-col gap-3 p-6 bg-white/[0.04] border border-white/10 rounded-2xl hover:border-secondary/50 hover:bg-white/[0.07] transition-all duration-300"
              >
                <span className="text-secondary">{point.icon}</span>
                <h3 className="text-lg font-medium text-warm-white">
                  {point.title}
                </h3>
                <p className="text-sm text-sand-200/80 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── 8. Investment CTA strip ─────────────────────────────────── */
function InvestmentSection() {
  return (
    <Section className="bg-sand-50/70 border-y border-sand-200/80 py-16 lg:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white border border-sand-200 p-8 sm:p-12 rounded-2xl shadow-sm">
          <div className="text-center lg:text-left">
            <span className="eyebrow text-secondary mb-3 block">
              Dubai Property Investment
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-text leading-tight mb-4">
              Invest With Confidence
            </h2>
            <p className="text-text-secondary max-w-xl leading-relaxed text-base">
              Dubai offers 0% income tax, high rental yields, and a world-class
              lifestyle. Learn everything you need to make an informed decision.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 shadow-xs hover:shadow-md"
              asChild
            >
              <Link href="/investment">Investment Guide</Link>
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="rounded-full px-8 shadow-sm hover:shadow-md"
              asChild
            >
              <Link href="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── 9. Testimonials ─────────────────────────────────────────── */
function TestimonialsSection() {
  const prefersReduced = useReducedMotion();

  return (
    <Section className="bg-background">
      <Container>
        <SectionHeader
          eyebrow="Client Stories"
          title="What Our Clients Say"
          description="Real stories from buyers and investors who trusted us with one of life's most important decisions."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockTestimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: prefersReduced ? 0 : i * 0.12 }}
              className="flex flex-col gap-5 p-7 bg-white border border-sand-200 rounded-xl shadow-xs hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Stars */}
              <div className="flex items-center gap-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }, (_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-secondary" aria-hidden>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-text-secondary leading-relaxed flex-1 italic">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col gap-0.5 pt-4 border-t border-sand-200/80">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-text">{testimonial.name}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-sand-100 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-text-muted">{testimonial.location}</p>
                <p className="text-xs text-secondary font-medium mt-0.5">{testimonial.property}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── 10. Final CTA ──────────────────────────────────────────── */
function FinalCTASection() {
  const whatsappUrl = getWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971501234567",
    "Hi, I would like to book a consultation about Dubai property."
  );

  return (
    <Section className="bg-[#0A1C38] text-white py-20 lg:py-28 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800/60 via-[#0A1C38] to-[#0A1C38] pointer-events-none" />
      <Container narrow className="relative z-10">
        <div className="text-center flex flex-col items-center gap-6">
          <span className="eyebrow text-secondary">Ready to Begin?</span>
          <h2 className="font-display font-light text-5xl lg:text-6xl text-white leading-none">
            Let&apos;s Find Your
            <br />
            <span className="italic text-secondary">Perfect Property</span>
          </h2>
          <p className="text-sand-200 max-w-md leading-relaxed text-base">
            Whether you&apos;re buying your first property, expanding your
            portfolio, or searching for a rental home — our advisors are
            ready to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button
              variant="primary"
              size="lg"
              className="bg-secondary text-navy-900 font-semibold hover:bg-secondary-hover shadow-md rounded-full px-8"
              asChild
            >
              <Link href="/properties">Explore Properties</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white rounded-full px-8 backdrop-blur-xs flex items-center gap-2"
              asChild
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-green-400" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════
   HOMEPAGE — Main export
   ════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <TrustSection />
      <FeaturedProperties />
      <NewProjectsSection />
      <AreasSection />
      <WhyUsSection />
      <InvestmentSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}
