"use client";

import * as React from "react";
import {
  ShieldCheck,
  Building2,
  Award,
  KeyRound,
  Phone,
  Mail,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockDepartments } from "@/lib/data/mock-contact";

interface DepartmentDirectoryProps {
  className?: string;
}

export function DepartmentDirectory({ className }: DepartmentDirectoryProps) {
  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    Building2,
    Award,
    KeyRound,
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-primary border border-secondary/30 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-secondary" />
            Specialized Department Directory
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-text tracking-tight">
            Direct Divisional Contacts
          </h3>
          <p className="text-text-muted text-xs sm:text-sm mt-1 max-w-2xl">
            Route your inquiry directly to the senior department head managing your specific asset class or legal requirements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockDepartments.map((dept) => {
          const Icon = iconMap[dept.iconName] || ShieldCheck;
          return (
            <div
              key={dept.id}
              className="bg-surface border border-sand-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-2xl bg-primary text-secondary flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5 text-secondary" />
                  </span>
                  <span className="text-3xs font-mono font-semibold uppercase tracking-wider text-primary bg-secondary/15 border border-secondary/30 px-2.5 py-0.5 rounded-full truncate max-w-[130px]">
                    {dept.badge}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-semibold text-text leading-snug">
                    {dept.name}
                  </h4>
                  <span className="text-2xs text-text-muted block mt-0.5">
                    Lead: <strong className="text-primary">{dept.leadName}</strong> ({dept.leadRole})
                  </span>
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-sand-100 text-xs">
                <a
                  href={`tel:${dept.phone}`}
                  className="flex items-center gap-2 text-text hover:text-primary font-mono transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{dept.phone}</span>
                </a>
                <a
                  href={`mailto:${dept.email}`}
                  className="flex items-center gap-2 text-text hover:text-primary font-mono text-2xs truncate transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="truncate">{dept.email}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

