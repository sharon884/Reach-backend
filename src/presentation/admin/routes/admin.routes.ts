import { Router } from "express";

import {
    adminLoginController,
    adminLogoutController,
    adminAuthMiddleware,
    getUsersController,
    updateUserStatusController,
} from "@/infrastructure/auth/container/auth.container";

import {
    adminLoginSchema,
} from "@/application/admin/dto/login/admin-login.dto";

import { getUsersSchema } from "@/application/admin/dto/users/get-users.dto";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import {
    updateUserStatusSchema,
} from "@/application/admin/dto/user-status/update-user-status.dto";

import { API_ROUTES } from "@/shared/constants/routes/api.routes";

const adminRouter = Router();

adminRouter.post(
    API_ROUTES.ADMIN.LOGIN,
    validationMiddleware(adminLoginSchema),
    adminLoginController.handle.bind(adminLoginController),
);

adminRouter.get(
    API_ROUTES.ADMIN.USERS,
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),
    validationMiddleware(getUsersSchema, "query"),
    getUsersController.handle.bind(getUsersController),
);

adminRouter.patch(
    API_ROUTES.ADMIN.USER_STATUS,
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),
    validationMiddleware(updateUserStatusSchema),
    updateUserStatusController.handle.bind(updateUserStatusController),
);

adminRouter.post(
    API_ROUTES.ADMIN.LOGOUT,
    adminLogoutController.handle.bind(adminLogoutController),
);

export { adminRouter };