import { JwtPayload } from "jsonwebtoken";
import { IProject } from "./project.interface";
import { Project } from "./project.model";

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

export const ProjectServices = { createProject };
