import type { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";

const createUser = async (data: Prisma.UserCreateInput) => {
  const isUserExist = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }
  const createUser = await prisma.user.create({
    data,
  });
  return createUser;
};

export const UserServices = {
  createUser,
};
