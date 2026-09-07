import { Router } from "express";

import {
    adminLoginController,
    adminLogoutController,
    adminAuthMiddleware,
    getUsersController,
    updateUserStatusController,
} from "../../../infrastructure/container/auth.container.js";

import {
    adminLoginSchema,
} from "../../../application/dto/admin/admin-login.dto.js";

import { getUsersSchema } from "../../../application/dto/admin/get-users.dto.js";

import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { updateUserStatusSchema } from "../../../application/dto/admin/update-user-status.dto.js";


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



adminRouter.patch(
    "/users/:userId/status",
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),
    validationMiddleware(updateUserStatusSchema),
    updateUserStatusController.handle.bind(updateUserStatusController),
);


adminRouter.post(
    "/logout",
    adminLogoutController.handle.bind(adminLogoutController),
);

export { adminRouter };