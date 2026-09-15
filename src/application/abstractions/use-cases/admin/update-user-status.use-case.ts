import type { UpdateUserStatusDto } from "@/application/dto/admin/update-user-status.dto";
import type { User } from "@/domain/auth/entities/user.entity";

export interface IUpdateUserStatusUseCase {
    execute(
        userId: string,
        data: UpdateUserStatusDto,
    ): Promise<User>;
}