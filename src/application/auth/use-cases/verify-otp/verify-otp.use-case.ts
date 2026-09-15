import type { OtpPurpose } from "@/domain/auth/entities/otp-verification.entity";

import type { IVerifyOtpUseCase } from "@/application/auth/use-cases/verify-otp/verify-otp.use-case.interface";

import { IOtpStore } from "@/application/auth/services/otp/otp-store";

import { OTP_POLICIES } from "@/application/auth/services/otp/otp-policy";

import { IUserRepository } from "@/domain/auth/repositories/user.repository";

import { IOtpHasher } from "@/application/auth/services/otp/otp-hasher";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AppError } from "@/shared/errors/app.error";

import { StatusCodes } from "http-status-codes";

import { logger } from "@/infrastructure/logger/index";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _otpStore: IOtpStore,
    private readonly _otpHasher: IOtpHasher,
  ) { }

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

    logger.info("OTP verification attempted", {
      userId,
      purpose,
    });

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

    logger.info("OTP verified successfully", {
      userId,
      purpose,
    });


  }
}