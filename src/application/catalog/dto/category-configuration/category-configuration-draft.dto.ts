import type { CoreFieldKey } from "@/domain/catalog/entities/category-field.entity";
import type { PropertyDataType } from "@/domain/catalog/entities/property-definition.entity";

type JsonPrimitive = string | number | boolean | null;

type JsonValue =
    | JsonPrimitive
    | JsonValue[]
    | { [key: string]: JsonValue };

export interface CategoryConfigurationDraftDto {
    draftId: string;

    category: {
        name: string;
        description: string | null;
        parentId: string | null;
    };

    coreFields: CategoryConfigurationCoreFieldDto[];

    properties: CategoryConfigurationPropertyDto[];
}

export interface CategoryConfigurationCoreFieldDto {
    fieldKey: CoreFieldKey;
    required: boolean;
    isEnabled: boolean;
    displayOrder: number;
}

export interface CategoryConfigurationPropertyDto {

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

    options?: CategoryConfigurationPropertyOptionDto[];
}

export interface CategoryConfigurationPropertyOptionDto {
    label: string;
    value: string;
    displayOrder: number;
}