import { IResetPasswordUseCase } from "@/application/abstractions/use-cases/reset-password.use-case";

import { ResetPasswordDto } from "@/application/dto/auth/reset-password.dto";

import { IPasswordHasher } from "@/application/services/password-hasher";

import { IPasswordResetStore } from "@/application/services/password-reset-store";

import { IUserSessionRepository } from "@/domain/repositories/user-session.repository";

import { IUserRepository } from "@/domain/repositories/user.repository";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { AppError } from "@/shared/errors/app.error";

import { StatusCodes } from "http-status-codes";




export class ResetPasswordUseCase implements  IResetPasswordUseCase {

      constructor (
          
         private readonly _passwordResetStore : IPasswordResetStore,
         private readonly _passwordHasher : IPasswordHasher,
         private readonly _userRepository : IUserRepository,
         private readonly _userSessionRepository : IUserSessionRepository,
      ) {}


    async execute(data: ResetPasswordDto): Promise<void> {

    const userId = await this._passwordResetStore.consume(
        data.resetToken,
    );

     if ( !userId ) {
         throw new AppError(
            AUTH_MESSAGES.OTP_INVALID,
            StatusCodes.BAD_REQUEST
         );
     }



}

}