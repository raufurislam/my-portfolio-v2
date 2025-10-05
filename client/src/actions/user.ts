"use server";
import { apiFetch } from "@/lib/apiFetch";

export async function getAllUsers() {
  const res = await apiFetch("/user/all-users");
  return res.json();
}

export async function getAllProjects() {
  const res = await apiFetch("/project");
  return res.json();
}
