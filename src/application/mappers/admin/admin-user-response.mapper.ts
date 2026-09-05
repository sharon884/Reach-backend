import type { User } from "../../../domain/entities/user.entity.js";
import type { AdminUserResponseDto } from "../../dto/admin/admin-user-response.dto.js";

export function mapUserToAdminResponse(
    user: User,
): AdminUserResponseDto {
    return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
    };
}