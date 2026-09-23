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
  refreshTokenController,
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

import { API_ROUTES } from "@/shared/constants/routes/api.routes"



export const authRouter = Router();



authRouter.post(
  API_ROUTES.AUTH.SIGNUP,
  validationMiddleware(signupSchema),
  signupController.handle.bind(signupController),
);


authRouter.post(
  API_ROUTES.AUTH.LOGIN,
  validationMiddleware(loginSchema),
  loginController.handle.bind(loginController),
);


authRouter.post(
  API_ROUTES.AUTH.REFRESH,
  refreshTokenController.handle.bind(refreshTokenController),
);


authRouter.post(
  API_ROUTES.AUTH.VERIFY_OTP,
  validationMiddleware(verifyOtpSchema),
  verifyOtpController.handle.bind(verifyOtpController),
);


authRouter.post(
  API_ROUTES.AUTH.RESEND_OTP,
  validationMiddleware(resendOtpSchema),
  resendOtpController.handle.bind(resendOtpController),
);


authRouter.post(
  API_ROUTES.AUTH.LOGOUT,
  logoutController.handle.bind(logoutController),
);


authRouter.post(
  API_ROUTES.AUTH.FORGOT_PASSWORD,
  validationMiddleware(forgotPasswordSchema),
  forgotPasswordController.handle.bind(forgotPasswordController),
);


authRouter.post(
  API_ROUTES.AUTH.VERIFY_PASSWORD_RESET_OTP,
  validationMiddleware(verifyPasswordResetOtpSchema),
  verifyPasswordResetOtpController.handle.bind(
    verifyPasswordResetOtpController,
  ),
);


authRouter.post(
  API_ROUTES.AUTH.RESET_PASSWORD,
  validationMiddleware(resetPasswordSchema),
  resetPasswordController.handle.bind(resetPasswordController),
);


authRouter.post(
  API_ROUTES.AUTH.GOOGLE,
  validationMiddleware(googleAuthenticationSchema),
  googleAuthenticationController.handle.bind(
    googleAuthenticationController,
  ),
);