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
  Filter,
  Search,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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
  const [filterStatus, setFilterStatus] = useState("all");

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
    const matchesSearch =
      s.interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.interview.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || s.status === filterStatus;
    return matchesSearch && matchesFilter;
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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-accent-400";
    if (score >= 40) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-mesh">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
            Session History
          </h1>
          <p className="text-surface-400">
            Track your progress across all interview sessions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center">
                <History className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">
                  {stats.total}
                </p>
                <p className="text-xs text-surface-500">Total Sessions</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">
                  {stats.avgScore || "—"}
                </p>
                <p className="text-xs text-surface-500">Avg Score</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-400" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">
                  {stats.totalMinutes}m
                </p>
                <p className="text-xs text-surface-500">Practice Time</p>
              </div>
            </div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">
                  {stats.completed}
                </p>
                <p className="text-xs text-surface-500">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            <input
              type="text"
              placeholder="Search by role or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-800/50 border border-surface-600/50 text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-surface-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-surface-800/50 border border-surface-600/50 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="active">In Progress</option>
            </select>
          </div>
        </div>

        {/* Session List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-surface-800/50 flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-surface-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2">
              No sessions yet
            </h3>
            <p className="text-surface-400 text-sm mb-6">
              Start your first interview to see it appear here.
            </p>
            <Link href="/create">
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Create Interview
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <Link
                key={session.id}
                href={`/feedback/${session.id}`}
                className="block"
              >
                <Card hover className="group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-white truncate group-hover:text-brand-300 transition-colors">
                          {session.interview.title}
                        </h3>
                        <Badge
                          variant={
                            session.status === "completed"
                              ? "success"
                              : "warning"
                          }
                        >
                          {session.status === "completed"
                            ? "Done"
                            : "Active"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-surface-500">
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
                        <p
                          className={`text-2xl font-display font-bold ${getScoreColor(
                            session.overallScore
                          )}`}
                        >
                          {session.overallScore}
                        </p>
                        <p className="text-xs text-surface-500">Score</p>
                      </div>
                    )}

                    <ArrowRight className="w-5 h-5 text-surface-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all hidden sm:block" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
