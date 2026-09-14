import type { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import type { IResetPasswordUseCase } from "@/application/abstractions/use-cases/reset-password.use-case";

import type { ResetPasswordDto } from "@/application/dto/auth/reset-password.dto";

import type { ApiResponse } from "@/shared/types/api-response";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

export class ResetPasswordController {
    constructor(
        private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    ) {}

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data: ResetPasswordDto =
                res.locals.validatedData;

            await this._resetPasswordUseCase.execute(data);

            const response: ApiResponse<null> = {
                success: true,
                message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS,
                data: null,
            };

            res
                .status(StatusCodes.OK)
                .json(response);
        } catch (error) {
            next(error);
        }
    }
}