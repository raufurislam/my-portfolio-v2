// services\AuthServices
import {
  ILoginCredentials,
  ILoginResponse,
  IRegisterCredentials,
  IRegisterResponse,
  IApiResponse,
  IAuthTokens,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

class AuthService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }

  async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return this.handleResponse<ILoginResponse>(response);
  }

  async register(
    credentials: IRegisterCredentials
  ): Promise<IRegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return this.handleResponse<IRegisterResponse>(response);
  }

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      // Even if logout fails on server, we should clear local state
      console.warn("Logout request failed, but clearing local state");
    }
  }

  async refreshAccessToken(): Promise<IAuthTokens> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    return this.handleResponse<IApiResponse<IAuthTokens>>(response).then(
      (res) => res.data
    );
  }

  async getCurrentUser(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      return null; // User not authenticated
    }

    return this.handleResponse<IApiResponse>(response).then((res) => res.data);
  }
}

// Export singleton instance
export const authService = new AuthService();

// Legacy exports for backward compatibility
export const loginUser = (credentials: ILoginCredentials) =>
  authService.login(credentials);
export const registerUser = (credentials: IRegisterCredentials) =>
  authService.register(credentials);
export const logoutUser = () => authService.logout();
