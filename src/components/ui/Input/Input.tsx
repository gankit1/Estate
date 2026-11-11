"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

/* ── Input ──────────────────────────────────────────────────── */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      error,
      hint,
      leftAddon,
      rightAddon,
      leftIcon,
      rightIcon,
      fullWidth = true,
      id,
      className,
      ...props
    },
    ref
  ) {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const hintId = inputId ? `${inputId}-hint` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text leading-none"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-stretch">
          {leftAddon && (
            <span className="inline-flex items-center px-3 text-sm text-text-muted bg-sand-50 border border-r-0 border-border rounded-l-sm">
              {leftAddon}
            </span>
          )}

          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [error && errorId, hint && hintId].filter(Boolean).join(" ") ||
              undefined
            }
            className={cn(
              "flex-1 h-11 text-sm text-text bg-surface-elevated",
              "border border-border",
              "transition-colors duration-150",
              "placeholder:text-text-muted",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "hover:border-border-strong",
              leftAddon ? "rounded-r-sm" : "rounded-sm",
              rightAddon ? "" : "",
              leftIcon ? "pl-10" : "pl-4",
              rightIcon ? "pr-10" : "pr-4",
              error && "border-error focus:ring-error/30 focus:border-error",
              props.disabled && "opacity-50 cursor-not-allowed bg-sand-50",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
              {rightIcon}
            </span>
          )}

          {rightAddon && (
            <span className="inline-flex items-center px-3 text-sm text-text-muted bg-sand-50 border border-l-0 border-border rounded-r-sm">
              {rightAddon}
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-error">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/* ── Textarea ───────────────────────────────────────────────── */
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, error, hint, fullWidth = true, id, className, ...props },
    ref
  ) {
    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const hintId = inputId ? `${inputId}-hint` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text leading-none"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            [error && errorId, hint && hintId].filter(Boolean).join(" ") ||
            undefined
          }
          className={cn(
            "w-full min-h-[120px] px-4 py-3 text-sm text-text",
            "bg-surface-elevated border border-border rounded-sm",
            "transition-colors duration-150 resize-vertical",
            "placeholder:text-text-muted",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            "hover:border-border-strong",
            error && "border-error focus:ring-error/30 focus:border-error",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-xs text-error">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/* ── Select ─────────────────────────────────────────────────── */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      id,
      className,
      ...props
    },
    ref
  ) {
    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const hintId = inputId ? `${inputId}-hint` : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text leading-none"
          >
            {label}
            {props.required && (
              <span className="text-error ml-1" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [error && errorId, hint && hintId].filter(Boolean).join(" ") ||
              undefined
            }
            className={cn(
              "w-full h-11 pl-4 pr-10 text-sm text-text appearance-none",
              "bg-surface-elevated border border-border rounded-sm",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "hover:border-border-strong",
              !props.value && "text-text-muted",
              error && "border-error focus:ring-error/30 focus:border-error",
              props.disabled && "opacity-50 cursor-not-allowed",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted"
            aria-hidden
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-error">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="text-xs text-text-muted">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
