import { NextResponse } from "next/server";
import { createGuestUser } from "@/lib/auth";

export async function POST() {
  try {
    const user = await createGuestUser();

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        isGuest: user.isGuest,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create guest session" },
      { status: 500 }
    );
  }
}
