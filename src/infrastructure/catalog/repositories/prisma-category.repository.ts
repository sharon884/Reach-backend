import { prisma } from "@/infrastructure/shared/database/prisma.client";

import type { Category } from "@/domain/catalog/entities/category.entity";
import type { ICategoryRepository } from "@/domain/catalog/repositories/category.repository";

export class PrismaCategoryRepository
    implements ICategoryRepository {
    async create(entity: Category): Promise<Category> {
        const category = await prisma.category.create({
            data: {
                id: entity.id,
                name: entity.name,
                slug: entity.slug,
                description: entity.description,
                parentId: entity.parentId,
                status: entity.status,
                displayOrder: entity.displayOrder,
            },
        });

        return category;
    }

    async findById(id: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });

        return category;
    }

    async findAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            orderBy: {
                displayOrder: "asc",
            },
        });

        return categories;
    }

    async findBySlug(
        slug: string,
    ): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                slug,
            },
        });

        return category;
    }

    async findByParentId(
        parentId: string | null,
    ): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            where: {
                parentId,
            },
            orderBy: {
                displayOrder: "asc",
            },
        });

        return categories;
    }

    async findByNameAndParent(
        name: string,
        parentId: string | null,
    ): Promise<Category | null> {
        const category = await prisma.category.findFirst({
            where: {
                name,
                parentId,
            },
        });

        return category;
    }

    async updateStatus(
        id: string,
        status: Category["status"],
    ): Promise<Category> {
        const category = await prisma.category.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });

        return category;
    }

    async updateDisplayOrder(
        id: string,
        displayOrder: number,
    ): Promise<void> {
        await prisma.category.update({
            where: {
                id,
            },
            data: {
                displayOrder,
            },
        });
    }


    async findAllActive(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
        where: {
            status: "ACTIVE",
        },
        orderBy: {
            displayOrder: "asc",
        },
    });

    return categories;
}
}