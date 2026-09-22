import { Router } from "express";

import {
  signupController,
  verifyOtpController,
  resendOtpController,
  loginController,
  logoutController,
  forgotPasswordController,
  verifyPasswordResetOtpController,
  resetPasswordController,
  googleAuthenticationController,
} from "@/infrastructure/auth/container/auth.container";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import { signupSchema } from "@/application/auth/dto/signup/signup.dto";

import { verifyOtpSchema } from "@/application/auth/dto/otp/verify-otp.dto";

import { resendOtpSchema } from "@/application/auth/dto/otp/resend-otp.dto";

import { loginSchema } from "@/application/auth/dto/login/login.dto";

import { forgotPasswordSchema } from "@/application/auth/dto/password/forgot-password.dto";

import { verifyPasswordResetOtpSchema } from "@/application/auth/dto/otp/verify-password-reset-otp.dto";

import { resetPasswordSchema } from "@/application/auth/dto/password/reset-password.dto";

import { googleAuthenticationSchema } from "@/application/auth/dto/google-authentication/google-authentication.dto";


export const authRouter = Router();

authRouter.post(
  "/signup",
  validationMiddleware(signupSchema),
  signupController.handle.bind(signupController),
);


authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  loginController.handle.bind(loginController),
);


authRouter.post(
  "/verify-otp",
  validationMiddleware(verifyOtpSchema),
  verifyOtpController.handle.bind(verifyOtpController),
);

authRouter.post(
  "/resend-otp",
  validationMiddleware(resendOtpSchema),
  resendOtpController.handle.bind(resendOtpController),
);


authRouter.post(
  "/logout",
  logoutController.handle.bind(logoutController),
);


authRouter.post(
  "/forgot-password",
  validationMiddleware(forgotPasswordSchema),
  forgotPasswordController.handle.bind(forgotPasswordController)
);


authRouter.post(
  "/verify-password-reset-otp",
  validationMiddleware(verifyPasswordResetOtpSchema),
  verifyPasswordResetOtpController.handle.bind(verifyPasswordResetOtpController)
);

authRouter.post(
  "/reset-password",
  validationMiddleware(resetPasswordSchema),
  resetPasswordController.handle.bind(
    resetPasswordController,
  ),
);


authRouter.post(
    "/google",
    validationMiddleware(googleAuthenticationSchema),
    googleAuthenticationController.handle.bind(
        googleAuthenticationController,
    ),
);