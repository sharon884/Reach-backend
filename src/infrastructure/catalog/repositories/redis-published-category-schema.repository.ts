import type { PublishedCategorySchemaDto } from "@/application/catalog/dto/category-configuration/published-category-schema.dto";
import type { IPublishedCategorySchemaCacheRepository } from "@/domain/catalog/repositories/published-category-schema-cache.repository";

import { redisClient } from "@/infrastructure/shared/redis/redis.client";

export class RedisPublishedCategorySchemaRepository
    implements IPublishedCategorySchemaCacheRepository
{
    private readonly _keyPrefix = "catalog:category-schema:";

    async save(
        schema: PublishedCategorySchemaDto,
        ttlSeconds: number,
    ): Promise<void> {
        const key = `${this._keyPrefix}${schema.categoryId}`;

        await redisClient.set(
            key,
            JSON.stringify(schema),
            {
                EX: ttlSeconds,
            },
        );
    }

    async findByCategoryId(
        categoryId: string,
    ): Promise<PublishedCategorySchemaDto | null> {
        const key = `${this._keyPrefix}${categoryId}`;

        const cachedSchema = await redisClient.get(key);

        if (!cachedSchema) {
            return null;
        }

        return JSON.parse(cachedSchema) as PublishedCategorySchemaDto;
    }

    async delete(
        categoryId: string,
    ): Promise<void> {
        const key = `${this._keyPrefix}${categoryId}`;

        await redisClient.del(key);
    }
}