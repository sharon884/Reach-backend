import { BaseRepository } from "@/domain/shared/repositories/base.repository";
import { PropertyDefinition } from "../entities/property-definition.entity.js";


export interface IPropertyDefinitionRepository extends BaseRepository<PropertyDefinition | null> {

    findBySlug(slug: string): Promise<PropertyDefinition | null>;

    findByName(name: string): Promise<PropertyDefinition | null>;

    findAllActive(): Promise<PropertyDefinition[]>;

    updateStatus(
        id: string,

        status: "ACTIVE" | "INACTIVE",

    ): Promise<PropertyDefinition>;
}