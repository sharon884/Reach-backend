import type { PropertyDataType } from "@/domain/catalog/entities/property-definition.entity";

import type { JsonValue } from "@/shared/types/json-value";

export interface ConfigureDynamicPropertiesDto {
    properties: ConfigureDynamicPropertyDto[];
}

export interface ConfigureDynamicPropertyDto {
    propertyId?: string;
    name?: string;
    slug?: string;
    description?: string | null;
    dataType: PropertyDataType;
    validationConfig?: Record<string, JsonValue> | null;
    required: boolean;
    filterable: boolean;
    sortable: boolean;
    displayOrder: number;
    options?: ConfigureDynamicPropertyOptionDto[];
}

export interface ConfigureDynamicPropertyOptionDto {
    label: string;
    value: string;
    displayOrder: number;
}