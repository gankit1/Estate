"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CustomSelectProps {
  id?: string;
  name?: string;
  label?: string;
  options: readonly SelectOption[] | SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
  disabled?: boolean;
  "aria-label"?: string;
}

export function CustomSelect({
  id,
  name,
  label,
  options,
  value,
  onChange,
  placeholder = "Select option",
  className,
  buttonClassName,
  menuClassName,
  size = "md",
  align = "left",
  disabled = false,
  "aria-label": ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const listboxId = React.useId();

  // Find currently selected option
  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-xs rounded-lg",
    md: "h-12 px-4 text-sm rounded-xl",
    lg: "h-14 px-5 text-base rounded-2xl",
  }[size];

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block text-left w-full", className)}
    >
      {/* Hidden input for HTML form submission */}
      {name && <input type="hidden" name={name} value={value} />}

      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel || label || placeholder}
        className={cn(
          "w-full flex items-center justify-between gap-3 text-left font-medium transition-all duration-200 cursor-pointer select-none",
          "bg-sand-50/80 hover:bg-white text-text border border-sand-200 hover:border-sand-300",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white",
          isOpen && "bg-white border-primary ring-2 ring-primary/20 shadow-xs",
          disabled && "opacity-50 cursor-not-allowed",
          sizeClasses,
          buttonClassName
        )}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption?.icon}
          <span className={cn(!selectedOption && "text-text-muted font-normal")}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        {/* Chevron icon */}
        <span
          className={cn(
            "shrink-0 text-text-muted transition-transform duration-200 ease-out",
            isOpen && "rotate-180 text-primary"
          )}
          aria-hidden
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>

      {/* Redesigned Luxury Popup Menu */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute z-50 mt-2 min-w-full w-max max-h-72 overflow-y-auto overscroll-contain",
            "bg-white/98 backdrop-blur-md border border-sand-200/90 rounded-2xl p-1.5",
            "shadow-xl shadow-navy-950/12",
            "animate-in fade-in-0 zoom-in-95 duration-150 ease-out",
            align === "right" ? "right-0" : "left-0",
            menuClassName
          )}
        >
          <div className="flex flex-col gap-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleOptionClick(opt.value)}
                  className={cn(
                    "flex items-center justify-between gap-4 px-3.5 py-2.5 rounded-xl text-sm transition-all duration-150 cursor-pointer select-none",
                    isSelected
                      ? "bg-navy-50 text-navy-900 font-semibold"
                      : "text-text hover:bg-sand-100/70 hover:text-navy-900 font-normal"
                  )}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </span>

                  {/* Luxury gold checkmark when selected */}
                  {isSelected && (
                    <span className="text-secondary shrink-0 font-bold" aria-hidden>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
