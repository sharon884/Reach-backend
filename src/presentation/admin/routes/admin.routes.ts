import { Router } from "express";

import {
    adminLoginController,
    adminLogoutController,
    adminAuthMiddleware,
    getUsersController,
    updateUserStatusController,
} from "@/infrastructure/container/auth.container";

import {
    adminLoginSchema,
} from "@/application/admin/dto/login/admin-login.dto";

import { getUsersSchema } from "@/application/admin/dto/users/get-users.dto";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import { updateUserStatusSchema } from "@/application/admin/dto/user-status/update-user-status.dto";


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