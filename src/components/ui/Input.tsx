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
          <label className="block text-[13px] font-medium text-[#8a8a8a]">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full px-3 py-2 bg-[#0c0c0c] border border-[#262626] rounded-md text-[#f0f0f0] text-[14px] placeholder-[#555] outline-none transition-colors focus:border-[#e8a44a] ${
              icon ? "pl-9" : ""
            } ${
              error ? "border-[#d44] focus:border-[#d44]" : ""
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-[12px] text-[#d44]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
