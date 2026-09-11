import type { UserSession } from "@/domain/entities/user-session.entity";

export interface IUserSessionRepository {

    create(session: UserSession): Promise<UserSession>;

    findById(id: string): Promise<UserSession | null>;

    updateRefreshToken(
        id: string,
        refreshTokenHash: string,
        expiresAt: Date,
    ): Promise<UserSession>;

    revoke(id: string, revokedAt: Date): Promise<void>;
}