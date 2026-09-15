import type { OtpPurpose } from "@/domain/auth/entities/otp-verification.entity";

import { IGenerateOtpUseCase } from "@/application/auth/use-cases/generate-otp/generate-otp.use-case.interface";

import { IOtpStore } from "@/application/auth/services/otp/otp-store";

import { OTP_POLICIES } from "@/application/auth/services/otp/otp-policy";

import { IUserRepository } from "@/domain/auth/repositories/user.repository";

import { IOtpGenerator } from "@/application/auth/services/otp/otp-generator";

import { IOtpHasher } from "@/application/auth/services/otp/otp-hasher";

import { IEmailSender } from "@/application/auth/services/email/email-sender";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

import { logger } from "@/infrastructure/logger/index";

export class GenerateOtpUseCase implements IGenerateOtpUseCase {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _otpStore: IOtpStore,
        private readonly _otpGenerator: IOtpGenerator,
        private readonly _otpHasher: IOtpHasher,
        private readonly _emailSender: IEmailSender,
    ) { }

    async execute(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<string> {
        const user = await this._userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                AUTH_MESSAGES.USER_NOT_FOUND,
                StatusCodes.NOT_FOUND,
            );
        }

        const otp = this._otpGenerator.generate();

        logger.info(otp)

        const codeHash = await this._otpHasher.hash(otp);

        const policy = OTP_POLICIES[purpose];

        await this._otpStore.save(
            userId,
            purpose,
            codeHash,
            policy.expiresInSeconds,
        );

        logger.info("OTP generated and stored", {
            userId,
            purpose,
        });

        await this._emailSender.sendOtp(
            user.email,
            otp,
        );

        return otp;
    }
}