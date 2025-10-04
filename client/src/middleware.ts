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

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing auth routes with a token, redirect to home
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};


