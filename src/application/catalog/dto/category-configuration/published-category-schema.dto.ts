import type { CoreFieldKey } from "@/domain/catalog/entities/category-field.entity";
import type { PropertyDataType } from "@/domain/catalog/entities/property-definition.entity";
import type { JsonValue } from "@/shared/types/json-value";

export interface PublishedCategorySchemaDto {
    categoryId: string;
    name: string;
    description: string | null;
    coreFields: PublishedCoreFieldDto[];
    properties: PublishedPropertyDto[];
}

export interface PublishedCoreFieldDto {
    fieldKey: CoreFieldKey;
    required: boolean;
    isEnabled: boolean;
    displayOrder: number;
}

export interface PublishedPropertyDto {
    propertyId: string;
    name: string;
    slug: string;
    description: string | null;
    dataType: PropertyDataType;
    validationConfig: Record<string, JsonValue> | null;
    required: boolean;
    filterable: boolean;
    sortable: boolean;
    displayOrder: number;
    options: PublishedPropertyOptionDto[];
}

export interface PublishedPropertyOptionDto {
    optionId: string;
    label: string;
    value: string;
    displayOrder: number;
    isActive: boolean;
}