import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { GetUsersUseCase } from "../../../application/use-cases/admin/get-users.use-case.js";
import type { GetUsersDto } from "../../../application/dto/admin/get-users.dto.js";
import type { GetUsersResultDto } from "../../../application/dto/admin/get-users-result.dto.js";
import type { ApiResponse } from "../../../shared/types/api-response.js";
import { ADMIN_MESSAGES } from "../../../shared/constants/messages/admin.messages.js";

export class GetUsersController {
    constructor(
        private readonly getUsersUseCase: GetUsersUseCase,
    ) {}

    async handle(
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data = res.locals.validatedData as GetUsersDto;

            const result = await this.getUsersUseCase.execute(data);

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