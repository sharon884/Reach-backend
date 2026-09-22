import type { GoogleAuthenticationDto } from "@/application/auth/dto/google-authentication/google-authentication.dto";
import { LoginResult } from "@/application/auth/dto/login/login-result.dto";

export interface IGoogleAuthenticationUseCase {
    execute(data: GoogleAuthenticationDto): Promise<LoginResult>;
}