import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import type { IGetUsersUseCase } from "@/application/abstractions/use-cases/admin/get-users.use-case";

import type { GetUsersDto } from "@/application/dto/admin/get-users.dto";

import type { GetUsersResultDto } from "@/application/dto/admin/get-users-result.dto";

import type { ApiResponse } from "@/shared/types/api-response";

import { ADMIN_MESSAGES } from "@/shared/constants/messages/admin.messages";

export class GetUsersController {
    constructor(
        private readonly _getUsersUseCase: IGetUsersUseCase,
    ) {}

    async handle(
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data = res.locals.validatedData as GetUsersDto;

            const result = await this._getUsersUseCase.execute(data);

            const response: ApiResponse<GetUsersResultDto> = {
                success: true,
                message: ADMIN_MESSAGES.USERS_FETCHED_SUCCESSFULLY,
                data: result,
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}