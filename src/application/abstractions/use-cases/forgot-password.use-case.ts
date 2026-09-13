import type { ForgotPasswordDto } from "@/application/dto/auth/forgot-password.dto";

export interface IForgotPasswordUseCase {
      execute ( data : ForgotPasswordDto ) : Promise <void>;
};


