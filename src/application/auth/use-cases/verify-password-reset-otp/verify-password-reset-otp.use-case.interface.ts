import type { VerifyPasswordResetOtpDto } from "@/application/auth/dto/otp/verify-password-reset-otp.dto";

export interface IVerifyPasswordResetOtpUseCase {
    execute(
        data: VerifyPasswordResetOtpDto,
    ): Promise<string>;
}