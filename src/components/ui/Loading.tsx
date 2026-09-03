"use client";

export function VoiceLoading() {
  return (
    <div className="flex items-center gap-1.5 h-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-1 bg-brand-400 rounded-full waveform-bar"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

export function SpinnerLoading({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`${sizes[size]} border-2 border-surface-600 border-t-brand-500 rounded-full animate-spin`} />
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <SpinnerLoading size="lg" />
        <p className="text-surface-400 font-display text-sm">Loading...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 animate-pulse">
      <div className="h-4 bg-surface-700 rounded w-3/4 mb-3" />
      <div className="h-3 bg-surface-700 rounded w-1/2 mb-2" />
      <div className="h-3 bg-surface-700 rounded w-2/3 mb-4" />
      <div className="h-8 bg-surface-700 rounded w-1/3" />
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
