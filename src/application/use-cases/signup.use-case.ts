import { randomUUID } from "node:crypto";

import { SignupDto } from "../dto/auth/signup.dto.js";
import { User } from "../../domain/entities/user.entity.js";
import { UserRepository } from "../../domain/repositories/user.repository.js";
import { PasswordHasher } from "../services/password-hasher.js";
import { AUTH_MESSAGES } from "../../shared/constants/messages/auth.messages.js";
import { ConflictError } from "../../shared/errors/conflict.error.js";

export class SignupUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
    ) { }

    async execute(data: SignupDto): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(data.email);

        if (existingUser) {
            throw new ConflictError(
                AUTH_MESSAGES.EMAIL_ALREADY_REGISTERED,
            );
        }

        const passwordHash = await this.passwordHasher.hash(data.password);

        const now = new Date();

        const user: User = {
            id: randomUUID(),
            fullName: data.fullName,
            email: data.email,
            passwordHash,
            role: "USER",
            status: "ACTIVE",
            isEmailVerified: false,
            createdAt: now,
            updatedAt: now,
        };

        return this.userRepository.create(user);
    }
}