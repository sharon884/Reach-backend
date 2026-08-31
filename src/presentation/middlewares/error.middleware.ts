import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../shared/errors/app.error.js";

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  console.error(error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
  });
};