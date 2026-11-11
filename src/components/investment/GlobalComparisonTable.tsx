"use client";

import * as React from "react";
import {
  Globe,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  mockGlobalCityComparisons,
} from "@/lib/data/mock-investment";

interface GlobalComparisonTableProps {
  className?: string;
}

export function GlobalComparisonTable({ className }: GlobalComparisonTableProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-secondary" />
            Global Prime Benchmark
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Dubai vs. Tier-1 Global Gateway Cities
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Institutional comparison of net rental yields, transaction taxes, capital gains treatment, and residency opportunities across prime real estate markets.
          </p>
        </div>

        <span className="text-2xs font-mono font-medium px-3 py-1.5 rounded-full bg-sand-100 text-primary border border-sand-200 self-start md:self-auto shrink-0">
          Source: Knight Frank & DLD Global Wealth Report 2025/2026
        </span>
      </div>

      {/* Responsive Comparison Table Container */}
      <div className="border border-sand-200 rounded-3xl overflow-hidden bg-surface shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-sand-50/90 border-b border-sand-200 text-text uppercase tracking-wider text-2xs font-semibold">
                <th scope="col" className="py-4 px-5">Global City</th>
                <th scope="col" className="py-4 px-4">Gross Rental Yield</th>
                <th scope="col" className="py-4 px-4">Price / sq.ft (USD)</th>
                <th scope="col" className="py-4 px-4">Purchase / Stamp Duty</th>
                <th scope="col" className="py-4 px-4">Capital Gains Tax</th>
                <th scope="col" className="py-4 px-4">Annual Property Tax</th>
                <th scope="col" className="py-4 px-4">Residency Rights</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {mockGlobalCityComparisons.map((city) => (
                <tr
                  key={city.city}
                  className={cn(
                    "transition-colors",
                    city.isHomeCity
                      ? "bg-secondary/5 font-medium hover:bg-secondary/10"
                      : "hover:bg-sand-50/50 text-text-muted"
                  )}
                >
                  {/* City & Country */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{city.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-xs font-semibold", city.isHomeCity ? "text-primary text-sm font-bold" : "text-text")}>
                            {city.city}
                          </span>
                          {city.isHomeCity && (
                            <span className="inline-flex items-center gap-1 text-3xs font-mono font-bold bg-primary text-white px-2 py-0.5 rounded-full shadow-2xs">
                              <Sparkles className="w-2.5 h-2.5 text-secondary" />
                              Top Performer
                            </span>
                          )}
                        </div>
                        <span className="text-3xs text-text-muted block">
                          {city.country}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Gross Rental Yield */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "font-mono font-bold text-xs inline-block px-2.5 py-1 rounded-md",
                        city.isHomeCity
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                          : "text-text bg-sand-100"
                      )}
                    >
                      {city.avgRentalYield}
                    </span>
                  </td>

                  {/* Price / sqft USD */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-text">
                    ${city.pricePerSqftUsd.toLocaleString()}
                  </td>

                  {/* Stamp Duty */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        city.isHomeCity ? "text-primary font-bold" : "text-text"
                      )}
                    >
                      {city.stampDutyTax}
                    </span>
                  </td>

                  {/* Capital Gains Tax */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {city.capitalGainsTax === "0%" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-2xs font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        0% Tax-Free
                      </span>
                    ) : (
                      <span className="text-text font-mono text-xs">{city.capitalGainsTax}</span>
                    )}
                  </td>

                  {/* Annual Property Tax */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {city.annualPropertyTax === "0%" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-2xs font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        0% Annual Tax
                      </span>
                    ) : (
                      <span className="text-text text-2xs">{city.annualPropertyTax}</span>
                    )}
                  </td>

                  {/* Residency */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "text-2xs font-medium",
                        city.isHomeCity ? "text-primary font-bold" : "text-text-muted"
                      )}
                    >
                      {city.residencyOption}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="bg-sand-50/80 px-5 py-3.5 border-t border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-2xs text-text-muted">
          <span>
            *All data reflects prime freehold residential transactions. USD exchange rates fixed for UAE Dirham at 1 USD = 3.6725 AED.
          </span>
          <span className="font-semibold text-primary">
            No Currency Depreciation Risk for USD Investors
          </span>
        </div>
      </div>
    </div>
  );
}
