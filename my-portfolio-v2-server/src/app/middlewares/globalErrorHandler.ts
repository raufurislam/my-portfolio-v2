// globalErrorHandler.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { handleZodError } from "../helpers/handleZodError";
import { handleValidationError } from "../helpers/handleValidationError";
import AppError from "../errorHelpers/AppError";
import { handlePrismaError } from "../helpers/handlePrismaError";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  // Prisma known/validation errors
  if (
    err?.name?.startsWith("PrismaClient") ||
    (typeof err?.code === "string" && err.code.startsWith("P"))
  ) {
    const simplifiedError = handlePrismaError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Duplicate error (likely MongoDB, kept for compatibility)
  else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // CastError
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // ZodError
  else if (err.name === "ZodError") {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }

  // ValidationError
  else if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);

    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources as TErrorSources[];
    message = simplifiedError.message;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
