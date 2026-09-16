import { ICategoryConfigurationDraftRepository } from "@/domain/catalog/repositories/category-configuration-draft.repository";
import { IUpdateCategoryDraftUseCase } from "./update-category-draft.use-case.interface.js";
import { CategoryConfigurationDraftDto } from "../../dto/category-configuration/category-configuration-draft.dto.js";
import { UpdateCategoryDraftDto } from "../../dto/category-configuration/update-category-draft.dto.js";
import { AppError } from "@/shared/errors/app.error";
import { CATALOG_MESSAGES } from "@/shared/constants/messages/catalog.messages";
import { StatusCodes } from "http-status-codes";




export class UpdateCategoryDraftUseCase implements IUpdateCategoryDraftUseCase {

    constructor(

        private readonly _draftRepository: ICategoryConfigurationDraftRepository,
    ) { }


    async execute(draftId: string, data: UpdateCategoryDraftDto): Promise<CategoryConfigurationDraftDto> {

        const draft = await this._draftRepository.findById(draftId);

        if (!draft) {
            throw new AppError(
                CATALOG_MESSAGES.CATEGORY_CONFIGURATION_DRAFT_NOT_FOUND, 
                StatusCodes.NOT_FOUND
            );
        }


        draft.category = {
            name: data.name,
            description: data.description,
            parentId: data.parentId,
        };


        await this._draftRepository.save(
            draft,
            3600,
        );

        return draft;
    }
}