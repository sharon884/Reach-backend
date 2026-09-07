import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { LogoutUseCase } from "../../../application/use-cases/logout.use-case.js";
import type { TokenService } from "../../../application/services/token-service.js";
import type { ApiResponse } from "../../../shared/types/api-response.js";

export class LogoutController {

    constructor(
        private readonly logoutUseCase: LogoutUseCase,
        private readonly tokenService: TokenService,
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
                    this.tokenService.verifyRefreshToken(refreshToken);

                await this.logoutUseCase.execute(
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