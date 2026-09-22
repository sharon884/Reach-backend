import type { CoreFieldKey } from "@/domain/catalog/entities/category-field.entity";

export interface ConfigureCoreFieldsDto {
    coreFields: ConfigureCoreFieldDto[];
}

export interface ConfigureCoreFieldDto {
    fieldKey: CoreFieldKey;
    required: boolean;
    isEnabled: boolean;
    displayOrder: number;
}