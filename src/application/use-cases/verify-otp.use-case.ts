import { OtpPurpose } from "@/domain/entities/otp-verification.entity";

import { OtpVerificationRepository } from "@/domain/repositories/otp-verification.repository";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { OtpHasher } from "@/application/services/otp-hasher";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AppError } from "@/shared/errors/app.error";

import { StatusCodes } from "http-status-codes";

export class VerifyOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly otpRepository: OtpVerificationRepository,
    private readonly otpHasher: OtpHasher,
  ) {}

  async execute(
    userId: string,
    otp: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    const user = await this._userRepository.findById(userId);

    if (!user) {
      throw new AppError(
        AUTH_MESSAGES.USER_NOT_FOUND,
        StatusCodes.NOT_FOUND,
      );
    }

    const otpVerification =
      await this.otpRepository.findActiveByUserAndPurpose(
        userId,
        purpose,
      );

    if (!otpVerification) {
      throw new AppError(
        AUTH_MESSAGES.OTP_EXPIRED,
        StatusCodes.BAD_REQUEST,
      );
    }

    const isValid = await this.otpHasher.compare(
      otp,
      otpVerification.codeHash,
    );

    if (!isValid) {
      await this.otpRepository.incrementAttempts(
        otpVerification.id,
      );

      throw new AppError(
        AUTH_MESSAGES.OTP_INVALID,
        StatusCodes.BAD_REQUEST,
      );
    }

    await this.otpRepository.markAsVerified(
      otpVerification.id,
      new Date(),
    );

    if (purpose === "EMAIL_VERIFICATION") {
      await this._userRepository.updateEmailVerification(
        userId,
        true,
      );
    }
  }
}