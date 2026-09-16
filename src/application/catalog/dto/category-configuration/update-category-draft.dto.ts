export interface UpdateCategoryDraftDto {
    name: string;
    description: string | null;
    parentId: string | null;
}