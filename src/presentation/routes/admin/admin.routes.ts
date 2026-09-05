import { Router } from "express";

import { adminLoginController } from "../../../infrastructure/container/auth.container.js";
import {
    adminLoginSchema,
} from "../../../application/dto/admin/admin-login.dto.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

const adminRouter = Router();

adminRouter.post(
    "/login",
    validationMiddleware(adminLoginSchema),
    adminLoginController.handle.bind(adminLoginController),
);

export { adminRouter };