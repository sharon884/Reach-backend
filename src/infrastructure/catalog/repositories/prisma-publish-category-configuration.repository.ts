import { StatusCodes } from "http-status-codes";

import type { CategoryConfigurationDraftDto } from "@/application/catalog/dto/category-configuration/category-configuration-draft.dto";
import type { IPublishCategoryConfigurationRepository } from "@/domain/catalog/repositories/publish-category-configuration.repository";

import { PublishedCategorySchemaMapper } from "@/application/catalog/mappers/category-configuration/published-category-schema.mapper";
import type { PublishedCategorySchemaDto } from "@/application/catalog/dto/category-configuration/published-category-schema.dto";
import type { PrismaClient } from "@/generated/prisma/client";
import { AppError } from "@/shared/errors/app.error";



export class PrismaPublishCategoryConfigurationRepository
    implements IPublishCategoryConfigurationRepository {
    constructor(
        private readonly _prisma: PrismaClient,
    ) { }

    async publish(
        draft: CategoryConfigurationDraftDto,
    ): Promise<PublishedCategorySchemaDto> {
        return this._prisma.$transaction(async (tx) => {
            const category = await tx.category.create({
                data: {
                    name: draft.category.name,
                    slug: draft.category.name
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-"),
                    description: draft.category.description,
                    parentId: draft.category.parentId,
                },
            });

            if (draft.coreFields.length > 0) {
                await tx.categoryField.createMany({
                    data: draft.coreFields.map((field) => ({
                        categoryId: category.id,
                        fieldKey: field.fieldKey,
                        required: field.required,
                        isEnabled: field.isEnabled,
                        displayOrder: field.displayOrder,
                    })),
                });
            }

            for (const property of draft.properties) {
                let propertyDefinition;
                let isNewProperty = false;

                if (property.propertyId) {
                    propertyDefinition =
                        await tx.propertyDefinition.findUnique({
                            where: {
                                id: property.propertyId,
                            },
                        });

                    if (!propertyDefinition) {
                        throw new AppError(
                            `Property definition not found: ${property.propertyId}`,
                            StatusCodes.NOT_FOUND,
                        );
                    }

                    if (
                        propertyDefinition.dataType !== property.dataType
                    ) {
                        throw new AppError(
                            `Property data type mismatch for: ${propertyDefinition.name}`,
                            StatusCodes.BAD_REQUEST,
                        );
                    }
                } else {
                    if (!property.name || !property.slug) {
                        throw new AppError(
                            "New property must have name and slug",
                            StatusCodes.BAD_REQUEST,
                        );
                    }

                    propertyDefinition =
                        await tx.propertyDefinition.create({
                            data: {
                                name: property.name,
                                slug: property.slug,
                                description: property.description,
                                dataType: property.dataType,
                                validationConfig:
                                    property.validationConfig ?? undefined,
                            },
                        });

                    isNewProperty = true;
                }

                await tx.categoryProperty.create({
                    data: {
                        categoryId: category.id,
                        propertyId: propertyDefinition.id,
                        required: property.required,
                        filterable: property.filterable,
                        sortable: property.sortable,
                        displayOrder: property.displayOrder,
                    },
                });

                if (
                    isNewProperty &&
                    (property.dataType === "SELECT" ||
                        property.dataType === "MULTI_SELECT") &&
                    property.options &&
                    property.options.length > 0
                ) {
                    await tx.propertyOption.createMany({
                        data: property.options.map((option) => ({
                            propertyId: propertyDefinition.id,
                            label: option.label,
                            value: option.value,
                            displayOrder: option.displayOrder,
                        })),
                    });
                }
            }

            const publishedCategory = await tx.category.findUniqueOrThrow({
                where: {
                    id: category.id,
                },
                include: {
                    fields: true,
                    properties: {
                        include: {
                            property: {
                                include: {
                                    options: true,
                                },
                            },
                        },
                    },
                },
            });

            return PublishedCategorySchemaMapper.toDto(publishedCategory);
        });
    }
}