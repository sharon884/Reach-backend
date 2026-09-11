import type { AdminLoginDto } from "@/application/dto/admin/admin-login.dto";
import type { LoginResult } from "@/application/dto/auth/login-result.dto";

export interface IAdminLoginUseCase {
    execute(data: AdminLoginDto): Promise<LoginResult>;
}