import type { User } from "../../../domain/entities/user.entity.js";
import type { LoginResponseDto } from "../../dto/auth/login-response.dto.js";

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