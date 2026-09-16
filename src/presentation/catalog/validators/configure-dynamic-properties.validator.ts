import { z } from "zod";

export const configureDynamicPropertiesParamsSchema = z.object({
    draftId: z.string().uuid(),
});

export const configureDynamicPropertiesBodySchema = z.object({
    properties: z.array(
        z.object({
            propertyId: z.string().uuid().optional(),

            name: z.string().min(1).optional(),

            slug: z.string().min(1).optional(),

            description: z.string().nullable().optional(),

            dataType: z.enum([
                "TEXT",
                "LONG_TEXT",
                "NUMBER",
                "BOOLEAN",
                "DATE",
                "SELECT",
                "MULTI_SELECT",
            ]),

            validationConfig: z
                .record(z.string(), z.unknown())
                .nullable()
                .optional(),

            required: z.boolean(),

            filterable: z.boolean(),

            sortable: z.boolean(),

            displayOrder: z.number().int().nonnegative(),

            options: z
                .array(
                    z.object({
                        label: z.string().min(1),

                        value: z.string().min(1),

                        displayOrder: z
                            .number()
                            .int()
                            .nonnegative(),
                    }),
                )
                .optional(),
        }),
    ),
});