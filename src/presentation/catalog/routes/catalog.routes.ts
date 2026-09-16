import { Router } from "express";

import {
    createCategoryConfigurationDraftController,
    updateCategoryDraftController,
} from "@/infrastructure/catalog/container/catalog.container";

import { adminAuthMiddleware } from "@/infrastructure/auth/container/auth.container";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import { updateCategoryDraftParamsSchema } from "../validators/update-category-draft.validator.js";

import { updateCategoryDraftBodySchema } from "../validators/update-category-draft.validator.js";



export const catalogRouter = Router();

catalogRouter.post(
    "/category-configurations/drafts",

    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    createCategoryConfigurationDraftController.handle.bind(

        createCategoryConfigurationDraftController,
    ),
);



catalogRouter.patch(
    "/category-configurations/drafts/:draftId/category",

    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    validationMiddleware(
        updateCategoryDraftParamsSchema,
        "params",
    ),

    validationMiddleware(
        updateCategoryDraftBodySchema,
        "body",
    ),

    updateCategoryDraftController.handle.bind(
        updateCategoryDraftController,
    ),
);