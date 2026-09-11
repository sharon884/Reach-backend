import type { IUpdateUserStatusUseCase } from "@/application/abstractions/use-cases/admin/update-user-status.use-case";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { UpdateUserStatusDto } from "@/application/dto/admin/update-user-status.dto";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase {
    constructor(
        private readonly _userRepository: IUserRepository,
    ) { }

    async execute(
        userId: string,
        data: UpdateUserStatusDto,
    ) {

        const user = await this._userRepository.findById(userId);

        if (!user) {
            throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
        }


        const updatedUser = await this._userRepository.updateStatus(
            userId,
            data.status,
        );


        return updatedUser;


    }
}