"use client";

export function VoiceLoading() {
  return (
    <div className="flex items-center gap-1.5 h-6">
      <div className="w-1.5 h-1.5 rounded-full bg-[#e8a44a] animate-pulse" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#e8a44a] animate-pulse" style={{ animationDelay: "0.15s" }} />
      <div className="w-1.5 h-1.5 rounded-full bg-[#e8a44a] animate-pulse" style={{ animationDelay: "0.3s" }} />
    </div>
  );
}

export function SpinnerLoading({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes: Record<string, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizes[size]} border-2 border-[#262626] border-t-[#e8a44a] rounded-full animate-spin`} />
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <SpinnerLoading size="lg" />
        <p className="text-[13px] text-[#555]">Loading...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-lg p-5 animate-pulse">
      <div className="h-3 bg-[#1a1a1a] rounded w-3/4 mb-3" />
      <div className="h-2.5 bg-[#1a1a1a] rounded w-1/2 mb-2" />
      <div className="h-2.5 bg-[#1a1a1a] rounded w-2/3" />
    </div>
  );
}

export function ButtonLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3.5 h-3.5 border-2 border-[#0c0c0c]/30 border-t-[#0c0c0c] rounded-full animate-spin" />
      <span>Processing...</span>
    </div>
  );
}
