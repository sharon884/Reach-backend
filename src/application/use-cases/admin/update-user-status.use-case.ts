import { UserRepository } from "@/domain/repositories/user.repository";

import { UpdateUserStatusDto } from "@/application/dto/admin/update-user-status.dto";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

export class UpdateUserStatusUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(
        userId: string,
        data: UpdateUserStatusDto,
    ) {

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, StatusCodes.NOT_FOUND);
        }


        const updatedUser = await this.userRepository.updateStatus(
            userId,
            data.status,
        );


        return updatedUser;


    }
}