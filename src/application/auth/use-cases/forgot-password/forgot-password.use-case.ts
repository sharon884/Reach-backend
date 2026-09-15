import type { IForgotPasswordUseCase } from "@/application/auth/use-cases/forgot-password/forgot-password.use-case.interface";

import type { ForgotPasswordDto } from "@/application/auth/dto/password/forgot-password.dto";

import type { IUserRepository } from "@/domain/auth/repositories/user.repository";

import type { IGenerateOtpUseCase } from "@/application/auth/use-cases/generate-otp/generate-otp.use-case.interface";


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
        