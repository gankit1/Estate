"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

/* ── Nav Links ──────────────────────────────────────────────── */
const navLinks = [
  { href: "/properties?purpose=sale", label: "Buy" },
  { href: "/properties?purpose=rent", label: "Rent" },
  { href: "/new-projects", label: "New Projects" },
  { href: "/areas", label: "Areas" },
  { href: "/investment", label: "Investment" },
  { href: "/about", label: "About" },
] as const;

/* ── Logo ───────────────────────────────────────────────────── */
function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "text-warm-white" : "text-text";
  const accentColor = "text-secondary";

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group", textColor)}
      aria-label="Pacific Star Realty — Home"
    >
      {/* Mark */}
      <span
        className="w-8 h-8 flex items-center justify-center bg-primary rounded-xs shrink-0 shadow-xs border border-secondary/30"
        aria-hidden
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
          className="text-secondary"
        >
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="currentColor"
            fillOpacity="0.25"
          />
        </svg>
      </span>
      {/* Wordmark */}
      <span className="flex items-baseline gap-1.5">
        <span className="font-display font-light tracking-tight leading-none text-xl">
          Pacific<span className={cn("font-medium", accentColor)}>Star</span>
        </span>
        <span className="text-[10px] tracking-widest uppercase font-mono text-secondary font-medium">
          Realty
        </span>
      </span>
    </Link>
  );
}

/* ── Desktop Nav ────────────────────────────────────────────── */
function DesktopNav({
  pathname,
  transparent,
}: {
  pathname: string;
  transparent: boolean;
}) {
  return (
    <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
      {navLinks.map((link) => {
        const isActive = pathname.startsWith(link.href.split("?")[0]);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3.5 py-1.5 text-sm font-medium tracking-tight rounded-sm transition-all duration-150",
              "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
              transparent
                ? isActive
                  ? "text-white font-semibold bg-white/20"
                  : "text-white/90 hover:text-white hover:bg-white/10"
                : isActive
                ? "text-primary font-semibold bg-sand-100/80"
                : "text-text-secondary hover:text-primary hover:bg-sand-50"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Mobile Menu ─────────────────────────────────────────────── */
function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-navy-900/70 backdrop-blur-sm z-[60] lg:hidden"
          aria-hidden
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 right-0 h-full w-80 max-w-full bg-surface z-[70] lg:hidden",
          "flex flex-col shadow-xl",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-sm text-text-muted hover:text-text hover:bg-sand-50 transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 flex flex-col px-4 py-6 gap-1 overflow-y-auto"
        >
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href.split("?")[0]);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-sm transition-colors",
                  "focus-visible:outline-2 focus-visible:outline-primary",
                  isActive
                    ? "text-primary bg-primary-muted"
                    : "text-text hover:bg-sand-50"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="px-6 py-6 border-t border-border flex flex-col gap-3">
          <Button variant="primary" size="md" fullWidth asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button variant="outline" size="md" fullWidth asChild>
            <Link href="/properties">View Properties</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

/* ── Header Component ───────────────────────────────────────── */
interface HeaderProps {
  transparent?: boolean;
}

export function Header({ transparent }: HeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Auto-enable transparency on homepage unless explicitly overridden
  const shouldBeTransparent = transparent !== undefined ? transparent : pathname === "/";

  React.useEffect(() => {
    if (!shouldBeTransparent) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldBeTransparent]);

  const isTransparent = shouldBeTransparent && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-sticky z-50",
          "transition-all duration-300",
          isTransparent
            ? "bg-gradient-to-b from-navy-900/95 via-navy-900/60 to-transparent py-4.5"
            : "bg-white/95 backdrop-blur-md border-b border-sand-200/90 py-3.5 shadow-xs"
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Logo variant={isTransparent ? "dark" : "light"} />

            {/* Desktop nav */}
            <DesktopNav pathname={pathname} transparent={isTransparent} />

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "text-sm font-medium transition-colors duration-150 px-2 py-1",
                  isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-text-secondary hover:text-text"
                )}
              >
                Contact
              </Link>
              <Button
                variant={isTransparent ? "secondary" : "primary"}
                size="sm"
                className={cn(
                  "rounded-full px-5 font-medium transition-all duration-200",
                  isTransparent
                    ? "bg-secondary text-navy-900 font-semibold hover:bg-secondary-hover border-0 shadow-md"
                    : "bg-primary text-white hover:bg-primary-hover shadow-xs"
                )}
                asChild
              >
                <Link href="/properties">Explore Properties</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "lg:hidden p-2 rounded-sm transition-colors",
                isTransparent
                  ? "text-warm-white hover:bg-white/10"
                  : "text-text hover:bg-sand-50"
              )}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M3 6h16M3 11h16M3 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />

      {/* Spacer when not transparent */}
      {!shouldBeTransparent && <div className="h-[72px]" aria-hidden />}
    </>
  );
}
