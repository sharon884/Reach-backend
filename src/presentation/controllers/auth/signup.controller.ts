import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


import { SignupUseCase } from "../../../application/use-cases/signup.use-case.js";
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
            const data = req.body

            const user = await this.signupUseCase.execute(data);

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: AUTH_MESSAGES.SIGNUP_SUCCESS,
                data: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    isEmailVerified: user.isEmailVerified,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}