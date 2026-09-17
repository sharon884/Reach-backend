import type { PublishCategoryConfigurationDto } from "@/application/catalog/dto/category-configuration/publish-category-configuration.dto";

export interface IPublishCategoryConfigurationUseCase {
    execute(
        data: PublishCategoryConfigurationDto,
    ): Promise<void>;
}