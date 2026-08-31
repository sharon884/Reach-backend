import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaUserRepository } from "../repositories/prisma-user.repository.js";
import { BcryptPasswordHasher } from "../services/bcrypt-password-hasher.js";
import { SignupUseCase } from "../../application/use-cases/signup.use-case.js";
import { SignupController } from "../../presentation/controllers/auth/signup.controller.js";
import { env } from "../../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userRepository = new PrismaUserRepository(prisma);

const passwordHasher = new BcryptPasswordHasher();

const signupUseCase = new SignupUseCase(
  userRepository,
  passwordHasher,
);

export const signupController = new SignupController(
  signupUseCase,
);