import type { ResetPasswordDto } from "@/application/dto/auth/reset-password.dto";

export interface IResetPasswordUseCase {
    execute(data: ResetPasswordDto): Promise<void>;
}