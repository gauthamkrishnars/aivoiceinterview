"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/create");
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center px-5 pt-32">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-[24px] font-medium text-[#f0f0f0] mb-1">
          Welcome back
        </h1>
        <p className="text-[14px] text-[#555] mb-8">
          Pick up where you left off.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded bg-[#d44]/10 border border-[#d44]/20 text-[13px] text-[#f87171]">
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            loading={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Log in
          </Button>
        </form>

        <p className="mt-6 text-[13px] text-[#555]">
          No account?{" "}
          <Link href="/auth/signup" className="text-[#e8a44a] hover:text-[#c4873a] transition-colors">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-[13px] text-[#333]">
          <Link href="/auth/guest" className="hover:text-[#555] transition-colors">
            Or try without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
