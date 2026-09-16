import { Router } from "express";

import {
    createCategoryConfigurationDraftController,
    updateCategoryDraftController,
    configureCoreFieldsController,
    configureDynamicPropertiesController,
} from "@/infrastructure/catalog/container/catalog.container";

import { adminAuthMiddleware } from "@/infrastructure/auth/container/auth.container";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import { updateCategoryDraftParamsSchema } from "../validators/update-category-draft.validator.js";

import { updateCategoryDraftBodySchema } from "../validators/update-category-draft.validator.js";

import { configureCoreFieldsBodySchema, configureCoreFieldsParamsSchema } from "@/presentation/catalog/validators/configure-core-fields.validator";

import { configureDynamicPropertiesBodySchema, configureDynamicPropertiesParamsSchema, } from "@/presentation/catalog/validators/configure-dynamic-properties.validator";

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


catalogRouter.patch(
    "/category-configurations/drafts/:draftId/core-fields",

    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    validationMiddleware(
        configureCoreFieldsParamsSchema,
        "params",
    ),

    validationMiddleware(
        configureCoreFieldsBodySchema,
        "body",
    ),

    configureCoreFieldsController.handle.bind(
        configureCoreFieldsController,
    ),
);



catalogRouter.patch(
    "/category-configurations/drafts/:draftId/properties",

    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    validationMiddleware(
        configureDynamicPropertiesParamsSchema,
        "params",
    ),

    validationMiddleware(
        configureDynamicPropertiesBodySchema,
        "body",
    ),

    configureDynamicPropertiesController.handle.bind(
        configureDynamicPropertiesController,
    ),
);