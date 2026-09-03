"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-[13px] font-medium text-[#1a1714]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-3 py-2 pr-9 bg-white border rounded text-[#1a1714] text-[14px] appearance-none outline-none cursor-pointer transition-all ${
              error
                ? "border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/20"
                : "border-[#ddd6ce] focus:border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/10"
            } ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-white text-[#1a1714]"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a09a] pointer-events-none" />
        </div>
        {error && (
          <p className="text-[12px] text-[#c0392b]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
