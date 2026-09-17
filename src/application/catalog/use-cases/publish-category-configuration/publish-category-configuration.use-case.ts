import { StatusCodes } from "http-status-codes";

import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

import type { PublishCategoryConfigurationDto } from "@/application/catalog/dto/category-configuration/publish-category-configuration.dto";

import type { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";

import type { IPublishCategoryConfigurationRepository } from "@/domain/catalog/repositories/publish-category-configuration.repository";

import type { IPublishedCategorySchemaCacheRepository } from "@/domain/catalog/repositories/published-category-schema-cache.repository";

import { AppError } from "@/shared/errors/app.error";

import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

import type { IPublishCategoryConfigurationUseCase } from "@/application/catalog/use-cases/publish-category-configuration/publish-category-configuration.use-case.interface";




export class PublishCategoryConfigurationUseCase
    implements IPublishCategoryConfigurationUseCase {

    constructor(
        private readonly _draftRepository: ICategoryConfigurationDraftRepository,
        private readonly _publishRepository: IPublishCategoryConfigurationRepository,
        private readonly _publishedCategorySchemaCacheRepository: IPublishedCategorySchemaCacheRepository,
    ) { }


    async execute(
        data: PublishCategoryConfigurationDto,
    ): Promise<void> {
        

        const draft: CategoryConfigurationDraftDto | null =   await this._draftRepository.findById(data.draftId);
          

        if (!draft) {
            throw new AppError(
                CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_NOT_FOUND,
                StatusCodes.NOT_FOUND,
            );
        }

        const publishedCategorySchema = await this._publishRepository.publish(draft);
            

        await this._publishedCategorySchemaCacheRepository.save(
            publishedCategorySchema,
            3600,
        );

        await this._draftRepository.delete(data.draftId);
    }
}
