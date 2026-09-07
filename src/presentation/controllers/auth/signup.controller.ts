import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { SignupUseCase } from "../../../application/use-cases/signup.use-case.js";
import type { ApiResponse } from "../../../shared/types/api-response.js";
import type { SignupResponseDto } from "../../../application/dto/auth/signup-response.dto.js";
import { mapSignupToResponse } from "../../../application/mappers/auth/signup-response.mapper.js";
import { AUTH_MESSAGES } from "../../../shared/constants/messages/auth.messages.js";


export class SignupController {
    constructor(
        private readonly signupUseCase: SignupUseCase,
    ) { }

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data = req.body;

            const user = await this.signupUseCase.execute(data);

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