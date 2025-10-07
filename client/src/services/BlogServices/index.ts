const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getAllBlogs = async (options?: RequestInit) => {
  const res = await fetch(`${BASE_URL}/blog`, {
    cache: "force-cache",
    credentials: "include",
    ...options,
  });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const json = await res.json();
  return json.data;
};

export const getBlogById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch blog");
  const json = await res.json();
  return json.data;
};

export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(`${BASE_URL}/blog/${slug}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch blog");
  const json = await res.json();
  return json.data;
};

export const updateBlog = async (id: string, data: any) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `HTTP ${res.status}: ${res.statusText}`;
    throw new Error(errorMessage);
  }
  const json = await res.json();
  return json.data;
};

export const deleteBlog = async (id: string) => {
  const res = await fetch(`${BASE_URL}/blog/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `HTTP ${res.status}: ${res.statusText}`;
    throw new Error(errorMessage);
  }
  const json = await res.json();
  return json.data;
};

export const createBlog = async (data: any) => {
  const res = await fetch(`${BASE_URL}/blog`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.message || `HTTP ${res.status}: ${res.statusText}`;
    throw new Error(errorMessage);
  }

  const json = await res.json();
  return json.data;
};
