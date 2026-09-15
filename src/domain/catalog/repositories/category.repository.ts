import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { Category } from "../entities/category.entity.js";

export interface ICategoryRepository
    extends BaseRepository<Category> {

    findBySlug(
        slug: string,
    ): Promise<Category | null>;

    findByParentId(
        parentId: string | null,
    ): Promise<Category[]>;

    findByNameAndParent(
        name: string,
        parentId: string | null,
    ): Promise<Category | null>;

    updateStatus(
        id: string,
        status: "ACTIVE" | "INACTIVE",
    ): Promise<Category>;

    updateDisplayOrder(
        id: string,
        displayOrder: number,
    ): Promise<void>;
}