import type { ConfigureCoreFieldsDto } from "@/application/catalog/dto/category-configuration/configure-core-fields.dto";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

export interface IConfigureCoreFieldsUseCase {
    execute(
        draftId: string,
        data: ConfigureCoreFieldsDto,
    ): Promise<CategoryConfigurationDraftDto>;
}