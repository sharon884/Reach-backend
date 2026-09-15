import type { IGetUsersUseCase } from "@/application/admin/use-cases/get-users/get-users.use-case.interface";

import type { IUserRepository } from "@/domain/auth/repositories/user.repository";

import type { GetUsersDto } from "@/application/admin/dto/users/get-users.dto";

import type { GetUsersResultDto } from "@/application/admin/dto/users/get-users-result.dto";

import { mapUserToAdminResponse } from "@/application/admin/mappers/users/admin-user-response.mapper";

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