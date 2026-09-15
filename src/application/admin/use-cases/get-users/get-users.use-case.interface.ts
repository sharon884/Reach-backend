import type { GetUsersDto } from "@/application/admin/dto/users/get-users.dto";
import type { GetUsersResultDto } from "@/application/admin/dto/users/get-users-result.dto";

export interface IGetUsersUseCase {
    execute(data: GetUsersDto): Promise<GetUsersResultDto>;
}