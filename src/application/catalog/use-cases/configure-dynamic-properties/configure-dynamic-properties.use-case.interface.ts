import type { ConfigureDynamicPropertiesDto } from "@/application/catalog/dto/category-configuration/configure-dynamic-properties.dto";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

export interface IConfigureDynamicPropertiesUseCase {
    execute(
        draftId: string,
        data: ConfigureDynamicPropertiesDto,
    ): Promise<CategoryConfigurationDraftDto>;
}