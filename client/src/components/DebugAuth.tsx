"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function DebugAuth() {
  const { user, isLoading, isAuthenticated, isSuperAdmin } = useAuth();
  const [cookies, setCookies] = useState<string>("");

  useEffect(() => {
    // Get all cookies
    const allCookies = document.cookie;
    setCookies(allCookies);
  }, []);

  // Show debug info in all environments for now
  // if (process.env.NODE_ENV !== "production") {
  //   return null; // Only show in production
  // }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">Auth Debug Info</h3>
      <div className="space-y-1">
        <p>
          <strong>Loading:</strong> {isLoading ? "true" : "false"}
        </p>
        <p>
          <strong>Authenticated:</strong> {isAuthenticated ? "true" : "false"}
        </p>
        <p>
          <strong>Super Admin:</strong> {isSuperAdmin ? "true" : "false"}
        </p>
        <p>
          <strong>User:</strong> {user ? "Present" : "null"}
        </p>
        <p>
          <strong>User Name:</strong> {user?.name || "N/A"}
        </p>
        <p>
          <strong>User Role:</strong> {user?.role || "N/A"}
        </p>
        <p>
          <strong>API URL:</strong>{" "}
          {process.env.NEXT_PUBLIC_BASE_API || "Not set"}
        </p>
        <p>
          <strong>Cookies:</strong> {cookies || "No cookies"}
        </p>
      </div>
    </div>
  );
}
