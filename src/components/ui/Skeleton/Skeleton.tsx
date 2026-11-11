import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ── Skeleton ───────────────────────────────────────────────── */
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function Skeleton({
  width,
  height,
  rounded = "sm",
  className,
  style,
  ...props
}: SkeletonProps) {
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      role="status"
      aria-label="Loading…"
      className={cn(
        "animate-pulse bg-sand-100",
        roundedMap[rounded],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

/* ── PropertyCard Skeleton ───────────────────────────────────── */
export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-border bg-surface rounded-sm">
      <Skeleton height={240} rounded="none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton height={14} width="40%" />
        <Skeleton height={22} />
        <Skeleton height={16} width="70%" />
        <div className="flex gap-4">
          <Skeleton height={14} width={60} />
          <Skeleton height={14} width={60} />
          <Skeleton height={14} width={80} />
        </div>
      </div>
    </div>
  );
}

/* ── Text Skeleton ──────────────────────────────────────────── */
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="flex flex-col gap-2" role="status" aria-label="Loading…">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height={16}
          width={i === lines - 1 ? "60%" : "100%"}
        />
      ))}
    </div>
  );
}
