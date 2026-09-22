import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";
import type { ICreateCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/create-category-configuration-draft/create-category-configuration-draft.use-case.interface";

export class CreateCategoryConfigurationDraftUseCase
    implements ICreateCategoryConfigurationDraftUseCase
{
    constructor(
        private readonly _draftRepository: ICategoryConfigurationDraftRepository,
    ) {}

    async execute(): Promise<CategoryConfigurationDraftDto> {
        const draft: CategoryConfigurationDraftDto = {
            draftId: crypto.randomUUID(),

            category: {
                name: "",
                description: null,
                parentId: null,
            },

            coreFields: [],

            properties: [],
        };

        await this._draftRepository.save(draft, 3600);

        return draft;
    }
}