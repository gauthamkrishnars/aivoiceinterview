import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { interviewId, userId } = await request.json();

    if (!interviewId) {
      return NextResponse.json(
        { error: "Interview ID is required" },
        { status: 400 }
      );
    }

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    const session = await prisma.session.create({
      data: {
        interviewId,
        userId: userId || null,
        status: "active",
        transcript: JSON.stringify([
          {
            role: "interviewer",
            content: `Welcome to your ${interview.title} interview. I will be asking you a series of questions. Take your time to think through your answers. Let us begin. First question: ${JSON.parse(interview.questions)[0].question}`,
            timestamp: Date.now(),
          },
        ]),
      },
    });

    return NextResponse.json({
      id: session.id,
      status: session.status,
      transcript: JSON.parse(session.transcript),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
