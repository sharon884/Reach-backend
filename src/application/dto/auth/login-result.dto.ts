import type { User } from "../../../domain/entities/user.entity.js";

export interface LoginResult {
    user: User;
    accessToken: string;
    refreshToken: string;
}