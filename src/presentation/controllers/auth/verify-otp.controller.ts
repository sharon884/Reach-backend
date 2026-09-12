import { Request, Response, NextFunction } from "express";

import type { IVerifyOtpUseCase } from "@/application/abstractions/use-cases/verify-otp.use-case";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

import { ApiResponse } from "@/shared/types/api-response";


export class VerifyOtpController {
  constructor(
    private readonly _verifyOtpUseCase: IVerifyOtpUseCase,
  ) {}

  async handle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const data = req.body

      await this._verifyOtpUseCase.execute(
        data.userId,
        data.otp,
        "EMAIL_VERIFICATION",
      );



      const response : ApiResponse = {
            success : true, 
            message : AUTH_MESSAGES.OTP_VERIFICATION_SUCCESS
      }
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}