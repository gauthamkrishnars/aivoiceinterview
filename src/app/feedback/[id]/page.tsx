"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  Trophy,
  TrendingUp,
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
    if (score >= 80) return "#276749";
    if (score >= 60) return "#b45309";
    if (score >= 40) return "#b45309";
    return "#c0392b";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Strong";
    if (score >= 70) return "Good";
    if (score >= 60) return "Average";
    if (score >= 50) return "Below average";
    return "Needs work";
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <SpinnerLoading size="lg" />
          <p className="text-[13px] text-[#6b6560]">Analyzing your performance...</p>
        </div>
      </div>
    );
  }

  if (!sessionInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[14px] text-[#6b6560] mb-4">Session not found</p>
          <Link href="/dashboard">
            <Button>Back to dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { feedback } = sessionInfo;
  const scoreColor = getScoreColor(feedback.overallScore);

  return (
    <div className="min-h-screen py-12 px-5">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-[#c0392b]/20 bg-[#fdf0ee] text-[#c0392b] text-[11px] font-medium mb-4">
            <Trophy className="w-3 h-3" />
            Interview complete
          </div>
          <h1 className="font-display text-[24px] text-[#1a1714] mb-1">
            Your results
          </h1>
          <p className="text-[14px] text-[#a8a09a]">
            Here is the breakdown of your performance.
          </p>
        </div>

        {/* Score */}
        <div className="mb-8 bg-white border border-[#ddd6ce] rounded p-8 text-center">
          <div className="relative w-28 h-28 mx-auto mb-5">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#ebe5dd" strokeWidth="6" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={scoreColor}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${(feedback.overallScore / 100) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <p className="font-display text-[32px]" style={{ color: scoreColor }}>
                  {feedback.overallScore}
                </p>
                <p className="text-[10px] text-[#a8a09a]">/100</p>
              </div>
            </div>
          </div>
          <p className="font-display text-[16px] text-[#1a1714] mb-0.5">
            {getScoreLabel(feedback.overallScore)}
          </p>
          <p className="text-[12px] text-[#a8a09a]">Overall performance</p>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-3 bg-white border border-[#ddd6ce] rounded overflow-hidden mb-8">
          {[
            { label: "Technical", score: feedback.technicalScore, icon: Brain },
            { label: "Communication", score: feedback.communicationScore, icon: MessageSquare },
            { label: "Confidence", score: feedback.confidenceScore, icon: Heart },
          ].map((item) => {
            const Icon = item.icon;
            const color = getScoreColor(item.score);
            return (
              <div key={item.label} className={`p-5 text-center ${item.label !== "Technical" ? "border-l border-[#ebe5dd]" : ""}`}>
                <Icon className="w-4 h-4 mx-auto mb-2" style={{ color }} />
                <p className="text-[10px] text-[#a8a09a] uppercase tracking-wider font-medium mb-1">
                  {item.label}
                </p>
                <p className="font-display text-[20px] text-[#1a1714]">
                  {item.score}
                </p>
                <div className="mt-3 h-1 rounded-full bg-[#f0ece6] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.score}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Analysis */}
        <div className="bg-white border border-[#ddd6ce] rounded p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-[#b45309]" />
            <h2 className="font-display text-[14px] text-[#1a1714]">
              Analysis
            </h2>
          </div>
          <p className="text-[13px] text-[#6b6560] leading-relaxed">
            {feedback.detailedAnalysis}
          </p>
        </div>

        {/* Strengths + Weaknesses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-white border border-[#ddd6ce] rounded p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#276749]" />
              <h3 className="text-[13px] font-medium text-[#1a1714]">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#276749] mt-1.5 flex-shrink-0" />
                  <span className="text-[12px] text-[#6b6560] leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#ddd6ce] rounded p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-[#b45309]" />
              <h3 className="text-[13px] font-medium text-[#1a1714]">Improve</h3>
            </div>
            <ul className="space-y-2">
              {feedback.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b45309] mt-1.5 flex-shrink-0" />
                  <span className="text-[12px] text-[#6b6560] leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practice exercises */}
        <div className="bg-white border border-[#ddd6ce] rounded p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-[#b45309]" />
            <h3 className="text-[13px] font-medium text-[#1a1714]">Practice exercises</h3>
          </div>
          <ul className="space-y-2">
            {feedback.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 p-2.5 rounded bg-[#f7f5f2] border border-[#ebe5dd]">
                <span className="flex-shrink-0 w-5 h-5 rounded bg-[#fdf0ee] text-[#c0392b] text-[10px] font-medium flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-[12px] text-[#6b6560] leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transcript */}
        <div className="bg-white border border-[#ddd6ce] rounded mb-4">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center justify-between w-full p-4"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#c0392b]" />
              <span className="text-[13px] font-medium text-[#1a1714]">Transcript</span>
              <Badge variant="default">{sessionInfo.transcript.length}</Badge>
            </div>
            {showTranscript ? (
              <ChevronUp className="w-4 h-4 text-[#a8a09a]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#a8a09a]" />
            )}
          </button>

          {showTranscript && (
            <div className="border-t border-[#ebe5dd] p-4 space-y-2">
              {sessionInfo.transcript.map((entry, idx) => (
                <div
                  key={idx}
                  className={`rounded p-2.5 ${
                    entry.role === "interviewer"
                      ? "bg-[#f7f5f2] border border-[#ebe5dd]"
                      : "bg-[#fdf0ee] border border-[#c0392b]/10 ml-3"
                  }`}
                >
                  <p className="text-[10px] text-[#a8a09a] uppercase tracking-wider mb-1 font-medium">
                    {entry.role === "interviewer" ? "Interviewer" : "You"}
                  </p>
                  <p className="text-[12px] text-[#6b6560] leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Session info */}
        <div className="flex flex-wrap gap-4 text-[12px] text-[#a8a09a] mb-8">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {formatDuration(sessionInfo.duration)}
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3 h-3" />
            {sessionInfo.interview.questions?.length || 0} questions
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Link href="/create">
            <Button variant="primary" icon={<RotateCcw className="w-4 h-4" />}>
              Practice again
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" />}>
              All sessions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
