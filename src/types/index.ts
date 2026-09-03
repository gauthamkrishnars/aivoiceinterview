export interface InterviewConfig {
  role: string;
  experience: string;
  techStack: string;
  questionCount: number;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  followUp?: string;
}

export interface TranscriptEntry {
  role: "interviewer" | "candidate";
  content: string;
  timestamp: number;
}

export interface FeedbackData {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  detailedAnalysis: string;
  communicationScore: number;
  technicalScore: number;
  confidenceScore: number;
}

export interface SessionData {
  id: string;
  transcript: TranscriptEntry[];
  status: string;
  duration: number;
  feedback: FeedbackData | null;
  overallScore: number | null;
  createdAt: string;
  interview: {
    title: string;
    role: string;
    experience: string;
    techStack: string;
  };
}

export interface InterviewData {
  id: string;
  title: string;
  role: string;
  experience: string;
  techStack: string;
  questionCount: number;
  questions: InterviewQuestion[];
  createdAt: string;
}
