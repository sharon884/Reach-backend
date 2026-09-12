import { randomUUID } from "node:crypto";

import {
    OtpPurpose,
    OtpVerification,
} from "@/domain/entities/otp-verification.entity";

import { IGenerateOtpUseCase } from "../abstractions/use-cases/generate-otp.use-case.js";

import { IOtpVerificationRepository } from "@/domain/repositories/otp-verification.repository";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { IOtpGenerator } from "@/application/services/otp-generator";

import { IOtpHasher } from "@/application/services/otp-hasher";

import { IEmailSender } from "@/application/services/email-sender";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

export class GenerateOtpUseCase implements IGenerateOtpUseCase  {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _otpRepository: IOtpVerificationRepository,
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
        await this._otpRepository.invalidateActiveOtp(userId, purpose);

        const otp = this._otpGenerator.generate();

        const codeHash = await this._otpHasher.hash(otp);

        const otpVerification: OtpVerification = {
            id: randomUUID(),
            userId,
            codeHash,
            purpose,
            expiresAt:  new Date(Date.now() + 5 * 60 * 1000),
            attempts: 0,
            resendCount: 0,
            verifiedAt: null,
            createdAt: new Date(),
        };

        await this._otpRepository.create(otpVerification);

        console.log(otp)

        await this._emailSender.sendOtp(
            user.email,
            otp,
        );

        return otp;
    }
}