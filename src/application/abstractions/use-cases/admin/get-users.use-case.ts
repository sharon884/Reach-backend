import type { GetUsersDto } from "@/application/dto/admin/get-users.dto";
import type { GetUsersResultDto } from "@/application/dto/admin/get-users-result.dto";

export interface IGetUsersUseCase {
    execute(data: GetUsersDto): Promise<GetUsersResultDto>;
}