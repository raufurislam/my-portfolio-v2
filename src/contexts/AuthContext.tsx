"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IUser,
  ILoginCredentials,
  IRegisterCredentials,
  IAuthContext,
} from "@/types";
import { authService } from "@/services/AuthServices";
import { authUtils } from "@/lib/auth-utils";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;
  const isSuperAdmin =
    user?.role === "SUPER_ADMIN" && user?.name === "Super admin";

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      console.log("🔍 Initializing auth...");
      console.log("🔍 API URL:", process.env.NEXT_PUBLIC_BASE_API);
      console.log("🔍 Current cookies:", document.cookie);

      // First, try to get user from localStorage (for production fallback)
      const localUserData = authUtils.getUserData();
      const localAccessToken = authUtils.getAccessToken();
      
      if (localUserData && localAccessToken && authUtils.isAuthenticated()) {
        console.log("✅ Found valid user data in localStorage:", localUserData);
        setUser(localUserData as IUser);
        setIsLoading(false);
        return;
      }

      // If no valid local data, try to get from server
      const userData = await authService.getCurrentUser();
      console.log("🔍 getCurrentUser response:", userData);

      if (userData) {
        setUser(userData);
        // Store in localStorage as backup
        authUtils.setUserData(userData);
        console.log("✅ User set in context and localStorage:", userData);
      } else {
        console.log("❌ No user data received, clearing user state");
        setUser(null);
        authUtils.clearAuthData();
      }
    } catch (error) {
      console.error("❌ Failed to initialize auth:", error);
      // Clear any stale auth data
      setUser(null);
      authUtils.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: ILoginCredentials) => {
    try {
      setIsLoading(true);
      console.log("🔐 Starting login process...");
      const response = await authService.login(credentials);
      console.log("🔐 Login response:", response);

      if (response.success && response.data.user) {
        setUser(response.data.user);
        
        // Store user data in localStorage as backup
        authUtils.setUserData(response.data.user);
        
        // If tokens are provided, store them too
        if (response.data.accessToken) {
          authUtils.setAccessToken(response.data.accessToken);
        }
        if (response.data.refreshToken) {
          authUtils.setRefreshToken(response.data.refreshToken);
        }
        
        console.log("✅ Login successful, user set:", response.data.user);
        console.log("🍪 Cookies after login:", document.cookie);
        console.log("💾 Stored in localStorage:", authUtils.getUserData());
        toast.success(response.message || "Login successful!");

        // Redirect to home page
        router.push("/");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: unknown) {
      console.error("❌ Login error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: IRegisterCredentials) => {
    try {
      setIsLoading(true);
      // Step 1: Register the user
      const registerResponse = await authService.register(credentials);

      if (registerResponse.success) {
        toast.success(registerResponse.message || "Registration successful!");

        // Step 2: Auto-login after successful registration
        try {
          const loginResponse = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (loginResponse.success && loginResponse.data.user) {
            setUser(loginResponse.data.user);
            
            // Store user data in localStorage as backup
            authUtils.setUserData(loginResponse.data.user);
            
            // If tokens are provided, store them too
            if (loginResponse.data.accessToken) {
              authUtils.setAccessToken(loginResponse.data.accessToken);
            }
            if (loginResponse.data.refreshToken) {
              authUtils.setRefreshToken(loginResponse.data.refreshToken);
            }
            
            toast.success("Welcome! You are now logged in.");
          }
        } catch (loginError: unknown) {
          // Registration successful but auto-login failed
          console.log("Auto-login failed after registration:", loginError);
          toast.success("Registration successful! Please login manually.");
          router.push("/login");
          return;
        }

        // Redirect to home page
        router.push("/");
      } else {
        throw new Error(registerResponse.message || "Registration failed");
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      // Clear localStorage data
      authUtils.clearAuthData();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: unknown) {
      console.error("Logout error:", error);
      // Even if logout fails on server, clear local state
      setUser(null);
      authUtils.clearAuthData();
      toast.success("Logged out successfully");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const tokens = await authService.refreshAccessToken();
      // Tokens are automatically stored in cookies by the server
      // Also store in localStorage as backup
      if (tokens.accessToken) {
        authUtils.setAccessToken(tokens.accessToken);
      }
      if (tokens.refreshToken) {
        authUtils.setRefreshToken(tokens.refreshToken);
      }
      
      // Optionally update user data if the refresh token response includes it
      if (tokens && (tokens as unknown as Record<string, unknown>).user) {
        const userData = (tokens as unknown as Record<string, unknown>).user as IUser;
        setUser(userData);
        authUtils.setUserData(userData);
      }
      // Do not return tokens to match the IAuthContext signature (Promise<void>)
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, user needs to login again
      setUser(null);
      authUtils.clearAuthData();
      router.push("/login");
      throw error;
    }
  };

  const value: IAuthContext = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    isSuperAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for protecting routes
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string; requireAuth?: boolean } = {}
) {
  const { redirectTo = "/login", requireAuth = true } = options;

  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (requireAuth && !user) {
          router.push(redirectTo);
        } else if (!requireAuth && user) {
          router.push("/dashboard");
        }
      }
    }, [user, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (requireAuth && !user) {
      return null; // Will redirect
    }

    if (!requireAuth && user) {
      return null; // Will redirect
    }

    return <WrappedComponent {...props} />;
  };
}
