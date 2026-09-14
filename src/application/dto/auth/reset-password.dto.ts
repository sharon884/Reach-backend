import { z } from "zod";

export const resetPasswordSchema = z.object({
    resetToken: z.string().min(1, "Reset token is required"),
    newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;