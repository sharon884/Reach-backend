import { Request, Response, NextFunction } from "express";

import { UpdateUserStatusUseCase } from "@/application/use-cases/admin/update-user-status.use-case";

import { UpdateUserStatusDto } from "@/application/dto/admin/update-user-status.dto";

import { mapUserToAdminResponse } from "@/application/mappers/admin/admin-user-response.mapper";



export class UpdateUserStatusController {
    constructor(
        private readonly updateUserStatusUseCase: UpdateUserStatusUseCase,
    ) {}

    async handle(
      req: Request<{ userId: string }>,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { userId } = req.params;
            
            const data: UpdateUserStatusDto = req.body;

            const result = await this.updateUserStatusUseCase.execute(
                userId,
                data,
            );

            return res.status(200).json({
                success: true,
                message: "User status updated successfully",
                data: mapUserToAdminResponse(result)
            });
        } catch (error) {
            next(error);
    }

}

}