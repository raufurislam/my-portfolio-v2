"use server";
import { apiFetch } from "@/lib/apiFetch";

type GetUsersParams = {
  page?: number | string | undefined;
  limit?: number | string | undefined;
  searchTerm?: string | undefined;
  role?: string | undefined;
  isActive?: string | undefined;
  sort?: string | undefined;
  fields?: string | undefined;
};

export async function getAllUsers(params: GetUsersParams = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.searchTerm) query.set("searchTerm", params.searchTerm);
  if (params.role && params.role !== "all") query.set("role", params.role);
  if (params.isActive && params.isActive !== "all")
    query.set("isActive", params.isActive);
  if (params.sort) query.set("sort", params.sort);
  if (params.fields) query.set("fields", params.fields);

  const path = `/user/all-users${
    query.toString() ? `?${query.toString()}` : ""
  }`;
  const res = await apiFetch(path);
  return res.json();
}

export async function getAllProjects() {
  const res = await apiFetch("/project");
  return res.json();
}
