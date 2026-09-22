import type { Prisma } from "@/generated/prisma/client";

export type PublishedCategory = Prisma.CategoryGetPayload<{
    include: {
        fields: true;
        properties: {
            include: {
                property: {
                    include: {
                        options: true;
                    };
                };
            };
        };
    };
}>;