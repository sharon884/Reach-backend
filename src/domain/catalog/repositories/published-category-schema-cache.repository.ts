import type { PublishedCategorySchemaDto } from "@/application/catalog/dto/category-configuration/published-category-schema.dto";

export interface IPublishedCategorySchemaCacheRepository {
    save(
        schema: PublishedCategorySchemaDto,
        ttlSeconds: number,
    ): Promise<void>;

    findByCategoryId(
        categoryId: string,
    ): Promise<PublishedCategorySchemaDto | null>;

    delete(
        categoryId: string,
    ): Promise<void>;
}