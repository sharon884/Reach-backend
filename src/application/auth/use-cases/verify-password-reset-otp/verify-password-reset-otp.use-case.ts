import type { IVerifyPasswordResetOtpUseCase } from "@/application/auth/use-cases/verify-password-reset-otp/verify-password-reset-otp.use-case.interface";

import type { VerifyPasswordResetOtpDto } from "@/application/auth/dto/otp/verify-password-reset-otp.dto";

import type { IUserRepository } from "@/domain/auth/repositories/user.repository";

import type { IVerifyOtpUseCase } from "@/application/auth/use-cases/verify-otp/verify-otp.use-case.interface";

import type { IPasswordResetStore } from "@/application/auth/services/password/password-reset-store";

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