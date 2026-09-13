import type { IForgotPasswordUseCase } from "../abstractions/use-cases/forgot-password.use-case.js";

import type { ForgotPasswordDto } from "../dto/auth/forgot-password.dto.js";

import type { IUserRepository } from "@/domain/repositories/user.repository";

import type { IGenerateOtpUseCase } from "../abstractions/use-cases/generate-otp.use-case.js";


export class ForgotPasswordUseCase implements IForgotPasswordUseCase {

     constructor ( 
         private readonly _userRepository : IUserRepository ,
         private readonly _generateOtpUseCase : IGenerateOtpUseCase,

     ) {}



      async execute(data: ForgotPasswordDto): Promise<void> {
           const user = await this._userRepository.findByEmail(
                data.email,
           );


           if ( !user ){
               return;
           };


            await this._generateOtpUseCase.execute(
                user.id,
                "PASSWORD_RESET"
            );
      }



    }
        