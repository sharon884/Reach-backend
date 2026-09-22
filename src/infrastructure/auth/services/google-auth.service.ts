import { OAuth2Client } from "google-auth-library";

import type { IGoogleAuthService } from "@/application/auth/services/google/google-auth";
import { env } from "@/config/env";
import { AppError } from "@/shared/errors/app.error";
import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { StatusCodes } from "http-status-codes";

export class GoogleAuthService implements IGoogleAuthService {
    private readonly _client: OAuth2Client;

    constructor() {
        this._client = new OAuth2Client(env.GOOGLE_CLIENT_ID);
    }

    async verifyIdToken(
        idToken: string,
    ): Promise<{
        providerAccountId: string;
        email: string;
        fullName: string;
        emailVerified: boolean;
    }> {
        try {
            const ticket = await this._client.verifyIdToken({
                idToken,
                audience: env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();

            if (!payload) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_GOOGLE_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            if (!payload.sub || !payload.email) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_GOOGLE_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            return {
                providerAccountId: payload.sub,
                email: payload.email,
                fullName: payload.name ?? "",
                emailVerified: payload.email_verified === true,
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                AUTH_MESSAGES.INVALID_GOOGLE_TOKEN,
                StatusCodes.UNAUTHORIZED,
            );
        }
    }
}