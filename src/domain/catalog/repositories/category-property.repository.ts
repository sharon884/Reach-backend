import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { CategoryProperty } from "@/domain/catalog/entities/category-property.entity";

export interface ICategoryPropertyRepository
    extends BaseRepository<CategoryProperty> {

    findByCategoryId(
        categoryId: string,
    ): Promise<CategoryProperty[]>;

    findByCategoryAndProperty(
        categoryId: string,
        propertyId: string,
    ): Promise<CategoryProperty | null>;

    updateConfiguration(
        id: string,
        configuration: {
            required?: boolean;
            filterable?: boolean;
            sortable?: boolean;
            displayOrder?: number;
        },
    ): Promise<CategoryProperty>;
}