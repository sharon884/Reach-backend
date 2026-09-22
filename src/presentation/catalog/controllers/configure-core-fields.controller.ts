import type { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import type { IConfigureCoreFieldsUseCase } from "@/application/catalog/use-cases/configure-core-fields/configure-core-fields.use-case.interface";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { ApiResponse } from "@/shared/types/api-response";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";
import { AppError } from "@/shared/errors/app.error";

export class ConfigureCoreFieldsController {
    constructor(
        private readonly _configureCoreFieldsUseCase: IConfigureCoreFieldsUseCase,
    ) {}

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

            const data = req.body;

            const draft =
                await this._configureCoreFieldsUseCase.execute(
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