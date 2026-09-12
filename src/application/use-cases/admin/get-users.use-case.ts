import type { IGetUsersUseCase } from "@/application/abstractions/use-cases/admin/get-users.use-case";

import type { IUserRepository } from "@/domain/repositories/user.repository";

import type { GetUsersDto } from "@/application/dto/admin/get-users.dto";

import type { GetUsersResultDto } from "@/application/dto/admin/get-users-result.dto";

import { mapUserToAdminResponse } from "@/application/mappers/admin/admin-user-response.mapper";

export class GetUsersUseCase implements IGetUsersUseCase {
    constructor(
        private readonly _userRepository: IUserRepository,
    ) {}

    async execute(
        data: GetUsersDto,
    ): Promise<GetUsersResultDto> {
        const { page, limit } = data;

       const { users, total } =
    await this._userRepository.getUsers(data);

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