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
import Button from "@/components/ui/Button";

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-surface-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center group-hover:shadow-lg group-hover:shadow-brand-500/25 transition-all duration-200">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              VoicePrep
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" icon={<History className="w-4 h-4" />}>
                    History
                  </Button>
                </Link>
                <Link href="/create">
                  <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                    New Interview
                  </Button>
                </Link>
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-surface-700/50">
                  <div className="w-8 h-8 rounded-full bg-surface-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-surface-300" />
                  </div>
                  <span className="text-sm text-surface-300 font-display">
                    {user.name || "Guest"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/auth/guest">
                  <Button variant="secondary" size="sm">
                    Try as Guest
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-surface-700/30 animate-slide-down">
          <div className="p-4 space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-surface-300 hover:text-white hover:bg-surface-700/50 transition-colors"
                >
                  <History className="w-5 h-5" />
                  History
                </Link>
                <Link
                  href="/create"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-600 text-white"
                >
                  <Plus className="w-5 h-5" />
                  New Interview
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 text-surface-400">
                  <User className="w-5 h-5" />
                  {user.name}
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-surface-300 hover:text-white hover:bg-surface-700/50 transition-colors font-display"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl bg-brand-600 text-white text-center font-display"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/guest"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl glass-card text-surface-300 text-center font-display"
                >
                  Try as Guest
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
