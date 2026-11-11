"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ── Types ──────────────────────────────────────────────────── */
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "link";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    asChild?: false;
  };

type ButtonAsChildProps = ButtonBaseProps & {
  asChild: true;
  children: React.ReactElement<{ className?: string }>;
  className?: string;
  disabled?: boolean;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsChildProps;

/* ── Variant styles ─────────────────────────────────────────── */
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary text-text-inverse font-medium",
    "hover:bg-primary-hover",
    "active:scale-[0.98]",
    "shadow-sm hover:shadow-md transition-all duration-200",
  ].join(" "),

  secondary: [
    "bg-secondary text-navy-900 font-semibold border-0",
    "hover:bg-secondary-hover",
    "active:scale-[0.98]",
    "shadow-sm hover:shadow-md transition-all duration-200",
  ].join(" "),

  outline: [
    "bg-white text-primary border border-primary/30 font-medium",
    "hover:bg-sand-50 hover:border-primary hover:text-primary-hover",
    "active:scale-[0.98]",
    "shadow-2xs transition-all duration-200",
  ].join(" "),

  ghost: [
    "bg-transparent text-text-secondary border border-transparent",
    "hover:bg-sand-50 hover:text-text",
    "active:scale-[0.98]",
  ].join(" "),

  danger: [
    "bg-error text-text-inverse",
    "hover:opacity-90",
    "active:scale-[0.98]",
    "shadow-sm",
  ].join(" "),

  link: [
    "bg-transparent text-primary underline-offset-4 p-0 h-auto",
    "hover:underline hover:text-primary-hover",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "h-7 px-3 text-xs gap-1.5 rounded-sm",
  sm: "h-9 px-4 text-sm gap-2 rounded-sm",
  md: "h-11 px-6 text-sm gap-2.5 rounded-md",
  lg: "h-12 px-7 text-sm font-medium gap-3 rounded-md",
  xl: "h-14 px-9 text-base font-medium gap-3 rounded-md",
};

/* ── Spinner ────────────────────────────────────────────────── */
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/* ── Shared className builder ───────────────────────────────── */
function getButtonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  isDisabled: boolean,
  fullWidth: boolean,
  className?: string
) {
  return cn(
    // Base
    "inline-flex items-center justify-center font-body font-medium",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-3",
    "select-none whitespace-nowrap",
    // Disabled state
    isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",
    // Variant
    variantStyles[variant],
    // Size
    variant !== "link" && sizeStyles[size],
    // Full width
    fullWidth && "w-full",
    // Custom
    className
  );
}

/* ── Button Component ───────────────────────────────────────── */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
    } = props;

    const isDisabled = disabled || isLoading;
    const computedClassName = getButtonClassName(
      variant,
      size,
      isDisabled,
      fullWidth,
      className
    );

    /* ── asChild: clone the single child, merging our className ── */
    if (props.asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      return React.cloneElement(children, {
        className: cn(computedClassName, childProps.className as string),
      } as React.HTMLAttributes<HTMLElement>);
    }

    /* ── Default: render a <button> ─────────────────────────────── */
    const {
      asChild: _asChild,
      variant: _v,
      size: _s,
      isLoading: _il,
      leftIcon: _li,
      rightIcon: _ri,
      fullWidth: _fw,
      className: _className,
      ...buttonProps
    } = props as ButtonAsButtonProps;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        className={computedClassName}
        {...buttonProps}
      >
        {isLoading ? (
          <>
            <Spinner className="w-4 h-4" />
            <span className="sr-only">Loading…</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="shrink-0 flex items-center" aria-hidden>
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="shrink-0 flex items-center" aria-hidden>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
