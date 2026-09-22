import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import type { ICreateCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/create-category-configuration-draft/create-category-configuration-draft.use-case.interface";

import type { ApiResponse } from "@/shared/types/api-response";

import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

export class CreateCategoryConfigurationDraftController {
    constructor(
        private readonly _createCategoryConfigurationDraftUseCase: ICreateCategoryConfigurationDraftUseCase,
    ) { }

    async handle(
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {

        try {

         

            const draft =
                await this._createCategoryConfigurationDraftUseCase.execute();

            const response: ApiResponse<CategoryConfigurationDraftDto> = {
                success: true,
                message: CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_CREATED,
                data: draft,
            };

            res.status(StatusCodes.CREATED).json(response);

        } catch (error) {
            next(error);
        }
    }
}