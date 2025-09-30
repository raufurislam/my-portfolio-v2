import { JwtPayload } from "jsonwebtoken";
import { IProject } from "./project.interface";
import { Project } from "./project.model";
import { QueryBuilderScroll } from "../../utils/QueryBuilderScroll";
import { projectSearchableFields } from "./project.constant";

const createProject = async (payload: IProject, user: JwtPayload) => {
  const existingProject = await Project.findOne({ title: payload.title });
  if (existingProject) {
    throw new Error("A Project with this title already exists.");
  }

  const project = await Project.create({
    ...payload,
    author: user.userId,
  });

  return project;
};

const getProjectBySlug = async (slug: string) => {
  const project = await Project.findOneAndUpdate(
    { slug, isPublished: true },
    { $inc: { views: 1 } },
    { new: true }
  ).populate("author", "name email avatar");

  return project;
};

const getAllProjectsScroll = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilderScroll(
    Project.find({ isPublished: true }),
    query
  );

  const projects = await queryBuilder
    .search(projectSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .build()
    .populate("author", "name email avatar");

  return projects;
};

const getFeaturedProjects = async () => {
  return await Project.find({ isPublished: true, isFeatured: true })
    .populate("author", "name email")
    .sort({ createdAt: -1 });
};

export const ProjectServices = {
  createProject,
  getProjectBySlug,
  getAllProjectsScroll,
  getFeaturedProjects,
};
