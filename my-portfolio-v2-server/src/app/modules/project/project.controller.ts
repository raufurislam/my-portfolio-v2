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

export const ProjectControllers = { createProject };
