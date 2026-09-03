"use client";

import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-[13px] font-medium text-[#1a1714]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a09a]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-3 py-2 bg-white border rounded text-[#1a1714] text-[14px] placeholder-[#a8a09a] outline-none transition-all ${
              icon ? "pl-9" : ""
            } ${
              error
                ? "border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/20"
                : "border-[#ddd6ce] focus:border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/10"
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[12px] text-[#c0392b]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
