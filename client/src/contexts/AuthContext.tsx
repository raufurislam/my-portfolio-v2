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
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      // Clear any stale auth data
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: ILoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);

      if (response.success && response.data.user) {
        setUser(response.data.user);
        toast.success(response.message || "Login successful!");

        // Redirect to home page
        router.push("/");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
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
            toast.success("Welcome! You are now logged in.");
          }
        } catch (loginError: any) {
          // Registration successful but auto-login failed
          toast.success("Registration successful! Please login manually.");
          router.push("/login");
          return;
        }

        // Redirect to home page
        router.push("/");
      } else {
        throw new Error(registerResponse.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
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
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      // Even if logout fails on server, clear local state
      setUser(null);
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
      // Optionally update user data if the refresh token response includes it
      if (tokens && (tokens as any).user) {
        setUser((tokens as any).user);
      }
      // Do not return tokens to match the IAuthContext signature (Promise<void>)
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, user needs to login again
      setUser(null);
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
