import type { LoginDto } from "@/application/auth/dto/login/login.dto";
import type { LoginResult } from "@/application/auth/dto/login/login-result.dto";

export interface ILoginUseCase {
    execute(data: LoginDto): Promise<LoginResult>;
}