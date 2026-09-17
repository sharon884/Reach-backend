import { prisma } from "@/infrastructure/shared/database/prisma.client";

import { PrismaUserRepository } from "@/infrastructure/auth/repositories/prisma-user.repository";

import { redisClient } from "@/infrastructure/shared/redis/redis.client";

import { BcryptPasswordHasher } from "@/infrastructure/auth/services/bcrypt-password-hasher";

import { RandomOtpGenerator } from "@/infrastructure/auth/services/random-otp-generator";

import { BcryptOtpHasher } from "@/infrastructure/auth/services/bcrypt-otp-hasher";

import { SignupUseCase } from "@/application/auth/use-cases/signup/signup.use-case";

import { GenerateOtpUseCase } from "@/application/auth/use-cases/generate-otp/generate-otp.use-case";

import { VerifyOtpUseCase } from "@/application/auth/use-cases/verify-otp/verify-otp.use-case";

import { RedisOtpStore } from "@/infrastructure/auth/services/redis-otp-store";

import { VerifyOtpController } from "@/presentation/auth/controllers/verify-otp.controller";

import { ResendOtpUseCase } from "@/application/auth/use-cases/resend-otp/resend-otp.use-case";

import { ResendOtpController } from "@/presentation/auth/controllers/resend-otp.controller";

import { SignupController } from "@/presentation/auth/controllers/signup.controller";

import { NodemailerEmailSender } from "@/infrastructure/auth/services/nodemailer-email-sender";

import { env } from "@/config/env";

import { PrismaUserSessionRepository } from "@/infrastructure/auth/repositories/prisma-user-session.repository";

import { JwtTokenService } from "@/infrastructure/auth/services/jwt-token.service";

import { BcryptRefreshTokenHasher } from "@/infrastructure/auth/services/bcrypt-refresh-token-hasher";

import { LoginUseCase } from "@/application/auth/use-cases/login/login.use-case";

import { LoginController } from "@/presentation/auth/controllers/login.controller";

import { AdminLoginUseCase } from "@/application/admin/use-cases/login/admin-login.use-case";

import { AdminLoginController } from "@/presentation/admin/controllers/admin-login.controller";

import { AdminAuthMiddleware } from "@/presentation/admin/middlewares/admin-auth.middleware";

import { GetUsersController } from "@/presentation/admin/controllers/get-users.controller";

import { GetUsersUseCase } from "@/application/admin/use-cases/get-users/get-users.use-case";

import { UpdateUserStatusUseCase } from "@/application/admin/use-cases/update-user-status/update-user-status.use-case";

import { UpdateUserStatusController } from "@/presentation/admin/controllers/update-user-status.controller";

import { AdminLogoutUseCase } from "@/application/admin/use-cases/logout/admin-logout.use-case";

import { AdminLogoutController } from "@/presentation/admin/controllers/admin-logout.controller";

import { LogoutUseCase } from "@/application/auth/use-cases/logout/logout.use-case";

import { LogoutController } from "@/presentation/auth/controllers/logout.controller";

import { ForgotPasswordUseCase, } from "@/application/auth/use-cases/forgot-password/forgot-password.use-case";

import { ForgotPasswordController } from "@/presentation/auth/controllers/forgot-password.controller";

import { RedisPasswordResetStore } from "@/infrastructure/auth/services/redis-password-reset-store";

import { VerifyPasswordResetOtpUseCase } from "@/application/auth/use-cases/verify-password-reset-otp/verify-password-reset-otp.use-case";

import { VerifyPasswordResetOtpController } from "@/presentation/auth/controllers/verify-password-reset-otp.controller";

import { ResetPasswordController } from "@/presentation/auth/controllers/reset-password.controller";

import { ResetPasswordUseCase } from "@/application/auth/use-cases/reset-password/reset-password.use-case";

import { AuthenticationSessionService } from "@/application/auth/services/authentication/authentication-session.service";

import { GoogleAuthService } from "@/infrastructure/auth/services/google-auth.service";

import { PrismaUserAuthAccountRepository } from "@/infrastructure/auth/repositories/prisma-user-auth-account.repository";

import { GoogleAuthenticationUseCase } from "@/application/auth/use-cases/google-authentication/google-authentication.use-case";

import { GoogleAuthenticationController } from "@/presentation/auth/controllers/google-authentication.controller";




const userRepository = new PrismaUserRepository(prisma);

const passwordHasher = new BcryptPasswordHasher();

const otpStore = new RedisOtpStore(redisClient);

const otpGenerator = new RandomOtpGenerator();

const otpHasher = new BcryptOtpHasher();

const emailSender = new NodemailerEmailSender();

const userSessionRepository = new PrismaUserSessionRepository(prisma);

const tokenService = new JwtTokenService();

const refreshTokenHasher = new BcryptRefreshTokenHasher();

const authenticationSessionService = new AuthenticationSessionService(
  tokenService,
  refreshTokenHasher,
  userSessionRepository,
);

const userAuthAccountRepository = new PrismaUserAuthAccountRepository(prisma);

const googleAuthService = new GoogleAuthService();

  


const logoutUseCase = new LogoutUseCase(userSessionRepository);

const passwordResetStore = new RedisPasswordResetStore(
  redisClient,
);



const generateOtpUseCase = new GenerateOtpUseCase(
  userRepository,
  otpStore,
  otpGenerator,
  otpHasher,
  emailSender,
);

const resendOtpUseCase = new ResendOtpUseCase(
  userRepository,
  generateOtpUseCase,
  otpStore,
);

const verifyOtpUseCase = new VerifyOtpUseCase(
  userRepository,
  otpStore,
  otpHasher,
);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  userRepository,
  generateOtpUseCase,
);

const signupUseCase = new SignupUseCase(
  userRepository,
  passwordHasher,
  generateOtpUseCase,
);

const loginUseCase = new LoginUseCase(
  userRepository,
  passwordHasher,
  authenticationSessionService,
);


const adminLoginUseCase = new AdminLoginUseCase(
  userRepository,
  passwordHasher,
  tokenService,
  userSessionRepository,
  refreshTokenHasher,
);


const verifyPasswordResetOtpUseCase = new VerifyPasswordResetOtpUseCase(
  userRepository,
  verifyOtpUseCase,
  passwordResetStore,
);


const resetPasswordUseCase = new ResetPasswordUseCase(
  passwordResetStore,
  passwordHasher,
  userRepository,
  userSessionRepository,
);



const googleAuthenticationUseCase =  new GoogleAuthenticationUseCase(
    googleAuthService,
    userRepository,
    userAuthAccountRepository,
    authenticationSessionService,
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

export const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
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

export const verifyPasswordResetOtpController = new VerifyPasswordResetOtpController(
  verifyPasswordResetOtpUseCase,
);

export const resetPasswordController = new ResetPasswordController(
  resetPasswordUseCase,
);

export const googleAuthenticationController = new GoogleAuthenticationController(
  googleAuthenticationUseCase,
  );