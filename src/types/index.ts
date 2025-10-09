/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  github?: {
    frontend?: string;
    backend?: string;
    monorepo?: string;
  };
  liveUrl?: string;
  thumbnail?: string;
  screenshots?: string[];
  author: string;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication Types
export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: IUser;
  };
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
}

export interface IAuthContext {
  user: IUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: ILoginCredentials) => Promise<void>;
  register: (credentials: IRegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  isSuperAdmin: boolean;
}

export interface IApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
