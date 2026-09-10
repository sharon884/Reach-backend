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
} from "@/application/dto/admin/admin-login.dto";

import { getUsersSchema } from "@/application/dto/admin/get-users.dto";

import { validationMiddleware } from "@/presentation/middlewares/validation.middleware";

import { updateUserStatusSchema } from "@/application/dto/admin/update-user-status.dto";


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