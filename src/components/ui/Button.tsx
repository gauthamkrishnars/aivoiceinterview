"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-body font-medium rounded transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c0392b] disabled:opacity-40 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
      primary:
        "bg-[#c0392b] text-white border border-[#c0392b] hover:bg-[#a93226] hover:border-[#a93226]",
      secondary:
        "bg-white text-[#1a1714] border border-[#ddd6ce] hover:border-[#a8a09a] hover:bg-[#f0ece6]",
      ghost:
        "bg-transparent text-[#6b6560] border border-transparent hover:text-[#1a1714] hover:bg-[#f0ece6]",
      danger:
        "bg-[#c0392b] text-white border border-[#c0392b] hover:bg-[#a93226]",
    };

    const sizes: Record<string, string> = {
      sm: "px-3 py-1.5 text-[13px] gap-1.5",
      md: "px-4 py-2 text-[14px] gap-2",
      lg: "px-5 py-2.5 text-[14px] gap-2",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          <span className="w-4 h-4 flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
