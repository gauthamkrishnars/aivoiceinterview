"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
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
    <div className="min-h-screen flex items-start justify-center px-5 pt-32">
      <div className="w-full max-w-sm">
        <div className="w-10 h-10 rounded bg-[#c0392b] flex items-center justify-center mb-6">
          <span className="text-white font-display text-[16px]">V</span>
        </div>

        <h1 className="font-display text-[24px] text-[#1a1714] mb-2">
          Jump right in
        </h1>
        <p className="text-[14px] text-[#6b6560] mb-8 leading-relaxed">
          No account needed. Your data stays on this device until you close the browser.
        </p>

        <div className="space-y-4 mb-6">
          {[
            { title: "AI voice interviews", desc: "Full conversation with real time responses" },
            { title: "Personalized questions", desc: "Tailored to your role, experience, and stack" },
            { title: "Detailed feedback", desc: "Score, strengths, weaknesses, and practice tips" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#c0392b] mt-2 flex-shrink-0" />
              <div>
                <p className="text-[13px] text-[#1a1714] font-medium">
                  {item.title}
                </p>
                <p className="text-[12px] text-[#a8a09a]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleGuestLogin}
          variant="primary"
          className="w-full"
          size="lg"
          loading={loading}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Start as guest
        </Button>

        <p className="mt-4 text-[12px] text-[#a8a09a]">
          Guest sessions are saved locally on your device.
        </p>
      </div>
    </div>
  );
}
