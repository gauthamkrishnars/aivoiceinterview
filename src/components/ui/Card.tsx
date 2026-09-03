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
      className={`bg-[#141414] border border-[#262626] rounded-lg p-5 ${
        hover
          ? "cursor-pointer hover:border-[#333] hover:bg-[#1a1a1a] transition-all duration-150"
          : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
