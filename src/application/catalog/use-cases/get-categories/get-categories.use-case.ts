import type { Category } from "@/domain/catalog/entities/category.entity";
import type { ICategoryRepository } from "@/domain/catalog/repositories/category.repository";

import type { IGetCategoriesUseCase } from "@/application/catalog/use-cases/get-categories/get-categories.use-case.interface";

export class GetCategoriesUseCase
    implements IGetCategoriesUseCase
{
    constructor(
        private readonly _categoryRepository: ICategoryRepository,
    ) {}

    async execute(): Promise<Category[]> {
        return this._categoryRepository.findAllActive();
    }
}  