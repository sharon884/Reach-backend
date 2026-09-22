import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import type { IGetCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/get-category-configuration-draft/get-category-configuration-draft.use-case.interface";

import type { ApiResponse } from "@/shared/types/api-response";

import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";
import { AppError } from "@/shared/errors/app.error";

export class GetCategoryConfigurationDraftController {
    constructor(
        private readonly _getCategoryConfigurationDraftUseCase: IGetCategoryConfigurationDraftUseCase,
    ) { }

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {


            const { draftId } = req.params;

            if (typeof draftId !== "string") {
                throw new AppError(
                    CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_ID_INVALID,
                    StatusCodes.BAD_REQUEST,
                );
            }

            const draft =
                await this._getCategoryConfigurationDraftUseCase.execute(
                    draftId,
                );

            const response: ApiResponse<CategoryConfigurationDraftDto> = {
                success: true,
                message: CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_FETCHED,
                data: draft,
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}