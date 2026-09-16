import { Router } from "express";

import {
    createCategoryConfigurationDraftController,
} from "@/infrastructure/catalog/container/catalog.container";

import { adminAuthMiddleware } from "@/infrastructure/auth/container/auth.container";

export const catalogRouter = Router();

catalogRouter.post(
    "/category-configurations/drafts",
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),
    createCategoryConfigurationDraftController.handle.bind(
        createCategoryConfigurationDraftController,
    ),
);

