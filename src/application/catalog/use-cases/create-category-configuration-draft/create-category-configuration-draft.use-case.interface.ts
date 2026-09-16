import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

export interface CreateCategoryConfigurationDraftUseCase {
    execute(): Promise<CategoryConfigurationDraftDto>;
}