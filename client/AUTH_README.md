# Authentication System Documentation

This document describes the industry-standard authentication system implemented in this Next.js application.

## Features

- **JWT-based Authentication**: Uses access and refresh tokens stored in HTTP-only cookies
- **Context-based State Management**: React Context for global authentication state
- **Protected Routes**: Middleware-based route protection
- **Form Validation**: Zod schema validation for login forms
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Proper loading indicators during authentication operations
- **TypeScript Support**: Full type safety throughout the authentication flow

## Architecture

### 1. Types (`src/types/index.ts`)

- `IUser`: User data structure
- `ILoginCredentials`: Login form data
- `ILoginResponse`: API response structure
- `IAuthContext`: Context interface
- `IApiResponse`: Generic API response wrapper

### 2. Services (`src/services/AuthServices/index.ts`)

- `AuthService` class with methods:
  - `login()`: Authenticate user with credentials
  - `logout()`: Clear user session
  - `refreshAccessToken()`: Refresh expired tokens
  - `getCurrentUser()`: Get current user data
- Centralized error handling
- Automatic cookie management

### 3. Context (`src/contexts/AuthContext.tsx`)

- `AuthProvider`: Wraps the entire app
- `useAuth()`: Hook for accessing auth state
- `withAuth()`: HOC for protecting components
- Automatic token refresh
- Loading state management

### 4. Middleware (`src/middleware.ts`)

- Route protection based on authentication status
- Automatic redirects for protected routes
- Cookie-based authentication check

### 5. Components

- **LoginForm**: Enhanced with validation and loading states
- **Navbar**: Shows authentication status and user info
- **Dashboard**: Protected page demonstrating auth usage

## Usage

### Basic Authentication

```tsx
import { useAuth } from "@/hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login({ email, password })}>Login</button>
      )}
    </div>
  );
}
```

### Protected Routes

```tsx
import { withAuth } from "@/contexts/AuthContext";

const ProtectedPage = withAuth(MyComponent, {
  redirectTo: "/login",
  requireAuth: true,
});
```

### API Requests with Authentication

```tsx
import { useAuthenticatedFetch } from "@/hooks/useAuth";

function MyComponent() {
  const { authenticatedFetch } = useAuthenticatedFetch();

  const fetchData = async () => {
    const response = await authenticatedFetch("/api/protected-endpoint");
    const data = await response.json();
  };
}
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
```

## Backend Integration

The frontend expects the backend to:

1. **Login Endpoint** (`POST /auth/login`):

   - Accepts `{ email, password }`
   - Returns user data and sets HTTP-only cookies
   - Response format: `{ success, statusCode, message, data: { accessToken, refreshToken, user } }`

2. **Logout Endpoint** (`POST /auth/logout`):

   - Clears authentication cookies
   - Returns success response

3. **Refresh Token Endpoint** (`POST /auth/refresh-token`):

   - Uses refresh token from cookies
   - Returns new access token
   - Sets new cookies

4. **User Info Endpoint** (`GET /auth/me`):
   - Returns current user data
   - Returns 401 if not authenticated

## Security Features

- **HTTP-only Cookies**: Prevents XSS attacks
- **Automatic Token Refresh**: Seamless user experience
- **Route Protection**: Server-side and client-side protection
- **CSRF Protection**: SameSite cookie attributes
- **Input Validation**: Zod schema validation
- **Error Boundaries**: Graceful error handling

## Industry Standards Followed

1. **OAuth 2.0 / JWT**: Industry-standard token-based authentication
2. **HTTP-only Cookies**: Secure token storage
3. **Refresh Token Rotation**: Enhanced security
4. **Context Pattern**: React best practices
5. **TypeScript**: Type safety and developer experience
6. **Middleware**: Next.js 13+ App Router patterns
7. **Form Validation**: Client-side validation with Zod
8. **Error Handling**: Comprehensive error management
9. **Loading States**: Better UX with loading indicators
10. **Separation of Concerns**: Clean architecture

## Testing the Authentication

1. Start your backend server
2. Set the `NEXT_PUBLIC_BASE_API` environment variable
3. Navigate to `/login`
4. Use the test credentials:
   - Email: `super@gmail.com`
   - Password: `753951Bd@`
5. You should be redirected to `/` (home page) upon successful login
6. Only super admin (Super admin) will see the Dashboard option in navigation
7. Try registering a new user - they will also be redirected to home page

## Troubleshooting

- **CORS Issues**: Ensure backend allows credentials and frontend origin
- **Cookie Issues**: Check domain and path settings
- **Token Expiry**: Refresh tokens should be handled automatically
- **Redirect Loops**: Check middleware configuration and route protection
