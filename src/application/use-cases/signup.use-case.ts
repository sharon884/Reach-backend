import { randomUUID } from "node:crypto";

import { SignupDto } from "@/application/dto/auth/signup.dto";
import { User } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repositories/user.repository";
import { PasswordHasher } from "@/application/services/password-hasher";
import { GenerateOtpUseCase } from "@/application/use-cases/generate-otp.use-case";
import { mapSignupToUserData } from "@/application/mappers/auth/signup.mapper";
import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { ConflictError } from "@/shared/errors/conflict.error";

export class SignupUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly generateOtpUseCase: GenerateOtpUseCase,
    ) { }

    async execute(data: SignupDto): Promise<User> {



        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictError(
                AUTH_MESSAGES.EMAIL_ALREADY_REGISTERED,
            );
        }



        const passwordHash = await this.passwordHasher.hash(data.password);

        const userData = mapSignupToUserData(data, passwordHash);

        const now = new Date();

        const user: User = {
            id: randomUUID(),
            ...userData,
            role: "USER",
            status: "ACTIVE",
            isEmailVerified: false,
            createdAt: now,
            updatedAt: now,
        };

        const createdUser = await this.userRepository.create(user);




        await this.generateOtpUseCase.execute(
            createdUser.id,
            "EMAIL_VERIFICATION",
        );



        return createdUser;
    }
}


