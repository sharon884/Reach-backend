import { randomUUID } from "crypto";

import type { IGoogleAuthenticationUseCase } from "@/application/abstractions/use-cases/google-authentication.use-case";

import type { GoogleAuthenticationDto } from "@/application/dto/auth/google-authentication.dto";
import type { LoginResult } from "@/application/dto/auth/login-result.dto";

import type { IUserRepository } from "@/domain/repositories/user.repository";
import type { IUserAuthAccountRepository } from "@/domain/repositories/user-auth-account.repository";

import type { IGoogleAuthService } from "@/application/services/google-auth";
import type { IAuthenticationSessionService } from "@/application/services/authentication-session.service";

import { AppError } from "@/shared/errors/app.error";
import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { StatusCodes } from "http-status-codes";

export class GoogleAuthenticationUseCase
    implements IGoogleAuthenticationUseCase {

    constructor(
        private readonly _googleAuthService: IGoogleAuthService,
        private readonly _userRepository: IUserRepository,
        private readonly _userAuthAccountRepository: IUserAuthAccountRepository,
        private readonly _authenticationSessionService: IAuthenticationSessionService,
    ) {}

    async execute(
        data: GoogleAuthenticationDto,
    ): Promise<LoginResult> {

     
        const googleUser =
            await this._googleAuthService.verifyIdToken(
                data.credential,
            );


        if (!googleUser.emailVerified) {
            throw new AppError(
                AUTH_MESSAGES.INVALID_GOOGLE_TOKEN,
                StatusCodes.UNAUTHORIZED,
            );
        }

       
        const existingAuthAccount =
            await this._userAuthAccountRepository.findByProviderAccountId(
                "GOOGLE",
                googleUser.providerAccountId,
            );

        if (existingAuthAccount) {

            const user = await this._userRepository.findById(
                existingAuthAccount.userId,
            );

            if (!user) {
                throw new AppError(
                    AUTH_MESSAGES.INVALID_GOOGLE_TOKEN,
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
                await this._authenticationSessionService.createSession(
                    user,
                );

            return {
                user,
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
            };
        }

      
        const existingUser =
            await this._userRepository.findByEmail(
                googleUser.email,
            );

        if (existingUser) {

            if (existingUser.status !== "ACTIVE") {
                throw new AppError(
                    AUTH_MESSAGES.ACCOUNT_NOT_ACTIVE,
                    StatusCodes.FORBIDDEN,
                );
            }

         
            await this._userAuthAccountRepository.create({
                id: randomUUID(),
                userId: existingUser.id,
                provider: "GOOGLE",
                providerAccountId: googleUser.providerAccountId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            if (!existingUser.isEmailVerified) {
                await this._userRepository.updateEmailVerification(
                    existingUser.id,
                    true,
                );

                existingUser.isEmailVerified = true;
            }

            const session =
                await this._authenticationSessionService.createSession(
                    existingUser,
                );

            return {
                user: existingUser,
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
            };
        }

     
        const newUser = await this._userRepository.create({
            id: randomUUID(),
            fullName: googleUser.fullName,
            email: googleUser.email,
            passwordHash: null,
            role: "USER",
            status: "ACTIVE",
            isEmailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // 5. Create the Google identity mapping
        await this._userAuthAccountRepository.create({
            id: randomUUID(),
            userId: newUser.id,
            provider: "GOOGLE",
            providerAccountId: googleUser.providerAccountId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

       
        const session =
            await this._authenticationSessionService.createSession(
                newUser,
            );

        return {
            user: newUser,
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
        };
    }
}