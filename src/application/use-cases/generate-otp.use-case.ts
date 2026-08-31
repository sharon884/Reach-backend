import { randomUUID } from "node:crypto";
import {
    OtpPurpose,
    OtpVerification,
} from "../../domain/entities/otp-verification.entity.js";
import { OtpVerificationRepository } from "../../domain/repositories/otp-verification.repository.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { OtpGenerator } from "../services/otp-generator.js";
import { OtpHasher } from "../services/otp-hasher.js";
import { EmailSender } from "../services/email-sender.js";
import { AppError } from "../../shared/errors/app.error.js";
import { AUTH_MESSAGES } from "../../shared/constants/messages/auth.messages.js";
import { StatusCodes } from "http-status-codes";

export class GenerateOtpUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly otpRepository: OtpVerificationRepository,
        private readonly otpGenerator: OtpGenerator,
        private readonly otpHasher: OtpHasher,
        private readonly emailSender: EmailSender,
    ) { }

    async execute(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<string> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError(
                AUTH_MESSAGES.USER_NOT_FOUND,
                StatusCodes.NOT_FOUND,
            );
        }
        await this.otpRepository.invalidateActiveOtp(userId, purpose);

        const otp = this.otpGenerator.generate();

        const codeHash = await this.otpHasher.hash(otp);

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

        await this.otpRepository.create(otpVerification);

        await this.emailSender.sendOtp(
            user.email,
            otp,
        );

        return otp;
    }
}