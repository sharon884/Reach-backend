import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { AppError } from "../../shared/errors/app.error.js";
import type { ErrorResponse } from "../../shared/types/error-response.js";
import { logger } from "../../infrastructure/logger/logger.js";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
): void => {
  if (error instanceof AppError) {
    const response: ErrorResponse = {
      success: false,
      message: error.message,
    };

    res.status(error.statusCode).json(response);

    return;
  }


  if (error instanceof ZodError) {
    const response: ErrorResponse = {
      success: false,
      message: "Validation failed",
    };

    res.status(StatusCodes.BAD_REQUEST).json(response);

    return;
  }


  logger.error("Unexpected application error", error);

  const response: ErrorResponse = {
    success: false,
    message: "Internal server error",
  };

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};