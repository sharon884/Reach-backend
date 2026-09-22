import type { UpdateCategoryDraftDto } from "@/application/catalog/dto/category-configuration/update-category-draft.dto";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

export interface IUpdateCategoryDraftUseCase {
    execute(
        draftId: string,
        data: UpdateCategoryDraftDto,
    ): Promise<CategoryConfigurationDraftDto>;
}