const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const ProjectServices = {
  // Get all projects
  async getAllProjects() {
    const response = await fetch(`${BASE_URL}/project`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json();
  },

  // Get featured projects
  async getFeaturedProjects() {
    const response = await fetch(`${BASE_URL}/project/featured`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch featured projects");
    }

    return response.json();
  },

  // Get project by slug
  async getProjectBySlug(slug: string) {
    const response = await fetch(`${BASE_URL}/project/${slug}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    return response.json();
  },
};
