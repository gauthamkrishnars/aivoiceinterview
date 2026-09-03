import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("user_id")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes require auth
  const protectedPaths = ["/dashboard", "/create", "/interview", "/feedback"];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !userId) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if already logged in and visiting auth pages
  const authPaths = ["/auth/login", "/auth/signup", "/auth/guest"];
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthPage && userId) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create/:path*",
    "/interview/:path*",
    "/feedback/:path*",
    "/auth/:path*",
  ],
};
