"use server";
import { apiFetch } from "@/lib/apiFetch";

export async function getAllUsers() {
  const res = await apiFetch("/user/all-users");
  return res.json();
}
