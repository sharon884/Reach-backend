import { z } from "zod";

export const resendOtpSchema = z.object({
  userId: z.string().uuid(),
});

export type ResendOtpDto = z.infer<typeof resendOtpSchema>;