import type { UserSession } from "../entities/user-session.entity.js";

export interface UserSessionRepository {

    create(session: UserSession): Promise<UserSession>;

    findById(id: string): Promise<UserSession | null>;

    updateRefreshToken(
        id: string,
        refreshTokenHash: string,
        expiresAt: Date,
    ): Promise<UserSession>;

    revoke(id: string, revokedAt: Date): Promise<void>;
}