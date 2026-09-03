import { NextResponse } from "next/server";
import { createGuestUser } from "@/lib/auth";

export async function POST() {
  try {
    const user = await createGuestUser();

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        isGuest: user.isGuest,
      },
    });

    response.cookies.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days for guests
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Failed to create guest session" },
      { status: 500 }
    );
  }
}
