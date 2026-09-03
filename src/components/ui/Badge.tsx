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
    default: "bg-[#f0ece6] text-[#6b6560] border-[#ebe5dd]",
    accent: "bg-[#fdf0ee] text-[#c0392b] border-[#c0392b]/20",
    success: "bg-[#f0fdf4] text-[#276749] border-[#276749]/20",
    warning: "bg-[#fffbeb] text-[#b45309] border-[#b45309]/20",
    danger: "bg-[#fdf0ee] text-[#c0392b] border-[#c0392b]/20",
  };

  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-0.5 text-[12px]",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-sm border ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
