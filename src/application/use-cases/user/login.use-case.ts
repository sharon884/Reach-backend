import type { ILoginUseCase } from "@/application/abstractions/use-cases/login.use-case";

import type { IUserRepository } from "@/domain/repositories/user.repository";

import type { LoginDto } from "@/application/dto/auth/login.dto";

import type { IPasswordHasher } from "@/application/services/password-hasher";

import type { IAuthenticationSessionService } from "@/application/services/authentication-session.service";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";

import { LoginResult } from "@/application/dto/auth/login-result.dto";

export class LoginUseCase implements ILoginUseCase {

    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _passwordHasher: IPasswordHasher,
        private readonly _authenticationSessionService: IAuthenticationSessionService,
    ) { }

    async execute(data: LoginDto): Promise<LoginResult> {

        const user = await this._userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError(
                AUTH_MESSAGES.INVALID_CREDENTIALS,
                StatusCodes.UNAUTHORIZED,
            );
        }

        if (!user.passwordHash) {
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

        const session =
            await this._authenticationSessionService.createSession(user);

        return {
            user,
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
        };
    }
}