"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = false,
  onClick,
}: CardProps) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 ${
        hover
          ? "hover-lift cursor-pointer hover:border-brand-500/20"
          : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
