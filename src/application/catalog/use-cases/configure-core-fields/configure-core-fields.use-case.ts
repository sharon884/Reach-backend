import { StatusCodes } from "http-status-codes";

import type { ConfigureCoreFieldsDto } from "@/application/catalog/dto/category-configuration/configure-core-fields.dto";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";

import { AppError } from "@/shared/errors/app.error";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

import type { IConfigureCoreFieldsUseCase } from "@/application/catalog/use-cases/configure-core-fields/configure-core-fields.use-case.interface";

export class ConfigureCoreFieldsUseCase
    implements IConfigureCoreFieldsUseCase {
    constructor(
        private readonly _draftRepository: ICategoryConfigurationDraftRepository,
    ) { }

    async execute(
        draftId: string,
        data: ConfigureCoreFieldsDto,
    ): Promise<CategoryConfigurationDraftDto> {
        const draft = await this._draftRepository.findById(draftId);

        if (!draft) {
            throw new AppError(
                CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_NOT_FOUND,
                StatusCodes.NOT_FOUND,
            );
        }

        draft.coreFields = data.coreFields;

        await this._draftRepository.save(draft, 3600);

        return draft;
    }
}