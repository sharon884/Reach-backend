import type { AdminUserResponseDto } from "@/application/admin/dto/users/admin-user-response.dto";

export interface GetUsersResultDto {
    users: AdminUserResponseDto[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}