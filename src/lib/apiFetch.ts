"use server";
import { cookies } from "next/headers";

export async function apiFetch(path: string, init?: RequestInit) {
  const cookieStore = await cookies();
  const accessToken = cookieStore?.get("accessToken")?.value;

  const base = process.env.NEXT_PUBLIC_BASE_API || "";
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const mergedHeaders: HeadersInit = {
    ...(init?.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  return fetch(url, {
    cache: "no-store",
    ...init,
    headers: mergedHeaders,
  });
}
