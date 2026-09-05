import type { AdminUserResponseDto } from "./admin-user-response.dto.js";

export interface GetUsersResultDto {
    users: AdminUserResponseDto[];
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}