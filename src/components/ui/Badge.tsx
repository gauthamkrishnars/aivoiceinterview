import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "brand" | "accent" | "success" | "warning" | "danger";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  const variants = {
    default: "bg-surface-700/50 text-surface-300",
    brand: "bg-brand-500/10 text-brand-400 border border-brand-500/20",
    accent: "bg-accent-500/10 text-accent-400 border border-accent-500/20",
    success: "bg-green-500/10 text-green-400 border border-green-500/20",
    warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    danger: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center font-display font-medium rounded-full ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
