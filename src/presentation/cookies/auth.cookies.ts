export const AUTH_COOKIES = {
    accessToken: {
        name: "accessToken",
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            maxAge: 15 * 60 * 1000, // 15 minutes
        },
    },

    refreshToken: {
        name: "refreshToken",
        options: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax" as const,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
    },
};