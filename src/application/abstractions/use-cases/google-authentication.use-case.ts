import type { GoogleAuthenticationDto } from "@/application/dto/auth/google-authentication.dto";
import { LoginResult } from "@/application/dto/auth/login-result.dto";

export interface IGoogleAuthenticationUseCase {
    execute(data: GoogleAuthenticationDto): Promise<LoginResult>;
}