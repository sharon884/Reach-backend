
import type { Category } from "@/domain/catalog/entities/category.entity";

export interface IGetCategoriesUseCase {
    execute(): Promise<Category[]>;
}