import { Request, Response, NextFunction } from "express";
import { ResendOtpUseCase } from "../../../application/use-cases/resend-otp.use-case.js";
import { AUTH_MESSAGES } from "../../../shared/constants/messages/auth.messages.js";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../../shared/types/api-response.js";

export class ResendOtpController {
  constructor(
    private readonly resendOtpUseCase: ResendOtpUseCase,
  ) { }

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;

      await this.resendOtpUseCase.execute(data.userId);

      const response: ApiResponse = {
        success: true,
        message: AUTH_MESSAGES.OTP_SENT_SUCCESSFULLY
      }

      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}