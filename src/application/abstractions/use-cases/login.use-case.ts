import type { LoginDto } from "@/application/dto/auth/login.dto";
import type { LoginResult } from "@/application/dto/auth/login-result.dto";

export interface ILoginUseCase {
    execute(data: LoginDto): Promise<LoginResult>;
}