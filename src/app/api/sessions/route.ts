import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ sessions: [] });
    }

    const where = { userId };

    const sessions = await prisma.session.findMany({
      where,
      include: {
        interview: {
          select: {
            title: true,
            role: true,
            experience: true,
            techStack: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = sessions.map((s) => ({
      id: s.id,
      transcript: JSON.parse(s.transcript),
      status: s.status,
      duration: s.duration,
      feedback: s.feedback ? JSON.parse(s.feedback) : null,
      overallScore: s.overallScore,
      createdAt: s.createdAt,
      interview: s.interview,
    }));

    return NextResponse.json({ sessions: formatted });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
