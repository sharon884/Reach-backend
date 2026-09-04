import { Router } from "express";

import {
  signupController,
  verifyOtpController,
  resendOtpController,
} from "../../../infrastructure/container/auth.container.js";

import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { signupSchema  } from "../../../application/dto/auth/signup.dto.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  validationMiddleware( signupSchema ),
  signupController.handle.bind(signupController),
);

authRouter.post(
  "/verify-otp",
  verifyOtpController.handle.bind(verifyOtpController),
);

authRouter.post(
  "/resend-otp",
  resendOtpController.handle.bind(resendOtpController),
);