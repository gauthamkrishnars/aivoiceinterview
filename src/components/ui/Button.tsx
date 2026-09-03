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
    const base = "inline-flex items-center justify-center font-body font-medium rounded-md transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8a44a] disabled:opacity-40 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
      primary:
        "bg-[#e8a44a] text-[#0c0c0c] hover:bg-[#c4873a] active:bg-[#b07832]",
      secondary:
        "bg-transparent text-[#f0f0f0] border border-[#262626] hover:border-[#444] hover:bg-[#1a1a1a]",
      ghost:
        "bg-transparent text-[#8a8a8a] hover:text-[#f0f0f0] hover:bg-[#1a1a1a]",
      danger:
        "bg-[#d44] text-white hover:bg-[#b33] active:bg-[#922]",
    };

    const sizes: Record<string, string> = {
      sm: "px-3 py-1.5 text-[13px] gap-1.5",
      md: "px-4 py-2 text-[13px] gap-2",
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
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : icon ? (
          <span className="w-3.5 h-3.5">{icon}</span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
