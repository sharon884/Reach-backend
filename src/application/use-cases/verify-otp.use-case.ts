import { OtpPurpose } from "../../domain/entities/otp-verification.entity.js";
import { OtpVerificationRepository } from "../../domain/repositories/otp-verification.repository.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { OtpHasher } from "../services/otp-hasher.js";
import { AUTH_MESSAGES } from "../../shared/constants/messages/auth.messages.js";
import { AppError } from "../../shared/errors/app.error.js";
import { StatusCodes } from "http-status-codes";

export class VerifyOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly otpRepository: OtpVerificationRepository,
    private readonly otpHasher: OtpHasher,
  ) {}

  async execute(
    userId: string,
    otp: string,
    purpose: OtpPurpose,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);

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
      await this.userRepository.updateEmailVerification(
        userId,
        true,
      );
    }
  }
}