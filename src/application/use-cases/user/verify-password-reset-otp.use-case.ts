import type { IVerifyPasswordResetOtpUseCase } from "@/application/abstractions/use-cases/verify-password-reset-otp.use-case";

import type { VerifyPasswordResetOtpDto } from "@/application/dto/auth/verify-password-reset-otp.dto";

import type { IUserRepository } from "@/domain/repositories/user.repository";

import type { IVerifyOtpUseCase } from "@/application/abstractions/use-cases/verify-otp.use-case";

import type { IPasswordResetStore } from "@/application/services/password-reset-store";

import { AppError } from "@/shared/errors/app.error";

import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";

import { StatusCodes } from "http-status-codes";


export class VerifyPasswordResetOtpUseCase implements IVerifyPasswordResetOtpUseCase {
       
     constructor (
         
         private readonly _userRepository : IUserRepository,
         private readonly _verifyOtpUseCase : IVerifyOtpUseCase,
         private readonly _passwordResetStore : IPasswordResetStore,
     ) {}


     async execute(data: VerifyPasswordResetOtpDto): Promise<string> {
           
            const user = await this._userRepository.findByEmail(
                 data.email,
            );


            if ( !user ) {
                 throw new AppError(
                     AUTH_MESSAGES.OTP_INVALID,
                     StatusCodes.BAD_REQUEST
                 );
            }



            await this._verifyOtpUseCase.execute(
                 user.id,
                 data.otp,
                 "PASSWORD_RESET"
            );


            return this._passwordResetStore.create(
                user.id,
                10 * 60,
            );
     }
};