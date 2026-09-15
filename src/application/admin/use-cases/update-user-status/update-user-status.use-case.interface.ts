import type { UpdateUserStatusDto } from "@/application/admin/dto/user-status/update-user-status.dto";
import type { User } from "@/domain/auth/entities/user.entity";

export interface IUpdateUserStatusUseCase {
    execute(
        userId: string,
        data: UpdateUserStatusDto,
    ): Promise<User>;
}