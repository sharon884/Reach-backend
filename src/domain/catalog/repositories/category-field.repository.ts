 import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { CategoryField , CoreFieldKey } from "@/domain/catalog/entities/category-field.entity";

export interface ICategoryFieldRepository
    extends BaseRepository<CategoryField> {

    findByCategoryId(
        categoryId: string,
    ): Promise<CategoryField[]>;

    findByCategoryAndField(
    categoryId: string,
    fieldKey: CoreFieldKey,
): Promise<CategoryField | null>;

    updateConfiguration(
        id: string,
        configuration: {
            required?: boolean;
            isEnabled?: boolean;
            displayOrder?: number;
        },
    ): Promise<CategoryField>;
}