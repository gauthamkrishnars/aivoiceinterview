"use client";

export function VoiceLoading() {
  return (
    <div className="flex items-center gap-1 h-5">
      <div className="w-1 h-1 rounded-full bg-[#c0392b] animate-pulse" />
      <div className="w-1 h-1 rounded-full bg-[#c0392b] animate-pulse" style={{ animationDelay: "0.15s" }} />
      <div className="w-1 h-1 rounded-full bg-[#c0392b] animate-pulse" style={{ animationDelay: "0.3s" }} />
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
    <div className={`${sizes[size]} border-2 border-[#ebe5dd] border-t-[#c0392b] rounded-full animate-spin`} />
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <SpinnerLoading size="lg" />
        <p className="text-[13px] text-[#6b6560]">Loading...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-[#ddd6ce] rounded-md p-5 animate-pulse">
      <div className="h-3 bg-[#f0ece6] rounded w-3/4 mb-3" />
      <div className="h-2.5 bg-[#f0ece6] rounded w-1/2 mb-2" />
      <div className="h-2.5 bg-[#f0ece6] rounded w-2/3" />
    </div>
  );
}

export function ButtonLoading() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      <span>Processing...</span>
    </div>
  );
}
