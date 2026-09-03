"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Mic,
  MicOff,
  Play,
  Square,
  Clock,
  MessageSquare,
  ArrowRight,
  Volume2,
  VolumeX,
  Pause,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { VoiceLoading } from "@/components/ui/Loading";

interface InterviewData {
  id: string;
  title: string;
  role: string;
  experience: string;
  techStack: string;
  questionCount: number;
  questions: Array<{
    id: string;
    question: string;
    category: string;
    difficulty: string;
  }>;
}

interface TranscriptEntry {
  role: "interviewer" | "candidate";
  content: string;
  timestamp: number;
}

interface SessionData {
  id: string;
  status: string;
  transcript: TranscriptEntry[];
}

export default function InterviewPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params.id as string;

  const [interview, setInterview] = useState<InterviewData | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [muted, setMuted] = useState(false);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const scrollToBottom = useCallback(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("currentInterview");
    if (stored) {
      try {
        setInterview(JSON.parse(stored));
      } catch {
        router.push("/create");
      }
    } else {
      router.push("/create");
    }
    setLoading(false);
  }, [router, interviewId]);

  useEffect(() => {
    scrollToBottom();
  }, [transcript, scrollToBottom]);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused]);

  const startSession = async () => {
    setConnecting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch("/api/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSession(data);
        setTranscript(data.transcript);
        setIsActive(true);
        setConnecting(false);

        // Read the first question aloud
        if (interview && interview.questions.length > 0) {
          speakText(interview.questions[0].question);
        }
      }
    } catch {
      setConnecting(false);
    }
  };

  const speakText = (text: string) => {
    if (muted) return;
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsSpeaking(false);
      startListening();
    };
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      // Fallback: use text input if speech recognition is not available
      handleTextFallback();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript_text =
        event.results[event.results.length - 1][0].transcript;
      addCandidateResponse(transcript_text);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleTextFallback = () => {
    // If speech recognition is not available, show a text input
    setIsListening(true);
  };

  const addCandidateResponse = (text: string) => {
    const entry: TranscriptEntry = {
      role: "candidate",
      content: text,
      timestamp: Date.now(),
    };

    setTranscript((prev) => [...prev, entry]);
    setIsListening(false);

    // Move to next question after a short delay
    setTimeout(() => {
      const nextIdx = currentQuestionIdx + 1;
      if (interview && nextIdx < interview.questions.length) {
        setCurrentQuestionIdx(nextIdx);
        const nextQ = interview.questions[nextIdx];
        setTranscript((prev) => [
          ...prev,
          {
            role: "interviewer" as const,
            content: nextQ.question,
            timestamp: Date.now(),
          },
        ]);
        speakText(nextQ.question);
      } else {
        // Interview complete
        endSession();
      }
    }, 800);
  };

  const addTextInputResponse = (text: string) => {
    addCandidateResponse(text);
  };

  const endSession = async () => {
    setIsActive(false);
    stopListening();
    window.speechSynthesis?.cancel();

    if (session) {
      try {
        await fetch("/api/session/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: session.id,
            transcript,
            duration: elapsedTime,
            status: "completed",
          }),
        });

        // Generate feedback
        const feedbackRes = await fetch("/api/session/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: session.id }),
        });

        const feedbackData = await feedbackRes.json();

        localStorage.setItem(
          "currentFeedback",
          JSON.stringify({
            sessionId: session.id,
            feedback: feedbackData.feedback,
            transcript,
            interview,
            duration: elapsedTime,
          })
        );

        router.push(`/feedback/${session.id}`);
      } catch {
        console.error("Failed to save session");
      }
    }
  };

  const pauseSession = () => {
    setIsPaused(true);
    stopListening();
    window.speechSynthesis?.pause();
  };

  const resumeSession = () => {
    setIsPaused(false);
    window.speechSynthesis?.resume();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-surface-600 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-400 font-display">Loading interview...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-surface-400 font-display mb-4">
            No interview found
          </p>
          <Button onClick={() => router.push("/create")}>
            Create New Interview
          </Button>
        </div>
      </div>
    );
  }

  const [textInput, setTextInput] = useState("");

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col">
      {/* Header */}
      <div className="glass-card border-b border-surface-700/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="brand">
              {currentQuestionIdx + 1} / {interview.questions.length}
            </Badge>
            <span className="text-sm text-surface-400 font-display hidden sm:inline">
              {interview.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-surface-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">
                {formatTime(elapsedTime)}
              </span>
            </div>
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-700/50 transition-colors"
            >
              {muted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        {/* Voice Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
          {!isActive ? (
            <div className="text-center max-w-md animate-fade-in">
              <div className="w-24 h-24 rounded-3xl bg-gradient-brand flex items-center justify-center mx-auto mb-8 hover-glow">
                <Mic className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-3">
                {interview.title}
              </h2>
              <p className="text-surface-400 mb-2">
                {interview.questions.length} questions ready
              </p>
              <p className="text-surface-500 text-sm mb-8">
                {interview.questions
                  .map((q) => q.category)
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .join(" / ")}
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={startSession}
                loading={connecting}
                icon={<Play className="w-5 h-5" />}
              >
                Start Interview
              </Button>
            </div>
          ) : (
            <div className="text-center">
              {/* Voice Visualization */}
              <div className="relative mb-8">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSpeaking
                      ? "bg-brand-500/20 voice-ring"
                      : isListening
                      ? "bg-accent-500/20"
                      : isPaused
                      ? "bg-surface-700/30"
                      : "bg-surface-700/30"
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSpeaking
                        ? "bg-brand-500/30"
                        : isListening
                        ? "bg-accent-500/30"
                        : "bg-surface-700/50"
                    }`}
                  >
                    {isSpeaking ? (
                      <Volume2 className="w-8 h-8 text-brand-300 animate-pulse" />
                    ) : isListening ? (
                      <Mic className="w-8 h-8 text-accent-300 animate-pulse" />
                    ) : (
                      <Pause className="w-8 h-8 text-surface-400" />
                    )}
                  </div>
                </div>

                {/* Waveform bars */}
                {(isSpeaking || isListening) && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div
                        key={i}
                        className={`w-1 rounded-full waveform-bar ${
                          isSpeaking ? "bg-brand-400" : "bg-accent-400"
                        }`}
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: isSpeaking ? "1.2s" : "0.8s",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <p className="text-lg font-display font-medium text-white mb-2 mt-10">
                {isSpeaking
                  ? "AI is speaking..."
                  : isListening
                  ? "Your turn to speak"
                  : isPaused
                  ? "Paused"
                  : "Processing..."}
              </p>

              {isListening && (
                <p className="text-sm text-surface-500 mb-6">
                  Click the microphone or type your answer below
                </p>
              )}

              <div className="flex items-center justify-center gap-3 mt-6">
                {isListening && (
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={stopListening}
                    icon={<MicOff className="w-5 h-5" />}
                  >
                    Stop
                  </Button>
                )}

                {isPaused ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={resumeSession}
                    icon={<Play className="w-5 h-5" />}
                  >
                    Resume
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={pauseSession}
                    icon={<Pause className="w-5 h-5" />}
                  >
                    Pause
                  </Button>
                )}

                <Button
                  variant="danger"
                  size="lg"
                  onClick={endSession}
                  icon={<Square className="w-5 h-5" />}
                >
                  End
                </Button>
              </div>

              {/* Text Input Fallback */}
              {isListening && (
                <div className="mt-8 max-w-md mx-auto">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (textInput.trim()) {
                        addTextInputResponse(textInput.trim());
                        setTextInput("");
                      }
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Or type your answer here..."
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-800/50 border border-surface-600/50 text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!textInput.trim()}
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Send
                    </Button>
                  </form>
                </div>
              )}

              {/* Current Question */}
              <div className="mt-8 glass-card rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-brand-400" />
                  <span className="text-xs text-surface-500 font-display uppercase tracking-wider">
                    Current Question
                  </span>
                </div>
                <p className="text-sm text-surface-300">
                  {interview.questions[currentQuestionIdx]?.question ||
                    "Interview complete!"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Transcript Panel */}
        <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-surface-700/30 flex flex-col max-h-[40vh] lg:max-h-none">
          <div className="px-4 py-3 border-b border-surface-700/30 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-display font-semibold text-white">
              Transcript
            </span>
            <span className="text-xs text-surface-500 ml-auto">
              {transcript.length} messages
            </span>
          </div>

          <div
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"
          >
            {transcript.map((entry, idx) => (
              <div
                key={idx}
                className={`animate-slide-up ${
                  entry.role === "interviewer" ? "" : ""
                }`}
              >
                <div
                  className={`rounded-xl p-3 ${
                    entry.role === "interviewer"
                      ? "bg-brand-500/10 border border-brand-500/10"
                      : "bg-surface-800/50 border border-surface-700/30 ml-4"
                  }`}
                >
                  <p className="text-xs text-surface-500 font-display mb-1">
                    {entry.role === "interviewer"
                      ? "Interviewer"
                      : "You"}
                  </p>
                  <p className="text-sm text-surface-200 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              </div>
            ))}

            {isListening && (
              <div className="flex items-center gap-2 text-surface-500">
                <VoiceLoading />
                <span className="text-xs">Listening...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
