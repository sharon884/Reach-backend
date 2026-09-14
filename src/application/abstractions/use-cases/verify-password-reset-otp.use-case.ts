import type { VerifyPasswordResetOtpDto } from "@/application/dto/auth/verify-password-reset-otp.dto";

export interface IVerifyPasswordResetOtpUseCase {
    execute(
        data: VerifyPasswordResetOtpDto,
    ): Promise<string>;
}