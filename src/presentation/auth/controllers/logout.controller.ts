import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import type { ILogoutUseCase } from "@/application/auth/use-cases/logout/logout.use-case.interface";

import type { ITokenService } from "@/application/auth/services/token/token-service";

import type { ApiResponse } from "@/shared/types/api-response";

export class LogoutController {

    constructor(
        private readonly _logoutUseCase: ILogoutUseCase,
        private readonly _tokenService: ITokenService,
    ) {}

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (refreshToken) {
                const payload =
                    this._tokenService.verifyRefreshToken(refreshToken);

                await this._logoutUseCase.execute(
                    payload.sessionId,
                );
            }

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            const response: ApiResponse = {
                success: true,
                message: "Logout successful",
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}