import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button/Button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sparkles,
  Bookmark,
  User,
} from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "@/lib/data/blog-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | Pacific Star Realty",
    };
  }

  return {
    title: `${post.title} | Pacific Star Realty Insights`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.title }],
      type: "article",
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts from same category or other articles
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="py-10 sm:py-14 lg:py-18 bg-background text-text">
      <Container className="max-w-4xl space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Market Insights
            </Link>
            <span>/</span>
            <span className="text-text font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.category}
            </span>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-xs text-text-muted hover:text-primary gap-1.5 cursor-pointer"
          >
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4" />
              All Insights
            </Link>
          </Button>
        </div>

        {/* Title & Article Header */}
        <div className="space-y-4 border-b border-sand-200 pb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-sand-100 text-primary border border-sand-200 text-xs font-mono uppercase tracking-widest font-semibold shadow-2xs">
              {post.category}
            </span>
            <span className="text-xs text-text-muted font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              {post.readTime}
            </span>
            <span className="text-xs text-text-muted font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-secondary" />
              {post.date}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-text tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-3 text-xs sm:text-sm text-text-muted">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-secondary flex items-center justify-center font-bold text-xs">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-text block">{post.author}</span>
                <span className="text-2xs text-text-muted block">{post.authorRole}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {post.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="hidden sm:inline-block text-2xs bg-sand-100 text-text-secondary px-2 py-0.5 rounded-md border border-sand-200/60 font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-sand-200 shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 850px"
          />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        <div className="bg-sand-50/90 border border-sand-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="font-display text-lg sm:text-xl text-navy-950 font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Executive Summary &amp; Key Takeaways
          </h2>
          <ul className="space-y-3">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Body Content Paragraphs */}
        <div className="prose prose-sand max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-text-secondary">
          {post.content.map((p, idx) => (
            <p key={idx} className="leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Tags & Advisory Desk Notice */}
        <div className="pt-6 border-t border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-2xs uppercase tracking-wider text-text-muted font-semibold mr-1">
              Topics:
            </span>
            {post.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-2xs bg-sand-100 text-text px-2.5 py-1 rounded-md border border-sand-200 font-mono"
              >
                #{t}
              </span>
            ))}
          </div>

          <span className="text-2xs text-text-muted font-mono">
            RERA Regulated Real Estate Intelligence
          </span>
        </div>

        {/* ── Related Market Insights ───────────────────────────────── */}
        <section className="space-y-6 pt-6 border-t border-sand-200">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl text-text font-light">
              Related Market Insights
            </h3>
            <Link
              href="/blog"
              className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
            >
              View All Articles
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.slug}
                href={`/blog/${rPost.slug}`}
                className="bg-surface border border-sand-200 rounded-2xl p-5 hover:shadow-md transition-shadow group space-y-3"
              >
                <span className="text-2xs font-mono uppercase tracking-wider text-secondary-dark font-semibold">
                  {rPost.category}
                </span>
                <h4 className="font-display text-lg text-text font-light group-hover:text-primary transition-colors leading-snug">
                  {rPost.title}
                </h4>
                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                  {rPost.excerpt}
                </p>
                <div className="flex items-center justify-between text-2xs text-text-muted pt-2 border-t border-sand-100">
                  <span>{rPost.readTime}</span>
                  <span className="text-primary font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Private Advisory Consultation Call to Action ───────────── */}
        <section className="bg-navy-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-2xs uppercase tracking-widest text-gold-300 font-mono font-semibold">
              Confidential Private Office Advisory
            </span>
            <h3 className="font-display text-2xl text-sand-50 font-light">
              Discuss this analysis with a senior portfolio advisor
            </h3>
            <p className="text-xs text-sand-300 max-w-lg leading-relaxed">
              We structure custom yield projections, tax-free holding mechanisms, and developer VIP allocations for private clients.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            asChild
            className="rounded-full bg-secondary text-navy-950 hover:bg-gold-300 font-semibold text-xs px-6 py-2.5 shrink-0 shadow-sm cursor-pointer"
          >
            <Link href="/contact">Book Private Consultation</Link>
          </Button>
        </section>
      </Container>
    </article>
  );
}
