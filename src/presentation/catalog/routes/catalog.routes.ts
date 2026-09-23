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

import {
    adminAuthMiddleware,
    authMiddleware,
} from "@/infrastructure/auth/container/auth.container";

import { validationMiddleware } from "@/presentation/shared/middlewares/validation.middleware";

import { getCategoryConfigurationDraftParamsSchema } from "@/presentation/catalog/validators/get-category-configuration-draft.validator";

import {
    updateCategoryDraftParamsSchema,
    updateCategoryDraftBodySchema,
} from "@/presentation/catalog/validators/update-category-draft.validator";

import {
    configureCoreFieldsBodySchema,
    configureCoreFieldsParamsSchema,
} from "@/presentation/catalog/validators/configure-core-fields.validator";

import {
    configureDynamicPropertiesBodySchema,
    configureDynamicPropertiesParamsSchema,
} from "@/presentation/catalog/validators/configure-dynamic-properties.validator";

import { publishCategoryConfigurationParamsSchema } from "@/presentation/catalog/validators/publish-category-configuration.validator";

import { API_ROUTES } from "@/shared/constants/routes/api.routes";


export const catalogRouter = Router();


catalogRouter.post(
    API_ROUTES.CATALOG.CATEGORY_CONFIGURATION_DRAFTS,

    authMiddleware.handle.bind(authMiddleware),
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    createCategoryConfigurationDraftController.handle.bind(
        createCategoryConfigurationDraftController,
    ),
);


catalogRouter.patch(
    API_ROUTES.CATALOG.CATEGORY_CONFIGURATION_CATEGORY,

    authMiddleware.handle.bind(authMiddleware),
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
    API_ROUTES.CATALOG.CATEGORY_CONFIGURATION_CORE_FIELDS,

    authMiddleware.handle.bind(authMiddleware),
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
    API_ROUTES.CATALOG.CATEGORY_CONFIGURATION_PROPERTIES,

    authMiddleware.handle.bind(authMiddleware),
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
    API_ROUTES.CATALOG.CATEGORY_CONFIGURATION_PUBLISH,

    authMiddleware.handle.bind(authMiddleware),
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
    API_ROUTES.CATALOG.CATEGORY_CONFIGURATION_DRAFT,

    authMiddleware.handle.bind(authMiddleware),
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
    API_ROUTES.CATALOG.CATEGORIES,

    authMiddleware.handle.bind(authMiddleware),
    adminAuthMiddleware.handle.bind(adminAuthMiddleware),

    getCategoriesController.handle.bind(
        getCategoriesController,
    ),
);

