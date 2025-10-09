"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { authUtils } from "@/lib/auth-utils";
import { IUser } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireSuperAdmin?: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireSuperAdmin = false,
  redirectTo = "/",
  fallback = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  ),
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated, isSuperAdmin } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // If we're still loading from context, wait
      if (isLoading) {
        return;
      }

      // Check localStorage as fallback for production
      const localUserData = authUtils.getUserData();
      const localAccessToken = authUtils.getAccessToken();
      const isLocallyAuthenticated =
        localAccessToken && authUtils.isAuthenticated();
      const isLocallySuperAdmin = localUserData && authUtils.isSuperAdmin();

      // Determine if user is authenticated (either from context or localStorage)
      const userIsAuthenticated = isAuthenticated || isLocallyAuthenticated;
      const userIsSuperAdmin = isSuperAdmin || isLocallySuperAdmin;

      console.log("🔒 ProtectedRoute check:", {
        requireAuth,
        requireSuperAdmin,
        userIsAuthenticated,
        userIsSuperAdmin,
        hasUser: !!user,
        hasLocalUser: !!localUserData,
        isLoading,
      });

      if (requireAuth && !userIsAuthenticated) {
        console.log("❌ Not authenticated, redirecting to:", redirectTo);
        router.push(redirectTo);
        return;
      }

      if (requireSuperAdmin && !userIsSuperAdmin) {
        console.log("❌ Not super admin, redirecting to:", redirectTo);
        router.push(redirectTo);
        return;
      }

      if (!requireAuth && userIsAuthenticated) {
        console.log(
          "✅ Authenticated but auth not required, redirecting to dashboard"
        );
        router.push("/dashboard");
        return;
      }

      console.log("✅ Access granted");
      setIsChecking(false);
    };

    checkAuth();
  }, [
    user,
    isLoading,
    isAuthenticated,
    isSuperAdmin,
    requireAuth,
    requireSuperAdmin,
    redirectTo,
    router,
  ]);

  // Show loading while checking authentication
  if (isLoading || isChecking) {
    return <>{fallback}</>;
  }

  // If we reach here, access is granted
  return <>{children}</>;
}

// Higher-order component for protecting routes
export function withProtectedRoute<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    requireAuth?: boolean;
    requireSuperAdmin?: boolean;
    redirectTo?: string;
  } = {}
) {
  const {
    requireAuth = true,
    requireSuperAdmin = false,
    redirectTo = "/",
  } = options;

  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute
        requireAuth={requireAuth}
        requireSuperAdmin={requireSuperAdmin}
        redirectTo={redirectTo}
      >
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}

// Hook for checking authentication status
export function useAuthCheck() {
  const { user, isLoading, isAuthenticated, isSuperAdmin } = useAuth();
  const [localAuth, setLocalAuth] = useState<{
    isAuthenticated: boolean;
    isSuperAdmin: boolean;
    user: IUser | null;
  }>({
    isAuthenticated: false,
    isSuperAdmin: false,
    user: null,
  });

  useEffect(() => {
    if (!isLoading) {
      const localUserData = authUtils.getUserData();
      const localAccessToken = authUtils.getAccessToken();
      const isLocallyAuthenticated =
        localAccessToken && authUtils.isAuthenticated();
      const isLocallySuperAdmin = localUserData && authUtils.isSuperAdmin();

      setLocalAuth({
        isAuthenticated: Boolean(isAuthenticated || isLocallyAuthenticated),
        isSuperAdmin: Boolean(isSuperAdmin || isLocallySuperAdmin),
        user: user || localUserData,
      });
    }
  }, [user, isLoading, isAuthenticated, isSuperAdmin]);

  return {
    ...localAuth,
    isLoading,
  };
}
