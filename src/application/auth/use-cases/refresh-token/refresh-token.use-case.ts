import { IUserSessionRepository } from "@/domain/auth/repositories/user-session.repository";
import { IUserRepository } from "@/domain/auth/repositories/user.repository";
import { IRefreshTokenHasher } from "../../services/token/refresh-token-hasher.js";
import { ITokenService } from "../../services/token/token-service.js";
import {
    IRefreshTokenUseCase,
    RefreshTokenResult,
} from "./refresh-token.use-case.interface.js";
import { AppError } from "@/shared/errors/app.error";
import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { StatusCodes } from "http-status-codes";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    constructor(
        private readonly _tokenService: ITokenService,
        private readonly _refreshTokenHasher: IRefreshTokenHasher,
        private readonly _userSessionRepository: IUserSessionRepository,
        private readonly _userRepository: IUserRepository,
    ) { }

    async execute(refreshToken: string): Promise<RefreshTokenResult> {
        try {
            const payload =
                this._tokenService.verifyRefreshToken(refreshToken);

            const session =
                await this._userSessionRepository.findById(
                    payload.sessionId,
                );

            if (!session) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            if (session.revokedAt !== null) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            if (session.expiresAt <= new Date()) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            const isValidRefreshToken =
                await this._refreshTokenHasher.compare(
                    refreshToken,
                    session.refreshTokenHash,
                );

            if (!isValidRefreshToken) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            const user =
                await this._userRepository.findById(payload.userId);

            if (!user || user.status !== "ACTIVE") {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
                    StatusCodes.UNAUTHORIZED,
                );
            }

            const newRefreshToken =
                this._tokenService.generateRefreshToken({
                    userId: user.id,
                    sessionId: session.id,
                });

            const newRefreshTokenHash =
                await this._refreshTokenHasher.hash(
                    newRefreshToken,
                );

            const newExpiresAt =
                new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000,
                );

            await this._userSessionRepository.updateRefreshToken(
                session.id,
                newRefreshTokenHash,
                newExpiresAt,
            );

            const newAccessToken =
                this._tokenService.generateAccessToken({
                    userId: user.id,
                    role: user.role,
                });

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                AUTH_MESSAGES.INVALID_REFRESH_TOKEN,
                StatusCodes.UNAUTHORIZED,
            );
        }
    }
}