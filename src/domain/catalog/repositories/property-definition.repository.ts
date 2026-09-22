import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { PropertyDefinition } from "@/domain/catalog/entities/property-definition.entity";

export interface IPropertyDefinitionRepository
    extends BaseRepository<PropertyDefinition> {

    findBySlug(
        slug: string,
    ): Promise<PropertyDefinition | null>;

    findAllActive(): Promise<PropertyDefinition[]>;

    updateStatus(
        id: string,
        status: "ACTIVE" | "INACTIVE",
    ): Promise<PropertyDefinition>;
}