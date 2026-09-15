import type { SignupDto } from "@/application/dto/auth/signup.dto";
import type { User } from "@/domain/auth/entities/user.entity";

export interface ISignupUseCase {
    execute(data: SignupDto): Promise<User>;
}