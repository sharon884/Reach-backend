import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { IUpdateCategoryDraftUseCase } from "@/application/catalog/use-cases/update-category-draft/update-category-draft.use-case.interface";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";
import type { ApiResponse } from "@/shared/types/api-response";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export class UpdateCategoryDraftController {
    constructor(
        private readonly _updateCategoryDraftUseCase: IUpdateCategoryDraftUseCase,
    ) {}

    async handle(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { draftId } = res.locals.validatedData;

            const data = res.locals.validatedData;

            const draft =
                await this._updateCategoryDraftUseCase.execute(
                    draftId,
                    data,
                );

            const response: ApiResponse<CategoryConfigurationDraftDto> = {
                success: true,
                message:
                    CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_UPDATED,
                data: draft,
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}