import type { OtpPurpose } from "@/domain/auth/entities/otp-verification.entity";

export interface IVerifyOtpUseCase {
    execute(
        userId: string,
        otp: string,
        purpose: OtpPurpose,
    ): Promise<void>;
}