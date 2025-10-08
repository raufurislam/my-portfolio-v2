import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes that require super admin access
const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is protected (super admin only)
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route is an auth route (login/register)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get the access token from cookies
  const accessToken = request.cookies.get("accessToken")?.value;

  // If accessing a protected route without a token, redirect to home
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If accessing auth routes with a token, redirect to home
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
