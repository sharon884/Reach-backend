import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

export interface ICategoryConfigurationDraftRepository {
    save(
        draft: CategoryConfigurationDraftDto,
        ttlSeconds: number,
    ): Promise<void>;

    findById(
        draftId: string,
    ): Promise<CategoryConfigurationDraftDto | null>;

    delete(
        draftId: string,
    ): Promise<void>;
}