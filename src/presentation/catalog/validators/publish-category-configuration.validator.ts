import { z } from "zod";

export const publishCategoryConfigurationParamsSchema = z.object({
    draftId: z.string().uuid(),
});