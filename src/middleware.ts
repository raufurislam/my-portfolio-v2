import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  SUPER_ADMIN: [/^\/dashboard/],
  // ADMIN: [/^\/dashboard/],
  // USER: [/^\/dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  let decodedData = null;
  decodedData = jwtDecode(accessToken) as any;
  const role = decodedData?.role;

  // Check if user is trying to access dashboard
  if (pathname.startsWith("/dashboard")) {
    // If user has a valid role and token, allow access to dashboard
    if (role && roleBasedPrivateRoutes[role as Role]) {
      const routes = roleBasedPrivateRoutes[role as Role];
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }
    // If user doesn't have proper role, redirect to home
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For non-dashboard routes, allow authenticated users to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
