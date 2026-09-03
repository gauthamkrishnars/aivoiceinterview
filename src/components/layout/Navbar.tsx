"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mic,
  Menu,
  X,
  History,
  Plus,
  LogOut,
  User,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    isGuest: boolean;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#ebe5dd]">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded bg-[#c0392b] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-display text-[17px] text-[#1a1714] tracking-tight">
            VoicePrep
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#6b6560] hover:text-[#1a1714] hover:bg-[#f0ece6] rounded transition-colors"
              >
                <History className="w-3.5 h-3.5" />
                History
              </Link>
              <Link
                href="/create"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#c0392b] hover:bg-[#a93226] rounded transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                New Interview
              </Link>
              <div className="w-px h-4 bg-[#ebe5dd] mx-2" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#f0ece6] border border-[#ddd6ce] flex items-center justify-center">
                  <User className="w-3 h-3 text-[#6b6560]" />
                </div>
                <span className="text-[13px] text-[#6b6560]">
                  {user.name || "Guest"}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded text-[#a8a09a] hover:text-[#c0392b] hover:bg-[#fdf0ee] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-[13px] text-[#6b6560] hover:text-[#1a1714] transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="px-3 py-1.5 text-[13px] font-medium text-white bg-[#c0392b] hover:bg-[#a93226] rounded transition-colors"
              >
                Sign up
              </Link>
              <Link
                href="/auth/guest"
                className="px-3 py-1.5 text-[13px] text-[#a8a09a] border border-[#ddd6ce] rounded hover:border-[#a8a09a] hover:text-[#6b6560] transition-colors"
              >
                Guest
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded text-[#6b6560] hover:text-[#1a1714] hover:bg-[#f0ece6] transition-colors"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#ebe5dd] bg-white">
          <div className="p-3 space-y-1">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded text-[13px] text-[#6b6560] hover:text-[#1a1714] hover:bg-[#f0ece6] transition-colors"
                >
                  <History className="w-4 h-4" />
                  History
                </Link>
                <Link
                  href="/create"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded text-[13px] font-medium text-white bg-[#c0392b] hover:bg-[#a93226] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New Interview
                </Link>
                <div className="h-px bg-[#ebe5dd] my-1" />
                <div className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#a8a09a]">
                  <User className="w-4 h-4" />
                  {user.name}
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded text-[13px] text-[#c0392b] hover:bg-[#fdf0ee] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded text-[13px] text-[#6b6560] hover:text-[#1a1714] hover:bg-[#f0ece6] transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded text-[13px] font-medium text-white bg-[#c0392b] text-center"
                >
                  Sign up
                </Link>
                <Link
                  href="/auth/guest"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded text-[13px] text-[#a8a09a] text-center border border-[#ddd6ce]"
                >
                  Try as guest
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
