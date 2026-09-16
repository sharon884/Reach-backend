import { StatusCodes } from "http-status-codes";

import type { ConfigureDynamicPropertyDto } from "@/application/catalog/dto/category-configuration/configure-dynamic-properties.dto";
import { AppError } from "@/shared/errors/app.error";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";

export class DynamicPropertyConfigurationValidator {
    validate(properties: ConfigureDynamicPropertyDto[]): void {
        this._validatePropertyUniqueness(properties);

        for (const property of properties) {
            this._validateProperty(property);
        }
    }

    private _validateProperty(
        property: ConfigureDynamicPropertyDto,
    ): void {
        const isSelectType =
            property.dataType === "SELECT" ||
            property.dataType === "MULTI_SELECT";

        if (isSelectType) {
            this._validateSelectOptions(property);
            return;
        }

        if (property.options && property.options.length > 0) {
            throw new AppError(
                CATALOG_MESSAGES.PROPERTY_OPTIONS_NOT_ALLOWED,
                StatusCodes.BAD_REQUEST,
            );
        }
    }

    private _validateSelectOptions(
        property: ConfigureDynamicPropertyDto,
    ): void {
        if (!property.options || property.options.length === 0) {
            const message =
                property.dataType === "SELECT"
                    ? CATALOG_MESSAGES.SELECT_PROPERTY_OPTIONS_REQUIRED
                    : CATALOG_MESSAGES.MULTI_SELECT_PROPERTY_OPTIONS_REQUIRED;

            throw new AppError(
                message,
                StatusCodes.BAD_REQUEST,
            );
        }

        const optionValues = new Set<string>();

        for (const option of property.options) {
            if (optionValues.has(option.value)) {
                throw new AppError(
                    CATALOG_MESSAGES.DUPLICATE_PROPERTY_OPTION,
                    StatusCodes.BAD_REQUEST,
                );
            }

            optionValues.add(option.value);
        }
    }

    private _validatePropertyUniqueness(
        properties: ConfigureDynamicPropertyDto[],
    ): void {
        const propertyKeys = new Set<string>();

        for (const property of properties) {
            const key =
                property.propertyId ??
                property.slug?.trim().toLowerCase();

            if (!key) {
                continue;
            }

            if (propertyKeys.has(key)) {
                throw new AppError(
                    CATALOG_MESSAGES.DUPLICATE_PROPERTY,
                    StatusCodes.BAD_REQUEST,
                );
            }

            propertyKeys.add(key);
        }
    }
}