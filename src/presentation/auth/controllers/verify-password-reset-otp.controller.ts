import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import type { IVerifyPasswordResetOtpUseCase } from "@/application/auth/use-cases/verify-password-reset-otp/verify-password-reset-otp.use-case.interface";

import { VerifyPasswordResetOtpDto } from "@/application/auth/dto/otp/verify-password-reset-otp.dto";

import { ApiResponse } from "@/shared/types/api-response";

import { VerifyPasswordResetOtpResponseDto } from "@/application/auth/dto/otp/verify-password-reset-otp-response.dto";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";



export class VerifyPasswordResetOtpController {

    constructor(

        private readonly _verifyPasswordResetOtpUseCase: IVerifyPasswordResetOtpUseCase,
    ) { }


    async handle(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {


        try {

            const data: VerifyPasswordResetOtpDto = res.locals.validatedData;


            const resetToken = await this._verifyPasswordResetOtpUseCase.execute(
                data,
            );

            const response: ApiResponse<VerifyPasswordResetOtpResponseDto> = {
                success: true,
                message: AUTH_MESSAGES.OTP_VERIFICATION_SUCCESS,
                data: {
                    resetToken
                },
            };


            res.status(StatusCodes.OK).json(response);

        } catch (error) {

            next(error);

        }
    }
}