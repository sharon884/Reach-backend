import { UserRepository } from "@/domain/repositories/user.repository";

import { GenerateOtpUseCase } from "@/application/use-cases/generate-otp.use-case";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

export class ResendOtpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly generateOtpUseCase: GenerateOtpUseCase,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

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

    await this.generateOtpUseCase.execute(
      userId,
      "EMAIL_VERIFICATION",
    );
  }
}