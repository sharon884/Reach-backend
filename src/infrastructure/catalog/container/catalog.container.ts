import { CreateCategoryConfigurationDraftUseCase } from "@/application/catalog/use-cases/create-category-configuration-draft/create-category-configuration-draft.use-case";

import { RedisCategoryConfigurationDraftRepository } from "@/infrastructure/catalog/repositories/redis-category-configuration-draft.repository";

import { CreateCategoryConfigurationDraftController } from "@/presentation/catalog/controllers/create-category-configuration-draft.controller";


const categoryConfigurationDraftRepository =
    new RedisCategoryConfigurationDraftRepository();


const createCategoryConfigurationDraftUseCase =
    new CreateCategoryConfigurationDraftUseCase(
        categoryConfigurationDraftRepository,
    );


export const createCategoryConfigurationDraftController =
    new CreateCategoryConfigurationDraftController(
        createCategoryConfigurationDraftUseCase,
    );