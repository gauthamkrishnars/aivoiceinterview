import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface TranscriptEntry {
  role: "interviewer" | "candidate";
  content: string;
  timestamp: number;
}

function generateFeedback(transcript: TranscriptEntry[], role: string) {
  const candidateEntries = transcript.filter((t) => t.role === "candidate");
  const totalAnswers = candidateEntries.length;

  // Calculate metrics based on transcript analysis
  let technicalScore = 0;
  let communicationScore = 0;
  let confidenceScore = 0;

  candidateEntries.forEach((entry) => {
    const content = entry.content.toLowerCase();
    const wordCount = content.split(" ").length;

    // Technical indicators
    if (
      content.includes("implemented") ||
      content.includes("architecture") ||
      content.includes("pattern") ||
      content.includes("algorithm") ||
      content.includes("database") ||
      content.includes("api") ||
      content.includes("framework") ||
      content.includes("performance") ||
      content.includes("optimization")
    ) {
      technicalScore += 15;
    }

    // Communication quality
    if (wordCount > 50) communicationScore += 10;
    if (wordCount > 100) communicationScore += 5;
    if (content.includes("because") || content.includes("therefore"))
      communicationScore += 5;
    if (content.includes("for example") || content.includes("such as"))
      communicationScore += 5;

    // Confidence indicators
    if (
      content.includes("i built") ||
      content.includes("i designed") ||
      content.includes("i led") ||
      content.includes("i solved")
    ) {
      confidenceScore += 12;
    }
    if (!content.includes("i think maybe") && !content.includes("i guess"))
      confidenceScore += 5;
  });

  technicalScore = Math.min(100, Math.max(20, technicalScore + 30));
  communicationScore = Math.min(100, Math.max(25, communicationScore + 35));
  confidenceScore = Math.min(100, Math.max(20, confidenceScore + 30));
  const overallScore = Math.round(
    (technicalScore + communicationScore + confidenceScore) / 3
  );

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suggestions: string[] = [];

  if (totalAnswers === 0) {
    return {
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      confidenceScore: 0,
      strengths: ["Session completed"],
      weaknesses: ["No answers recorded"],
      suggestions: ["Try speaking more during your next session"],
      detailedAnalysis:
        "No candidate responses were recorded in this session. The interview may not have been completed.",
    };
  }

  // Strengths
  if (communicationScore > 60)
    strengths.push(
      "Clear communication style with well structured answers"
    );
  if (technicalScore > 60)
    strengths.push(
      "Strong technical vocabulary and domain knowledge"
    );
  if (confidenceScore > 60)
    strengths.push(
      "Confident delivery with concrete examples from your experience"
    );
  if (totalAnswers >= 5)
    strengths.push(
      "Good answer coverage across the interview questions"
    );
  if (candidateEntries.some((e) => e.content.split(" ").length > 80))
    strengths.push(
      "Detailed responses that go beyond surface level answers"
    );

  if (strengths.length === 0)
    strengths.push("Completed the interview session");

  // Weaknesses
  if (communicationScore < 50)
    weaknesses.push(
      "Answers could be more structured. Try using the STAR method for behavioral questions"
    );
  if (technicalScore < 50)
    weaknesses.push(
      "Technical depth could be stronger. Include specific tools, patterns, or metrics in your answers"
    );
  if (confidenceScore < 50)
    weaknesses.push(
      "More assertive language would help. Own your accomplishments with concrete outcomes"
    );
  if (candidateEntries.some((e) => e.content.split(" ").length < 20))
    weaknesses.push(
      "Some answers were quite brief. Elaborate with examples and reasoning"
    );

  if (weaknesses.length === 0)
    weaknesses.push("Keep pushing the bar higher on each dimension");

  // Suggestions
  if (technicalScore < 70)
    suggestions.push(
      "Practice explaining complex technical concepts in 2 to 3 clear sentences"
    );
  if (communicationScore < 70)
    suggestions.push(
      "Structure answers as: situation, action, result. It keeps you focused and clear"
    );
  if (confidenceScore < 70)
    suggestions.push(
      "Use outcome focused language: 'I reduced load time by 40%' instead of 'I tried to optimize it'"
    );
  suggestions.push(
    "Record yourself answering questions and review the recording for filler words and pacing"
  );
  suggestions.push(
    "Research the company deeply and tie your answers to their specific challenges"
  );

  const detailedAnalysis = `This was a ${role.replace(/-/g, " ")} focused interview with ${totalAnswers} recorded responses. ${technicalScore > 60 ? "Your technical responses showed solid understanding of relevant concepts." : "There is room to strengthen the technical depth of your answers."} ${communicationScore > 60 ? "Your communication was clear and well organized." : "Working on answer structure would help you communicate more effectively."} ${confidenceScore > 60 ? "You came across as confident and experienced." : "Practicing more assertive delivery would improve the overall impression."} Overall, you scored ${overallScore}/100. ${overallScore >= 70 ? "This is a solid performance that would translate well to a real interview." : "Focus on the suggested practice areas to make meaningful improvement before your next session."}`;

  return {
    overallScore,
    technicalScore,
    communicationScore,
    confidenceScore,
    strengths,
    weaknesses,
    suggestions,
    detailedAnalysis,
  };
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { interview: true },
    });

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const transcript: TranscriptEntry[] = JSON.parse(session.transcript);
    const feedback = generateFeedback(transcript, session.interview.role);

    await prisma.session.update({
      where: { id: sessionId },
      data: {
        feedback: JSON.stringify(feedback),
        overallScore: feedback.overallScore,
        status: "completed",
      },
    });

    return NextResponse.json({ feedback });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
