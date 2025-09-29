// handlePrismaError.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/error.types";

export const handlePrismaError = (err: any): TGenericErrorResponse => {
  // Known request errors have string codes like P2002, P2025, etc.
  const errorCode: string | undefined =
    typeof err?.code === "string" ? err.code : undefined;
  const errorName: string | undefined =
    typeof err?.name === "string" ? err.name : undefined;

  // Unique constraint failed
  if (errorCode === "P2002") {
    const target = Array.isArray(err?.meta?.target)
      ? err.meta.target.join(", ")
      : err?.meta?.target || "Unique field";
    return {
      statusCode: 409,
      message: `${target} already exists`,
    };
  }

  // Record not found
  if (errorCode === "P2025") {
    const cause =
      (err?.meta && (err.meta.cause as string)) || "Requested record not found";
    return {
      statusCode: 404,
      message: cause,
    };
  }

  // Validation error (malformed data/args)
  if (errorName === "PrismaClientValidationError") {
    return {
      statusCode: 400,
      message: "Invalid data for database operation",
    };
  }

  // Initialization or connection errors
  if (
    errorName === "PrismaClientInitializationError" ||
    errorName === "PrismaClientKnownRequestError" ||
    errorName === "PrismaClientRustPanicError"
  ) {
    return {
      statusCode: 500,
      message: "Database error",
    };
  }

  // Default fallback for unknown Prisma-related errors
  return {
    statusCode: 500,
    message: "Database error",
  };
};
