import { Request, Response, NextFunction } from "express";

import type { IResendOtpUseCase } from "@/application/abstractions/use-cases/resend-otp.use-case";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

import { ApiResponse } from "@/shared/types/api-response";

export class ResendOtpController {
  constructor(
    private readonly _resendOtpUseCase: IResendOtpUseCase,
  ) { }

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body;

      await this._resendOtpUseCase.execute(data.userId);

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