import type { OtpPurpose } from "@/domain/entities/otp-verification.entity";

export interface IGenerateOtpUseCase {
    execute(
        userId: string,
        purpose: OtpPurpose,
    ): Promise<string>;
}