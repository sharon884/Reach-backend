import type { ResetPasswordDto } from "@/application/auth/dto/password/reset-password.dto";

export interface IResetPasswordUseCase {
    execute(data: ResetPasswordDto): Promise<void>;
}