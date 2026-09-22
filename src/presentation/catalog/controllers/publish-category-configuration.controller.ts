import type { PublishCategoryConfigurationDto } from "@/application/catalog/dto/category-configuration/publish-category-configuration.dto";
import type { IPublishCategoryConfigurationUseCase } from "@/application/catalog/use-cases/publish-category-configuration/publish-category-configuration.use-case.interface";

import type { ApiResponse } from "@/shared/types/api-response";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AppError } from "@/shared/errors/app.error";

export class PublishCategoryConfigurationController {
    constructor(
        private readonly _publishCategoryConfigurationUseCase: IPublishCategoryConfigurationUseCase,
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

            const data: PublishCategoryConfigurationDto = {
                draftId,
            };

            await this._publishCategoryConfigurationUseCase.execute(data);

            const response: ApiResponse<null> = {
                success: true,
                message: CATALOG_MESSAGES.CATEGORY_CONFIGURATION_PUBLISHED,
                data: null,
            };

            res.status(StatusCodes.OK).json(response);
        } catch (error) {
            next(error);
        }
    }
}