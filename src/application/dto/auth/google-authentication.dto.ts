import { z } from "zod";

export const googleAuthenticationSchema = z.object({
    credential: z.string().min(1, "Google credential is required"),
});

export type GoogleAuthenticationDto = z.infer<
    typeof googleAuthenticationSchema
>;