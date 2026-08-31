import { Router } from "express";

import {
  signupController,
  verifyOtpController,
  resendOtpController,
} from "../../../infrastructure/container/auth.container.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
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