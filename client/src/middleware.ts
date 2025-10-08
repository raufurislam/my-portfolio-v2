import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/lib/server-auth";

// Define protected routes that require super admin access
const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔒 Middleware processing:", pathname);

  // Check if the current route is protected (super admin only)
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route is an auth route (login/register)
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  // Get user info from server-side cookies
  const userInfo = await getCurrentUser();

  console.log("🔒 Middleware check:", {
    pathname,
    isProtected,
    isAuth,
    isAuthenticated: !!userInfo,
    isSuperAdmin: userInfo?.role === "SUPER_ADMIN",
    userRole: userInfo?.role,
  });

  // If no user info and accessing protected route, redirect to home
  if (isProtected && !userInfo) {
    console.log("❌ No user info, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user exists but not super admin and accessing protected route, redirect to home
  if (isProtected && userInfo && userInfo.role !== "SUPER_ADMIN") {
    console.log("❌ Not super admin, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is authenticated and trying to access auth routes, redirect to home
  if (isAuth && userInfo) {
    console.log("✅ Already authenticated, redirecting to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("✅ Access granted");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
