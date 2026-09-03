"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes: Record<string, string> = {
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        className={`relative ${sizes[size]} w-full max-h-[85vh] bg-[#141414] border border-[#262626] rounded-lg overflow-hidden`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626]">
          <h2 className="font-display text-[16px] font-medium text-[#f0f0f0]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#555] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto max-h-[calc(85vh-60px)] scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
