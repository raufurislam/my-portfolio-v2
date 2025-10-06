const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getAllProjects = async (options?: RequestInit) => {
  const res = await fetch(`${BASE_URL}/project`, {
    cache: "force-cache",
    ...options,
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  const json = await res.json();
  return json.data;
};

export const getProjectById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/project/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch project");
  const json = await res.json();
  return json.data;
};

export const getProjectBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/project/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch project");
  const json = await res.json();
  return json.data;
};

export const updateProject = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/project/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  const json = await res.json();
  return json.data;
};

export const deleteProject = async (id: string) => {
  const res = await fetch(`${BASE_URL}/project/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  const json = await res.json();
  return json.data;
};
