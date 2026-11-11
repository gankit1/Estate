"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button/Button";
import { CheckCircle2, ShieldCheck, Lock, Sliders, Sparkles } from "lucide-react";

export function CookiePreferencesCenter() {
  const [preferences, setPreferences] = React.useState({
    essential: true, // locked
    functional: true,
    analytics: true,
    marketing: false,
  });

  const [saved, setSaved] = React.useState(false);

  const handleToggle = (key: "functional" | "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="bg-surface border border-sand-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="eyebrow block mb-1">Interactive Preference Center</span>
          <h3 className="font-display text-2xl text-text font-light">
            Manage Your Cookie &amp; Telemetry Permissions
          </h3>
          <p className="text-xs text-text-muted mt-1 max-w-xl">
            Control which categories of digital cookies and telemetry scripts Pacific Star Realty may utilize during your browsing sessions.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={handleSave}
          className="rounded-full text-xs font-semibold px-6 py-2.5 bg-primary text-white hover:bg-primary-hover shadow-xs cursor-pointer shrink-0"
        >
          Save &amp; Apply Preferences
        </Button>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl flex items-center gap-2.5 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your custom privacy and cookie preferences have been successfully recorded.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {/* 1. Essential Cookies (Locked) */}
        <div className="bg-sand-50/80 border border-sand-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text flex items-center gap-2">
              <Lock className="w-4 h-4 text-text-muted" />
              Essential Cookies
            </span>
            <span className="text-2xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Always Active
            </span>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Strictly necessary for security, CSRF protection, session management, and property inquiry submissions. Cannot be disabled.
          </p>
        </div>

        {/* 2. Functional & Currency Preferences */}
        <div className="bg-sand-50/80 border border-sand-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text flex items-center gap-2">
              <Sliders className="w-4 h-4 text-secondary" />
              Preference &amp; Currency
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={() => handleToggle("functional")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sand-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Stores your chosen currency conversion (AED, USD, EUR, GBP), square footage units, and saved property search filters.
          </p>
        </div>

        {/* 3. Analytics & Telemetry */}
        <div className="bg-sand-50/80 border border-sand-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Analytics &amp; Performance
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handleToggle("analytics")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sand-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Anonymized traffic metrics helping us identify which master communities and district reports generate highest investor demand.
          </p>
        </div>

        {/* 4. Tailored Property Recommendations */}
        <div className="bg-sand-50/80 border border-sand-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-text flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              Tailored Advisory
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => handleToggle("marketing")}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sand-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Enables customized prime off-plan suggestions and private developer allocation alerts matching your specified budget bracket.
          </p>
        </div>
      </div>
    </div>
  );
}

