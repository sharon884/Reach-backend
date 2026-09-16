import { StatusCodes } from "http-status-codes";

import type { ConfigureDynamicPropertiesDto } from "@/application/catalog/dto/category-configuration/configure-dynamic-properties.dto";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";

import { AppError } from "@/shared/errors/app.error";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

import type { IConfigureDynamicPropertiesUseCase } from "@/application/catalog/use-cases/configure-dynamic-properties/configure-dynamic-properties.use-case.interface";

export class ConfigureDynamicPropertiesUseCase
    implements IConfigureDynamicPropertiesUseCase
{
    constructor(
        private readonly _draftRepository: ICategoryConfigurationDraftRepository,
    ) {}

    async execute(
        draftId: string,
        data: ConfigureDynamicPropertiesDto,
    ): Promise<CategoryConfigurationDraftDto> {

        
        const draft = await this._draftRepository.findById(draftId);

        if (!draft) {
            throw new AppError(
                CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_NOT_FOUND,
                StatusCodes.NOT_FOUND,
            );
        }

        draft.properties = data.properties;

        await this._draftRepository.save(draft, 3600);

        return draft;
    }
}