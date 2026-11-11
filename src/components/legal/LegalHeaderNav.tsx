"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Scale, Cookie, Printer, Download, CheckCircle2 } from "lucide-react";

interface LegalHeaderNavProps {
  currentPath: "/privacy-policy" | "/terms" | "/cookie-policy";
  lastUpdated?: string;
  badgeLabel?: string;
}

export function LegalHeaderNav({
  currentPath,
  lastUpdated = "November 2026",
  badgeLabel,
}: LegalHeaderNavProps) {
  const [copied, setCopied] = React.useState(false);

  const navItems = [
    { label: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
    { label: "Terms of Service", href: "/terms", icon: Scale },
    { label: "Cookie Policy", href: "/cookie-policy", icon: Cookie },
  ];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-6 border-b border-sand-200 pb-8">
      {/* Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-text font-medium">Legal &amp; Compliance</span>
          <span>/</span>
          <span className="text-primary font-semibold capitalize">
            {currentPath.replace("/", "").replace("-", " ")}
          </span>
        </nav>

        {/* Action Buttons: Print & Copy Link */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-2xs font-medium bg-sand-100 hover:bg-sand-200 text-text transition-colors cursor-pointer border border-sand-200"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied</span>
              </>
            ) : (
              <span>Share Document</span>
            )}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-2xs font-medium bg-sand-100 hover:bg-sand-200 text-text transition-colors cursor-pointer border border-sand-200"
          >
            <Printer className="w-3.5 h-3.5 text-text-muted" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-sand-200/80">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 flex items-center gap-2 ${
                isActive
                  ? "bg-primary text-white shadow-xs font-semibold"
                  : "bg-surface hover:bg-sand-100 text-text-secondary border border-sand-200"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-secondary" : "text-text-muted"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Institutional Compliance Badges Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-2xs text-text-muted font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-primary border border-sand-200 font-semibold">
            RERA Lic. #12894
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-sand-100 text-text-secondary border border-sand-200">
            DLD Regulated Brokerage
          </span>
          {badgeLabel && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {badgeLabel}
            </span>
          )}
        </div>
        <span>Last Updated: {lastUpdated}</span>
      </div>
    </div>
  );
}

