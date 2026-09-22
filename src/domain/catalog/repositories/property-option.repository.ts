import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { PropertyOption } from "@/domain/catalog/entities/property-option.entity";

export interface IPropertyOptionRepository
    extends BaseRepository<PropertyOption> {

    findByPropertyId(
        propertyId: string,
    ): Promise<PropertyOption[]>;

    findByPropertyAndValue(
        propertyId: string,
        value: string,
    ): Promise<PropertyOption | null>;

    updateDisplayOrder(
        id: string,
        displayOrder: number,
    ): Promise<void>;

    updateStatus(
        id: string,
        isActive: boolean,
    ): Promise<void>;
}