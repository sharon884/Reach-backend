import { Request, Response, NextFunction } from "express";

import type { TokenService } from "../../application/services/token-service.js";
import { AUTH_MESSAGES } from "../../shared/constants/messages/auth.messages.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../../shared/errors/app.error.js";

export class AdminAuthMiddleware {

    constructor(
        private readonly tokenService: TokenService,
    ) { }

    handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): void {
        try {
            const accessToken = req.cookies.accessToken;

            if (!accessToken) {
                throw new AppError(
                    AUTH_MESSAGES.UNAUTHORIZED,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            const payload = this.tokenService.verifyAccessToken(accessToken);

            if (payload.role !== "ADMIN") {
                throw new AppError(
                    AUTH_MESSAGES.UNAUTHORIZED,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}