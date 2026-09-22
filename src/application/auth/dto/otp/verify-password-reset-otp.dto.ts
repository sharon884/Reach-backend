import { z } from "zod";

export const verifyPasswordResetOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    otp: z
        .string()
        .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type VerifyPasswordResetOtpDto = z.infer<
    typeof verifyPasswordResetOtpSchema
>;