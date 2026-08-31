import { z } from "zod";

export const signupSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name must not exceed 100 characters"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password must not exceed 72 characters"),
});

export type SignupDto = z.infer<typeof signupSchema>;