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
          <label className="block text-[13px] font-medium text-[#8a8a8a]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-3 py-2 pr-9 bg-[#0c0c0c] border border-[#262626] rounded-md text-[#f0f0f0] text-[14px] appearance-none outline-none cursor-pointer transition-colors focus:border-[#e8a44a] ${
              error ? "border-[#d44]" : ""
            } ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-[#0c0c0c] text-[#f0f0f0]"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555] pointer-events-none" />
        </div>
        {error && (
          <p className="text-[12px] text-[#d44]">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
