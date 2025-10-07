import { useAuth as useAuthContext } from "@/contexts/AuthContext";

export { useAuth } from "@/contexts/AuthContext";

// Additional hook for handling API requests with authentication
export function useAuthenticatedFetch() {
  const { refreshToken, logout } = useAuthContext();

  const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // If we get a 401, try to refresh the token
    if (response.status === 401) {
      try {
        await refreshToken();
        // Retry the original request
        return fetch(url, {
          ...options,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });
      } catch (error: unknown) {
        // If refresh fails, logout the user
        console.log("Token refresh failed, logging out user:", error);
        await logout();
        throw new Error("Session expired. Please login again.");
      }
    }

    return response;
  };

  return { authenticatedFetch };
}
