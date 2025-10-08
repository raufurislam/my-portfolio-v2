/**
 * Authentication utilities for handling tokens in both cookies and localStorage
 * This provides a fallback mechanism for production environments where cookies might not work properly
 */

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface UserData {
  _id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

class AuthUtils {
  private readonly ACCESS_TOKEN_KEY = "accessToken";
  private readonly REFRESH_TOKEN_KEY = "refreshToken";
  private readonly USER_DATA_KEY = "userData";

  /**
   * Get access token from localStorage (fallback for production)
   */
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  /**
   * Get refresh token from localStorage (fallback for production)
   */
  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get user data from localStorage
   */
  getUserData(): UserData | null {
    if (typeof window === "undefined") return null;
    try {
      const userData = localStorage.getItem(this.USER_DATA_KEY);
      if (!userData) return null;

      const parsed = JSON.parse(userData);
      // Ensure all required fields are present
      return {
        _id: parsed._id || "",
        email: parsed.email || "",
        name: parsed.name || "",
        role: parsed.role || "USER",
        isEmailVerified: parsed.isEmailVerified ?? false,
        createdAt: parsed.createdAt || new Date().toISOString(),
        updatedAt: parsed.updatedAt || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  }

  /**
   * Store access token in localStorage
   */
  setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  /**
   * Store refresh token in localStorage
   */
  setRefreshToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Store user data in localStorage
   */
  setUserData(userData: UserData | Partial<UserData>): void {
    if (typeof window === "undefined") return;

    // Ensure all required fields are present
    const completeUserData: UserData = {
      _id: userData._id || "",
      email: userData.email || "",
      name: userData.name || "",
      role: userData.role || "USER",
      isEmailVerified: userData.isEmailVerified ?? false,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: userData.updatedAt || new Date().toISOString(),
    };

    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(completeUserData));
  }

  /**
   * Store all auth data in localStorage
   */
  setAuthData(
    tokens: AuthTokens,
    userData?: UserData | Partial<UserData>
  ): void {
    if (tokens.accessToken) {
      this.setAccessToken(tokens.accessToken);
    }
    if (tokens.refreshToken) {
      this.setRefreshToken(tokens.refreshToken);
    }
    if (userData) {
      this.setUserData(userData);
    }
  }

  /**
   * Clear all auth data from localStorage
   */
  clearAuthData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  /**
   * Check if user is authenticated (has valid access token)
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      // Basic JWT validation - check if token is not expired
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  }

  /**
   * Check if user is super admin
   */
  isSuperAdmin(): boolean {
    const userData = this.getUserData();
    return userData?.role === "SUPER_ADMIN" && userData?.name === "Super admin";
  }

  /**
   * Get token from cookies (for server-side middleware)
   */
  getTokenFromCookies(cookieString: string, tokenName: string): string | null {
    if (!cookieString) return null;

    const cookies = cookieString.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    return cookies[tokenName] || null;
  }

  /**
   * Validate JWT token
   */
  validateToken(token: string): boolean {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error("Error validating token:", error);
      return false;
    }
  }
}

// Export singleton instance
export const authUtils = new AuthUtils();

// Export individual functions for convenience
export const {
  getAccessToken,
  getRefreshToken,
  getUserData,
  setAccessToken,
  setRefreshToken,
  setUserData,
  setAuthData,
  clearAuthData,
  isAuthenticated,
  isSuperAdmin,
  getTokenFromCookies,
  validateToken,
} = authUtils;
