import { IRefreshTokenUseCase } from "@/application/auth/use-cases/refresh-token/refresh-token.use-case.interface";
import { AUTH_COOKIES } from "@/presentation/shared/cookies/auth.cookies";
import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { AppError } from "@/shared/errors/app.error";
import { ApiResponse } from "@/shared/types/api-response";

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


export class RefreshTokenController {

    constructor(
        private readonly _refreshTokenUseCase: IRefreshTokenUseCase
    ) { }



    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {


        try {

            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                throw new AppError(
                    AUTH_MESSAGES.REFRESH_TOKEN_REQUIRED,
                    StatusCodes.UNAUTHORIZED
                );
            }



            const result = await this._refreshTokenUseCase.execute(refreshToken);


            res.cookie(
                AUTH_COOKIES.accessToken.name,
                result.accessToken,
                AUTH_COOKIES.accessToken.options
            );


            res.cookie(
                AUTH_COOKIES.refreshToken.name,
                result.refreshToken,
                AUTH_COOKIES.refreshToken.options,
            );

            const response: ApiResponse = {
                success: true,
                message: AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS
            };


            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }

    }
}