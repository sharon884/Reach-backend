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

import { ResendOtpUseCase } from "../../application/use-cases/resend-otp.use-case.js";
import { ResendOtpController } from "../../presentation/controllers/auth/resend-otp.controller.js";

import { SignupController } from "../../presentation/controllers/auth/signup.controller.js";

import { NodemailerEmailSender } from "../services/nodemailer-email-sender.js";

import { env } from "../../config/env.js";

import { PrismaUserSessionRepository } from "../repositories/prisma-user-session.repository.js";
import { JwtTokenService } from "../services/jwt-token.service.js";
import { BcryptRefreshTokenHasher } from "../services/bcrypt-refresh-token-hasher.js";

import { LoginUseCase } from "../../application/use-cases/login.use-case.js";
import { LoginController } from "../../presentation/controllers/auth/login.controller.js";


import { AdminLoginUseCase } from "../../application/use-cases/admin-login.use-case.js";
import { AdminLoginController } from "../../presentation/controllers/admin/admin-login.controller.js";

import { AdminAuthMiddleware } from "../../presentation/middlewares/admin-auth.middleware.js";

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

const userSessionRepository = new PrismaUserSessionRepository(prisma);

const tokenService = new JwtTokenService();

const refreshTokenHasher = new BcryptRefreshTokenHasher();


const generateOtpUseCase = new GenerateOtpUseCase(
  userRepository,
  otpRepository,
  otpGenerator,
  otpHasher,
  emailSender,
);

const resendOtpUseCase = new ResendOtpUseCase(
  userRepository,
  generateOtpUseCase,
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

const loginUseCase = new LoginUseCase(
    userRepository,
    passwordHasher,
    tokenService,
    userSessionRepository,
    refreshTokenHasher,
);


const adminLoginUseCase = new AdminLoginUseCase(
    userRepository,
    passwordHasher,
    tokenService,
    userSessionRepository,
    refreshTokenHasher,
);




export const signupController = new SignupController(
  signupUseCase,
);

export const verifyOtpController = new VerifyOtpController(
  verifyOtpUseCase,
);

export const resendOtpController = new ResendOtpController(
  resendOtpUseCase,
);

export const loginController = new LoginController(loginUseCase);


export const adminLoginController = new AdminLoginController(
    adminLoginUseCase,
);

export const adminAuthMiddleware = new AdminAuthMiddleware(
    tokenService,
);