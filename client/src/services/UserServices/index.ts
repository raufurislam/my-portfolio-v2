const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getAllUsers = async (options?: RequestInit) => {
  const res = await fetch(`${BASE_URL}/user/all-users`, {
    cache: "force-cache",
    ...options,
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  const json = await res.json();
  return json.data; // <- return only the array
};
