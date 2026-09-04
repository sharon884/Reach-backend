import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { AppError } from "../../shared/errors/app.error.js";
import type { ErrorResponse } from "../../shared/types/error-response.js";

export const errorMiddleware = (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    if (error instanceof AppError) {
        const response: ErrorResponse = {
            success: false,
            message: error.message,
        };

        res.status(error.statusCode).json(response);

        return;
    }

    console.error(error);

    const response: ErrorResponse = {
        success: false,
        message: "Internal server error",
    };

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};