import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginUseCase } from "../../../application/use-cases/login.use-case.js";
import { ApiResponse } from "../../../shared/types/api-response.js";
import { LoginResponseDto } from "../../../application/dto/auth/login-response.dto.js";
import { mapLoginToResponse } from "../../../application/mappers/auth/login-response.mapper.js";
import { AUTH_MESSAGES } from "../../../shared/constants/messages/auth.messages.js";
import { AUTH_COOKIES } from "../../cookies/auth.cookies.js";


export class LoginController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) { }


    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {

        try {

            const data = req.body;

            const result = await this.loginUseCase.execute(data);

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
            next(error)
        }
    }
}