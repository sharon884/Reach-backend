import { Router } from "express";

import {
    adminLoginController,
    adminAuthMiddleware,
    getUsersController,
} from "../../../infrastructure/container/auth.container.js";

import {
    adminLoginSchema,
} from "../../../application/dto/admin/admin-login.dto.js";

import { getUsersSchema } from "../../../application/dto/admin/get-users.dto.js";

import { validationMiddleware } from "../../middlewares/validation.middleware.js";

const adminRouter = Router();

adminRouter.post(
    "/login",
    validationMiddleware(adminLoginSchema),
    adminLoginController.handle.bind(adminLoginController),
);

adminRouter.get(
    "/users",
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),
    validationMiddleware(getUsersSchema, "query"),
    getUsersController.handle.bind(getUsersController),
);

export { adminRouter };