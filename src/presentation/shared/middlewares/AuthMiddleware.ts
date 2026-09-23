import { Request, Response, NextFunction } from "express";

import type { ITokenService } from "@/application/auth/services/token/token-service";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

import { AppError } from "@/shared/errors/app.error";


export class AuthMiddleware {
    constructor(
        private readonly _tokenService: ITokenService,
    ) {}

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

            this._tokenService.verifyAccessToken(accessToken);

            next();
        } catch (error) {
            next(error);
        }
    }

};



