import { Request, Response, NextFunction } from "express";

import type { IForgotPasswordUseCase } from "@/application/abstractions/use-cases/forgot-password.use-case";

import type { ForgotPasswordDto } from "@/application/dto/auth/forgot-password.dto";


import type { ApiResponse } from "@/shared/types/api-response";


import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { StatusCodes } from "http-status-codes";



export class ForgotPasswordController {
    constructor(
        private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
    ) { }


    async handle(

        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {


        try {

            const data: ForgotPasswordDto = res.locals.validatedData;

            await this._forgotPasswordUseCase.execute(data);

            const response: ApiResponse<null> = {
                success: true,
                message: AUTH_MESSAGES.PASSWORD_RESET_OTP_SENT
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error)
        }
    }
}