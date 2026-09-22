export interface UserSession {

    id: string;

    userId: string;

    refreshTokenHash: string;

    expiresAt: Date;

    revokedAt: Date | null;

    createdAt: Date;

    updatedAt: Date;
}