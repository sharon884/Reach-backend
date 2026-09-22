import { Router } from "express";

import {
    createCategoryConfigurationDraftController,
    updateCategoryDraftController,
    configureCoreFieldsController,
    configureDynamicPropertiesController,
    publishCategoryConfigurationController,
    getCategoryConfigurationDraftController,
    getCategoriesController,
} from "@/infrastructure/catalog/container/catalog.container";

import { adminAuthMiddleware } from "@/infrastructure/auth/container/auth.container";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import { getCategoryConfigurationDraftParamsSchema } from "@/presentation/catalog/validators/get-category-configuration-draft.validator";
 
import { updateCategoryDraftParamsSchema } from "../validators/update-category-draft.validator.js";

import { updateCategoryDraftBodySchema } from "../validators/update-category-draft.validator.js";

import { configureCoreFieldsBodySchema, configureCoreFieldsParamsSchema } from "@/presentation/catalog/validators/configure-core-fields.validator";

import { configureDynamicPropertiesBodySchema, configureDynamicPropertiesParamsSchema, } from "@/presentation/catalog/validators/configure-dynamic-properties.validator";

import { publishCategoryConfigurationParamsSchema } from "@/presentation/catalog/validators/publish-category-configuration.validator";



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



catalogRouter.post(
    "/category-configurations/drafts/:draftId/publish",
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),
    validationMiddleware(
        publishCategoryConfigurationParamsSchema,
        "params",
    ),
    publishCategoryConfigurationController.handle.bind(
        publishCategoryConfigurationController,
    ),
);



catalogRouter.get(
    "/category-configurations/drafts/:draftId",

    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    validationMiddleware(
        getCategoryConfigurationDraftParamsSchema,
        "params",
    ),

    getCategoryConfigurationDraftController.handle.bind(
        getCategoryConfigurationDraftController,
    ),
);


catalogRouter.get(
    "/categories",

    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    getCategoriesController.handle.bind(
        getCategoriesController,
    ),
);