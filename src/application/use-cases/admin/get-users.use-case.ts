import type { UserRepository } from "@/domain/repositories/user.repository";

import type { GetUsersDto } from "@/application/dto/admin/get-users.dto";

import type { GetUsersResultDto } from "@/application/dto/admin/get-users-result.dto";

import { mapUserToAdminResponse } from "@/application/mappers/admin/admin-user-response.mapper";

export class GetUsersUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(
        data: GetUsersDto,
    ): Promise<GetUsersResultDto> {
        const { page, limit } = data;

       const { users, total } =
    await this.userRepository.getUsers(data);

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