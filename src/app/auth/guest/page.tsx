"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mic, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function GuestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGuestLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/guest", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/create");
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-mesh">
      <div className="w-full max-w-md text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-8">
          <Mic className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-display font-bold text-white mb-3">
          Jump right in
        </h1>
        <p className="text-surface-400 mb-8 leading-relaxed">
          No account needed. Your interview data stays on this device until
          you close the browser.
        </p>

        <div className="glass-card rounded-2xl p-8 space-y-6">
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
              </div>
              <div>
                <p className="text-sm text-surface-300 font-medium">
                  AI voice interviews
                </p>
                <p className="text-xs text-surface-500">
                  Full conversation with real time responses
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
              </div>
              <div>
                <p className="text-sm text-surface-300 font-medium">
                  Personalized questions
                </p>
                <p className="text-xs text-surface-500">
                  Tailored to your role, experience, and stack
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
              </div>
              <div>
                <p className="text-sm text-surface-300 font-medium">
                  Detailed feedback
                </p>
                <p className="text-xs text-surface-500">
                  Score, strengths, weaknesses, and practice tips
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGuestLogin}
            variant="primary"
            className="w-full"
            size="lg"
            loading={loading}
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start as Guest
          </Button>

          <p className="text-xs text-surface-500">
            Guest sessions are saved locally.{" "}
            <a
              href="#"
              className="text-surface-400 hover:text-white transition-colors underline"
              onClick={(e) => {
                e.preventDefault();
                // Could open privacy modal
              }}
            >
              See our privacy policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
