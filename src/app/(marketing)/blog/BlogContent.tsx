"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import {
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Mail,
  ShieldCheck,
  Building2,
  FileText,
  SlidersHorizontal,
} from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  type BlogPost,
  type BlogCategory,
} from "@/lib/data/blog-data";

export function BlogContent() {
  const [selectedCategory, setSelectedCategory] = React.useState<BlogCategory>("All Insights");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [subscribedEmail, setSubscribedEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  // Filter articles based on category and search query
  const filteredPosts = React.useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Insights" || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribedEmail.trim()) {
      setIsSubscribed(true);
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
            <span className="text-text font-medium">Market Insights</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>Institutional Research &amp; Advisory</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight">
            Dubai Real Estate Market Insights &amp; Intelligence
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            In-depth market intelligence, yield calculations, regulatory updates, and master community analysis curated by Pacific Star Realty&apos;s private wealth advisory team.
          </p>
        </div>

        {/* ── Key Dubai Real Estate Benchmarks Bar ───────────────────── */}
        <div className="bg-sand-50/90 border border-sand-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-sand-200/80">
            <div className="space-y-1">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                Total Market Volume
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-navy-950 block">
                AED 430B+
              </span>
              <span className="text-2xs text-emerald-700 font-medium">2026 Record Inflows</span>
            </div>

            <div className="space-y-1 sm:pl-6 pt-3 sm:pt-0">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                Prime Capital Growth
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-primary block">
                +14.8%
              </span>
              <span className="text-2xs text-text-muted">Avg. Waterfront &amp; Golf</span>
            </div>

            <div className="space-y-1 sm:pl-6 pt-3 sm:pt-0">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                Avg. Net Rental Yield
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-secondary-dark block">
                7.1% ROI
              </span>
              <span className="text-2xs text-emerald-700 font-medium">High Cash Flow</span>
            </div>

            <div className="space-y-1 sm:pl-6 pt-3 sm:pt-0">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                10-Year Golden Visa
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-navy-950 block">
                AED 2.0M
              </span>
              <span className="text-2xs text-text-muted">Direct Title Qualifying</span>
            </div>

            <div className="space-y-1 sm:pl-6 pt-3 sm:pt-0 col-span-2 md:col-span-1">
              <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold block">
                Tax Structure
              </span>
              <span className="font-mono text-lg sm:text-xl font-bold text-emerald-700 block">
                0% Tax
              </span>
              <span className="text-2xs text-text-muted">No Capital Gains or Income Tax</span>
            </div>
          </div>
        </div>

        {/* ── Featured Research Report Hero ──────────────────────────── */}
        {(!searchQuery || selectedCategory === "All Insights") && (
          <section aria-labelledby="featured-article-title">
            <div className="bg-surface border border-sand-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 group hover:shadow-md transition-shadow">
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto w-full min-h-[300px] lg:min-h-[440px] bg-sand-200 overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-gold-300 border border-gold-400/30 text-2xs font-mono uppercase tracking-widest font-semibold shadow-xs">
                    Featured • {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-secondary" />
                      {featuredPost.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2
                    id="featured-article-title"
                    className="font-display text-2xl sm:text-3xl text-text font-light group-hover:text-primary transition-colors leading-snug"
                  >
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-2xs bg-sand-100 text-text-secondary px-2.5 py-0.5 rounded-full border border-sand-200/60 font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-text block">
                      {featuredPost.author}
                    </span>
                    <span className="text-2xs text-text-muted block">
                      {featuredPost.authorRole}
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    asChild
                    className="rounded-full text-xs font-semibold px-5 py-2 bg-primary text-white hover:bg-primary-hover shadow-xs cursor-pointer"
                  >
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="flex items-center gap-1.5"
                    >
                      Read Analysis
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Search Bar & Interactive Categories ────────────────────── */}
        <section className="space-y-6 pt-4" aria-labelledby="all-insights-heading">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <h3 id="all-insights-heading" className="font-display text-2xl sm:text-3xl text-text font-light">
              All Advisory Articles
            </h3>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search market insights, tags, or areas..."
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

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {BLOG_CATEGORIES.map((cat) => {
              const count =
                cat === "All Insights"
                  ? BLOG_POSTS.length
                  : BLOG_POSTS.filter((p) => p.category === cat).length;
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-white shadow-xs font-semibold"
                      : "bg-surface hover:bg-sand-100 text-text-secondary border border-sand-200"
                  }`}
                >
                  <span>{cat}</span>
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

          {/* ── Article Cards Grid ───────────────────────────────────── */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-surface border border-sand-200 rounded-3xl p-8 space-y-4">
              <BookOpen className="w-10 h-10 text-sand-400 mx-auto" />
              <h4 className="font-display text-xl text-text font-light">No articles found</h4>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                No market intelligence pieces match your search query &ldquo;{searchQuery}&rdquo;. Try another topic like &ldquo;Golden Visa&rdquo; or &ldquo;ROI&rdquo;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Insights");
                }}
                className="rounded-full text-xs mt-2"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-surface border border-sand-200 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative aspect-[16/10] w-full bg-sand-200 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full bg-navy-950/85 backdrop-blur-md text-gold-300 border border-gold-400/30 text-2xs font-mono uppercase tracking-widest font-semibold shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-2xs text-text-muted font-mono">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-secondary" />
                          {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-secondary" />
                          {post.readTime}
                        </span>
                      </div>

                      <h4 className="font-display text-xl text-text font-light group-hover:text-primary transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h4>

                      <p className="text-xs text-text-muted line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {post.tags.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-2xs bg-sand-100 text-text-secondary px-2 py-0.5 rounded-md border border-sand-200/60 font-mono"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-sand-200/80 flex items-center justify-between">
                      <div className="text-2xs">
                        <span className="font-medium text-text block">{post.author}</span>
                        <span className="text-text-muted block">{post.authorRole}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-primary hover:text-primary-hover inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read Analysis
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ── Market Intelligence VIP Newsletter ─────────────────────── */}
        <section className="bg-sand-50 border border-sand-200 rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary-dark flex items-center justify-center mx-auto">
              <Mail className="w-5 h-5 text-secondary-dark" />
            </div>

            <span className="text-2xs uppercase tracking-widest text-secondary-dark font-mono font-semibold block">
              Quarterly Institutional Briefings
            </span>

            <h3 className="font-display text-2xl sm:text-3xl text-navy-950 font-light tracking-tight">
              Subscribe to the Pacific Star Market Intelligence Report
            </h3>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-lg mx-auto">
              Receive confidential quarterly transaction data, off-plan developer allocations, and RERA regulatory analysis directly in your inbox.
            </p>

            {isSubscribed ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold max-w-md mx-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You have been registered for our Q4 Prime Market Report.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto pt-2">
                <Input
                  type="email"
                  required
                  placeholder="Enter your institutional or personal email"
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  className="rounded-full text-xs px-4 py-2.5 bg-surface border-sand-300 w-full"
                />
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  className="rounded-full text-xs font-semibold px-6 py-2.5 bg-primary text-white hover:bg-primary-hover shadow-xs shrink-0 w-full sm:w-auto"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="text-2xs text-text-muted">
              Strict privacy governance. Zero spam. Unsubscribe at any time.
            </p>
          </div>
        </section>

        {/* ── Bottom Advisory Consultation CTA ───────────────────────── */}
        <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-md">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-2xs uppercase tracking-widest text-gold-300 font-mono font-semibold">
              Bespoke Portfolio Research
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-sand-50">
              Request a Custom Yield &amp; Cash Flow Assessment
            </h3>
            <p className="text-sand-300 text-xs sm:text-sm leading-relaxed">
              Our investment analysts prepare tailored comparative yield matrices, tax-free structuring models, and developer allocation strategies for high-net-worth investors.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="md"
                asChild
                className="rounded-full bg-secondary text-navy-950 hover:bg-gold-300 font-semibold text-xs px-6 py-2.5 shadow-sm cursor-pointer"
              >
                <Link href="/contact">Book Private Consultation</Link>
              </Button>
              <Button
                variant="outline"
                size="md"
                asChild
                className="rounded-full border-sand-400 text-sand-100 hover:bg-white/10 text-xs px-6 py-2.5 cursor-pointer"
              >
                <Link href="/investment">Explore Yield Calculator</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

