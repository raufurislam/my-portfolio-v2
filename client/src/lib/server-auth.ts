"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

// JWT payload interface
interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

// User interface
interface UserInfo {
  _id: string;
  email: string;
  role: string;
}

/**
 * Get current user from server-side cookies
 * This function runs on the server and can access httpOnly cookies
 */
export async function getCurrentUser(): Promise<UserInfo | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      console.log("🔍 No access token found in cookies");
      return null;
    }

    // Decode JWT token using jwtDecode
    const decoded = jwtDecode<JWTPayload>(accessToken);

    if (!decoded) {
      console.log("🔍 Failed to decode access token");
      return null;
    }

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      console.log("🔍 Access token is expired");
      return null;
    }

    const userInfo: UserInfo = {
      _id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    console.log("✅ User authenticated:", userInfo);
    return userInfo;
  } catch (error) {
    console.error("❌ Error getting current user:", error);
    return null;
  }
}

/**
 * Check if user is super admin
 */
export async function isSuperAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "SUPER_ADMIN";
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Logout user by clearing cookies
 */
export async function logoutUser(): Promise<void> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    console.log("✅ User logged out successfully");
  } catch (error) {
    console.error("❌ Error logging out:", error);
  }
}
