import { z } from "zod";

export const loginSchema = z.object({
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


export type LoginDto = z.infer<typeof loginSchema>;