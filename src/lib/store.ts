"use client";

import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email?: string;
  isGuest: boolean;
}

interface TranscriptEntry {
  role: "interviewer" | "candidate";
  content: string;
  timestamp: number;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  currentInterviewId: string | null;
  setCurrentInterviewId: (id: string | null) => void;
  currentSessionId: string | null;
  setCurrentSessionId: (id: string | null) => void;
  transcript: TranscriptEntry[];
  addToTranscript: (entry: TranscriptEntry) => void;
  clearTranscript: () => void;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  isSpeaking: boolean;
  setIsSpeaking: (isSpeaking: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  currentInterviewId: null,
  setCurrentInterviewId: (id) => set({ currentInterviewId: id }),
  currentSessionId: null,
  setCurrentSessionId: (id) => set({ currentSessionId: id }),
  transcript: [],
  addToTranscript: (entry) =>
    set((state) => ({ transcript: [...state.transcript, entry] })),
  clearTranscript: () => set({ transcript: [] }),
  isRecording: false,
  setIsRecording: (isRecording) => set({ isRecording }),
  isSpeaking: false,
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
}));
