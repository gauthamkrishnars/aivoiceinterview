import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "success" | "warning" | "danger";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-[#1a1a1a] text-[#8a8a8a] border-[#262626]",
    accent: "bg-[#e8a44a]/10 text-[#e8a44a] border-[#e8a44a]/20",
    success: "bg-[#2d8a4e]/10 text-[#4ade80] border-[#2d8a4e]/20",
    warning: "bg-[#e8a44a]/10 text-[#e8a44a] border-[#e8a44a]/20",
    danger: "bg-[#d44]/10 text-[#f87171] border-[#d44]/20",
  };

  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-0.5 text-[12px]",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded border ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
