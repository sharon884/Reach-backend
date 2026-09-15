import type { User } from "@/domain/auth/entities/user.entity";

import type { IUserSessionRepository } from "@/domain/auth/repositories/user-session.repository";

import type { IRefreshTokenHasher } from "@/application/auth/services/token/refresh-token-hasher";
import type { ITokenService } from "@/application/auth/services/token/token-service";

export interface AuthenticationSessionResult {
    accessToken: string;
    refreshToken: string;
}

export interface IAuthenticationSessionService {
    createSession(user: User): Promise<AuthenticationSessionResult>;
}

export class AuthenticationSessionService
    implements IAuthenticationSessionService {

    constructor(
        private readonly _tokenService: ITokenService,
        private readonly _refreshTokenHasher: IRefreshTokenHasher,
        private readonly _userSessionRepository: IUserSessionRepository,
    ) {}

    async createSession(
        user: User,
    ): Promise<AuthenticationSessionResult> {

        const sessionId = crypto.randomUUID();

        const refreshToken =
            this._tokenService.generateRefreshToken({
                userId: user.id,
                sessionId,
            });

        const refreshTokenHash =
            await this._refreshTokenHasher.hash(refreshToken);

        const expiresAt =
            new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000,
            );

        await this._userSessionRepository.create({
            id: sessionId,
            userId: user.id,
            refreshTokenHash,
            expiresAt,
            revokedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const accessToken =
            this._tokenService.generateAccessToken({
                userId: user.id,
                role: user.role,
            });

        return {
            accessToken,
            refreshToken,
        };
    }
}