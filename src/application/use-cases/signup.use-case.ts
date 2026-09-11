import { randomUUID } from "node:crypto";

import type { ISignupUseCase } from "@/application/abstractions/use-cases/signup.use-case";
import { SignupDto } from "@/application/dto/auth/signup.dto";
import { User } from "@/domain/entities/user.entity";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { IPasswordHasher } from "@/application/services/password-hasher";
import { IGenerateOtpUseCase } from "../abstractions/use-cases/generate-otp.use-case.js";
import { mapSignupToUserData } from "@/application/mappers/auth/signup.mapper";
import { AUTH_MESSAGES } from "@/shared/constants/messages/auth.messages";
import { ConflictError } from "@/shared/errors/conflict.error";


export class SignupUseCase implements ISignupUseCase {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _passwordHasher: IPasswordHasher,
        private readonly _generateOtpUseCase: IGenerateOtpUseCase,
    ) {}

    async execute(data: SignupDto): Promise<User> {



        const existingUser = await this._userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictError(
                AUTH_MESSAGES.EMAIL_ALREADY_REGISTERED,
            );
        }



        const passwordHash = await this._passwordHasher.hash(data.password);

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

        const createdUser = await this._userRepository.create(user);




        await this._generateOtpUseCase.execute(
            createdUser.id,
            "EMAIL_VERIFICATION",
        );



        return createdUser;
    }
}


