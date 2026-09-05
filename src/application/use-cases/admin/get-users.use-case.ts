import type { UserRepository } from "../../../domain/repositories/user.repository.js";
import type { GetUsersDto } from "../../dto/admin/get-users.dto.js";
import type { GetUsersResultDto } from "../../dto/admin/get-users-result.dto.js";
import { mapUserToAdminResponse } from "../../mappers/admin/admin-user-response.mapper.js";

export class GetUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(
        data: GetUsersDto,
    ): Promise<GetUsersResultDto> {
        const { page, limit } = data;

        const { users, total } =
            await this.userRepository.getUsers(page, limit);

        const totalPages = Math.ceil(total / limit);

        return {
            users : users.map(mapUserToAdminResponse),
            total,
            totalPages,
            page,
            limit,
        };
    }
}