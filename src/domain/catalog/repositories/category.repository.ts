import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { Category, CategoryStatus } from "@/domain/catalog/entities/category.entity";

export interface ICategoryRepository
    extends BaseRepository<Category> {

    findAll(): Promise<Category[]>;

    findAllActive(): Promise<Category[]>;

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
        status: CategoryStatus,
    ): Promise<Category>;

    updateDisplayOrder(
        id: string,
        displayOrder: number,
    ): Promise<void>;
}