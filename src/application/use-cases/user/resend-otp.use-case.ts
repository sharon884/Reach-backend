import type { IResendOtpUseCase } from "@/application/abstractions/use-cases/resend-otp.use-case";

import type { IGenerateOtpUseCase } from "@/application/abstractions/use-cases/generate-otp.use-case";

import type { IUserRepository } from "@/domain/auth/repositories/user.repository";

import type { IOtpStore } from "@/application/services/otp-store";

import { OTP_POLICIES } from "@/application/services/otp-policy";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { logger } from "@/infrastructure/logger/index";

import { StatusCodes } from "http-status-codes";

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _generateOtpUseCase: IGenerateOtpUseCase,
    private readonly _otpStore: IOtpStore,
  ) { }

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

    const purpose = "EMAIL_VERIFICATION";

    const policy = OTP_POLICIES[purpose];

    const isResendAllowed =
      await this._otpStore.isResendAllowed(
        userId,
        purpose,
      );

    if (!isResendAllowed) {
      logger.warn("OTP resend blocked by cooldown", {
        userId,
        purpose,
      });


      throw new AppError(
        "Please wait before requesting another OTP.",
        StatusCodes.TOO_MANY_REQUESTS,
      );
    }

    const resendCount =
      await this._otpStore.getResendCount(
        userId,
        purpose,
      );

    if (resendCount >= policy.maxResends) {

      logger.warn("OTP resend limit reached", {
        userId,
        purpose,
        resendCount,
      });

      throw new AppError(
        "Maximum OTP resend limit reached.",
        StatusCodes.TOO_MANY_REQUESTS,
      );
    }

    await this._generateOtpUseCase.execute(
      userId,
      purpose,
    );

    logger.info("OTP resent successfully", {
      userId,
      purpose,
    });

    await this._otpStore.incrementResendCount(
      userId,
      purpose,
      policy.expiresInSeconds,
    );

    await this._otpStore.startResendCooldown(
      userId,
      purpose,
      policy.resendCooldownSeconds,
    );
  }
}