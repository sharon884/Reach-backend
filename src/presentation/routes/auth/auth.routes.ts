import { Router } from "express";
import { signupController } from "../../../infrastructure/container/auth.container.js";

export const authRouter = Router();

authRouter.post(
  "/signup",
  signupController.handle.bind(signupController),
);