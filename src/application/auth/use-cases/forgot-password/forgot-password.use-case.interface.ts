import type { ForgotPasswordDto } from "@/application/auth/dto/password/forgot-password.dto";

export interface IForgotPasswordUseCase {
      execute ( data : ForgotPasswordDto ) : Promise <void>;
};


