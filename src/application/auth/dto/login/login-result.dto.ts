import type { User } from "@/domain/auth/entities/user.entity";

export interface LoginResult {
    user: User;
    accessToken: string;
    refreshToken: string;
}