import { z } from "zod";

export const getCategoryConfigurationDraftParamsSchema = z.object({
    draftId: z.string().uuid(),
});