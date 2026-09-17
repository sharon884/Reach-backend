import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { PublishedCategorySchemaDto } from "@/application/catalog/dto/category-configuration/published-category-schema.dto";

export interface IPublishCategoryConfigurationRepository {
    publish(
        draft: CategoryConfigurationDraftDto,
    ): Promise<PublishedCategorySchemaDto>;
}