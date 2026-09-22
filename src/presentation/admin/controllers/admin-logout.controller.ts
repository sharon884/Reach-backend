import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import type { IAdminLogoutUseCase } from "@/application/admin/use-cases/logout/admin-logout.use-case.interface";

import type { ITokenService } from "@/application/auth/services/token/token-service";

import type { ApiResponse } from "@/shared/types/api-response";

export class AdminLogoutController {

    constructor(
        private readonly _adminLogoutUseCase: IAdminLogoutUseCase,
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

                await this._adminLogoutUseCase.execute(
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