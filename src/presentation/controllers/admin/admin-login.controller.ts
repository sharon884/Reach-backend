import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import { AdminLoginUseCase } from "@/application/use-cases/admin-login.use-case";

import type { ApiResponse } from "@/shared/types/api-response";

import type { LoginResponseDto } from "@/application/dto/auth/login-response.dto";

import { mapLoginToResponse } from "@/application/mappers/auth/login-response.mapper";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AUTH_COOKIES } from "@/presentation/cookies/auth.cookies";

export class AdminLoginController {

    constructor(
        private readonly adminLoginUseCase: AdminLoginUseCase,
    ) {}

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data = req.body;

            const result = await this.adminLoginUseCase.execute(data);

            res.cookie(
                AUTH_COOKIES.accessToken.name,
                result.accessToken,
                AUTH_COOKIES.accessToken.options,
            );

            res.cookie(
                AUTH_COOKIES.refreshToken.name,
                result.refreshToken,
                AUTH_COOKIES.refreshToken.options,
            );

            const response: ApiResponse<LoginResponseDto> = {
                success: true,
                message: AUTH_MESSAGES.LOGIN_SUCCESS,
                data: mapLoginToResponse(result.user),
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log("Admin login error ", error)
            next(error);
        }
    }
}