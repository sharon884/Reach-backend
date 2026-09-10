import { Router } from "express";

import {
    signupController,
    verifyOtpController,
    resendOtpController,
    loginController,
    logoutController,
} from "@/infrastructure/container/auth.container";

import { validationMiddleware } from "@/presentation/middlewares/validation.middleware";

import { signupSchema } from "@/application/dto/auth/signup.dto";

import { verifyOtpSchema } from "@/application/dto/auth/verify-otp.dto";

import { resendOtpSchema } from "@/application/dto/auth/resend-otp.dto";

import { loginSchema } from "@/application/dto/auth/login.dto";


export const authRouter = Router();

authRouter.post(
  "/signup",
  validationMiddleware( signupSchema ),
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