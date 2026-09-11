import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import type { ISignupUseCase } from "@/application/abstractions/use-cases/signup.use-case";

import type { ApiResponse } from "@/shared/types/api-response";

import type { SignupResponseDto } from "@/application/dto/auth/signup-response.dto";

import { mapSignupToResponse } from "@/application/mappers/auth/signup-response.mapper";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";




export class SignupController {
    constructor(
        private readonly _signupUseCase: ISignupUseCase,
    ) {}

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data = req.body;

            const user = await this._signupUseCase.execute(data);

            const response: ApiResponse<SignupResponseDto> = {

                success: true,
                message: AUTH_MESSAGES.SIGNUP_SUCCESS,
                data: mapSignupToResponse(user),
            };



            res.status(StatusCodes.CREATED).json(response);
        } catch (error) {
            next(error);
        }
    }
}

