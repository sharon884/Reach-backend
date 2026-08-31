import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaUserRepository } from "../repositories/prisma-user.repository.js";
import { PrismaOtpVerificationRepository } from "../repositories/prisma-otp-verification.repository.js";

import { BcryptPasswordHasher } from "../services/bcrypt-password-hasher.js";
import { RandomOtpGenerator } from "../services/random-otp-generator.js";
import { BcryptOtpHasher } from "../services/bcrypt-otp-hasher.js";

import { SignupUseCase } from "../../application/use-cases/signup.use-case.js";
import { GenerateOtpUseCase } from "../../application/use-cases/generate-otp.use-case.js";

import { VerifyOtpUseCase } from "../../application/use-cases/verify-otp.use-case.js";
import { VerifyOtpController } from "../../presentation/controllers/auth/verify-otp.controller.js";

import { SignupController } from "../../presentation/controllers/auth/signup.controller.js";

import { NodemailerEmailSender } from "../services/nodemailer-email-sender.js";

import { env } from "../../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userRepository = new PrismaUserRepository(prisma);

const passwordHasher = new BcryptPasswordHasher();

const otpRepository = new PrismaOtpVerificationRepository(prisma);

const otpGenerator = new RandomOtpGenerator();

const otpHasher = new BcryptOtpHasher();

const emailSender = new NodemailerEmailSender();

const generateOtpUseCase = new GenerateOtpUseCase(
  userRepository,
  otpRepository,
  otpGenerator,
  otpHasher,
  emailSender,
);


const verifyOtpUseCase = new VerifyOtpUseCase(
  userRepository,
  otpRepository,
  otpHasher,
);

const signupUseCase = new SignupUseCase(
  userRepository,
  passwordHasher,
  generateOtpUseCase,
);

export const signupController = new SignupController(
  signupUseCase,
);

export const verifyOtpController = new VerifyOtpController(
  verifyOtpUseCase,
);