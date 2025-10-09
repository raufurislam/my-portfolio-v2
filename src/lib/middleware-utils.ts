/**
 * Middleware utilities for handling authentication in Next.js middleware
 * This provides additional checks for production environments
 */

export interface AuthCheckResult {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  user: {
    _id: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
}

/**
 * Check authentication status from cookies
 * This is used in Next.js middleware where localStorage is not available
 */
export function checkAuthFromCookies(cookieString: string): AuthCheckResult {
  if (!cookieString) {
    return {
      isAuthenticated: false,
      isSuperAdmin: false,
      user: null,
      token: null,
    };
  }

  // Parse cookies
  const cookies = cookieString.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return {
      isAuthenticated: false,
      isSuperAdmin: false,
      user: null,
      token: null,
    };
  }

  // Validate JWT token
  const isValidToken = validateJWT(accessToken);
  if (!isValidToken) {
    return {
      isAuthenticated: false,
      isSuperAdmin: false,
      user: null,
      token: null,
    };
  }

  try {
    // Extract user data from token
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const user = {
      _id: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    const isSuperAdmin = user.role === "SUPER_ADMIN";

    return {
      isAuthenticated: true,
      isSuperAdmin,
      user,
      token: accessToken,
    };
  } catch (error) {
    console.error("Error parsing JWT payload:", error);
    return {
      isAuthenticated: false,
      isSuperAdmin: false,
      user: null,
      token: null,
    };
  }
}

/**
 * Validate JWT token
 */
function validateJWT(token: string): boolean {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch {
    return false;
  }
}

/**
 * Check if a route is protected
 */
export function isProtectedRoute(
  pathname: string,
  protectedRoutes: string[]
): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Check if a route is an auth route (login/register)
 */
export function isAuthRoute(pathname: string, authRoutes: string[]): boolean {
  return authRoutes.some((route) => pathname.startsWith(route));
}
