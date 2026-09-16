import type { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";
import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";

import { redisClient } from "@/infrastructure/shared/redis/redis.client";

export class RedisCategoryConfigurationDraftRepository
    implements ICategoryConfigurationDraftRepository
{
    private readonly _keyPrefix = "catalog:category-config:draft";

    async save(
        draft: CategoryConfigurationDraftDto,
        ttlSeconds: number,
    ): Promise<void> {
        const key = this._buildKey(draft.draftId);

        await redisClient.set(
            key,
            JSON.stringify(draft),
            {
                EX: ttlSeconds,
            },
        );
    }

    async findById(
        draftId: string,
    ): Promise<CategoryConfigurationDraftDto | null> {
        const key = this._buildKey(draftId);

        const data = await redisClient.get(key);

        if (!data) {
            return null;
        }

        return JSON.parse(data) as CategoryConfigurationDraftDto;
    }

    async delete(
        draftId: string,
    ): Promise<void> {
        const key = this._buildKey(draftId);

        await redisClient.del(key);
    }

    private _buildKey(draftId: string): string {
        return `${this._keyPrefix}:${draftId}`;
    }
}