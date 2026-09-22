import { IResetPasswordUseCase } from "@/application/auth/use-cases/reset-password/reset-password.use-case.interface";

import { ResetPasswordDto } from "@/application/auth/dto/password/reset-password.dto";

import { IPasswordHasher } from "@/application/auth/services/password/password-hasher";

import { IPasswordResetStore } from "@/application/auth/services/password/password-reset-store";

import { IUserSessionRepository } from "@/domain/auth/repositories/user-session.repository";

import { IUserRepository } from "@/domain/auth/repositories/user.repository";

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


     const passwordHash = await this._passwordHasher.hash(
    data.newPassword,
);


 await this._userRepository.updatePassword(
     userId,
     passwordHash
 );


 await this._userSessionRepository.revokeAllByUserId(
     userId,
     new Date(),
 );


}

}