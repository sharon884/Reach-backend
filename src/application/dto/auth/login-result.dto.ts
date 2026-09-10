import type { User } from "@/domain/entities/user.entity";

export interface LoginResult {
    user: User;
    accessToken: string;
    refreshToken: string;
}