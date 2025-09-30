import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { ProjectServices } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createProject = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const projectData = req.body;

  const project = await ProjectServices.createProject(projectData, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: project,
  });
});

const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
  const project = await ProjectServices.getProjectBySlug(req.params.slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Project fetched successfully",
    data: project,
  });
});

const getAllProjectsScroll = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectServices.getAllProjectsScroll(
    req.query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Projects fetched successfully",
    data: projects,
  });
});

const getFeaturedProjects = catchAsync(async (req: Request, res: Response) => {
  const projects = await ProjectServices.getFeaturedProjects();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Featured projects retrieved successfully",
    data: projects,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProjectsScroll,
  getProjectBySlug,
  getFeaturedProjects,
};
