import type { ConfigureDynamicPropertiesDto } from "@/application/catalog/dto/category-configuration/configure-dynamic-properties.dto";

import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

import type { IConfigureDynamicPropertiesUseCase } from "@/application/catalog/use-cases/configure-dynamic-properties/configure-dynamic-properties.use-case.interface";

import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

import type { ApiResponse } from "@/shared/types/api-response";

import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";

import { AppError } from "@/shared/errors/app.error";


export class ConfigureDynamicPropertiesController {
    constructor(
        private readonly _configureDynamicPropertiesUseCase: IConfigureDynamicPropertiesUseCase,
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

            const data = req.body as ConfigureDynamicPropertiesDto;

            const draft =
                await this._configureDynamicPropertiesUseCase.execute(
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