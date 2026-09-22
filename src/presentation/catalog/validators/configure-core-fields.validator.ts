import { z } from "zod";

export const configureCoreFieldsParamsSchema = z.object({
    draftId: z.string().uuid(),
});

export const configureCoreFieldsBodySchema = z.object({
    coreFields: z.array(
        z.object({
            fieldKey: z.enum([
                "TITLE",
                "DESCRIPTION",
                "IMAGES",
                "LOCATION",
                "QUANTITY",
                "EXPIRY",
            ]),
            required: z.boolean(),
            isEnabled: z.boolean(),
            displayOrder: z.number().int().nonnegative(),
        }),
    ),
});