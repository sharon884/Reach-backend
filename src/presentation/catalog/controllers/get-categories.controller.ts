import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import type { IGetCategoriesUseCase } from "@/application/catalog/use-cases/get-categories/get-categories.use-case.interface";
import type { ApiResponse } from "@/shared/types/api-response";
import type { Category } from "@/domain/catalog/entities/category.entity";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

export class GetCategoriesController {
    constructor(
        private readonly _getCategoriesUseCase: IGetCategoriesUseCase,
    ) {}

    async handle(
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const categories =
                await this._getCategoriesUseCase.execute();

            const response: ApiResponse<Category[]> = {
                success: true,
                message: CATALOG_MESSAGES.CATEGORIES_FETCHED,
                data: categories,
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}