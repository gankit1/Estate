import * as React from "react";
import { cn } from "@/lib/utils/cn";

type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "outline";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:   "bg-white/90 backdrop-blur-md text-text-secondary border border-sand-200/90 shadow-2xs",
  primary:   "bg-primary text-white border border-primary/20 shadow-xs font-semibold",
  secondary: "bg-[#0A1C38]/90 backdrop-blur-md text-[#E5D7C2] border border-[#C5A880]/40 shadow-xs font-medium",
  success:   "bg-emerald-950/80 backdrop-blur-md text-emerald-200 border border-emerald-500/30 shadow-xs font-medium",
  warning:   "bg-amber-950/80 backdrop-blur-md text-amber-200 border border-amber-500/30 shadow-xs font-medium",
  error:     "bg-red-950/80 backdrop-blur-md text-red-200 border border-red-500/30 shadow-xs font-medium",
  info:      "bg-primary text-white border border-white/20 shadow-xs font-medium",
  outline:   "bg-white/80 backdrop-blur-md text-text border border-sand-300 shadow-2xs",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-2xs px-2.5 py-1 gap-1.5 rounded-full",
  md: "text-xs px-3 py-1 gap-1.5 rounded-full",
  lg: "text-sm px-4 py-1.5 gap-2 rounded-full",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-body font-medium",
        "rounded-full tracking-wide whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "rounded-full shrink-0",
            size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"
          )}
          style={{ background: "currentColor" }}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}

/* ── Lead Status Badge ──────────────────────────────────────── */
const leadStatusVariants: Record<
  string,
  BadgeVariant
> = {
  NEW:         "info",
  CONTACTED:   "warning",
  QUALIFIED:   "primary",
  VIEWING:     "secondary",
  NEGOTIATION: "secondary",
  CLOSED:      "success",
  LOST:        "outline",
};

export function LeadStatusBadge({
  status,
  ...props
}: { status: string } & Omit<BadgeProps, "variant">) {
  const variant = leadStatusVariants[status] ?? "default";
  return (
    <Badge variant={variant} dot {...props}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  );
}

/* ── Property Type Badge ─────────────────────────────────────── */
export function PropertyTypeBadge({
  type,
  ...props
}: { type: string } & Omit<BadgeProps, "variant">) {
  return (
    <Badge variant="default" {...props}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>
  );
}
