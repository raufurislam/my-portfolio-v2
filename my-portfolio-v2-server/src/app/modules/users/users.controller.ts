import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./users.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User Created Successfully",
    data: user,
  });
});

export const userController = {
  createUser,
};
