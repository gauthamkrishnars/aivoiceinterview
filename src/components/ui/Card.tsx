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
      className={`bg-white border border-[#ddd6ce] rounded-md p-5 ${
        hover
          ? "cursor-pointer hover:border-[#a8a09a] hover:shadow-sm transition-all duration-150"
          : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
