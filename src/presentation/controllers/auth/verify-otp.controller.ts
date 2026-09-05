import { Request, Response, NextFunction } from "express";
import { VerifyOtpUseCase } from "../../../application/use-cases/verify-otp.use-case.js";
import { AUTH_MESSAGES } from "../../../shared/constants/messages/auth.messages.js";
import { StatusCodes } from "http-status-codes";

export class VerifyOtpController {
  constructor(
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
  ) {}

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body

      await this.verifyOtpUseCase.execute(
        data.userId,
        data.otp,
        "EMAIL_VERIFICATION",
      );

      res.status(StatusCodes.OK).json({
        success: true,
        message: AUTH_MESSAGES.OTP_VERIFICATION_SUCCESS,
      });
    } catch (error) {
      next(error);
    }
  }
}