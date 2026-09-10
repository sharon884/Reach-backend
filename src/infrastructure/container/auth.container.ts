import { PrismaClient } from "@/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user.repository";

import { PrismaOtpVerificationRepository } from "@/infrastructure/repositories/prisma-otp-verification.repository";

import { BcryptPasswordHasher } from "@/infrastructure/services/bcrypt-password-hasher";

import { RandomOtpGenerator } from "@/infrastructure/services/random-otp-generator";

import { BcryptOtpHasher } from "@/infrastructure/services/bcrypt-otp-hasher";

import { SignupUseCase } from "@/application/use-cases/signup.use-case";

import { GenerateOtpUseCase } from "@/application/use-cases/generate-otp.use-case";

import { VerifyOtpUseCase } from "@/application/use-cases/verify-otp.use-case";

import { VerifyOtpController } from "@/presentation/controllers/auth/verify-otp.controller";

import { ResendOtpUseCase } from "@/application/use-cases/resend-otp.use-case";

import { ResendOtpController } from "@/presentation/controllers/auth/resend-otp.controller";

import { SignupController } from "@/presentation/controllers/auth/signup.controller";

import { NodemailerEmailSender } from "@/infrastructure/services/nodemailer-email-sender";

import { env } from "@/config/env";

import { PrismaUserSessionRepository } from "@/infrastructure/repositories/prisma-user-session.repository";

import { JwtTokenService } from "@/infrastructure/services/jwt-token.service";

import { BcryptRefreshTokenHasher } from "@/infrastructure/services/bcrypt-refresh-token-hasher";

import { LoginUseCase } from "@/application/use-cases/login.use-case";

import { LoginController } from "@/presentation/controllers/auth/login.controller";

import { AdminLoginUseCase } from "@/application/use-cases/admin-login.use-case";

import { AdminLoginController } from "@/presentation/controllers/admin/admin-login.controller";

import { AdminAuthMiddleware } from "@/presentation/middlewares/admin-auth.middleware";

import { GetUsersController } from "@/presentation/controllers/admin/get-users.controller";

import { GetUsersUseCase } from "@/application/use-cases/admin/get-users.use-case";

import { UpdateUserStatusUseCase } from "@/application/use-cases/admin/update-user-status.use-case";

import { UpdateUserStatusController } from "@/presentation/controllers/admin/update-user-status.controller";

import { AdminLogoutUseCase } from "@/application/use-cases/admin/admin-logout.use-case";

import { AdminLogoutController } from "@/presentation/controllers/admin/admin-logout.controller";

import { LogoutUseCase } from "@/application/use-cases/logout.use-case";

import { LogoutController } from "@/presentation/controllers/auth/logout.controller";


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

const logoutUseCase = new LogoutUseCase(userSessionRepository);


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

export const getUsersUseCase = new GetUsersUseCase(
    userRepository,
);


export const getUsersController = new GetUsersController(
    getUsersUseCase,
);

export const updateUserStatusUseCase = new UpdateUserStatusUseCase(
    userRepository,
);


export const updateUserStatusController = new UpdateUserStatusController(
        updateUserStatusUseCase,
);

export const adminLogoutUseCase = new AdminLogoutUseCase(
    userSessionRepository,
);

export const adminLogoutController = new AdminLogoutController(
    adminLogoutUseCase,
    tokenService,
);


export const logoutController = new LogoutController(
    logoutUseCase,
    tokenService,
);