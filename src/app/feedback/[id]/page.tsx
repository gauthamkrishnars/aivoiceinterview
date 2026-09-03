"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  BarChart3,
  MessageSquare,
  Clock,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Target,
  Brain,
  Heart,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { SpinnerLoading } from "@/components/ui/Loading";

interface FeedbackData {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  detailedAnalysis: string;
}

interface SessionInfo {
  sessionId: string;
  feedback: FeedbackData;
  transcript: Array<{
    role: string;
    content: string;
    timestamp: number;
  }>;
  interview: {
    title: string;
    role: string;
    experience: string;
    techStack: string;
    questions: Array<{
      id: string;
      question: string;
      category: string;
    }>;
  };
  duration: number;
}

export default function FeedbackPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    // Try to get from localStorage first
    const stored = localStorage.getItem("currentFeedback");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.sessionId === sessionId) {
          setSessionInfo(data);
          setLoading(false);
          return;
        }
      } catch {
        // fallback
      }
    }

    // Otherwise try to fetch
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/sessions`);
        const data = await res.json();
        const session = data.sessions?.find(
          (s: { id: string }) => s.id === sessionId
        );
        if (session) {
          setSessionInfo({
            sessionId: session.id,
            feedback: session.feedback || {
              overallScore: 0,
              technicalScore: 0,
              communicationScore: 0,
              confidenceScore: 0,
              strengths: [],
              weaknesses: [],
              suggestions: [],
              detailedAnalysis: "No feedback available",
            },
            transcript: session.transcript,
            interview: session.interview,
            duration: session.duration,
          });
        }
      } catch {
        console.error("Failed to load feedback");
      }
      setLoading(false);
    };

    fetchFeedback();
  }, [sessionId]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "from-green-400 to-green-600";
    if (score >= 60) return "from-accent-400 to-accent-600";
    if (score >= 40) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below Average";
    return "Needs Work";
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <SpinnerLoading size="lg" />
          <p className="text-surface-400 font-display mt-4">
            Analyzing your performance...
          </p>
        </div>
      </div>
    );
  }

  if (!sessionInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-surface-400 font-display mb-4">
            Session not found
          </p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { feedback } = sessionInfo;

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-mesh">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-display mb-4">
            <Trophy className="w-3.5 h-3.5" />
            Interview Complete
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
            Your Results
          </h1>
          <p className="text-surface-400 max-w-md mx-auto">
            Here is the honest breakdown of your interview performance.
          </p>
        </div>

        {/* Overall Score */}
        <div className="mb-10 animate-slide-up">
          <Card className="text-center py-10">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-surface-800"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(feedback.overallScore / 100) * 283} 283`}
                  className={`text-gradient`}
                  style={{
                    stroke: `url(#scoreGradient)`,
                  }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={feedback.overallScore >= 60 ? "#22c55e" : feedback.overallScore >= 40 ? "#ffa726" : "#ef4444"} />
                    <stop offset="100%" stopColor={feedback.overallScore >= 60 ? "#16a34a" : feedback.overallScore >= 40 ? "#f57c00" : "#dc2626"} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <p className="text-4xl font-display font-bold text-white">
                    {feedback.overallScore}
                  </p>
                  <p className="text-xs text-surface-500">/100</p>
                </div>
              </div>
            </div>
            <p className="text-lg font-display font-semibold text-white mb-1">
              {getScoreLabel(feedback.overallScore)}
            </p>
            <p className="text-sm text-surface-500">
              Overall interview performance
            </p>
          </Card>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Technical",
              score: feedback.technicalScore,
              icon: Brain,
            },
            {
              label: "Communication",
              score: feedback.communicationScore,
              icon: MessageSquare,
            },
            {
              label: "Confidence",
              score: feedback.confidenceScore,
              icon: Heart,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="text-center">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <p className="text-xs text-surface-500 font-display uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-2xl font-display font-bold text-white">
                  {item.score}
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-surface-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(
                      item.score
                    )} transition-all duration-1000`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Analysis */}
        <Card className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-display font-bold text-white">
              Detailed Analysis
            </h2>
          </div>
          <p className="text-surface-300 leading-relaxed">
            {feedback.detailedAnalysis}
          </p>
        </Card>

        {/* Strengths and Weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <h3 className="font-display font-bold text-white">
                Strengths
              </h3>
            </div>
            <ul className="space-y-3">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="text-sm text-surface-300">{s}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-accent-400" />
              </div>
              <h3 className="font-display font-bold text-white">
                Areas to Improve
              </h3>
            </div>
            <ul className="space-y-3">
              {feedback.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent-400" />
                  </div>
                  <span className="text-sm text-surface-300">{w}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Suggestions */}
        <Card className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-brand-400" />
            </div>
            <h3 className="font-display font-bold text-white">
              Practice Exercises
            </h3>
          </div>
          <ul className="space-y-3">
            {feedback.suggestions.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-800/30"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 text-brand-300 text-xs font-display font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-surface-300">{s}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Transcript */}
        <Card className="mb-10">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-brand-400" />
              <h3 className="font-display font-bold text-white">
                Full Transcript
              </h3>
              <Badge variant="default">
                {sessionInfo.transcript.length} messages
              </Badge>
            </div>
            {showTranscript ? (
              <ChevronUp className="w-5 h-5 text-surface-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-surface-400" />
            )}
          </button>

          {showTranscript && (
            <div className="mt-6 space-y-3 border-t border-surface-700/30 pt-6">
              {sessionInfo.transcript.map((entry, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-3 ${
                    entry.role === "interviewer"
                      ? "bg-brand-500/10 border border-brand-500/10"
                      : "bg-surface-800/50 border border-surface-700/30 ml-4"
                  }`}
                >
                  <p className="text-xs text-surface-500 font-display mb-1">
                    {entry.role === "interviewer" ? "Interviewer" : "You"}
                  </p>
                  <p className="text-sm text-surface-200 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Session Info */}
        <div className="flex flex-wrap gap-4 text-sm text-surface-500 mb-10">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Duration: {formatDuration(sessionInfo.duration)}
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Questions: {sessionInfo.interview.questions?.length || "N/A"}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/create">
            <Button
              variant="primary"
              size="lg"
              icon={<RotateCcw className="w-5 h-5" />}
            >
              Practice Again
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              View All Sessions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
