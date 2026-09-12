import type { OtpPurpose } from "@/domain/entities/otp-verification.entity";

import type { IVerifyOtpUseCase } from "@/application/abstractions/use-cases/verify-otp.use-case";

import { IOtpStore } from "@/application/services/otp-store";

import { OTP_POLICIES } from "@/application/services/otp-policy";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { IOtpHasher } from "@/application/services/otp-hasher";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AppError } from "@/shared/errors/app.error";

import { StatusCodes } from "http-status-codes";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _otpStore: IOtpStore,
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

    const codeHash = await this._otpStore.find(
      userId,
      purpose,
    );

    if (!codeHash) {
      throw new AppError(
        AUTH_MESSAGES.OTP_EXPIRED,
        StatusCodes.BAD_REQUEST,
      );
    }

    const policy = OTP_POLICIES[purpose];

    const attempts = await this._otpStore.getAttempts(
      userId,
      purpose,
    );

    if (attempts >= policy.maxAttempts) {
      await this._otpStore.delete(
        userId,
        purpose,
      );

      throw new AppError(
        AUTH_MESSAGES.OTP_INVALID,
        StatusCodes.BAD_REQUEST,
      );
    }

    const isValid = await this._otpHasher.compare(
      otp,
      codeHash,
    );

    if (!isValid) {
      const updatedAttempts =
        await this._otpStore.incrementAttempts(
          userId,
          purpose,
        );

      if (updatedAttempts >= policy.maxAttempts) {
        await this._otpStore.delete(
          userId,
          purpose,
        );
      }

      throw new AppError(
        AUTH_MESSAGES.OTP_INVALID,
        StatusCodes.BAD_REQUEST,
      );
    }

    await this._otpStore.delete(
      userId,
      purpose,
    );

    if (purpose === "EMAIL_VERIFICATION") {
      await this._userRepository.updateEmailVerification(
        userId,
        true,
      );
    }
  }
}