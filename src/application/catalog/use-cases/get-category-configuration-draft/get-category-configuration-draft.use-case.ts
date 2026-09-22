import { StatusCodes } from "http-status-codes";

import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";

import type { IGetCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/get-category-configuration-draft/get-category-configuration-draft.use-case.interface";

import { AppError } from "@/shared/errors/app.error";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

export class GetCategoryConfigurationDraftUseCase
    implements IGetCategoryConfigurationDraftUseCase
{
    constructor(
        private readonly _draftRepository: ICategoryConfigurationDraftRepository,
    ) {}

    async execute(
        draftId: string,
    ): Promise<CategoryConfigurationDraftDto> {
        const draft = await this._draftRepository.findById(draftId);

        if (!draft) {
            throw new AppError(
                CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_NOT_FOUND,
                StatusCodes.NOT_FOUND,
            );
        }

        return draft;
    }
}