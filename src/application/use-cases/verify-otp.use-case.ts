import { OtpPurpose } from "@/domain/entities/otp-verification.entity";

import { IOtpVerificationRepository } from "@/domain/repositories/otp-verification.repository";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { IOtpHasher } from "@/application/services/otp-hasher";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AppError } from "@/shared/errors/app.error";

import { StatusCodes } from "http-status-codes";

export class VerifyOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _otpRepository: IOtpVerificationRepository,
    private readonly _otpHasher: IOtpHasher,
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
      await this._otpRepository.findActiveByUserAndPurpose(
        userId,
        purpose,
      );

    if (!otpVerification) {
      throw new AppError(
        AUTH_MESSAGES.OTP_EXPIRED,
        StatusCodes.BAD_REQUEST,
      );
    }

    const isValid = await this._otpHasher.compare(
      otp,
      otpVerification.codeHash,
    );

    if (!isValid) {
      await this._otpRepository.incrementAttempts(
        otpVerification.id,
      );

      throw new AppError(
        AUTH_MESSAGES.OTP_INVALID,
        StatusCodes.BAD_REQUEST,
      );
    }

    await this._otpRepository.markAsVerified(
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