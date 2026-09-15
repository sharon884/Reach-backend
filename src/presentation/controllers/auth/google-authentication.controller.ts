import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { StatusCodes } from "http-status-codes";

import type { IGoogleAuthenticationUseCase } from "@/application/auth/use-cases/google-authentication/google-authentication.use-case.interface";

import type { LoginResponseDto } from "@/application/auth/dto/login/login-response.dto";

import { ApiResponse } from "@/shared/types/api-response";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AUTH_COOKIES } from "@/presentation/cookies/auth.cookies";

import { mapLoginToResponse } from "@/application/auth/mappers/login/login-response.mapper";

export class GoogleAuthenticationController {

    constructor(
        private readonly _googleAuthenticationUseCase: IGoogleAuthenticationUseCase,
    ) { }

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {

        try {

            const data = req.body;

            const result =
                await this._googleAuthenticationUseCase.execute(data);

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
                message: AUTH_MESSAGES.GOOGLE_LOGIN_SUCCESS,
                data: mapLoginToResponse(result.user),
            };

            res.status(StatusCodes.OK).json(response);

        } catch (error) {
            next(error);
        }
    }
}