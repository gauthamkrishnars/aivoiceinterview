import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { sessionId, transcript, duration, status } =
      await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await prisma.session.update({
      where: { id: sessionId },
      data: {
        transcript: JSON.stringify(transcript || []),
        duration: duration || 0,
        status: status || "completed",
      },
    });

    return NextResponse.json({
      id: session.id,
      status: session.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to save session" },
      { status: 500 }
    );
  }
}
