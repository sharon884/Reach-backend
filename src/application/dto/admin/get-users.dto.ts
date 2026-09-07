import { z } from "zod";

export const getUsersSchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    search: z.string().trim().optional(),

    sortBy: z
        .enum(["fullName", "email", "role", "status", "createdAt"])
        .default("createdAt"),

    sortOrder: z
        .enum(["asc", "desc"])
        .default("desc"),
});

export type GetUsersDto = z.infer<typeof getUsersSchema>;