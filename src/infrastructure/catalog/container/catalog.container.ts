import { CreateCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/create-category-configuration-draft/create-category-configuration-draft.use-case";

import { UpdateCategoryDraftUseCase } from "@/application/catalog/use-cases/update-category-draft/update-category-draft.use-case";

import { RedisCategoryConfigurationDraftRepository } from "@/infrastructure/catalog/repositories/redis-category-configuration-draft.repository";

import { CreateCategoryConfigurationDraftController } from "@/presentation/catalog/controllers/create-category-configuration-draft.controller";

import { UpdateCategoryDraftController } from "@/presentation/catalog/controllers/update-category-draft.controller";


import { ConfigureCoreFieldsUseCase } from "@/application/catalog/use-cases/configure-core-fields/configure-core-fields.use-case";

import { ConfigureCoreFieldsController } from "@/presentation/catalog/controllers/configure-core-fields.controller";

import { ConfigureDynamicPropertiesUseCase } from "@/application/catalog/use-cases/configure-dynamic-properties/configure-dynamic-properties.use-case";

import { ConfigureDynamicPropertiesController } from "@/presentation/catalog/controllers/configure-dynamic-properties.controller";

import { DynamicPropertyConfigurationValidator } from "@/presentation/catalog/validators/dynamic-property-configuration.validator";



const categoryConfigurationDraftRepository = new RedisCategoryConfigurationDraftRepository();

const dynamicPropertyConfigurationValidator =  new DynamicPropertyConfigurationValidator();


const createCategoryConfigurationDraftUseCase = new CreateCategoryConfigurationDraftUseCase(
    categoryConfigurationDraftRepository,
);


const updateCategoryDraftUseCase = new UpdateCategoryDraftUseCase(
    categoryConfigurationDraftRepository,
)


const configureCoreFieldsUseCase = new ConfigureCoreFieldsUseCase(
    categoryConfigurationDraftRepository,
);

   


const configureDynamicPropertiesUseCase = new ConfigureDynamicPropertiesUseCase(
    categoryConfigurationDraftRepository,
    dynamicPropertyConfigurationValidator,
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


export const configureDynamicPropertiesController = new ConfigureDynamicPropertiesController(
    configureDynamicPropertiesUseCase,
);