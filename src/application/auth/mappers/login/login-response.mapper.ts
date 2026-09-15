import type { User } from "@/domain/auth/entities/user.entity";
import type { LoginResponseDto } from "@/application/auth/dto/login/login-response.dto";

export function mapLoginToResponse(
    user: User,
): LoginResponseDto {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
        isEmailVerified: user.isEmailVerified,
    };
}