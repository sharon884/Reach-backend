import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

export interface IGetCategoryConfigurationDraftUseCase {
    execute(draftId: string): Promise<CategoryConfigurationDraftDto>;
}