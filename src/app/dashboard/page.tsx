"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  History,
  Clock,
  BarChart3,
  ArrowRight,
  Calendar,
  Briefcase,
  Code2,
  Search,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { SkeletonCard } from "@/components/ui/Loading";

interface Session {
  id: string;
  transcript: Array<{
    role: string;
    content: string;
    timestamp: number;
  }>;
  status: string;
  duration: number;
  feedback: {
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
  } | null;
  overallScore: number | null;
  createdAt: string;
  interview: {
    title: string;
    role: string;
    experience: string;
    techStack: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/login");
      return;
    }

    fetchSessions();
  }, [router]);

  const fetchSessions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(`/api/sessions?userId=${user.id || ""}`);
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      console.error("Failed to load sessions");
    }
    setLoading(false);
  };

  const filteredSessions = sessions.filter((s) => {
    return (
      s.interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.interview.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const stats = {
    total: sessions.length,
    completed: sessions.filter((s) => s.status === "completed").length,
    avgScore: sessions.length
      ? Math.round(
          sessions.reduce(
            (acc, s) => acc + (s.overallScore || 0),
            0
          ) / sessions.length
        )
      : 0,
    totalMinutes: Math.round(
      sessions.reduce((acc, s) => acc + s.duration, 0) / 60
    ),
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[#276749]";
    if (score >= 60) return "text-[#b45309]";
    if (score >= 40) return "text-[#b45309]";
    return "text-[#c0392b]";
  };

  return (
    <div className="min-h-screen py-12 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-[24px] text-[#1a1714] mb-1">
            Session History
          </h1>
          <p className="text-[14px] text-[#a8a09a]">
            Your interview practice, tracked.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#ebe5dd] bg-white border border-[#ddd6ce] rounded mb-8">
          {[
            { label: "Total", value: stats.total, color: "#6b6560" },
            { label: "Avg Score", value: stats.avgScore || "—", color: "#b45309" },
            { label: "Practice", value: `${stats.totalMinutes}m`, color: "#6b6560" },
            { label: "Done", value: stats.completed, color: "#276749" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 text-center first:text-left">
              <p className="text-[11px] text-[#a8a09a] uppercase tracking-wider font-medium mb-1">
                {stat.label}
              </p>
              <p className="font-display text-[22px] text-[#1a1714]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a8a09a]" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#ddd6ce] rounded text-[#1a1714] text-[13px] placeholder-[#a8a09a] outline-none focus:border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/10 transition-all"
          />
        </div>

        {/* Sessions */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#ddd6ce] rounded">
            <div className="w-10 h-10 rounded bg-[#f0ece6] flex items-center justify-center mx-auto mb-4">
              <History className="w-5 h-5 text-[#a8a09a]" />
            </div>
            <h3 className="font-display text-[16px] text-[#1a1714] mb-1">
              No sessions yet
            </h3>
            <p className="text-[13px] text-[#a8a09a] mb-5">
              Start your first interview to see it here.
            </p>
            <Link href="/create">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Create interview
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-px bg-[#ddd6ce] rounded overflow-hidden border border-[#ddd6ce]">
            {filteredSessions.map((session) => (
              <Link
                key={session.id}
                href={`/feedback/${session.id}`}
                className="block bg-white hover:bg-[#f7f5f2] transition-colors"
              >
                <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-[14px] text-[#1a1714] truncate">
                        {session.interview.title}
                      </h3>
                      <Badge
                        variant={
                          session.status === "completed"
                            ? "success"
                            : "warning"
                        }
                      >
                        {session.status === "completed" ? "Done" : "Active"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#a8a09a]">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {session.interview.role.replace(/-/g, " ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3 h-3" />
                        {session.interview.techStack.replace(/-/g, " ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(session.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(session.createdAt)}
                      </span>
                    </div>
                  </div>

                  {session.overallScore !== null && (
                    <div className="text-right">
                      <p className={`font-display text-[20px] ${getScoreColor(session.overallScore)}`}>
                        {session.overallScore}
                      </p>
                      <p className="text-[10px] text-[#a8a09a] uppercase tracking-wider">Score</p>
                    </div>
                  )}

                  <ArrowRight className="w-4 h-4 text-[#ddd6ce] hidden sm:block" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
