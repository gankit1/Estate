import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ── Container ──────────────────────────────────────────────── */
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
  wide?: boolean;
}

export function Container({
  narrow = false,
  wide = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-6 md:px-12 xl:px-20",
        narrow ? "max-w-3xl" : wide ? "max-w-screen-2xl" : "max-w-[1440px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  noSpacing?: boolean;
}

export function Section({
  as: Tag = "section",
  noSpacing = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        !noSpacing && "py-20 lg:py-[7.5rem]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ── SectionHeader ──────────────────────────────────────────── */
interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  titleSize?: "sm" | "md" | "lg";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  titleSize = "md",
  className,
}: SectionHeaderProps) {
  const titleSizeMap = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-6xl",
  };

  const alignMap = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12 lg:mb-16",
        alignMap[align],
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}
      <h2
        className={cn(
          "font-display font-light text-text",
          titleSizeMap[titleSize]
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-text-secondary max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* ── Divider ────────────────────────────────────────────────── */
interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  decorative?: boolean;
}

export function Divider({
  decorative = true,
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      role={decorative ? "presentation" : undefined}
      aria-hidden={decorative}
      className={cn("border-t border-border w-full", className)}
      {...props}
    />
  );
}

/* ── PageWrapper ─────────────────────────────────────────────── */
export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main id="main-content" className={cn("flex-1 min-h-screen", className)}>
      {children}
    </main>
  );
}
