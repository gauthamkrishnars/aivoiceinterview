"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create account");
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
        <h1 className="font-display text-[24px] text-[#1a1714] mb-1">
          Create your account
        </h1>
        <p className="text-[14px] text-[#6b6560] mb-8">
          Free forever. No credit card needed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded bg-[#fdf0ee] border border-[#c0392b]/20 text-[13px] text-[#c0392b]">
              {error}
            </div>
          )}

          <Input
            label="Full name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            size="lg"
            loading={loading}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Create account
          </Button>
        </form>

        <p className="mt-6 text-[13px] text-[#6b6560]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#c0392b] hover:text-[#a93226] font-medium transition-colors">
            Log in
          </Link>
        </p>
        <p className="mt-2 text-[13px] text-[#a8a09a]">
          <Link href="/auth/guest" className="hover:text-[#6b6560] transition-colors">
            Or try without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
