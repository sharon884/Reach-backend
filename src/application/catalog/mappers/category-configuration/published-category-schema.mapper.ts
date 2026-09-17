import type { PublishedCategorySchemaDto } from "@/application/catalog/dto/category-configuration/published-category-schema.dto";

import type { PublishedCategory } from "@/infrastructure/catalog/types/published-category.type";

import type { JsonValue } from "@/shared/types/json-value";

export class PublishedCategorySchemaMapper {
    static toDto(
        category: PublishedCategory,
    ): PublishedCategorySchemaDto {
        return {
            categoryId: category.id,
            name: category.name,
            description: category.description,

            coreFields: category.fields.map((field) => ({
                fieldKey: field.fieldKey,
                required: field.required,
                isEnabled: field.isEnabled,
                displayOrder: field.displayOrder,
            })),

            properties: category.properties.map((categoryProperty) => ({
                propertyId: categoryProperty.property.id,
                name: categoryProperty.property.name,
                slug: categoryProperty.property.slug,
                description: categoryProperty.property.description,
                dataType: categoryProperty.property.dataType,
                validationConfig:
                    categoryProperty.property.validationConfig as Record<
                        string,
                        JsonValue
                    > | null,
                required: categoryProperty.required,
                filterable: categoryProperty.filterable,
                sortable: categoryProperty.sortable,
                displayOrder: categoryProperty.displayOrder,

                options: categoryProperty.property.options.map(
                    (option) => ({
                        optionId: option.id,
                        label: option.label,
                        value: option.value,
                        displayOrder: option.displayOrder,
                        isActive: option.isActive,
                    }),
                ),
            })),
        };
    }
}