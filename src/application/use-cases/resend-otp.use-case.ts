import { IUserRepository } from "@/domain/repositories/user.repository";

import type { IResendOtpUseCase } from "@/application/abstractions/use-cases/resend-otp.use-case";

import type { IGenerateOtpUseCase } from "@/application/abstractions/use-cases/generate-otp.use-case";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _generateOtpUseCase: IGenerateOtpUseCase,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
      );
    }

    if (user.isEmailVerified) {
      throw new AppError(
        AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED,
        StatusCodes.BAD_REQUEST,
      );
    }

    await this._generateOtpUseCase.execute(
      userId,
      "EMAIL_VERIFICATION",
    );
  }
}