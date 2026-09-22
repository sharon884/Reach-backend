import type { User } from "@/domain/auth/entities/user.entity";

import type { AdminUserResponseDto } from "@/application/admin/dto/users/admin-user-response.dto";

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