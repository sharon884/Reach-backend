import type { AdminLoginDto } from "@/application/admin/dto/login/admin-login.dto";
import type { LoginResult } from "@/application/auth/dto/login/login-result.dto";

export interface IAdminLoginUseCase {
    execute(data: AdminLoginDto): Promise<LoginResult>;
}