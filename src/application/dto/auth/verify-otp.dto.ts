import { z } from "zod";

export const verifyOtpSchema = z.object({
  userId: z.string().uuid(),
  otp: z.string().length(6).regex(/^\d+$/),
});

export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;