import { z } from "zod";

export const updateCategoryDraftParamsSchema = z.object({
    draftId: z.string().uuid(),
});

export const updateCategoryDraftBodySchema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().nullable(),
    parentId: z.string().uuid().nullable(),
});