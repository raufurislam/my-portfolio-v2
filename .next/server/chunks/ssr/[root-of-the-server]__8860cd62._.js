module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_e207e685aa9cc81adf4eaedb8666d505$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom_e207e685aa9cc81adf4eaedb8666d505/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_e207e685aa9cc81adf4eaedb8666d505$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/auth-utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Authentication utilities for handling tokens in both cookies and localStorage
 * This provides a fallback mechanism for production environments where cookies might not work properly
 */ __turbopack_context__.s([
    "authUtils",
    ()=>authUtils,
    "clearAuthData",
    ()=>clearAuthData,
    "getAccessToken",
    ()=>getAccessToken,
    "getRefreshToken",
    ()=>getRefreshToken,
    "getTokenFromCookies",
    ()=>getTokenFromCookies,
    "getUserData",
    ()=>getUserData,
    "isAuthenticated",
    ()=>isAuthenticated,
    "isSuperAdmin",
    ()=>isSuperAdmin,
    "setAccessToken",
    ()=>setAccessToken,
    "setAuthData",
    ()=>setAuthData,
    "setRefreshToken",
    ()=>setRefreshToken,
    "setUserData",
    ()=>setUserData,
    "validateToken",
    ()=>validateToken
]);
class AuthUtils {
    ACCESS_TOKEN_KEY = "accessToken";
    REFRESH_TOKEN_KEY = "refreshToken";
    USER_DATA_KEY = "userData";
    /**
   * Get access token from localStorage (fallback for production)
   */ getAccessToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Get refresh token from localStorage (fallback for production)
   */ getRefreshToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Get user data from localStorage
   */ getUserData() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Store access token in localStorage
   */ setAccessToken(token) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Store refresh token in localStorage
   */ setRefreshToken(token) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Store user data in localStorage
   */ setUserData(userData) {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        // Ensure all required fields are present
        const completeUserData = undefined;
    }
    /**
   * Store all auth data in localStorage
   */ setAuthData(tokens, userData) {
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
   */ clearAuthData() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Check if user is authenticated (has valid access token)
   */ isAuthenticated() {
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
   */ isSuperAdmin() {
        const userData = this.getUserData();
        return userData?.role === "SUPER_ADMIN" && userData?.name === "Super admin";
    }
    /**
   * Get token from cookies (for server-side middleware)
   */ getTokenFromCookies(cookieString, tokenName) {
        if (!cookieString) return null;
        const cookies = cookieString.split(";").reduce((acc, cookie)=>{
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {});
        return cookies[tokenName] || null;
    }
    /**
   * Validate JWT token
   */ validateToken(token) {
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
const authUtils = new AuthUtils();
const { getAccessToken, getRefreshToken, getUserData, setAccessToken, setRefreshToken, setUserData, setAuthData, clearAuthData, isAuthenticated, isSuperAdmin, getTokenFromCookies, validateToken } = authUtils;
}),
"[project]/src/services/AuthServices/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // services\AuthServices
__turbopack_context__.s([
    "authService",
    ()=>authService,
    "loginUser",
    ()=>loginUser,
    "logoutUser",
    ()=>logoutUser,
    "registerUser",
    ()=>registerUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.ts [app-ssr] (ecmascript)");
;
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api/v1");
class AuthService {
    async handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.json().catch(()=>({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        return this.handleResponse(response);
    }
    async register(credentials) {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        return this.handleResponse(response);
    }
    async logout() {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        if (!response.ok) {
            // Even if logout fails on server, we should clear local state
            console.warn("Logout request failed, but clearing local state");
        }
    }
    async refreshAccessToken() {
        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: "POST",
            credentials: "include"
        });
        return this.handleResponse(response).then((res)=>res.data);
    }
    async getCurrentUser() {
        // First try to get from localStorage (for production fallback)
        const localUserData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].getUserData();
        const localAccessToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].getAccessToken();
        if (localUserData && localAccessToken && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].isAuthenticated()) {
            console.log("✅ Using cached user data from localStorage");
            return localUserData;
        }
        // If no valid local data, try server
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            credentials: "include"
        });
        if (response.status === 401) {
            // Clear any stale local data
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
            return null; // User not authenticated
        }
        const userData = await this.handleResponse(response).then((res)=>res.data);
        // Store user data in localStorage as backup
        if (userData) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setUserData(userData);
        }
        return userData;
    }
}
const authService = new AuthService();
const loginUser = (credentials)=>authService.login(credentials);
const registerUser = (credentials)=>authService.register(credentials);
const logoutUser = ()=>authService.logout();
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth,
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/AuthServices/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const isAuthenticated = !!user;
    const isSuperAdmin = user?.role === "SUPER_ADMIN" && user?.name === "Super admin";
    // Initialize auth state on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        initializeAuth();
    }, []);
    const initializeAuth = async ()=>{
        try {
            setIsLoading(true);
            console.log("🔍 Initializing auth...");
            console.log("🔍 API URL:", ("TURBOPACK compile-time value", "http://localhost:5000/api/v1"));
            console.log("🔍 Current cookies:", document.cookie);
            // First, try to get user from localStorage (for production fallback)
            const localUserData = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].getUserData();
            const localAccessToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].getAccessToken();
            if (localUserData && localAccessToken && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].isAuthenticated()) {
                console.log("✅ Found valid user data in localStorage:", localUserData);
                setUser(localUserData);
                setIsLoading(false);
                return;
            }
            // If no valid local data, try to get from server
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
            console.log("🔍 getCurrentUser response:", userData);
            if (userData) {
                setUser(userData);
                // Store in localStorage as backup
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setUserData(userData);
                console.log("✅ User set in context and localStorage:", userData);
            } else {
                console.log("❌ No user data received, clearing user state");
                setUser(null);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
            }
        } catch (error) {
            console.error("❌ Failed to initialize auth:", error);
            // Clear any stale auth data
            setUser(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
        } finally{
            setIsLoading(false);
        }
    };
    const login = async (credentials)=>{
        try {
            setIsLoading(true);
            console.log("🔐 Starting login process...");
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(credentials);
            console.log("🔐 Login response:", response);
            if (response.success && response.data.user) {
                setUser(response.data.user);
                // Store user data in localStorage as backup
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setUserData(response.data.user);
                // If tokens are provided, store them too
                if (response.data.accessToken) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setAccessToken(response.data.accessToken);
                }
                if (response.data.refreshToken) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setRefreshToken(response.data.refreshToken);
                }
                console.log("✅ Login successful, user set:", response.data.user);
                console.log("🍪 Cookies after login:", document.cookie);
                console.log("💾 Stored in localStorage:", __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].getUserData());
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(response.message || "Login successful!");
                // Redirect to home page
                router.push("/");
            } else {
                throw new Error(response.message || "Login failed");
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            const errorMessage = error instanceof Error ? error.message : "Login failed. Please try again.";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const register = async (credentials)=>{
        try {
            setIsLoading(true);
            // Step 1: Register the user
            const registerResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].register(credentials);
            if (registerResponse.success) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(registerResponse.message || "Registration successful!");
                // Step 2: Auto-login after successful registration
                try {
                    const loginResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login({
                        email: credentials.email,
                        password: credentials.password
                    });
                    if (loginResponse.success && loginResponse.data.user) {
                        setUser(loginResponse.data.user);
                        // Store user data in localStorage as backup
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setUserData(loginResponse.data.user);
                        // If tokens are provided, store them too
                        if (loginResponse.data.accessToken) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setAccessToken(loginResponse.data.accessToken);
                        }
                        if (loginResponse.data.refreshToken) {
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setRefreshToken(loginResponse.data.refreshToken);
                        }
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Welcome! You are now logged in.");
                    }
                } catch (loginError) {
                    // Registration successful but auto-login failed
                    console.log("Auto-login failed after registration:", loginError);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Registration successful! Please login manually.");
                    router.push("/login");
                    return;
                }
                // Redirect to home page
                router.push("/");
            } else {
                throw new Error(registerResponse.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const logout = async ()=>{
        try {
            setIsLoading(true);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
            setUser(null);
            // Clear localStorage data
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Logged out successfully");
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            // Even if logout fails on server, clear local state
            setUser(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Logged out successfully");
            router.push("/");
        } finally{
            setIsLoading(false);
        }
    };
    const refreshToken = async ()=>{
        try {
            const tokens = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$AuthServices$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].refreshAccessToken();
            // Tokens are automatically stored in cookies by the server
            // Also store in localStorage as backup
            if (tokens.accessToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setAccessToken(tokens.accessToken);
            }
            if (tokens.refreshToken) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setRefreshToken(tokens.refreshToken);
            }
            // Optionally update user data if the refresh token response includes it
            if (tokens && tokens.user) {
                const userData = tokens.user;
                setUser(userData);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].setUserData(userData);
            }
        // Do not return tokens to match the IAuthContext signature (Promise<void>)
        } catch (error) {
            console.error("Token refresh failed:", error);
            // If refresh fails, user needs to login again
            setUser(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authUtils"].clearAuthData();
            router.push("/login");
            throw error;
        }
    };
    const value = {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshToken,
        isSuperAdmin
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 246,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
function withAuth(WrappedComponent, options = {}) {
    const { redirectTo = "/login", requireAuth = true } = options;
    return function AuthenticatedComponent(props) {
        const { user, isLoading } = useAuth();
        const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
            if (!isLoading) {
                if (requireAuth && !user) {
                    router.push(redirectTo);
                } else if (!requireAuth && user) {
                    router.push("/dashboard");
                }
            }
        }, [
            user,
            isLoading,
            router
        ]);
        if (isLoading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center min-h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-32 w-32 border-b-2 border-primary"
                }, void 0, false, {
                    fileName: "[project]/src/contexts/AuthContext.tsx",
                    lineNumber: 281,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/contexts/AuthContext.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this);
        }
        if (requireAuth && !user) {
            return null; // Will redirect
        }
        if (!requireAuth && user) {
            return null; // Will redirect
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WrappedComponent, {
            ...props
        }, void 0, false, {
            fileName: "[project]/src/contexts/AuthContext.tsx",
            lineNumber: 294,
            columnNumber: 12
        }, this);
    };
}
}),
"[project]/src/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.5.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_e207e685aa9cc81adf4eaedb8666d505$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom_e207e685aa9cc81adf4eaedb8666d505/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_e207e685aa9cc81adf4eaedb8666d505$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme ?? "system",
        className: "toaster group",
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8860cd62._.js.map