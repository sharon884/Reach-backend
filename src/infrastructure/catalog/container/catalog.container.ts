import { CreateCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/create-category-configuration-draft/create-category-configuration-draft.use-case";

import { UpdateCategoryDraftUseCase } from "@/application/catalog/use-cases/update-category-draft/update-category-draft.use-case";

import { RedisCategoryConfigurationDraftRepository } from "@/infrastructure/catalog/repositories/redis-category-configuration-draft.repository";

import { CreateCategoryConfigurationDraftController } from "@/presentation/catalog/controllers/create-category-configuration-draft.controller";

import { UpdateCategoryDraftController } from "@/presentation/catalog/controllers/update-category-draft.controller";


import { ConfigureCoreFieldsUseCase } from "@/application/catalog/use-cases/configure-core-fields/configure-core-fields.use-case";

import { ConfigureCoreFieldsController } from "@/presentation/catalog/controllers/configure-core-fields.controller";



const categoryConfigurationDraftRepository = new RedisCategoryConfigurationDraftRepository();



const createCategoryConfigurationDraftUseCase = new CreateCategoryConfigurationDraftUseCase(
    categoryConfigurationDraftRepository,
);


const updateCategoryDraftUseCase = new UpdateCategoryDraftUseCase(
    categoryConfigurationDraftRepository,
)


const configureCoreFieldsUseCase = new ConfigureCoreFieldsUseCase(
    categoryConfigurationDraftRepository,
);



export const createCategoryConfigurationDraftController = new CreateCategoryConfigurationDraftController(
    createCategoryConfigurationDraftUseCase,
);


export const updateCategoryDraftController = new UpdateCategoryDraftController(
    updateCategoryDraftUseCase,
);


export const configureCoreFieldsController = new ConfigureCoreFieldsController(
    configureCoreFieldsUseCase,
);