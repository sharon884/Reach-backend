import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { AdminLogoutUseCase } from "../../../application/use-cases/admin/admin-logout.use-case.js";
import type { TokenService } from "../../../application/services/token-service.js";
import type { ApiResponse } from "../../../shared/types/api-response.js";

export class AdminLogoutController {

    constructor(
        private readonly adminLogoutUseCase: AdminLogoutUseCase,
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

                await this.adminLogoutUseCase.execute(
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