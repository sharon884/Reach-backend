import { randomUUID } from "node:crypto";

import { StatusCodes } from "http-status-codes";

import type { IUserRepository } from "@/domain/repositories/user.repository";

import type { UserSessionRepository } from "@/domain/repositories/user-session.repository";

import type { AdminLoginDto } from "@/application/dto/admin/admin-login.dto";

import { LoginResult } from "@/application/dto/auth/login-result.dto";

import type { IPasswordHasher } from "@/application/services/password-hasher";

import type { TokenService } from "@/application/services/token-service";

import type { RefreshTokenHasher } from "@/application/services/refresh-token-hasher";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

export class AdminLoginUseCase {

    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _passwordHasher: IPasswordHasher,
        private readonly tokenService: TokenService,
        private readonly userSessionRepository: UserSessionRepository,
        private readonly refreshTokenHasher: RefreshTokenHasher,
    ) {}

    async execute(data: AdminLoginDto): Promise<LoginResult> {

        const user = await this._userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError(
                AUTH_MESSAGES.INVALID_CREDENTIALS,
                StatusCodes.UNAUTHORIZED,
            );
        }

        const isPasswordValid = await this._passwordHasher.compare(
            data.password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new AppError(
                AUTH_MESSAGES.INVALID_CREDENTIALS,
                StatusCodes.UNAUTHORIZED,
            );
        }

        if (user.status !== "ACTIVE") {
            throw new AppError(
                AUTH_MESSAGES.ACCOUNT_NOT_ACTIVE,
                StatusCodes.FORBIDDEN,
            );
        }

        if (user.role !== "ADMIN") {
            throw new AppError(
                AUTH_MESSAGES.INVALID_CREDENTIALS,
                StatusCodes.UNAUTHORIZED,
            );
        }

        const sessionId = randomUUID();

        const refreshToken = this.tokenService.generateRefreshToken({
            userId: user.id,
            sessionId,
        });

        const refreshTokenHash =
            await this.refreshTokenHasher.hash(refreshToken);

        const expiresAt = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
        );

        await this.userSessionRepository.create({
            id: sessionId,
            userId: user.id,
            refreshTokenHash,
            expiresAt,
            revokedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const accessToken = this.tokenService.generateAccessToken({
            userId: user.id,
            role: user.role,
        });

        return {
            user,
            accessToken,
            refreshToken,
        };
    }
}