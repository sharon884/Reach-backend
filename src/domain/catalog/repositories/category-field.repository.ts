 import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { CategoryField } from "../entities/category-field.entity.js";

export interface ICategoryFieldRepository
    extends BaseRepository<CategoryField> {

    findByCategoryId(
        categoryId: string,
    ): Promise<CategoryField[]>;

    findByCategoryAndField(
        categoryId: string,
        fieldKey: string,
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