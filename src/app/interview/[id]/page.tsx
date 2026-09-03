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
  const [textInput, setTextInput] = useState("");

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
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ebe5dd] border-t-[#c0392b] rounded-full animate-spin" />
          <p className="text-[13px] text-[#6b6560]">Loading interview...</p>
        </div>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[14px] text-[#6b6560] mb-4">No interview found</p>
          <Button onClick={() => router.push("/create")}>Create new interview</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0ece6]">
      {/* Header */}
      <div className="border-b border-[#ddd6ce] bg-white px-5 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="accent">
              {currentQuestionIdx + 1} / {interview.questions.length}
            </Badge>
            <span className="text-[13px] text-[#6b6560] hidden sm:inline">
              {interview.title}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#6b6560]">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[12px] font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <button
              onClick={() => setMuted(!muted)}
              className="p-1.5 rounded text-[#a8a09a] hover:text-[#1a1714] hover:bg-[#f0ece6] transition-colors"
            >
              {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full">
        {/* Voice Interface */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12">
          {!isActive ? (
            <div className="text-center max-w-md">
              <div className="w-14 h-14 rounded bg-[#c0392b] flex items-center justify-center mx-auto mb-6">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-display text-[20px] text-[#1a1714] mb-2">
                {interview.title}
              </h2>
              <p className="text-[13px] text-[#a8a09a] mb-1">
                {interview.questions.length} questions ready
              </p>
              <p className="text-[12px] text-[#a8a09a] mb-8">
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
                icon={<Play className="w-4 h-4" />}
              >
                Start interview
              </Button>
            </div>
          ) : (
            <div className="text-center">
              {/* Voice indicator */}
              <div className="mb-8">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSpeaking
                      ? "bg-[#c0392b]/10 ring-2 ring-[#c0392b]/20 ring-offset-4 ring-offset-[#f0ece6]"
                      : isListening
                      ? "bg-[#c0392b]/5 ring-2 ring-[#c0392b]/10 ring-offset-4 ring-offset-[#f0ece6]"
                      : "bg-white border border-[#ddd6ce]"
                  }`}
                >
                  {isSpeaking ? (
                    <Volume2 className="w-7 h-7 text-[#c0392b]" />
                  ) : isListening ? (
                    <Mic className="w-7 h-7 text-[#c0392b]" />
                  ) : (
                    <Pause className="w-7 h-7 text-[#a8a09a]" />
                  )}
                </div>
              </div>

              <p className="text-[14px] text-[#1a1714] mb-1">
                {isSpeaking
                  ? "AI is speaking..."
                  : isListening
                  ? "Your turn"
                  : isPaused
                  ? "Paused"
                  : "Starting..."}
              </p>

              {isListening && (
                <p className="text-[12px] text-[#a8a09a] mb-6">
                  Speak or type your answer below
                </p>
              )}

              <div className="flex items-center justify-center gap-2 mt-6">
                {isListening && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={stopListening}
                    icon={<MicOff className="w-3.5 h-3.5" />}
                  >
                    Stop
                  </Button>
                )}

                {isPaused ? (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={resumeSession}
                    icon={<Play className="w-3.5 h-3.5" />}
                  >
                    Resume
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={pauseSession}
                    icon={<Pause className="w-3.5 h-3.5" />}
                  >
                    Pause
                  </Button>
                )}

                <Button
                  variant="danger"
                  size="sm"
                  onClick={endSession}
                  icon={<Square className="w-3.5 h-3.5" />}
                >
                  End
                </Button>
              </div>

              {/* Text input */}
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
                      placeholder="Type your answer..."
                      className="flex-1 px-3 py-2 bg-white border border-[#ddd6ce] rounded text-[#1a1714] text-[14px] placeholder-[#a8a09a] outline-none focus:border-[#c0392b] focus:ring-2 focus:ring-[#c0392b]/10 transition-all"
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

              {/* Current question */}
              <div className="mt-8 bg-white border border-[#ddd6ce] rounded p-4 max-w-md mx-auto text-left">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#c0392b]" />
                  <span className="text-[11px] text-[#a8a09a] uppercase tracking-wider font-medium">
                    Current question
                  </span>
                </div>
                <p className="text-[13px] text-[#6b6560] leading-relaxed">
                  {interview.questions[currentQuestionIdx]?.question || "Interview complete"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Transcript */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-[#ddd6ce] bg-white flex flex-col max-h-[40vh] lg:max-h-none">
          <div className="px-4 py-2.5 border-b border-[#ebe5dd] flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#c0392b]" />
            <span className="text-[12px] font-medium text-[#1a1714]">Transcript</span>
            <span className="text-[11px] text-[#a8a09a] ml-auto">
              {transcript.length}
            </span>
          </div>

          <div
            ref={transcriptRef}
            className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin"
          >
            {transcript.map((entry, idx) => (
              <div key={idx}>
                <div
                  className={`rounded p-2.5 ${
                    entry.role === "interviewer"
                      ? "bg-[#f0ece6] border border-[#ebe5dd]"
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
              </div>
            ))}

            {isListening && (
              <div className="flex items-center gap-2 text-[#a8a09a] p-2">
                <VoiceLoading />
                <span className="text-[11px]">Listening...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
