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
    if (score >= 80) return "text-[#4ade80]";
    if (score >= 60) return "text-[#e8a44a]";
    if (score >= 40) return "text-[#fbbf24]";
    return "text-[#f87171]";
  };

  return (
    <div className="min-h-screen py-12 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-[24px] font-medium text-[#f0f0f0] mb-1">
            Session History
          </h1>
          <p className="text-[14px] text-[#555]">
            Your interview practice, tracked.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1e1e1e] mb-8">
          {[
            { label: "Total", value: stats.total, icon: History, color: "#8a8a8a" },
            { label: "Avg Score", value: stats.avgScore || "—", icon: BarChart3, color: "#e8a44a" },
            { label: "Practice", value: `${stats.totalMinutes}m`, icon: Clock, color: "#8a8a8a" },
            { label: "Done", value: stats.completed, icon: BarChart3, color: "#4ade80" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#0c0c0c] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                  <span className="text-[11px] text-[#555] uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                </div>
                <p className="font-display text-[22px] font-medium text-[#f0f0f0]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0c0c0c] border border-[#262626] rounded-md text-[#f0f0f0] text-[13px] placeholder-[#555] outline-none focus:border-[#e8a44a] transition-colors"
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
          <div className="text-center py-16">
            <div className="w-10 h-10 rounded bg-[#141414] border border-[#262626] flex items-center justify-center mx-auto mb-4">
              <History className="w-5 h-5 text-[#555]" />
            </div>
            <h3 className="font-display text-[16px] font-medium text-[#f0f0f0] mb-1">
              No sessions yet
            </h3>
            <p className="text-[13px] text-[#555] mb-5">
              Start your first interview to see it here.
            </p>
            <Link href="/create">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Create interview
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-px bg-[#1e1e1e] rounded overflow-hidden">
            {filteredSessions.map((session) => (
              <Link
                key={session.id}
                href={`/feedback/${session.id}`}
                className="block bg-[#0c0c0c] hover:bg-[#141414] transition-colors"
              >
                <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-[14px] font-medium text-[#f0f0f0] truncate">
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
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#555]">
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
                      <p className={`font-display text-[20px] font-medium ${getScoreColor(session.overallScore)}`}>
                        {session.overallScore}
                      </p>
                      <p className="text-[10px] text-[#555] uppercase tracking-wider">Score</p>
                    </div>
                  )}

                  <ArrowRight className="w-4 h-4 text-[#333] hidden sm:block" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
